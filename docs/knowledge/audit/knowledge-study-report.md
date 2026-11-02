# Laporan Knowledge Study — SA Knowledge Brain Academy

**Tanggal audit:** 2 November 2026  
**Mode:** read-only  
**Ruang lingkup:** `knowledge-base/`, katalog dan ingest list, dokumen tracking, `knowledge-hub/`, `chatbot/`, serta file lokal `Downloads` yang dirujuk artikel.

## 1. Ringkasan eksekutif

Project memiliki tiga lapisan yang perlu dibedakan:

1. **Knowledge base sumber** di `knowledge-base/`, berisi artikel fakta, artikel operasional, FAQ, transcript, appendix, katalog, dan governance.
2. **Knowledge Hub v1** di `knowledge-hub/`, sebagai prototype search-first dengan katalog runtime kanonis `knowledge-hub/data.js`.
3. **Chatbot** di `chatbot/`, yang mengambil proyeksi Knowledge Hub dan file knowledge base untuk retrieval lokal atau jawaban model.

`knowledge-hub-handbook-v2/` adalah prototype terpisah untuk pilot Handbook; README-nya menyatakan v2 tidak mengubah katalog v1. Isi v2 tidak boleh diasumsikan otomatis menjadi evidence chatbot.

Knowledge paling kuat berada pada penerimaan kampus dan SNBT/SNBP, TKA dan kedinasan, onboarding/profiling/Konsultasi Awal, TMB, tryout, rapor, tracker, eskalasi BAC 12 SMA, serta routing sumber kerja SA.

Risiko terbesar adalah informasi yang berubah menurut episode/rilis (jadwal, kuota, akses, status wajib), banyak sumber partial atau hanya index/link, snapshot lama yang belum memiliki mekanisme supersession konsisten, dan pencampuran informasi student-facing dengan SOP internal.

Untuk pertanyaan **“Siswa kelas 12 yang mengikuti SNBT harus mengikuti tryout apa?”**, evidence tidak mendukung satu jawaban universal tanpa periode. Rujukan operasional mengarahkan SA ke Calendar Event/rilis terbaru; snapshot sebelumnya memuat TO UTBK/SNBT Regular dan beberapa event TKA. Jawaban harus menyebut konteks episode/periode, bukan mengubah daftar historis menjadi kewajiban aktif.

## 2. Peta struktur knowledge base

### 2.1 Domain dan folder

| Area | Isi utama | Status penggunaan |
|---|---|---|
| `00-governance/` | aturan ingestion, update, batas artikel partial | governance, bukan evidence student-facing |
| `00-catalog/` | manifest, source register, overview, topic map, ingest/exclude list | katalog dan metadata |
| `01-kejarkedinasan/` | regulasi, formasi, jadwal, SSCASN, profil instansi | student-facing, sebagian SOP rujukan |
| `02-pejuang-kampus-impian/` | SNBT/SNBP, SNPMB, daya tampung, prodi, jalur mandiri | student-facing |
| `03-pendekar-tka/` | kebijakan, kerangka asesmen, mapel TKA, FAQ | student-facing/shared |
| `04-bac-12-sma/` | onboarding, profiling, konsultasi, TMB, tryout, tracker, transcript, Weekly Sync | campuran student-facing, konsultasi, operasional |
| `05-math-champs/` | guideline kelas Math Champs dan form terkait | student-facing/operasional terbatas |
| `06-brain-academy-online/` | jadwal belajar dan sumber BAO | student-facing/operasional |
| `90-appendices/` | screenshot, kalender, webinar, data tambahan | supplemental; tidak default kecuali tercantum |
| `99-archive/` | pointer arsip sumber | tidak diindeks default |

### 2.2 Bentuk artikel dan runtime

Inventaris Markdown yang diperiksa berjumlah **209 file** termasuk katalog, governance, profile, dan arsip. Distribusi utama `doc_type`: 71 `source_document`, 40 `internal_ops_article`, 33 `internal_training_transcript`, 24 `supplemental_appendix`, 13 `internal_presentation_extraction`, 6 `profile_overview`, 6 metadata source register, dan 4 question bank.

Katalog runtime Knowledge Hub melaporkan **98 active articles, 157 FAQs, 1 Ops Note, dan 216 intent queries**. Angka ini adalah katalog runtime, bukan jumlah file Markdown.

`knowledge-base/README.md` menetapkan retrieval default memakai overview/cross-profile summary, profile, dan folder `01-facts/`. `03-unverified-links.md`, source register, dan appendix dikecualikan kecuali appendix disebut eksplisit pada `ingest-default.txt`; jadwal tryout 2026/2027 adalah pengecualian yang dicatat README.

`chatbot/README.md` dan `chatbot/generate-bundled-data.mjs` menjelaskan bahwa chatbot menggunakan proyeksi Knowledge Hub dan file knowledge base. Bundle generated tidak boleh diedit manual.

## 3. Peta domain student-facing dan SA-operational

| Domain | Student-facing / aman dibawakan | SA-operational / internal | Batas penting |
|---|---|---|---|
| Onboarding & Konsultasi Awal | tujuan, persiapan, profiling, action plan | form internal, response sheet, SCMS/Student Tower, eskalasi | jangan membagikan tracker/sheet |
| Profiling & TMB | cara akses, tujuan, pembacaan umum | response, User Serial/email, reset, matching | bukan diagnosis/keputusan final |
| TKA & SNBT | struktur tes, aturan resmi, pilihan mapel, persiapan | Calendar Event, rilis episode, kuota, monitoring | jadwal/rilis harus diverifikasi |
| Tryout & evaluasi | tujuan tryout, format UTBK/TKA yang diekstrak | kalender, link partisipasi, dashboard, rapor regional | event berbeda dapat berbeda |
| Kuis, Post-test, Drill | langkah belajar | attendance, dashboard, HMS, monitoring, anulir | dashboard belum tentu final |
| Skor, rapor & tracker | cara membaca hasil dan tren | Data Studio, tracker, regional sheet | jangan menyalin data pribadi |
| Security & eskalasi | langkah aman, tidak membagikan password | reset, BAO linking, pelaporan, bukti error | jangan meminta password/PIN |
| Kedinasan | regulasi, formasi, tahapan per instansi | sumber kerja dan pengecekan status | jangan generalisasi instansi |

Metadata penting: `audience_scope`, `shareability`, `knowledge_type`, `source_status`, dan `extraction_status`. Artikel partial wajib membawa source URL dan catatan gap; preflight memeriksa aturan ini.

## 4. Matriks coverage sumber ke artikel

### 4.1 Ringkasan coverage sumber

`source-register.csv` berisi **193 baris sumber**.

| Kelompok status | Jumlah | Cara memakai |
|---|---:|---|
| `verified_extracted` | 71 | evidence sesuai metadata dan periode |
| `partially_extracted` / `partial` / `opened_partial` | 75 | hanya fakta tertulis; cek gap dan rilis terbaru |
| `listed_only` | 33 | index/link saja, bukan bukti isi |
| `unfetched_error` | 4 | tidak boleh menjadi fakta |
| `not_found` | 1 | tidak boleh menjadi fakta |
| `metadata_only` | 1 | metadata saja |
| status verified/internal lain | 8 | gunakan sesuai provenance dan akses |

### 4.2 Coverage per domain penting

| Sumber asli / periode | Artikel terkait | FAQ / route | Audience / shareability | Gap atau risiko |
|---|---|---|---|---|
| Panduan UTBK-SNBT 2026 | `02-pejuang-kampus-impian/01-facts/01-panduan-pendaftaran-snbt-2026.md` | route persiapan UTBK/SNBT | student-facing / student-safe | hanya berlaku siklus tersebut |
| Analisis Hasil Lapor Diri SNBT 2026 | `02-pejuang-kampus-impian/01-facts/15-snbt-2026-historical-subtest-analysis.md` | route benchmark | student-facing / student-safe | benchmark cohort, bukan cutoff |
| Calendar Event Tryout Ruanguji AY 2026/2027 | `04-bac-12-sma/01-facts/86-calendar-event-tryout-ruanguji-2026-2027.md` | route tryout/jadwal | sa_operational / internal | kalender rencana; cek rilis aktif |
| Workbook tab Tryout BAC | `04-bac-12-sma/01-facts/20-bac-tryout-directory-ay-2026-2027.md` | routing link/dashboard/rapor | sa_operational / internal | live sheet/dashboard tidak disalin |
| Master jadwal tryout BAC | `04-bac-12-sma/01-facts/21-bac-master-jadwal-tryout-ay-2026-2027.md` dan appendix jadwal | route jadwal | sa_operational / internal | cached IMPORTRANGE |
| QnA Mega Tryout TKA 2026 | `04-bac-12-sma/01-facts/87-faq-mega-tryout-tka-sma-2026.md` | FAQ event v1/v2 | sa_operational / internal | event-specific |
| Panduan Tryout UTBK Onsite | `04-bac-12-sma/01-facts/09-panduan-akses-tryout-utbk-onsite.md` | route akses tryout | student-facing / student-safe | viewer slide; detail perlu verifikasi |
| Profiling/Konsultasi | `04-bac-12-sma/01-facts/10/11/12...`, 71, 84, 85 | route profiling/konsultasi | mixed | form dan akses time-sensitive |
| TKA kebijakan/mapel | `03-pendekar-tka/01-facts/01–10`, 04-BAC TKA articles | route TKA/mapel SMK | student-facing/shared | deck/transcript sebagian partial |
| Kedinasan | `01-kejarkedinasan/01-facts/01–28` | route per instansi | student-facing | prosedur berbeda tiap instansi |

### 4.3 Sumber lokal Downloads yang relevan

File lokal yang dirujuk artikel dan ditemukan pada host antara lain:

- `/Users/fa-2400/Downloads/[BAC] Kumpulan Link Kesiswaan AY 26_27.xlsx`
- `/Users/fa-2400/Downloads/File Knowledge/BAC Handbook 12 SMA.pdf`
- `/Users/fa-2400/Downloads/File Knowledge/Fasilitas Brain Academy Center AY 26_27.pdf`
- `/Users/fa-2400/Downloads/File Knowledge/Panduan Ketentuan Sertifikat di SNBP.pptx`
- `/Users/fa-2400/Downloads/File Knowledge/Statistik Nilai UTBK - SNBT.pdf`
- `/Users/fa-2400/Downloads/[BAC] Panduan Pengisian - Profiling Siswa Kelas 12 dan UTBK.pdf`
- `/Users/fa-2400/Downloads/Rekap Info di Grup WA Student Advisor.docx`

Keberadaan file lokal tidak berarti seluruh isi sudah ditranskripsi. Evidence tetap mengikuti artikel ekstraksi dan metadata statusnya.

## 5. Daftar artikel duplikat atau tumpang tindih

Tidak ditemukan duplicate title literal pada 209 Markdown. Tumpang tindih substantif yang perlu dikelola:

1. **Tryout:** `19-jadwal-tryout-bac-visible`, `20-bac-tryout-directory`, `21-bac-master-jadwal-tryout`, `86-calendar-event-tryout`, appendix jadwal, serta artikel generated Knowledge Hub membahas kalender/akses yang beririsan.
2. **Mega Tryout TKA:** QnA workbook, `87-faq-mega-tryout-tka-sma-2026.md`, `60-weekly-sync-sa-mega-to-tka-rapor-2026-08-11.md`, dan FAQ v1/v2 mengulang kewajiban, cicilan, lima mapel, dan hari pengerjaan.
3. **Profiling/Konsultasi:** `10-onboarding`, `11-konsultasi-awal`, `12-profiling`, Weekly Sync, dan panduan Kakak Asuh mengulang alur dan peran.
4. **TKA mapel SMK:** artikel TKA pusat, webinar 30 Juli, webinar 28 Agustus, dan artikel mapel pendukung beririsan.
5. **Rapor/tracker/dashboard:** indeks sumber dan Weekly Sync sama-sama menjelaskan lokasi data, tetapi isi live tidak boleh dipindahkan ke artikel fakta.

`superseded: true` hanya muncul pada dua record Markdown; belum ada mekanisme umum yang otomatis mengarsipkan artikel lama ketika kalender/rilis baru datang.

## 6. Daftar sumber partial, metadata-only, dan failed

### 6.1 Statistik

Pada level Markdown terdapat **51 `partially_extracted`**, **27 `fully_extracted`**, dan **1 `metadata_only`**; file katalog/profile memiliki metadata berbeda. Pada source register terdapat 75 baris partial/opened_partial/partially_extracted, 33 listed_only, 4 unfetched_error, dan 1 not_found.

### 6.2 Contoh partial berisiko tinggi

- `03-pendekar-tka/01-facts/08-mata-pelajaran-pilihan-tka-sma-2026-reference.md` — tidak memiliki local evidence path.
- `04-bac-12-sma/01-facts/09-panduan-akses-tryout-utbk-onsite.md` — viewer slide; aturan sistem/link perlu verifikasi.
- `04-bac-12-sma/01-facts/20-bac-tryout-directory-ay-2026-2027.md` — index link, bukan isi live dashboard.
- `04-bac-12-sma/01-facts/21-bac-master-jadwal-tryout-ay-2026-2027.md` — cached workbook.
- Weekly Sync/Sosialisasi 04-BAC — ASR; istilah ambigu perlu timestamp.
- Appendix webinar TKA — teks deck terbaca, grafik dan rekaman belum ditranskripsi.

`listed_only` adalah metadata URL, bukan evidence. Contoh failed/not-found tercatat untuk beberapa regulasi TKA dan FAQ STAN. Preflight partial source lulus, tetapi memberi warning **51 partial record tanpa local evidence path**.

## 7. Evaluasi query pencarian

Preflight Knowledge Hub melaporkan **216/216 intent queries**, **18/18 search behavior cases**, **82/82 short-question cases**, dan **8/8 long-question confidence cases** lulus. Ini menunjukkan routing katalog baik, bukan jaminan informasi operasional selalu terbaru.

| Query audit | Artikel/route | Jawaban | Audience | Gap/risiko |
|---|---|---|---|---|
| panduan konsultasi awal kelas 12 | `11-konsultasi-awal`, `71-panduan-kakak-asuh`, route chatbot | Ya | consultation/internal | detail teknis dan form berubah |
| TMB sudah rilis belum | `13-tes-minat-bakat`, rekap WA, route TMB | Ya, bersyarat | internal/consultation | status rilis time-sensitive |
| materi IPS tidak ada di bank aktivitas cetak | rekap WA, route materi IPS | Ya | internal | arahkan ke digital; akses perlu cek |
| siswa SMK wajib pilih mapel program keahlian | TKA mapel reference, `75-sosialisasi...`, route SMK | Ya | shared/student-facing | matriks mapel/rapor perlu cek |
| skor leaderboard beda dengan rapor | rekap WA, monitoring skor | Ya | internal | nilai murni vs berbobot; jangan sebar dashboard |
| kuis bisa dikerjakan di luar sesi | `70-weekly-sync...`, `85-weekly-sync...` | Ya | internal | berbeda menurut sesi/program |
| kapan Konsultasi Awal harus selesai | profiling/konsultasi, rekap WA, Weekly Sync | Parsial | internal | tidak ada deadline universal |
| bagaimana cara mengunci konsultasi di SCMS | Weekly Sync/Question Bank | Tidak lengkap | internal | prosedur UI stabil belum tersedia |
| apa yang harus ditulis di Catatan Kakak Asuh | `71-panduan-kakak-asuh`, question bank/jawaban | Prinsip tersedia | internal | field-level dan status perlu dipisahkan |
| menangani siswa belum mengerjakan tryout | directory, `36-weekly-sync...attendance...`, `85-weekly-sync...` | Ya untuk alur umum | internal | dashboard belum tentu final |

### 7.1 Query tryout/SNBT

Pertanyaan **“Siswa kelas 12 yang mengikuti SNBT harus mengikuti tryout apa?”** tercatat persis sebagai `testQuery` pada workflow tryout di `knowledge-hub-handbook-v2/handbook-v2.js`. Snapshot v2 menyebut Mega TO TKA Regular Episode 1, TO SNBT Regular Episode 1, TO TKA Premium Episode 3, dan TO SNBT Regular Episode 2.

Evidence runtime yang lebih luas:

- `04-bac-12-sma/01-facts/20-bac-tryout-directory-ay-2026-2027.md` memetakan TO TKA dan TO UTBK Regular berbagai episode.
- `04-bac-12-sma/01-facts/86-calendar-event-tryout-ruanguji-2026-2027.md` mencatat UTBK Regular episode 1–8 dan Premium episode 1–20 sebagai rencana AY 2026/2027.

Jawaban aman: arahkan ke **tryout UTBK/SNBT pada Calendar Event dan rilis aktif**; sebut episode hanya sebagai contoh historis bila periodenya sama. Jangan menjawab “wajib mengikuti X” tanpa nama event, periode, dan sasaran peserta.

## 8. Gap knowledge yang paling penting

### Prioritas tinggi

1. **Katalog tidak sinkron:** `knowledge-base/README.md` masih menyebut 6 profil, 100 link, dan 50 dokumen, sedangkan `manifest.json` memuat 8 profil dan source register 193 baris.
2. **Single source of truth jadwal/episode:** kalender, master cached, directory, FAQ, Weekly Sync, dan Handbook v2 dapat menampilkan snapshot berbeda.
3. **Deadline Konsultasi Awal dan prosedur SCMS:** evidence belum cukup stabil untuk jawaban presisi.
4. **Index versus evidence:** banyak artikel hanya memberi link/routing; status ini perlu terlihat jelas di retrieval.
5. **TMB/status rilis:** tidak boleh dijawab “sudah rilis” tanpa tanggal/rilis.

### Prioritas menengah

6. Transcript canonical versus ASR parsial perlu timestamp untuk istilah/angka ambigu.
7. Field-level schema Catatan Kakak Asuh/SCMS belum konsisten.
8. Coverage dashboard/rapor live tersedia sebagai routing, bukan isi data.
9. Mekanisme supersession baru tampak pada dua record.
10. Local evidence path belum tersedia pada 51 partial record.

## 9. Risiko kebocoran SOP atau informasi internal

- Data Studio, tracker, sheet partisipasi, rapor regional, dan form internal tidak boleh dikirim ke siswa/orang tua kecuali ditandai student-safe.
- Jangan menyalin email, User Serial, skor individual, attendance, atau response sheet ke knowledge base/chat publik.
- Password/PIN tidak boleh diminta atau disimpan SA.
- Prosedur verifikasi cicilan yang berasal dari QnA lama harus mengikuti rilis aktif; jangan membuat kanal baru.
- Median cohort/weighted score bukan passing grade atau jaminan diterima.
- Student Tower fixtures adalah data sintetis, bukan data siswa nyata.
- Sumber partial tidak boleh dilengkapi dengan asumsi.

## 10. Rekomendasi tahap berikutnya

1. Sinkronkan README, overview, manifest, source register, dan ingest list pada satu snapshot tanggal.
2. Tetapkan registry supersession dengan `effective_from`, `effective_until`, dan `supersedes` untuk jadwal/episode/FAQ.
3. Tambahkan evidence-backed article/FAQ untuk deadline Konsultasi Awal, prosedur SCMS, dan field Catatan Kakak Asuh; jangan mengisi sebelum sumber tersedia.
4. Pertahankan mode student-safe dan SOP internal; pastikan filtering `audience_scope`/`shareability` berlaku pada route deterministik.
5. Jadikan Calendar Event/rilis aktif sebagai primary route untuk query tryout/SNBT.
6. Tambahkan audit otomatis konflik tanggal/status antar artikel/entity.
7. Labeli index-only article sebagai index, bukan evidence isi sumber.
8. Tambahkan regression cases untuk pertanyaan wajib/episode, SNBT versus TKA, dan query tanpa tahun/periode.
9. Tambahkan local evidence path bila file Downloads tersedia; jika tidak, simpan catatan bahwa evidence hanya online.
10. Setelah governance diperbaiki, baru regenerate bundle atau mengubah prototype.

## 11. Daftar file dan sumber yang dipakai

### Katalog, governance, dan tracking

- `knowledge-base/README.md`
- `knowledge-base/00-governance/README.md`
- `knowledge-base/00-governance/UPDATE-GUIDE.md`
- `knowledge-base/00-catalog/manifest.json`
- `knowledge-base/00-catalog/source-register.csv`
- `knowledge-base/00-catalog/ingest-default.txt`
- `knowledge-base/00-catalog/ingest-partial.txt`
- `knowledge-base/00-catalog/exclude-from-ingest.txt`
- `knowledge-base/00-catalog/overview.md`
- `knowledge-base/00-catalog/cross-profile-summary.md`
- `knowledge-base/00-catalog/sa-topic-map-bac.md`
- `docs/knowledge/BAC-tab-extraction-tracker-2026-10-27.csv`
- `docs/knowledge/Tracking Ekstraksi BAC dan Webinar - 2026-10-27.md`

### Runtime/prototype

- `README.md`
- `knowledge-hub/README.md`, `knowledge-hub/data.js`, acceptance scripts
- `chatbot/README.md`, `chatbot/server.mjs`, `chatbot/knowledge-hub-adapter.mjs`, `chatbot/generate-bundled-data.mjs`
- `knowledge-hub-handbook-v2/README.md`, `knowledge-hub-handbook-v2/handbook-v2.js`

### Domain knowledge

- `knowledge-base/01-kejarkedinasan/`
- `knowledge-base/02-pejuang-kampus-impian/`
- `knowledge-base/03-pendekar-tka/`
- `knowledge-base/04-bac-12-sma/`
- `knowledge-base/05-math-champs/`
- `knowledge-base/06-brain-academy-online/`
- `knowledge-base/90-appendices/`

### Validasi

`npm run preflight` di `knowledge-hub/` lulus seluruh acceptance suite yang tersedia: article structure, governance, partial source, repository, intent, content substance, admissions, university catalog, homepage discovery, transcript render, search behavior, recommendations, question search, long-question search, dan anchor reveal. Warning yang tersisa: **51 partial record tanpa local evidence path**; warning ini tidak menggagalkan preflight.
