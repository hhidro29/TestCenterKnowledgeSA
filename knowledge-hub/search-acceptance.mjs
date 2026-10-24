/**
 * Lightweight acceptance checks for the local search index.
 * Run with: node knowledge-hub/search-acceptance.mjs
 */
import assert from "node:assert/strict";
globalThis.document = {
  querySelector: (selector) => selector === "#app" ? { innerHTML: "" } : null,
  querySelectorAll: () => []
};

const { searchDetailed } = await import("./app.js?acceptance=20261024");

const cases = [
  ["ketentuan pemilihan jurusan di UTBK", "snbt-2026", "Ketentuan pemilihan"],
  ["kuota jurusan Pendidikan Dokter UI", "study-program-universitas-indonesia-pendidikan-dokter", "Peluang historis"],
  ["jadwal pendaftaran PKN STAN", "stan-2026", "Ops update"],
  ["Jadwal pendaftaran STAN", "stan-2026", "Ops update"],
  ["jadwal masuk STAN", "stan-2026", "Ops update"],
  ["pendaftaran PKN STAN", "stan-2026", "Langkah pendaftaran"],
  ["syarat STAN", "stan-2026", "Persyaratan"],
  ["tahapan seleksi STAN", "stan-2026", "Tahapan seleksi"],
  ["jadwal pendaftaran STIS", "stis-2026", "jadwal"],
  ["jadwal STMKG", "stmkg-2026", "jadwal"],
  ["pendaftaran SIPENCATAR", "sipencatar-kemenhub-2026", "Pendaftaran"],
  ["syarat IPDN", "ipdn-2026", "Konteks"],
  ["seleksi sekolah kedinasan", "panduan-sekolah-kedinasan-2026", "Kapan artikel"],
  ["pendaftaran Poltek SSN", "poltek-ssn-2026", "Pendaftaran"],
  ["syarat Poltekpin", "poltekpin-2026", "persyaratan"],
  ["biaya Poltekimipas", "poltekimipas-2026", "biaya"],
  ["portal STIN", "stin-2026", "Konteks"]
  , ["cara daftar akun SNPMB", "snbt-2026-faq-13-cara-membuat-akun-snpmb-untuk-utbk-snbt", "Judul"]
  , ["isi biodata UTBK", "snbt-2026-faq-14-cara-mengisi-biodata-utbk-snbt", "Judul"]
  , ["KIP Kuliah gratis UTBK", "snbt-2026-faq-16-status-kip-kuliah-dan-biaya-utbk", "Jawaban"]
  , ["slip bayar UTBK", "snbt-2026-faq-17-cara-membayar-biaya-pendaftaran-utbk", "Judul"]
  , ["pilih kota UTBK", "snbt-2026-faq-18-cara-memilih-kota-dan-pusat-utbk", "Jawaban"]
  , ["pendaftaran UTBK gagal", "snbt-2026-faq-19-apa-yang-dilakukan-jika-pendaftaran-utbk-gagal", "Judul"]
  , ["subtes UTBK apa saja", "snbt-2026-faq-21-apa-saja-subtes-dalam-utbk", "Judul"]
  , ["sertifikat UTBK dimana", "snbt-2026-faq-22-di-mana-mengunduh-sertifikat-utbk", "Judul"]
  , ["benchmark skor UTBK", "snbt-2026-faq-23-bagaimana-membaca-benchmark-historis-utbk", "Judul"]
  , ["jadwal pendaftaran UTBK", "snbt-2026-faq-24-kapan-jadwal-pendaftaran-utbk-snbt", "Judul"]
  , ["biaya UTBK", "snbt-2026-faq-25-berapa-biaya-pendaftaran-utbk-snbt", "Judul"]
  , ["perubahan aturan SNBT", "snbt-2026-faq-26-bagaimana-mengecek-pengumuman-dan-perubahan-aturan", "Judul"]
  , ["Universitas Indonesia", "university-universitas-indonesia", "Judul"]
  , ["Universitas Gadjah Mada", "university-universitas-gadjah-mada", "Judul"]
  , ["Psikologi", "study-program-universitas-airlangga-psikologi", "Judul"]
  , ["pelajaran ilmu komputer", "study-program-institut-pertanian-bogor-ilmu-komputer", "Bidang yang dipelajari"]
  , ["mata kuliah psikologi", "study-program-universitas-gadjah-mada-psikologi", "Bidang yang dipelajari"]
  , ["prospek kerja arsitektur UI", "study-program-universitas-indonesia-arsitektur", "Prospek kerja"]
  , ["syarat kesehatan IPDN", "ipdn-2026", "kesehatan IPDN"]
  , ["kesehatan STIN", "stin-2026", "Konteks"]
  , ["kesehatan SIPENCATAR", "sipencatar-kemenhub-2026", "kesehatan SIPENCATAR"]
  , ["kesehatan Poltekimipas", "poltekimipas-2026", "Pendaftaran"]
  , ["kesehatan PKN STAN", "stan-2026", "kebugaran PKN STAN"]
  , ["buta warna kedinasan", "ketentuan-kesehatan-sekolah-kedinasan-2026", "Ringkasan"]
];

let failures = 0;
for (const [query, expectedId, contextPart] of cases) {
  const results = searchDetailed(query);
  const first = results[0];
  const ok = first?.item.id === expectedId && first.context.label.toLocaleLowerCase("id-ID").includes(contextPart.toLocaleLowerCase("id-ID"));
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"} | ${query} | ${results.length} result(s) | first=${first?.item.id || "none"} | context=${first?.context.label || "none"}`);
}
if (failures) process.exitCode = 1;
else console.log(`\n${cases.length} search acceptance cases passed.`);

// Regression checks for entity disambiguation and exact regional filters.
const westJava = searchDetailed("universitas unggul di Jawa Barat");
assert.ok(westJava.length > 0, "Jawa Barat query returns universities");
assert.ok(westJava.every(({ item }) => item.entityType === "university" && item.province.toLocaleLowerCase("id-ID") === "jawa barat"), "Jawa Barat query stays within Jawa Barat");

const centralJava = searchDetailed("universitas unggul di Jawa Tengah");
assert.ok(centralJava.length > 0, "Jawa Tengah query returns universities");
assert.ok(centralJava.every(({ item }) => item.entityType === "university" && item.province.toLocaleLowerCase("id-ID") === "jawa tengah"), "Jawa Tengah query stays within Jawa Tengah");

const java = searchDetailed("universitas unggul di Jawa");
assert.ok(java.length > westJava.length, "Jawa query remains broader than a province query");
assert.ok(java.every(({ item }) => item.entityType === "university" && ["banten", "dki jakarta", "jawa barat", "jawa tengah", "di yogyakarta", "jawa timur"].includes(item.province.toLocaleLowerCase("id-ID"))), "Jawa query stays within Java provinces");

const psikologiUi = searchDetailed("prodi Psikologi UI");
assert.ok(psikologiUi.length > 0, "specific UI program query returns a result");
assert.equal(psikologiUi.length, 1, "specific UI program query returns only the matching program");
assert.ok(psikologiUi.every(({ item }) => item.entityType === "study-program" && item.universityAbbreviation === "UI"), "UI program query excludes other universities");

const psikologiAll = searchDetailed("prodi Psikologi");
assert.ok(psikologiAll.some(({ item }) => item.universityAbbreviation === "UI"), "generic program query includes UI when available");
assert.ok(psikologiAll.some(({ item }) => item.universityAbbreviation !== "UI"), "generic program query remains cross-university");
const komunikasiUnair = searchDetailed("Ilmu Komunikasi UNAIR");
assert.equal(komunikasiUnair.length, 1, "named university/program query returns only the matching program");
assert.equal(komunikasiUnair[0]?.item.universityAbbreviation, "Unair", "named program query is scoped to the requested university");
console.log("PASS | entity disambiguation and regional filter regressions");

const intentQueries = ["pelajaran ilmu komputer", "mata kuliah psikologi", "prospek kerja arsitektur"];
for (const query of intentQueries) {
  const results = searchDetailed(query);
  assert.ok(results.length > 0, `${query} returns program results`);
  assert.ok(results.every(({ item }) => item.entityType === "study-program"), `${query} excludes article/FAQ/university results`);
}
const genericArchitecture = searchDetailed("prospek kerja arsitektur");
assert.ok(genericArchitecture.length >= 5, "generic architecture career query returns cross-university programs");
assert.ok(searchDetailed("pelajaran ilmu komputer").every(({ item }) =>
  [item.name, ...(item.aliases || [])].some((value) => {
    const text = value.toLocaleLowerCase("id-ID");
    return text.includes("ilmu") && text.includes("komputer");
  })
), "Ilmu Komputer intent excludes faculty-only aliases");
console.log("PASS | program intent routing regressions");
