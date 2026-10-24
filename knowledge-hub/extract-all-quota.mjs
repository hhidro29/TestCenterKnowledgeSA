// Reproducible quota-history extraction.
// Program IDs come from saved Ruangguru university payloads, matched to the
// 529 study-program records in data.js by catalog URL (name fallback when the
// source payload has no slugURL). Only successful quota API years are kept.
import fs from "node:fs/promises";
import vm from "node:vm";
import { KNOWLEDGE } from "./data.js";

const OUT = new URL("./quota-data.js", import.meta.url);
const SNAPSHOT = new URL("../scratch/quota-extraction-2026-10-24.json", import.meta.url);
const TOP10 = new URL("../scratch/top10_universities_data.json", import.meta.url);
const UI_SCRAPE = new URL("../scratch/ui_all_scraped_majors.json", import.meta.url);
const YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];
const EXTRACTED_AT = "2026-10-24";
const API_BASE = "https://app.ruangguru.com/api/v3/rg-university/university-major-quota";
const UA = "SA-Knowledge-Hub quota extraction/2.0";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const normalizeName = (value) => String(value || "").toLocaleLowerCase("id-ID").replace(/[^a-z0-9]+/g, " ").trim();
const readJson = async (url) => JSON.parse(await fs.readFile(url, "utf8"));

async function mapConcurrency(items, limit, worker) {
  const output = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      output[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return output;
}

// IDs are taken from local snapshots, avoiding 529 catalog-page requests. The
// UI snapshot is authoritative for UI; top10 supplies the other universities.
const [top10, uiSnapshot, prior] = await Promise.all([
  readJson(TOP10),
  readJson(UI_SCRAPE),
  readJson(new URL("../scratch/quota_history_extracted.json", import.meta.url)),
]);
const universities = top10.map((university) => university.slug === "universitas-indonesia"
  ? { ...university, faculties: uiSnapshot.univDetail.faculties }
  : university);
const programs = KNOWLEDGE.filter((item) => item.entityType === "study-program");
const sourceMajorByUrl = new Map();
const sourceMajorsByUniversity = new Map();
for (const university of universities) {
  const majors = (university.faculties || []).flatMap((faculty) => faculty.majors || []);
  sourceMajorsByUniversity.set(university.name, majors);
  for (const major of majors) {
    if (major.slugURL) sourceMajorByUrl.set(`https://app.ruangguru.com/kampus${major.slugURL}`, major);
  }
}

// Numeric IDs recovered from prior successful records or one known catalog
// payload per university (ITB 28, IPB 27, ITS 47).
const UNIVERSITY_IDS = {
  "Universitas Indonesia": 23,
  "Universitas Gadjah Mada": 43,
  "Institut Teknologi Bandung": 28,
  "Universitas Airlangga": 48,
  "Institut Pertanian Bogor": 27,
  "Institut Teknologi Sepuluh Nopember": 47,
  "Universitas Padjadjaran": 31,
  "Universitas Diponegoro": 36,
  "Universitas Brawijaya": 49,
  "Universitas Sebelas Maret": 40,
};
for (const record of prior.records || []) {
  if (record.universityName && Number.isInteger(record.universityId)) UNIVERSITY_IDS[record.universityName] = record.universityId;
}

const recordsWithIds = programs.map((program) => {
  const majors = sourceMajorsByUniversity.get(program.universityName) || [];
  let sourceMajor = sourceMajorByUrl.get(program.catalogUrl);
  if (!sourceMajor) {
    const target = normalizeName(program.name);
    const matches = majors.filter((major) => normalizeName(major.name) === target);
    if (matches.length !== 1) throw new Error(`Unable to map ${program.id} to a local major ID`);
    sourceMajor = matches[0];
  }
  const universityId = UNIVERSITY_IDS[program.universityName];
  if (!universityId) throw new Error(`Missing university ID for ${program.universityName}`);
  return { item: program, majorId: Number(sourceMajor.id), universityId: Number(universityId) };
});
if (recordsWithIds.length !== 529 || recordsWithIds.some((record) => !record.majorId || !record.universityId)) {
  throw new Error(`Expected 529 mapped programs; got ${recordsWithIds.length}`);
}
console.log(`mapped local IDs: ${recordsWithIds.length}/529`);

let challengeCookie;
let challengePromise;
async function getChallengeCookie(sourceUrl) {
  if (challengeCookie) return challengeCookie;
  if (!challengePromise) {
    challengePromise = (async () => {
      const response = await fetch(sourceUrl, { headers: { "user-agent": UA } });
      const text = await response.text();
      if (!text.trimStart().startsWith("<script>")) return null;
      const cookies = [];
      const script = text.trim().replace(/^<script>/, "").replace(/<\/script>$/, "");
      vm.runInNewContext(script, { document: { set cookie(value) { cookies.push(value); } }, setTimeout() {} });
      return cookies.map((value) => value.split(";", 1)[0]).join("; ");
    })();
  }
  challengeCookie = await challengePromise;
  return challengeCookie;
}
async function fetchQuota(majorId, universityId, year) {
  const sourceUrl = `${API_BASE}?majorID=${majorId}&universityID=${universityId}&year=${year}`;
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const cookie = await getChallengeCookie(sourceUrl);
      const headers = { "user-agent": UA, accept: "application/json" };
      if (cookie) headers.cookie = cookie;
      const response = await fetch(sourceUrl, { headers });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      if (text.trimStart().startsWith("<script>")) {
        challengeCookie = null;
        challengePromise = null;
        throw new Error("anti-bot challenge");
      }
      const payload = JSON.parse(text);
      const data = payload?.data;
      if (!data || payload?.status !== "success") return null;
      return {
        year: Number(data.year ?? year),
        applicant: Number(data.applicant ?? 0),
        quota: Number(data.quota ?? 0),
        competitiveness: typeof data.competitiveness === "number" ? data.competitiveness : null,
        sourceUrl,
        extractedAt: EXTRACTED_AT,
      };
    } catch (error) {
      lastError = error;
      if (attempt < 4) await sleep(250 * (2 ** (attempt - 1)));
    }
  }
  // Failed years are omitted from the public history; no error objects are emitted.
  if (lastError) return null;
  return null;
}

const extracted = await mapConcurrency(recordsWithIds, 18, async (record, index) => {
  const rows = await Promise.all(YEARS.map((year) => fetchQuota(record.majorId, record.universityId, year)));
  const history = rows.filter(Boolean).sort((a, b) => b.year - a.year);
  if ((index + 1) % 25 === 0) console.log(`quota API ${index + 1}/${recordsWithIds.length}`);
  return { ...record, history };
});

const orderedRecords = extracted.map(({ item, majorId, universityId, history }) => ({
  studyProgramId: item.id,
  title: item.title,
  universityName: item.universityName,
  name: item.name,
  majorId,
  universityId,
  history,
}));
const meta = {
  schemaVersion: 2,
  source: API_BASE,
  extractedAt: EXTRACTED_AT,
  availableYears: YEARS,
  programCount: orderedRecords.length,
  programsWithIds: orderedRecords.filter((record) => record.majorId && record.universityId).length,
  programsWithHistory: orderedRecords.filter((record) => record.history.length > 0).length,
  historyRows: orderedRecords.reduce((total, record) => total + record.history.length, 0),
  idSource: "scratch/top10_universities_data.json + scratch/ui_all_scraped_majors.json",
};
const output = `// Historical UTBK competition data extracted from Ruangguru university-major-quota API.\n// Only applicant, quota, competitiveness, source URL, and extraction metadata are retained.\nexport const QUOTA_HISTORY = ${JSON.stringify(orderedRecords, null, 2)};\n\nexport const QUOTA_HISTORY_META = ${JSON.stringify(meta, null, 2)};\n`;
await fs.writeFile(OUT, output, "utf8");
await fs.writeFile(SNAPSHOT, JSON.stringify({ meta, records: orderedRecords }, null, 2), "utf8");
console.log(JSON.stringify(meta, null, 2));
