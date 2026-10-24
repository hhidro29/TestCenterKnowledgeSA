import { KNOWLEDGE, POPULAR_SEARCHES } from "./data.js";
import { QUOTA_HISTORY } from "./quota-data.js";

const app = document.querySelector("#app");
const state = { query: "", selectedId: null, docType: "Semua", selectedAnchor: null, returnPath: "" };
const DOC_TYPES = { Semua: "Semua", article: "Artikel", faq: "FAQ", "ops-note": "Ops Note", university: "Universitas", "study-program": "Program Studi" };
const QUOTA_HISTORY_BY_ID = new Map(QUOTA_HISTORY.map((record) => [record.studyProgramId, record]));
const HOME_PLACEHOLDERS = [
  "Contoh: jadwal pendaftaran PKN STAN",
  "Contoh: kuota jurusan Pendidikan Dokter UI",
  "Contoh: ketentuan pemilihan jurusan di UTBK",
  "Contoh: mata kuliah jurusan Teknik Komputer"
];
const PLACEHOLDER_TYPE_SPEED_MS = 42;
const PLACEHOLDER_PAUSE_MS = 1600;
let placeholderRotationTimer = null;
let placeholderIndex = 0;
let pendingSearchTimer = null;

const ROUTE_TYPES = new Set(["article", "university", "program", "faq", "ops-note"]);

function browserLocation() {
  return typeof window !== "undefined" && window.location ? window.location : null;
}

function searchPath(query, docType = "Semua") {
  const trimmed = String(query || "").trim();
  if (!trimmed) return "/";
  const params = new URLSearchParams({ q: trimmed });
  if (docType && docType !== "Semua") params.set("type", docType);
  return `/search?${params.toString()}`;
}

function routeForItem(item, anchor = "") {
  if (!item) return "/";
  let routeType = item.type;
  if (item.type === "entity") routeType = item.entityType === "university" ? "university" : "program";
  if (!ROUTE_TYPES.has(routeType)) routeType = "article";
  const route = `/${routeType}/${encodeURIComponent(item.id)}`;
  return anchor ? `${route}#${encodeURIComponent(anchor)}` : route;
}

function parseRoute(location = browserLocation()) {
  if (!location) return { kind: "home", query: "", selectedId: null, selectedAnchor: null, docType: "Semua" };
  const segments = String(location.pathname || "/").split("/").filter(Boolean).map((segment) => {
    try { return decodeURIComponent(segment); } catch { return segment; }
  });
  const hash = String(location.hash || "").replace(/^#/, "");
  let selectedAnchor = hash;
  try { selectedAnchor = decodeURIComponent(hash); } catch { /* Keep the raw hash when malformed. */ }
  if (!segments.length) return { kind: "home", query: "", selectedId: null, selectedAnchor: null, docType: "Semua" };
  if (segments[0] === "search") {
    const params = new URLSearchParams(location.search || "");
    const query = params.get("q") || "";
    const docType = DOC_TYPES[params.get("type")] ? params.get("type") : "Semua";
    return query.trim()
      ? { kind: "search", query: query.trim(), selectedId: null, selectedAnchor: null, docType }
      : { kind: "home", query: "", selectedId: null, selectedAnchor: null, docType: "Semua" };
  }
  if (ROUTE_TYPES.has(segments[0]) && segments[1]) {
    const item = KNOWLEDGE.find((candidate) => candidate.id === segments.slice(1).join("/"));
    if (item) return { kind: "detail", query: "", selectedId: item.id, selectedAnchor, docType: "Semua" };
  }
  return { kind: "home", query: "", selectedId: null, selectedAnchor: null, docType: "Semua" };
}

function applyRoute(location = browserLocation()) {
  const route = parseRoute(location);
  state.query = route.query;
  state.selectedId = route.selectedId;
  state.selectedAnchor = route.selectedAnchor;
  state.docType = route.docType;
  if (route.kind !== "detail") state.returnPath = "";
  return route;
}

function currentPath() {
  const location = browserLocation();
  if (!location) return "/";
  return `${location.pathname || "/"}${location.search || ""}`;
}

function navigateTo(path, { replace = false, returnPath = "" } = {}) {
  const location = browserLocation();
  if (!location || !window.history) {
    applyRoute(location);
    render();
    return;
  }
  if (replace) window.history.replaceState({}, "", path);
  else window.history.pushState({}, "", path);
  if (returnPath) state.returnPath = returnPath;
  applyRoute(window.location);
  render();
}

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

// Catalog exports sometimes contain a bare domain (for example, "ui.ac.id").
// Normalize it before placing it in an href so every official-site value is
// an actual external link.
const externalHref = (value = "") => {
  const url = String(value).trim();
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const isExternalUrl = (value = "") => /^https?:\/\//i.test(String(value).trim());

function sourceMarkup(source = {}) {
  const title = escapeHtml(source.title || "Sumber");
  const kind = escapeHtml(source.kind || "Referensi");
  const url = String(source.url || "").trim();
  if (isExternalUrl(url)) {
    return `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer"><span>${title}</span><small>${kind}</small><b>↗</b></a>`;
  }
  return `<span class="source-unavailable"><span>${title}</span><small>${kind} · Sumber internal</small><b>•</b></span>`;
}

const normalize = (value = "") => value.toLocaleLowerCase("id-ID").normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
const normalizeCatalogUrl = (value = "") => String(value).trim().replace(/\/+$/, "").toLocaleLowerCase("id-ID");
const STOP_WORDS = new Set(["yang", "dan", "atau", "untuk", "dari", "dengan", "pada", "apa", "ada", "tidak", "ini", "itu", "bisa", "saya", "nya", "ke", "di", "the", "prodi", "jurusan", "program", "studi"]);
const FAQ_HINTS = new Set(["faq", "pertanyaan", "jawaban", "tanya"]);

function tokenize(query) {
  return normalize(query).split(/[^a-z0-9]+/).map((token) => token.trim()).filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function collectSearchValues(value, values = []) {
  if (value == null) return values;
  if (typeof value === "string" || typeof value === "number") {
    values.push(String(value));
    return values;
  }
  if (Array.isArray(value)) {
    value.forEach((entry) => collectSearchValues(entry, values));
    return values;
  }
  if (typeof value === "object") Object.values(value).forEach((entry) => collectSearchValues(entry, values));
  return values;
}

function editDistance(left, right) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    const current = [row];
    for (let column = 1; column <= right.length; column += 1) {
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + (left[row - 1] === right[column - 1] ? 0 : 1)
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length];
}

function tokenMatches(term, text) {
  const words = normalize(text).split(/[^a-z0-9]+/).filter(Boolean);
  return words.some((word) => word.includes(term) || (term.length >= 4 && editDistance(term, word) <= 1));
}

function slugify(value = "") {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section";
}

function sectionAnchor(item, section, index) {
  return `${item.id}-section-${slugify(section.heading || `section-${index + 1}`)}`;
}

function excerpt(text, query, limit = 210) {
  const source = String(text || "").replace(/\s+/g, " ").trim();
  if (!source) return "";
  const terms = tokenize(query);
  const lower = normalize(source);
  const hit = terms.map((term) => lower.indexOf(term)).filter((index) => index >= 0).sort((a, b) => a - b)[0];
  if (source.length <= limit || hit == null) return source.slice(0, limit) + (source.length > limit ? "…" : "");
  const start = Math.max(0, hit - Math.floor(limit * 0.38));
  const end = Math.min(source.length, start + limit);
  return `${start ? "…" : ""}${source.slice(start, end)}${end < source.length ? "…" : ""}`;
}

function quotaHistoryFor(item) {
  if (item?.entityType !== "study-program") return null;
  return QUOTA_HISTORY_BY_ID.get(item.id) || null;
}

function formatInteger(value) {
  return new Intl.NumberFormat("id-ID").format(Number(value));
}

function formatPercent(value) {
  return `${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(Number(value))}%`;
}

function matchCandidates(item) {
  const candidates = [];
  const add = (label, text, anchor, weight = 1) => {
    if (text) candidates.push({ label, text: String(text), anchor, weight });
  };
  add("Judul", item.title || item.name, `${item.id}-title`, 5);
  add("Ringkasan", item.summary, `${item.id}-summary`, 2);
  add("Ringkasan", item.snippet, `${item.id}-summary`, 1);
  (item.sections || []).forEach((section, index) => {
    const text = collectSearchValues(section).join(" ");
    add(section.heading || "Bagian artikel", text, sectionAnchor(item, section, index), 3);
  });
  attachedFaqs(item).forEach((faq) => add("FAQ", `${faq.title || faq.q} ${faq.answer || faq.a}`, faq.id, 4));
  (item.ops || []).forEach((op, index) => add("Catatan untuk SA", op, `${item.id}-ops-${index}`, 4));
  if (item.type === "faq") add("Jawaban", item.answer, `${item.id}-answer`, 5);
  if (item.type === "ops-note") {
    add("Catatan operasional", item.note, `${item.id}-answer`, 5);
    (item.ops || []).forEach((op, index) => add("Catatan untuk SA", op, `${item.id}-ops-${index}`, 5));
  }
  const entityFields = [
    ["Website resmi", item.websiteUrl ? `Website resmi ${item.websiteUrl}` : "", `${item.id}-website`],
    ["Lokasi", `${item.location || ""} ${item.province || ""}`, `${item.id}-location`],
    ["Akreditasi institusi", item.accreditationInstitution, `${item.id}-accreditation`],
    ["Jalur masuk", (item.admissionPaths || []).join("; "), `${item.id}-admission`],
    ["Fakultas", item.faculty, `${item.id}-facts`],
    ["Universitas", item.universityName, `${item.id}-facts`]
  ];
  entityFields.forEach(([label, text, anchor]) => add(label, text, anchor, 3));
  const profile = item.profile;
  if (profile) {
    add("Profil program studi", profile.description, `${item.id}-profile-summary`, 3);
    add("Gambaran studi", profile.studyOverview, `${item.id}-profile-overview`, 3);
    add("Bidang yang dipelajari", profile.subjectStudied, `${item.id}-profile-subjects`, 4);
    add("Jenjang dan gelar", collectSearchValues(profile.degrees).join(" "), `${item.id}-profile-degrees`, 3);
    add("Kemampuan yang dilatih", (profile.skills || []).join("; "), `${item.id}-profile-skills`, 3);
    add("Prospek kerja", collectSearchValues(profile.careerProspects).join(" "), `${item.id}-profile-career`, 4);
    add("Jurusan yang sejenis", collectSearchValues(profile.similarMajors).join(" "), `${item.id}-profile-similar`, 2);
  }
  const quotaHistory = quotaHistoryFor(item);
  if (quotaHistory?.history?.length) {
    add("Peluang historis", `data kompetisi historis jurusan prodi program studi kuota daya tampung jumlah kursi pendaftar peminat peluang historis persaingan UTBK ${quotaHistory.history.map((row) => `${row.year} ${row.applicant} ${row.quota} ${row.competitiveness}`).join(" ")}`, `${item.id}-quota-history`, 4);
  }
  return candidates;
}

function matchContext(item, query) {
  const terms = tokenize(query);
  const normalizedQuery = normalize(query);
  // Context labels should follow the user's intent, even when the entity
  // title contains more matching terms than the relevant profile section.
  // This keeps queries such as "mata kuliah Pendidikan Dokter UI" anchored
  // to the study-content section instead of the result title.
  const intentRules = [
    { phrases: ["website resmi", "portal resmi", "website"], labels: new Set(["Website resmi", "Portal resmi", "Portal dan sumber lanjutan", "Portal dan catatan biaya", "Portal dan ikatan dinas", "Sumber resmi"]), boost: 78 },
    { phrases: ["jadwal", "timeline", "kapan pendaftaran"], labels: new Set(["Jadwal umum penerimaan 2026", "Jadwal dan biaya 2026", "Biaya dan jadwal 2026", "Jadwal, biaya, dan portal", "Ops update — siklus seleksi 2026", "Jadwal dan portal resmi 2026"]), boost: 84 },
    { phrases: ["syarat", "persyaratan", "ketentuan"], labels: new Set(["Persyaratan umum yang perlu dicek", "Persyaratan utama", "Persyaratan pendidikan", "Formasi dan persyaratan utama", "Kesehatan dan dokumen", "Dokumen yang biasanya perlu disiapkan", "Persyaratan dan dokumen"]), boost: 84 },
    { phrases: ["pendaftaran", "daftar", "cara masuk"], labels: new Set(["Langkah pendaftaran", "Pendaftaran dan dokumen", "Pendaftaran dan ketentuan pilihan", "Pendaftaran dan seleksi", "Alur umum pendaftaran"]), boost: 80 },
    { phrases: ["tahapan seleksi", "seleksi", "ujian"], labels: new Set(["Tahapan seleksi", "Alur umum pendaftaran"]), boost: 82 },
    { phrases: ["biaya", "bayar", "tarif"], labels: new Set(["Biaya dan pendidikan", "Biaya dan jadwal 2026", "Jadwal, biaya, dan portal", "Portal dan catatan biaya"]), boost: 82 },
    { phrases: ["mata kuliah", "yang dipelajari", "bidang studi", "pelajaran"], labels: new Set(["Bidang yang dipelajari", "Gambaran studi"]), boost: 72 },
    { phrases: ["prospek kerja", "kerja apa", "karier", "karir"], labels: new Set(["Prospek kerja"]), boost: 84 },
    { phrases: ["jenjang", "gelar"], labels: new Set(["Jenjang dan gelar"]), boost: 64 },
    { phrases: ["kemampuan", "skill", "keterampilan"], labels: new Set(["Kemampuan yang dilatih"]), boost: 64 },
    { phrases: ["jurusan yang sejenis", "jurusan sejenis", "jurusan mirip"], labels: new Set(["Jurusan yang sejenis"]), boost: 58 },
    { phrases: ["peluang", "persaingan", "pendaftar", "kuota", "daya tampung", "jumlah kursi", "peminat"], labels: new Set(["Peluang historis"]), boost: 72 }
  ];
  const scored = matchCandidates(item).map((candidate, index) => {
    const coverage = terms.reduce((count, term) => count + (tokenMatches(term, candidate.text) ? 1 : 0), 0);
    const intent = intentRules.find((rule) => rule.phrases.some((phrase) => normalizedQuery.includes(phrase)) && rule.labels.has(candidate.label));
    const intentBoost = intent ? intent.boost : 0;
    return { candidate, coverage, value: coverage * 20 + candidate.weight * 2 + intentBoost - index * 0.001 };
  }).filter((entry) => entry.coverage > 0).sort((a, b) => b.value - a.value || b.coverage - a.coverage);
  const best = scored[0]?.candidate || { label: "Ringkasan", text: item.snippet || item.summary || item.title, anchor: `${item.id}-summary` };
  return { label: best.label, anchor: best.anchor, excerpt: excerpt(best.text, query) };
}

function searchFields(item) {
  const faqs = attachedFaqs(item).flatMap((faq) => [faq.title || faq.q, faq.answer || faq.a]);
  const sources = (item.sources || []).flatMap((source) => [source.title, source.url]);
  const parent = parentArticle(item);
  const parentFields = parent
    ? [parent.title, parent.summary, parent.snippet, ...(parent.aliases || []), collectSearchValues(parent.sections).join(" ")]
    : [];
  const entityFields = [
    item.name,
    item.abbreviation,
    item.entityType,
    item.institutionType,
    item.province,
    item.location,
    item.accreditationInstitution,
    item.websiteUrl,
    item.catalogUrl,
    item.universityName,
    item.universityAbbreviation,
    item.faculty,
    ...(item.admissionPaths || []),
    item.source?.file,
    item.source?.extractedAt
  ];
  if (item.admissionDetails?.length) entityFields.push("Jalur masuk", collectSearchValues(item.admissionDetails).join(" "));
  const structured = collectSearchValues({ sections: item.sections, catalog: item.catalog, highlights: item.highlights, profile: item.profile });
  if (attachedFaqs(item).length) structured.push("faq pertanyaan jawaban");
  if (item.ops?.length) structured.push("ops catatan operasional untuk SA");
  if (item.profile) structured.push("profil program studi prospek kerja jenjang gelar kemampuan bidang yang dipelajari pelajaran mata kuliah");
  if (quotaHistoryFor(item)?.history?.length) structured.push("data kompetisi historis jurusan prodi program studi pendaftar peminat kuota daya tampung jumlah kursi diterima peluang UTBK persaingan");
  return {
    title: normalize(item.title || item.name),
    aliases: (item.aliases || []).map(normalize),
    metadata: normalize(`${item.topic} ${item.subtopic} ${entityFields.join(" ")} ${parentFields.join(" ")}`),
    body: normalize([item.summary, item.snippet, item.answer, item.note, ...entityFields, ...(item.ops || []), ...faqs, ...sources, ...structured, ...parentFields].join(" "))
  };
}

function searchableText(item) {
  const fields = searchFields(item);
  return [fields.title, fields.metadata, fields.aliases.join(" "), fields.body].join(" ");
}

function score(item, query) {
  const terms = tokenize(query);
  if (!terms.length) return { value: 0, coverage: 0, exactPhrase: false };
  const fields = searchFields(item);
  const normalizedQuery = normalize(query);
  const exactTitleOrAlias = fields.title === normalizedQuery || fields.aliases.some((alias) => alias === normalizedQuery);
  const phraseMatch = [fields.title, ...fields.aliases].some((field) => field.includes(normalizedQuery) || normalizedQuery.includes(field));
  const exactPhrase = exactTitleOrAlias || phraseMatch;
  let coverage = 0;
  // An exact canonical title/alias outranks a longer FAQ title that merely
  // contains the query phrase. This keeps "pendaftaran PKN STAN" on the
  // article while still allowing an explicitly typed FAQ question to win.
  let value = exactTitleOrAlias ? 90 : (phraseMatch ? 50 : 0);
  let directCoverage = 0;
  let contextCoverage = 0;
  const faqDirect = item.type === "faq"
    ? normalize([item.title, ...(item.aliases || []), item.summary, item.snippet, item.answer].filter(Boolean).join(" "))
    : "";
  const faqParent = item.type === "faq" ? parentArticle(item) : null;
  const faqContext = item.type === "faq"
    ? normalize([
      item.topic,
      item.subtopic,
      faqParent?.title,
      ...(faqParent?.aliases || []),
      faqParent?.topic,
      faqParent?.subtopic
    ].filter(Boolean).join(" "))
    : "";
  for (const term of terms) {
    if (item.type === "faq" && tokenMatches(term, faqDirect)) {
      directCoverage += 1;
      coverage += 1;
      value += tokenMatches(term, fields.title) ? 42 : 24;
    } else if (item.type === "faq" && tokenMatches(term, faqContext)) {
      // Parent/article context helps a FAQ appear for a topic search, but it
      // must never outrank a direct match in the question or answer.
      contextCoverage += 1;
      coverage += 1;
      value += 4;
    } else if (tokenMatches(term, fields.title)) {
      coverage += 1;
      value += 32;
    } else if (fields.aliases.some((alias) => tokenMatches(term, alias))) {
      coverage += 1;
      value += 28;
    } else if (tokenMatches(term, fields.metadata)) {
      coverage += 1;
      value += 16;
    } else if (tokenMatches(term, fields.body)) {
      coverage += 1;
      value += 6;
    }
  }
  return { value, coverage, directCoverage, contextCoverage, exactPhrase };
}

function faqOwnCoverage(item, query) {
  if (item.type !== "faq") return 0;
  const terms = tokenize(query);
  const text = `${item.title || ""} ${item.answer || ""} ${(item.aliases || []).join(" ")}`;
  return terms.reduce((coverage, term) => coverage + (tokenMatches(term, text) ? 1 : 0), 0);
}

function faqTopicMatch(item, query) {
  if (item.type !== "faq") return false;
  const queryTerms = tokenize(query);
  if (!queryTerms.some((term) => FAQ_HINTS.has(term))) return false;
  const parent = parentArticle(item);
  if (!parent) return false;
  const topicTerms = queryTerms.filter((term) => !FAQ_HINTS.has(term));
  if (!topicTerms.length) return false;
  const parentText = `${parent.title || ""} ${(parent.aliases || []).join(" ")} ${parent.topic || ""} ${parent.subtopic || ""}`;
  return topicTerms.every((term) => tokenMatches(term, parentText));
}

const JAVA_PROVINCES = new Set(["banten", "dki jakarta", "jawa barat", "jawa tengah", "di yogyakarta", "jawa timur"]);
const JAVA_PROVINCE_PHRASES = [
  ["jawa barat", "jawa barat"],
  ["jawa tengah", "jawa tengah"],
  ["di yogyakarta", "di yogyakarta"],
  ["jawa timur", "jawa timur"],
  ["dki jakarta", "dki jakarta"],
  ["banten", "banten"]
];

function requestedJavaProvince(query) {
  const normalizedQuery = normalize(query);
  return JAVA_PROVINCE_PHRASES.find(([phrase]) => normalizedQuery.includes(phrase))?.[1] || null;
}

function requestedUniversityId(query) {
  const normalizedQuery = normalize(query);
  const queryTokens = tokenize(query);
  const universityIds = new Set();
  KNOWLEDGE.filter((item) => item.entityType === "university").forEach((university) => {
    const values = [university.name, university.abbreviation, university.title, ...(university.aliases || [])];
    const matched = values.some((value) => {
      const normalizedValue = normalize(value);
      const isAbbreviation = normalizedValue === normalize(university.abbreviation || "") && normalizedValue.length > 1;
      return (isAbbreviation && queryTokens.includes(normalizedValue))
        || (normalizedValue.length > 3 && normalizedQuery.includes(normalizedValue));
    });
    if (matched) universityIds.add(university.id);
  });
  return universityIds.size === 1 ? [...universityIds][0] : null;
}

function requestedProgramTokens(query, universityId) {
  const university = KNOWLEDGE.find((item) => item.id === universityId);
  const universityTokens = new Set([university?.name, university?.abbreviation, university?.title, ...(university?.aliases || [])]
    .flatMap((value) => tokenize(value)));
  const queryNoise = new Set([
    "kuota", "daya", "tampung", "jumlah", "kursi", "peminat", "pendaftar", "persaingan", "peluang", "historis",
    "utbk", "snbt", "mata", "kuliah", "pelajaran", "dipelajari", "bidang", "prospek", "kerja", "karier", "karir",
    "kemampuan", "skill", "keterampilan", "jenjang", "gelar", "sejenis", "mirip", "website", "resmi"
  ]);
  return tokenize(query).filter((token) => !universityTokens.has(token) && !queryNoise.has(token));
}

function searchMode(query) {
  const normalizedQuery = normalize(query);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const searchableQueryTokens = tokenize(query);
  const quotaIntent = ["kuota", "daya tampung", "jumlah kursi", "jumlah kuota", "peminat", "pendaftar", "persaingan", "peluang historis"]
    .some((phrase) => normalizedQuery.includes(phrase));
  if (normalizedQuery.includes("kedokteran") || normalizedQuery.includes("pendidikan dokter")) return "study-program";
  const universityRecords = KNOWLEDGE.filter((item) => item.entityType === "university");
  // A complete canonical institution name is an institution lookup. Check
  // this before program matching because every program title also contains
  // its university name (e.g. "Universitas Indonesia").
  const exactUniversityQuery = universityRecords.some((item) => [item.name, item.abbreviation, item.title, ...(item.aliases || [])]
    .some((value) => normalize(value) === normalizedQuery));
  if (exactUniversityQuery) return "university";
  // Route specific program-name queries to study-program entities before the
  // university abbreviation check. Without this, a query such as
  // "Ilmu Komputer UI" is classified as a university query because it
  // contains the UI abbreviation.
  const studyProgramRecords = KNOWLEDGE.filter((item) => item.entityType === "study-program");
  const exactProgramQuery = studyProgramRecords.some((item) => [item.name, ...(item.aliases || [])]
    .some((value) => normalize(value) === normalizedQuery));
  const programIntentPhrases = [
    "mata kuliah", "yang dipelajari", "pelajaran", "bidang studi", "prospek kerja", "kerja apa",
    "karier", "karir", "kemampuan", "skill", "keterampilan", "jenjang", "gelar", "jurusan sejenis", "jurusan mirip"
  ];
  const programIntent = programIntentPhrases.some((phrase) => normalizedQuery.includes(phrase));
  const programIntentTokens = new Set([
    "mata", "kuliah", "pelajaran", "dipelajari", "bidang", "studi", "prospek", "kerja", "karier", "karir",
    "kemampuan", "skill", "keterampilan", "jenjang", "gelar", "sejenis", "mirip"
  ]);
  const studyProgramQuery = studyProgramRecords.some((item) => {
    const programText = `${item.name || ""} ${(item.aliases || []).join(" ")}`;
    const meaningfulQueryTokens = searchableQueryTokens.filter((token) => !programIntentTokens.has(token));
    const hasProgramDisambiguator = queryTokens.includes("ui")
      || queryTokens.some((token) => ["prodi", "jurusan", "program", "studi"].includes(token))
      || meaningfulQueryTokens.length >= 2;
    const hasProgramTerms = meaningfulQueryTokens.length > 0;
    return hasProgramTerms
      && meaningfulQueryTokens.every((token) => tokenMatches(token, programText))
      && (hasProgramDisambiguator || programIntent);
  });
  if (exactProgramQuery || studyProgramQuery || (programIntent && studyProgramRecords.some((item) => searchableQueryTokens.some((token) => tokenMatches(token, `${item.name || ""} ${(item.aliases || []).join(" ")}`))))) return "study-program";
  if (quotaIntent) {
    const hasUniversityContext = universityRecords.some((item) => [item.name, item.abbreviation, item.title, ...(item.aliases || [])]
      .some((value) => queryTokens.includes(normalize(value)) || (normalize(value).length > 2 && normalizedQuery.includes(normalize(value)))));
    const hasProgramContext = queryTokens.some((token) => ["prodi", "jurusan", "program", "studi"].includes(token));
    // A named university/program should search study-program records so the
    // historical quota section can answer the query. A generic "kuota
    // jurusan" query stays in content mode and can land on the guidance
    // article without dumping every program into the result list.
    if (hasUniversityContext || (hasProgramContext && queryTokens.some((token) => token.length > 3 && !["kuota", "jurusan", "prodi", "program", "studi", "daya", "tampung", "jumlah", "kursi"].includes(token)))) return "study-program";
  }
  const admissionArticleMatch = KNOWLEDGE.filter((item) => item.parentArticleId).some((item) => [item.title, ...(item.aliases || [])]
    .some((value) => {
      const normalizedValue = normalize(value);
      return normalizedQuery === normalizedValue || (normalizedValue.length > 3 && normalizedQuery.includes(normalizedValue));
    }));
  if (admissionArticleMatch || normalizedQuery.includes("simak ui")) return "content";
  const namesOrAliasesMatch = universityRecords.some((item) => [item.name, item.abbreviation, item.title, ...(item.aliases || [])]
    .some((value) => {
      const normalizedValue = normalize(value);
      const isAbbreviation = normalizedValue === normalize(item.abbreviation || "") && normalizedValue.length > 1;
      return normalizedQuery === normalizedValue || (normalizedValue.length > 2 && normalizedQuery.includes(normalizedValue)) || (isAbbreviation && queryTokens.includes(normalizedValue));
    }));
  if (namesOrAliasesMatch || normalizedQuery === "universitas" || normalizedQuery.includes("website resmi") || normalizedQuery.includes("universitas unggul") || (normalizedQuery.includes("ptn") && (normalizedQuery.includes("unggul") || normalizedQuery.includes("jawa")))) return "university";
  if (normalizedQuery.includes("profil") || normalizedQuery.includes("cara memilih") || normalizedQuery.includes("memilih jurusan") || normalizedQuery.includes("memilih prodi")) return "content";
  return "content";
}

function entityMatchesQuery(item, mode, query) {
  if (mode === "university" && item.entityType !== "university") return false;
  if (mode === "study-program" && item.entityType !== "study-program") return false;
  const normalizedQuery = normalize(query);
  const province = requestedJavaProvince(query);
  if (province && normalize(item.province) !== province) return false;
  if (!province && normalizedQuery.includes("jawa") && !JAVA_PROVINCES.has(normalize(item.province))) return false;
  if (normalizedQuery.includes("unggul") && normalize(item.accreditationInstitution) !== "unggul") return false;
  if (mode === "study-program") {
    const universityId = requestedUniversityId(query);
    if (universityId && item.universityId !== universityId) return false;
    // Catalog aliases also contain faculty labels. Keep canonical program
    // names and aliases for routing, while excluding those metadata labels
    // from term matching ("Ilmu Komputer" must not match every program in
    // the Fakultas Ilmu Komputer).
    const canonicalProgramValues = [item.name, ...(item.aliases || [])]
      .filter((value) => value && !/^fakultas\b/i.test(String(value).trim()));
    const programText = canonicalProgramValues.join(" ");
    const exactProgramAlias = canonicalProgramValues
      .filter(Boolean)
      .some((value) => normalize(value) === normalizedQuery);
    // Canonical program names and aliases should return only the entities
    // that own that name. Without this guard, profile text such as a shared
    // "mata kuliah" paragraph makes every rich program look like a match.
    if (exactProgramAlias) return true;
    // Once an institution is named, require the remaining program terms to
    // match the program title/aliases. This prevents a shared profile phrase
    // such as "psikologi" in similar-majors or career text from returning
    // unrelated programs at the same university.
    const programTokens = requestedProgramTokens(query, universityId);
    const programQueryIntent = normalize(query).split(/\s+/).some((token) => ["prodi", "jurusan", "program", "studi"].includes(token));
    // For an unscoped program or intent query, every meaningful term must be
    // present in the program name/aliases. This keeps "pelajaran ilmu
    // komputer" on Ilmu Komputer entities instead of unrelated Ilmu-* rows.
    if (!universityId && programTokens.length && !canonicalProgramValues.some((value) => programTokens.every((token) => tokenMatches(token, value)))) return false;
    if ((programQueryIntent || universityId) && programTokens.length) {
      const programPhrase = programTokens.join(" ");
      const programName = normalize(item.name || "");
      const exactNameMatch = programName === programPhrase || programName.endsWith(` ${programPhrase}`);
      const aliasMatch = (item.aliases || []).some((alias) => normalize(alias) === programPhrase || normalize(alias).endsWith(` ${programPhrase}`));
      if (!exactNameMatch && !aliasMatch) return false;
    }
  }
  return true;
}

function searchDetailed(query, filter = "Semua", docType = "Semua") {
  const terms = tokenize(query);
  const mode = searchMode(query);
  const pool = KNOWLEDGE.filter((item) => {
    if (item.type === "comparison") return false;
    if (mode === "content") return item.type !== "entity" && item.searchable !== false;
    if (item.searchable === false) return false;
    return entityMatchesQuery(item, mode, query);
  });
  const scored = pool.map((item) => ({ item, score: score(item, query) }))
    .filter(({ item, score: itemScore }) => (!query || itemScore.coverage >= terms.length)
      && (filter === "Semua" || item.topic === filter)
      && (docType === "Semua" || resultTypeKey(item) === docType));
  const topicFaqMatches = query && terms.some((term) => FAQ_HINTS.has(term))
    ? pool
      .filter((item) => faqTopicMatch(item, query))
      .filter((item) => filter === "Semua" || item.topic === filter)
      .filter((item) => docType === "Semua" || resultTypeKey(item) === docType)
      .map((item) => ({ item, score: score(item, query) }))
    : [];
  const exactMatches = scored.filter(({ score: itemScore }) => itemScore.exactPhrase);
  const exactIds = new Set(exactMatches.map(({ item }) => item.id));
  const exactHasFAQ = exactMatches.some(({ item }) => item.type === "faq");
  const exactParentIds = new Set(exactMatches.map(({ item }) => item.id));
  const relatedFAQMatches = exactMatches.length && !exactHasFAQ
    ? scored
      .filter(({ item }) => item.type === "faq" && !exactIds.has(item.id) && exactParentIds.has(item.parentArticleId) && faqOwnCoverage(item, query) > 0)
      .sort((a, b) => faqOwnCoverage(b.item, query) - faqOwnCoverage(a.item, query) || b.score.value - a.score.value)
      .slice(0, 5)
    : [];
  const relatedParentIds = new Set(exactMatches.map(({ item }) => item.parentArticleId).filter(Boolean));
  const parentMatches = exactMatches.length && terms.length > 1
    ? scored.filter(({ item }) => relatedParentIds.has(item.id) && !exactIds.has(item.id))
    : [];
  // A specific institution/alias query should land on its canonical record,
  // even when the phrase also appears in the general guide's table or body.
  // Broad queries such as "sekolah kedinasan" intentionally keep several
  // relevant records visible for exploration.
  const normalizedQuery = normalize(query);
  const broadKedinasanQuery = new Set([
    "kedinasan", "dikdin", "sekolah kedinasan", "sekolah kedinasan 2026",
    "panduan sekolah kedinasan", "sekolah ikatan dinas", "seleksi sekolah kedinasan"
  ]).has(normalizedQuery);
  const useExactOnly = exactMatches.length > 0 && !broadKedinasanQuery && mode !== "study-program";
  const visible = useExactOnly
    ? [...exactMatches, ...relatedFAQMatches, ...parentMatches, ...topicFaqMatches]
    : [...scored, ...topicFaqMatches];
  const unique = new Map(visible.map((entry) => [entry.item.id, entry]));
  return [...unique.values()]
    .sort((a, b) => b.score.value - a.score.value || b.score.coverage - a.score.coverage || a.item.title.localeCompare(b.item.title))
    .map(({ item, score: itemScore }) => ({ item, score: itemScore, context: matchContext(item, query) }));
}

function search(query, filter = "Semua", docType = "Semua") {
  return searchDetailed(query, filter, docType).map((result) => result.item);
}

function highlight(text, query) {
  let result = escapeHtml(text);
  for (const term of tokenize(query).sort((a, b) => b.length - a.length)) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
  }
  return result;
}

function resultCard(item, query, context = matchContext(item, query)) {
  const contextMarkup = `<span class="result-match">Cocok di ${escapeHtml(context.label)}</span>`;
  if (item.type === "entity") {
    const isUniversity = item.entityType === "university";
    const label = isUniversity ? "Universitas" : "Program studi";
    const title = isUniversity ? `${item.name} (${item.abbreviation})` : item.title;
    const detail = isUniversity
      ? `${item.location} · Akreditasi institusi: ${item.accreditationInstitution}`
      : `${item.universityName} · ${item.location} · ${item.faculty}`;
    return `<button class="result-card entity-result-card" data-open="${item.id}" data-anchor="${escapeHtml(context.anchor)}">
      <span class="result-kind">${label}</span>
      <span class="result-title">${highlight(title, query)}</span>
      <span class="result-breadcrumb">${escapeHtml(item.topic)} <span>›</span> ${escapeHtml(item.subtopic)}</span>
      <span class="entity-result-meta">${escapeHtml(detail)}</span>
      ${contextMarkup}
      <span class="result-snippet">${highlight(context.excerpt, query)}</span>
    </button>`;
  }
  const kind = item.type === "faq" ? "FAQ" : item.type === "ops-note" ? "Ops Note" : item.type === "comparison" ? "Tampilan perbandingan" : "Artikel";
  return `<button class="result-card" data-open="${item.id}" data-anchor="${escapeHtml(context.anchor)}">
    <span class="result-kind">${kind}</span>
    <span class="result-title">${highlight(item.title, query)}</span>
    <span class="result-breadcrumb">${escapeHtml(item.topic)} <span>›</span> ${escapeHtml(item.subtopic)}</span>
    ${contextMarkup}
    <span class="result-snippet">${highlight(context.excerpt, query)}</span>
  </button>`;
}

function resultTypeKey(item) {
  return item.type === "entity" ? item.entityType : item.type;
}

function resultTypeFilterMarkup(results) {
  const types = [...new Set(results.map(resultTypeKey))].filter((type) => DOC_TYPES[type]);
  if (types.length <= 1) return "";
  return `<div class="filter-row"><span>Jenis hasil</span>${["Semua", ...types].map((type) => `<button class="filter ${state.docType === type ? "active" : ""}" data-doc-type="${escapeHtml(type)}">${escapeHtml(DOC_TYPES[type])}</button>`).join("")}</div>`;
}

function searchIconMarkup() {
  return `<span class="search-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><circle cx="8.5" cy="8.5" r="5.5"></circle><path d="m12.5 12.5 4 4"></path></svg></span>`;
}

function parentArticle(item) {
  return item?.parentArticleId ? KNOWLEDGE.find((candidate) => candidate.id === item.parentArticleId) : null;
}

// FAQ records live independently from articles and point back to their parent.
// The inline fallback keeps older records renderable while content is migrated.
function attachedFaqs(article) {
  if (!article || article.type === "faq") return [];
  const records = KNOWLEDGE.filter((item) => item.type === "faq" && item.parentArticleId === article.id);
  if (records.length) return records;
  return (article.faqs || []).map((faq, index) => ({
    ...faq,
    id: `${article.id}-legacy-faq-${index}`,
    answer: faq.a
  }));
}

function relatedRecordsMarkup(article) {
  const related = KNOWLEDGE.filter((item) => item.parentArticleId === article.id && item.type !== "comparison" && item.type !== "faq");
  if (!related.length) return "";
  const opsNotes = related.filter((item) => item.type === "ops-note");
  const childArticles = related.filter((item) => item.type !== "ops-note");
  return `<section class="article-section related-records">
    <h2>Knowledge terkait</h2>
    ${childArticles.length ? `<div class="related-group"><h3>Artikel turunan</h3><div class="related-list">${childArticles.map((child) => `<button class="related-record" data-open="${child.id}"><span class="related-kind">Artikel</span><strong>${escapeHtml(child.title)}</strong><span>${escapeHtml(child.snippet)}</span></button>`).join("")}</div></div>` : ""}
    ${opsNotes.length ? `<div class="related-group"><h3>Ops note terkait</h3><div class="related-list">${opsNotes.map((note) => `<button class="related-record" data-open="${note.id}"><span class="related-kind">Ops note</span><strong>${escapeHtml(note.title)}</strong><span>${escapeHtml(note.snippet)}</span></button>`).join("")}</div></div>` : ""}
  </section>`;
}

function metadataMarkup(item) {
  if (!item.metadata) return "";
  const labels = {
    audience: "Audience",
    topic: "Topik",
    sourcePeriod: "Periode sumber",
    status: "Status",
    owner: "Owner",
    extractedAt: "Ekstraksi sumber utama",
    updatedAt: "Terakhir diperbarui",
    note: "Catatan"
  };
  return `<section class="metadata-section"><h2>Metadata artikel</h2><dl class="metadata-list">${Object.entries(item.metadata).map(([key, value]) => `<div><dt>${escapeHtml(labels[key] || key)}</dt><dd>${renderInline(value)}</dd></div>`).join("")}</dl></section>`;
}

function recordContextMarkup(item) {
  const parent = parentArticle(item);
  if (!parent) return "";
  return `<div class="record-context"><span>Bagian dari artikel</span><button data-open="${parent.id}">${escapeHtml(parent.title)} <b>→</b></button></div>`;
}

function standaloneRecordView(item) {
  const isFaq = item.type === "faq";
  const label = isFaq ? "FAQ" : "Ops note";
  const body = isFaq
    ? `<section id="${item.id}-answer" class="article-section standalone-answer"><h2>Jawaban</h2><p>${renderInline(item.answer || item.summary)}</p></section>`
    : `<section id="${item.id}-answer" class="article-section standalone-answer"><h2>Catatan operasional</h2><p>${renderInline(item.note || item.summary)}</p></section>
      <section id="${item.id}-ops" class="article-section ops-section"><h2>Catatan untuk SA</h2><ul>${(item.ops || []).map((op, index) => `<li id="${item.id}-ops-${index}">${escapeHtml(op)}</li>`).join("")}</ul></section>`;
  return `${header({ compact: true })}<main class="article-main">
    <button class="back-link" data-back>← Kembali ke hasil pencarian</button>
    <div class="article-breadcrumb">${escapeHtml(item.topic)} <span>›</span> ${escapeHtml(item.subtopic)}</div>
    <article class="article-card standalone-record">
      <p class="article-type">${label}</p>
      <h1>${escapeHtml(item.title)}</h1>
      <p class="article-summary">${escapeHtml(item.summary)}</p>
      ${recordContextMarkup(item)}
      ${body}
      <section class="sources-section"><h2>Sumber</h2><div class="source-list">${(item.sources || []).map(sourceMarkup).join("")}</div></section>
    </article>
  </main>`;
}

function entitySourceMarkup(item) {
  const source = item.source || {};
  return `<section class="sources-section"><h2>Sumber data</h2><div class="entity-source"><span>Ekstraksi: ${escapeHtml(source.file || "Data internal")}${source.url ? ` · <a class="inline-link" href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">Buka sumber Ruangguru ↗</a>` : ""}</span><small>${escapeHtml(source.extractedAt || "")}</small></div></section>`;
}

function quotaHistoryMarkup(item) {
  const record = quotaHistoryFor(item);
  if (!record?.history?.length) return "";
  const history = [...record.history].sort((a, b) => b.year - a.year);
  const latest = history[0];
  const availableYears = history.map((row) => row.year).join(", ");
  return `<section id="${item.id}-quota-history" data-anchor="${item.id}-quota-history" class="article-section quota-history-section">
    <h2>Data kompetisi historis</h2>
    <p class="quota-intro">Data ini membantu SA melihat perbandingan jumlah pendaftar dan kuota pada tahun-tahun sebelumnya untuk konteks simulasi konsultasi.</p>
    <div class="facts-table quota-latest">
      <div><dt>Tahun terbaru</dt><dd>${latest.year}</dd></div>
      <div><dt>Pendaftar</dt><dd>${formatInteger(latest.applicant)}</dd></div>
      <div><dt>Kuota diterima</dt><dd>${formatInteger(latest.quota)}</dd></div>
      <div><dt>Peluang historis</dt><dd>${formatPercent(latest.competitiveness)}</dd></div>
    </div>
    <div class="data-table-wrap quota-table-wrap"><table class="data-table quota-history-table"><thead><tr><th>Tahun</th><th>Pendaftar</th><th>Kuota diterima</th><th>Peluang historis</th><th>Sumber</th></tr></thead><tbody>${history.map((row) => `<tr><td>${row.year}</td><td>${formatInteger(row.applicant)}</td><td>${formatInteger(row.quota)}</td><td>${formatPercent(row.competitiveness)}</td><td><a class="inline-link" href="${escapeHtml(row.sourceUrl)}" target="_blank" rel="noreferrer">API ${row.year} ↗</a></td></tr>`).join("")}</tbody></table></div>
    <p class="quota-note">Peluang historis adalah rasio kuota terhadap jumlah pendaftar pada tahun tersebut. Angka ini bukan prediksi atau jaminan penerimaan. Tahun yang tersedia: ${escapeHtml(availableYears)}.</p>
    <p class="quota-source">Sumber data: <a class="inline-link" href="${escapeHtml(record.history[0].sourceUrl)}" target="_blank" rel="noreferrer">API Ruangguru University Major Quota ↗</a> · Diekstrak ${escapeHtml(record.history[0].extractedAt)}.</p>
  </section>`;
}

function studyProfileMarkup(item) {
  const profile = item.profile;
  if (item.entityType !== "study-program" || !profile) return "";
  const degrees = (profile.degrees || []).map((degree) => [degree.abbreviation || degree.name, degree.description]);
  const prospects = (profile.careerProspects || []).map((prospect) => `<li><strong>${escapeHtml(prospect.role)}</strong>${prospect.description ? ` — ${renderInline(prospect.description)}` : ""}</li>`).join("");
  const similar = (profile.similarMajors || []).map((major) => {
    const label = escapeHtml(major.name || "");
    // Some catalog pages expose similar-major names without a resolvable URL.
    // Keep those names useful as context instead of rendering a broken
    // href="null" link.
    return major.url
      ? `<a class="similar-major" href="${escapeHtml(major.url)}" target="_blank" rel="noreferrer">${label} ↗</a>`
      : `<span class="similar-major similar-major-unlinked">${label}</span>`;
  }).join("");
  return `<section class="study-profile">
    <section id="${item.id}-profile-summary" data-anchor="${item.id}-profile-summary" class="article-section profile-section"><h2>Profil program studi</h2><p>${renderInline(profile.description || "")}</p></section>
    <section id="${item.id}-profile-overview" data-anchor="${item.id}-profile-overview" class="article-section profile-section"><h2>Gambaran studi</h2>${renderTextBlock(profile.studyOverview || "")}</section>
    <section id="${item.id}-profile-subjects" data-anchor="${item.id}-profile-subjects" class="article-section profile-section"><h2>Bidang yang dipelajari</h2><p>${renderInline(profile.subjectStudied || "")}</p></section>
    ${degrees.length ? `<section id="${item.id}-profile-degrees" data-anchor="${item.id}-profile-degrees" class="article-section profile-section"><h2>Jenjang dan gelar</h2><div class="facts-table">${degrees.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${renderInline(value)}</dd></div>`).join("")}</div></section>` : ""}
    ${profile.skills?.length ? `<section id="${item.id}-profile-skills" data-anchor="${item.id}-profile-skills" class="article-section profile-section"><h2>Kemampuan yang dilatih</h2><ul>${profile.skills.map((skill) => `<li>${renderInline(skill)}</li>`).join("")}</ul></section>` : ""}
    ${prospects ? `<section id="${item.id}-profile-career" data-anchor="${item.id}-profile-career" class="article-section profile-section"><h2>Prospek kerja</h2><ul>${prospects}</ul></section>` : ""}
    ${similar ? `<section id="${item.id}-profile-similar" data-anchor="${item.id}-profile-similar" class="article-section profile-section"><h2>Jurusan yang sejenis</h2><div class="similar-major-list">${similar}</div></section>` : ""}
  </section>`;
}

function entityDetailView(item) {
  const isUniversity = item.entityType === "university";
  const university = isUniversity ? item : KNOWLEDGE.find((candidate) => candidate.id === item.universityId);
  const relatedPrograms = isUniversity ? KNOWLEDGE.filter((candidate) => candidate.entityType === "study-program" && candidate.universityId === item.id) : [];
  const facts = isUniversity
    ? [["Jenis institusi", item.institutionType], ["Lokasi", item.location], ["Provinsi", item.province], ["Akreditasi institusi", item.accreditationInstitution], ["Jumlah prodi pada ekstraksi", item.majorCount], ["Website resmi", item.websiteUrl]]
    : [["Universitas", item.universityName], ["Fakultas", item.faculty], ["Lokasi", item.location], ["Provinsi", item.province], ["Website resmi", item.websiteUrl]];
  const extractedDate = item.profile?.extractedAt || item.source?.extractedAt || "23 Oktober 2026";
  const hasRichUniversityContent = isUniversity && (item.sections?.length || attachedFaqs(item).length || item.catalog?.length);
  const renderFactValue = (label, value) => label === "Website resmi" && value
    ? `<a class="inline-link" href="${escapeHtml(externalHref(value))}" target="_blank" rel="noreferrer">${escapeHtml(value)} ↗</a>`
    : escapeHtml(value);
  return `${header({ compact: true })}<main class="article-main">
    <button class="back-link" data-back>← Kembali ke hasil pencarian</button>
    <div class="article-breadcrumb">${escapeHtml(item.topic)} <span>›</span> ${escapeHtml(item.subtopic)}</div>
    <article class="article-card entity-detail-card">
      <p class="article-type">${isUniversity ? "Universitas" : "Program studi"}</p>
      <h1>${escapeHtml(isUniversity ? `${item.name} (${item.abbreviation})` : item.title)}</h1>
      <p class="article-summary">${escapeHtml(item.summary)}</p>
      <div id="${item.id}-facts" data-anchor="${item.id}-facts" class="facts-table entity-facts">${facts.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${renderFactValue(label, value)}</dd></div>`).join("")}</div>
      <div class="entity-actions"><a id="${item.id}-website" href="${escapeHtml(item.websiteUrl)}" target="_blank" rel="noreferrer" class="entity-website">Website resmi ↗</a>${!isUniversity && item.catalogUrl ? `<a id="${item.id}-catalog" href="${escapeHtml(item.catalogUrl)}" target="_blank" rel="noreferrer" class="entity-catalog">Buka katalog prodi ↗</a>` : ""}</div>
      ${isUniversity
        ? `${hasRichUniversityContent ? "" : `<section id="${item.id}-admission" data-anchor="${item.id}-admission" class="article-section"><h2>Jalur masuk yang tercatat</h2><ul>${(item.admissionPaths || []).map((path) => `<li>${escapeHtml(path)}</li>`).join("")}</ul></section>`}`
        : `<div class="record-context"><span>Bagian dari universitas</span><button data-open="${university?.id || ""}">${escapeHtml(university ? `${university.name} (${university.abbreviation})` : item.universityName)} <b>→</b></button></div>`}
      ${hasRichUniversityContent ? `${highlightsMarkup(item)}${(item.sections || []).map((section, index) => section.heading === "Jalur masuk yang tercatat" ? admissionMarkup(item, section, index) : sectionMarkup(section, index, item)).join("")}${catalogMarkup(item)}${faqsMarkup(item)}${opsMarkup(item)}${sourcesMarkup(item)}${metadataMarkup(item)}` : ""}
      ${isUniversity ? relatedRecordsMarkup(item) : ""}
      ${isUniversity && relatedPrograms.length ? `<section id="${item.id}-related-programs" class="article-section related-records"><h2>Program studi terkait</h2><div class="related-list">${relatedPrograms.map((program) => `<button class="related-record" data-open="${program.id}"><span class="related-kind">Program studi</span><strong>${escapeHtml(program.name)}</strong><span>${escapeHtml(program.faculty)}</span></button>`).join("")}</div></section>` : ""}
      ${studyProfileMarkup(item)}
      ${quotaHistoryMarkup(item)}
      <section id="${item.id}-caveat" class="article-section entity-caveat"><h2>Catatan penggunaan</h2><p>${isUniversity ? "Akreditasi yang tersedia pada data ini adalah <strong>akreditasi institusi</strong>, bukan akreditasi program studi. Detail penerimaan, biaya, jadwal, dan jalur yang dibuka dapat berubah; cek website resmi universitas sebelum menyampaikan informasi terbaru." : `Akreditasi yang tersedia pada data ini adalah <strong>akreditasi institusi</strong>, bukan akreditasi program studi. Profil prodi diekstrak ${escapeHtml(extractedDate)} dari katalog Ruangguru; cek website resmi universitas untuk informasi penerimaan terbaru.`}</p></section>
      ${entitySourceMarkup(item)}
    </article>
  </main>`;
}

function header({ compact = false } = {}) {
  return `<header class="site-header ${compact ? "compact" : ""}">
    <button class="brand" data-home aria-label="Kembali ke halaman utama"><span class="brand-mark">SA</span><span>Knowledge Hub</span></button>
    ${compact ? `<form class="header-search" data-search-form>${searchIconMarkup()}<input name="q" value="${escapeHtml(state.query)}" aria-label="Cari topik atau pertanyaan siswa" placeholder="Cari topik atau pertanyaan siswa" autocomplete="off" /><button type="submit">Cari</button></form>` : ""}
  </header>`;
}

function homeView() {
  return `${header()}<main class="home-main">
    <section class="hero">
      <p class="eyebrow">Brain Academy · Student Advisor</p>
      <h1>Cari knowledge untuk membantu konsultasi siswa</h1>
      <p class="hero-copy">Temukan artikel, FAQ, dan informasi operasional dari sumber yang sudah dikurasi.</p>
      <form class="hero-search" data-search-form>
        ${searchIconMarkup()}
        <input name="q" data-home-search aria-label="Cari topik atau pertanyaan siswa" placeholder="${escapeHtml(HOME_PLACEHOLDERS[placeholderIndex])}" autocomplete="off" />
        <button type="submit">Cari</button>
      </form>
      <div class="popular"><span>Pencarian populer</span>${POPULAR_SEARCHES.map((query) => `<button data-query="${escapeHtml(query)}">${escapeHtml(query)}</button>`).join("")}</div>
    </section>
  </main>`;
}

function searchLoadingView(query) {
  return `${header({ compact: true })}<main class="search-loading" aria-live="polite" aria-busy="true">
    <div class="search-loading-card">
      <span class="loading-spinner" aria-hidden="true"></span>
      <p class="eyebrow">Knowledge Hub</p>
      <h1>Mencari informasi yang relevan</h1>
      <p>Menyiapkan hasil untuk <strong>${escapeHtml(query)}</strong>…</p>
    </div>
  </main>`;
}

function stopPlaceholderRotation() {
  if (placeholderRotationTimer != null) {
    window.clearTimeout(placeholderRotationTimer);
    placeholderRotationTimer = null;
  }
}

function startPlaceholderRotation(input) {
  stopPlaceholderRotation();
  if (!input || input.value.trim() || document.activeElement === input) return;
  const text = HOME_PLACEHOLDERS[placeholderIndex];
  let characterIndex = 0;

  const typeNextCharacter = () => {
    // The home view can be replaced by a result or article view between ticks.
    // Resolve the current input before updating so an old timer cannot mutate a
    // detached element.
    const currentInput = document.querySelector("[data-home-search]");
    if (!currentInput || currentInput.value.trim() || document.activeElement === currentInput) {
      stopPlaceholderRotation();
      return;
    }
    currentInput.placeholder = text.slice(0, characterIndex);
    characterIndex += 1;
    if (characterIndex <= text.length) {
      placeholderRotationTimer = window.setTimeout(typeNextCharacter, PLACEHOLDER_TYPE_SPEED_MS);
      return;
    }
    placeholderRotationTimer = window.setTimeout(() => {
      placeholderIndex = (placeholderIndex + 1) % HOME_PLACEHOLDERS.length;
      startPlaceholderRotation(currentInput);
    }, PLACEHOLDER_PAUSE_MS);
  };

  typeNextCharacter();
}

function bindHomePlaceholder() {
  const input = document.querySelector("[data-home-search]");
  if (!input) {
    stopPlaceholderRotation();
    return;
  }
  const pause = () => stopPlaceholderRotation();
  const resumeIfEmpty = () => {
    if (!input.value.trim() && document.activeElement !== input) startPlaceholderRotation(input);
  };
  input.addEventListener("focus", pause);
  input.addEventListener("input", () => {
    if (input.value.trim()) pause();
  });
  input.addEventListener("blur", resumeIfEmpty);
  startPlaceholderRotation(input);
}

function resultsView() {
  const detailedResults = searchDetailed(state.query, "Semua", state.docType);
  const results = detailedResults.map((result) => result.item);
  const allResults = search(state.query, "Semua", "Semua");
  return `${header({ compact: true })}<main class="results-main">
    <div class="results-heading"><div><p class="eyebrow">Hasil pencarian</p><h1>${escapeHtml(state.query)}</h1></div><span class="result-count">${results.length} hasil</span></div>
    ${resultTypeFilterMarkup(allResults)}
    ${results.length ? `<section class="result-list">${detailedResults.map(({ item, context }) => resultCard(item, state.query, context)).join("")}</section>` : `<section class="empty-state"><div class="empty-icon">⌕</div><h2>Belum menemukan jawaban yang sesuai.</h2><p>Coba gunakan kata kunci yang lebih singkat atau pilih salah satu contoh berikut.</p><div class="empty-suggestions">${POPULAR_SEARCHES.map((query) => `<button data-query="${escapeHtml(query)}">${escapeHtml(query)}</button>`).join("")}</div></section>`}
  </main>`;
}

function renderInline(value) {
  let rendered = escapeHtml(value);
  rendered = rendered.replace(/\[([^\]]+)\]\(((?:https?:\/\/|\.\.?\/|\/)[^)]+)\)/g, '<a class="inline-link" href="$2" target="_blank" rel="noreferrer">$1 ↗</a>');
  rendered = rendered.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  return rendered.replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderTextBlock(value = "") {
  return String(value).split(/\n{2,}/).map((paragraph) => `<p>${renderInline(paragraph).replaceAll("\n", "<br />")}</p>`).join("");
}

function dataTableMarkup(section) {
  const [headers, ...rows] = section.table;
  const renderCell = (cell) => /^https?:\/\//i.test(String(cell))
    ? `<a class="inline-link" href="${escapeHtml(cell)}" target="_blank" rel="noreferrer">${escapeHtml(cell)} ↗</a>`
    : renderInline(cell);
  return `<div class="data-table-wrap"><table class="data-table"><thead><tr>${headers.map((header) => `<th>${renderCell(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${renderCell(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function sectionMarkup(section, index, item) {
  const anchor = sectionAnchor(item, section, index);
  if (section.tableHeader) return `<section id="${anchor}" data-anchor="${anchor}" class="article-section"><h2>${escapeHtml(section.heading)}</h2>${dataTableMarkup(section)}</section>`;
  if (section.table) return `<section id="${anchor}" data-anchor="${anchor}" class="article-section"><h2>${escapeHtml(section.heading)}</h2><div class="facts-table">${section.table.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${renderInline(value)}</dd></div>`).join("")}</div></section>`;
  if (section.bullets) return `<section id="${anchor}" data-anchor="${anchor}" class="article-section"><h2>${escapeHtml(section.heading)}</h2><ul>${section.bullets.map((bullet) => `<li>${renderInline(bullet)}</li>`).join("")}</ul></section>`;
  if (section.numbered) return `<section id="${anchor}" data-anchor="${anchor}" class="article-section"><h2>${escapeHtml(section.heading)}</h2><ol>${section.numbered.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ol></section>`;
  return `<section id="${anchor}" data-anchor="${anchor}" class="article-section article-copy"><h2>${escapeHtml(section.heading)}</h2>${renderTextBlock(section.body || "")}</section>`;
}

function catalogMarkup(item) {
  if (!item.catalog?.length) return "";
  // Prefer the canonical catalog URL. Name matching is only a fallback and is
  // accepted when it is unambiguous within this university, so a duplicate
  // program name cannot silently open the wrong internal record.
  const studyPrograms = KNOWLEDGE.filter((candidate) => candidate.entityType === "study-program" && candidate.universityId === item.id);
  const resolveProgram = (program) => {
    const url = normalizeCatalogUrl(program.url);
    if (url) {
      const byUrl = studyPrograms.find((candidate) => normalizeCatalogUrl(candidate.catalogUrl) === url);
      if (byUrl) return byUrl;
    }
    const name = normalize(program.name);
    if (!name) return null;
    const byName = studyPrograms.filter((candidate) => normalize(candidate.name) === name);
    return byName.length === 1 ? byName[0] : null;
  };
  const programLink = (program) => {
    const record = resolveProgram(program);
    if (record) {
      return `<button type="button" class="inline-link catalog-internal-link" data-open="${escapeHtml(record.id)}" data-anchor="${escapeHtml(`${record.id}-profile-summary`)}" aria-label="Buka artikel ${escapeHtml(record.title || record.name)}">${escapeHtml(program.name)} <span aria-hidden="true">→</span></button>`;
    }
    if (program.url) return `<a class="inline-link" href="${escapeHtml(program.url)}" target="_blank" rel="noreferrer">${escapeHtml(program.name)} ↗</a>`;
    return `<span>${escapeHtml(program.name)}</span>`;
  };
  const catalogCount = item.majorCount || item.catalog.reduce((total, faculty) => total + (faculty.count || faculty.programs?.length || 0), 0);
  return `<section class="article-section catalog-section"><h2>Katalog fakultas dan program studi</h2><p class="catalog-intro">Katalog berikut mencatat ${escapeHtml(catalogCount)} program studi dalam ${escapeHtml(item.catalog.length)} fakultas. Buka artikel prodi yang tersedia untuk membaca ringkasan bidang studi; detail kurikulum dan penerimaan tetap perlu dicek pada sumber resmi.</p><div class="catalog-list">${item.catalog.map((faculty) => `<details class="catalog-faculty"><summary><span>${escapeHtml(faculty.faculty)}</span><small>${faculty.count} prodi</small></summary><ul>${faculty.programs.map((program) => `<li>${programLink(program)}</li>`).join("")}</ul></details>`).join("")}</div></section>`;
}

function admissionMarkup(item, section, index) {
  const admissions = item.admissionDetails || [];
  if (!admissions.length) return sectionMarkup(section, index, item);
  const anchor = sectionAnchor(item, section, index);
  return `<section id="${anchor}" data-anchor="${anchor}" class="article-section admission-section"><h2>Jalur penerimaan</h2><div class="admission-list">${admissions.map((admission) => {
    const child = admission.articleId ? KNOWLEDGE.find((record) => record.id === admission.articleId) : null;
    const childLabel = child ? `Artikel ${child.title}` : "Buka artikel detail";
    const officialLink = admission.url ? `<a class="inline-link" href="${escapeHtml(admission.url)}" target="_blank" rel="noreferrer">${escapeHtml(admission.urlLabel || "Situs resmi ↗")}</a>` : "";
    return `<article class="admission-item"><div class="admission-item-main"><div class="admission-item-heading"><h3>${escapeHtml(admission.name)}</h3><span>${escapeHtml(admission.year || "Tahun belum dicantumkan")}</span></div><p>${renderInline(admission.summary || "")}</p><small>${escapeHtml(admission.status || "Verifikasi pada sumber resmi")}</small></div><div class="admission-item-actions">${officialLink}${admission.articleId ? `<button class="related-record admission-detail-link" data-open="${escapeHtml(admission.articleId)}"><span>${escapeHtml(childLabel)}</span><b>→</b></button>` : ""}</div></article>`;
  }).join("")}</div></section>`;
}

function highlightsMarkup(item) {
  if (!item.highlights?.length) return "";
  return `<section id="${item.id}-summary" data-anchor="${item.id}-summary" class="summary-section"><h2>Ringkasan utama</h2><div class="highlight-grid">${item.highlights.slice(0, 3).map((highlightText) => `<div class="highlight"><span>✓</span><p>${escapeHtml(highlightText)}</p></div>`).join("")}</div></section>`;
}

function faqsMarkup(item) {
  const faqs = attachedFaqs(item);
  if (!faqs.length) return "";
  return `<section id="${item.id}-faq" data-anchor="${item.id}-faq" class="article-section"><h2>FAQ</h2><div class="faq-list">${faqs.map((faq, index) => `<details id="${escapeHtml(faq.id)}" data-anchor="${escapeHtml(faq.id)}" ${index === 0 ? "open" : ""}><summary>${escapeHtml(faq.title || faq.q)}</summary><p>${renderInline(faq.answer || faq.a)}</p></details>`).join("")}</div></section>`;
}

function opsMarkup(item) {
  if (!item.ops?.length) return "";
  return `<section id="${item.id}-ops" data-anchor="${item.id}-ops" class="article-section ops-section"><h2>Catatan untuk SA</h2><ul>${item.ops.map((op, index) => `<li id="${item.id}-ops-${index}">${escapeHtml(op)}</li>`).join("")}</ul></section>`;
}

function sourcesMarkup(item) {
  if (!item.sources?.length) return "";
  return `<section class="sources-section"><h2>Sumber</h2><div class="source-list">${item.sources.map(sourceMarkup).join("")}</div></section>`;
}

function comparisonMarkup(item) {
  const rows = ["Aspek", ...item.comparison.map((row) => row[0])];
  return `<section class="comparison-table-wrap"><table class="comparison-table"><thead><tr><th>Aspek</th><th>PKN STAN</th><th>STIS</th><th>STMKG</th></tr></thead><tbody>${item.comparison.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></section>`;
}

function articleView(item) {
  if (item.type === "entity") return entityDetailView(item);
  if (item.type === "faq" || item.type === "ops-note") return standaloneRecordView(item);
  return `${header({ compact: true })}<main class="article-main">
    <button class="back-link" data-back>← Kembali ke hasil pencarian</button>
    <div class="article-breadcrumb">${escapeHtml(item.topic)} <span>›</span> ${escapeHtml(item.subtopic)}</div>
    <article class="article-card">
      <p class="article-type">${item.type === "comparison" ? "Tampilan perbandingan" : "Artikel"}</p>
      <h1>${escapeHtml(item.title)}</h1>
      <p class="article-summary">${escapeHtml(item.summary)}</p>
      ${recordContextMarkup(item)}
      ${item.highlights?.length ? `<section id="${item.id}-summary" data-anchor="${item.id}-summary" class="summary-section"><h2>Ringkasan utama</h2><div class="highlight-grid">${item.highlights.slice(0, 3).map((highlightText) => `<div class="highlight"><span>✓</span><p>${escapeHtml(highlightText)}</p></div>`).join("")}</div></section>` : ""}
      ${item.type === "comparison" ? comparisonMarkup(item) : (item.sections || []).map((section, index) => sectionMarkup(section, index, item)).join("")}
      ${catalogMarkup(item)}
      ${relatedRecordsMarkup(item)}
      ${faqsMarkup(item)}
      ${(item.ops || []).length ? `<section id="${item.id}-ops" data-anchor="${item.id}-ops" class="article-section ops-section"><h2>Catatan untuk SA</h2><ul>${item.ops.map((op, index) => `<li id="${item.id}-ops-${index}">${escapeHtml(op)}</li>`).join("")}</ul></section>` : ""}
      <section class="sources-section"><h2>Sumber</h2><div class="source-list">${(item.sources || []).map(sourceMarkup).join("")}</div></section>
      ${metadataMarkup(item)}
    </article>
  </main>`;
}

function render() {
  stopPlaceholderRotation();
  const selectedItem = state.selectedId ? KNOWLEDGE.find((item) => item.id === state.selectedId) : null;
  // A stale or hand-edited URL should never leave the app with a broken
  // detail view. Fall back to the home screen when the record no longer
  // exists in the static catalog.
  const view = selectedItem ? articleView(selectedItem) : (state.query ? resultsView() : homeView());
  app.removeAttribute?.("aria-busy");
  app.innerHTML = view;
  if (typeof document !== "undefined") {
    document.title = selectedItem
      ? `${selectedItem.title || selectedItem.name} · SA Knowledge Hub`
      : state.query
        ? `${state.query} · SA Knowledge Hub`
        : "SA Knowledge Hub";
  }
  bindEvents();
  bindHomePlaceholder();
  if (selectedItem && state.selectedAnchor) {
    const anchor = state.selectedAnchor;
    requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
}

function submitSearch(query) {
  const trimmed = String(query || "").trim();
  if (pendingSearchTimer !== null) {
    window.clearTimeout(pendingSearchTimer);
    pendingSearchTimer = null;
  }
  if (!trimmed) {
    navigateTo("/", { replace: false });
    return;
  }
  stopPlaceholderRotation();
  app.innerHTML = searchLoadingView(trimmed);
  app.setAttribute("aria-busy", "true");
  // Give the browser a frame to paint the loading state before the static
  // index work and route render begin. This keeps the short local delay
  // understandable without making the search feel artificially slow.
  pendingSearchTimer = window.setTimeout(() => {
    pendingSearchTimer = null;
    navigateTo(searchPath(trimmed), { replace: false });
    const input = document.querySelector(".header-search input");
    input?.focus();
  }, 60);
}

function bindEvents() {
  document.querySelectorAll("[data-search-form]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitSearch(new FormData(form).get("q") || "");
  }));
  document.querySelectorAll("[data-query]").forEach((button) => button.addEventListener("click", () => submitSearch(button.dataset.query)));
  document.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => {
    const item = KNOWLEDGE.find((candidate) => candidate.id === button.dataset.open);
    if (!item) return;
    navigateTo(routeForItem(item, button.dataset.anchor || ""), { returnPath: currentPath() });
  }));
  document.querySelectorAll("[data-doc-type]").forEach((button) => button.addEventListener("click", () => {
    navigateTo(searchPath(state.query, button.dataset.docType || "Semua"));
  }));
  document.querySelectorAll("[data-home]").forEach((button) => button.addEventListener("click", () => navigateTo("/")));
  document.querySelectorAll("[data-back]").forEach((button) => button.addEventListener("click", () => {
    if (state.returnPath) {
      const destination = state.returnPath;
      state.returnPath = "";
      navigateTo(destination);
    } else {
      navigateTo("/");
    }
  }));
}

if (typeof window !== "undefined") window.addEventListener("popstate", () => {
  applyRoute(window.location);
  render();
});

applyRoute();
render();

// Exported for lightweight acceptance tests; the browser entry point still renders normally.
export { search, searchDetailed };
