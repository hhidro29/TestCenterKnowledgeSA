import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const PORT = Number(process.env.PORT || 4310);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_VECTOR_STORE_ID = process.env.OPENAI_VECTOR_STORE_ID || "";
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || "gpt-6-luna";
const OPENAI_BASE_URL = "https://api.openai.com/v1";

const MODELS = ["gpt-6-luna", "gpt-5.6-luna", "gpt-5.5"];
const PROFILE_LABELS = { all: "Semua profil" };

let systemPrompt = "";
let localDocs = [];

async function loadData() {
  const promptPath = path.join(ROOT, "Prompt Sistem Chatbot - Knowledge Base Terstruktur.md");
  systemPrompt = await fs.readFile(promptPath, "utf8").catch(() =>
    "Jawab hanya berdasarkan knowledge base. Jangan mengarang. Sebutkan sumber dan status sumber."
  );
  const catalogPath = path.join(ROOT, "knowledge-base", "00-catalog", "ingest-default.txt");
  const list = await fs.readFile(catalogPath, "utf8");
  const paths = list
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  localDocs = [];
  for (const relative of paths) {
    const full = path.join(ROOT, "knowledge-base", relative);
    const content = await fs.readFile(full, "utf8").catch(() => "");
    if (!content) continue;
    const front = content.match(/^---\n([\s\S]*?)\n---/);
    const metadata = {};
    if (front) {
      for (const line of front[1].split(/\r?\n/)) {
        const match = line.match(/^([\w_]+):\s*"?(.*?)"?$/);
        if (match) metadata[match[1]] = match[2].replace(/^"|"$/g, "");
      }
    }
    localDocs.push({ relative, content, metadata, title: metadata.title || path.basename(relative) });
  }
}

function json(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  return body ? JSON.parse(body) : {};
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

const STOPWORDS = new Set([
  "ada", "agar", "akan", "aku", "apa", "atau", "bagi", "bahwa", "berapa", "bisa", "dan", "dari", "dengan",
  "di", "dalam", "ini", "jadi", "juga", "ke", "kamu", "karena", "mana", "mau", "menurut", "oleh", "pada",
  "saja", "saya", "sebagai", "sebutkan", "sistem", "tentang", "terkait", "tidak", "untuk", "yang", "nya",
]);

function queryTerms(query) {
  return [...new Set(normalize(query).split(/\s+/).filter((term) => term.length > 2 && !STOPWORDS.has(term)))];
}

function cleanExcerpt(value) {
  return String(value || "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<https?:\/\/[^>]+>/g, "")
    .replace(/[*_`>#]/g, "")
    .replace(/^\s*[-+•]\s+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function relevantExcerpts(doc, terms) {
  const body = doc.content.replace(/^---[\s\S]*?---\s*/, "");
  const lines = body
    .split(/\r?\n/)
    .map(cleanExcerpt)
    .filter((line) => line && !/^\|?\s*[-:|]+\s*\|?$/.test(line) && !/^sumber:/i.test(line));
  const matching = lines.filter((line) => {
    const normalized = normalize(line);
    return terms.some((term) => new RegExp(`\\b${term}\\b`, "i").test(normalized));
  });
  const fallback = lines.filter((line) => line.length > 35 && !line.startsWith("http"));
  return [...new Set([...matching, ...fallback])].slice(0, 2);
}

function localSearch(query, profile) {
  const terms = queryTerms(query);
  const candidates = localDocs
    .filter((doc) => profile === "all" || doc.relative.startsWith(`${profile}/`))
    .map((doc) => {
      const title = normalize(doc.title);
      const body = normalize(doc.content);
      let score = 0;
      for (const term of terms) {
        if (new RegExp(`\\b${term}\\b`, "i").test(title)) score += 10;
        score += Math.min((body.match(new RegExp(`\\b${term}\\b`, "g")) || []).length, 8);
      }
      return { ...doc, score };
    })
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  if (!candidates.length) {
    return {
      mode: "demo-local",
      answer: "Aku belum menemukan bagian knowledge base yang cukup relevan untuk pertanyaan ini. Coba tambahkan nama topik, program, atau tahun yang lebih spesifik.",
      sources: [],
    };
  }
  const sources = candidates.map((doc) => ({
    title: doc.title,
    path: doc.relative,
    profile: PROFILE_LABELS[doc.metadata.profile_id] || doc.metadata.profile || "Knowledge base",
    status: doc.metadata.source_status || "verified_extracted",
    url: doc.metadata.source_url || "",
  }));
  const excerpts = candidates
    .map((doc) => ({ title: doc.title, lines: relevantExcerpts(doc, terms) }))
    .filter((item) => item.lines.length);
  const answer = excerpts.length
    ? [
        "Berikut ringkasan yang ditemukan di knowledge base:",
        ...excerpts.map((item) => `\n${item.title}\n${item.lines.map((line) => `• ${line}`).join("\n")}`),
      ].join("\n")
    : "Aku menemukan sumber yang cocok, tetapi belum ada potongan teks yang bisa diringkas dari dokumen tersebut.";
  return {
    mode: "demo-local",
    answer,
    sources,
  };
}

async function callOpenAI({ message, model, profile, input }) {
  const profileInstruction =
    profile && profile !== "all"
      ? `\nPengguna memilih profil ${PROFILE_LABELS[profile] || profile}. Prioritaskan dokumen dengan profile_id ${profile}.`
      : "";
  const response = await fetch(`${OPENAI_BASE_URL}/responses`, {
    method: "POST",
    headers: { authorization: `Bearer ${OPENAI_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      model: model || DEFAULT_MODEL,
      instructions: `${systemPrompt}${profileInstruction}`,
      input: input || message,
      tools: [{ type: "file_search", vector_store_ids: [OPENAI_VECTOR_STORE_ID], max_num_results: 8 }],
      include: ["file_search_call.results"],
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    const detail = data?.error?.message || `OpenAI API error (${response.status})`;
    throw new Error(detail);
  }
  const messageItems = (data.output || []).filter((item) => item.type === "message");
  const answer = messageItems
    .flatMap((item) => item.content || [])
    .filter((item) => item.type === "output_text")
    .map((item) => item.text)
    .join("\n")
    .trim();
  const annotations = messageItems
    .flatMap((item) => item.content || [])
    .flatMap((item) => item.annotations || [])
    .filter((annotation) => annotation.type === "file_citation")
    .map((annotation) => ({ filename: annotation.filename, fileId: annotation.file_id }));
  return { mode: "openai-file-search", model: model || DEFAULT_MODEL, answer, citations: annotations, sources: [] };
}

async function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (req.method === "GET" && url.pathname === "/api/config") {
    return json(res, 200, {
      hasApiKey: Boolean(OPENAI_API_KEY),
      hasVectorStore: Boolean(OPENAI_VECTOR_STORE_ID),
      defaultModel: DEFAULT_MODEL,
      models: MODELS,
      profiles: PROFILE_LABELS,
      localDocuments: localDocs.length,
    });
  }
  if (req.method === "POST" && url.pathname === "/api/chat") {
    try {
      const body = await readBody(req);
      const message = String(body.message || "").trim();
      if (!message) return json(res, 400, { error: "Pertanyaan masih kosong." });
      const model = MODELS.includes(body.model) ? body.model : DEFAULT_MODEL;
      const profile = "all";
      if (OPENAI_API_KEY && OPENAI_VECTOR_STORE_ID) {
        try {
          return json(res, 200, await callOpenAI({ message, model, profile }));
        } catch (error) {
          const fallback = localSearch(message, profile);
          const warning = /no credits|insufficient|billing/i.test(error.message || "")
            ? "Mode demo lokal aktif sementara karena akun API belum memiliki credits."
            : "Model AI belum tersedia; prototype memakai mode demo lokal.";
          return json(res, 200, {
            ...fallback,
            mode: "demo-local-fallback",
            warning,
          });
        }
      }
      return json(res, 200, localSearch(message, profile));
    } catch (error) {
      return json(res, 500, { error: error.message || "Gagal memproses pertanyaan." });
    }
  }
  if (req.method === "POST" && url.pathname === "/api/compare") {
    try {
      const body = await readBody(req);
      const message = String(body.message || "").trim();
      if (!message) return json(res, 400, { error: "Pertanyaan masih kosong." });
      const models = Array.isArray(body.models) && body.models.length
        ? body.models.filter((model) => MODELS.includes(model))
        : MODELS;
      const results = await Promise.all(models.map(async (model) => {
        if (OPENAI_API_KEY && OPENAI_VECTOR_STORE_ID) {
          try {
            const previous = Array.isArray(body.histories?.[model]) ? body.histories[model].slice(-10) : [];
            const input = [...previous, { role: "user", content: message }];
            return await callOpenAI({ message, model, profile: "all", input });
          } catch (error) {
            const fallback = localSearch(message, "all");
            return {
              ...fallback,
              model,
              mode: "demo-local-fallback",
              warning: /no credits|insufficient|billing/i.test(error.message || "")
                ? "Mode demo lokal aktif sementara karena akun API belum memiliki credits."
                : "Model AI belum tersedia; prototype memakai mode demo lokal.",
            };
          }
        }
        return { ...localSearch(message, "all"), model };
      }));
      return json(res, 200, { question: message, results });
    } catch (error) {
      return json(res, 500, { error: error.message || "Gagal membandingkan model." });
    }
  }
  if (req.method === "GET") {
    const requested = url.pathname === "/" ? "/index.html" : url.pathname;
    const safePath = path.normalize(requested).replace(/^([.][.][\\/])+/, "");
    const filePath = path.join(HERE, "public", safePath);
    const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };
    try {
      const file = await fs.readFile(filePath);
      res.writeHead(200, { "content-type": types[path.extname(filePath)] || "application/octet-stream" });
      return res.end(file);
    } catch {
      return json(res, 404, { error: "Not found" });
    }
  }
  return json(res, 405, { error: "Method not allowed" });
}

await loadData();
http.createServer(handle).listen(PORT, "127.0.0.1", () => {
  console.log(`Knowledge chatbot prototype: http://127.0.0.1:${PORT}`);
  console.log(`Local documents loaded: ${localDocs.length}`);
  console.log(`OpenAI File Search: ${OPENAI_API_KEY && OPENAI_VECTOR_STORE_ID ? "enabled" : "demo-local mode"}`);
});
