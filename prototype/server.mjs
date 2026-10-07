import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const PORT = Number(process.env.PORT || 4310);
const HOST = process.env.HOST || "0.0.0.0";
const AI_PROVIDER = (process.env.AI_PROVIDER || "gemini").toLowerCase();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MAX_MESSAGE_LENGTH = 4000;
const MAX_CONTEXT_CHARS = 24000;
const MAX_REQUESTS_PER_MINUTE = Number(process.env.MAX_REQUESTS_PER_MINUTE || 30);

const PROFILE_LABELS = { all: "Semua knowledge base" };
const MODELS = [GEMINI_MODEL];

let systemPrompt = "";
let localDocs = [];
const requestLog = new Map();

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
        const match = line.match(/^[\w_]+:\s*"?(.*?)"?$/);
        if (match) {
          const key = line.split(":", 1)[0].trim();
          metadata[key] = match[1].replace(/^"|"$/g, "");
        }
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
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 100_000) throw new Error("Request terlalu besar.");
  }
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
  return [...new Set([...matching, ...fallback])].slice(0, 4);
}

function retrieve(query) {
  const terms = queryTerms(query);
  const candidates = localDocs
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
    .slice(0, 5);

  const sources = candidates.map((doc) => ({
    title: doc.title,
    path: doc.relative,
    profile: PROFILE_LABELS[doc.metadata.profile_id] || doc.metadata.profile || "Knowledge base",
    status: doc.metadata.source_status || "verified_extracted",
    url: doc.metadata.source_url || "",
  }));
  const excerpts = candidates
    .map((doc) => ({ title: doc.title, path: doc.relative, lines: relevantExcerpts(doc, terms) }))
    .filter((item) => item.lines.length);
  const context = excerpts
    .map((item) => `Dokumen: ${item.title}\nPath: ${item.path}\n${item.lines.map((line) => `- ${line}`).join("\n")}`)
    .join("\n\n")
    .slice(0, MAX_CONTEXT_CHARS);

  return { candidates, context, sources };
}

function localSearch(query) {
  const retrieved = retrieve(query);
  if (!retrieved.candidates.length) {
    return {
      mode: "demo-local",
      model: "local-retrieval",
      answer: "Aku belum menemukan bagian knowledge base yang cukup relevan untuk pertanyaan ini. Coba tambahkan nama topik, program, atau tahun yang lebih spesifik.",
      sources: [],
    };
  }
  const answer = retrieved.context
    ? [
        "Aku menemukan beberapa bagian yang relevan di knowledge base:",
        ...retrieved.context.split(/\n\n/).map((block) => `\n${block}`),
      ].join("\n")
    : "Aku menemukan sumber yang cocok, tetapi belum ada potongan teks yang bisa diringkas dari dokumen tersebut.";
  return { mode: "demo-local", model: "local-retrieval", answer, sources: retrieved.sources };
}

function buildPrompt(message, context) {
  return `${systemPrompt}\n\nATURAN TAMBAHAN UNTUK PROTOTYPE:\n- Jawab dalam Bahasa Indonesia dengan nada natural seperti rekan kerja.\n- Gunakan hanya konteks knowledge base di bawah ini. Jika konteks tidak cukup, katakan bahwa informasinya belum ditemukan atau belum tervalidasi.\n- Jangan mengarang angka, jadwal, biaya, persyaratan, atau tautan.\n- Jika menyebut sumber, gunakan judul dokumen yang tersedia.\n\nKONTEKS KNOWLEDGE BASE:\n${context || "Tidak ada konteks relevan yang ditemukan."}\n\nPERTANYAAN USER:\n${message}`;
}

async function callGemini({ message, history = [] }) {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY belum dikonfigurasi.");
  const retrieved = retrieve(message);
  const contents = [
    ...history.slice(-10).map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: String(item.content || "").slice(0, MAX_MESSAGE_LENGTH) }],
    })),
    { role: "user", parts: [{ text: buildPrompt(message, retrieved.context) }] },
  ];
  const endpoint = `${GEMINI_BASE_URL}/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.2, maxOutputTokens: 700 },
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = data?.error?.message || `Gemini API error (${response.status})`;
    throw new Error(detail);
  }
  const answer = (data.candidates || [])
    .flatMap((candidate) => candidate.content?.parts || [])
    .map((part) => part.text || "")
    .join("\n")
    .trim();
  if (!answer) throw new Error("Model tidak mengembalikan jawaban.");
  return { mode: "gemini", model: GEMINI_MODEL, answer, sources: retrieved.sources };
}

function isRateLimited(req) {
  if (!MAX_REQUESTS_PER_MINUTE || MAX_REQUESTS_PER_MINUTE < 1) return false;
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const key = forwarded || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter((time) => now - time < 60_000);
  if (recent.length >= MAX_REQUESTS_PER_MINUTE) {
    requestLog.set(key, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(key, recent);
  return false;
}

async function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (req.method === "GET" && url.pathname === "/api/config") {
    return json(res, 200, {
      provider: AI_PROVIDER,
      hasApiKey: Boolean(GEMINI_API_KEY),
      defaultModel: GEMINI_MODEL,
      models: MODELS,
      profiles: PROFILE_LABELS,
      localDocuments: localDocs.length,
      mode: GEMINI_API_KEY ? "gemini" : "demo-local",
    });
  }
  if (req.method === "POST" && url.pathname === "/api/chat") {
    try {
      if (isRateLimited(req)) return json(res, 429, { error: "Batas penggunaan sementara tercapai. Coba lagi sebentar." });
      const body = await readBody(req);
      const message = String(body.message || "").trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!message) return json(res, 400, { error: "Pertanyaan masih kosong." });
      const history = Array.isArray(body.history) ? body.history : [];
      if (GEMINI_API_KEY && AI_PROVIDER === "gemini") {
        try {
          return json(res, 200, await callGemini({ message, history }));
        } catch (error) {
          const fallback = localSearch(message);
          return json(res, 200, {
            ...fallback,
            mode: "demo-local-fallback",
            warning: "Model AI sedang tidak tersedia; jawaban sementara diambil dari retrieval lokal.",
          });
        }
      }
      return json(res, 200, localSearch(message));
    } catch (error) {
      return json(res, 500, { error: error.message || "Gagal memproses pertanyaan." });
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
http.createServer(handle).listen(PORT, HOST, () => {
  console.log(`Knowledge chatbot prototype: http://${HOST}:${PORT}`);
  console.log(`Local documents loaded: ${localDocs.length}`);
  console.log(`AI provider: ${AI_PROVIDER} · model: ${GEMINI_MODEL} · ${GEMINI_API_KEY ? "enabled" : "demo-local mode"}`);
});
