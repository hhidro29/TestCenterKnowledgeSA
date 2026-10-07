# Data Structure & Field Dictionary
## SA Knowledge Repository + Internal Benchmark Module

**Tanggal:** 30 September 2026  
**Status:** Draft struktur data untuk validasi dan evaluasi platform  
**Scope:** Knowledge repository internal untuk SA, dengan Internal Benchmark sebagai modul prioritas 3  
**Akses:** Internal dan eksklusif

> Dokumen ini menjelaskan informasi apa yang disimpan, field apa yang dibutuhkan, bagaimana informasi saling terhubung, dan bagian mana yang tidak menjadi tanggung jawab platform.

---

## 1. Tujuan

Membuat struktur data yang dapat membantu SA:

- mencari informasi universitas, program studi, dan jalur penerimaan;
- melihat informasi penerimaan berdasarkan tahun dan jalur;
- menyimpan data historis siswa yang pernah diterima secara anonim;
- memeriksa sumber, tanggal pembaruan, dan status validasi;
- membandingkan input nilai siswa dari sistem eksternal dengan data historis;
- menyimpan rekam konsultasi dan tindak lanjut;
- menggunakan panduan komunikasi yang konsisten.

Struktur ini juga menjadi dasar untuk membandingkan tiga opsi solusi:

1. platform internal/custom;
2. Document360;
3. Guru: Knowledge Management.

---

## 2. Prinsip desain

### 2.1 Platform bukan sistem utama profil siswa

Profil siswa aktif, progres harian, kehadiran, dan riwayat akademik tetap berada di sistem sumber seperti Data Studio atau sistem operasional lain.

Platform ini hanya:

- membaca atau menerima input dari sistem eksternal;
- menggunakan nilai siswa sebagai bahan perbandingan;
- menyimpan snapshot yang dipakai dalam konsultasi;
- menyimpan hasil perbandingan dan follow-up.

Platform tidak menjadi source of truth untuk profil siswa.

### 2.2 Data eksklusif harus tetap internal

- Akses menggunakan akun internal personal.
- Data siswa yang pernah diterima disimpan anonim jika identitas tidak dibutuhkan.
- Akses, perubahan, dan export perlu dikontrol.
- Orang tua dan siswa tidak mengakses database internal secara langsung.

### 2.3 Informasi yang berubah harus memiliki konteks waktu

Timeline, persyaratan, daya tampung, jumlah peminat, dan aturan seleksi harus dikaitkan dengan:

- tahun atau periode;
- jalur penerimaan;
- institusi atau program studi;
- sumber resmi;
- tanggal terakhir dicek;
- status validasi.

### 2.4 Pisahkan content, metadata, dan relasi

Setiap knowledge item terdiri dari:

```text
Knowledge item
├── Content: isi informasi
├── Metadata: sumber, owner, tanggal, status, akses
└── Relations: hubungan dengan universitas, jurusan, jalur, dan record lain
```

Metadata menempel pada setiap artikel, dokumen, atau record yang relevan. Metadata dapat disimpan sebagai field pada item atau sebagai record validasi yang terhubung, tetapi harus terlihat ketika item digunakan.

### 2.5 Satu sumber utama, banyak relasi

Hindari menyalin isi informasi yang sama ke banyak artikel. Simpan satu sumber utama, lalu hubungkan dari halaman atau record lain.

---

## 3. Gambaran arsitektur informasi

```text
Knowledge Repository
│
├── Master Data
│   ├── Universitas
│   ├── Fakultas
│   ├── Program Studi / Jurusan
│   ├── Jenis Jalur
│   └── Institusi Sumber
│
├── Informasi Penerimaan
│   ├── Siklus Penerimaan: tahun + jalur
│   ├── Detail Penerimaan Program Studi
│   ├── Persyaratan
│   ├── Timeline
│   └── Daya Tampung dan Peminat
│
├── Data Historis
│   └── Data Siswa yang Pernah Diterima
│
├── Sumber dan Governance
│   ├── Dokumen/Sumber
│   ├── Status Validasi
│   ├── Riwayat Perubahan
│   └── Aturan Retensi dan Akses
│
├── Panduan SA
│   ├── Cara Membaca Data
│   ├── Cara Menjelaskan Gap
│   ├── Wording Komunikasi
│   └── Panduan Eskalasi
│
└── Rekam Konsultasi
    ├── Snapshot Input Siswa
    ├── Benchmark yang Dipakai
    ├── Hasil Perbandingan
    ├── Rekomendasi
    └── Follow-up
```

---

## 4. Relasi inti

```text
UNIVERSITY
    │ 1:N
    ▼
PROGRAM
    │ 1:N
    ▼
PROGRAM_ADMISSION
    ▲ N:1
    │
ADMISSION_CYCLE ─── N:1 ─── ADMISSION_ROUTE
    │
    ├── 1:N HISTORICAL_ACCEPTED_RECORD
    ├── 1:N ADMISSION_REQUIREMENT
    ├── 1:N ADMISSION_TIMELINE
    ├── N:M SOURCE_DOCUMENT
    └── 1:N CONSULTATION_RECORD

SOURCE_DOCUMENT ─── 1:N ─── VALIDATION_RECORD

CONSULTATION_RECORD
    ├── menggunakan input nilai dari sistem siswa eksternal
    ├── memilih satu atau lebih HISTORICAL_ACCEPTED_RECORD
    ├── menghasilkan hasil perbandingan
    └── menyimpan rekomendasi dan follow-up
```

### 4.1 Hirarki penggunaan

```text
Universitas
└── Program Studi / Jurusan
    └── Tahun + Jalur Penerimaan
        ├── Informasi penerimaan
        ├── Persyaratan dan timeline
        ├── Data siswa yang pernah diterima
        ├── Sumber resmi
        └── Status validasi
```

Contoh:

```text
Universitas Indonesia
└── Psikologi
    └── 2026 — SNBT
        ├── Daya tampung dan jumlah peminat
        ├── Persyaratan dan dokumen
        ├── Timeline
        ├── Data siswa yang pernah diterima
        ├── Sumber resmi
        └── Status validasi
```

---

## 5. Kamus data per objek

## 5.1 `UNIVERSITY` — Universitas

Menyimpan informasi umum institusi yang relatif stabil.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `university_id` | ID | Ya | ID unik internal. |
| `name` | Text | Ya | Nama resmi universitas. |
| `aliases` | Text/list | Tidak | Nama pendek atau nama lain yang biasa digunakan SA. |
| `institution_type` | Select | Ya | PTN, PTS, politeknik, sekolah kedinasan, atau lainnya. |
| `city` | Text | Tidak | Kota atau lokasi utama. |
| `campus_locations` | Text/list | Tidak | Lokasi kampus jika lebih dari satu. |
| `official_website` | URL | Ya | Website resmi institusi. |
| `general_description` | Rich text | Tidak | Ringkasan profil umum. |
| `active_status` | Select | Ya | Aktif, tidak aktif, atau perlu ditinjau. |
| `owner` | User/team | Ya | Pemilik record. |
| `last_checked_at` | Date | Ya | Terakhir kali informasi umum dicek. |
| `source_refs` | Relation | Ya | Sumber yang mendukung informasi. |
| `validation_status` | Select | Ya | Status validasi. |

**Catatan:** informasi spesifik tahun dan jalur tidak disimpan di objek ini. Informasi tersebut disimpan pada `ADMISSION_CYCLE` atau `PROGRAM_ADMISSION`.

## 5.2 `FACULTY` — Fakultas

Objek opsional untuk universitas yang membutuhkan struktur fakultas.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `faculty_id` | ID | Ya | ID unik. |
| `university_id` | Relation | Ya | Universitas pemilik. |
| `name` | Text | Ya | Nama fakultas. |
| `official_url` | URL | Tidak | Halaman resmi fakultas. |
| `active_status` | Select | Ya | Aktif, tidak aktif, atau perlu ditinjau. |
| `source_refs` | Relation | Tidak | Sumber informasi. |

## 5.3 `PROGRAM` — Program Studi/Jurusan

Menyimpan program studi yang menjadi target penerimaan.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `program_id` | ID | Ya | ID unik internal. |
| `university_id` | Relation | Ya | Universitas pemilik. |
| `faculty_id` | Relation | Tidak | Fakultas jika tersedia. |
| `name` | Text | Ya | Nama resmi program studi. |
| `aliases` | Text/list | Tidak | Nama pendek atau variasi penulisan. |
| `degree_level` | Select | Tidak | D3, D4, S1, atau lainnya. |
| `campus_location` | Text | Tidak | Lokasi program studi jika berbeda. |
| `official_url` | URL | Tidak | Halaman resmi program studi. |
| `active_status` | Select | Ya | Aktif, tidak aktif, atau perlu ditinjau. |
| `general_description` | Rich text | Tidak | Ringkasan umum program studi. |
| `source_refs` | Relation | Ya | Sumber yang mendukung informasi. |

## 5.4 `ADMISSION_ROUTE` — Jenis Jalur Penerimaan

Master data jenis jalur yang digunakan berulang kali.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `route_id` | ID | Ya | ID unik. |
| `name` | Text | Ya | Contoh: SNBP, SNBT/UTBK, mandiri, kedinasan. |
| `route_category` | Select | Ya | Nasional, mandiri, kedinasan, atau lainnya. |
| `description` | Rich text | Tidak | Penjelasan umum jalur. |
| `general_requirements` | Rich text | Tidak | Persyaratan umum jika ada. |
| `official_source_refs` | Relation | Ya | Sumber utama jalur. |
| `active_status` | Select | Ya | Aktif atau perlu ditinjau. |

## 5.5 `ADMISSION_CYCLE` — Siklus Penerimaan

Mewakili konteks **universitas + tahun + jalur**.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `cycle_id` | ID | Ya | ID unik. |
| `university_id` | Relation | Ya | Universitas penyelenggara. |
| `year` | Number | Ya | Tahun atau periode penerimaan. |
| `route_id` | Relation | Ya | Jenis jalur. |
| `cycle_name` | Text | Ya | Label yang mudah dibaca, misalnya “SNBT UI 2026”. |
| `cycle_status` | Select | Ya | Draft, aktif, selesai, atau perlu diperbarui. |
| `registration_start` | Date | Tidak | Awal pendaftaran. |
| `registration_end` | Date | Tidak | Akhir pendaftaran. |
| `test_date` | Date/text | Tidak | Jadwal tes jika ada. |
| `result_date` | Date/text | Tidak | Jadwal pengumuman jika ada. |
| `general_requirements_summary` | Rich text | Tidak | Ringkasan persyaratan tingkat siklus. |
| `official_announcement_url` | URL | Ya | Link pengumuman atau sumber resmi. |
| `last_checked_at` | Date | Ya | Terakhir kali dicek. |
| `owner` | User/team | Ya | Pemilik informasi. |
| `validation_status` | Select | Ya | Status validasi. |
| `caveats` | Rich text | Tidak | Catatan perubahan atau batasan. |

## 5.6 `PROGRAM_ADMISSION` — Detail Penerimaan Program Studi

Mewakili konteks **program studi + siklus penerimaan**.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `program_admission_id` | ID | Ya | ID unik. |
| `program_id` | Relation | Ya | Program studi. |
| `cycle_id` | Relation | Ya | Siklus tahun + jalur. |
| `quota` | Number/text | Tidak | Daya tampung jika tersedia. |
| `applicant_count` | Number/text | Tidak | Jumlah peminat jika tersedia. |
| `competition_note` | Rich text | Tidak | Catatan tingkat persaingan. |
| `special_requirements_summary` | Rich text | Tidak | Persyaratan khusus program studi. |
| `portfolio_required` | Boolean/Select | Tidak | Apakah membutuhkan portofolio. |
| `additional_test` | Text | Tidak | Tes tambahan jika ada. |
| `fee` | Number/text | Tidak | Biaya jika relevan dan tersedia. |
| `prospect_note` | Rich text | Tidak | Catatan prospek yang sudah tervalidasi. |
| `risk_note` | Rich text | Tidak | Catatan risiko pilihan. Bukan prediksi otomatis. |
| `source_refs` | Relation | Ya | Sumber pendukung. |
| `last_checked_at` | Date | Ya | Terakhir kali dicek. |
| `validation_status` | Select | Ya | Status validasi. |

## 5.7 `ADMISSION_REQUIREMENT` — Persyaratan

Digunakan jika persyaratan perlu dicari atau difilter satu per satu.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `requirement_id` | ID | Ya | ID unik. |
| `program_admission_id` | Relation | Ya | Detail penerimaan terkait. |
| `requirement_type` | Select | Ya | Nilai, dokumen, portofolio, tes, administrasi, atau lainnya. |
| `title` | Text | Ya | Nama persyaratan. |
| `description` | Rich text | Ya | Penjelasan persyaratan. |
| `mandatory` | Boolean | Ya | Wajib atau opsional. |
| `deadline` | Date/text | Tidak | Batas waktu jika ada. |
| `source_refs` | Relation | Ya | Sumber persyaratan. |
| `last_checked_at` | Date | Ya | Terakhir kali dicek. |
| `validation_status` | Select | Ya | Status validasi. |

## 5.8 `ADMISSION_TIMELINE` — Timeline

Digunakan jika timeline perlu ditampilkan sebagai daftar tahapan.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `timeline_id` | ID | Ya | ID unik. |
| `cycle_id` | Relation | Ya | Siklus penerimaan terkait. |
| `stage` | Select | Ya | Pendaftaran, tes, pengumuman, daftar ulang, atau lainnya. |
| `start_date` | Date | Tidak | Tanggal mulai. |
| `end_date` | Date | Tidak | Tanggal selesai. |
| `date_display` | Text | Ya | Format jika tanggal masih berupa rentang atau belum pasti. |
| `status` | Select | Ya | Belum dibuka, berlangsung, selesai, berubah, atau belum dikonfirmasi. |
| `source_refs` | Relation | Ya | Sumber timeline. |
| `last_checked_at` | Date | Ya | Terakhir kali dicek. |

## 5.9 `HISTORICAL_ACCEPTED_RECORD` — Data Siswa yang Pernah Diterima

Menyimpan data penerimaan historis secara anonim.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `accepted_record_id` | ID | Ya | ID unik record. |
| `program_admission_id` | Relation | Ya | Program studi + tahun + jalur. |
| `anonymous_record_key` | Text | Tidak | ID anonim jika perlu membedakan record tanpa membuka identitas. |
| `acceptance_status` | Select | Ya | Diterima, diterima bersyarat, atau status lain sesuai sumber. |
| `score_total` | Number/text | Tidak | Nilai total sesuai sumber. |
| `score_scale` | Text | Tidak | Skala atau definisi nilai. |
| `score_by_subtest` | Structured object/list | Tidak | Nilai per subtes jika tersedia. |
| `score_type` | Select | Ya | UTBK, Tryout, nilai rapor, nilai agregat, atau lainnya. |
| `data_year` | Number | Ya | Tahun data atau tahun penerimaan. |
| `source_refs` | Relation | Ya | Sumber data. |
| `collected_at` | Date | Ya | Tanggal data dikumpulkan. |
| `validation_status` | Select | Ya | Belum ditinjau, sedang divalidasi, tervalidasi terbatas, tervalidasi, perlu diperbarui, atau tidak sebanding. |
| `validator` | User/team | Tidak | Pihak yang memvalidasi. |
| `validated_at` | Date | Tidak | Tanggal validasi. |
| `comparability_note` | Rich text | Tidak | Apakah data dapat dibandingkan dengan data saat ini. |
| `caveats` | Rich text | Tidak | Batasan penggunaan. |
| `confidentiality_level` | Select | Ya | Internal, restricted, atau sangat terbatas. |

**Aturan:** jangan menyimpan nama, nomor telepon, email, atau identitas pribadi lulusan jika tidak dibutuhkan untuk konsultasi.

## 5.10 `SOURCE_DOCUMENT` — Sumber dan Dokumen

Menyimpan sumber asli dan konteks kepemilikannya.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `source_id` | ID | Ya | ID unik. |
| `title` | Text | Ya | Judul dokumen atau sumber. |
| `source_type` | Select | Ya | Website resmi, surat, dokumen pemerintah, response internal, dashboard, atau lainnya. |
| `url` | URL | Tidak | Link sumber jika tersedia. |
| `owner` | User/team | Ya | Pemilik atau pihak yang bertanggung jawab. |
| `publisher` | Text | Tidak | Institusi penerbit. |
| `publication_date` | Date | Tidak | Tanggal publikasi. |
| `last_checked_at` | Date | Ya | Terakhir kali dicek. |
| `valid_from` | Date | Tidak | Awal periode berlaku. |
| `valid_until` | Date | Tidak | Akhir periode berlaku. |
| `access_level` | Select | Ya | Publik, internal, restricted, atau sangat terbatas. |
| `source_status` | Select | Ya | Aktif, kedaluwarsa, digantikan, atau tidak ditemukan. |
| `notes` | Rich text | Tidak | Catatan sumber. |

## 5.11 `VALIDATION_RECORD` — Validasi

Secara konsep melekat pada knowledge item, tetapi dapat disimpan sebagai record terhubung agar riwayat review dapat dilacak.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `validation_id` | ID | Ya | ID unik. |
| `target_type` | Select | Ya | Jenis item yang divalidasi. |
| `target_id` | Relation/ID | Ya | Item yang divalidasi. |
| `status` | Select | Ya | Belum ditinjau, sedang ditinjau, tervalidasi terbatas, tervalidasi, perlu diperbarui, atau tidak sebanding. |
| `reviewer` | User/team | Ya | Validator. |
| `reviewed_at` | Date | Ya | Tanggal review. |
| `next_review_at` | Date | Tidak | Jadwal review berikutnya. |
| `method` | Rich text | Tidak | Cara validasi dilakukan. |
| `confidence` | Select | Tidak | Tinggi, sedang, rendah, atau belum dinilai. |
| `conflict_note` | Rich text | Tidak | Cara menangani perbedaan antar sumber. |
| `limitation_note` | Rich text | Tidak | Batasan penggunaan. |

## 5.12 `SA_GUIDE` — Panduan untuk SA

Berbentuk artikel atau panduan internal yang membantu SA menggunakan data.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `guide_id` | ID | Ya | ID unik. |
| `title` | Text | Ya | Judul panduan. |
| `question_type` | Select/list | Ya | Jenis pertanyaan yang dijawab. |
| `content` | Rich text | Ya | Isi panduan. |
| `linked_knowledge_refs` | Relation/list | Tidak | Data atau artikel yang dirujuk. |
| `recommended_wording` | Rich text | Tidak | Wording yang disarankan. |
| `avoid_wording` | Rich text | Tidak | Wording yang harus dihindari. |
| `owner` | User/team | Ya | Pemilik panduan. |
| `last_reviewed_at` | Date | Ya | Terakhir kali ditinjau. |
| `validation_status` | Select | Ya | Status validasi. |
| `access_level` | Select | Ya | Internal atau restricted. |

## 5.13 `CONSULTATION_RECORD` — Rekam Konsultasi

Menyimpan snapshot penggunaan knowledge dalam satu kasus konsultasi. Ini bukan database profil siswa.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `consultation_id` | ID | Ya | ID unik sesi atau kasus. |
| `external_student_reference` | Text | Ya | ID dari sistem eksternal atau ID anonim. Jangan menyimpan profil lengkap. |
| `sa_owner` | User | Ya | SA yang menangani. |
| `consultation_at` | Date/time | Ya | Waktu konsultasi. |
| `channel` | Select | Tidak | Chat, WA, telepon, meeting, atau lainnya. |
| `parent_question` | Rich text | Ya | Pertanyaan atau konteks orang tua. |
| `target_university` | Relation | Ya | Universitas target. |
| `target_program` | Relation | Ya | Program studi target. |
| `target_cycle` | Relation | Ya | Tahun + jalur yang dibandingkan. |
| `student_score_snapshot` | Structured object | Ya | Nilai total/subtes yang dipakai pada saat konsultasi. |
| `student_data_source` | Relation/text | Ya | Sistem sumber atau cara input. |
| `student_data_as_of` | Date | Ya | Tanggal data siswa berlaku. |
| `benchmark_refs` | Relation/list | Ya | Record historis yang digunakan. |
| `comparison_summary` | Rich text | Ya | Ringkasan posisi dan gap. |
| `risk_note` | Rich text | Tidak | Catatan risiko dan ketidakpastian. |
| `recommendation` | Rich text | Ya | Langkah berikutnya atau pilihan pembanding. |
| `communication_summary` | Rich text | Tidak | Ringkasan jawaban yang disampaikan. |
| `follow_up_status` | Select | Ya | Belum ditindaklanjuti, berjalan, selesai, atau perlu eskalasi. |
| `follow_up_owner` | User/team | Tidak | PIC tindak lanjut. |
| `follow_up_due_at` | Date | Tidak | Tenggat follow-up. |
| `source_version_snapshot` | Structured object | Ya | Versi/tanggal knowledge yang digunakan. |
| `retention_until` | Date | Tidak | Batas penyimpanan. |
| `access_level` | Select | Ya | Internal atau restricted. |

**Prinsip:** simpan data yang diperlukan untuk memahami keputusan konsultasi, bukan seluruh riwayat siswa.

## 5.14 `COMPLAINT_ESCALATION` — Komplain dan Eskalasi

Dapat menjadi modul fase berikutnya atau ditambahkan jika rekam konsultasi juga mencakup komplain.

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `case_id` | ID | Ya | ID kasus. |
| `consultation_id` | Relation | Tidak | Rekam konsultasi terkait. |
| `category` | Select | Ya | Akademik, layanan, jadwal, informasi penerimaan, atau lainnya. |
| `summary` | Rich text | Ya | Ringkasan komplain. |
| `status` | Select | Ya | Baru, ditinjau, dieskalasi, menunggu, selesai, atau ditutup. |
| `current_owner` | User/team | Ya | PIC saat ini. |
| `escalation_target` | User/team | Tidak | BM, Kak Nana, atau tim terkait. |
| `next_action` | Rich text | Ya | Langkah berikutnya. |
| `follow_up_at` | Date | Tidak | Jadwal follow-up. |
| `resolution_note` | Rich text | Tidak | Penyelesaian atau keputusan. |

---

## 6. Metadata umum untuk setiap knowledge item

Metadata berikut sebaiknya tersedia pada setiap artikel, dokumen, atau record yang relevan:

| Metadata | Tujuan |
|---|---|
| `owner` | Menentukan pihak yang bertanggung jawab. |
| `source_refs` | Menunjukkan sumber asli. |
| `publication_date` | Menunjukkan kapan informasi diterbitkan. |
| `last_checked_at` | Menunjukkan kapan informasi terakhir diverifikasi. |
| `valid_from` / `valid_until` | Menentukan periode berlaku. |
| `validation_status` | Menunjukkan tingkat validasi. |
| `reviewer` | Menunjukkan siapa yang melakukan review. |
| `next_review_at` | Menentukan kapan harus ditinjau lagi. |
| `access_level` | Mengatur akses publik, internal, atau restricted. |
| `version` | Menelusuri perubahan isi. |
| `tags` | Membantu pencarian dan filter. |
| `caveats` | Menjelaskan batasan penggunaan. |
| `related_items` | Menghubungkan item terkait. |

Metadata tidak cukup hanya ditulis di akhir artikel. Idealnya metadata dapat digunakan untuk filter seperti:

- tampilkan informasi jalur mandiri yang masih aktif;
- tampilkan data yang terakhir dicek lebih dari 30 hari lalu;
- tampilkan benchmark yang sudah tervalidasi;
- tampilkan semua informasi untuk Psikologi UI 2026;
- tampilkan sumber resmi yang perlu diperbarui.

---

## 7. Contoh record end-to-end

### 7.1 Struktur objek

```text
University: Universitas Indonesia
└── Program: Psikologi
    └── Admission Cycle: 2026 — SNBT
        └── Program Admission
            ├── Requirements
            ├── Timeline
            ├── Quota and applicant count
            ├── Historical accepted records
            ├── Official sources
            └── Validation status
```

### 7.2 Contoh informasi penerimaan

```yaml
university: Universitas Indonesia
program: Psikologi
year: 2026
route: SNBT
status: perlu_dicek
quota: "isi jika tersedia"
applicant_count: "isi jika tersedia"
requirements:
  - type: dokumen
    description: "..."
timeline:
  registration: "..."
  test: "..."
  result: "..."
source:
  url: "https://contoh-sumber-resmi.id"
  last_checked_at: "2026-09-30"
validation:
  status: belum_ditinjau
  reviewer: null
caveats: "Data bersifat per siklus penerimaan dan perlu dicek ulang."
```

### 7.3 Contoh data siswa yang pernah diterima

```yaml
program_admission: "Psikologi UI — SNBT 2026"
anonymous_record_key: "accepted-001"
acceptance_status: diterima
score_type: UTBK
score_total: "isi jika tersedia"
score_by_subtest:
  - subtest: "Penalaran Umum"
    score: "isi jika tersedia"
source: "Responses lulusan / sertifikat UTBK"
collected_at: "2026-09-30"
validation_status: sedang_ditinjau
caveats: "Benchmark historis; bukan nilai aman atau jaminan diterima."
```

### 7.4 Contoh rekam konsultasi

```yaml
consultation_id: "consult-2026-0001"
external_student_reference: "student-ref-001"
sa_owner: "SA-001"
consultation_at: "2026-09-30T10:00:00+07:00"
parent_question: "Apakah nilai siswa sudah mendekati target Psikologi UI?"
target:
  university: "Universitas Indonesia"
  program: "Psikologi"
  year: 2026
  route: "SNBT"
student_score_snapshot:
  score_total: "isi"
  score_by_subtest: "isi"
student_data_as_of: "2026-09-29"
benchmark_refs:
  - "accepted-001"
comparison_summary: "..."
recommendation: "..."
follow_up_status: belum_ditindaklanjuti
access_level: restricted
```

---

## 8. Scope MVP dan fase lanjutan

### 8.1 Masuk MVP

- master data universitas dan program studi;
- jenis jalur penerimaan;
- siklus penerimaan berdasarkan tahun + jalur;
- informasi persyaratan dan timeline;
- data siswa yang pernah diterima secara anonim;
- sumber, tanggal update, dan status validasi;
- pencarian dan filter;
- input nilai siswa sementara;
- comparison view sederhana;
- rekam konsultasi;
- akses internal dan aturan dasar retensi.

### 8.2 Fase berikutnya

- integrasi langsung dengan Data Studio atau sistem siswa;
- gap otomatis per subtes;
- proyeksi target score;
- rekomendasi belajar otomatis;
- ranking pilihan dan warning risiko;
- AI summary dengan citation ke sumber asli;
- komplain dan eskalasi terintegrasi;
- analytics pencarian gagal dan kebutuhan yang belum terjawab;
- workflow approval dan review multi-level.

### 8.3 Tidak termasuk dalam platform

- database profil siswa utama;
- sistem kehadiran;
- progres harian sebagai source of truth;
- sistem akademik operasional;
- riwayat lengkap komunikasi siswa;
- akses publik ke data benchmark internal.

---

## 9. Kriteria platform yang harus diuji

Platform dianggap mendukung struktur ini jika dapat:

1. menyimpan field terstruktur, bukan hanya artikel bebas;
2. menghubungkan universitas, program, tahun, jalur, dan data historis;
3. menampilkan metadata pada item yang digunakan;
4. memfilter berdasarkan beberapa field sekaligus;
5. menyimpan data anonim dengan permission internal;
6. menerima input eksternal tanpa menjadikan platform sebagai student database;
7. menyimpan consultation snapshot;
8. menampilkan sumber dan versi data yang digunakan;
9. memiliki workflow update dan validasi;
10. membatasi akses, perubahan, dan export;
11. menyediakan audit trail atau riwayat perubahan;
12. dapat diperluas untuk integrasi dan comparison view.

### 9.1 Definisi label dukungan

| Label | Definisi |
|---|---|
| Kuat | Fitur tersedia secara native, dapat memenuhi kebutuhan utama, dan tidak membutuhkan workaround besar. |
| Partial | Dapat dilakukan dengan konfigurasi, template, plugin, atau workaround; ada keterbatasan. |
| Lemah | Tidak tersedia secara native atau membutuhkan custom development besar di luar fungsi platform. |

### 9.2 Effort yang perlu dinilai

Untuk setiap platform, pisahkan effort menjadi:

- setup awal;
- desain struktur dan template;
- migrasi data historis;
- input data penerimaan tahunan;
- validasi dan governance;
- integrasi sistem eksternal;
- pembuatan comparison view;
- maintenance dan update;
- training SA;
- biaya lisensi dan custom development.

---

## 10. Pertanyaan yang masih perlu diputuskan

1. Apakah data siswa yang pernah diterima disimpan per individu anonim atau sebagai agregat/rentang?
2. Apakah input nilai siswa aktif cukup manual pada MVP?
3. Apakah hasil perbandingan perlu menyimpan nilai mentah atau cukup ringkasan dan gap?
4. Berapa lama rekam konsultasi disimpan?
5. Siapa yang boleh melihat rekam konsultasi?
6. Apakah SA boleh mengedit hasil konsultasi setelah disimpan?
7. Siapa data owner dan validator untuk setiap jenis knowledge?
8. Berapa umur informasi sebelum otomatis ditandai “perlu dicek”?
9. Apakah `FACULTY`, `ADMISSION_REQUIREMENT`, dan `ADMISSION_TIMELINE` perlu menjadi objek terpisah sejak MVP, atau cukup field pada artikel/record?
10. Apakah platform pilihan dapat menyimpan relasi dan snapshot konsultasi tanpa custom module?

---

## 11. Keputusan kerja yang direkomendasikan

Untuk MVP, gunakan model berikut:

```text
Master Data
  → University
  → Program
  → Admission Route

Admission Knowledge
  → Admission Cycle
  → Program Admission
  → Requirements and Timeline

Historical Data
  → Historical Accepted Record

Governance
  → Source Document
  → Validation Record

Usage
  → Consultation Record
```

Keputusan pentingnya:

> **Platform menyimpan knowledge yang terstruktur dan rekam konsultasi, tetapi tidak menggantikan sistem utama profil siswa.**

