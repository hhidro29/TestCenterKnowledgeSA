import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

// Load local secrets when running from the repository. Hosting platforms inject
// environment variables themselves, so existing variables always win.
const localEnv = await fs.readFile(path.join(HERE, ".env"), "utf8").catch(() => "");
for (const line of localEnv.split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
  if (!match || match[1] in process.env) continue;
  process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
}

const PORT = Number(process.env.PORT || 4310);
const HOST = process.env.HOST || "0.0.0.0";
const AI_PROVIDER = (process.env.AI_PROVIDER || "gemini").toLowerCase();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_MODEL = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
const GROQ_BASE_URL = "https://api.groq.com/openai/v1/chat/completions";
const MAX_MESSAGE_LENGTH = 4000;
const MAX_CONTEXT_CHARS = 24000;
const MAX_REQUESTS_PER_MINUTE = Number(process.env.MAX_REQUESTS_PER_MINUTE || 30);

const PROFILE_LABELS = { all: "Semua knowledge base" };
const ACTIVE_MODEL = AI_PROVIDER === "groq" ? GROQ_MODEL : GEMINI_MODEL;
const ACTIVE_API_KEY = AI_PROVIDER === "groq" ? GROQ_API_KEY : GEMINI_API_KEY;
const MODEL_OPTIONS = [
  { id: GROQ_MODEL, label: `Qwen · ${GROQ_MODEL}`, provider: "groq", apiKey: GROQ_API_KEY },
  { id: GEMINI_MODEL, label: `Gemini · ${GEMINI_MODEL}`, provider: "gemini", apiKey: GEMINI_API_KEY },
].filter((model, index, all) => all.findIndex((item) => item.id === model.id) === index);
const MODELS = MODEL_OPTIONS.map((model) => model.id);

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
    const doc = { relative, content, metadata, title: metadata.title || path.basename(relative) };
    doc.chunks = makeChunks(doc);
    localDocs.push(doc);
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
  "ada", "adalah", "agar", "akan", "aku", "anda", "apa", "apakah", "atau", "bagaimana", "bagi", "bahwa", "belum",
  "berapa", "berdasarkan", "bisa", "dan", "dapat", "dari", "dengan", "di", "dalam", "dijelaskan", "ini", "itu",
  "jadi", "juga", "kami", "kamu", "karena", "ke", "kemungkinan", "ketika", "mana", "masih", "mau", "menurut",
  "menyiapkan", "perlu", "oleh", "pada", "pasti", "saja", "saya", "sebagai", "sebutkan", "sebuah", "sistem",
  "sumber", "tadi", "tentang", "terkait", "tersebut", "tidak", "untuk", "ulang", "yang", "nya", "the", "and",
  "what", "how", "does", "from", "based", "please", "tell", "need", "want", "should", "could", "with", "have",
]);

function queryTerms(query) {
  return [...new Set(normalize(query).split(/\s+/).filter((term) => term.length > 2 && !STOPWORDS.has(term)))];
}

function isGreeting(query) {
  const value = normalize(query).trim();
  return /^(halo|hai|hi|hello|hey|pagi|siang|sore|malam|terima kasih|makasih|thanks|thank you)[!.?\s]*$/.test(value);
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

function makeChunks(doc) {
  const body = doc.content.replace(/^---[\s\S]*?---\s*/, "");
  const lines = body.split(/\r?\n/).map(cleanExcerpt).filter((line) =>
    line && !/^\|?\s*[-:|]+\s*\|?$/.test(line) && !/^sumber:/i.test(line) && !/^status:/i.test(line)
  );
  const chunks = [];
  let current = [];
  let length = 0;
  const flush = () => {
    if (!current.length) return;
    const text = current.join(" ").trim();
    if (text.length > 25) chunks.push({ text, normalized: normalize(text) });
    current = [];
    length = 0;
  };
  for (const line of lines) {
    if (length + line.length > 700 && current.length) flush();
    if (line.length > 850) {
      for (let index = 0; index < line.length; index += 700) {
        const text = line.slice(index, index + 700).trim();
        if (text.length > 25) chunks.push({ text, normalized: normalize(text) });
      }
      continue;
    }
    current.push(line);
    length += line.length + 1;
  }
  flush();
  return chunks;
}

function retrieve(query) {
  const terms = queryTerms(query);
  if (!terms.length) return { candidates: [], context: "", sources: [] };
  const yearTerms = new Set(terms.filter((term) => /^20\d\d$/.test(term)));
  const topicTerms = terms.filter((term) => !yearTerms.has(term));
  const ranked = [];
  for (const doc of localDocs) {
    const title = normalize(doc.title);
    for (const chunk of doc.chunks) {
      let score = 0;
      let matchedTopics = 0;
      for (const term of terms) {
        const pattern = new RegExp(`\\b${term}\\b`, "g");
        const titleHits = (title.match(pattern) || []).length;
        const bodyHits = (chunk.normalized.match(pattern) || []).length;
        if (titleHits || bodyHits) {
          const weight = yearTerms.has(term) ? 0.5 : 2;
          score += Math.min(bodyHits, 3) * weight + titleHits * (yearTerms.has(term) ? 1 : 6);
          if (!yearTerms.has(term)) matchedTopics += 1;
        }
      }
      if (matchedTopics > 0) {
        ranked.push({ ...doc, chunk: chunk.text, score, matchedTopics });
      }
    }
  }
  ranked.sort((a, b) => b.score - a.score || b.matchedTopics - a.matchedTopics);
  const selected = [];
  const perDoc = new Map();
  for (const candidate of ranked) {
    const count = perDoc.get(candidate.relative) || 0;
    if (count >= 2) continue;
    selected.push(candidate);
    perDoc.set(candidate.relative, count + 1);
    if (selected.length >= 8) break;
  }
  const candidates = [...new Map(selected.map((item) => [item.relative, item])).values()];
  const sources = candidates.map((doc) => ({
    title: doc.title,
    path: doc.relative,
    profile: PROFILE_LABELS[doc.metadata.profile_id] || doc.metadata.profile || "Knowledge base",
    status: doc.metadata.source_status || "verified_extracted",
    url: doc.metadata.source_url || "",
  })).slice(0, 4);
  const context = selected
    .map((item) => `Dokumen: ${item.title}\nPath: ${item.relative}\nStatus: ${item.metadata.source_status || "verified_extracted"}\nKutipan relevan: ${item.chunk}`)
    .join("\n\n")
    .slice(0, MAX_CONTEXT_CHARS);
  return { candidates, context, sources, selected };
}

function localSearch(query) {
  if (isGreeting(query)) {
    return {
      mode: "demo-local",
      model: "local-retrieval",
      answer: "Halo! Ada yang bisa aku bantu hari ini?",
      sources: [],
    };
  }
  const retrieved = retrieve(query);
  if (!retrieved.candidates.length) {
    return {
      mode: "demo-local",
      model: "local-retrieval",
      answer: "Aku belum menemukan bagian knowledge base yang cukup relevan untuk pertanyaan ini. Coba tambahkan nama topik, program, atau tahun yang lebih spesifik.",
      sources: [],
    };
  }
  const answer = retrieved.selected?.length
    ? ["Aku menemukan bagian berikut di knowledge base:", ...retrieved.selected.map((item) => `\n${item.title}\n${item.chunk}`)].join("\n")
    : "Aku menemukan sumber yang cocok, tetapi belum ada potongan teks yang bisa diringkas dari dokumen tersebut.";
  return { mode: "demo-local", model: "local-retrieval", answer, sources: retrieved.sources };
}

function buildPrompt(message, context) {
  return `${buildInstructions()}\n\nKONTEKS KNOWLEDGE BASE:\n${context || "Tidak ada konteks relevan yang ditemukan."}\n\nPERTANYAAN USER:\n${message}`;
}

function buildInstructions() {
  return `${systemPrompt}\n\nATURAN TAMBAHAN UNTUK PROTOTYPE:\n- Jawab dalam Bahasa Indonesia dengan nada natural seperti rekan kerja, bukan seperti laporan otomatis.\n- Untuk sapaan singkat seperti halo atau hai, balas ramah dan singkat; jangan memaksakan topik atau sumber knowledge base.\n- Mulai langsung dari inti jawaban. Jangan memakai template tetap atau heading "Jawaban", "Sumber", dan "Catatan" kecuali memang membantu.\n- Gunakan paragraf pendek; pakai bullet hanya untuk daftar atau langkah.\n- Kartu sumber sudah ditampilkan oleh aplikasi, jadi jangan menyalin metadata sumber panjang ke dalam jawaban. Sebutkan nama sumber secara singkat bila relevan.\n- Gunakan hanya konteks knowledge base di bawah ini. Jika konteks tidak cukup, katakan dengan bahasa natural bahwa informasinya belum ditemukan atau belum tervalidasi.\n- Jangan mengarang angka, jadwal, biaya, persyaratan, atau tautan.`;
}

async function callGemini({ message, history = [], model = GEMINI_MODEL, apiKey = GEMINI_API_KEY }) {
  if (!apiKey) throw new Error("GEMINI_API_KEY belum dikonfigurasi.");
  const retrieved = isGreeting(message) ? { context: "", sources: [] } : retrieve(message);
  const contents = [
    ...history.slice(-10).map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: String(item.content || "").slice(0, MAX_MESSAGE_LENGTH) }],
    })),
    { role: "user", parts: [{ text: buildPrompt(message, retrieved.context) }] },
  ];
  const endpoint = `${GEMINI_BASE_URL}/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
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
  return { mode: "gemini", model, answer, sources: retrieved.sources };
}

async function callGroq({ message, history = [], model = GROQ_MODEL, apiKey = GROQ_API_KEY }) {
  if (!apiKey) throw new Error("GROQ_API_KEY belum dikonfigurasi.");
  const retrieved = isGreeting(message) ? { context: "", sources: [] } : retrieve(message);
  const messages = [
    { role: "system", content: buildInstructions() },
    ...history.slice(-10).map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: String(item.content || "").slice(0, MAX_MESSAGE_LENGTH),
    })),
    { role: "user", content: `${message}\n\nKONTEKS KNOWLEDGE BASE:\n${retrieved.context || "Tidak ada konteks relevan yang ditemukan."}` },
  ];
  const response = await fetch(GROQ_BASE_URL, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 700 }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = data?.error?.message || `Groq API error (${response.status})`;
    throw new Error(detail);
  }
  const answer = data.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error("Model tidak mengembalikan jawaban.");
  return { mode: "groq", model, answer, sources: retrieved.sources };
}

function resolveModel(requestedModel) {
  return MODEL_OPTIONS.find((model) => model.id === requestedModel) || MODEL_OPTIONS.find((model) => model.id === ACTIVE_MODEL) || MODEL_OPTIONS[0];
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
      hasApiKey: Boolean(ACTIVE_API_KEY),
      defaultModel: ACTIVE_MODEL,
      models: MODEL_OPTIONS.map(({ id, label, provider, apiKey }) => ({ id, label, provider, available: Boolean(apiKey) })),
      profiles: PROFILE_LABELS,
      localDocuments: localDocs.length,
      mode: ACTIVE_API_KEY ? AI_PROVIDER : "demo-local",
    });
  }
  if (req.method === "POST" && url.pathname === "/api/chat") {
    try {
      if (isRateLimited(req)) return json(res, 429, { error: "Batas penggunaan sementara tercapai. Coba lagi sebentar." });
      const body = await readBody(req);
      const message = String(body.message || "").trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!message) return json(res, 400, { error: "Pertanyaan masih kosong." });
      const history = Array.isArray(body.history) ? body.history : [];
      const selected = resolveModel(String(body.model || ACTIVE_MODEL));
      if (selected.apiKey && selected.provider === "gemini") {
        try {
          return json(res, 200, await callGemini({ message, history, model: selected.id, apiKey: selected.apiKey }));
        } catch (error) {
          console.error(`[${selected.provider}/${selected.id}]`, error.message);
          const fallback = localSearch(message);
          return json(res, 200, {
            ...fallback,
            model: selected.id,
            mode: "demo-local-fallback",
            warning: "Model AI sedang tidak tersedia; jawaban sementara diambil dari retrieval lokal.",
          });
        }
      }
      if (selected.apiKey && selected.provider === "groq") {
        try {
          return json(res, 200, await callGroq({ message, history, model: selected.id, apiKey: selected.apiKey }));
        } catch (error) {
          console.error(`[${selected.provider}/${selected.id}]`, error.message);
          const fallback = localSearch(message);
          return json(res, 200, {
            ...fallback,
            model: selected.id,
            mode: "demo-local-fallback",
            warning: "Model AI sedang tidak tersedia; jawaban sementara diambil dari retrieval lokal.",
          });
        }
      }
      return json(res, 200, {
        ...localSearch(message),
        model: selected.id,
        warning: `${selected.label} belum dikonfigurasi. Tambahkan API key provider tersebut untuk mengaktifkannya.`,
      });
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

export { handle };

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  http.createServer(handle).listen(PORT, HOST, () => {
    console.log(`Knowledge chatbot prototype: http://${HOST}:${PORT}`);
    console.log(`Local documents loaded: ${localDocs.length}`);
    console.log(`AI provider: ${AI_PROVIDER} · model: ${ACTIVE_MODEL} · ${ACTIVE_API_KEY ? "enabled" : "demo-local mode"}`);
  });
}
