import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) throw new Error("OPENAI_API_KEY belum diisi.");
const BASE = "https://api.openai.com/v1";
const headers = { authorization: `Bearer ${KEY}` };

async function api(endpoint, options = {}) {
  const response = await fetch(`${BASE}${endpoint}`, { ...options, headers: { ...headers, ...(options.headers || {}) } });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || `OpenAI API error ${response.status}`);
  return data;
}

function frontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  const result = {};
  if (!match) return result;
  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^([\w_]+):\s*"?(.*?)"?$/);
    if (item) result[item[1]] = item[2].replace(/^"|"$/g, "");
  }
  return result;
}

const list = await fs.readFile(path.join(ROOT, "knowledge-base", "00-catalog", "ingest-default.txt"), "utf8");
const files = list.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
const store = await api("/vector_stores", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: "knowledge-base-linktree-brain-academy" }) });
console.log(`Vector store: ${store.id}`);
const vectorStoreFileIds = [];

for (let i = 0; i < files.length; i += 1) {
  const relative = files[i];
  const full = path.join(ROOT, "knowledge-base", relative);
  const content = await fs.readFile(full);
  const upload = new FormData();
  upload.append("purpose", "assistants");
  upload.append("file", new Blob([content], { type: "text/markdown" }), path.basename(full));
  const file = await api("/files", { method: "POST", body: upload });
  const meta = frontmatter(content.toString("utf8"));
  const vectorFile = await api(`/vector_stores/${store.id}/files`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      file_id: file.id,
      attributes: {
        profile: meta.profile_id || "catalog",
        topic: meta.topic || "catalog",
        source_status: meta.source_status || "metadata_and_summary",
      },
    }),
  });
  vectorStoreFileIds.push(vectorFile.id);
  console.log(`[${i + 1}/${files.length}] ${relative} -> ${file.id}`);
}

let current = { status: "in_progress" };
for (let attempt = 0; attempt < 90 && ["in_progress", "queued"].includes(current.status); attempt += 1) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const statuses = await Promise.all(vectorStoreFileIds.map((id) => api(`/vector_stores/${store.id}/files/${id}`)));
  const failed = statuses.find((item) => item.status === "failed");
  if (failed) throw new Error(`File gagal diindeks: ${failed.last_error?.message || failed.id}`);
  current = { status: statuses.every((item) => item.status === "completed") ? "completed" : "in_progress" };
  if (attempt % 4 === 3) console.log(`Indexing status: ${current.status}`);
}
if (current.status !== "completed") {
  throw new Error(`Vector store indexing belum selesai: ${current.status}`);
}
console.log(`\nIndexing selesai (${vectorStoreFileIds.length} file). Set this before starting the server:\nexport OPENAI_VECTOR_STORE_ID="${store.id}"`);
