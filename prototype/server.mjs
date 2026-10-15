import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BUNDLED_FILES } from "./bundled-data.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT_CANDIDATES = [...new Set([
  process.cwd(),
  path.resolve(HERE, ".."),
  HERE,
  path.resolve(HERE, "../.."),
  path.resolve(process.cwd(), ".."),
])];

async function findProjectRoot() {
  for (const candidate of ROOT_CANDIDATES) {
    try {
      await fs.access(path.join(candidate, "knowledge-base", "00-catalog", "ingest-default.txt"));
      return candidate;
    } catch {
      // Try the next layout used by local and bundled runtimes.
    }
  }
  return path.resolve(HERE, "..");
}

const ROOT = await findProjectRoot();

async function readProjectFile(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  try {
    return await fs.readFile(fullPath, "utf8");
  } catch (error) {
    const bundled = BUNDLED_FILES[relativePath.split(path.sep).join("/")];
    if (bundled !== undefined) return bundled;
    throw error;
  }
}

// Load local secrets when running from the repository. Local `.env` wins over
// shell exports so different projects do not accidentally share one API key;
// hosted platform variables remain authoritative when running there.
const localEnv = await fs.readFile(path.join(HERE, ".env"), "utf8").catch(() => "");
const hostedRuntime = Boolean(process.env.VERCEL || process.env.RENDER || process.env.RAILWAY_ENVIRONMENT || process.env.K_SERVICE);
for (const line of localEnv.split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
  if (!match || (hostedRuntime && match[1] in process.env)) continue;
  process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
}

const PORT = Number(process.env.PORT || 4310);
const HOST = process.env.HOST || "0.0.0.0";
const AI_PROVIDER = (process.env.AI_PROVIDER || "openai").toLowerCase();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_MODEL = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
const GROQ_BASE_URL = "https://api.groq.com/openai/v1/chat/completions";
const GPT_API_KEY = process.env.OPENAI_API_KEY || "";
const GPT_MODEL = process.env.GPT_MODEL || "gpt-5-mini";
const GPT_BASE_URL = "https://api.openai.com/v1/responses";
const MAX_MESSAGE_LENGTH = 4000;
const MAX_CONTEXT_CHARS = 24000;
const MAX_REQUESTS_PER_MINUTE = Number(process.env.MAX_REQUESTS_PER_MINUTE || 30);

const PROFILE_LABELS = { all: "Semua referensi" };
const ACTIVE_MODEL = AI_PROVIDER === "groq" ? GROQ_MODEL : AI_PROVIDER === "openai" ? GPT_MODEL : GEMINI_MODEL;
const ACTIVE_API_KEY = AI_PROVIDER === "groq" ? GROQ_API_KEY : AI_PROVIDER === "openai" ? GPT_API_KEY : GEMINI_API_KEY;

const MODEL_OPTIONS = [
  { id: GROQ_MODEL, label: `Qwen · ${GROQ_MODEL}`, provider: "groq", apiKey: GROQ_API_KEY },
  { id: GEMINI_MODEL, label: `Gemini · ${GEMINI_MODEL}`, provider: "gemini", apiKey: GEMINI_API_KEY },
  { id: GPT_MODEL, label: `GPT · ${GPT_MODEL}`, provider: "openai", apiKey: GPT_API_KEY },
].filter((model, index, all) => all.findIndex((item) => item.id === model.id) === index);
const MODELS = MODEL_OPTIONS.map((model) => model.id);

let systemPrompt = "";
let localDocs = [];
let studentTowerFixtures = { students: [], scenarios: [], version: "0.1.0" };
const workflowSessions = new Map();
const requestLog = new Map();

async function loadData() {
  systemPrompt = await readProjectFile("Prompt Sistem Chatbot - Knowledge Base Terstruktur.md").catch(() =>
    "Jawab sebagai rekan kerja Student Advisor berdasarkan referensi yang diberikan. Jangan mengarang."
  );
  const list = await readProjectFile(path.join("knowledge-base", "00-catalog", "ingest-default.txt"));
  const paths = list
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  localDocs = [];
  for (const relative of paths) {
    const content = await readProjectFile(path.join("knowledge-base", relative)).catch(() => "");
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
  const fixtureBase = "prototype/fixtures/student-tower";
  try {
    const students = JSON.parse(await readProjectFile(`${fixtureBase}/students.json`));
    const scenarios = JSON.parse(await readProjectFile(`${fixtureBase}/scenarios.json`));
    studentTowerFixtures = {
      version: students.fixture_version || scenarios.fixture_version || "0.1.0",
      students: Array.isArray(students.students) ? students.students : [],
      scenarios: Array.isArray(scenarios.scenarios) ? scenarios.scenarios : [],
    };
  } catch (error) {
    console.warn(`Student Tower fixtures tidak dapat dimuat: ${error.message}`);
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
  "beberapa", "hari", "setelah", "membuat", "menyelesaikan", "langkah", "bagian", "masih", "dilakukan", "bisa",
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
  const text = String(value || "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<https?:\/\/[^>]+>/g, "")
    .replace(/\b(beranda|formasi|faq|dasar hukum|buku petunjuk|buku panduan|pedoman|helpdesk|buat akun|masuk|memuat data|tentang kami|sejarah singkat|visi dan misi|koleksi buku|koleksi majalah|dokumen lain(nya)?|media sosial|facebook|twitter\s*\/\s*x|youtube|instagram)\b/gi, " ")
    .replace(/\b\d{4}\s*©\s*[^.]+/gi, "")
    .replace(/[*_`>#]/g, "")
    .replace(/^\s*[-+•]\s+/, "")
    .replace(/\s+/g, " ")
    .trim();
  const words = text.split(" ");
  for (let size = Math.min(36, Math.floor(words.length / 2)); size >= 5; size -= 1) {
    const first = words.slice(0, size).join(" ");
    const second = words.slice(size, size * 2).join(" ");
    if (first === second) words.splice(size, size);
  }
  return words.join(" ").trim();
}

function isBoilerplate(line) {
  const value = normalize(line);
  if (!value) return true;
  if (value.includes("copyright") || value.includes("all rights reserved") || value.includes("total pengunjung")) return true;
  const standaloneNavigation = new Set([
    "beranda", "formasi", "faq", "dasar hukum", "buku petunjuk", "buku panduan", "pedoman", "helpdesk",
    "buat akunmasuk", "memuat data", "kontak", "tautan", "media sosial", "facebooktwitter xyoutubeinstagram",
  ]);
  if (value.length <= 80 && standaloneNavigation.has(value)) return true;
  const navigationWords = ["beranda", "tentang kami", "faq", "login", "buat akun", "koleksi buku", "media sosial", "memuat data"];
  return navigationWords.filter((word) => value.includes(word)).length >= 4;
}

function makeChunks(doc) {
  const body = doc.content.replace(/^---[\s\S]*?---\s*/, "");
  const normalizedTitle = normalize(doc.title);
  const lines = body.split(/\r?\n/).filter((raw) => !isBoilerplate(raw)).map(cleanExcerpt).map((line) => {
    let result = line;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      if (!normalize(result).startsWith(`${normalizedTitle} `)) break;
      result = result.slice(doc.title.length).trim();
    }
    return result;
  }).filter((line) =>
    line && normalize(line) !== normalizedTitle && !isBoilerplate(line) && !/^\|?\s*[-:|]+\s*\|?$/.test(line) && !/^sumber:/i.test(line) && !/^status:/i.test(line)
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
  const queryProfile = detectProfile(terms);
  const ranked = [];
  for (const doc of localDocs) {
    const title = normalize(doc.title);
    const profile = doc.metadata.profile_id || doc.relative.split("/")[0];
    const profileBoost = queryProfile ? (profile === queryProfile ? 14 : -6) : 0;
    for (const chunk of doc.chunks) {
      let score = profileBoost;
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
    if (selected.length >= 6) break;
  }
  const candidates = [...new Map(selected.map((item) => [item.relative, item])).values()];
  const sources = candidates.map((doc) => ({
    title: doc.title,
    path: doc.relative,
    profile: PROFILE_LABELS[doc.metadata.profile_id] || doc.metadata.profile || "Referensi kerja",
    status: doc.metadata.source_status || "verified_extracted",
    url: doc.metadata.source_url || "",
  })).slice(0, 4);
  const context = selected
    .map((item) => `Dokumen: ${item.title}\nPath: ${item.relative}\nStatus: ${item.metadata.source_status || "verified_extracted"}\nKutipan relevan: ${item.chunk}`)
    .join("\n\n")
    .slice(0, MAX_CONTEXT_CHARS);
  return { candidates, context, sources, selected };
}

const PROFILE_HINTS = [
  { id: "01-kejarkedinasan", terms: ["kedinasan", "sscasn", "stan", "stis", "stmkg", "ipdn", "stin", "poltek", "kemenhub"] },
  { id: "02-pejuang-kampus-impian", terms: ["snbp", "snbt", "snpmb", "utbk", "kampus", "ptn", "jurusan"] },
  { id: "03-pendekar-tka", terms: ["tka", "asesmen", "tes kemampuan akademik", "pusmendik"] },
  { id: "04-bac-12-sma", terms: ["brain academy", "bac", "master teacher", "student advisor"] },
  { id: "05-math-champs", terms: ["math champs", "sempoa", "singapore math"] },
  { id: "06-brain-academy-online", terms: ["brain academy online", "kelas online", "sesi tutor", "koin tutor"] },
];

function detectProfile(terms) {
  const text = terms.join(" ");
  const matches = PROFILE_HINTS.map((profile) => ({
    id: profile.id,
    score: profile.terms.reduce((total, hint) => total + (text.includes(hint) ? 1 : 0), 0),
  })).sort((a, b) => b.score - a.score);
  return matches[0]?.score ? matches[0].id : "";
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
      answer: "Aku belum menemukan informasi yang cukup untuk memastikan hal itu. Coba tambahkan nama topik, program, instansi, atau tahun yang lebih spesifik.",
      sources: [],
    };
  }
  const answer = retrieved.selected?.length
    ? "Model AI sedang tidak tersedia, jadi aku belum bisa menyusun jawaban yang andal untuk kasus ini. Informasinya perlu ditinjau ulang sebelum digunakan untuk memberi arahan kepada siswa. Coba lagi saat model tersedia atau konfirmasi ke kanal resmi terkait."
    : "Aku menemukan sumber yang cocok, tetapi belum ada potongan teks yang bisa diringkas dari dokumen tersebut.";
  return { mode: "demo-local", model: "local-retrieval", answer, sources: retrieved.sources };
}

function buildStudentTowerContext(studentContext) {
  if (!studentContext) return "";
  const workflow = studentContext.active_workflows?.[0];
  const workflowInstruction = workflow?.status === "STRUCTURING_INSIGHT"
    ? "TUGAS WORKFLOW: ekstrak hanya isi raw_consultation_note. Kelompokkan preferensi siswa, posisi orang tua, batasan, kesepakatan, risiko, dan hal belum diketahui. Jangan rekomendasikan outcome. Akhiri dengan meminta SA mengoreksi atau mengonfirmasi ekstraksi."
    : workflow?.status === "WAITING_FOR_SA_CONFIRMATION"
      ? "TUGAS WORKFLOW: tampilkan draft_decision, alasan, dan implikasinya. Minta SA mengonfirmasi atau mengoreksi draft; jangan menganggapnya sudah resmi."
      : "";
  return `KONTEKS SIMULASI STUDENT TOWER:\n${JSON.stringify(studentContext, null, 2)}\n\nGunakan data ini sebagai konteks kasus sintetis untuk development. Jangan menganggapnya sebagai data siswa nyata.${workflowInstruction ? `\n\n${workflowInstruction}` : ""}`;
}

function buildPrompt(message, context, studentContext) {
  const studentBlock = buildStudentTowerContext(studentContext);
  const responseStyle = "POLA RESPONS UNTUK SA: Jawab seperti rekan kerja di chat, bukan laporan. Mulai dari jawaban inti dalam 1–2 kalimat, lalu beri satu langkah berikutnya. Untuk pertanyaan operasional sederhana seperti tindakan berikutnya, batasi jawaban sekitar 80–140 kata dan jangan merangkum semua field kasus; sebutkan hanya data yang mengubah tindakan. Ajukan satu pertanyaan saja jika ada blocker. Jangan selalu memakai section atau heading tetap; gunakan bullet hanya untuk perbandingan, ringkasan catatan raw, atau daftar data yang wajib dikonfirmasi. Detail tambahan hanya diberikan jika SA memintanya.";
  return `${buildInstructions()}\n\n${studentBlock ? `${studentBlock}\n\n` : ""}REFERENSI KERJA INTERNAL:\n${context || "Tidak ada referensi relevan yang ditemukan."}\n\n${responseStyle}\n\nPERTANYAAN STUDENT ADVISOR:\n${message}`;
}

function sanitizeAssistantAnswer(value) {
  return String(value || "")
    .replace(/\bBerdasarkan (?:referensi|dokumen) yang tersedia[:,]?\s*/gi, "")
    .replace(/\bBerdasarkan informasi yang tersedia[:,]?\s*/gi, "")
    .replace(/\bBerdasarkan data ekstraksi[^.]*\.\s*/gi, "")
    .replace(/\bkutipan di atas\b/gi, "informasi yang ada")
    .replace(/\b(?:data|tanggal) ekstraksi:?\s*\d{1,2}\s+\w+\s+\d{4}/gi, "informasi saat ini")
    .replace(/\b(?:knowledge base|referensi kerja)\b/gi, "informasi yang ada")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function extractOpenAiText(data) {
  const direct = typeof data?.output_text === "string" ? data.output_text : "";
  if (direct.trim()) return direct.trim();
  return (data?.output || [])
    .flatMap((item) => item?.content || [])
    .filter((item) => item?.type === "output_text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n")
    .trim();
}

function buildInstructions() {
  return `${systemPrompt}\n\nATURAN TAMBAHAN UNTUK PROTOTYPE:\n- Perlakukan pengguna sebagai Student Advisor yang sedang membantu siswa/orang tua; gunakan nada rekan kerja yang hangat, suportif, dan profesional.\n- Jika konteks simulasi Student Tower diberikan, gunakan sebagai fakta kasus sintetis dan jangan mengarang data yang tidak ada di dalamnya.\n- Jika konteks memiliki active_workflows dan SA bertanya apa yang harus dilakukan, mulai dari workflow yang statusnya membutuhkan tindakan: jelaskan tujuan, next action, peserta, persiapan, kriteria selesai, dan blocker yang perlu diperiksa.\n- Bedakan fakta sistem, informasi hasil konsultasi, observasi SA, interpretasi, dan keputusan.\n- Jangan mengklaim workflow sudah dijalankan, konsultasi sudah terjadi, atau data sudah diperbarui. Bedakan usulan tindakan dari tindakan yang sudah dikonfirmasi SA.\n- Jangan menetapkan Lanjut, Lanjut dengan Risk, atau Pivot secara otomatis. Susun skenario dan minta SA mengonfirmasi outcome.\n- Jika informasi penting belum tersedia, ajukan satu pertanyaan klarifikasi yang paling memengaruhi keputusan.\n- Jika siswa dan orang tua tidak selaras, tampilkan perbedaannya secara netral dan bantu cari ruang kompromi.\n- Jika input SA berupa catatan raw, ekstrak keinginan siswa, posisi orang tua, kemampuan, batasan, risiko, kesepakatan, dan hal yang belum jelas. Minta konfirmasi sebelum memperlakukan interpretasi sebagai fakta.\n- Saat membantu menjalankan workflow, gunakan urutan: tujuan tindakan, langkah berikutnya, pertanyaan/data yang perlu dikumpulkan, bukti selesai, lalu tindak lanjut.\n- Jangan menyebut "knowledge base", "referensi kerja", "konteks", "kutipan di atas", proses retrieval, atau istilah internal lain kepada pengguna kecuali mereka memang menanyakannya. Jawab seolah-olah rekan SA sedang membantu rekan SA lain.\n- Jangan memakai kata "biasanya", "umumnya", atau asumsi serupa untuk menutup kekurangan bukti. Katakan langsung jika sesuatu belum dapat dipastikan dan berikan langkah konfirmasi yang relevan.\n- Untuk sapaan singkat seperti halo atau hai, balas ramah dan singkat; jangan memaksakan topik atau sumber.\n- Mulai langsung dari inti jawaban. Jangan memakai template tetap atau heading "Jawaban", "Sumber", dan "Catatan" kecuali memang membantu.\n- Jika pertanyaan meminta langkah sekaligus menanyakan bagian yang belum dijelaskan, pisahkan menjadi "Yang dapat dilakukan" dan "Yang masih perlu dikonfirmasi".\n- Untuk rekomendasi, rangkum kebutuhan siswa secara singkat, berikan 2–3 opsi pendampingan yang relevan, jelaskan "cocok untuk" tiap opsi, lalu ajukan satu pertanyaan paling penting untuk membantu SA memilih.\n- Jika yang diminta rekomendasi dukungan, prioritaskan konsultasi, wali asuh, Master Teacher, kelas, tryout, atau materi belajar. Jangan mengisi jawaban dengan aturan pendaftaran atau persyaratan administrasi kecuali memang diminta.\n- Jangan menjadikan rekomendasi sebagai promosi penjualan. Jangan menonjolkan harga, diskon, kuota, atau klaim pemasaran kecuali pengguna memang meminta perbandingan komersial dan datanya jelas.\n- Jangan menjanjikan hasil akademik atau kelulusan.\n- Jangan menggeneralisasi prosedur khusus satu sekolah kedinasan ke instansi lain. Gunakan prosedur spesifik hanya jika pengguna menyebut instansi tersebut; selain itu jelaskan bahwa prosedur berbeda menurut instansi.\n- Gunakan paragraf pendek; pakai bullet hanya untuk daftar atau langkah.\n- Ringkas referensi internal, jangan menyalin mentah isi halaman, menu navigasi, footer, atau teks berulang.\n- Jangan menyalin metadata teknis, label status internal, atau daftar sumber panjang ke dalam jawaban.\n- Gunakan hanya referensi kerja internal yang diberikan. Jika konteks tidak cukup, katakan dengan natural bahwa informasinya belum cukup dan perlu dikonfirmasi.\n- Jangan mengubah ketiadaan informasi menjadi dugaan atau saran yang terdengar seperti fakta.\n- Jangan mengarang angka, jadwal, biaya, persyaratan, atau tautan.`;
}

function formatProviderError(provider, status, data) {
  const detail = String(data?.error?.message || `${provider} API error (${status})`);
  const wait = detail.match(/try again in\s+([\d.]+)s/i)?.[1];
  if (/rate limit|rate_limit_exceeded|too many requests/i.test(detail)) {
    return `${provider} sedang mencapai batas penggunaan sementara.${wait ? ` Coba lagi sekitar ${Math.ceil(Number(wait))} detik.` : " Coba lagi sebentar."}`;
  }
  if (/credit|quota|billing|insufficient/i.test(detail)) {
    return `${provider} sedang tidak dapat digunakan karena kuota atau kredit API tidak mencukupi.`;
  }
  return `${provider} sedang tidak tersedia. Coba lagi sebentar.`;
}

async function callGemini({ message, history = [], model = GEMINI_MODEL, apiKey = GEMINI_API_KEY, studentContext = null }) {
  if (!apiKey) throw new Error("GEMINI_API_KEY belum dikonfigurasi.");
  const retrieved = isGreeting(message) ? { context: "", sources: [] } : retrieve(message);
  const contents = [
    ...history.slice(-10).map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: String(item.content || "").slice(0, MAX_MESSAGE_LENGTH) }],
    })),
    { role: "user", parts: [{ text: buildPrompt(message, retrieved.context, studentContext) }] },
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
  const answer = sanitizeAssistantAnswer((data.candidates || [])
    .flatMap((candidate) => candidate.content?.parts || [])
    .map((part) => part.text || "")
    .join("\n")
    .trim());
  if (!answer) throw new Error("Model tidak mengembalikan jawaban.");
  return { mode: "gemini", model, answer, sources: retrieved.sources };
}

async function callGroq({ message, history = [], model = GROQ_MODEL, apiKey = GROQ_API_KEY, studentContext = null }) {
  if (!apiKey) throw new Error("GROQ_API_KEY belum dikonfigurasi.");
  const retrieved = isGreeting(message) ? { context: "", sources: [] } : retrieve(message);
  const messages = [
    { role: "system", content: `${buildInstructions()}\n- Untuk Qwen, jawab ringkas tetapi utuh: prioritaskan inti, maksimal 4 bagian pendek, dan jangan mengulang pertanyaan.` },
    ...history.slice(-10).map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: String(item.content || "").slice(0, MAX_MESSAGE_LENGTH),
    })),
    { role: "user", content: `${buildStudentTowerContext(studentContext)}${studentContext ? "\n\n" : ""}${message}\n\nREFERENSI KERJA INTERNAL:\n${retrieved.context || "Tidak ada referensi relevan yang ditemukan."}` },
  ];
  const response = await fetch(GROQ_BASE_URL, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: Number(process.env.GROQ_MAX_OUTPUT_TOKENS || 600) }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(formatProviderError("Qwen", response.status, data));
  }
  const answer = sanitizeAssistantAnswer(data.choices?.[0]?.message?.content?.trim());
  if (!answer) throw new Error("Model tidak mengembalikan jawaban.");
  return { mode: "groq", model, answer, sources: retrieved.sources };
}

async function callGpt({ message, history = [], model = GPT_MODEL, apiKey = GPT_API_KEY, studentContext = null }) {
  if (!apiKey) throw new Error("OPENAI_API_KEY belum dikonfigurasi.");
  const retrieved = isGreeting(message) ? { context: "", sources: [] } : retrieve(message);
  const input = [
    ...history.slice(-10).map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: [{ type: item.role === "assistant" ? "output_text" : "input_text", text: String(item.content || "").slice(0, MAX_MESSAGE_LENGTH) }],
    })),
    {
      role: "user",
      content: [{
        type: "input_text",
        text: `${buildStudentTowerContext(studentContext)}${studentContext ? "\n\n" : ""}${message}\n\nREFERENSI KERJA INTERNAL:\n${retrieved.context || "Tidak ada referensi relevan yang ditemukan."}`,
      }],
    },
  ];
  const response = await fetch(GPT_BASE_URL, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      model,
      instructions: buildInstructions(),
      input,
      reasoning: { effort: process.env.GPT_REASONING_EFFORT || "low" },
      max_output_tokens: 1400,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = data?.error?.message || `OpenAI API error (${response.status})`;
    throw new Error(detail);
  }
  const answer = sanitizeAssistantAnswer(extractOpenAiText(data));
  if (!answer) {
    const reason = data.incomplete_details?.reason;
    throw new Error(reason === "max_output_tokens"
      ? "GPT kehabisan batas token sebelum menghasilkan jawaban."
      : "Model tidak mengembalikan jawaban.");
  }
  return { mode: "openai", model, answer, sources: retrieved.sources };
}

function resolveModel(requestedModel) {
  return MODEL_OPTIONS.find((model) => model.id === requestedModel) || MODEL_OPTIONS.find((model) => model.id === ACTIVE_MODEL) || MODEL_OPTIONS[0];
}

function getStudentFixture(studentId) {
  return studentTowerFixtures.students.find((student) => student.student_id === studentId) || null;
}

function getStudentScenarios(studentId) {
  return studentTowerFixtures.scenarios.filter((scenario) => scenario.student_id === studentId);
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function workflowSessionKey(sessionId, workflowId) {
  return `${String(sessionId || "default").slice(0, 80)}:${String(workflowId || "").slice(0, 120)}`;
}

function getWorkflowFixture(studentId, workflowId) {
  const student = getStudentFixture(studentId);
  return student?.active_workflows?.find((workflow) => workflow.workflow_id === workflowId) || null;
}

function getWorkflowState(studentId, workflowId, sessionId = "default") {
  const base = getWorkflowFixture(studentId, workflowId);
  if (!base) return null;
  const key = workflowSessionKey(sessionId, workflowId);
  if (!workflowSessions.has(key)) workflowSessions.set(key, cloneValue(base));
  return workflowSessions.get(key);
}

function workflowContext(studentContext, workflowId, sessionId) {
  if (!studentContext || !workflowId) return studentContext;
  const workflow = getWorkflowState(studentContext.student_id, workflowId, sessionId);
  if (!workflow) return studentContext;
  return { ...studentContext, active_workflows: [workflow] };
}

function workflowEnvelope(studentId, workflowId, sessionId) {
  return workflowId ? getWorkflowState(studentId, workflowId, sessionId) : null;
}

function workflowStateEnvelope(workflow) {
  if (!workflow) return null;
  return {
    workflow_id: workflow.workflow_id,
    status: workflow.status,
    current_step: workflow.current_step || "UNDERSTAND_TASK",
    title: workflow.title || null,
    objective: workflow.objective || null,
    participants: workflow.participants || [],
    consultation_focus: workflow.consultation_focus || [],
    missing_information: workflow.missing_information || [],
    success_criteria: workflow.success_criteria || [],
    next_action: workflow.next_action || null,
    needs_confirmation: ["STRUCTURING_INSIGHT", "WAITING_FOR_SA_CONFIRMATION"].includes(workflow.status),
    raw_consultation_note: workflow.raw_consultation_note || null,
    confirmed_insight: workflow.confirmed_insight || null,
    draft_decision: workflow.draft_decision || null,
    decision: workflow.decision || null,
    action_plan: workflow.action_plan || null,
  };
}

function withWorkflowState(response, workflow) {
  return { ...response, workflow, workflowState: workflowStateEnvelope(workflow) };
}

function pivotRecommendation(studentId) {
  const student = getStudentFixture(studentId);
  if (!student) return null;
  const profiling = student.profiling || {};
  const parent = student.parent_context || {};
  const candidates = (student.choices || [])
    .filter((choice) => Number(choice.priority) > 1)
    .map((choice) => {
      const simulation = choice.simulation || {};
      const gap = simulation.latest_score != null && simulation.target_score != null
        ? simulation.latest_score - simulation.target_score
        : null;
      return {
        university: choice.university,
        program: choice.program,
        route: choice.route,
        student_fit: profiling.preferred_fields?.length ? `Beririsan dengan minat ${profiling.preferred_fields.join(", ")}.` : "Minat siswa belum cukup spesifik.",
        parent_fit: parent.considerations?.length ? `Perlu divalidasi terhadap pertimbangan keluarga: ${parent.considerations.join(", ")}.` : "Pertimbangan keluarga belum lengkap.",
        ability_fit: gap == null ? "Kemampuan belum dapat dibandingkan." : `Simulasi saat ini ${Math.abs(gap)} poin ${gap >= 0 ? "di atas" : "di bawah"} target referensi.`,
        data_quality: simulation.data_quality || "missing",
        next_validation: "Konfirmasi minat siswa, persetujuan orang tua, dan kecukupan data sebelum mengubah pilihan."
      };
    });
  return {
    status: candidates.length ? "NEEDS_SA_REVIEW" : "INSUFFICIENT_DATA",
    principle: "Kandidat diprioritaskan hanya jika memenuhi tiga irisan: minat siswa, batasan keluarga, dan kemampuan berdasarkan data simulasi.",
    student_factors: profiling.preferred_fields || [],
    parent_factors: [...(parent.preferred_university_types || []), ...(parent.considerations || [])],
    ability_factors: (student.choices || []).map((choice) => ({ program: choice.program, latest_score: choice.simulation?.latest_score ?? null, target_score: choice.simulation?.target_score ?? null, data_quality: choice.simulation?.data_quality || "missing" })),
    candidates
  };
}

function outcomeActionPlan(outcome, studentId) {
  const plans = {
    CONTINUE: { action: "Lanjutkan action yang sudah disepakati.", owner: "SA dan siswa", review: "Checkpoint berikutnya" },
    CONTINUE_WITH_RISK: { action: "Susun risk plan dengan indikator nilai dan tanggal evaluasi.", owner: "SA dan siswa", review: "Tryout berikutnya" },
    PIVOT: { action: "Review rekomendasi irisan siswa, orang tua, dan kemampuan, lalu validasi kandidat bersama keluarga.", owner: "SA bersama siswa dan orang tua", review: "Setelah kandidat dikonfirmasi", recommendation: pivotRecommendation(studentId) },
    WAITING_FOR_CLARIFICATION: { action: "Lengkapi informasi yang masih kurang dan jadwalkan follow-up.", owner: "SA", review: "Sesi konsultasi berikutnya" },
  };
  return plans[outcome] || null;
}

function applyWorkflowAction({ studentId, workflowId, sessionId, action, note, insight, outcome }) {
  const workflow = getWorkflowState(studentId, workflowId, sessionId);
  if (!workflow) return { error: "Workflow tidak ditemukan." };
  const value = String(action || "");
  const requiredStatus = {
    prepare_consultation: "NEEDS_ACTION",
    start_consultation: "CONSULTATION_PREP",
    save_raw_note: "CONSULTATION_IN_PROGRESS",
    confirm_insight: "STRUCTURING_INSIGHT",
    draft_decision: "DRAFT_DECISION",
    confirm_decision: "WAITING_FOR_SA_CONFIRMATION",
    resume_decision: "WAITING_FOR_CLARIFICATION",
    complete_workflow: "WORKFLOW_UPDATED",
  }[value];
  if (!requiredStatus) return { error: "Aksi workflow tidak dikenali." };
  if (workflow.status !== requiredStatus) return { error: `Aksi ini tidak tersedia pada status ${workflow.status}.` };
  if (value === "prepare_consultation") {
    workflow.status = "CONSULTATION_PREP";
    workflow.current_step = "PREPARE_CONSULTATION";
    workflow.next_action = "Review fokus konsultasi dan pertanyaan prioritas sebelum menghubungi peserta.";
  } else if (value === "start_consultation") {
    workflow.status = "CONSULTATION_IN_PROGRESS";
    workflow.current_step = "CAPTURE_RAW_RESULT";
    workflow.next_action = "Catat hasil konsultasi dengan bahasa bebas setelah sesi selesai.";
  } else if (value === "save_raw_note") {
    if (!String(note || "").trim()) return { error: "Catatan konsultasi masih kosong." };
    workflow.raw_consultation_note = String(note).trim().slice(0, MAX_MESSAGE_LENGTH);
    workflow.status = "STRUCTURING_INSIGHT";
    workflow.current_step = "STRUCTURE_INSIGHT";
    workflow.next_action = "Tinjau ringkasan hasil konsultasi dan konfirmasi apakah sudah sesuai.";
  } else if (value === "confirm_insight") {
    if (!String(insight || "").trim()) return { error: "Ringkasan konsultasi belum tersedia." };
    workflow.confirmed_insight = String(insight).trim().slice(0, MAX_CONTEXT_CHARS);
    workflow.missing_information = workflow.missing_information || [];
    workflow.status = "DRAFT_DECISION";
    workflow.current_step = "DRAFT_DECISION";
    workflow.next_action = "Pilih outcome yang ingin disusun sebagai draft keputusan.";
  } else if (value === "draft_decision") {
    const allowed = workflow.allowed_outcomes || [];
    if (!allowed.includes(outcome)) return { error: "Outcome belum tersedia untuk workflow ini." };
    workflow.draft_decision = { outcome, status: "DRAFT", created_by: "SA", basis: workflow.confirmed_insight || null, pivot_recommendation: outcome === "PIVOT" ? pivotRecommendation(studentId) : null };
    workflow.status = "WAITING_FOR_SA_CONFIRMATION";
    workflow.current_step = "CONFIRM_DECISION";
    workflow.next_action = `Review dan konfirmasi draft outcome ${outcome}.`;
  } else if (value === "confirm_decision") {
    if (!workflow.draft_decision?.outcome) return { error: "Draft keputusan belum dibuat." };
    const plan = outcomeActionPlan(workflow.draft_decision.outcome, studentId);
    workflow.decision = { ...workflow.draft_decision, status: "CONFIRMED", confirmed_by: "SA" };
    workflow.action_plan = plan;
    if (workflow.draft_decision.outcome === "WAITING_FOR_CLARIFICATION") {
      workflow.status = "WAITING_FOR_CLARIFICATION";
      workflow.current_step = "COLLECT_MISSING_INFORMATION";
      workflow.next_action = "Tindak lanjuti informasi yang belum tersedia. Lanjutkan evaluasi setelah informasi dikonfirmasi.";
    } else {
      workflow.status = "WORKFLOW_UPDATED";
      workflow.current_step = "WORKFLOW_UPDATE";
      workflow.next_action = "Review action plan dan tandai workflow selesai setelah tindak lanjut siap.";
    }
  } else if (value === "resume_decision") {
    workflow.status = "DRAFT_DECISION";
    workflow.current_step = "DRAFT_DECISION";
    workflow.draft_decision = null;
    workflow.decision = null;
    workflow.action_plan = null;
    workflow.next_action = "Tinjau informasi baru yang sudah dikonfirmasi, lalu susun draft keputusan.";
  } else if (value === "complete_workflow") {
    if (!workflow.action_plan) return { error: "Action plan belum tersedia." };
    workflow.status = "COMPLETED";
    workflow.current_step = "COMPLETED";
    workflow.next_action = null;
  }
  workflow.updated_at = new Date().toISOString();
  return { workflow };
}

function requestWorkflowContext(body) {
  const studentContext = body.studentFixtureId ? getStudentFixture(String(body.studentFixtureId)) : null;
  const workflowId = body.workflowId ? String(body.workflowId) : "";
  const sessionId = body.workflowSessionId ? String(body.workflowSessionId) : "default";
  return { studentContext: workflowContext(studentContext, workflowId, sessionId), workflowId, sessionId, workflow: workflowEnvelope(studentContext?.student_id, workflowId, sessionId) };
}

async function callConfiguredModel(model, { message, history, studentContext = null }) {
  if (!model.apiKey) throw new Error(`${model.label} belum dikonfigurasi.`);
  if (model.provider === "gemini") return callGemini({ message, history, model: model.id, apiKey: model.apiKey, studentContext });
  if (model.provider === "groq") return callGroq({ message, history, model: model.id, apiKey: model.apiKey, studentContext });
  if (model.provider === "openai") return callGpt({ message, history, model: model.id, apiKey: model.apiKey, studentContext });
  throw new Error(`Provider ${model.provider} belum didukung.`);
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
      studentTowerFixtures: studentTowerFixtures.students.length,
      mode: ACTIVE_API_KEY ? AI_PROVIDER : "demo-local",
    });
  }
  if (req.method === "GET" && url.pathname === "/api/student-tower/fixtures") {
    return json(res, 200, {
      version: studentTowerFixtures.version,
      students: studentTowerFixtures.students.map((student) => ({
        student_id: student.student_id,
        checkpoint: student.checkpoint,
        admission_route: student.admission_route,
        choice_count: student.choices.length,
      })),
      scenarios: studentTowerFixtures.scenarios.map((scenario) => ({
        scenario_id: scenario.scenario_id,
        title: scenario.title,
        student_id: scenario.student_id,
        purpose: scenario.purpose,
        expected_state: scenario.expected_state,
        expected_outcome: scenario.expected_outcome,
      })),
    });
  }
  if (req.method === "GET" && url.pathname.startsWith("/api/student-tower/fixtures/")) {
    const studentId = decodeURIComponent(url.pathname.slice("/api/student-tower/fixtures/".length));
    const student = getStudentFixture(studentId);
    if (!student) return json(res, 404, { error: "Fixture siswa tidak ditemukan." });
    return json(res, 200, { student, scenarios: getStudentScenarios(studentId) });
  }
  if (req.method === "POST" && url.pathname === "/api/student-tower/workflows/action") {
    try {
      const body = await readBody(req);
      const studentId = String(body.studentFixtureId || "");
      const workflowId = String(body.workflowId || "");
      if (!studentId || !workflowId) return json(res, 400, { error: "Siswa dan workflow wajib dipilih." });
      if (!getStudentFixture(studentId)) return json(res, 404, { error: "Fixture siswa tidak ditemukan." });
      const result = applyWorkflowAction({
        studentId,
        workflowId,
        sessionId: String(body.workflowSessionId || "default"),
        action: body.action,
        note: body.note,
        insight: body.insight,
        outcome: body.outcome,
      });
      if (result.error) return json(res, 400, { error: result.error });
      return json(res, 200, { workflow: result.workflow, workflowId, sessionId: String(body.workflowSessionId || "default") });
    } catch (error) {
      return json(res, 400, { error: error.message || "Aksi workflow tidak dapat diproses." });
    }
  }
  if (req.method === "POST" && url.pathname === "/api/compare") {
    try {
      if (isRateLimited(req)) return json(res, 429, { error: "Batas penggunaan sementara tercapai. Coba lagi sebentar." });
      const body = await readBody(req);
      const message = String(body.message || "").trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!message) return json(res, 400, { error: "Pertanyaan masih kosong." });
      const history = Array.isArray(body.history) ? body.history : [];
      const workflowRequest = requestWorkflowContext(body);
      if (body.workflowId && !workflowRequest.workflow) return json(res, 404, { error: "Workflow tidak ditemukan." });
      const results = await Promise.all(MODEL_OPTIONS.map(async (model) => {
        if (!model.apiKey) {
          return { id: model.id, label: model.label, provider: model.provider, status: "unavailable", error: `${model.label} belum dikonfigurasi.` };
        }
        try {
          const result = await callConfiguredModel(model, { message, history, studentContext: workflowRequest.studentContext });
          return { id: model.id, label: model.label, provider: model.provider, status: "success", answer: result.answer };
        } catch (error) {
          console.error(`[compare/${model.provider}/${model.id}]`, error.message);
          return { id: model.id, label: model.label, provider: model.provider, status: "error", error: error.message || "Model tidak tersedia." };
        }
      }));
      return json(res, 200, { mode: "comparison", results, ...withWorkflowState({}, workflowRequest.workflow), workflowId: workflowRequest.workflowId || null });
    } catch (error) {
      return json(res, 500, { error: error.message || "Gagal membandingkan model." });
    }
  }
  if (req.method === "POST" && url.pathname === "/api/chat") {
    try {
      if (isRateLimited(req)) return json(res, 429, { error: "Batas penggunaan sementara tercapai. Coba lagi sebentar." });
      const body = await readBody(req);
      const message = String(body.message || "").trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!message) return json(res, 400, { error: "Pertanyaan masih kosong." });
      const history = Array.isArray(body.history) ? body.history : [];
      const workflowRequest = requestWorkflowContext(body);
      if (body.workflowId && !workflowRequest.workflow) return json(res, 404, { error: "Workflow tidak ditemukan." });
      const studentContext = workflowRequest.studentContext;
      const selected = resolveModel(String(body.model || ACTIVE_MODEL));
      if (selected.apiKey && selected.provider === "gemini") {
        try {
          return json(res, 200, { ...withWorkflowState(await callGemini({ message, history, model: selected.id, apiKey: selected.apiKey, studentContext }), workflowRequest.workflow), workflowId: workflowRequest.workflowId || null });
        } catch (error) {
          console.error(`[${selected.provider}/${selected.id}]`, error.message);
          const fallback = localSearch(message);
          return json(res, 200, {
            ...fallback,
            model: selected.id,
            mode: "demo-local-fallback",
            warning: "Model AI sedang tidak tersedia; jawaban sementara diambil dari retrieval lokal.",
            ...withWorkflowState({}, workflowRequest.workflow),
            workflowId: workflowRequest.workflowId || null,
          });
        }
      }
      if (selected.apiKey && selected.provider === "groq") {
        try {
          return json(res, 200, { ...withWorkflowState(await callGroq({ message, history, model: selected.id, apiKey: selected.apiKey, studentContext }), workflowRequest.workflow), workflowId: workflowRequest.workflowId || null });
        } catch (error) {
          console.error(`[${selected.provider}/${selected.id}]`, error.message);
          const fallback = localSearch(message);
          return json(res, 200, {
            ...fallback,
            model: selected.id,
            mode: "demo-local-fallback",
            warning: "Model AI sedang tidak tersedia; jawaban sementara diambil dari retrieval lokal.",
            ...withWorkflowState({}, workflowRequest.workflow),
            workflowId: workflowRequest.workflowId || null,
          });
        }
      }
      if (selected.apiKey && selected.provider === "openai") {
        try {
          return json(res, 200, { ...withWorkflowState(await callGpt({ message, history, model: selected.id, apiKey: selected.apiKey, studentContext }), workflowRequest.workflow), workflowId: workflowRequest.workflowId || null });
        } catch (error) {
          console.error(`[${selected.provider}/${selected.id}]`, error.message);
          const fallback = localSearch(message);
          return json(res, 200, {
            ...fallback,
            model: selected.id,
            mode: "demo-local-fallback",
            warning: "Model AI sedang tidak tersedia; jawaban sementara diambil dari retrieval lokal.",
            ...withWorkflowState({}, workflowRequest.workflow),
            workflowId: workflowRequest.workflowId || null,
          });
        }
      }
      return json(res, 200, {
        ...localSearch(message),
        model: selected.id,
        ...withWorkflowState({}, workflowRequest.workflow),
        workflowId: workflowRequest.workflowId || null,
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
export default handle;

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  http.createServer(handle).listen(PORT, HOST, () => {
    console.log(`Knowledge chatbot prototype: http://${HOST}:${PORT}`);
    console.log(`Local documents loaded: ${localDocs.length}`);
    console.log(`AI provider: ${AI_PROVIDER} · model: ${ACTIVE_MODEL} · ${ACTIVE_API_KEY ? "enabled" : "demo-local mode"}`);
  });
}
