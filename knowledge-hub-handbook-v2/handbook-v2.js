// Parallel handbook projection. The legacy catalog in data.js remains the
// source for v1 routes; these records power the pilot v2 navigation only.
export const HANDBOOK_VERSION = "handbook-v2";

const pilotChapter = "2-konsultasi-awal-dan-profiling";
const onboardingChapter = "1-onboarding-siswa-dan-orang-tua";
const tmbChapter = "3-tes-minat-bakat-dan-pilihan-jurusan";
const tryoutChapter = "6-tryout-dan-evaluasi-belajar";
const trackingChapter = "7-tracker-attendance-dashboard-dan-data-studio";
const accessChapter = "8-akses-security-error-dan-eskalasi";
const directoryChapter = "9-directory-sumber-dan-evidence";

const handbookLinks = {
  index: { id: "hb-index-profiling", label: "Pusat Profiling Siswa" },
  profiling: { id: "hb-topic-profiling-siswa", label: "Profiling Siswa" },
  consultation: { id: "hb-topic-konsultasi-awal", label: "Konsultasi Awal" },
  direct: { id: "hb-workflow-arahkan-pengisian-profiling", label: "Mengarahkan Pengisian Profiling" },
  unsubmitted: { id: "hb-workflow-tangani-profiling-belum-submitted", label: "Menangani Profiling yang Sudah Diisi tetapi Belum Tercatat" },
  read: { id: "hb-workflow-membaca-hasil-profiling", label: "Membaca Hasil Profiling" },
  run: { id: "hb-workflow-menjalankan-konsultasi-awal", label: "Menjalankan Konsultasi Awal" },
  deadline: { id: "hb-ops-note-batas-waktu-profiling-2026-08-31", label: "Batas Waktu Profiling" }
};

const onboardingLinks = {
  index: { id: "hb-index-onboarding", label: "Onboarding Siswa dan Orang Tua" },
  topic: { id: "hb-topic-onboarding-siswa", label: "Memahami Onboarding Siswa" },
  welcoming: { id: "hb-workflow-siapkan-welcoming", label: "Menyiapkan Welcoming dan Grup" },
  facilities: { id: "hb-workflow-jelaskan-fasilitas-bac", label: "Menjelaskan Fasilitas BAC" },
  postTest: { id: "hb-workflow-arahkan-post-test-onboarding", label: "Mengarahkan Post-test Onboarding" },
  diagnostic: { id: "hb-workflow-arahkan-tes-diagnostik", label: "Mengarahkan Tes Diagnostik" },
  recording: { id: "hb-workflow-menangani-onboarding-rekaman", label: "Menangani Onboarding melalui Rekaman" },
  links: { id: "hb-ops-note-link-onboarding", label: "Link Onboarding" }
};

const tmbLinks = {
  index: { id: "hb-index-tmb", label: "Tes Minat Bakat dan Pilihan Jurusan" },
  topic: { id: "hb-topic-tmb", label: "Memahami Tes Minat Bakat" },
  access: { id: "hb-workflow-akses-tmb", label: "Mengakses dan Mengerjakan TMB" },
  read: { id: "hb-workflow-membaca-hasil-tmb", label: "Membaca Hasil TMB dalam Konsultasi" },
  align: { id: "hb-workflow-menyelaraskan-pilihan", label: "Menyelaraskan Pilihan Siswa dan Orang Tua" },
  links: { id: "hb-ops-note-link-tmb", label: "Link dan Versi TMB" }
};

const activityChapter = "5-aktivitas-belajar-dan-pendampingan";

const activityLinks = {
  index: { id: "hb-index-aktivitas-belajar", label: "Aktivitas Belajar dan Pendampingan" },
  topic: { id: "hb-topic-aktivitas-belajar-dan-pendampingan", label: "Memahami Aktivitas Belajar dan Pendampingan" },
  kbm: { id: "hb-workflow-mengarahkan-kbm-dan-klinik", label: "Mengarahkan KBM, Izin Tidak Hadir, dan Klinik PR" },
  events: { id: "hb-workflow-menangani-motivatalks-dan-kakak-asuh", label: "Menangani Motivatalks dan Kakak Asuh" },
  followup: { id: "hb-workflow-memantau-tindak-lanjut-belajar", label: "Memantau Tindak Lanjut Belajar" },
  links: { id: "hb-ops-note-link-aktivitas-belajar", label: "Link KBM, Klinik PR, dan Pendampingan" }
};

const tryoutLinks = {
  index: { id: "hb-index-tryout", label: "Tryout, Tes Diagnostik, Kuis, Post-test, Drill, dan Rapor" },
  topic: { id: "hb-topic-tryout", label: "Memahami Tryout dan Hasilnya" },
  direct: { id: "hb-workflow-mengarahkan-tryout", label: "Mengarahkan Siswa ke Tryout" },
  quiz: { id: "hb-workflow-membaca-kuis-dan-post-test", label: "Membaca Kuis dan Post-test" },
  diagnostic: { id: "hb-workflow-mengarahkan-tes-diagnostik-matdas", label: "Mengarahkan Tes Diagnostik Matematika Dasar" },
  drill: { id: "hb-workflow-mengarahkan-drill-dan-pembahasan", label: "Mengarahkan Drill dan Pembahasan Tryout" },
  read: { id: "hb-workflow-membaca-hasil-tryout", label: "Membaca Hasil Tryout" },
  links: { id: "hb-ops-note-link-jadwal-tryout", label: "Tautan dan Dashboard Tryout" },
  schedule: { id: "hb-ops-note-jadwal-akses-tryout", label: "Jadwal dan Akses Tryout" },
  megaFaq: { id: "hb-ops-note-faq-mega-tryout-tka-sma-2026", label: "FAQ Mega Tryout TKA SMA 2026" },
  reportCardFaq: { id: "hb-ops-note-faq-report-card-tryout-premium", label: "FAQ Report Card Tryout Premium" },
  premium3Faq: { id: "hb-ops-note-faq-tryout-tka-premium-episode-3", label: "FAQ Tryout TKA Premium Episode 3" }
};

const trackingLinks = {
  index: { id: "hb-index-tracking", label: "Tracker, Attendance, Dashboard, dan Data Studio" },
  topic: { id: "hb-topic-tracking-dan-dashboard", label: "Memahami Sumber Data Operasional" },
  attendance: { id: "hb-workflow-membaca-attendance-kuis-dan-post-test", label: "Membaca Attendance, Kuis, dan Post-test" },
  dashboard: { id: "hb-workflow-membaca-dashboard-dan-data-studio", label: "Membaca Dashboard dan Data Studio" },
  missing: { id: "hb-workflow-menangani-data-operasional-belum-muncul", label: "Menangani Data Operasional Belum Muncul" },
  links: { id: "hb-ops-note-link-tracker-dashboard", label: "Link Tracker, Dashboard, dan Data Studio" }
};

const accessLinks = {
  index: { id: "hb-index-akses-security", label: "Akses, Keamanan, Kendala Sistem, dan Eskalasi" },
  topic: { id: "hb-topic-akses-dan-eskalasi", label: "Memahami Akses dan Eskalasi" },
  account: { id: "hb-workflow-menangani-login-reset-dan-akses-web", label: "Menangani Login, Reset, dan Akses Web" },
  error: { id: "hb-workflow-menangani-error-dan-data-belum-muncul", label: "Menangani Error dan Data Belum Muncul" },
  bao: { id: "hb-workflow-menangani-siswa-bao-belum-terhubung", label: "Menangani Siswa BAO Belum Terhubung SA" },
  permission: { id: "hb-workflow-mengajukan-izin-tidak-hadir-sesi", label: "Mengajukan Izin Tidak Hadir Sesi" },
  links: { id: "hb-ops-note-kanal-bantuan-dan-akses", label: "Kanal Bantuan dan Akses" }
};

const directoryLinks = {
  index: { id: "hb-index-directory-sumber", label: "Directory Sumber dan Evidence" },
  topic: { id: "hb-topic-memahami-directory-sumber", label: "Memahami Directory Sumber" },
  find: { id: "hb-workflow-mencari-sumber-dan-link-kerja", label: "Mencari Sumber dan Link Kerja" },
  freshness: { id: "hb-ops-note-status-sumber-dan-freshness", label: "Status Sumber dan Periode Berlaku" }
};

const sourceLinks = [
  { label: "Workbook Kumpulan Link Kesiswaan — tab Profiling", url: "https://docs.google.com/spreadsheets/d/1jZiK9dcCTDYeWIVdQypOLvrMD2K4EpSsk7RusaDOfCI/edit?gid=540367892#gid=540367892" },
  { label: "Profiling di SLMS Brain Academy", url: "https://app.brainacademy.id/profiling" },
  { label: "Report Data Siswa", url: "https://tinyurl.com/report-datasiswa" }
];

const onboardingSources = [
  { label: "Workbook Kumpulan Link Kesiswaan — tab Onboarding Siswa", url: "https://docs.google.com/spreadsheets/d/1jZiK9dcCTDYeWIVdQypOLvrMD2K4EpSsk7RusaDOfCI/edit?gid=1003549351#gid=1003549351" },
  { label: "Deck Fasilitas BAC AY 2026/2027", url: "https://docs.google.com/presentation/d/1o7UkCz1D-9vg6OjITY32iTug5En2V2jXJAyZcrYC_Xk/edit?slide=id.g3f7b2278b95_0_102&pli=1" },
  { label: "Post-test Fasilitas BAC", url: "https://tinyurl.com/PTfasilitasBAC" },
  { label: "Data Studio Partisipasi dan Nilai Tes Diagnostik Matematika Dasar", url: "https://datastudio.google.com/reporting/a1843e6f-e650-4408-b9db-3774a38e0a73/page/1zRVF" },
  { label: "Tracker Tes Diagnostik Matematika Dasar", url: "https://docs.google.com/spreadsheets/d/1H52zar_jlhqGc83DiIFkQwsU4VRkOIib2hfPKQUyvOc/edit?gid=1637808723" }
];

const tmbSources = [
  { label: "Workbook Kumpulan Link Kesiswaan — tab Tes Minat Bakat", url: "https://docs.google.com/spreadsheets/d/1jZiK9dcCTDYeWIVdQypOLvrMD2K4EpSsk7RusaDOfCI/edit?gid=1690866438#gid=1690866438" },
  { label: "Akses Tes Minat Bakat", url: "https://app.ruangguru.com/tmb" },
  { label: "Deck Panduan Akses TMB–Penjurusan Kuliah", url: "https://docs.google.com/presentation/d/1PwzTfJdb-aU0DY313kyaCSRrD0gcmFx6lvsI8UvOqPM/edit?slide=id.g3f5039d2e72_0_0" },
  { label: "Pre-regist TMB AY 2026/2027", url: "https://docs.google.com/spreadsheets/d/14y6Jv-SvycFaHib3sCTEIz1qJIqLFcpcXmx2MmNP7Is/edit?gid=2048703778" },
  { label: "Sumber TMB dan pilihan siswa/orang tua — 27 Agustus 2026", url: "https://drive.google.com/file/d/1Zz3SfljUAtkDFDaOPoCDnlux7peQhG4o/view" }
];

const activitySources = [
  { label: "Workbook Kumpulan Link Kesiswaan — tab KBM", url: "https://docs.google.com/spreadsheets/d/1jZiK9dcCTDYeWIVdQypOLvrMD2K4EpSsk7RusaDOfCI/edit?gid=982002767#gid=982002767" },
  { label: "Panduan Akses — Izin Tidak Hadir Sesi", url: "https://drive.google.com/file/d/1jiyxjP4X1lzgwDe5e_olkWAlLipzlsV8/view?usp=drive_link" },
  { label: "Tracker Pelaksanaan Motivatalks 26/27", url: "https://docs.google.com/spreadsheets/d/1HycoTITo7wOsjdnTs0STmjbzgoCCCqDCmN1eC76N1ls/edit?gid=0" },
  { label: "Recording briefing Motivatalks", url: "https://drive.google.com/file/d/1YhlUKgoarVYJApRqXEFOOB-Xs347XZzl/view?usp=sharing" },
  { label: "RSVP Motivatalks", url: "http://tinyurl.com/RSVP-MOTIVATALKS" },
  { label: "Recording Panduan Kakak Asuh dan Konsultasi Awal 12 SMA", url: "http://drive.google.com/file/d/1kAGh7HRMy3P_Mnm9AVp-FKWZAY_MWkgA/view" },
  { label: "Recording Klinik PR, Kuis/Post-test, dan Tryout", url: "https://drive.google.com/file/d/1JpUJ82isi_8D-Sh7Jc-m2hdJRMqI0axb/view?usp=sharing" },
  { label: "Sosialisasi Klinik Bertopik, Bahan Ajar, dan Paket Siswa", url: "https://drive.google.com/file/d/1Zz3SfljUAtkDFDaOPoCDnlux7peQhG4o/view" },
  { label: "Form Profiling di SLMS Brain Academy", url: "https://app.brainacademy.id/profiling" }
];

const tryoutSources = [
  { label: "Calendar Event Tryout Ruanguji AY 2026/2027", url: "https://docs.google.com/presentation/d/1FsEuQoRKiDHhCzCYiNMlX0dcCvGz97VdTIHyF0IOH24/edit?slide=id.g3d87b0c4140_0_0" },
  { label: "Data Nilai Tryout TKA", url: "https://datastudio.google.com/reporting/b3de10d5-ac8d-45e5-9453-cbfff4b8b2a8/page/fNh4F" },
  { label: "Data Nilai Tryout UTBK", url: "https://datastudio.google.com/reporting/eda2ad18-30d7-4ce5-b6c1-c3b487d87b0a/page/gyQ7F" },
  { label: "Akses Tryout TKA Premium Episode 1", url: "https://tinyurl.com/TOTKA-PREM1" },
  { label: "Akses Mega Tryout TKA SMA — mapel wajib", url: "https://tinyurl.com/MegaTOTKA-wajib" },
  { label: "Akses Mega Tryout TKA SMA — mapel pilihan", url: "https://tinyurl.com/MegaTOTKA-pilihan" },
  { label: "Rapor Tryout TKA per regional/cabang", url: "https://docs.google.com/spreadsheets/d/11WbDETWoRJDT0b74lj_EaDucEIi4jkBTPpgk-uhdHZs/edit?gid=159708575" },
  { label: "Workbook Kumpulan Link Kesiswaan — rujukan tryout", url: "https://docs.google.com/spreadsheets/d/1jZiK9dcCTDYeWIVdQypOLvrMD2K4EpSsk7RusaDOfCI/edit?gid=0#gid=0" },
  { label: "Tab Tryout — daftar link partisipasi per episode", url: "https://docs.google.com/spreadsheets/d/1jZiK9dcCTDYeWIVdQypOLvrMD2K4EpSsk7RusaDOfCI/edit?gid=1451540636#gid=1451540636" },
  { label: "Tab Rapor TO UTBK/TKA/STS — link rapor per regional/cabang", url: "https://docs.google.com/spreadsheets/d/1jZiK9dcCTDYeWIVdQypOLvrMD2K4EpSsk7RusaDOfCI/edit?gid=0#gid=0" }
];

const megaTryoutSources = [
  { label: "SSOT Kumpulan Link Kesiswaan — tab Tryout", url: "https://docs.google.com/spreadsheets/d/1jZiK9dcCTDYeWIVdQypOLvrMD2K4EpSsk7RusaDOfCI/edit?gid=1568231331#gid=1568231331" },
  { label: "Calendar Event Tryout Ruanguji 2026/2027", url: "https://docs.google.com/presentation/d/1FsEuQoRKiDHhCzCYiNMlX0dcCvGz97VdTIHyF0IOH24/edit?usp=sharing" },
  { label: "Tautan mata pelajaran wajib Mega Tryout TKA SMA", url: "https://tinyurl.com/MegaTOTKA-wajib" },
  { label: "Tautan mata pelajaran pilihan Mega Tryout TKA SMA", url: "https://tinyurl.com/MegaTOTKA-pilihan" }
];

const trackingSources = [
  { label: "Workbook Kumpulan Link Kesiswaan — tab Tracker Kesiswaan", url: "https://docs.google.com/spreadsheets/d/1jZiK9dcCTDYeWIVdQypOLvrMD2K4EpSsk7RusaDOfCI/edit?gid=982002767#gid=982002767" },
  { label: "Summary Tracker Kesiswaan", url: "https://docs.google.com/spreadsheets/d/1Pw51bN4Qk3N52-SMvdAxBoEN6kfnhuLVQtvNUt3XnPM/edit?gid=1794224348" },
  { label: "Data Attendance", url: "https://datastudio.google.com/u/0/reporting/e7434eac-3f7e-4eed-bf80-ca2c77506f59/page/p_wclrcvla2c" },
  { label: "Data Pengerjaan Kuis dan Post-test", url: "https://datastudio.google.com/u/0/reporting/e7434eac-3f7e-4eed-bf80-ca2c77506f59/page/p_lu7ebu794c" },
  { label: "Data Pengerjaan Drill Soal", url: "https://lookerstudio.google.com/u/0/reporting/1d6d59b3-589c-43fb-9f3e-25a01de59c3c/page/ttCHF" },
  { label: "Data Nilai Tryout TKA", url: "https://datastudio.google.com/reporting/b3de10d5-ac8d-45e5-9453-cbfff4b8b2a8/page/fNh4F" },
  { label: "Data Studio Partisipasi dan Nilai Tes Diagnostik Matematika Dasar", url: "https://datastudio.google.com/reporting/a1843e6f-e650-4408-b9db-3774a38e0a73/page/1zRVF" },
  { label: "Dashboard Status Siswa BAO", url: "https://lookerstudio.google.com/reporting/6f3df9a1-3da8-4e34-b771-0faabfed2fa5/page/p_r3bdwiowhd" }
];

const quizSources = [
  { label: "Monitoring Kuis, Post-test, Rapor, dan Attendance — 4 Agustus 2026", url: "https://drive.google.com/file/d/1DqTgK7C6ugrC2HuXlOexnr56kTiZZJR-/view" },
  { label: "Klinik PR, Kuis/Post-test, dan Tryout — 18 Agustus 2026", url: "https://drive.google.com/file/d/1JpUJ82isi_8D-Sh7Jc-m2hdJRMqI0axb/view?usp=sharing" },
  { label: "Data Pengerjaan Kuis dan Post-test", url: "https://datastudio.google.com/u/0/reporting/e7434eac-3f7e-4eed-bf80-ca2c77506f59/page/p_lu7ebu794c" }
];

const drillSources = [
  { label: "Tryout Wajib dan Pembahasan TO — 1 September 2026", url: "https://drive.google.com/file/d/1qNpf_1c5n3IxfCEHzqH1Ef6dBZH9uPbI/view" },
  { label: "Drill, HMS, Dashboard Monitoring, dan Request Anulir — 1 September 2026", url: "https://drive.google.com/file/d/1qNpf_1c5n3IxfCEHzqH1Ef6dBZH9uPbI/view" },
  { label: "Data Pengerjaan Drill Soal", url: "https://lookerstudio.google.com/u/0/reporting/1d6d59b3-589c-43fb-9f3e-25a01de59c3c/page/ttCHF" }
];

const diagnosticSources = [
  { label: "Workbook Kumpulan Link Kesiswaan — tab Tes Diagnostik", url: "https://docs.google.com/spreadsheets/d/1jZiK9dcCTDYeWIVdQypOLvrMD2K4EpSsk7RusaDOfCI/edit?gid=1568231331#gid=1568231331" },
  { label: "Pre-Regist DT Matematika Dasar 26/27", url: "https://docs.google.com/spreadsheets/d/1w3req71b-P81n2sCkWwSk2e2rU6X6zzRzVQkO_PrCBo/edit?gid=493799211" },
  { label: "Data Studio Partisipasi dan Nilai Tes Diagnostik Matematika Dasar", url: "https://datastudio.google.com/reporting/a1843e6f-e650-4408-b9db-3774a38e0a73/page/1zRVF" },
  { label: "Tracker Tes Diagnostik Matematika Dasar", url: "https://docs.google.com/spreadsheets/d/1H52zar_jlhqGc83DiIFkQwsU4VRkOIib2hfPKQUyvOc/edit?gid=1637808723" }
];

const accessSources = [
  { label: "Panduan Akses — Izin Tidak Hadir Sesi", url: "https://drive.google.com/file/d/1jiyxjP4X1lzgwDe5e_olkWAlLipzlsV8/view?usp=sharing" },
  { label: "Info BAO dan Eskalasi Siswa Belum Terhubung SA", url: "https://docs.google.com/spreadsheets/d/1jZiK9dcCTDYeWIVdQypOLvrMD2K4EpSsk7RusaDOfCI/edit?gid=0#gid=0" },
  { label: "Weekly Sync — Keamanan Akun dan Akses Web Siswa, 14 Juli 2026", url: "https://drive.google.com/file/d/1zSktVoDstKMGdaonlDyZ2fJ91sgNFT7N/view?usp=sharing" },
  { label: "Weekly Sync — Akses TMB dan Reset, 4 Agustus 2026", url: "https://drive.google.com/file/d/1DqTgK7C6ugrC2HuXlOexnr56kTiZZJR-/view" }
];

export const HANDBOOK_V2 = [
  {
    ...handbookLinks.index,
    pageType: "index",
    chapter: pilotChapter,
    title: "Konsultasi Awal dan Profiling",
    summary: "Pintu masuk untuk memahami Profiling, mengarahkan pengisian, membaca hasil, dan menyiapkan Konsultasi Awal.",
    status: "draft_pilot",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["pusat profiling siswa", "panduan profiling SA", "cluster profiling"],
    testQueries: ["Saya mau mengarahkan siswa mengisi profiling", "Siswa sudah isi profiling tapi belum submitted", "Profiling siswa kelas 12 ada di mana?"],
    intro: "Mulai dari kebutuhan yang sedang kamu tangani. Setiap halaman menjelaskan tujuan, langkah kerja, hasil, dan batas informasi yang boleh disampaikan.",
    sections: [
      { heading: "Pilih kebutuhanmu", links: [handbookLinks.profiling, handbookLinks.consultation, handbookLinks.direct, handbookLinks.unsubmitted, handbookLinks.read, handbookLinks.run, handbookLinks.deadline] },
      { heading: "Alur singkat", steps: ["Tentukan jenjang siswa.", "Kirim form yang sesuai.", "Pastikan login dan pengisian selesai.", "Cek data respons atau status submitted.", "Jika belum terlacak, gunakan jalur laporan.", "Gunakan hasil sebagai bahan Konsultasi Awal."] }
    ],
    sources: sourceLinks,
    metadata: { period: "AY 2026/2027", freshness: "Mengikuti rilis Tim Akademik terbaru" }
  },
  {
    ...handbookLinks.profiling,
    pageType: "topic",
    chapter: pilotChapter,
    parentId: handbookLinks.index.id,
    summary: "Rujukan dasar untuk memahami fungsi Profiling, mengarahkan pengisian, mengecek status, dan menyiapkan Konsultasi Awal.",
    status: "draft_pilot",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["form profiling siswa", "student profiling", "profiling kelas 12", "profiling UTBK"],
    testQueries: ["Siapa yang wajib mengisi Form Profiling?", "Dari mana Summary Profiling dihitung?", "Form Profiling kelas 12 dibuka di mana?", "Apakah Form Profiling boleh diberikan setelah siswa melakukan pembayaran?"],
    sections: [
      { heading: "Memahami Profiling", body: "Profiling mengumpulkan informasi awal tentang kebutuhan pendampingan, kebiasaan belajar, target, dan konteks akademik siswa. Data ini membantu SA memahami situasi siswa sebelum Konsultasi Awal, sehingga percakapan dapat dimulai dari konteks yang sudah tersedia." },
      { heading: "Peran dalam pendampingan", body: "Profiling menjadi bahan untuk menyiapkan pertanyaan, membaca kebutuhan bantuan, dan menyusun rencana pemantauan. Hasilnya membantu arah percakapan, tetapi bukan keputusan final tentang jurusan atau jalur seleksi dan bukan diagnosis siswa." },
      { heading: "Kapan dibaca", body: "Baca Profiling ketika siswa mulai bergabung, ketika kelengkapan data perlu diperiksa sebelum konsultasi, atau ketika siswa menanyakan arti status dan hasilnya. Jika membutuhkan langkah pengisian atau pengecekan data, gunakan workflow terkait di bagian berikutnya." },
      { heading: "Siapa melakukan apa", bullets: ["SA mengarahkan pengisian dan mengecek status.", "Siswa mengisi form dengan akunnya sendiri.", "Tim yang menangani data memperbarui data atau membantu masalah sinkronisasi melalui jalur resmi."] },
      { heading: "Siapa yang wajib mengisi", body: "Jawaban Tim Akademik menyebut seluruh siswa kelas 3 SD sampai kelas 11 SMA yang sudah melakukan pembayaran pada periode yang ditentukan wajib mengisi Form Profiling. Siswa yang membayar setelah periode tersebut tetap mengisi dengan batas waktu baru. Tanggal 31 Agustus dan 30 September 2026 yang tercatat di sumber diperlakukan sebagai histori; gunakan rilis aktif untuk periode berjalan." },
      { heading: "Summary Profiling", body: "Ringkasan hasil Profiling dihitung dari data Form Profiling yang sudah diisi dengan mencocokkan User Serial atau email. Gunakan ringkasan ini untuk memahami konteks siswa, menyiapkan pertanyaan, dan menyusun rencana; jangan menggunakannya sebagai diagnosis atau keputusan penerimaan." },
      { heading: "Batas waktu dan periode", body: "Batas waktu dapat berbeda menurut kelompok siswa dan waktu pembayaran. Gunakan rilis Tim Akademik terbaru. Tanggal 31 Agustus 2026 disimpan sebagai catatan histori, bukan instruksi aktif.", links: [handbookLinks.deadline] },
      { heading: "Workflow terkait", body: "Gunakan halaman tindakan berikut ketika perlu mengarahkan pengisian, menangani data yang belum tercatat, atau membaca hasil sebelum Konsultasi Awal.", links: [handbookLinks.direct, handbookLinks.unsubmitted, handbookLinks.read] }
    ],
    sources: sourceLinks,
    metadata: { period: "AY 2026/2027", freshness: "As of source date; tautan, batas waktu, dan status mengikuti rilis terbaru" }
  },
  {
    ...handbookLinks.consultation,
    pageType: "topic",
    chapter: pilotChapter,
    parentId: handbookLinks.index.id,
    summary: "Panduan memahami tujuan, bahan percakapan, peran SA, dan tindak lanjut Konsultasi Awal.",
    status: "draft_pilot",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["konsultasi awal siswa", "konsultasi awal kelas 12", "konsultasi kakak asuh"],
    testQueries: ["Apa yang perlu disiapkan sebelum Konsultasi Awal?", "Apa output Konsultasi Awal?", "Apa yang dibahas SA saat Konsultasi Awal?"],
    sections: [
      { heading: "Tujuan", body: "Konsultasi Awal adalah ruang untuk menyamakan pemahaman antara siswa, orang tua, dan SA tentang kebutuhan, pilihan, target, serta rencana belajar. Percakapan ini membantu SA memahami konteks siswa dan menyusun pendampingan yang bisa ditindaklanjuti. SA memfasilitasi pembahasan; SA tidak memaksakan pilihan atau menjadikan target sebagai jaminan kelulusan." },
      { heading: "Kapan digunakan", body: "Gunakan setelah Profiling dan data pendukung dapat dibaca, ketika siswa membutuhkan pembahasan tentang pilihan atau target, dan sebelum rencana pendampingan dijalankan. Konsultasi bukan sekadar pengecekan data; sesi ini dipakai untuk menyusun pemahaman dan langkah berikutnya bersama." },
      { heading: "Bahan yang disiapkan", body: "Bahan berikut membantu percakapan dimulai dari informasi yang sudah tersedia, bukan dari perkiraan SA.", bullets: ["Ringkasan hasil Profiling.", "Nilai dan tren rapor yang tersedia.", "Pilihan kampus atau jurusan siswa.", "Target TKA atau UTBK.", "Kebutuhan bantuan dan kebiasaan belajar."] },
      { heading: "Hasil konsultasi", body: "Hasil sesi bukan keputusan penerimaan. Yang dicatat adalah kesepakatan yang dapat dipakai untuk memantau pendampingan berikutnya.", bullets: ["Pilihan jalur atau jurusan yang dibahas.", "Target belajar yang disepakati.", "Rencana belajar dan waktu pengecekan ulang.", "Catatan kesepakatan pada Student Tower atau tempat pencatatan yang ditetapkan."] },
      { heading: "Batas informasi", body: "Target dan tingkat keketatan adalah bahan perencanaan internal, bukan batas nilai masuk atau jaminan diterima. Detail TMB dan aturan jalur seleksi dirujuk ke bab terkait.", links: [handbookLinks.run, handbookLinks.read] }
    ],
    sources: sourceLinks,
    metadata: { period: "AY 2026/2027", freshness: "Peran, target, dan aturan program mengikuti rilis terbaru" }
  },
  {
    ...handbookLinks.direct,
    pageType: "workflow",
    chapter: pilotChapter,
    parentId: handbookLinks.profiling.id,
    summary: "Langkah mengirim form yang sesuai, memastikan urutan akses, dan mengecek pengisian siswa.",
    status: "draft_pilot",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara mengisi profiling siswa", "kirim link form profiling", "profiling kelas 12 UTBK"],
    testQueries: ["Bagaimana cara student profiling kelas 12 UTBK?", "Link form profiling siswa yang dipakai apa?", "Urutan login dan buka profiling bagaimana?"],
    sections: [
      { heading: "Tujuan", body: "Workflow ini membantu SA mengarahkan siswa ke form Profiling yang sesuai tanpa membuat siswa menebak form atau jalur aksesnya sendiri. Jenjang siswa dan rilis internal menjadi dasar sebelum tautan dibagikan." },
      { heading: "Kapan digunakan", body: "Gunakan saat siswa mulai bergabung, ketika perlu mengirim ulang arahan pengisian, atau ketika siswa masuk melalui jalur kelas 12/UTBK yang memiliki urutan akses berbeda." },
      { heading: "Prasyarat", body: "Sebelum mengirim arahan, pastikan informasi dasar dan tautan yang dipakai sudah sesuai.", bullets: ["Ketahui jenjang siswa.", "Pastikan siswa termasuk kelompok layanan.", "Gunakan tautan dari rilis internal terbaru.", "Jangan membagikan sheet respons kepada siswa."] },
      { heading: "Langkah kerja", steps: [{ before: "Tentukan jenjang: kelas 3 SD–11 SMA menggunakan form Profiling; kelas 12 SMA, UTBK, dan Bundling Kedinasan menggunakan ", linkText: "Profiling di SLMS Brain Academy", after: ".", url: sourceLinks[1].url }, "Untuk kelas 12/UTBK, siswa login ke SLMS Brain Academy terlebih dahulu, lalu membuka halaman Profiling.", "Cocokkan User Serial atau email pada sheet respons.", "Jika belum tercatat, lanjutkan ke alur penanganan Profiling belum tercatat."] },
      { heading: "Kondisi khusus", body: "Beberapa siswa memerlukan pengecekan tambahan sebelum diarahkan lebih lanjut.", bullets: ["Form boleh diberikan setelah siswa melakukan pembayaran. Setelah itu, cek apakah siswa sudah bisa login ke aplikasi.", "Jangan menjadikan tanggal historis sebagai batas waktu aktif.", "Jika menu Profiling tidak muncul, gunakan jalur bantuan produk atau teknis yang berlaku."], links: [handbookLinks.unsubmitted, handbookLinks.deadline] }
    ],
    sources: sourceLinks,
    metadata: { period: "AY 2026/2027", freshness: "Tautan, akses, dan batas waktu mengikuti rilis terbaru" }
  },
  {
    ...handbookLinks.unsubmitted,
    pageType: "workflow",
    chapter: pilotChapter,
    parentId: handbookLinks.profiling.id,
    summary: "Cara menangani siswa yang sudah mengisi Profiling tetapi datanya belum terlihat atau belum tercatat submitted.",
    status: "draft_pilot",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["profiling sudah diisi belum submitted", "profiling tidak muncul di response", "form profiling tidak tercatat"],
    testQueries: ["Siswa sudah mengisi form profiling tetapi belum tercatat submitted, bagaimana?", "Profiling siswa tidak muncul di response, harus apa?", "Apakah siswa perlu mengisi ulang profiling jika akunnya berbeda?"],
    sections: [
      { heading: "Tujuan", body: "Workflow ini dipakai ketika siswa merasa sudah mengisi Profiling, tetapi respons belum terlihat atau belum tercatat submitted. Fokus SA adalah memastikan masalahnya dapat dilacak dan dilaporkan melalui jalur resmi, bukan meminta siswa mengulang tanpa alasan." },
      { heading: "Siapkan sebelum melapor", body: "Informasi berikut membantu tim yang menangani data membedakan masalah akun, pencocokan data, dan respons yang belum terlihat.", bullets: ["User Serial siswa.", "Email yang dipakai saat mengisi.", "Email yang terdaftar pada akun atau paket jika berbeda.", "Hasil pengecekan pada sheet respons.", "Bukti pengisian dan keterangan perbedaan data."] },
      { heading: "Langkah kerja", steps: ["Pastikan jenjang dan sheet respons yang dipakai sudah benar.", "Cari siswa menggunakan User Serial atau email.", { before: "Jika data belum ada, kirim laporan melalui ", linkText: "Report Data Siswa", after: ".", url: sourceLinks[2].url }, "Sertakan bukti dan informasi yang tersedia.", "Catat laporan dan tindak lanjut pada tempat pencatatan yang ditetapkan."] },
      { heading: "Yang tidak boleh dilakukan", body: "Pengecekan awal tidak memberi kewenangan untuk memperbaiki respons secara manual atau membuka data internal kepada siswa.", bullets: ["Jangan meminta siswa mengisi ulang hanya karena respons belum terlihat.", "Jangan mengubah data respons secara manual.", "Jangan membagikan sheet respons internal kepada siswa atau orang tua."] },
      { heading: "Batas informasi", body: "SA melakukan pengecekan awal dan pelaporan. Perubahan data dilakukan oleh penanggung jawab melalui sistem resmi.", links: [handbookLinks.direct] }
    ],
    sources: sourceLinks,
    metadata: { period: "AY 2026/2027", freshness: "Status, PIC, dan jalur laporan mengikuti rilis operasional terbaru" }
  },
  {
    ...handbookLinks.read,
    pageType: "workflow",
    chapter: pilotChapter,
    parentId: handbookLinks.profiling.id,
    summary: "Cara membaca ringkasan Profiling sebagai bahan pertanyaan dan rencana Konsultasi Awal.",
    status: "draft_pilot",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara membaca hasil profiling siswa", "interpretasi summary profiling", "review data profiling kelas 12"],
    testQueries: ["Data apa yang dibaca SA dari hasil profiling?", "Bagaimana membaca laporan profiling SNBP dan SNBT?", "Summary Profiling dihitung dari data apa?"],
    sections: [
      { heading: "Tujuan", body: "Membaca laporan Profiling secara konsisten membantu SA membedakan antara informasi yang sudah tersedia, hal yang masih perlu ditanyakan, dan tindakan yang bisa disiapkan. Hasil pembacaan dipakai untuk mengajukan pertanyaan dan menyusun rencana, bukan untuk menetapkan jurusan atau menjanjikan kelulusan." },
      { heading: "Urutan membaca", body: "Gunakan urutan berikut agar pembacaan dimulai dari identitas dan konteks siswa, lalu bergerak ke data jalur seleksi dan tindakan pendampingan.", steps: ["Pastikan identitas dan jenjang siswa cocok.", "Baca konteks minat, pilihan jalur, target, kebiasaan belajar, dan kebutuhan bantuan.", "Baca bagian SNBP: pilihan, rapor, mata pelajaran pendukung, dan target TKA.", "Baca bagian SNBT: pilihan PTN/prodi, data pembanding yang tersedia, dan target skor.", "Hubungkan dengan rapor, tryout, TMB, kehadiran, atau latihan yang memang tersedia.", "Susun temuan, pertanyaan yang perlu dikonfirmasi, dan tindakan pertama."] },
      { heading: "Hasil yang dihasilkan", body: "Pembacaan yang baik menghasilkan bahan percakapan dan tindak lanjut yang dapat dicatat.", bullets: ["Ringkasan konteks dan kebutuhan siswa.", "Daftar data yang belum lengkap atau perlu dikonfirmasi.", "Pertanyaan pembuka untuk Konsultasi Awal.", "Target belajar dan waktu pengecekan ulang."] },
      { heading: "Batas informasi", body: "Jika komponen Summary Profiling belum jelas, gunakan sebagai bahan pertanyaan. Jangan menganggapnya sebagai diagnosis atau keputusan penerimaan.", links: [handbookLinks.run, handbookLinks.profiling] }
    ],
    sources: sourceLinks,
    metadata: { period: "AY 2026/2027", freshness: "Interpretasi komponen mengikuti keputusan Tim Akademik terbaru" }
  },
  {
    ...handbookLinks.run,
    pageType: "workflow",
    chapter: pilotChapter,
    parentId: handbookLinks.consultation.id,
    summary: "Langkah memfasilitasi percakapan awal, menyepakati target, dan mencatat tindak lanjut.",
    status: "draft_pilot",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara melakukan konsultasi awal siswa", "alur konsultasi awal kelas 12", "persiapan konsultasi awal"],
    testQueries: ["Bagaimana alur Konsultasi Awal kelas 12?", "Apa yang harus disiapkan SA sebelum konsultasi awal?", "Output Konsultasi Awal dicatat apa saja?"],
    sections: [
      { heading: "Tujuan", body: "Workflow ini membantu SA memfasilitasi percakapan awal sampai menghasilkan kesepakatan yang dapat dipantau. Peran SA adalah menjaga percakapan tetap terarah, memberi ruang bagi siswa dan orang tua, lalu membantu merumuskan tindakan berikutnya." },
      { heading: "Prasyarat", body: "Sebelum sesi dimulai, pastikan bahan percakapan dan tempat pencatatan sudah siap.", bullets: ["Profiling sudah diisi atau statusnya sudah ditangani.", "Laporan Profiling dan rapor yang tersedia dapat dibaca.", "Pilihan kampus/jurusan, jalur, dan target siswa diketahui.", "Siapkan tempat untuk mencatat kesepakatan dan tindak lanjut."] },
      { heading: "Langkah kerja", steps: ["Buka percakapan dengan menjelaskan tujuan sesi dan peran SA.", "Bahas kebutuhan, pilihan, target, dan perbedaan pandangan.", "Susun rencana belajar yang bisa dipantau.", "Ulangi pilihan, target, tindakan pertama, penanggung jawab, dan waktu pengecekan ulang.", "Catat hasil pada Student Tower atau tempat pencatatan utama yang ditetapkan."] },
      { heading: "Hasil yang dicatat", body: "Catatan sesi perlu cukup jelas untuk dipakai saat pemantauan berikutnya, tanpa mengubah target belajar menjadi janji hasil.", bullets: ["Pilihan jalur atau jurusan yang dibahas.", "Target TKA atau UTBK sebagai target belajar.", "Rencana belajar dan pemantauan.", "Tindak lanjut, penanggung jawab, dan waktu pengecekan ulang."] },
      { heading: "Skenario khusus", body: "Jika percakapan menemui kendala, kembali ke data yang tersedia dan gunakan jalur rujukan yang berlaku.", bullets: ["Jika data tidak bisa dibuka, jangan menebak; cek akses dan laporkan melalui jalur yang berlaku.", "Jika pilihan siswa dan orang tua berbeda, fasilitasi penyelarasan.", "Jika aturan atau angka berubah, gunakan rilis terbaru."], links: [handbookLinks.read, handbookLinks.consultation] }
    ],
    sources: sourceLinks,
    metadata: { period: "AY 2026/2027", freshness: "Peran, kolom pencatatan, dan aturan program mengikuti rilis terbaru" }
  },
  {
    ...handbookLinks.deadline,
    pageType: "ops_note",
    chapter: pilotChapter,
    parentId: handbookLinks.profiling.id,
    summary: "Riwayat tanggal 31 Agustus 2026 untuk siswa yang melakukan pembayaran sampai Agustus 2026.",
    status: "draft_pilot",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["deadline profiling 31 Agustus 2026", "histori deadline form profiling"],
    testQueries: ["Apa arti tanggal 31 Agustus 2026 pada profiling?", "Apakah 31 Agustus 2026 masih menjadi deadline profiling?", "Siswa yang membayar setelah Agustus mengikuti deadline apa?"],
    sections: [
      { heading: "Status tanggal ini", body: "Tanggal di halaman ini adalah riwayat periode 2026. Jangan menyampaikannya sebagai batas waktu aktif tanpa mengecek rilis Tim Akademik terbaru." },
      { heading: "Apa arti tanggal ini", bullets: ["Untuk siswa yang melakukan pembayaran sampai 31 Agustus 2026, sumber mencatat adanya batas waktu pada kelompok pembayaran tersebut.", "Siswa yang membayar setelah Agustus tetap mengisi Profiling dengan batas waktu dari rilis berikutnya."] },
      { heading: "Tindakan SA", steps: ["Cek tanggal aktif pada rilis Tim Akademik terbaru.", "Jika tanggal sumber lama berbeda, gunakan rilis terbaru.", "Perlakukan tanggal 31 Agustus 2026 sebagai histori."] }
    ],
    sources: [sourceLinks[0]],
    metadata: { period: "Riwayat periode 2026", freshness: "Historis; dapat digantikan rilis operasional berikutnya" }
  },
  {
    ...onboardingLinks.index,
    pageType: "index",
    chapter: onboardingChapter,
    title: "Onboarding Siswa dan Orang Tua",
    summary: "Pintu masuk untuk menyiapkan welcoming, menjelaskan fasilitas, dan mengarahkan aktivitas awal siswa.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["panduan onboarding siswa", "onboarding BAC", "welcoming siswa dan orang tua"],
    testQueries: ["Apa saja yang dilakukan SA saat onboarding siswa?", "Link onboarding siswa ada di mana?", "Siswa yang tidak ikut onboarding langsung harus bagaimana?"],
    intro: "Onboarding membantu siswa dan orang tua memahami cara mengikuti layanan BAC sejak awal. SA menyiapkan kanal komunikasi, menjelaskan fasilitas, lalu memastikan aktivitas awal dan tindak lanjutnya tercatat.",
    sections: [
      { heading: "Pilih kebutuhanmu", links: [onboardingLinks.topic, onboardingLinks.welcoming, onboardingLinks.facilities, onboardingLinks.postTest, onboardingLinks.diagnostic, onboardingLinks.recording, onboardingLinks.links] },
      { heading: "Alur singkat", steps: ["Siapkan welcoming dan kanal komunikasi sesuai jenjang.", "Jelaskan fasilitas dan cara mendapatkan informasi belajar.", "Bagikan post-test onboarding dan cek responsnya.", "Arahkan Tes Diagnostik bila tersedia untuk jenjang siswa.", "Jika onboarding langsung tidak terlaksana, gunakan rekaman yang sesuai.", "Catat hasil dan tindak lanjut pada sumber internal yang ditetapkan."] }
    ],
    sources: onboardingSources,
    metadata: { period: "AY 2026/2027", freshness: "Link, jadwal, aset, dan status akses mengikuti rilis operasional terbaru" }
  },
  {
    ...onboardingLinks.topic,
    pageType: "topic",
    chapter: onboardingChapter,
    parentId: onboardingLinks.index.id,
    summary: "Memahami tujuan onboarding, urutan aktivitas awal, dan pembagian peran SA, siswa, serta orang tua.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["fungsi onboarding BAC", "onboarding siswa baru", "orientasi siswa BAC"],
    testQueries: ["Apa tujuan onboarding siswa BAC?", "Apa saja yang perlu dijelaskan saat onboarding?", "Apa yang dilakukan setelah onboarding?"],
    sections: [
      { heading: "Apa itu onboarding", body: "Onboarding adalah rangkaian kegiatan awal untuk membantu siswa dan orang tua masuk ke alur belajar BAC. Isinya bukan hanya undangan ke grup, tetapi juga pengenalan fasilitas, kanal komunikasi, aktivitas awal, dan rujukan konsultasi sesuai jenjang." },
      { heading: "Mengapa urutannya penting", body: "Siswa perlu tahu kanal komunikasi dan fasilitas sebelum diminta mengerjakan post-test atau Tes Diagnostik. Dengan urutan ini, SA dapat memastikan siswa memahami apa yang harus dilakukan dan memiliki tempat untuk bertanya ketika menemukan kendala." },
      { heading: "Peran SA", body: "SA menyiapkan materi yang sesuai, menjelaskan konteksnya, membagikan link yang memang ditujukan untuk siswa, lalu mengecek respons atau partisipasi melalui sumber internal. Untuk Tes Diagnostik, sumber yang disebut di katalog adalah Data Studio Partisipasi dan Nilai Tes Diagnostik Matematika Dasar serta Tracker Tes Diagnostik Matematika Dasar. Sheet respons dan aset berlabel internal tetap digunakan untuk kebutuhan SA." },
      { heading: "Aktivitas yang biasanya terkait", bullets: ["Welcoming dan pengaturan grup komunikasi.", "Penjelasan fasilitas BAC dan cara menerima informasi belajar.", "Post-test onboarding untuk memastikan materi sudah dipahami.", "Tes Diagnostik sesuai jenjang dan program.", "Konsultasi awal atau rekaman onboarding jika sesi langsung tidak tersedia."] },
      { heading: "Lihat juga", body: "Gunakan halaman tindakan di bawah ini sesuai aktivitas yang sedang kamu tangani.", links: [onboardingLinks.welcoming, onboardingLinks.facilities, onboardingLinks.postTest, onboardingLinks.diagnostic, onboardingLinks.recording] }
    ],
    sources: onboardingSources,
    metadata: { period: "AY 2026/2027", freshness: "Alur dan aset mengikuti rilis onboarding terbaru" }
  },
  {
    ...onboardingLinks.welcoming,
    pageType: "workflow",
    chapter: onboardingChapter,
    parentId: onboardingLinks.topic.id,
    summary: "Menyiapkan welcoming dan grup komunikasi agar siswa serta orang tua tahu kanal dan informasi yang akan diterima.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara welcoming siswa", "buat grup BAC", "undangan grup siswa"],
    testQueries: ["Bagaimana cara welcoming siswa baru?", "Apa yang disampaikan di grup BAC?", "Link grup siswa ada di mana?"],
    sections: [
      { heading: "Tujuan", body: "Welcoming menjadi titik awal komunikasi dengan siswa dan orang tua. Pesan yang jelas membantu mereka memahami fungsi grup, jenis informasi yang akan dikirim, dan alasan mereka perlu tetap bergabung." },
      { heading: "Prasyarat", body: "Siapkan template sesuai jenjang dan pastikan link grup atau linktree yang digunakan berasal dari rilis terbaru.", bullets: ["Pilih jenjang siswa.", "Gunakan template welcoming yang sesuai.", "Buat salinan template yang bertanda BUAT SALINAN sebelum mengedit.", "Siapkan link grup atau placeholder link yang akan diganti."] },
      { heading: "Langkah kerja", steps: ["Pilih template welcoming sesuai jenjang dan jenis grup.", "Edit nama, jadwal, lokasi, dan link yang memang perlu disesuaikan.", "Jelaskan bahwa grup dipakai untuk jadwal, perubahan jadwal, laporan evaluasi, materi atau tugas, dan pengumuman program.", "Kirim pesan melalui kanal yang ditetapkan.", "Pastikan siswa dan orang tua tahu bahwa mereka perlu tetap berada di grup agar tidak melewatkan informasi."] },
      { heading: "Batas informasi", body: "Jangan membagikan link sheet respons, Data Studio, atau aset yang ditandai untuk SA. Jika link grup, jadwal, atau wording berubah, gunakan rilis terbaru sebelum mengirim ulang." },
      { heading: "Lihat juga", links: [onboardingLinks.facilities, onboardingLinks.postTest, onboardingLinks.links] }
    ],
    sources: onboardingSources,
    metadata: { period: "AY 2026/2027", freshness: "Template dan link grup dapat berubah menurut rilis terbaru" }
  },
  {
    ...onboardingLinks.facilities,
    pageType: "workflow",
    chapter: onboardingChapter,
    parentId: onboardingLinks.topic.id,
    summary: "Menjelaskan fasilitas BAC dengan bahasa yang bisa dipahami siswa dan orang tua.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["presentasi fasilitas BAC", "cara menjelaskan fasilitas", "materi onboarding BAC"],
    testQueries: ["Materi apa yang dijelaskan saat onboarding?", "Deck fasilitas BAC untuk siapa?", "Bagaimana menjelaskan fasilitas BAC ke orang tua?"],
    sections: [
      { heading: "Tujuan", body: "Penjelasan fasilitas membantu siswa dan orang tua memahami dukungan yang tersedia serta cara mengakses informasi belajar. SA perlu mempelajari materi terlebih dahulu agar penjelasan tidak berhenti pada pembagian link." },
      { heading: "Langkah kerja", steps: [{ before: "Buka ", linkText: "deck fasilitas BAC", after: " dari sumber internal.", url: onboardingSources[1].url }, "Pelajari fasilitas dan alur yang relevan dengan jenjang siswa.", "Jelaskan fungsi fasilitas, kapan digunakan, dan ke mana siswa harus pergi untuk mengaksesnya.", "Berikan link yang memang ditujukan untuk siswa atau orang tua.", "Simpan pertanyaan yang tidak dapat dijawab dan arahkan melalui jalur eskalasi yang berlaku."] },
      { heading: "Yang perlu dijaga", body: "Deck dan link dapat diperbarui. Jangan menjanjikan fasilitas atau akses yang tidak tercantum pada rilis terbaru, dan jangan membagikan salinan materi yang ditandai untuk SA bila sumber tidak mengizinkannya." },
      { heading: "Lihat juga", links: [onboardingLinks.postTest, onboardingLinks.links] }
    ],
    sources: onboardingSources,
    metadata: { period: "AY 2026/2027", freshness: "Isi fasilitas dan akses mengikuti rilis terbaru" }
  },
  {
    ...onboardingLinks.postTest,
    pageType: "workflow",
    chapter: onboardingChapter,
    parentId: onboardingLinks.topic.id,
    summary: "Membagikan post-test onboarding dan mengecek apakah respons siswa sudah tercatat.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["post test fasilitas BAC", "cek response onboarding", "form evaluasi onboarding"],
    testQueries: ["Post-test onboarding dibagikan kapan?", "Di mana link post-test fasilitas BAC?", "Bagaimana mengecek respons post-test siswa?"],
    sections: [
      { heading: "Tujuan", body: "Post-test dipakai setelah penjelasan fasilitas atau setelah siswa menonton rekaman pengganti. Responsnya membantu SA melihat apakah aktivitas onboarding sudah diikuti dan menjadi bahan pengecekan lanjutan." },
      { heading: "Langkah kerja", steps: [{ before: "Bagikan ", linkText: "link Post-test Fasilitas BAC", after: " setelah penjelasan atau rekaman selesai.", url: onboardingSources[2].url }, "Jelaskan bahwa siswa perlu mengisi form sesuai arahan.", "Cek sheet Responses Post Test melalui sumber internal realtime.", "Catat siswa yang belum terlihat responsnya untuk ditindaklanjuti sesuai jalur yang berlaku."] },
      { heading: "Batas informasi", body: "Response sheet digunakan untuk kebutuhan SA dan tidak dibagikan kepada siswa atau orang tua. Jika link form atau lokasi response berubah, gunakan sumber internal terbaru." },
      { heading: "Lihat juga", links: [onboardingLinks.recording, onboardingLinks.links] }
    ],
    sources: onboardingSources,
    metadata: { period: "AY 2026/2027", freshness: "Link form dan lokasi response dapat berubah" }
  },
  {
    ...onboardingLinks.diagnostic,
    pageType: "workflow",
    chapter: onboardingChapter,
    parentId: onboardingLinks.topic.id,
    summary: "Mengarahkan siswa ke Tes Diagnostik dan menyiapkan tindak lanjut berdasarkan hasil yang tersedia.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara mengarahkan tes diagnostik", "DT Matematika Dasar", "diagnostic test BAC"],
    testQueries: ["Tes Diagnostik diarahkan kapan?", "Di mana melihat hasil Tes Diagnostik BAC?", "Apa tindak lanjut setelah Tes Diagnostik?"],
    sections: [
      { heading: "Tujuan", body: "Tes Diagnostik membantu memetakan kemampuan awal dan area yang perlu diperkuat. Hasilnya dipakai untuk menentukan pendampingan berikutnya, bukan untuk memberi label tetap kepada siswa." },
      { heading: "Langkah kerja", steps: [{ before: "Pastikan siswa menerima ", linkText: "Pre-Regist DT Matematika Dasar 26/27", after: " atau link event sesuai jenjang.", url: diagnosticSources[1].url }, "Jelaskan instrumen yang perlu dikerjakan dan tempat melihat hasilnya.", { before: "Cek ", linkText: "Data Studio Partisipasi dan Nilai Tes Diagnostik Matematika Dasar", after: " untuk melihat partisipasi dan nilai.", url: diagnosticSources[2].url }, { before: "Untuk status pengerjaan dan tindak lanjut, buka ", linkText: "Tracker Tes Diagnostik Matematika Dasar", after: ".", url: diagnosticSources[3].url }, "Hubungkan hasil dengan tindak lanjut yang tersedia, seperti latihan penguatan atau klinik.", "Catat kebutuhan pendampingan dan waktu pengecekan ulang."] },
      { heading: "Kondisi khusus", body: "Jika siswa belum mengerjakan, arahkan ke event melalui pre-registration sesuai jenjang. Jika hasil belum muncul atau akses bermasalah, gunakan Data Studio dan Tracker Tes Diagnostik yang disebut di atas, lalu ikuti jalur laporan yang berlaku. Target, deadline, dan kategori tracker harus mengikuti rilis terbaru." },
      { heading: "Lihat juga", links: [onboardingLinks.links] }
    ],
    sources: [...onboardingSources, ...diagnosticSources],
    metadata: { period: "AY 2026/2027", freshness: "Link event, Data Studio, target, dan tindak lanjut mengikuti rilis terbaru" }
  },
  {
    ...onboardingLinks.recording,
    pageType: "workflow",
    chapter: onboardingChapter,
    parentId: onboardingLinks.topic.id,
    summary: "Menggunakan rekaman onboarding saat sesi langsung tidak terlaksana dan memastikan post-test tetap dikerjakan.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["rekaman onboarding siswa", "onboarding tanpa sesi langsung", "video onboarding BAC"],
    testQueries: ["Jika siswa tidak ikut onboarding langsung bagaimana?", "Rekaman onboarding kelas 12 ada di mana?", "Apakah setelah menonton rekaman perlu post-test?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan rekaman ketika siswa tidak dapat mengikuti onboarding langsung atau ketika sumber internal menetapkan rekaman sebagai pengganti. Pilih rekaman yang sesuai dengan jenjang dan program siswa." },
      { heading: "Langkah kerja", steps: ["Pilih rekaman sesuai jenjang atau program siswa.", "Kirim link rekaman melalui kanal komunikasi yang sesuai.", "Jelaskan bahwa siswa perlu menonton materi sampai selesai.", "Bagikan Post-test Fasilitas BAC setelah rekaman ditonton.", "Cek respons post-test dan catat tindak lanjut yang masih diperlukan."] },
      { heading: "Yang perlu dicek", body: "Ketersediaan rekaman, link, dan urutan post-test dapat berubah. Pastikan link yang dipakai berasal dari rilis terbaru sebelum dibagikan." },
      { heading: "Lihat juga", links: [onboardingLinks.postTest, onboardingLinks.links] }
    ],
    sources: onboardingSources,
    metadata: { period: "AY 2026/2027", freshness: "Ketersediaan rekaman dan urutan aktivitas mengikuti rilis terbaru" }
  },
  {
    ...onboardingLinks.links,
    pageType: "ops_note",
    chapter: onboardingChapter,
    parentId: onboardingLinks.index.id,
    summary: "Rujukan untuk membedakan link yang boleh dibagikan kepada siswa dari sumber kerja yang hanya dipakai SA.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["link onboarding BAC", "directory aset onboarding", "sumber internal onboarding"],
    testQueries: ["Link onboarding mana yang boleh dibagikan?", "Apa yang tidak boleh dibagikan ke siswa?", "Di mana sumber link onboarding terbaru?"],
    sections: [
      { heading: "Cara memakai catatan ini", body: "Workbook onboarding memuat aset untuk siswa dan SA sekaligus. Pastikan tujuan dan audiens setiap aset sebelum membagikan link, lalu cek rilis terbaru." },
      { heading: "Aset yang boleh dibagikan setelah dicek", bullets: [
        { before: "Temukan grup, welcoming, event, dan rekaman onboarding sesuai jenjang di ", linkText: "tab Onboarding Siswa", after: " pada workbook.", url: onboardingSources[0].url },
        { before: "Bagikan ", linkText: "Post-test Fasilitas BAC", after: " setelah siswa menerima penjelasan atau menyelesaikan rekaman.", url: onboardingSources[2].url }
      ] },
      { heading: "Rujukan internal SA", bullets: [
        { before: "Gunakan ", linkText: "tab Onboarding Siswa", after: " untuk menemukan Responses Post Test, Responses Konsultasi Awal, Data Studio Partisipasi dan Nilai Tes Diagnostik Matematika Dasar, serta pencatatan internal lainnya.", url: onboardingSources[0].url },
        { before: "Pelajari ", linkText: "Deck Fasilitas BAC", after: " sebelum menjelaskan fasilitas kepada siswa.", url: onboardingSources[1].url }
      ] },
      { heading: "Tindakan SA", steps: [{ before: "Buka tab ", linkText: "Onboarding Siswa", after: " pada workbook sumber.", url: onboardingSources[0].url }, "Cek audiens dan catatan penggunaan setiap aset.", "Pastikan link dan periode masih sesuai rilis terbaru.", "Jika akses atau status link meragukan, tahan pembagian dan gunakan jalur eskalasi."] }
    ],
    sources: [onboardingSources[0]],
    metadata: { period: "AY 2026/2027", freshness: "Daftar link harus dicek terhadap workbook dan rilis terbaru" }
  },
  {
    ...tmbLinks.index,
    pageType: "index",
    chapter: tmbChapter,
    title: "Tes Minat Bakat dan Pilihan Jurusan",
    summary: "Pintu masuk untuk memahami fungsi TMB, mengarahkan pengerjaan, dan memakai hasilnya sebagai bahan percakapan pilihan studi.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["pusat TMB", "tes minat bakat kuliah", "penjurusan kuliah", "pilihan jurusan siswa"],
    testQueries: ["Siswa harus mengerjakan TMB dari mana?", "Bagaimana cara membaca hasil Tes Minat Bakat?", "Apa yang dilakukan jika pilihan siswa berbeda dari orang tua?"],
    intro: "TMB membantu SA memulai pembahasan pilihan studi dari minat dan kemampuan siswa. Hasilnya memberi bahan untuk bertanya dan mengeksplorasi pilihan; hasil TMB bukan keputusan final tentang jurusan atau jaminan penerimaan.",
    sections: [
      { heading: "Pilih kebutuhanmu", links: [tmbLinks.topic, tmbLinks.access, tmbLinks.read, tmbLinks.align, tmbLinks.links] },
      { heading: "Alur singkat", steps: ["Pastikan siswa memakai akses TMB yang sesuai.", "Arahkan siswa menyelesaikan Tes Minat dan Tes Bakat sesuai petunjuk aplikasi.", "Baca hasil sebagai bahan pertanyaan tentang minat, kemampuan, dan pilihan studi.", "Bandingkan hasil dengan konteks siswa, bukan sebagai satu-satunya dasar keputusan.", "Jika pilihan siswa dan orang tua berbeda, gunakan percakapan untuk menyamakan pemahaman.", "Cek versi aplikasi dan panduan terbaru jika nama menu atau hasil berubah."] }
    ],
    sources: tmbSources,
    metadata: { period: "AY 2026/2027", freshness: "Akses, menu, panduan, dan format hasil mengikuti rilis aplikasi terbaru" }
  },
  {
    ...tmbLinks.topic,
    pageType: "topic",
    chapter: tmbChapter,
    parentId: tmbLinks.index.id,
    summary: "Memahami peran TMB dalam eksplorasi pilihan studi, batas interpretasi hasil, dan kaitannya dengan konsultasi.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["fungsi TMB", "arti hasil tes minat bakat", "rekomendasi jurusan dari TMB"],
    testQueries: ["Apa fungsi Tes Minat Bakat untuk siswa?", "Apakah hasil TMB menentukan jurusan?", "Hasil TMB dipakai untuk membahas apa?"],
    sections: [
      { heading: "Apa yang dipetakan", body: "TMB memetakan minat dan kemampuan yang berkaitan dengan pilihan studi. Tes Minat membantu melihat aktivitas, kemampuan yang dirasakan, dan bidang profesi yang disukai. Tes Bakat memberi gambaran kemampuan dari beberapa subtes sesuai versi panduan yang digunakan." },
      { heading: "Peran dalam konsultasi", body: "Hasil TMB menjadi bahan untuk membuka percakapan: apa yang menarik bagi siswa, bagian mana yang terasa sesuai, dan pilihan apa yang masih ingin dieksplorasi. SA menghubungkan hasil dengan cerita, nilai, kebiasaan belajar, dan pilihan siswa." },
      { heading: "Batas interpretasi", body: "Rekomendasi program studi dari TMB bersifat bahan pertimbangan dan tidak mutlak untuk diikuti. Hasilnya bukan diagnosis, bukan skor penerimaan, dan bukan keputusan final tentang jurusan. Jika format hasil atau batas interpretasinya belum jelas, jangan menambahkan makna di luar panduan yang tersedia." },
      { heading: "Hubungan dengan bab lain", body: "Pembahasan TMB dapat dimulai di Bab 3. Profiling dan Konsultasi Awal menjadi konteks percakapan; aturan jalur seleksi dan informasi kampus/prodi dirujuk ke bab yang membahasnya.", links: [handbookLinks.profiling, handbookLinks.consultation] }
    ],
    sources: tmbSources,
    metadata: { period: "AY 2026/2027", freshness: "Interpretasi hasil mengikuti panduan dan keputusan terbaru" }
  },
  {
    ...tmbLinks.access,
    pageType: "workflow",
    chapter: tmbChapter,
    parentId: tmbLinks.topic.id,
    summary: "Mengarahkan siswa membuka TMB, menyelesaikan Tes Minat dan Tes Bakat, serta menyiapkan kondisi pengerjaan.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara mengerjakan TMB", "link tes minat bakat", "akses tes penjurusan kuliah"],
    testQueries: ["Link Tes Minat Bakat siswa apa?", "Urutan mengerjakan Tes Minat dan Tes Bakat bagaimana?", "Sebelum mengerjakan TMB siswa perlu menyiapkan apa?"],
    sections: [
      { heading: "Tujuan", body: "Workflow ini membantu SA mengarahkan siswa ke akses yang benar dan memulai pengerjaan tanpa mencampur link siswa dengan sumber internal seperti pre-regist." },
      { heading: "Prasyarat", body: "Pastikan siswa memiliki akses yang sesuai, koneksi internet stabil, waktu yang cukup, dan dapat mengikuti petunjuk pada aplikasi.", bullets: ["Gunakan link Akses Tes Minat Bakat dari rilis terbaru.", "Pastikan siswa mengetahui tujuan pengerjaan dan tidak sedang terburu-buru.", "Siapkan panduan yang sesuai dengan jenjang atau program siswa."] },
      { heading: "Langkah kerja", steps: [{ before: "Buka ", linkText: "Akses Tes Minat Bakat", after: " dan pilih menu TMB Penjurusan Kuliah.", url: tmbSources[1].url }, "Ikuti petunjuk aplikasi untuk memulai Tes Minat.", "Selesaikan Tes Minat sesuai instruksi sebelum melanjutkan ke Tes Bakat yang tersedia.", "Jaga koneksi dan jangan berpindah dari aplikasi selama bagian yang sedang dikerjakan.", "Jika akses atau pengerjaan bermasalah, catat detail kejadian dan gunakan jalur bantuan yang berlaku."] },
      { heading: "Yang perlu dijaga", body: "Nama menu, urutan, jumlah soal, durasi, dan cakupan jenjang dapat berubah. Gunakan deck panduan akses TMB hanya sesuai status distribusi terbarunya.", links: [tmbLinks.links] }
    ],
    sources: tmbSources,
    metadata: { period: "AY 2026/2027", freshness: "URL, menu, urutan pengerjaan, dan durasi dapat berubah" }
  },
  {
    ...tmbLinks.read,
    pageType: "workflow",
    chapter: tmbChapter,
    parentId: tmbLinks.topic.id,
    summary: "Membaca hasil TMB sebagai bahan pertanyaan dan eksplorasi pilihan studi tanpa menjadikannya keputusan tunggal.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara membaca hasil TMB", "interpretasi tes minat bakat", "hasil TMB untuk konsultasi"],
    testQueries: ["Hasil TMB dibaca bagaimana oleh SA?", "Apakah hasil TMB berupa skor?", "Bagaimana menghubungkan hasil TMB dengan pilihan jurusan?"],
    sections: [
      { heading: "Tujuan", body: "Pembacaan hasil TMB membantu SA menyiapkan pertanyaan yang relevan dan menghubungkan hasil dengan cerita siswa. Hasil dibaca sebagai satu bahan percakapan bersama data lain, bukan sebagai jawaban otomatis." },
      { heading: "Langkah kerja", steps: ["Pastikan identitas siswa dan versi hasil yang dibaca sudah sesuai.", "Minta siswa menjelaskan bagian hasil yang paling terasa sesuai atau membingungkan.", "Pisahkan minat, kemampuan yang dipetakan, dan rekomendasi program studi.", "Bandingkan dengan pilihan siswa, pengalaman belajar, nilai, dan konteks yang sudah tersedia.", "Catat pilihan yang ingin dieksplorasi serta pertanyaan yang perlu ditindaklanjuti."] },
      { heading: "Batas interpretasi", body: "Jangan mengubah rekomendasi menjadi kewajiban memilih jurusan tertentu. Jangan menyebut hasil TMB sebagai passing grade, prediksi kelulusan, atau bukti bahwa siswa pasti cocok dengan suatu program studi." },
      { heading: "Jika hasil belum muncul", body: "Gunakan panduan dan status aplikasi terbaru. Jangan mengarang interpretasi dari tampilan yang belum lengkap; catat kendala dan arahkan melalui jalur bantuan bila diperlukan.", links: [tmbLinks.access, tmbLinks.links] }
    ],
    sources: tmbSources,
    metadata: { period: "AY 2026/2027", freshness: "Format PDF, tampilan hasil, dan panduan interpretasi mengikuti rilis terbaru" }
  },
  {
    ...tmbLinks.align,
    pageType: "workflow",
    chapter: tmbChapter,
    parentId: tmbLinks.topic.id,
    summary: "Memfasilitasi percakapan ketika pilihan siswa dan orang tua belum selaras setelah melihat hasil TMB.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["pilihan siswa dan orang tua berbeda", "diskusi jurusan dengan orang tua", "TMB pilihan jurusan siswa"],
    testQueries: ["Apa yang dilakukan jika pilihan siswa berbeda dari orang tua?", "Cara membahas hasil TMB dengan orang tua bagaimana?", "Apakah SA boleh memutuskan jurusan siswa?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan workflow ini ketika siswa dan orang tua membawa pilihan yang berbeda, atau ketika hasil TMB memunculkan pertanyaan baru tentang jurusan. Fokusnya menyamakan pemahaman, bukan memilihkan jurusan secara sepihak." },
      { heading: "Langkah kerja", steps: ["Minta siswa dan orang tua menjelaskan alasan di balik pilihan masing-masing.", "Gunakan hasil TMB sebagai bahan pertanyaan, bukan sebagai alat untuk memenangkan salah satu pihak.", "Bandingkan minat, kemampuan, pengalaman belajar, dan tujuan yang ingin dicapai.", "Catat pilihan yang masih terbuka, informasi yang perlu dicari, dan keputusan yang belum dibuat.", "Sepakati langkah eksplorasi berikutnya serta waktu untuk membahasnya kembali."] },
      { heading: "Peran SA", body: "SA membantu percakapan tetap terarah dan memastikan suara siswa tetap terdengar. SA tidak memaksakan hasil TMB sebagai keputusan final dan tidak menjanjikan penerimaan pada jurusan tertentu." },
      { heading: "Lihat juga", links: [tmbLinks.read, handbookLinks.run, handbookLinks.consultation] }
    ],
    sources: tmbSources,
    metadata: { period: "AY 2026/2027", freshness: "Peran dan batas konsultasi mengikuti rilis Tim Akademik terbaru" }
  },
  {
    ...tmbLinks.links,
    pageType: "ops_note",
    chapter: tmbChapter,
    parentId: tmbLinks.index.id,
    summary: "Rujukan untuk membedakan link akses siswa, sheet pre-registration internal, panduan, dan sumber sesi Tim Akademik.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["link TMB terbaru", "versi panduan TMB", "pre-regist TMB"],
    testQueries: ["Link TMB yang boleh dibagikan ke siswa apa?", "Pre-regist TMB untuk siapa?", "Panduan membaca hasil TMB sudah tersedia belum?"],
    sections: [
      { heading: "Pisahkan link siswa dan sumber internal", body: "Tab Tes Minat Bakat memuat link yang dapat dipakai siswa sekaligus sumber kerja SA. Gunakan link siswa hanya setelah URL dan cakupan jenjangnya dicek. Sheet pre-registration dan catatan panduan tetap untuk kebutuhan internal." },
      { heading: "Link yang dapat dibagikan setelah dicek", bullets: [{ before: "", linkText: "Akses Tes Minat Bakat", url: tmbSources[1].url }, "Linktree jenjang yang tercantum pada workbook, jika masih aktif."] },
      { heading: "Rujukan internal SA", bullets: [{ before: "", linkText: "Pre-registration TMB AY 2026/2027", url: tmbSources[3].url }, "Deck panduan atau catatan sesi yang status distribusinya belum jelas."] },
      { heading: "Jika ada rilis baru", steps: ["Cek URL aplikasi, nama menu, dan status pre-registration.", "Pastikan panduan membaca hasil sudah tersedia dan sesuai versi aplikasi.", "Cek cakupan jenjang dan Linktree yang aktif.", "Catat tanggal rilis dan sumber pengganti sebelum memperbarui handbook."] }
    ],
    sources: [tmbSources[0], tmbSources[1], tmbSources[2], tmbSources[3]],
    metadata: { period: "AY 2026/2027", freshness: "Link, versi aplikasi, status panduan, dan cakupan jenjang perlu dicek pada rilis terbaru" }
  },
  {
    ...activityLinks.index,
    pageType: "index",
    chapter: activityChapter,
    title: "Aktivitas Belajar dan Pendampingan",
    summary: "Pintu masuk untuk mengarahkan KBM, Klinik PR, Klinik Bertopik, Motivatalks, Kakak Asuh, dan tindak lanjut belajar siswa.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["bab aktivitas belajar", "pendampingan belajar siswa", "KBM dan Klinik PR", "Klinik Bertopik", "Motivatalks", "Kakak Asuh"],
    testQueries: ["Link jadwal KBM siswa ada di mana?", "Bagaimana siswa request Klinik PR?", "Apa yang dilakukan SA setelah Motivatalks?", "Apa peran Kakak Asuh?"],
    intro: "Bab ini membantu SA menghubungkan aktivitas belajar dengan pendampingan yang sedang dibutuhkan siswa. Jadwal, paket, akses, dan aturan event dapat berubah; gunakan link dan rilis terbaru sebelum memberi arahan.",
    sections: [
      { heading: "Pilih kebutuhanmu", links: [activityLinks.topic, activityLinks.kbm, activityLinks.events, activityLinks.followup, activityLinks.links] },
      { heading: "Alur singkat", steps: ["Kenali kebutuhan siswa dan program atau paket yang diikuti.", "Buka sumber kerja yang sesuai, lalu cek jadwal, sasaran, akses, dan status kegiatan.", "Berikan arahan yang bisa langsung diikuti siswa atau orang tua.", "Catat kehadiran, respons, kesepakatan, atau tindak lanjut pada alat kerja yang ditetapkan.", "Jika sumber atau akses belum jelas, tahan jawaban dan gunakan jalur konfirmasi internal."] }
    ],
    sources: activitySources,
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01T20:00:00+07:00", freshness: "Jadwal, paket, akses, link, dan aturan pendampingan mengikuti rilis terbaru" }
  },
  {
    ...activityLinks.topic,
    pageType: "topic",
    chapter: activityChapter,
    parentId: activityLinks.index.id,
    summary: "Memahami hubungan antara aktivitas belajar, program siswa, dan tindak lanjut pendampingan.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["memahami aktivitas belajar", "pendampingan siswa BAC", "KBM Klinik PR Motivatalks Kakak Asuh"],
    testQueries: ["Apa saja aktivitas belajar yang perlu dipantau SA?", "Apakah semua siswa mendapat akses Klinik Bertopik?", "Motivatalks dan Kakak Asuh bedanya apa?"],
    sections: [
      { heading: "KBM dan izin tidak hadir", body: "KBM adalah aktivitas belajar terjadwal di cabang. SA memakai template reminder dan panduan izin untuk membantu siswa atau orang tua memahami jadwal serta mengajukan ketidakhadiran melalui jalur yang berlaku. Detail kelas, lokasi, dan periode harus mengikuti pengumuman cabang terbaru." },
      { heading: "Klinik PR, Klinik Bertopik, dan bahan ajar", body: "Klinik PR dipakai ketika siswa membutuhkan bantuan mengerjakan PR atau tugas; pada alur yang dirujuk, siswa membuka menu Klinik PR lalu mengisi request form jika jadwal belum tersedia. Klinik Bertopik adalah sesi tambahan dengan sasaran program tertentu. Akses keduanya dapat berbeda menurut program atau paket, jadi status jadwal, link, dan sasaran harus dicek pada rilis aktif." },
      { heading: "Motivatalks", body: "Motivatalks adalah event yang membutuhkan persiapan sebelum acara dan dokumentasi setelah acara. Tracker dipakai untuk mencatat pre-event dan post-event, sedangkan RSVP membantu memantau respons siswa atau orang tua. Nama episode dan status event harus dicocokkan dengan briefing terbaru." },
      { heading: "Kakak Asuh dan pendampingan", body: "Kakak Asuh mendampingi komunikasi, konsultasi perkembangan belajar, pembacaan hasil, dan penyusunan rencana. Deck Agustus 2026 menjelaskan titik pendampingan berupa Konsultasi Awal setelah Profiling, Checkpoint 1, dan Checkpoint Akhir. Target dan aturan pada deck tersebut adalah snapshot sumber, bukan jaminan kelulusan." },
      { heading: "Batas informasi", body: "Jangan menyamakan jadwal, benefit, atau kewajiban seluruh siswa. Pastikan program, paket, jenjang, cabang, dan periode siswa sebelum menjelaskan akses atau tindak lanjut.", links: [activityLinks.kbm, activityLinks.events, activityLinks.followup] }
    ],
    sources: activitySources,
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01T20:00:00+07:00", freshness: "Akses program, jadwal event, benefit paket, dan prosedur pendampingan dapat berubah" }
  },
  {
    ...activityLinks.kbm,
    pageType: "workflow",
    chapter: activityChapter,
    parentId: activityLinks.topic.id,
    summary: "Mengarahkan siswa ke KBM, izin tidak hadir, Klinik PR, Klinik Bertopik, atau bahan ajar yang sesuai tanpa menebak aksesnya.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara mengarahkan KBM", "izin tidak hadir siswa", "request Klinik PR", "Klinik Bertopik", "link bahan ajar siswa"],
    testQueries: ["Siswa tidak bisa hadir KBM harus bagaimana?", "Bagaimana request Klinik PR?", "Link panduan izin tidak hadir sesi apa?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan workflow ini ketika siswa atau orang tua menanyakan jadwal belajar, izin tidak hadir, Klinik PR, Klinik Bertopik, atau bahan ajar. Mulai dari program dan paket siswa karena akses serta alurnya dapat berbeda." },
      { heading: "Prasyarat", bullets: ["Ketahui jenjang, cabang, program, dan periode siswa.", "Buka rilis jadwal atau sumber kerja yang paling baru.", "Pisahkan link yang boleh dibagikan kepada siswa dari tracker atau sheet internal."] },
      { heading: "Langkah kerja", steps: [
        { before: "Untuk jadwal atau template KBM, buka ", linkText: "Workbook Kumpulan Link Kesiswaan — tab KBM", after: " dan cocokkan periode serta cabangnya.", url: activitySources[0].url },
        { before: "Jika siswa tidak hadir, arahkan ke ", linkText: "Panduan Akses — Izin Tidak Hadir Sesi", after: " dan ikuti kanal yang tertulis pada panduan.", url: activitySources[1].url },
        "Untuk Klinik PR, pastikan siswa membuka menu Klinik PR dan mengisi request form bila jadwal belum tersedia. SA mengingatkan jadwal dan memantau tindak lanjut; pencarian teacher atau jadwal ditangani oleh admin sesuai alur yang berlaku.",
        "Untuk Klinik Bertopik atau bahan ajar, pastikan siswa termasuk program yang mendapat akses dan gunakan link dari rilis terbaru.",
        "Catat kebutuhan, status request, dan langkah berikutnya di tempat pencatatan internal yang ditetapkan."
      ] },
      { heading: "Jika akses belum tersedia", body: "Jangan menjanjikan jadwal atau benefit sebelum ada konfirmasi. Simpan nama program, cabang, periode, pesan yang terlihat, dan bukti minimum untuk diteruskan melalui jalur internal.", links: [activityLinks.links] }
    ],
    sources: [activitySources[0], activitySources[1], activitySources[6], activitySources[7]],
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01T20:00:00+07:00", freshness: "Jadwal KBM, menu Klinik PR, akses Klinik Bertopik atau bahan ajar, dan jalur izin mengikuti rilis terbaru" }
  },
  {
    ...activityLinks.events,
    pageType: "workflow",
    chapter: activityChapter,
    parentId: activityLinks.topic.id,
    summary: "Menyiapkan arahan untuk Motivatalks dan memahami peran Kakak Asuh dalam pendampingan siswa.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["operasional Motivatalks", "RSVP Motivatalks", "pendampingan Kakak Asuh", "konsultasi awal kelas 12"],
    testQueries: ["Apa yang perlu dilakukan sebelum Motivatalks?", "Di mana tracker Motivatalks?", "Apa output Konsultasi Awal Kakak Asuh?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan saat ada event Motivatalks atau ketika siswa kelas 12 menjalani rangkaian pendampingan Kakak Asuh. Tujuannya membedakan persiapan event, pencatatan kehadiran, dan kesepakatan pendampingan." },
      { heading: "Motivatalks", steps: [
        { before: "Pelajari briefing atau petunjuk episode melalui ", linkText: "recording briefing Motivatalks", after: " sebelum membagikan arahan.", url: activitySources[3].url },
        { before: "Bagikan ", linkText: "RSVP Motivatalks", after: " kepada sasaran event sesuai instruksi rilis.", url: activitySources[4].url },
        { before: "Pantau respons dan isi ", linkText: "Tracker Pelaksanaan Motivatalks 26/27", after: " pada bagian pre-event dan post-event yang ditetapkan.", url: activitySources[2].url },
        "Setelah event, catat jumlah siswa hadir dan dokumentasi dari event yang benar-benar diikuti."
      ] },
      { heading: "Kakak Asuh", steps: [
        { before: "Mulai dari ", linkText: "recording Panduan Kakak Asuh dan Konsultasi Awal 12 SMA", after: " untuk memahami urutan pendampingan.", url: activitySources[5].url },
        "Pastikan Profiling siswa sudah menjadi bahan sebelum Konsultasi Awal.",
        "Catat kesepakatan pilihan studi, target belajar, rencana tindak lanjut, dan waktu checkpoint pada tempat pencatatan yang ditetapkan.",
        "Gunakan Checkpoint 1 dan Checkpoint Akhir untuk meninjau progres; jangan mengubah target atau tingkat keketatan menjadi jaminan kelulusan."
      ] },
      { heading: "Batas informasi", body: "Episode, sasaran, deadline, target, dan link event dapat berubah. Gunakan sumber terbaru dan jangan meneruskan materi internal yang tidak ditujukan untuk siswa atau orang tua." }
    ],
    sources: [activitySources[2], activitySources[3], activitySources[4], activitySources[5]],
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01T20:00:00+07:00", freshness: "Episode, RSVP, tracker, jadwal checkpoint, dan target program mengikuti rilis terbaru" }
  },
  {
    ...activityLinks.followup,
    pageType: "workflow",
    chapter: activityChapter,
    parentId: activityLinks.topic.id,
    summary: "Mengubah hasil aktivitas belajar menjadi satu tindak lanjut yang dapat dipantau bersama siswa.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["monitoring belajar siswa", "tindak lanjut setelah tryout", "rencana belajar Kakak Asuh", "follow up siswa"],
    testQueries: ["Setelah aktivitas belajar, apa yang dicatat SA?", "Bagaimana memantau rencana belajar siswa?", "Apa tindak lanjut setelah konsultasi awal?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan setelah KBM, Klinik PR, Klinik Bertopik, Motivatalks, konsultasi, tryout, atau aktivitas lain ketika siswa membutuhkan langkah berikutnya. Fokusnya bukan mengumpulkan semua data, tetapi menyepakati tindakan yang jelas dan waktu pengecekan ulang." },
      { heading: "Langkah kerja", steps: [
        "Ringkas aktivitas yang sudah dilakukan, termasuk kehadiran, request, hasil, atau kesepakatan yang relevan.",
        "Tanyakan hambatan siswa dan pilih satu sampai tiga tindakan yang dapat dilakukan sebelum pengecekan berikutnya.",
        "Cocokkan tindakan dengan program atau paket siswa; jangan menambahkan benefit atau kewajiban yang tidak ada pada rilis.",
        "Catat pemilik tindakan, periode pengecekan, dan bukti yang perlu dilihat pada alat kerja internal.",
        "Saat mengecek ulang, bedakan siswa yang belum melakukan tindakan dari data yang belum diperbarui."
      ] },
      { heading: "Contoh hasil yang dicatat", bullets: ["Siswa sudah menerima arahan dan mengetahui jadwal atau link yang benar.", "Request Klinik PR sudah dikirim dan menunggu penjadwalan.", "RSVP atau kehadiran Motivatalks sudah tercatat.", "Kesepakatan Konsultasi Awal dan checkpoint berikutnya sudah disimpan.", "Satu materi, kebiasaan, atau aktivitas latihan dipilih untuk ditindaklanjuti."] },
      { heading: "Batas data", body: "Simpan catatan pada kanal internal yang ditetapkan. Jangan menyalin data pribadi, isi dashboard, atau daftar siswa ke knowledge base atau kanal publik.", links: [activityLinks.links] }
    ],
    sources: [activitySources[2], activitySources[5], activitySources[6], activitySources[8]],
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01T20:00:00+07:00", freshness: "Format pencatatan, program, dan jalur tindak lanjut mengikuti aturan operasional terbaru" }
  },
  {
    ...activityLinks.links,
    pageType: "ops_note",
    chapter: activityChapter,
    parentId: activityLinks.index.id,
    summary: "Peta link kerja untuk KBM, izin tidak hadir, Klinik PR, Klinik Bertopik, Motivatalks, Kakak Asuh, dan bahan ajar.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["link KBM", "link Motivatalks", "link Kakak Asuh", "link Klinik PR", "link bahan ajar"],
    testQueries: ["Link KBM dan izin tidak hadir ada di mana?", "Tracker Motivatalks dibuka di mana?", "Recording Kakak Asuh ada di mana?", "Sumber Klinik PR yang mana?"],
    sections: [
      { heading: "Cek KBM dan izin", bullets: [
        { before: "Untuk template dan wording KBM, buka ", linkText: "Workbook Kumpulan Link Kesiswaan — tab KBM", after: ".", url: activitySources[0].url },
        { before: "Untuk arahan ketidakhadiran, buka ", linkText: "Panduan Akses — Izin Tidak Hadir Sesi", after: ".", url: activitySources[1].url }
      ] },
      { heading: "Cek Motivatalks", bullets: [
        { before: "Untuk pencatatan event, gunakan ", linkText: "Tracker Pelaksanaan Motivatalks 26/27", after: ".", url: activitySources[2].url },
        { before: "Untuk briefing, buka ", linkText: "recording briefing Motivatalks", after: ".", url: activitySources[3].url },
        { before: "Untuk respons peserta, gunakan ", linkText: "RSVP Motivatalks", after: ".", url: activitySources[4].url }
      ] },
      { heading: "Cek Kakak Asuh, Klinik PR, dan bahan ajar", bullets: [
        { before: "Untuk alur pendampingan, buka ", linkText: "recording Panduan Kakak Asuh dan Konsultasi Awal 12 SMA", after: ".", url: activitySources[5].url },
        { before: "Untuk konteks Klinik PR, buka ", linkText: "recording Klinik PR, Kuis/Post-test, dan Tryout", after: ".", url: activitySources[6].url },
        { before: "Untuk konteks Klinik Bertopik dan paket, buka ", linkText: "Sosialisasi Klinik Bertopik, Bahan Ajar, dan Paket Siswa", after: ".", url: activitySources[7].url }
      ] },
      { heading: "Cara memilih link", steps: ["Cocokkan program, paket, jenjang, cabang, dan periode siswa.", "Gunakan link yang memang ditujukan untuk siswa atau orang tua hanya setelah sasaran dan statusnya dicek.", "Gunakan tracker, recording, dan sumber internal untuk kebutuhan kerja SA; jangan membagikan akses internal.", "Cek rilis terbaru jika nama event, link, jadwal, atau instruksi berubah."] },
      { heading: "Batas akses", body: "Link pada halaman ini adalah rujukan internal. Akses tracker, recording, sheet, dan materi dapat memerlukan akun atau izin tertentu. Jangan membagikan sumber internal kepada siswa atau orang tua tanpa arahan rilis." }
    ],
    sources: activitySources,
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01T20:00:00+07:00", freshness: "Link, status event, jadwal, akses, dan sasaran penggunaan harus diverifikasi sebelum dipakai" }
  },
  {
    ...tryoutLinks.index,
    pageType: "index",
    chapter: tryoutChapter,
    title: "Tryout, Tes Diagnostik, Kuis, Post-test, Drill, dan Rapor",
    summary: "Panduan untuk menemukan kegiatan evaluasi belajar yang sesuai, memahami akses dan hasilnya, lalu menentukan tindak lanjut.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["pusat tryout SA", "panduan tryout siswa", "TO TKA", "TO UTBK", "evaluasi hasil tryout"],
    testQueries: ["Siswa kelas 12 ikut tryout apa?", "Siswa kelas 12 yang mengikuti SNBT harus mengikuti tryout apa?", "Siswa kelas 12 fokus TKA ikut tryout apa?", "Apa bedanya tryout SNBT dan tryout TKA?", "Tryout SNBT mana yang wajib?", "Tryout TKA Premium wajib atau tidak?", "Di mana melihat hasil tryout siswa?"],
    intro: "Bab ini membantu SA memakai hasil evaluasi belajar untuk memahami perkembangan siswa. Rujukan utama yang sudah tersedia adalah Tryout dan Tes Diagnostik; Kuis, Post-test, Drill, dan Rapor tetap diarahkan melalui sumber kerja yang tercantum. Untuk kewajiban, kuota, jadwal, cicilan, dan pilihan mata pelajaran, selalu ikuti rilis kegiatan yang sedang berlaku.",
    sections: [
      { heading: "Pilih kebutuhanmu", links: [tryoutLinks.topic, tryoutLinks.direct, tryoutLinks.quiz, tryoutLinks.diagnostic, tryoutLinks.drill, tryoutLinks.read, tryoutLinks.links, tryoutLinks.schedule, onboardingLinks.diagnostic] },
      { heading: "Alur singkat", steps: ["Tentukan tujuan siswa: TKA, UTBK/SNBT, STS, Tes Diagnostik, atau evaluasi belajar lain.", "Cari kegiatan dan rilis yang sesuai melalui daftar sumber atau Calendar Event terbaru.", "Periksa sasaran peserta, periode, akses, mata pelajaran, dan kuota sebelum membagikan tautan.", "Pastikan siswa mengerjakan kegiatan sesuai aturan episodenya.", "Baca hasilnya bersama data lain, lalu sepakati satu tindak lanjut yang bisa dilakukan.", "Catat keikutsertaan siswa, hasil, dan rilis yang menjadi acuan."] }
    ],
    sources: [...tryoutSources, ...diagnosticSources],
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01", freshness: "Kegiatan, tautan, jadwal, akses, kuota, dan aturan pengerjaan mengikuti rilis terbaru" }
  },
  {
    ...tryoutLinks.topic,
    pageType: "topic",
    chapter: tryoutChapter,
    parentId: tryoutLinks.index.id,
    summary: "Memahami fungsi tryout, pertanyaan akses dan pengerjaan yang paling sering muncul, serta cara membaca hasilnya dengan tepat.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["fungsi tryout", "aturan TO TKA", "aturan TO UTBK", "tryout premium", "mega tryout TKA"],
    testQueries: ["Apa fungsi tryout bagi pendampingan siswa?", "Bagaimana membaca hasil tryout?", "Apa yang perlu diperhatikan sebelum menjelaskan tryout kepada siswa?", "Berapa jumlah subtes UTBK di tryout?", "Apakah subtes TKA SMA bisa dikerjakan di sesi berbeda?", "Kapan Report Card tryout tersedia?"],
    sections: [
      { heading: "Tryout sebagai latihan", body: "Tryout memberi gambaran kesiapan siswa pada kegiatan dan periode tertentu. Gunakan hasilnya untuk melihat pola pengerjaan, bagian yang perlu diperkuat, dan bahan percakapan berikutnya. Nilai tryout bukan ambang kelulusan, bukan keputusan jurusan, dan bukan jaminan kelulusan." },
      { heading: "Struktur tryout yang perlu diketahui", body: "Struktur pengerjaan bergantung pada jalurnya. Tryout UTBK-SNBT untuk SMA menggunakan IRT dan terdiri dari tujuh subtes tanpa jeda. Tryout TKA menggunakan IRT juga: SD memiliki tiga subtes dengan jeda, SMP empat subtes dengan jeda, sedangkan SMA memiliki tiga mapel wajib dan sebelas mapel pilihan. Pada TKA SMA, tiap subtes dapat dikerjakan dalam sesi terpisah, jadi siswa tidak otomatis harus menyelesaikan semua mapel dalam satu waktu.", bullets: ["UTBK-SNBT: Penalaran Umum 30 soal/30 menit; Pengetahuan dan Pemahaman Umum 20/15 menit; Pemahaman Bacaan dan Menulis 20/25 menit; Pengetahuan Kuantitatif 20/20 menit; Literasi Bahasa Indonesia 30/43 menit; Literasi Bahasa Inggris 20/20 menit; Penalaran Matematika 20/43 menit.", "TKA SMA: tiga mapel wajib adalah Matematika, Bahasa Indonesia, dan Bahasa Inggris. Mapel pilihan mengikuti daftar kegiatan yang sedang dibuka." ] },
      { heading: "Pertanyaan yang sering muncul", body: "Siswa biasanya menanyakan siapa yang boleh mengakses, apakah tryout wajib, bagaimana jika cicilan terkendala, dan apakah semua mata pelajaran harus dikerjakan pada hari yang sama. Sebutkan nama kegiatan atau episode terlebih dahulu, karena jawabannya dapat berbeda pada setiap rilis. Untuk aturan yang berubah menurut periode, lihat Jadwal dan Akses Tryout.", links: [tryoutLinks.schedule, tryoutLinks.megaFaq] },
      { heading: "Report Card", body: "Untuk Report Card Tryout Premium, siswa perlu mengerjakan pada episode yang sama. Report Card tersedia H+2 setelah event berakhir. Siswa susulan yang mengerjakan di episode berbeda tidak mendapat Report Card Premium secara otomatis dan perlu mengikuti mekanisme request pada form yang berlaku. Jika pertanyaannya menyangkut syarat Report Card Personal atau Grup, cek rilis terbaru karena rincian syarat dapat berubah." },
      { heading: "Membaca hasil", body: "Mulai dari identitas siswa, nama kegiatan atau episode, waktu pengerjaan, dan bagian hasil yang tersedia. Lihat rincian per mata pelajaran atau subtes bila ada, lalu hubungkan dengan target, proses belajar, dan kesulitan yang diceritakan siswa. Pilih tindak lanjut yang jelas, misalnya membahas materi yang banyak salah atau mengatur latihan berikutnya." },
      { heading: "Batas informasi", body: "Jika pertanyaannya menyangkut Premium, cicilan, kewajiban, kuota, batas waktu, perangkat, atau urutan mata pelajaran pada episode tertentu, jangan memakai jawaban dari kegiatan lain. Baca rilis terbaru atau gunakan jalur eskalasi yang berlaku.", links: [tryoutLinks.links] }
    ],
    sources: tryoutSources,
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01", freshness: "Aturan kegiatan, akses, struktur, dan bentuk laporan dapat berubah pada setiap episode" }
  },
  {
    ...tryoutLinks.direct,
    pageType: "workflow",
    chapter: tryoutChapter,
    parentId: tryoutLinks.topic.id,
    summary: "Mengarahkan siswa ke tryout sesuai jalur SNBT/UTBK atau TKA, lalu memeriksa periode, sasaran peserta, akses, dan mata pelajaran yang tersedia.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara mengarahkan tryout", "tautan TO siswa", "siswa kelas 12 dan SNBT ikut TO apa", "siswa SNBT ikut tryout apa", "siswa kelas 12 fokus TKA ikut tryout apa", "beda tryout SNBT dan TKA", "tryout SNBT wajib", "akses tryout TKA"],
    testQueries: ["Siswa kelas 12 dan SNBT ikut tryout apa?", "Siswa kelas 12 yang mengikuti SNBT harus mengikuti tryout apa?", "Siswa SNBT ikut tryout apa?", "Siswa kelas 12 fokus TKA ikut tryout apa?", "Apa bedanya tryout SNBT dan tryout TKA?", "Tryout SNBT mana yang wajib?", "Tautan tryout TKA yang dibagikan ke siswa apa?", "Siswa terkendala cicilan mau ikut tryout bagaimana?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan saat siswa menanyakan tryout yang perlu diikuti, meminta tautan pengerjaan, atau belum yakin kegiatan mana yang sesuai dengan jenjang dan jalurnya. Tujuannya agar siswa tidak masuk ke tryout yang keliru dan SA tidak salah menjelaskan aturan akses." },
      { heading: "Prasyarat", bullets: ["Ketahui jenjang dan jalur siswa, misalnya kelas 12 SMA, SNBT, atau jenjang lain.", "Tentukan tujuan tryout: TKA, UTBK/SNBT, STS, atau evaluasi lain.", "Buka Calendar Event atau daftar tautan dari rilis terbaru.", "Siapkan nama episode, periode, sasaran peserta, mata pelajaran, dan keterangan akses yang tertulis pada rilis."] },
      { heading: "Pilihan tryout berdasarkan jalur siswa", body: "Untuk siswa kelas 12 yang mengikuti SNBT, arahkan ke Tryout SNBT/UTBK. Pilih episode yang sedang tersedia berdasarkan Calendar Event dan rilis terbaru. Tryout TKA dibahas terpisah untuk siswa yang sedang mempersiapkan TKA.", bullets: ["Fokus SNBT/UTBK: gunakan tryout UTBK/SNBT yang sedang tersedia.", "Fokus TKA: gunakan tryout TKA yang sedang tersedia.", "Kelas 12 secara umum: tampilkan pilihan SNBT/UTBK dan TKA dalam bagian terpisah, lalu tanyakan jalur yang sedang diprioritaskan siswa."], links: [tryoutLinks.schedule] },
      { heading: "Contoh snapshot periode, bukan daftar aktif universal", body: "Master jadwal AY 2026/2027 memuat episode UTBK/SNBT dan TKA pada periode yang berbeda. Contoh yang pernah tercatat adalah TO SNBT/UTBK Regular Episode 1 dan 2, serta Mega TO TKA Regular Episode 1 dan TO TKA Premium Episode 3. Nama episode dan tanggal tersebut hanya snapshot sumber; jangan memakainya sebagai daftar aktif tanpa mengecek Calendar Event atau rilis terbaru.", bullets: ["Snapshot SNBT/UTBK: TO SNBT/UTBK Regular Episode 1 dan Episode 2.", "Snapshot TKA: Mega TO TKA Regular Episode 1 dan TO TKA Premium Episode 3."], links: [tryoutLinks.schedule] },
      { heading: "Status wajib harus dibaca per event", body: "Jangan mengubah jalur yang relevan menjadi klaim wajib. Status wajib hanya disampaikan jika rilis event menyebutkannya. Snapshot workbook memuat wording [TO WAJIB] untuk UTBK Regular Episode 1, sedangkan FAQ Mega Tryout TKA menyatakan wajib untuk event Mega Tryout TKA SMA 2026 yang dirujuk pada QnA tersebut. Kedua catatan ini tidak menjadi aturan universal untuk semua episode SNBT atau TKA.", links: [tryoutLinks.schedule, tryoutLinks.megaFaq] },
      { heading: "Langkah kerja", steps: ["Cari kegiatan berdasarkan jenjang dan tujuan siswa. Jangan memilih hanya karena melihat label Premium atau Regular.", "Baca rilis kegiatan untuk memastikan siapa yang boleh mengakses, apakah perlu konfirmasi atau verifikasi, dan kapan periode pengerjaannya.", "Periksa tautan mata pelajaran atau paket yang tersedia. Jika kegiatan memisahkan mata pelajaran wajib dan pilihan, pastikan siswa menerima tautan yang benar.", "Bagikan tautan pengerjaan dengan nama aset dan periode yang jelas. Jangan membagikan lembar keikutsertaan atau Data Nilai Tryout TKA/UTBK kepada siswa.", "Catat nama kegiatan, episode, dan status keikutsertaan pada alat kerja yang ditetapkan."] },
      { heading: "Kondisi khusus", bullets: ["Jika siswa terkendala cicilan, ikuti solusi yang tertulis pada rilis kegiatan tersebut. Jangan menjanjikan akses berdasarkan aturan kegiatan lain.", "Jika kegiatan tidak muncul, kuota bernilai nol, atau tautan tidak bisa dibuka, simpan bukti yang diperlukan dan gunakan jalur pelaporan terbaru.", "Jika siswa bertanya apakah tryout wajib, jawab sesuai nama kegiatan dan periodenya, bukan berdasarkan label Premium atau Regular saja."] }
    ],
    sources: tryoutSources,
    metadata: { period: "AY 2026/2027", updatedAt: "2026-10-31", freshness: "Tautan, periode, sasaran peserta, kuota, dan jalur akses harus dicek pada rilis kegiatan terbaru" }
  },
  {
    ...tryoutLinks.quiz,
    pageType: "workflow",
    chapter: tryoutChapter,
    parentId: tryoutLinks.topic.id,
    summary: "Membaca status Kuis dan Post-test, membedakan data belum masuk dari siswa yang belum mengerjakan, lalu menentukan pengingat.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara membaca kuis", "cara membaca post-test", "status quiz siswa", "quiz masuk rapor", "post-test belum dikerjakan"],
    testQueries: ["Kuis bisa dikerjakan di luar sesi atau tidak?", "Bagaimana membaca total quiz di report?", "Apakah post-test masuk rapor?", "Data kuis siswa belum muncul harus bagaimana?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan workflow ini ketika perlu mengecek pengerjaan Kuis atau Post-test, mengingatkan siswa yang belum menyelesaikan, atau menjelaskan mengapa nilai belum terlihat. Mulai dari nama sesi, cabang, periode, dan sumber yang sedang berlaku." },
      { heading: "Sumber yang digunakan", bullets: [
        { before: "Untuk membaca data pengerjaan, buka ", linkText: "Data Pengerjaan Kuis dan Post-test", after: ".", url: quizSources[2].url },
        { before: "Untuk memahami aturan dan konteks monitoring, buka ", linkText: "Monitoring Kuis, Post-test, Rapor, dan Attendance", after: ".", url: quizSources[0].url }
      ] },
      { heading: "Langkah kerja", steps: [
        "Pastikan siswa, sesi, cabang, dan periode yang dibaca sudah sesuai.",
        "Baca status atau nilai dari sumber yang dituju. Data dasar dapat difilter berdasarkan email, sesi, dan siswa.",
        "Bedakan siswa yang memang belum mengerjakan dari nilai yang belum terlihat atau sumber yang belum diperbarui.",
        "Jika siswa belum sempat mengerjakan di kelas, arahkan melalui riwayat sesi. Post-test muncul pada materi terakhir; bila materi belum selesai, koordinasikan dengan sesi berikutnya.",
        "Catat pengingat atau tindak lanjut pada alat kerja yang ditetapkan."
      ] },
      { heading: "Hubungan dengan rapor", body: "Kuis dan Post-test dipakai sebagai evaluasi dan dapat menjadi bagian dari rapor sesuai program yang berlaku. Jangan menjadikan satu angka sebagai kesimpulan perkembangan siswa tanpa melihat sesi, periode, dan sumber pendukung." },
      { heading: "Batas informasi", body: "Status implementasi report, frekuensi pembaruan, dan kanal attendance dapat berubah. Jika data belum muncul, cek rilis terbaru sebelum menyimpulkan siswa belum mengerjakan.", links: [tryoutLinks.links] }
    ],
    sources: quizSources,
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01T21:00:00+07:00", freshness: "Nama sumber, status pengerjaan, format report, dan kanal monitoring mengikuti rilis terbaru" }
  },
  {
    ...tryoutLinks.diagnostic,
    pageType: "workflow",
    chapter: tryoutChapter,
    parentId: tryoutLinks.topic.id,
    summary: "Mengarahkan siswa ke Tes Diagnostik Matematika Dasar dan memilih sumber untuk event, status, nilai, tindak lanjut, atau rapor.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara akses DT Matdas", "routing Tes Diagnostik Matematika Dasar", "status DT Matdas", "rapor DT per cabang", "PEMADAM DT"],
    testQueries: ["Di mana link event Tes Diagnostik Matematika Dasar?", "Di mana melihat status pengerjaan DT Matdas?", "Di mana melihat nilai atau partisipasi DT Matdas?", "Di mana rapor DT Matdas cabang saya?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan workflow ini ketika siswa menanyakan link event Tes Diagnostik Matematika Dasar, atau ketika SA perlu membedakan tempat untuk mengecek akses, partisipasi, status pengerjaan, nilai, tindak lanjut, dan rapor." },
      { heading: "Peta sumber", bullets: [
        { before: "Untuk link event siswa, mulai dari ", linkText: "Pre-Regist DT Matematika Dasar 26/27", after: ".", url: diagnosticSources[1].url },
        { before: "Untuk partisipasi dan nilai, gunakan ", linkText: "Data Studio Partisipasi dan Nilai Tes Diagnostik Matematika Dasar", after: ".", url: diagnosticSources[2].url },
        { before: "Untuk status pengerjaan dan tindak lanjut, buka ", linkText: "Tracker Tes Diagnostik Matematika Dasar", after: ".", url: diagnosticSources[3].url },
        { before: "Untuk rapor, gunakan indeks link regional dan cabang pada ", linkText: "Workbook Kumpulan Link Kesiswaan — tab Tes Diagnostik", after: ".", url: diagnosticSources[0].url }
      ] },
      { heading: "Langkah kerja", steps: [
        "Pastikan jenjang, cabang, periode, dan nama kegiatan siswa sudah jelas.",
        "Bagikan link event dari Pre-Regist hanya setelah sasaran dan status rilisnya dicek.",
        "Gunakan Data Studio untuk membaca partisipasi atau nilai, dan gunakan Tracker untuk status pengerjaan serta tindak lanjut.",
        "Jika perlu rapor, pilih regional dan cabang yang sesuai pada indeks workbook.",
        "Jika link tidak terbuka atau rapor belum tersedia, simpan bukti minimum dan teruskan melalui jalur internal."
      ] },
      { heading: "Batas data", body: "Artikel ini hanya menjelaskan routing sumber. Nilai, status siswa, isi tracker, rekomendasi PEMADAM, Klinik PR, dan ketersediaan rapor harus dibaca langsung dari sumber live dengan izin yang sesuai." }
    ],
    sources: diagnosticSources,
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01T21:00:00+07:00", freshness: "Link event, fungsi sumber, akses dashboard, tracker, dan rapor mengikuti rilis terbaru" }
  },
  {
    ...tryoutLinks.drill,
    pageType: "workflow",
    chapter: tryoutChapter,
    parentId: tryoutLinks.topic.id,
    summary: "Mengarahkan siswa dari hasil tryout ke drill dan pembahasan pada subtes yang perlu diperbaiki.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara mengarahkan drill", "pembahasan tryout", "subtes nilai rendah", "HMS drill", "dashboard monitoring UTBK Champions"],
    testQueries: ["Di mana SA mengecek pembahasan TO?", "Bagaimana memilih subtes yang perlu dibahas siswa?", "Kapan pembahasan drill dikonfirmasi di HMS?", "Di mana monitoring UTBK Champions tersedia?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan setelah hasil tryout tersedia dan siswa membutuhkan latihan atau pembahasan lanjutan. Fokusnya memilih bagian yang paling perlu diperbaiki berdasarkan hasil kegiatan, bukan memberi semua latihan sekaligus." },
      { heading: "Langkah kerja", steps: [
        "Pastikan nama kegiatan, episode, siswa, dan periode hasil yang dibaca sudah sesuai.",
        "Buka riwayat tryout siswa dan lihat subtes atau bagian dengan nilai yang paling perlu diperbaiki.",
        "Arahkan siswa ke menu pembahasan pada aplikasi, lalu minta siswa membuat catatan dengan bahasanya sendiri sesuai instruksi yang sedang berlaku.",
        { before: "Untuk konteks pembahasan dan aturan yang masih perlu dicek, buka ", linkText: "Tryout Wajib dan Pembahasan TO", after: ".", url: drillSources[0].url },
        { before: "Untuk konfirmasi HMS atau dashboard monitoring, buka ", linkText: "Drill, HMS, Dashboard Monitoring, dan Request Anulir", after: " dan cek rilis terbaru.", url: drillSources[1].url },
        "Catat materi atau subtes yang dipilih, tindakan siswa, dan waktu pengecekan ulang pada alat kerja internal."
      ] },
      { heading: "Jika pembahasan atau dashboard belum terlihat", body: "Jangan langsung menyimpulkan bahwa siswa tidak punya akses atau fiturnya belum tersedia. Cek kembali nama tryout atau episode dan rilis terbaru karena nama menu, jumlah soal, batas waktu, dan status dashboard dapat berubah. Jika tetap belum muncul, simpan screenshot atau pesan error, nama kegiatan, identitas siswa, dan waktu pengecekan; gunakan bukti itu untuk meminta konfirmasi melalui jalur internal. Detail dari transkrip lama hanya menjadi petunjuk sampai ada rilis terbaru." },
      { heading: "Request khusus", body: "Jika ada alasan valid untuk mengajukan pembatalan atau anulir, kumpulkan bukti sesuai jalur resmi. Jangan menjanjikan request akan diterima.", links: [tryoutLinks.links] }
    ],
    sources: drillSources,
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01T21:00:00+07:00", freshness: "Menu pembahasan, HMS, dashboard monitoring, deadline, dan aturan request mengikuti rilis terbaru" }
  },
  {
    ...tryoutLinks.read,
    pageType: "workflow",
    chapter: tryoutChapter,
    parentId: tryoutLinks.topic.id,
    summary: "Membaca hasil tryout untuk mengevaluasi belajar dan menyiapkan tindak lanjut bersama siswa.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara membaca nilai tryout", "rapor TO TKA", "dashboard nilai TO", "hasil tryout siswa"],
    testQueries: ["Data Studio TO TKA dibuka di mana?", "Data Studio TO UTBK dibuka di mana?", "Rapor tryout dibaca bagaimana?", "Apa tindak lanjut setelah melihat hasil tryout?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan setelah siswa menyelesaikan tryout dan hasilnya tersedia di Data Nilai Tryout TKA, Data Nilai Tryout UTBK, rapor, atau sumber laporan yang sesuai. Alur ini membantu SA mengubah angka menjadi bahan pembahasan, bukan sekadar menyampaikan skor." },
      { heading: "Data Studio TO UTBK", body: "Data Studio TO UTBK dipakai untuk membaca nilai setelah hasilnya tersedia. Aksesnya terbatas untuk alamat email yang terdaftar di milis internal. Pada sebagian rilis, Data Studio baru dibagikan setelah kegiatan berakhir. Untuk melihat keikutsertaan, buka sheet partisipasi per episode dari tab Tryout pada Workbook Kumpulan Link Kesiswaan.", bullets: [{ before: "Buka ", linkText: "Data Nilai Tryout UTBK", after: " untuk melihat data nilai yang tersedia.", url: tryoutSources[2].url }, { before: "Untuk status keikutsertaan, buka ", linkText: "daftar link partisipasi per episode", after: " sesuai nama kegiatan.", url: tryoutSources[8].url }] },
      { heading: "Langkah kerja", steps: ["Pastikan nama siswa, kegiatan atau episode, mata pelajaran, dan waktu pengerjaan sesuai dengan data yang dibuka.", "Baca skor dan rincian yang tersedia, seperti nilai per mata pelajaran, subtes, jumlah benar-salah-kosong, atau perkembangan antar kegiatan.", "Tanyakan bagian yang terasa sulit, lalu cocokkan dengan materi, latihan, kehadiran, dan target yang sudah dibahas.", "Pilih satu sampai tiga materi atau kebiasaan belajar untuk ditindaklanjuti.", "Catat kesimpulan, tindakan berikutnya, dan waktu untuk mengeceknya kembali di tempat pencatatan yang ditetapkan."] },
      { heading: "Yang perlu dihindari", bullets: ["Jangan menyebut skor tryout sebagai ambang kelulusan atau jaminan diterima.", "Jangan membandingkan siswa tanpa menjelaskan kegiatan, periode, dan dasar pembandingnya.", "Jangan membagikan Data Nilai Tryout TKA, Data Nilai Tryout UTBK, atau lembar internal jika sumber tersebut hanya untuk SA atau tim cabang."] },
      { heading: "Jika hasil belum muncul", body: "Periksa apakah kegiatan, episode, dan identitas siswa sudah benar. Jika data tetap belum muncul, catat kendalanya dan gunakan jalur pelaporan yang berlaku. Jangan mengubah data secara manual." }
    ],
    sources: [tryoutSources[1], tryoutSources[2], tryoutSources[6], tryoutSources[8], tryoutSources[9]],
    metadata: { period: "AY 2026/2027", updatedAt: "2026-10-31", freshness: "Tampilan Data Nilai Tryout TKA/UTBK, bentuk rapor, dan sumber pencatatan mengikuti rilis terbaru" }
  },
  {
    ...tryoutLinks.links,
    pageType: "ops_note",
    chapter: tryoutChapter,
    parentId: tryoutLinks.index.id,
    summary: "Pilih rujukan yang tepat untuk membagikan akses atau memeriksa data tryout.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["tautan TO TKA", "tautan TO UTBK", "dashboard nilai tryout", "tautan mata pelajaran tryout", "alat pemantauan partisipasi tryout"],
    testQueries: ["Tautan dashboard nilai TO TKA apa?", "Tautan mata pelajaran wajib dan pilihan Mega Tryout di mana?", "Di mana mencari tautan pengerjaan tryout?"],
    sections: [
      { heading: "Peta sumber", body: "Pilih sumber sesuai kebutuhan: bagikan akses pengerjaan, cek keikutsertaan, baca nilai, atau cari rapor per regional dan cabang. Cocokkan nama kegiatan dan periode dengan rilis terbaru." },
      { heading: "Bagikan link ke siswa", bullets: [
        { before: "Untuk Mega Tryout TKA, gunakan ", links: [{ text: "tautan mata pelajaran wajib", url: tryoutSources[4].url }, { text: "tautan mata pelajaran pilihan", url: tryoutSources[5].url }], after: " sesuai episode yang sedang dibuka.", joiner: " dan " },
        { before: "Untuk Premium Episode 1, gunakan ", linkText: "tautan pengerjaan TKA Premium Episode 1", after: ".", url: tryoutSources[3].url }
      ] },
      { heading: "Cek status internal", bullets: [
        { before: "Untuk mengecek keikutsertaan, buka ", linkText: "tab Tryout pada Workbook Kumpulan Link Kesiswaan", after: " lalu pilih sheet partisipasi sesuai nama kegiatan dan periode.", url: tryoutSources[8].url },
        { before: "Untuk membaca nilai, gunakan ", links: [{ text: "Data Nilai Tryout TKA", url: tryoutSources[1].url }, { text: "Data Nilai Tryout UTBK", url: tryoutSources[2].url }], after: ".", joiner: " atau " },
        { before: "Untuk merutekan rapor, buka ", linkText: "tab Rapor TO UTBK/TKA/STS pada workbook", after: " dan pilih regional atau cabang yang sesuai.", url: tryoutSources[9].url }
      ] },
      { heading: "Cara memilih sumber", steps: ["Pastikan nama kegiatan, episode, jenjang, dan periode siswa sudah jelas.", "Gunakan link pengerjaan untuk siswa; gunakan sheet partisipasi, dashboard nilai, dan tab rapor hanya untuk kebutuhan internal SA atau tim cabang.", "Jika link tidak terbuka atau keterangannya meragukan, cek rilis terbaru sebelum meneruskan kasus."] },
      { heading: "Batas akses", body: "Jangan membagikan Data Nilai Tryout, sheet partisipasi, tracker, atau rapor internal kepada siswa atau orang tua. Link pengerjaan hanya dibagikan jika rilis kegiatan memang ditujukan untuk siswa." }
    ],
    sources: tryoutSources,
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01", freshness: "Tautan, status episode, dan izin akses harus diverifikasi dari rilis terbaru" }
  },
  {
    ...tryoutLinks.schedule,
    pageType: "ops_note",
    chapter: tryoutChapter,
    parentId: tryoutLinks.index.id,
    summary: "Panduan singkat untuk mengecek jadwal tryout dan menjawab pertanyaan akses tanpa memakai aturan dari kegiatan lain.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["jadwal TO terbaru", "periode tryout", "akses tryout premium", "kuota tryout", "deadline tryout"],
    testQueries: ["Jadwal tryout terbaru dilihat di mana?", "Apakah aturan Premium masih berlaku?", "Apakah Tryout TKA Premium SMA bisa diakses semua siswa kelas 12 SMA?", "Apakah Tryout TKA Premium SMA bisa diakses siswa yang terkendala cicilan?", "Apakah Tryout TKA Premium SMA wajib dikerjakan?", "Apakah lima mapel harus selesai satu hari?", "Mapel wajib dan pilihan harus berurutan?", "Tryout bisa dikerjakan beda hari?", "Jika mapel pilihan tidak tersedia di daftar tryout, apakah boleh dilewati?", "Tanggal tryout yang lama masih bisa dipakai?"],
    sections: [
      { heading: "Jadwal yang sedang berlaku", steps: [
        { before: "Buka ", linkText: "Calendar Event Tryout Ruanguji AY 2026/2027", after: " untuk melihat kegiatan dan periode yang sedang berlaku.", url: tryoutSources[0].url },
        "Cocokkan dengan jadwal utama pada rilis terbaru. Tim Akademik memperbarui Calendar Event jika jadwal tryout berubah. Gunakan tanggal yang tercantum di Calendar Event. Tab Jadwal Tryout BAC yang kosong bukan jadwal final."
      ] },
      { heading: "Struktur pengerjaan", body: "Gunakan struktur ini untuk menjawab pertanyaan umum tentang format tryout, lalu cek rilis episode jika ada aturan khusus.", bullets: ["UTBK-SNBT SMA terdiri dari tujuh subtes tanpa jeda. Rincian jumlah soal dan durasi mengikuti deck struktur tryout.", "TKA SD memiliki tiga subtes dengan jeda dan TKA SMP empat subtes dengan jeda.", "TKA SMA memiliki tiga mapel wajib dan sebelas mapel pilihan. Tiap subtes dapat dikerjakan dalam sesi terpisah, sehingga pengerjaan tidak harus dianggap satu sesi penuh." ] },
      { heading: "Report Card tryout", steps: [
        "Pastikan siswa mengerjakan pada episode yang sama jika membutuhkan Report Card Premium.",
        "Sampaikan bahwa Report Card Premium tersedia H+2 setelah event berakhir.",
        "Jika siswa susulan mengerjakan episode berbeda, cek form request dan rilis terbaru karena Report Card Premium tidak otomatis tersedia.",
        "Untuk Report Card Personal atau Grup, jangan menyimpulkan syarat dari potongan informasi; gunakan ketentuan terbaru dari pemilik kegiatan."
      ], links: [tryoutLinks.reportCardFaq] },
      { heading: "Mengapa aturan perlu dicek per kegiatan", body: "Rilis Tim Akademik menunjukkan bahwa aturan dapat berbeda menurut nama kegiatan dan episode. Mega Tryout TKA SMA 2026 dinyatakan wajib untuk sasaran rilisnya, sedangkan Tryout TKA Premium SMA bergantung pada kuota dan pengerjaannya tidak wajib. Mulai Premium Episode 3, beberapa mata pelajaran juga dapat dikerjakan pada hari yang berbeda. Karena itu, jangan menjawab hanya berdasarkan label Premium atau Regular; buka detail kegiatan dan rilis terbarunya.", links: [tryoutLinks.premium3Faq] },
      { heading: "Saat siswa bertanya soal akses", steps: [
        "Pastikan nama tryout atau episodenya.",
        "Buka Calendar Event atau pengumuman terbaru untuk kegiatan tersebut.",
        "Pastikan siswa boleh ikut dan cek apakah tryout tersebut wajib.",
        "Periksa cara mengakses, kuota, batas waktu, mata pelajaran, dan lama pengerjaannya.",
        "Jika tryout atau kuotanya belum muncul, simpan bukti yang diperlukan dan catat kasusnya di dokumen review Tim Akademik.",
        "Jangan menjanjikan akses atau jadwal sebelum ada rujukan yang mendukung."
      ], links: [tryoutLinks.megaFaq] }
    ],
    sources: [tryoutSources[0], tryoutSources[3], tryoutSources[4], tryoutSources[5], tryoutSources[8], tryoutSources[9]],
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01", freshness: "Jadwal, akses, kuota, struktur, Report Card, dan aturan pengerjaan harus mengikuti rilis kegiatan terbaru" }
  },
  {
    ...tryoutLinks.megaFaq,
    pageType: "ops_note",
    chapter: tryoutChapter,
    parentId: tryoutLinks.schedule.id,
    summary: "Jawaban khusus event tentang akses, kewajiban, cicilan, hari pengerjaan, dan urutan mata pelajaran Mega Tryout TKA SMA 2026.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["FAQ Mega Tryout TKA SMA", "akses Mega TO TKA", "tryout TKA wajib", "tryout TKA cicilan", "tryout TKA beda hari", "urutan mapel TKA"],
    testQueries: ["Apakah semua siswa kelas 12 SMA bisa mengakses Mega Tryout TKA SMA 2026?", "Apakah siswa terkendala cicilan tetap bisa ikut Mega Tryout TKA?", "Apakah lima mapel Mega Tryout TKA harus dikerjakan dalam satu hari?", "Apakah mapel wajib dan pilihan harus dikerjakan berurutan?", "Apakah Mega Tryout TKA SMA 2026 wajib dikerjakan?", "Jika mapel pilihan tidak tersedia di daftar tryout, boleh dilewati?"],
    sections: [
      { heading: "Cakupan jawaban", body: "Jawaban berikut berlaku untuk event Mega Tryout TKA SMA 2026 yang dirujuk pada tanya jawab internal. Jangan memperluasnya menjadi aturan untuk semua episode atau semua tryout. Cek Calendar Event dan rilis aktif sebelum menjawab." },
      { type: "qa", question: "Apakah semua siswa kelas 12 SMA bisa mengakses Mega Tryout TKA SMA 2026?", answer: "Ya, menurut tanya jawab event siswa kelas 12 SMA dapat mengakses Mega Tryout TKA SMA 2026. Siswa yang berlangganan BAC dapat mengakses secara otomatis. Siswa non-BAC atau yang terkendala cicilan mengikuti prosedur verifikasi pada rilis event." },
      { type: "qa", question: "Apakah siswa yang terkendala cicilan tetap bisa mengikuti Mega Tryout TKA SMA 2026?", answer: "Bisa, menurut tanya jawab internal, dengan mengikuti prosedur verifikasi yang sedang berlaku. Rujukan lama menyebut bukti share Twibbon dan share mention teman, tetapi tujuan upload dan PIC tidak tercantum. Jangan membuat kanal pengumpulan sendiri; gunakan instruksi pada rilis aktif." },
      { type: "qa", question: "Apakah Mega Tryout TKA SMA 2026 wajib dikerjakan?", answer: "Ya, Mega Tryout TKA SMA 2026 dinyatakan wajib untuk sasaran event yang dirujuk pada tanya jawab internal. Status ini hanya berlaku untuk event tersebut. Untuk episode atau kegiatan lain, cek Calendar Event atau rilis terbaru." },
      { type: "qa", question: "Apakah Mega Tryout TKA SMA 2026 harus dikerjakan dalam satu hari untuk lima mapel?", answer: "Tidak. Lima mapel tidak harus diselesaikan pada hari yang sama. Mapel wajib dan pilihan dapat dikerjakan di hari berbeda, sesuai konfigurasi event yang dirujuk. Akses aktual tetap mengikuti event aktif." },
      { type: "qa", question: "Apakah mapel wajib dan mapel pilihan harus dikerjakan berurutan?", answer: "Ya. Mapel wajib perlu dikerjakan lebih dulu sebelum mapel pilihan terbuka, sesuai konfigurasi event yang dirujuk. Jika urutan pada event aktif berbeda, ikuti konfigurasi dan rilis terbaru." },
      { type: "qa", question: "Jika mapel pilihan tidak tersedia di daftar tryout, apakah boleh dilewati?", answer: "Belum ada aturan universal yang membolehkan mapel pilihan dilewati ketika tidak muncul. Jangan menyuruh siswa melewati mapel berdasarkan asumsi. Cek nama episode, konfigurasi mapel, dan rilis terbaru; jika tetap tidak tersedia, simpan bukti dan gunakan jalur konfirmasi internal." },
      { heading: "Sumber event", bullets: [
        { before: "Untuk tanya jawab dan rujukan link, buka ", linkText: "SSOT Kumpulan Link Kesiswaan — tab Tryout", after: ".", url: megaTryoutSources[0].url },
        { before: "Untuk jadwal dan konfigurasi, buka ", linkText: "Calendar Event Tryout Ruanguji 2026/2027", after: ".", url: megaTryoutSources[1].url },
        { before: "Untuk tautan pengerjaan mapel wajib, gunakan ", linkText: "tautan mata pelajaran wajib Mega Tryout TKA SMA", after: ".", url: megaTryoutSources[2].url },
        { before: "Untuk tautan pengerjaan mapel pilihan, gunakan ", linkText: "tautan mata pelajaran pilihan Mega Tryout TKA SMA", after: ".", url: megaTryoutSources[3].url }
      ] },
      { heading: "Batas penggunaan", body: "Tanggal, link, kuota, prosedur verifikasi, PIC, dan aturan Report Card dapat berubah. Artikel ini menjawab pertanyaan event yang berulang; kasus akses yang tidak sesuai tetap diteruskan melalui jalur eskalasi resmi." }
    ],
    sources: megaTryoutSources,
    metadata: { period: "Mega Tryout TKA SMA 2026", updatedAt: "2026-11-01T22:00:00+07:00", freshness: "Aturan akses, kewajiban, verifikasi cicilan, urutan mapel, link, dan jadwal harus dibandingkan dengan rilis event terbaru" }
  },
  {
    ...tryoutLinks.reportCardFaq,
    pageType: "ops_note",
    chapter: tryoutChapter,
    parentId: tryoutLinks.schedule.id,
    summary: "Jawaban singkat tentang ketersediaan Report Card Tryout Premium, episode susulan, dan request manual.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["FAQ Report Card Premium", "rapor tryout premium", "Report Card H+2", "rapor siswa susulan", "request Report Card"],
    testQueries: ["Kapan Report Card Tryout Premium tersedia?", "Apakah siswa susulan tetap mendapat Report Card Premium?", "Apakah pengerjaan harus di episode yang sama untuk mendapat Report Card?", "Report Card Personal atau Grup syaratnya apa?"],
    sections: [
      { heading: "Cakupan jawaban", body: "Catatan ini menjelaskan pola umum Report Card Tryout Premium berdasarkan rujukan yang tersedia. Syarat dan mekanisme request dapat berubah menurut event, episode, atau jenis Report Card. Cek rilis terbaru sebelum memberi jawaban final." },
      { type: "qa", question: "Kapan Report Card Tryout Premium tersedia?", answer: "Report Card Premium tersedia H+2 setelah event berakhir, sesuai ketentuan yang sudah dirangkum. Pastikan nama event dan tanggal berakhirnya benar sebelum menghitung waktunya." },
      { type: "qa", question: "Apakah siswa harus mengerjakan pada episode yang sama untuk mendapat Report Card Premium?", answer: "Ya. Siswa perlu mengerjakan pada episode yang sama jika membutuhkan Report Card Premium." },
      { type: "qa", question: "Apakah siswa susulan yang mengerjakan episode berbeda tetap mendapat Report Card Premium?", answer: "Tidak otomatis. Jika siswa mengerjakan episode berbeda, cek form request dan rilis terbaru untuk melihat apakah ada mekanisme pengajuan yang berlaku." },
      { type: "qa", question: "Apa syarat Report Card Personal atau Grup?", answer: "Jangan menyimpulkan syarat dari potongan informasi atau aturan episode lain. Gunakan ketentuan terbaru dari pemilik kegiatan dan konfirmasi jika rilisnya belum jelas." },
      { heading: "Sumber event", bullets: [
        { before: "Untuk status nilai dan hasil, buka ", linkText: "Data Nilai Tryout TKA", after: " atau sumber nilai sesuai jalurnya.", url: tryoutSources[1].url },
        { before: "Untuk rujukan rapor per regional atau cabang, buka ", linkText: "Rapor Tryout TKA per regional/cabang", after: ".", url: tryoutSources[6].url },
        { before: "Untuk daftar link per episode dan form yang dirujuk, buka ", linkText: "Workbook Kumpulan Link Kesiswaan", after: ".", url: tryoutSources[8].url }
      ] },
      { heading: "Batas penggunaan", body: "Ketersediaan, waktu terbit, jenis Report Card, dan form request dapat berubah. Jika hasil belum muncul setelah periode yang dirujuk, simpan bukti event, episode, identitas siswa, dan waktu pengecekan lalu gunakan jalur konfirmasi internal." }
    ],
    sources: [tryoutSources[1], tryoutSources[6], tryoutSources[8]],
    metadata: { period: "AY 2026/2027", updatedAt: "2026-11-01T22:45:00+07:00", freshness: "Waktu terbit, syarat episode, jenis Report Card, dan mekanisme request harus dibandingkan dengan rilis terbaru" }
  },
  {
    ...tryoutLinks.premium3Faq,
    pageType: "ops_note",
    chapter: tryoutChapter,
    parentId: tryoutLinks.schedule.id,
    summary: "Jawaban singkat untuk pertanyaan berulang tentang Tryout TKA Premium Episode 3, dengan verifikasi tetap mengacu pada rilis kegiatan terbaru.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["FAQ Premium Episode 3", "Tryout TKA Premium E3", "Premium E3 beda hari", "akses Tryout TKA Premium Episode 3"],
    testQueries: ["Apakah Tryout TKA Premium Episode 3 bisa dikerjakan di hari berbeda?", "Link Tryout TKA Premium Episode 3 ada di mana?", "Apakah Tryout TKA Premium Episode 3 wajib?", "Mapel Premium Episode 3 belum muncul harus bagaimana?"],
    sections: [
      { heading: "Cakupan jawaban", body: "Catatan ini hanya untuk Tryout TKA Premium Episode 3. Informasi yang sudah dirangkum dari rilis internal belum menggantikan Calendar Event atau pengumuman terbaru. Pastikan nama episode dan periode siswa sebelum menjawab." },
      { type: "qa", question: "Apakah Tryout TKA Premium Episode 3 bisa dikerjakan di hari berbeda?", answer: "Rilis yang sudah dirangkum menyebut bahwa mulai Premium Episode 3, beberapa mata pelajaran dapat dikerjakan pada hari yang berbeda. Cek Calendar Event untuk memastikan mapel, tanggal, dan batas waktu yang berlaku pada episode siswa." },
      { type: "qa", question: "Di mana mencari link Tryout TKA Premium Episode 3?", answer: "Mulai dari Calendar Event dan tab Tryout pada SSOT Kumpulan Link Kesiswaan. Jangan memakai link Premium Episode 1 sebagai pengganti karena setiap episode dapat memiliki tautan dan konfigurasi berbeda." },
      { type: "qa", question: "Apakah Tryout TKA Premium Episode 3 wajib dikerjakan?", answer: "Jangan menyimpulkan status wajib hanya dari label Premium atau nomor episode. Buka rilis kegiatan dan Calendar Event terbaru untuk memastikan sasaran peserta dan kewajibannya." },
      { type: "qa", question: "Jika mapel atau kuota Premium Episode 3 belum muncul, apa yang harus dilakukan?", answer: "Cek kembali nama episode, periode, dan rilis terbaru. Jika tetap belum muncul, simpan screenshot atau pesan error beserta identitas siswa dan waktu pengecekan, lalu gunakan jalur konfirmasi internal. Jangan menjanjikan akses sebelum ada rujukan yang mendukung." },
      { heading: "Sumber event", bullets: [
        { before: "Untuk jadwal dan konfigurasi, buka ", linkText: "Calendar Event Tryout Ruanguji AY 2026/2027", after: ".", url: tryoutSources[0].url },
        { before: "Untuk daftar link per episode, buka ", linkText: "tab Tryout pada Workbook Kumpulan Link Kesiswaan", after: ".", url: tryoutSources[8].url }
      ] },
      { heading: "Batas penggunaan", body: "Tanggal, link, kuota, mapel, dan status wajib dapat berubah. Jika rilis terbaru berbeda dari catatan ini, gunakan rilis terbaru dan tandai kasus yang belum jelas untuk dikonfirmasi." }
    ],
    sources: [tryoutSources[0], tryoutSources[8]],
    metadata: { period: "Tryout TKA Premium Episode 3 · AY 2026/2027", updatedAt: "2026-11-01T22:30:00+07:00", freshness: "Aturan akses, jadwal, kuota, mapel, dan status wajib harus dibandingkan dengan rilis Episode 3 terbaru" }
  },
  {
    ...trackingLinks.index,
    pageType: "index",
    chapter: trackingChapter,
    title: "Tracker, Attendance, Dashboard, dan Data Studio",
    summary: "Pintu masuk untuk memilih sumber data operasional sesuai kebutuhan pemantauan siswa dan aktivitas SA.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["bab tracker kesiswaan", "dashboard kesiswaan", "data studio SA", "monitoring attendance siswa"],
    testQueries: ["Tracker Kesiswaan dibuka di mana?", "Dashboard attendance yang dipakai SA apa?", "Data Studio kuis dan post-test ada di mana?"],
    intro: "Bab ini membantu SA memilih sumber kerja tanpa menyalin isi live dashboard, tracker, atau data siswa ke handbook. Mulai dari kebutuhan pemantauan, lalu buka link dan konteks sumber yang sesuai.",
    sections: [
      { heading: "Pilih kebutuhanmu", links: [trackingLinks.topic, trackingLinks.attendance, trackingLinks.dashboard, trackingLinks.missing, trackingLinks.links] },
      { heading: "Alur singkat", steps: ["Tentukan pertanyaan yang ingin dijawab: status siswa, kehadiran, pengerjaan, nilai, atau tindak lanjut.", "Pilih tracker, sheet summary, dashboard, atau Data Studio yang konteksnya sesuai.", "Cek periode pembaruan dan izin akun sebelum membaca data.", "Catat kesimpulan operasional tanpa menyalin data siswa ke knowledge base.", "Jika sumber tidak tersedia atau datanya tidak sesuai, gunakan jalur laporan yang berlaku."] }
    ],
    sources: trackingSources,
    metadata: { period: "AY 2026/2027", freshness: "Nama sumber, izin akses, periode data, dan dashboard aktif perlu diverifikasi dari rilis terbaru" }
  },
  {
    ...trackingLinks.topic,
    pageType: "topic",
    chapter: trackingChapter,
    parentId: trackingLinks.index.id,
    summary: "Memahami perbedaan tracker, sheet summary, dashboard, dan Data Studio sebelum memilih sumber kerja.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["beda tracker dan dashboard", "sumber data siswa", "peta data operasional SA"],
    testQueries: ["Apa bedanya Tracker Kesiswaan dan Summary Tracker?", "Dashboard dipakai untuk menjawab pertanyaan apa?", "Data siswa boleh diekstrak ke handbook?"],
    sections: [
      { heading: "Tracker Kesiswaan", body: "Tracker Kesiswaan menjadi indeks kerja untuk konteks siswa, regional, cabang, dan kebutuhan operasional yang dicatat oleh tim. Gunakan link dan konteks tabnya; jangan menyalin baris siswa massal ke handbook." },
      { heading: "Sheet summary", body: "Sheet summary dipakai untuk rekap atau distribusi yang sudah diringkas. Pastikan periode dan tujuan sheet sesuai sebelum menyimpulkan status seorang siswa." },
      { heading: "Dashboard dan Data Studio", body: "Dashboard atau Data Studio dipakai untuk membaca agregat, partisipasi, nilai, attendance, kuis, post-test, drill, atau monitoring program sesuai sumbernya. Akses dapat dibatasi oleh milis atau role internal." },
      { heading: "Batas data", body: "Bab ini hanya menyimpan nama sumber, link, fungsi, audiens, dan batas penggunaannya. Nilai, status siswa, email, password, PIN, dan isi live dashboard tetap diproses di kanal internal yang ditetapkan." }
    ],
    sources: [trackingSources[0], trackingSources[1], trackingSources[2], trackingSources[6]],
    metadata: { period: "AY 2026/2027", freshness: "Struktur tab dan izin akses dapat berubah mengikuti pembaruan workbook atau dashboard" }
  },
  {
    ...trackingLinks.attendance,
    pageType: "workflow",
    chapter: trackingChapter,
    parentId: trackingLinks.topic.id,
    summary: "Membaca rekap attendance, kuis, dan post-test untuk menentukan aktivitas yang perlu ditindaklanjuti.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["monitoring attendance", "cek kuis siswa", "post-test belum selesai", "report attendance SA"],
    testQueries: ["Attendance siswa dicek di mana?", "Kuis dan post-test siswa belum selesai harus bagaimana?", "Data pengerjaan kuis ada di dashboard apa?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan saat perlu mengetahui apakah siswa hadir, menyelesaikan kuis atau post-test, atau membutuhkan pengingat dan tindak lanjut." },
      { heading: "Sumber yang digunakan", bullets: [
        { before: "Untuk attendance, buka ", linkText: "Data Attendance", after: ".", url: trackingSources[2].url },
        { before: "Untuk kuis dan post-test, buka ", linkText: "Data Pengerjaan Kuis dan Post-test", after: ".", url: trackingSources[3].url },
        { before: "Untuk drill, gunakan ", linkText: "Data Pengerjaan Drill Soal", after: " bila programnya sesuai.", url: trackingSources[4].url }
      ] },
      { heading: "Langkah kerja", steps: ["Pastikan periode, cabang, sesi, dan identitas siswa sesuai dengan sumber.", "Baca status atau rekap pada dashboard yang dituju; jangan menggabungkan angka dari periode berbeda.", "Bedakan siswa yang belum mengerjakan dari data yang belum diperbarui.", "Sampaikan pengingat atau tindak lanjut sesuai program yang sedang berlaku.", "Jika status tidak sesuai, simpan bukti minimum dan gunakan jalur laporan internal."] },
      { heading: "Batas informasi", body: "Status implementasi attendance, frekuensi pembaruan, dan nama kanal laporan dapat berubah. Jangan menjadikan data mingguan lama sebagai status aktif tanpa mengecek rilis terbaru." }
    ],
    sources: [trackingSources[2], trackingSources[3], trackingSources[4]],
    metadata: { period: "AY 2026/2027", freshness: "Periode report, cara hitung, dan status pembaruan mengikuti sumber terbaru" }
  },
  {
    ...trackingLinks.dashboard,
    pageType: "workflow",
    chapter: trackingChapter,
    parentId: trackingLinks.topic.id,
    summary: "Memilih dashboard atau Data Studio yang tepat untuk membaca partisipasi, nilai, dan monitoring program.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara membaca Data Studio", "dashboard nilai TKA", "dashboard tryout dan attendance", "Data Studio TKA"],
    testQueries: ["Data Studio TKA dibuka di mana?", "Dashboard nilai tryout yang mana?", "Bagaimana membaca dashboard tanpa salah konteks?"],
    sections: [
      { heading: "Pilih berdasarkan pertanyaan", bullets: [
        { before: "Kehadiran: gunakan ", linkText: "Data Attendance", after: ".", url: trackingSources[2].url },
        { before: "Kuis dan post-test: gunakan ", linkText: "Data Pengerjaan Kuis dan Post-test", after: ".", url: trackingSources[3].url },
        { before: "Nilai tryout TKA: gunakan ", linkText: "Data Nilai Tryout TKA", after: ".", url: trackingSources[5].url },
        { before: "Partisipasi dan nilai Tes Diagnostik Matematika Dasar: gunakan ", linkText: "Data Studio Tes Diagnostik", after: ".", url: trackingSources[6].url }
      ] },
      { heading: "Langkah kerja", steps: ["Pastikan nama program, event, episode, periode, dan akun akses sudah tepat.", "Gunakan filter yang disediakan sumber, misalnya email, cabang, sesi, atau kegiatan.", "Baca satuan dan rentang nilai sesuai event; jangan membandingkan angka mentah dari kegiatan berbeda.", "Jika dashboard menampilkan data yang belum lengkap, cek waktu pembaruan dan sumber pendukung.", "Simpan kesimpulan operasional di tempat kerja internal, bukan di knowledge base."] },
      { heading: "Keamanan akses", body: "Akses Data Studio dapat dibatasi oleh milis atau role. SA tidak menyimpan username, password, PIN, atau kredensial siswa dan tidak membagikan dashboard internal kepada siswa atau orang tua." }
    ],
    sources: [trackingSources[2], trackingSources[3], trackingSources[5], trackingSources[6]],
    metadata: { period: "AY 2026/2027", freshness: "Link dashboard, filter, rentang skor, dan izin akses harus dicek pada rilis terbaru" }
  },
  {
    ...trackingLinks.missing,
    pageType: "workflow",
    chapter: trackingChapter,
    parentId: trackingLinks.topic.id,
    summary: "Membedakan data yang belum diperbarui dari data yang memang belum tercatat, lalu meneruskan kasus dengan bukti minimum.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["data dashboard belum muncul", "nilai belum masuk Data Studio", "tracker siswa belum update"],
    testQueries: ["Nilai siswa belum muncul di Data Studio harus bagaimana?", "Tracker siswa belum update siapa yang dihubungi?", "Mapel siswa tidak terlihat di dashboard apa yang dilakukan?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan saat siswa mengaku sudah hadir atau mengerjakan, tetapi status, nilai, atau aktivitasnya belum terlihat pada tracker atau dashboard." },
      { heading: "Langkah kerja", steps: ["Catat nama program atau event, episode, periode, identitas siswa, dan waktu pengerjaan.", "Cek apakah sumber sudah diperbarui dan apakah akun SA memiliki akses yang sesuai.", "Bandingkan dengan sumber pendukung yang memang boleh dibuka, tanpa menyalin data massal.", "Simpan tangkapan layar atau bukti minimum sesuai jalur laporan.", "Teruskan ke kanal operasional yang ditetapkan; jangan mengubah data secara manual.", "Sampaikan bahwa tindak lanjut menunggu pengecekan pemilik sumber bila belum ada konfirmasi."] },
      { heading: "Yang perlu dihindari", bullets: ["Jangan meminta password atau PIN siswa.", "Jangan menyimpulkan siswa belum mengerjakan hanya karena dashboard belum diperbarui.", "Jangan menggabungkan status dari periode atau event berbeda.", "Jangan menyalin data pribadi ke knowledge base atau kanal publik."] }
    ],
    sources: [trackingSources[0], trackingSources[2], trackingSources[5], trackingSources[6]],
    metadata: { period: "AY 2026/2027", freshness: "Jalur laporan, waktu pembaruan, dan sumber pembanding mengikuti pemilik proses terbaru" }
  },
  {
    ...trackingLinks.links,
    pageType: "ops_note",
    chapter: trackingChapter,
    parentId: trackingLinks.index.id,
    summary: "Peta link Tracker, sheet summary, dashboard, dan Data Studio beserta konteks penggunaan internalnya.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["link tracker kesiswaan", "link dashboard attendance", "link Data Studio SA", "sumber dashboard internal"],
    testQueries: ["Link Tracker Kesiswaan ada di mana?", "Dashboard attendance linknya apa?", "Link Data Studio kuis dan post-test yang mana?"],
    sections: [
      { heading: "Cek status dan rekap siswa", bullets: [
        { before: "Buka ", linkText: "Tracker Kesiswaan", after: " untuk melihat indeks sumber dan konteks regional atau cabang.", url: trackingSources[0].url },
        { before: "Gunakan ", linkText: "Summary Tracker Kesiswaan", after: " jika membutuhkan rekap yang sudah diringkas.", url: trackingSources[1].url }
      ] },
      { heading: "Cek aktivitas belajar", bullets: [
        { before: "Untuk attendance, buka ", linkText: "Data Attendance", after: ".", url: trackingSources[2].url },
        { before: "Untuk kuis dan post-test, buka ", linkText: "Data Pengerjaan Kuis dan Post-test", after: ".", url: trackingSources[3].url },
        { before: "Untuk drill, gunakan ", linkText: "Data Pengerjaan Drill Soal", after: " bila programnya sesuai.", url: trackingSources[4].url }
      ] },
      { heading: "Cek nilai dan partisipasi", bullets: [
        { before: "Untuk nilai tryout TKA, gunakan ", linkText: "Data Nilai Tryout TKA", after: ".", url: trackingSources[5].url },
        { before: "Untuk Tes Diagnostik Matematika Dasar, gunakan ", linkText: "Data Studio Partisipasi dan Nilai Tes Diagnostik", after: ".", url: trackingSources[6].url }
      ] },
      { heading: "Cek status BAO", bullets: [
        { before: "Untuk status siswa BAO, buka ", linkText: "Dashboard Status Siswa BAO", after: ".", url: trackingSources[7].url }
      ] },
      { heading: "Cara memilih link", steps: ["Cocokkan nama sumber dengan kebutuhan dan periode siswa.", "Gunakan tracker atau sheet summary untuk status dan rekap yang memang dicatat di sana.", "Gunakan dashboard atau Data Studio untuk agregat, monitoring, partisipasi, atau nilai sesuai labelnya.", "Pastikan akun memiliki izin akses sebelum meminta bantuan pemilik sumber.", "Cek rilis terbaru jika URL, nama tab, atau tampilan dashboard berubah."] },
      { heading: "Batas akses", body: "Link pada halaman ini adalah rujukan internal. Jangan membagikan tracker, dashboard, Data Studio, sheet summary, atau data siswa kepada siswa atau orang tua." }
    ],
    sources: trackingSources,
    metadata: { period: "AY 2026/2027", freshness: "Link, nama tab, pemilik, audiens, dan status akses harus diverifikasi sebelum digunakan" }
  },
  {
    ...accessLinks.index,
    pageType: "index",
    chapter: accessChapter,
    title: "Akses, Keamanan, Kendala Sistem, dan Eskalasi",
    summary: "Pintu masuk untuk membantu siswa saat akses akun, fitur, data, atau kanal bantuan mengalami kendala.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["pusat akses siswa", "bantuan akses", "eskalasi kendala siswa"],
    testQueries: ["Siswa tidak bisa login harus bagaimana?", "Kapan kendala siswa perlu dieskalasikan?", "Password siswa boleh disimpan SA tidak?"],
    intro: "Mulai dari jenis kendalanya. Bab ini membantu SA menjaga keamanan kredensial, melakukan pengecekan awal, dan meneruskan kasus melalui jalur resmi ketika masalah tidak dapat diselesaikan di tingkat pertama.",
    sections: [
      { heading: "Pilih kebutuhanmu", links: [accessLinks.topic, accessLinks.account, accessLinks.error, accessLinks.bao, accessLinks.permission, accessLinks.links] },
      { heading: "Alur singkat", steps: ["Kenali fitur, akun, atau data yang bermasalah.", "Minta siswa menjelaskan gejala tanpa mengirim password atau PIN.", "Coba langkah aman yang tersedia, termasuk akses web bila aplikasi bermasalah.", "Catat waktu, perangkat, pesan error, dan hasil pengecekan.", "Gunakan jalur bantuan atau eskalasi yang sesuai.", "Simpan data pribadi hanya pada kanal internal yang ditetapkan."] }
    ],
    sources: accessSources,
    metadata: { period: "AY 2026/2027", freshness: "Kanal bantuan, nama menu, prosedur reset, dan status akses mengikuti rilis terbaru" }
  },
  {
    ...accessLinks.topic,
    pageType: "topic",
    chapter: accessChapter,
    parentId: accessLinks.index.id,
    summary: "Memahami batas bantuan SA, prinsip keamanan kredensial, dan kapan sebuah kendala perlu diteruskan.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["keamanan akun siswa", "akses web siswa", "alur eskalasi"],
    testQueries: ["Apa yang boleh dilakukan SA saat siswa tidak bisa login?", "Bolehkah siswa mengirim password ke SA?", "Kapan masalah akses perlu dilaporkan?"],
    sections: [
      { heading: "Akses bukan berarti mengambil alih akun", body: "SA membantu siswa mengikuti langkah akses yang tersedia, tetapi tidak mengambil alih akun siswa. Username, PIN, password, dan kredensial lain tidak disimpan atau diminta melalui chat." },
      { heading: "Pengecekan awal", body: "Mulai dari fitur yang bermasalah, perangkat atau kanal yang digunakan, waktu kejadian, dan pesan error yang terlihat. Jika aplikasi bermasalah, akses web dapat dicoba sebagai langkah mitigasi bila rilis produk mengarahkannya." },
      { heading: "Kapan perlu eskalasi", body: "Eskalasi dilakukan ketika langkah aman tidak menyelesaikan masalah, data siswa belum muncul, akun tidak sesuai, akses terkunci, atau kasus membutuhkan bantuan tim lain. Catat bukti minimum yang diperlukan tanpa menyalin data pribadi ke knowledge base." },
      { heading: "Hubungan dengan bab lain", body: "Bab ini menjelaskan pola penanganan akses dan eskalasi. Prosedur khusus Profiling, TMB, onboarding, dan tryout tetap dirujuk ke halaman workflow masing-masing." }
    ],
    sources: accessSources,
    metadata: { period: "AY 2026/2027", freshness: "Batas akses dan kanal bantuan harus mengikuti rilis operasional terbaru" }
  },
  {
    ...accessLinks.account,
    pageType: "workflow",
    chapter: accessChapter,
    parentId: accessLinks.topic.id,
    summary: "Membantu siswa melakukan pengecekan login, mencoba akses web bila relevan, dan meneruskan kendala reset melalui jalur resmi.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["siswa gagal login", "reset akun siswa", "akses web Brain Academy"],
    testQueries: ["Siswa tidak bisa login aplikasi, langkah SA apa?", "Bagaimana menangani permintaan reset akun siswa?", "Password siswa boleh dikirim ke SA?"],
    sections: [
      { heading: "Tujuan", body: "Workflow ini membantu SA memberi arahan yang aman tanpa meminta atau menyimpan kredensial siswa." },
      { heading: "Prasyarat", body: "Siapkan nama fitur yang bermasalah, perangkat atau kanal yang dipakai, waktu kejadian, dan pesan error yang terlihat. Jangan meminta siswa mengirim password atau PIN." },
      { heading: "Langkah kerja", steps: ["Minta siswa mencoba login dengan akunnya sendiri dan mengikuti petunjuk pemulihan yang tersedia.", "Jika aplikasi bermasalah, arahkan ke akses web bila itu menjadi mitigasi pada rilis terbaru.", "Untuk fitur yang memiliki urutan akses, pastikan siswa sudah login sebelum membuka menu terkait.", "Jika siswa meminta reset atau akses tetap gagal, catat gejala dan bukti minimum lalu gunakan jalur bantuan resmi.", "Sampaikan bahwa SA tidak dapat menjamin waktu pemulihan sebelum ada konfirmasi dari tim pemilik sistem."] },
      { heading: "Batas informasi", body: "Jangan meminta siswa mengirim password, PIN, atau tangkapan layar yang menampilkan kredensial. Jangan mengubah data akun atau menjanjikan reset jika statusnya belum dikonfirmasi." }
    ],
    sources: [accessSources[2], accessSources[3]],
    metadata: { period: "AY 2026/2027", freshness: "Nama menu, akses web, dan prosedur pemulihan mengikuti rilis produk terbaru" }
  },
  {
    ...accessLinks.error,
    pageType: "workflow",
    chapter: accessChapter,
    parentId: accessLinks.topic.id,
    summary: "Menata pengecekan saat fitur error, respons belum muncul, atau data siswa belum terlihat di sistem kerja SA.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["error akses siswa", "data siswa belum muncul", "kendala sistem siswa"],
    testQueries: ["Data siswa belum muncul harus dicek apa?", "Apa yang dicatat saat siswa mengalami error?", "Bagaimana melaporkan kendala akses siswa?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan saat siswa sudah mengikuti arahan awal tetapi fitur tetap error, respons belum terlihat, atau data yang seharusnya tersedia belum muncul." },
      { heading: "Langkah kerja", steps: ["Tanyakan fitur atau halaman yang dibuka, perangkat atau kanal yang digunakan, dan waktu kejadian.", "Catat pesan error atau gejala yang terlihat tanpa menyimpan kredensial siswa.", "Cek apakah masalah hanya terjadi di aplikasi atau juga di akses web.", "Bandingkan status siswa dengan sumber kerja yang memang boleh diakses SA.", "Jika data tetap belum muncul atau ada ketidaksesuaian, gunakan jalur laporan dan sertakan bukti minimum yang diminta.", "Sampaikan tindak lanjut dan waktu pengecekan ulang hanya jika sudah ditetapkan oleh pemilik proses."] },
      { heading: "Yang perlu dihindari", bullets: ["Jangan meminta siswa mengulang berkali-kali tanpa alasan yang jelas.", "Jangan mengubah atau menghapus data untuk memperbaiki tampilan.", "Jangan menyalin data pribadi ke knowledge base, chat publik, atau dokumen yang tidak ditetapkan."] }
    ],
    sources: [accessSources[1], accessSources[2]],
    metadata: { period: "AY 2026/2027", freshness: "Status sistem, jalur laporan, dan sumber data utama perlu dicek pada rilis terbaru" }
  },
  {
    ...accessLinks.bao,
    pageType: "workflow",
    chapter: accessChapter,
    parentId: accessLinks.topic.id,
    summary: "Menangani siswa BAO yang belum terhubung dengan SA sambil menjaga data identitas tetap berada di kanal internal.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["BAO belum dihubungi", "siswa belum terhubung SA", "report BAO"],
    testQueries: ["Siswa BAO belum dihubungi SA harus bagaimana?", "Data apa yang diperlukan untuk report BAO?", "Link bantuan mencari Student Advisor yang aktif apa?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan saat siswa BAO belum terhubung dengan SA atau membutuhkan bantuan menemukan kanal Student Advisor." },
      { heading: "Langkah kerja", steps: [{ before: "Cek status siswa pada ", linkText: "Dashboard Status Siswa BAO", after: ".", url: "https://lookerstudio.google.com/reporting/6f3df9a1-3da8-4e34-b771-0faabfed2fa5/page/p_r3bdwiowhd" }, { before: "Gunakan wording bantuan terbaru melalui ", linkText: "Link bantuan mencari Student Advisor", after: ".", url: "https://s.id/terhubungdenganstudentadvisor" }, "Jika siswa belum dihubungi, kirim report melalui kanal internal dengan nama siswa, email aktif, nomor HP siswa, nama atau nomor HP orang tua, dan kendala.", "Pastikan data identitas hanya dikirim melalui kanal internal yang ditetapkan dan tidak disalin ke knowledge base atau kanal publik."] },
      { heading: "Yang perlu dicek", body: "Nomor kanal, wording, poster, status Dashboard Status Siswa BAO, dan link bantuan dapat berubah. Gunakan versi terbaru sebelum mengarahkan siswa." }
    ],
    sources: [accessSources[1]],
    metadata: { period: "AY 2026/2027", freshness: "Kanal report, wording bantuan, dan status dashboard mengikuti rilis Tim BAO atau Kesiswaan terbaru" }
  },
  {
    ...accessLinks.permission,
    pageType: "workflow",
    chapter: accessChapter,
    parentId: accessLinks.topic.id,
    summary: "Mengarahkan pengajuan izin ketika siswa tidak dapat hadir pada sesi, sesuai jalur perangkat dan batas waktu yang berlaku.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["izin tidak hadir", "izin sakit sesi", "permission tidak hadir KBM"],
    testQueries: ["Bagaimana cara mengajukan izin tidak hadir sesi?", "Batas pengisian izin tidak hadir kapan?", "Izin tidak hadir yang sudah dikirim bisa dibatalkan?"],
    sections: [
      { heading: "Kapan digunakan", body: "Gunakan saat siswa tidak dapat mengikuti sesi karena sakit, kegiatan sekolah, kegiatan keluarga, atau cuaca buruk." },
      { heading: "Prasyarat", body: "Pengajuan harus dilakukan sebelum jadwal KBM dimulai. Pastikan siswa menggunakan akun dan perangkatnya sendiri." },
      { heading: "Langkah kerja", steps: [
        { before: "Buka ", linkText: "Panduan Akses — Izin Tidak Hadir Sesi", after: " untuk melihat jalur Android dan iOS/macOS.", url: accessSources[0].url },
        "Pada sesi yang tidak dapat dihadiri, pilih Lihat Detail.",
        "Pilih Izin tidak hadir di sesi ini.",
        "Pilih alasan yang sesuai: sakit, kegiatan sekolah, kegiatan keluarga, atau cuaca buruk.",
        "Klik Submit dan pastikan pengajuan tercatat.",
        "Sampaikan bahwa izin yang sudah dikirim tidak dapat dibatalkan. Jika siswa ternyata tetap dapat hadir, arahkan untuk menghubungi Master Teacher atau Student Advisor."
      ] },
      { heading: "Batas informasi", body: "Jangan menjanjikan perubahan atau pembatalan izin setelah submit. Jika menu atau batas waktu pada aplikasi berbeda dari panduan, tahan arahan dan cek rilis terbaru." }
    ],
    sources: [accessSources[0]],
    metadata: { period: "AY 2026/2027", freshness: "Nama menu, jalur perangkat, alasan izin, dan batas submit mengikuti panduan akses terbaru" }
  },
  {
    ...accessLinks.links,
    pageType: "ops_note",
    chapter: accessChapter,
    parentId: accessLinks.index.id,
    summary: "Rujukan singkat untuk mencari link akses siswa, sumber kerja SA, dan kanal eskalasi.",
    status: "draft",
    sourceStatus: "partial",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["link bantuan akses", "directory eskalasi", "sumber akses siswa"],
    testQueries: ["Sumber akses dan eskalasi siswa ada di mana?", "Link bantuan BAO yang terbaru apa?", "Sumber keamanan akun berasal dari sesi mana?"],
    sections: [
      { heading: "Sumber yang dirujuk", bullets: [
        { before: "Panduan izin tidak hadir: buka ", linkText: "Panduan Akses — Izin Tidak Hadir Sesi", after: ".", url: accessSources[0].url },
        { before: "Status dan report BAO: gunakan ", linkText: "Info BAO dan Eskalasi Siswa Belum Terhubung SA", after: " sesuai akses internal.", url: accessSources[1].url },
        { before: "Keamanan akun dan akses web: lihat ", linkText: "Weekly Sync 14 Juli 2026", after: ".", url: accessSources[2].url },
        { before: "Reset dan akses TMB: lihat ", linkText: "Weekly Sync 4 Agustus 2026", after: ".", url: accessSources[3].url }
      ] },
      { heading: "Sebelum mengikuti rujukan ini", steps: ["Pastikan URL, nama menu, dan kanal bantuan masih aktif.", "Cek apakah prosedur berlaku untuk jenjang atau program siswa yang sedang ditangani.", "Jangan gunakan template lama jika sumber terbaru sudah menggantinya.", "Catat sumber pengganti dan tanggal pengecekan jika ada perubahan."] },
      { heading: "Batas penggunaan sumber", body: "Halaman ini membantu SA menemukan rujukan. Data pribadi, password, PIN, dan isi report siswa hanya boleh diproses melalui kanal internal yang ditetapkan." }
    ],
    sources: accessSources,
    metadata: { period: "AY 2026/2027", freshness: "Link, kanal, nama menu, dan prosedur akses harus dicek saat ada perubahan atau sebelum periode aktif" }
  },
  {
    ...directoryLinks.index,
    pageType: "index",
    chapter: directoryChapter,
    title: "Directory Sumber dan Evidence",
    summary: "Pintu masuk untuk menemukan link kerja, source registry, transcript, timestamp video, dan catatan periode berlaku.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["source directory SA", "indeks sumber", "directory evidence", "daftar sumber handbook"],
    testQueries: ["Sumber kerja SA dicari di mana?", "Transcript Weekly Sync ada di mana?", "Bagaimana mengecek status sumber dan periode berlakunya?"],
    intro: "Directory membantu SA menemukan bukti dan link kerja tanpa menjadikan setiap file sumber sebagai artikel terpisah. Gunakan halaman topik atau workflow sebagai jawaban utama, lalu buka evidence ketika perlu memeriksa detail.",
    sections: [
      { heading: "Pilih kebutuhanmu", links: [directoryLinks.topic, directoryLinks.find, directoryLinks.freshness] },
      { heading: "Alur singkat", steps: ["Mulai dari kebutuhan atau aktivitas SA yang sedang ditangani.", "Buka topic page atau workflow yang paling sesuai.", "Gunakan source registry untuk menemukan sumber asli dan pemiliknya.", "Buka transcript atau timestamp jika perlu memeriksa bagian tertentu dari rekaman.", "Cek periode berlaku, status ekstraksi, dan rilis yang lebih baru sebelum memakai informasi yang mudah berubah."] }
    ],
    sources: [],
    metadata: { period: "AY 2026/2027", freshness: "Struktur directory mengikuti registry dan indeks sumber terbaru" }
  },
  {
    ...directoryLinks.topic,
    pageType: "topic",
    chapter: directoryChapter,
    parentId: directoryLinks.index.id,
    summary: "Memahami perbedaan halaman handbook, source registry, transcript, dan evidence yang dipakai untuk memeriksa jawaban.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["apa itu evidence", "source registry handbook", "transcript bertimestamp"],
    testQueries: ["Apa bedanya artikel handbook dan source registry?", "Kapan harus membuka transcript?", "Apa arti status partial pada sumber?"],
    sections: [
      { heading: "Halaman handbook", body: "Topic page menjelaskan pengetahuan dan konteks yang perlu dipahami SA. Workflow menjelaskan tindakan yang perlu dilakukan. Keduanya menjadi pintu masuk utama saat mencari jawaban." },
      { heading: "Source registry", body: "Source registry mencatat identitas sumber, kelompok sumber, pemilik, periode, jenis sumber, status akses, dan status ekstraksi. Registry membantu menelusuri asal informasi, tetapi bukan pengganti halaman handbook." },
      { heading: "Transcript dan timestamp", body: "Transcript dipakai ketika informasi berasal dari rekaman. Timestamp membantu SA kembali ke bagian video yang menjelaskan istilah, angka, atau keputusan tertentu. Raw transcript tetap menjadi evidence dan tidak otomatis menjadi jawaban utama." },
      { heading: "Memahami status partial", body: "Status partial menunjukkan kualitas ekstraksi atau transkrip belum sempurna. Status ini tidak otomatis berarti sumbernya tidak sah. Cek bagian yang ambigu pada timestamp dan bandingkan dengan rilis yang lebih baru bila informasi dapat berubah." }
    ],
    sources: [],
    metadata: { period: "AY 2026/2027", freshness: "Field registry, status ekstraksi, dan struktur transcript mengikuti pembaruan provenance terbaru" }
  },
  {
    ...directoryLinks.find,
    pageType: "workflow",
    chapter: directoryChapter,
    parentId: directoryLinks.topic.id,
    summary: "Menemukan sumber kerja yang tepat tanpa membuka banyak file secara acak atau memakai rujukan yang sudah lewat.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["cara mencari sumber SA", "mencari link kerja", "menelusuri evidence"],
    testQueries: ["Bagaimana mencari link kerja SA?", "Cara menemukan sumber asli sebuah artikel bagaimana?", "Sebelum memakai sumber apa yang perlu dicek?"],
    sections: [
      { heading: "Tujuan", body: "Workflow ini membantu SA bergerak dari kebutuhan kerja ke halaman handbook, lalu ke sumber asli bila diperlukan." },
      { heading: "Langkah kerja", steps: ["Cari kata kunci kebutuhan di handbook, misalnya nama aktivitas, sistem, atau kendala siswa.", "Buka halaman topic atau workflow yang menjawab kebutuhan tersebut.", "Gunakan bagian Sumber dan rujukan untuk melihat evidence yang dipakai halaman itu.", "Jika perlu menelusuri lebih jauh, cocokkan source ID atau judul sumber dengan source registry.", "Untuk rekaman, buka transcript dan timestamp yang dirujuk oleh halaman.", "Sebelum mengutip link, deadline, akses, atau angka, cek periode dan rilis terbaru."] },
      { heading: "Jika sumber tidak ditemukan", body: "Jangan mengisi celah dengan tebakan. Catat kebutuhan, kata kunci yang sudah dicoba, dan sumber yang tersedia untuk dimasukkan ke daftar review atau eskalasi." }
    ],
    sources: [],
    metadata: { period: "AY 2026/2027", freshness: "Nama file, link kerja, dan struktur registry dapat berubah mengikuti intake sumber" }
  },
  {
    ...directoryLinks.freshness,
    pageType: "ops_note",
    chapter: directoryChapter,
    parentId: directoryLinks.index.id,
    summary: "Catatan untuk memastikan sumber masih berlaku, siapa pemiliknya, dan kapan perlu dicek ulang.",
    status: "draft",
    sourceStatus: "verified",
    sourceAuthority: "canonical_internal_as_of_source_date",
    aliases: ["status sumber", "tanggal berlaku sumber", "pemilik dan periode sumber"],
    testQueries: ["Bagaimana mengecek apakah sumber masih berlaku?", "Apa yang harus diperiksa sebelum memakai link lama?", "Siapa pemilik sumber dan kapan harus cek ulang?"],
    sections: [
      { heading: "Yang perlu diperiksa", bullets: ["Penerbit dan tanggal: siapa yang menerbitkan atau menyampaikan informasi, serta kapan sumber itu dibuat.", "Status pengambilan: apakah isi sumber sudah terbaca penuh, baru sebagian, hanya berupa metadata, atau memiliki kendala pengambilan.", "Pemilik dan periode: siapa yang bertanggung jawab atas informasi tersebut dan periode apa yang dicakup.", "Tanggal berlaku: apakah ada rilis atau sumber lebih baru yang menggantikan informasi sebelumnya."] },
      { heading: "Kapan harus berhenti dan mengecek ulang", body: "Tahan penggunaan informasi jika link tidak bisa dibuka, status akses berubah, tanggal sudah lewat, sumber baru bertentangan, atau bagian penting hanya berasal dari transkrip yang ambigu." },
      { heading: "Cara mencatat perubahan", steps: ["Catat sumber atau rilis yang baru ditemukan.", "Hubungkan perubahan dengan halaman handbook yang terdampak.", "Tandai sumber lama sebagai histori atau sudah digantikan setelah ada keputusan.", "Perbarui link dan periode pada halaman yang memakai informasi tersebut."] }
    ],
    sources: [],
    metadata: { period: "AY 2026/2027", freshness: "Status sumber, pemilik, dan periode harus mengikuti source registry terbaru" }
  }
];

for (const record of HANDBOOK_V2) {
  // Link definitions carry a short label; promote it to the page title so
  // every projection (chapter cards, breadcrumbs, and detail pages) has the
  // same stable heading.
  if (!record.title) record.title = record.label;
}

export const HANDBOOK_V2_BY_ID = new Map(HANDBOOK_V2.map((record) => [record.id, record]));
export const HANDBOOK_V2_CHAPTERS = [
  { id: onboardingChapter, title: "Onboarding Siswa dan Orang Tua", description: "Menyiapkan welcoming, menjelaskan fasilitas, dan mengarahkan aktivitas awal siswa.", indexId: onboardingLinks.index.id, route: "/chapter-1" },
  { id: pilotChapter, title: "Konsultasi Awal dan Profiling", description: "Mengarahkan pengisian, membaca hasil, dan menjalankan konsultasi awal.", indexId: handbookLinks.index.id, route: "/chapter-2" },
  { id: tmbChapter, title: "Tes Minat Bakat dan Pilihan Jurusan", description: "Memahami TMB, membaca hasil, dan membahas pilihan studi bersama siswa.", indexId: tmbLinks.index.id, route: "/chapter-3" },
  { id: activityChapter, title: "Aktivitas Belajar dan Pendampingan", description: "Menghubungkan KBM, materi, klinik, Motivatalks, Kakak Asuh, dan tindak lanjut siswa.", indexId: activityLinks.index.id, route: "/chapter-5" },
  { id: tryoutChapter, title: "Tryout, Tes Diagnostik, Kuis, Post-test, Drill, dan Rapor", description: "Menemukan kegiatan tryout, memeriksa akses, membaca hasil, dan menentukan tindak lanjut.", indexId: tryoutLinks.index.id, route: "/chapter-6" },
  { id: trackingChapter, title: "Tracker, Attendance, Dashboard, dan Data Studio", description: "Menggunakan data operasional untuk pemantauan siswa dan aktivitas SA.", indexId: trackingLinks.index.id, route: "/chapter-7" },
  { id: accessChapter, title: "Akses, Keamanan, Kendala Sistem, dan Eskalasi", description: "Menangani akses akun, kendala sistem, data yang belum muncul, dan jalur bantuan.", indexId: accessLinks.index.id, route: "/chapter-8" },
  { id: directoryChapter, title: "Directory Sumber dan Evidence", description: "Menemukan source registry, transcript, link kerja, owner, dan periode berlaku.", indexId: directoryLinks.index.id, route: "/chapter-9" }
];
export const HANDBOOK_CHAPTERS = [
  { number: 0, title: "Mulai di sini: Peran dan Cara Kerja SA", description: "Memahami peran SA, batas informasi, cara memakai handbook, dan eskalasi dasar." },
  { number: 1, id: onboardingChapter, title: "Onboarding Siswa dan Orang Tua", description: "Menyiapkan grup, welcoming, fasilitas, post-test, tes diagnostik, dan output onboarding.", active: true, route: "/chapter-1" },
  { number: 2, id: pilotChapter, title: "Konsultasi Awal dan Profiling", description: "Mengarahkan Profiling, membaca data awal, dan menjalankan Konsultasi Awal.", active: true, route: "/chapter-2" },
  { number: 3, id: tmbChapter, title: "Tes Minat Bakat dan Pilihan Jurusan", description: "Menggunakan hasil TMB untuk mendukung pembahasan pilihan studi dan batas rekomendasi.", active: true, route: "/chapter-3" },
  { number: 4, title: "TKA, UTBK/SNBT, Jalur Masuk, dan Benchmark", description: "Menjelaskan tes, jalur seleksi, program studi, dan data pembanding untuk konsultasi." },
  { number: 5, id: activityChapter, title: "Aktivitas Belajar dan Pendampingan", description: "Menghubungkan KBM, materi, klinik, Motivatalks, Kakak Asuh, dan tindak lanjut siswa.", active: true, route: "/chapter-5" },
  { number: 6, id: tryoutChapter, title: "Tryout, Tes Diagnostik, Kuis, Post-test, Drill, dan Rapor", description: "Menemukan kegiatan tryout, memeriksa akses, membaca hasil, dan menentukan tindak lanjut.", active: true, route: "/chapter-6" },
  { number: 7, id: trackingChapter, title: "Tracker, Attendance, Dashboard, dan Data Studio", description: "Menggunakan data operasional untuk pemantauan siswa dan aktivitas SA.", active: true, route: "/chapter-7" },
  { number: 8, id: accessChapter, title: "Akses, Keamanan, Kendala Sistem, dan Eskalasi", description: "Menangani login, reset, error, salah data, dan jalur bantuan.", active: true, route: "/chapter-8" },
  { number: 9, id: directoryChapter, title: "Directory Sumber dan Evidence", description: "Menemukan link kerja, source registry, transcript, timestamp video, owner, dan periode berlaku.", active: true, route: "/chapter-9" }
];

