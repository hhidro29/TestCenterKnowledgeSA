# Handover — SA Knowledge Portal & Prioritas 3

**Tanggal terakhir diperbarui:** 30 September 2026  
**Status dokumen:** Handover kerja dan sumber keputusan  
**Bahasa kerja:** Bahasa Indonesia  
**Akses data:** Internal dan eksklusif; bukan untuk akses publik

> Dokumen ini merangkum konteks, keputusan, temuan, wording, artefak, dan pekerjaan lanjutan dari seluruh pembahasan. Gunakan dokumen ini sebagai titik awal handover tanpa perlu membaca seluruh histori chat.

---

## 1. Tujuan proyek

Mengeksplorasi kebutuhan dan rancangan **SA Knowledge Portal**, yaitu platform internal yang membantu SA:

- mencari informasi terkait target kuliah dan penerimaan;
- menemukan data siswa yang pernah diterima di kampus atau jurusan tertentu;
- membandingkan posisi siswa saat ini dengan data historis yang relevan;
- memeriksa sumber, tanggal pembaruan, dan status validasi informasi;
- menjelaskan hasil konsultasi kepada orang tua secara konsisten;
- menangani pertanyaan dan komplain dengan konteks serta eskalasi yang jelas.

Fokus awal yang paling konkret adalah **Prioritas 3: Internal Benchmark Tool**. Namun, pembahasan menunjukkan bahwa benchmark tidak berdiri sendiri. Benchmark perlu berada di dalam portal yang juga memuat informasi jalur penerimaan, dokumen resmi, metadata validasi, dan panduan komunikasi.

---

## 2. Keputusan dan prinsip yang sudah disepakati

### 2.1 Tool bersifat internal

Data yang digunakan bersifat eksklusif. Platform nantinya hanya digunakan oleh SA dan pihak internal yang diberi kewenangan.

Implikasi:

- bukan knowledge base publik;
- akses perlu menggunakan akun internal personal;
- data lulusan sebaiknya dianonimkan jika identitas tidak diperlukan;
- perlu ada role, permission, audit log, dan aturan export;
- orang tua atau siswa menerima hasil interpretasi yang relevan, bukan akses langsung ke database internal.

### 2.2 Platform bukan sistem utama profil siswa

Profil siswa aktif, progres harian, kehadiran, dan riwayat akademik tetap berada di sistem sumber yang sudah ada. Platform knowledge tidak menjadi source of truth untuk data tersebut.

Namun, hasil penggunaan tool perlu disimpan sebagai **rekam konsultasi**. Yang disimpan adalah snapshot dan konteks konsultasi, bukan profil siswa lengkap.

Rekam konsultasi minimal berisi:

- reference ID siswa dari sistem eksternal atau ID anonim;
- SA yang melakukan konsultasi;
- tanggal dan waktu konsultasi;
- pertanyaan atau konteks orang tua;
- target kampus, jurusan, tahun, dan jalur;
- nilai atau skor siswa yang digunakan pada saat itu;
- benchmark historis yang dijadikan referensi;
- ringkasan perbandingan dan gap;
- rekomendasi atau langkah berikutnya;
- status follow-up;
- sumber dan versi data yang digunakan.

Dengan demikian, platform menyimpan **consultation snapshot**, bukan student profile.

### 2.3 Prioritas 3 bukan sekadar “database benchmark”

Database lulusan adalah salah satu modul penting. Kebutuhan sebenarnya adalah membantu SA menjawab:

> “Berdasarkan data historis yang relevan, posisi siswa saat ini seperti apa, gap-nya di mana, dan pilihan apa yang perlu dipertimbangkan?”

Benchmark harus dipahami sebagai **data historis dan referensi konsultasi**, bukan:

- nilai aman;
- prediksi final;
- jaminan diterima;
- keputusan otomatis tentang pilihan siswa.

### 2.4 Gunakan bahasa yang konkret, bukan istilah “benchmark” tanpa penjelasan

Istilah “benchmark” dianggap membingungkan jika digunakan sendirian. Wording yang lebih jelas:

- “data nilai siswa yang pernah diterima”;
- “data siswa yang pernah diterima di kampus atau jurusan tertentu”;
- “cara menghitung dan membandingkan nilai dari beberapa sumber”;
- “membandingkan nilai siswa saat ini dengan nilai siswa yang pernah diterima”;
- “data historis penerimaan”.

Istilah **benchmark** masih boleh digunakan dalam dokumen teknis atau nama modul, tetapi copy yang dibaca pengguna harus menjelaskan data apa yang dibandingkan.

### 2.5 Kutipan verbatim perlu dipertahankan

Finding perlu menampilkan bukti dari learning call, terutama ketika menjelaskan:

- pertanyaan orang tua tentang target kuliah;
- keterlambatan report;
- perbedaan timeline jalur penerimaan;
- ketidakpastian pembobotan nilai;
- pola komplain yang pertama kali diterima SA.

---

## 3. Sumber dan artefak utama

### 3.1 Sumber riset

- [Ringkasan Masukan Kak Nur.md](</Users/fa-2400/Documents/ChatGPT/Knowledge%20Management/Ringkasan%20Masukan%20Kak%20Nur.md>)
- [Report Sintesis Masukan Kak Nur dan Tim SA.md](</Users/fa-2400/Documents/ChatGPT/Knowledge%20Management/Report%20Sintesis%20Masukan%20Kak%20Nur%20dan%20Tim%20SA.md>)
- [Research Synthesis - SA Knowledge Portal.md](</Users/fa-2400/Documents/ChatGPT/Knowledge%20Management/Research%20Synthesis%20-%20SA%20Knowledge%20Portal.md>)
- [Research Report - Internal Benchmark Tool.md](</Users/fa-2400/Documents/ChatGPT/Knowledge%20Management/Research%20Report%20-%20Internal%20Benchmark%20Tool.md>)

### 3.2 Dokumen fokus Prioritas 3

- [Sintesis Prioritas 3 - Database Benchmark Lulusan.md](</Users/fa-2400/Documents/ChatGPT/Knowledge%20Management/Sintesis%20Prioritas%203%20-%20Database%20Benchmark%20Lulusan.md>)
- [Sintesis Prioritas 3 - Internal Benchmark Tool.md](</Users/fa-2400/Documents/ChatGPT/Knowledge%20Management/Sintesis%20Prioritas%203%20-%20Internal%20Benchmark%20Tool.md>)
- [Data Structure & Field Dictionary - SA Knowledge Repository.md](</Users/fa-2400/Documents/ChatGPT/Knowledge%20Management/Data%20Structure%20%26%20Field%20Dictionary%20-%20SA%20Knowledge%20Repository.md>)

### 3.3 Addendum temuan cabang

- [Addendum - Findings Visit BAC Gading Serpong.md](</Users/fa-2400/Documents/ChatGPT/Knowledge%20Management/Addendum%20-%20Findings%20Visit%20BAC%20Gading%20Serpong.md>)

### 3.3 Artefak Figma/FigJam

- [Tabel findings di FigJam](https://www.figma.com/board/VQMEXsOv6cyRLmTrvc3CWK/Untitled?node-id=28-1780)
- File key: `VQMEXsOv6cyRLmTrvc3CWK`
- Node tabel: `28:1780`
- Struktur terakhir yang dibaca: **10 row × 7 kolom**

**Catatan penting untuk agent berikutnya:** agent ini tidak lagi menulis atau mengedit Figma. Figma hanya dibaca untuk verifikasi. Setiap perubahan copy atau styling berikutnya harus dilakukan oleh agent yang memang ditugaskan untuk menulis ke Figma.

### 3.4 Artefak presentasi

Folder output berisi beberapa versi slide:

- `outputs/Learning Call Findings - SA.pptx`
- `outputs/Learning Call Findings - SA v2.pptx`
- `outputs/Learning Call Findings - SA v3.pptx`
- `outputs/SA Research Findings - Thematic Report.pptx`
- `outputs/SA Research Findings - Thematic Report v2.pptx`
- `outputs/SA Research Findings - Thematic Report v3.pptx`
- `outputs/Internal Benchmark Tool - 10 Minute Research Report.pptx`
- `outputs/Internal Benchmark Tool - 10 Minute Research Report v2.pptx`
- `outputs/Internal Benchmark Tool - Research Findings Only.pptx`
- `outputs/Internal Benchmark Tool - Research Findings Only v2.pptx`

---

## 4. Konteks riset

Sesi yang dianalisis:

- **17 September 2026:** Ngobrol sama SA
- **29 September 2026:** Ngobrol bareng SA

Perspektif utama berasal dari SA dan tim internal. Ini adalah riset kualitatif; belum merupakan survei kuantitatif terhadap seluruh orang tua atau siswa.

---

## 5. Sintesis utama

Masalah SA bukan hanya kekurangan informasi. Informasi sebenarnya sudah tersedia, tetapi:

1. tersebar di banyak sumber;
2. memiliki tingkat pembaruan yang berbeda;
3. belum selalu memiliki status validasi;
4. sulit dicari berdasarkan konteks pertanyaan;
5. membutuhkan interpretasi manual sebelum dapat dijelaskan kepada orang tua.

Tiga kebutuhan besar yang muncul:

### 5.1 Findability — mudah ditemukan

SA perlu mencari berdasarkan konteks, bukan membuka ulang banyak link. Konteks pencarian dapat berupa:

- universitas atau kampus;
- jurusan;
- tahun penerimaan;
- jalur seleksi;
- nilai atau skor;
- subtes;
- jenis informasi penerimaan;
- periode pendaftaran.

### 5.2 Trustworthiness — dapat dipercaya

SA perlu mengetahui:

- sumber data;
- pemilik informasi;
- tanggal publikasi;
- tanggal terakhir dicek;
- status validasi;
- metode perhitungan;
- batasan penggunaan;
- apakah data masih sebanding dengan kondisi saat ini.

### 5.3 Explainability — mudah dijelaskan

Portal harus membantu SA mengubah informasi menjadi penjelasan yang konsisten, tanpa memberikan kepastian yang tidak didukung data.

Alur konsultasi yang ingin didukung:

> pertanyaan orang tua → target siswa → data progres dan nilai → data siswa yang pernah diterima → informasi jalur → persyaratan dan timeline → risiko atau alternatif → jawaban konsultasi

---

## 6. Findings final untuk tabel Figma

Tabel Figma menggunakan **9 finding**. Finding tentang “benchmark bukan nilai aman” tidak dibuat sebagai row terpisah karena dianggap beririsan dengan konteks validasi dan batasan penggunaan. Namun, prinsip tersebut tetap wajib dipertahankan sebagai guardrail di produk dan komunikasi SA.

| No. | Finding | Kategori kebutuhan |
|---:|---|---|
| 1 | Orang tua lebih sering bertanya tentang target kuliah dan perkembangan anak, bukan hanya aktivitas harian. | Pencarian |
| 2 | Data nilai siswa yang pernah diterima di kampus atau jurusan tertentu sudah dipakai SA, tetapi datanya tersebar. | Pencarian + Pengarsipan |
| 3 | Data progres siswa belum selalu bisa dilihat saat dibutuhkan. | Pencarian |
| 4 | Cara menghitung dan membandingkan nilai dari beberapa sumber belum jelas. | Pengarsipan |
| 5 | Informasi penerimaan berbeda-beda menurut jalur dan kampus. | Pencarian + Pengarsipan |
| 6 | Informasi resmi tersebar di banyak dokumen dan website. | Pencarian + Pengarsipan |
| 7 | AI membantu meringkas dokumen, tetapi hasilnya tetap perlu dicek manual. | Pencarian + Pengarsipan |
| 8 | Memilih kampus atau jurusan tidak cukup hanya dengan melihat nilai. | Pencarian |
| 9 | SA sering menjadi pihak pertama yang menerima komplain orang tua. | Komplain |

### 6.1 Finding 1 — Pertanyaan orang tua berfokus pada target kuliah

**Bukti verbatim:**

> “Kalau sudah masalah target kuliahnya, tiba-tiba nanya atau nge-WA perkembangan gimana.”

**Yang dilakukan SA sekarang:** SA menjawab lewat chat, WA, atau pertemuan. SA membuka data progres, nilai rapor, dan Tryout untuk menjelaskan posisi siswa serta langkah berikutnya.

**Sumber knowledge saat ini:** Data Studio; hasil Tryout dan drill; nilai rapor; data profiling; catatan pertemuan atau komunikasi dengan orang tua.

**Gap:** Belum ada satu tampilan yang menghubungkan progres, nilai, dan target kuliah. SA masih harus menggabungkan informasinya sendiri.

### 6.2 Finding 2 — Data nilai siswa yang pernah diterima sudah dipakai, tetapi tersebar

**Bukti:** SA membuka responses lulusan Ruangguru dan membandingkannya dengan data Ruangguru, Zebracross, serta sertifikat UTBK.

**Yang dilakukan SA sekarang:** SA membuka data lulusan, menyimpan link yang relevan, lalu membandingkan data nilai, kampus, dan jurusan dengan data Ruangguru, Zebracross, dan sertifikat UTBK.

**Sumber knowledge saat ini:** Data lulusan Ruangguru; info kampus Ruangguru; Zebracross; LinkTree; sertifikat UTBK siswa yang diterima sebelumnya.

**Gap:** SA harus bolak-balik antar sumber untuk mencari dan membandingkan nilai siswa sebelumnya.

### 6.3 Finding 3 — Data progres belum selalu tersedia saat dibutuhkan

**Bukti verbatim:**

> “Kalau menunggu report dari pusat itu lumayan lama… hasil nilainya di-screenshot.”

**Yang dilakukan SA sekarang:** SA meminta screenshot hasil drill atau Tryout. SA juga menarik data dari Data Studio secara berkala, mengecek secara manual, dan mengingatkan siswa yang belum mencapai target.

**Sumber knowledge saat ini:** Screenshot siswa; Data Studio; report dari pusat atau grup SA; leaderboard; SLMS untuk monitoring kehadiran.

**Gap:** Report tidak selalu cepat atau real-time. SA masih bergantung pada screenshot dan tracking manual.

### 6.4 Finding 4 — Cara menghitung dan membandingkan nilai belum jelas

**Bukti verbatim:**

> “Acuan dari Zebracross buat grafik masih belum bisa diangkat karena pembobotan subtes belum yakin benar atau tidak.”

**Yang dilakukan SA sekarang:** SA belum memakai grafik Zebracross sebagai acuan final. SA menunggu hasil Tryout dan validasi pembobotan, sementara fokus pada target 600.

**Sumber knowledge saat ini:** Grafik atau dashboard Zebracross; hasil Tryout; pembobotan subtes; diskusi validasi tim.

**Gap:** Belum jelas apakah data Ruangguru, Zebracross, dan UTBK dihitung dengan cara yang sama dan cukup valid untuk dibandingkan.

### 6.5 Finding 5 — Informasi penerimaan berbeda menurut jalur dan kampus

**Bukti verbatim:**

> “Jalur mandiri kampus dan jalur mandiri kedinasan itu timeline-nya beda-beda.”

**Yang dilakukan SA sekarang:** SA mengecek ulang timeline dan persyaratan. Kalau belum jelas, SA mencari informasi tambahan dan baru menyampaikan jawaban setelah verifikasi.

**Sumber knowledge saat ini:** LinkTree; website resmi kampus atau institusi; dokumen pemerintah; BKN; surat resmi.

**Gap:** SA belum punya tempat yang jelas untuk mencari informasi tiap jalur. Informasi juga sering berubah sehingga harus dicek ulang.

### 6.6 Finding 6 — Informasi resmi tersebar

**Bukti:** LinkTree mengarah ke dokumen pemerintah, tetapi informasi jalur mandiri masih sulit disediakan secara lengkap.

**Yang dilakukan SA sekarang:** SA mulai dari LinkTree atau dokumen pemerintah. Kalau belum lengkap, SA mencari langsung di website resmi lalu menunjukkan sumbernya.

**Sumber knowledge saat ini:** LinkTree; dokumen pemerintah; website kampus atau institusi; BKN; pencarian manual.

**Gap:** Belum ada satu daftar sumber resmi yang menunjukkan pemilik informasi, waktu terakhir dicek, dan kelengkapan informasinya.

### 6.7 Finding 7 — AI membantu meringkas dokumen, tetapi tetap harus dicek

**Bukti:** SA menggunakan Control F dan AI untuk merangkum dokumen panjang atau surat institusi.

**Yang dilakukan SA sekarang:** SA memakai Control F dan AI/Gemini untuk mencari serta meringkas dokumen atau surat. Setelah itu, SA mengecek kembali ke sumber resmi.

**Sumber knowledge saat ini:** Dokumen pemerintah; surat kampus atau institusi; Control F; AI/Gemini; website resmi.

**Gap:** Ringkasan AI belum otomatis menunjukkan sumber atau bagian dokumen yang menjadi dasarnya.

### 6.8 Finding 8 — Pilihan kampus tidak cukup ditentukan dari nilai

**Bukti:** SA ingin melihat daya tampung, persyaratan, portofolio, dan informasi penting setelah memasukkan beberapa pilihan.

**Yang dilakukan SA sekarang:** SA membandingkan nilai siswa saat ini dengan nilai siswa yang pernah diterima, lalu melihat kondisi siswa dan informasi kampus atau jurusan yang dituju. Kalau target terlalu berat, SA menawarkan pilihan lain.

**Sumber knowledge saat ini:** Nilai dan hasil Tryout per subtes; data nilai siswa yang diterima sebelumnya; sertifikat UTBK; LinkTree; website resmi; pencarian manual.

**Gap:** Belum ada alat untuk membandingkan nilai siswa saat ini dengan nilai siswa yang pernah diterima sekaligus melihat daya tampung, persyaratan, risiko, dan alternatif pilihan.

### 6.9 Finding 9 — SA sering menjadi pihak pertama yang menerima komplain

**Bukti verbatim:**

> “Komplain itu selalu kita yang dapat duluan karena BM nggak connect langsung dengan orang tua.”

**Yang dilakukan SA sekarang:** SA mendengarkan keluhan, meminta maaf bila perlu, lalu meminta arahan BM atau Kak Nana jika belum tahu solusinya. Setelah itu, SA melakukan eskalasi dan follow-up.

**Sumber knowledge saat ini:** Chat atau WA; grup 1-on-1; grup SA atau Discord; arahan BM/Kak Nana; catatan internal.

**Gap:** Belum ada panduan dan tracking eskalasi yang jelas. Status, PIC, dan langkah berikutnya masih tersebar di chat.

---

## 7. Implikasi terhadap kebutuhan platform

### 7.1 Modul yang dibutuhkan

| Modul | Fungsi utama | Prioritas awal |
|---|---|---:|
| Internal Benchmark | Mencari data siswa yang pernah diterima dan membandingkannya dengan posisi siswa saat ini. | P0 |
| Sumber Resmi & Jalur Penerimaan | Menyimpan link sumber resmi, timeline, persyaratan, owner, dan tanggal pengecekan. | P0 |
| Student Context | Menerima snapshot nilai dan target dari sistem eksternal; bukan menyimpan profil siswa utama. | P1 |
| Comparison View | Menunjukkan posisi siswa, gap, konteks tahun/jalur, dan batasan interpretasi. | P1 |
| Consultation Record | Menyimpan konteks konsultasi, benchmark yang dipakai, hasil perbandingan, rekomendasi, dan follow-up. | P0 |
| Panduan Komunikasi | Membantu SA menjelaskan benchmark tanpa menyebut “nilai aman” atau memberi jaminan. | P1 |
| Komplain & Eskalasi | Mencatat status, PIC, arahan, dan follow-up komplain. | P2 |
| AI Summary with Source | Membantu meringkas dokumen dengan link atau kutipan sumber asli. | P2 |

### 7.2 Struktur knowledge dan relasi antar-informasi

Struktur knowledge perlu didokumentasikan sebagai fondasi sistem. Struktur ini bukan sekadar folder, melainkan model untuk menentukan:

- jenis informasi yang disimpan;
- hubungan antar-informasi;
- cara informasi dicari dan difilter;
- bagian yang dapat diperbarui secara terpisah;
- informasi yang perlu memiliki sumber dan validasi sendiri.

#### Hirarki utama

```text
Universitas
└── Program Studi / Jurusan
    └── Siklus Penerimaan
        ├── Tahun
        ├── Jenis Jalur
        ├── Informasi Penerimaan
        ├── Persyaratan dan Timeline
        ├── Data Siswa yang Pernah Diterima
        └── Sumber dan Status Validasi
```

Contoh:

```text
Universitas Indonesia
└── Psikologi
    └── 2026 — SNBT
        ├── Daya tampung dan peminat
        ├── Persyaratan dan dokumen
        ├── Timeline
        ├── Data siswa yang pernah diterima
        ├── Sumber resmi
        └── Status validasi
```

#### Relasi inti

```text
Universitas
    ↓ memiliki
Program Studi
    ↓ memiliki banyak
Siklus Penerimaan (tahun + jalur)
    ├── memiliki → Informasi Penerimaan
    ├── memiliki → Data Siswa yang Pernah Diterima
    ├── menggunakan → Sumber/Dokumen
    └── memiliki → Status Validasi

Siklus Penerimaan
    ↓ menjadi target
Rekam Konsultasi
    ├── menggunakan snapshot nilai siswa dari sistem eksternal
    ├── mengambil benchmark historis
    ├── menghasilkan perbandingan dan gap
    └── menyimpan rekomendasi dan follow-up
```

#### Tiga lapisan yang perlu dibedakan

| Lapisan | Fungsi | Contoh |
|---|---|---|
| Struktur knowledge | Menentukan cara informasi diorganisasi dan dihubungkan. | Universitas → Jurusan → Tahun + Jalur |
| Knowledge content | Isi informasi yang digunakan SA. | Timeline SNBT UI 2026; record siswa yang pernah diterima |
| Rekam konsultasi | Mencatat bagaimana knowledge digunakan dalam kasus tertentu. | Nilai siswa dibandingkan dengan data historis dan menghasilkan rekomendasi |

#### Tipe penyimpanan

| Tipe | Contoh | Cara dikelola |
|---|---|---|
| Master data | Universitas, program studi, jenis jalur, institusi sumber | Record terstruktur dan digunakan ulang |
| Informasi dinamis | Timeline, daya tampung, peminat, persyaratan | Record/artikel terhubung ke tahun dan jalur |
| Data historis | Data siswa yang pernah diterima | Record anonim dengan nilai, jalur, tahun, sumber, dan validasi |
| Panduan | Cara membaca data dan wording komunikasi | Artikel/panduan internal |
| Metadata | Owner, tanggal update, status validasi, periode berlaku | Menempel pada setiap knowledge item |
| Consultation snapshot | Input nilai, benchmark yang dipakai, hasil perbandingan, follow-up | Record terpisah yang terhubung ke knowledge item |

#### Prinsip desain

- Profil universitas yang relatif stabil tidak digabung dengan timeline penerimaan yang berubah setiap tahun.
- Informasi penerimaan tidak dibuat menjadi satu artikel besar jika dapat dipisah berdasarkan tahun dan jalur.
- Data siswa yang pernah diterima disimpan sebagai record anonim pada konteks jurusan, tahun, dan jalur yang tepat.
- Sumber, validasi, dan tanggal pembaruan menempel pada knowledge item terkait.
- Rekam konsultasi menyimpan snapshot keputusan, bukan mengambil alih fungsi database profil siswa.
- Satu informasi hanya memiliki satu sumber utama di repository; halaman lain menggunakan relasi atau tautan, bukan duplikasi isi.

### 7.3 Data minimum untuk record siswa yang pernah diterima

| Field | Keterangan |
|---|---|
| Universitas/kampus | Nama institusi dan, jika relevan, lokasi atau kampus. |
| Fakultas | Jika tersedia. |
| Jurusan/program studi | Nama program studi yang dituju. |
| Tahun penerimaan | Tahun data diterima. |
| Jalur seleksi | SNBP, SNBT/UTBK, mandiri, kedinasan, atau jalur lain. |
| Nilai/skor | Total dan/atau skor per subtes sesuai sumber. |
| Sumber | Link atau referensi internal sumber data. |
| Tanggal data diambil | Kapan data dimasukkan atau diambil. |
| Status validasi | Belum ditinjau, sedang divalidasi, tervalidasi terbatas, tervalidasi, perlu diperbarui, atau tidak sebanding. |
| Catatan batasan | Konteks yang harus dibaca sebelum menggunakan data. |
| Data pribadi | Hindari menyimpan identitas jika tidak dibutuhkan untuk konsultasi. |

### 7.4 Data minimum untuk rekam konsultasi

| Field | Keterangan |
|---|---|
| Consultation ID | ID unik untuk satu sesi atau kasus konsultasi. |
| External student reference | ID dari sistem sumber atau ID anonim; bukan profil lengkap siswa. |
| SA/owner | SA yang melakukan konsultasi. |
| Waktu konsultasi | Tanggal dan waktu snapshot dibuat. |
| Pertanyaan/konteks | Pertanyaan orang tua atau kebutuhan konsultasi. |
| Target | Universitas, jurusan, tahun, dan jalur yang dibandingkan. |
| Input score snapshot | Nilai total dan/atau subtes yang digunakan saat itu. |
| Data freshness | Tanggal pembaruan input siswa dan sumbernya. |
| Benchmark references | ID record data siswa yang pernah diterima yang dipakai. |
| Comparison output | Ringkasan posisi, gap, dan catatan risiko. |
| Recommendation | Langkah belajar, pilihan pembanding, atau tindakan berikutnya. |
| Follow-up status | Belum ditindaklanjuti, berjalan, selesai, atau perlu eskalasi. |
| Retention/access | Aturan lama penyimpanan dan siapa yang boleh melihat. |

### 7.5 Metadata yang wajib terlihat

Setiap informasi yang berpotensi berubah atau dipakai sebagai pembanding perlu menampilkan:

- sumber asli;
- owner atau pihak yang bertanggung jawab;
- tanggal publikasi jika ada;
- tanggal terakhir dicek;
- periode berlaku;
- status validasi;
- catatan metodologi;
- batasan penggunaan.

---

## 8. Guardrail produk dan komunikasi

### 8.1 Istilah yang sebaiknya digunakan

- data historis penerimaan;
- rentang referensi;
- posisi relatif terhadap data historis;
- gap terhadap data siswa yang pernah diterima;
- pilihan dengan risiko lebih tinggi atau lebih rendah;
- target belajar.

### 8.2 Istilah yang sebaiknya dihindari

- nilai aman;
- pasti lolos;
- jaminan diterima;
- prediksi final;
- skor yang pasti cukup.

### 8.3 Contoh komunikasi yang aman

> “Berdasarkan data historis internal pada tahun dan jalur yang relevan, posisi siswa saat ini masih memiliki gap pada beberapa aspek. Data ini adalah referensi historis, bukan nilai aman atau jaminan diterima. Fokus berikutnya adalah meningkatkan area prioritas dan membahas pilihan pembanding.”

### 8.4 Data eksklusif

- Gunakan akses internal berbasis role.
- Jangan membuka database lulusan ke orang tua atau publik.
- Anonimkan identitas yang tidak diperlukan.
- Bedakan data benchmark internal dari sumber resmi publik.
- Simpan sumber dan riwayat perubahan.
- Batasi export dan screenshot jika diperlukan oleh kebijakan internal.

---

## 9. Perbandingan opsi platform — status pembahasan

Pernah muncul kebutuhan untuk membandingkan:

1. platform internal/custom;
2. Document360;
3. Guru: Knowledge Management.

Perbandingan final belum boleh diputuskan hanya dari label “kuat”, “partial”, atau “lemah”. Label tersebut harus diberikan berdasarkan kebutuhan yang spesifik.

| Kebutuhan yang perlu diuji | Pertanyaan evaluasi |
|---|---|
| Akses internal | Apakah dapat membatasi akses berdasarkan role, tim, atau domain internal? |
| Data eksklusif | Apakah ada kontrol export, audit log, dan governance yang memadai? |
| Database terstruktur | Apakah dapat menyimpan field universitas, jurusan, tahun, jalur, nilai, dan status validasi? |
| Pencarian dan filter | Apakah SA dapat mencari berdasarkan konteks, bukan hanya full-text keyword? |
| Comparison view | Apakah dapat membandingkan nilai siswa saat ini dengan data historis? |
| Consultation record | Apakah dapat menyimpan snapshot konsultasi, benchmark yang dipakai, hasil perbandingan, dan follow-up tanpa menjadi student database? |
| Data dinamis | Apakah tersedia owner, tanggal pengecekan, expiry, dan workflow review? |
| Sumber dan sitasi | Apakah setiap ringkasan dapat ditelusuri ke dokumen asli? |
| AI | Apakah AI dapat dipakai sebagai bantuan dengan source-grounding dan human review? |
| Komplain | Apakah tersedia tracking status, PIC, eskalasi, dan follow-up? |
| Integrasi | Apakah dapat terhubung dengan Data Studio, profil siswa, atau sumber internal lain? |
| Analytics | Apakah dapat mengukur pencarian gagal, artikel yang digunakan, dan kebutuhan yang belum terjawab? |
| Effort | Berapa effort setup, migrasi data, integrasi, governance, dan maintenance? |
| Total cost | Berapa biaya lisensi, development, support, dan biaya perubahan jangka panjang? |

**Prinsip evaluasi:**

- Document360 atau Guru kemungkinan lebih cepat untuk knowledge base dan dokumentasi.
- Platform custom lebih berpotensi untuk database terstruktur, comparison view, integrasi, dan workflow internal yang spesifik.
- Tool existing tetap perlu diuji terhadap kebutuhan data eksklusif dan perbandingan nilai, bukan hanya kualitas artikel atau search.
- Jika platform existing hanya kuat untuk dokumentasi, gunakan untuk sumber resmi dan panduan; pertimbangkan custom module untuk benchmark dan comparison.

---

## 10. Agenda pembahasan selanjutnya

Urutan pembahasan yang paling logis:

### Tahap 1 — Ubah findings menjadi capability

Untuk setiap finding, tentukan kemampuan platform yang dibutuhkan:

- pencarian;
- pengarsipan;
- validasi;
- pembaruan;
- comparison;
- komunikasi;
- komplain atau eskalasi.

### Tahap 2 — Pisahkan MVP dari kebutuhan lanjutan

**MVP yang disarankan:**

- login internal;
- database data siswa yang pernah diterima;
- filter universitas, jurusan, tahun, jalur, dan nilai;
- sumber dan tanggal pembaruan;
- status validasi;
- catatan batasan;
- tampilan perbandingan sederhana;
- disclaimer benchmark historis.
- penyimpanan rekam konsultasi dan snapshot perbandingan.

**Tahap berikutnya:**

- integrasi atau pengambilan data dari sistem siswa eksternal;
- gap per subtes;
- proyeksi target score;
- rekomendasi belajar;
- ranking pilihan dan warning risiko;
- ringkasan AI dengan source citation;
- tracking komplain dan eskalasi.

### Tahap 3 — Tetapkan governance

Putuskan:

- siapa data owner;
- siapa validator;
- siapa yang boleh menambah atau mengubah data;
- seberapa sering data ditinjau;
- kapan data dianggap kedaluwarsa;
- bagaimana data konflik antar sumber ditangani;
- bagaimana data pribadi lulusan dilindungi;
- siapa yang bertanggung jawab atas jawaban kepada orang tua.

### Tahap 4 — Bandingkan platform

Gunakan capability matrix di bagian 9. Jangan membandingkan platform secara umum; nilai berdasarkan workflow SA dan risiko data eksklusif.

### Tahap 5 — Rancang pilot

Pilot dapat dimulai dari beberapa universitas atau jurusan dengan data yang paling lengkap. Ukur:

- waktu SA menemukan data yang relevan;
- jumlah sumber yang perlu dibuka;
- waktu menyiapkan jawaban;
- konsistensi penjelasan antar SA;
- persentase record yang memiliki sumber dan status validasi;
- error atau informasi kedaluwarsa yang ditemukan.

---

## 11. Hal yang masih terbuka

1. Apakah scope MVP hanya Internal Benchmark atau langsung mencakup sumber resmi dan jalur penerimaan?
2. Siapa owner data benchmark dan siapa validatornya?
3. Apakah data siswa saat ini dapat diintegrasikan atau hanya ditampilkan sebagai input manual?
4. Definisi resmi nilai atau skor yang boleh dibandingkan antar sumber apa?
5. Apakah data lulusan akan disimpan per individu anonim atau hanya sebagai agregat/rentang?
6. Seberapa sering data jalur penerimaan dan benchmark diperbarui?
7. Apakah SA membutuhkan fitur export untuk bahan konsultasi, atau cukup tampilan internal?
8. Apakah platform existing dapat memenuhi kebutuhan structured data dan comparison view?
9. Bagaimana label “kuat”, “partial”, dan “lemah” didefinisikan secara konsisten?
10. Apa batasan akses dan kebijakan keamanan untuk data eksklusif?

---

## 12. Status kerja saat ini

### Sudah selesai

- Sintesis riset dari learning call.
- Fokus khusus Prioritas 3.
- Penambahan konteks bahwa tool bersifat internal dan eksklusif.
- Penyertaan kutipan verbatim.
- Research report dan research synthesis.
- Findings dalam bentuk tabel.
- Penyederhanaan copy agar tidak terlalu baku.
- Penggantian istilah “benchmark” dengan penjelasan konkret pada copy utama.
- Tabel findings di FigJam sudah memiliki 9 finding, 7 kolom, kategori warna, dan bukti verbatim.

### Sedang menunggu keputusan

- Capability matrix untuk platform sendiri vs Document360 vs Guru.
- Definisi effort: setup, migrasi, maintenance, integrasi, dan governance.
- Scope MVP.
- Governance dan akses data eksklusif.
- Keputusan apakah comparison view membutuhkan custom development.
- Definisi detail rekam konsultasi dan aturan retensi datanya.

### Aturan kerja untuk kelanjutan

- Agent ini membaca dan menganalisis Figma saja.
- Jangan melakukan write ke Figma dari agent ini.
- Jika perlu perubahan Figma, serahkan ke agent penulis Figma yang ditunjuk.
- Sebelum agent lain menulis, pastikan copy final dan mapping row/kolom sudah disepakati.
- Bukti verbatim jangan dihapus atau diparafrasekan tanpa alasan yang jelas.

---

## 13. Model data yang direvisi

```text
External Student System
        │
        │ reference ID / input snapshot
        ▼
Consultation Session
        ├── Pertanyaan dan konteks orang tua
        ├── Target kampus, jurusan, tahun, dan jalur
        ├── Snapshot nilai siswa saat konsultasi
        ├── Benchmark historis yang digunakan
        ├── Hasil perbandingan dan gap
        ├── Rekomendasi atau langkah berikutnya
        └── Status follow-up

Knowledge Repository
        ├── Universitas dan program studi
        ├── Siklus penerimaan
        ├── Data siswa yang pernah diterima
        ├── Sumber dan dokumen resmi
        ├── Status validasi
        └── Panduan SA
```

Prinsipnya:

> **Student profile tetap berada di sistem eksternal; consultation snapshot disimpan di platform knowledge agar keputusan dan tindak lanjut dapat dilacak.**

## 14. Rekomendasi satu kalimat

Mulai dari **modul Internal Benchmark yang dapat dicari, memiliki sumber dan status validasi, serta membantu perbandingan sederhana dengan posisi siswa**, lalu perluas secara bertahap menjadi SA Knowledge Portal yang mencakup informasi penerimaan, pilihan kampus, panduan komunikasi, dan eskalasi komplain.
