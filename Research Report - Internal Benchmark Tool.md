# Research Report
## Internal Benchmark Tool untuk SA Knowledge Base

**Tanggal:** 29 September 2026  
**Topik:** Kebutuhan internal benchmark tool untuk konsultasi target kuliah  
**Sumber riset:** Ringkasan Masukan Kak Nur dan Tim SA  
**Sesi yang dianalisis:**  
- Ngobrol sama SA — 17 September 2026, 14:00 WIB  
- Ngobrol bareng SA — 29 September 2026, 10:00 WIB  

---

## 1. Ringkasan eksekutif

Riset ini mengeksplorasi kebutuhan SA dalam membantu siswa dan orang tua memahami posisi nilai terhadap target jurusan atau universitas. Temuan utama menunjukkan bahwa kebutuhan tersebut belum dapat dipenuhi secara efisien karena data benchmark masih tersebar di berbagai sumber, sulit dicari, belum memiliki tingkat validasi yang seragam, dan belum terhubung langsung dengan profil siswa.

Orang tua terutama membutuhkan jawaban tentang:

- apakah nilai anak sudah mendekati target;
- berapa gap yang masih harus dikejar;
- subtes atau materi apa yang perlu diprioritaskan;
- seberapa berisiko pilihan jurusan atau universitas;
- program atau langkah berikutnya yang perlu dilakukan.

SA saat ini menggabungkan responses lulusan, data Ruangguru, data Zebracross, sertifikat UTBK, hasil Tryout, Data Studio, dan sumber resmi institusi. Sebagian informasi masih dicari manual melalui link, screenshot, Control F, website resmi, atau bantuan AI untuk merangkum dokumen. Cara kerja ini membuat konsultasi bergantung pada pengalaman personal SA dan mengurangi kecepatan respons.

Opportunity utama yang ditemukan adalah membangun **Internal Benchmark Tool** sebagai modul di dalam **SA Knowledge Base**. Tool ini bukan database publik. Aksesnya dibatasi untuk SA dan pihak internal yang berwenang, sedangkan orang tua dan siswa hanya menerima hasil interpretasi yang relevan.

Tool idealnya menggabungkan tiga fungsi:

1. pencarian benchmark historis lulusan;
2. perbandingan posisi siswa dengan benchmark dan target per subtes;
3. perencanaan pilihan kampus atau jurusan berdasarkan daya tampung, peminat, persyaratan, timeline, risiko, dan prospek.

Namun, benchmark harus diposisikan sebagai data historis dan referensi konsultasi, bukan nilai aman atau jaminan diterima. Validasi sumber, tanggal pembaruan, tingkat keyakinan, dan batasan data perlu terlihat jelas di dalam tool.

---

## 2. Latar belakang

Dalam proses pendampingan SMA, pertanyaan orang tua mengenai target kuliah memiliki tingkat urgensi yang lebih tinggi dibandingkan pertanyaan rutin tentang kehadiran atau target drill. Informasi aktivitas harian biasanya sudah dilaporkan melalui grup, sedangkan pertanyaan target kuliah mendorong orang tua untuk menghubungi SA secara langsung dan meminta konsultasi.

SA perlu menjelaskan hubungan antara:

- nilai siswa saat ini;
- hasil Tryout dan performa per subtes;
- target jurusan atau universitas;
- benchmark siswa yang pernah diterima;
- aktivitas belajar dan progres;
- alternatif pilihan jika target awal terlalu berisiko.

Saat ini, hubungan tersebut belum didukung oleh satu tool internal yang terintegrasi. Data tersedia, tetapi tersebar dan membutuhkan interpretasi manual.

---

## 3. Tujuan riset

Riset ini bertujuan untuk:

1. Memahami pertanyaan dan kebutuhan informasi orang tua terkait target kuliah.
2. Memetakan sumber data yang digunakan SA dalam konsultasi.
3. Mengidentifikasi hambatan dalam pencarian dan penggunaan benchmark.
4. Memahami kebutuhan SA terhadap internal benchmark tool.
5. Merumuskan fitur, governance, dan batasan penggunaan tool.
6. Menentukan peluang pengembangan tool sebagai bagian dari SA Knowledge Base.

---

## 4. Pertanyaan riset

Riset ini berfokus pada pertanyaan berikut:

- Informasi apa yang paling sering diminta orang tua terkait target kuliah?
- Sumber apa yang digunakan SA untuk menjawab pertanyaan tersebut?
- Bagaimana SA membandingkan nilai siswa dengan benchmark?
- Bagian mana dari proses saat ini yang paling manual atau lambat?
- Informasi apa saja yang perlu tersedia dalam internal benchmark tool?
- Bagaimana benchmark harus dikomunikasikan agar tidak dipahami sebagai jaminan kelulusan?
- Bagaimana data eksklusif dapat dilindungi dari akses publik?

---

## 5. Metodologi dan batasan

### 5.1 Sumber data

Riset menggunakan analisis kualitatif terhadap ringkasan masukan dan hasil transkripsi sesi diskusi dengan SA. Source menggabungkan temuan dari dua sesi:

- sesi 17 September 2026;
- sesi 29 September 2026.

Kutipan yang digunakan dalam laporan merupakan kutipan verbatim bersih dari source. Beberapa salah dengar transkripsi otomatis telah dibersihkan seperlunya agar terbaca, sesuai catatan interpretasi pada source.

### 5.2 Pendekatan analisis

Analisis dilakukan dengan mengelompokkan temuan ke dalam:

- kebutuhan informasi orang tua;
- alur kerja SA;
- sumber dan kualitas data;
- kebutuhan fitur;
- risiko komunikasi;
- keamanan dan governance;
- peluang pengembangan produk.

### 5.3 Batasan riset

- Riset ini terutama merepresentasikan perspektif SA dan tim internal, bukan survei kuantitatif terhadap seluruh orang tua atau siswa.
- Frekuensi pertanyaan dapat berbeda menurut cabang, jenjang, tahun ajaran, dan karakter orang tua.
- Beberapa praktik, seperti razia achievement drill, merupakan praktik khusus cabang dan tidak dapat dianggap sebagai standar seluruh cabang.
- Validitas benchmark dan pembobotan subtes masih perlu diuji lebih lanjut dengan data historis dan hasil Tryout.

---

## 6. Temuan utama

### Temuan 1 — Pertanyaan target kuliah membutuhkan jawaban berbasis data

Orang tua tidak berhenti pada pertanyaan apakah siswa sudah mengerjakan aktivitas. Mereka ingin memahami posisi anak terhadap target masa depan.

> “Kalau misalnya untuk target kuliahnya, kalau harian rata-rata orang tua itu nggak respons karena target drill dan target attendance sudah direport. Tapi kalau sudah masalah target kuliahnya, tiba-tiba nanya atau nge-WA perkembangan gimana.”
>
> — Narasumber SA, sesi 29 September 2026, 00:03:27–00:04:08

Pertanyaan yang paling relevan mencakup:

- apakah nilai anak sudah sesuai dengan jurusan atau universitas yang dituju;
- berapa nilai yang harus dicapai;
- seberapa besar peluang diterima;
- apa yang perlu dilakukan untuk meningkatkan nilai;
- apakah perlu menyiapkan jurusan atau universitas alternatif.

**Interpretasi:** kebutuhan orang tua adalah kebutuhan terhadap “posisi dan tindakan”, bukan sekadar laporan aktivitas.

---

### Temuan 2 — SA menggunakan banyak sumber, tetapi belum memiliki satu sumber kebenaran

Sumber yang digunakan SA meliputi:

- hasil Tryout;
- nilai per subtes;
- drill soal;
- nilai rapor;
- data profiling;
- kehadiran dan konsistensi les;
- data penerimaan tahun sebelumnya;
- responses lulusan Ruangguru;
- data Ruangguru dan Zebracross;
- sertifikat UTBK siswa tahun sebelumnya;
- website resmi institusi dan dokumen pemerintah.

Untuk benchmark jurusan, SA membuka responses lulusan dan membandingkannya dengan sumber lain.

> “Untuk benchmark jurusan, SA membuka responses lulusan Ruangguru tahun sebelumnya yang memuat jurusan, universitas, dan nilai siswa yang diterima.”

> “Sebelum konsultasi, data Ruangguru dapat dibandingkan dengan data Zebracross dan sertifikat UTBK siswa tahun sebelumnya.”

**Interpretasi:** data benchmark sudah bernilai dan digunakan, tetapi belum dikonsolidasikan menjadi sistem pencarian internal yang seragam.

---

### Temuan 3 — Proses saat ini masih manual dan lambat

SA masih menggunakan screenshot dan pengecekan manual ketika laporan pusat belum tersedia.

> “Kalau drill soal, saya minta siswanya untuk selalu screenshot hasilnya. Kalau menunggu report dari pusat itu lumayan lama, jadi untuk nge-track siswa tiap hari, setelah drill hasil nilainya di-screenshot.”
>
> — Narasumber SA, sesi 29 September 2026, 00:07:41–00:08:41

> “Di Data Studio drilling soal itu akan update, jadi paling tidak tiga hari sekali saya tarik datanya. Saya cek siswa yang belum mencapai target.”
>
> — Narasumber SA, sesi 29 September 2026, 00:13:18–00:14:18

Pada sesi lain, SA menyebutkan bahwa tidak semua siswa muncul di leaderboard sehingga pengecekan manual tetap diperlukan.

**Interpretasi:** masalah utamanya bukan ketiadaan data, tetapi keterlambatan, fragmentasi, dan rendahnya keterhubungan antar sumber.

---

### Temuan 4 — Benchmark harus memiliki status validasi dan batasan penggunaan

Benchmark dari sumber pembanding belum dapat langsung dijadikan acuan final.

> “Acuan dari Zebracross buat grafik masih belum bisa diangkat karena pembobotan subtes belum yakin benar atau tidak. Kita sambil lihat Tryout yang berjalan dulu, baru simpulkan langkah berikutnya.”
>
> — Tim internal, sesi 29 September 2026, bagian penutup rekaman

Karena itu, internal benchmark tool tidak boleh hanya menampilkan angka. Setiap record perlu memiliki:

- sumber data;
- tahun dan jalur seleksi;
- tanggal pembaruan;
- status validasi;
- catatan keterbatasan;
- tingkat keyakinan jika tersedia.

**Interpretasi:** transparansi data sama pentingnya dengan kemudahan pencarian.

---

### Temuan 5 — Kebutuhan tool berkembang dari benchmark menjadi perencanaan pilihan

SA tidak hanya membutuhkan data nilai lulusan. Mereka juga membutuhkan informasi yang membantu siswa menyusun pilihan kampus dan jurusan.

> “Masukkan pilihan satu, pilihan kedua, pilihan ketiga. Setelah disusun, langsung muncul berapa daya tampung, persyaratan yang harus dilengkapi, apakah ada portofolio atau persyaratan khusus, dan ringkasan informasi penting yang harus disiapkan siswa.”
>
> — Narasumber SA, sesi 17 September 2026, 00:42:12–00:44:14

SA juga mengusulkan peringatan risiko dan pilihan pembanding:

> “Kalau bisa ada warning: pilihan kamu berbahaya atau tidak ideal. Pilihan kedua bisa disesuaikan dengan daya tampung yang lebih besar dan peminat yang lebih sedikit. Perlu juga ada prospek ke depannya seperti apa, terutama politeknik yang jurusan dan prospek kerjanya belum banyak dijelaskan.”
>
> — Narasumber SA, sesi 17 September 2026, 00:44:00–00:46:40

**Interpretasi:** benchmark tool sebaiknya menjadi bagian dari alur konsultasi pilihan, bukan hanya katalog data lulusan.

---

### Temuan 6 — SA membutuhkan Knowledge Base dengan sumber resmi

Kebutuhan benchmark beririsan dengan kebutuhan SA Knowledge Base yang menyimpan informasi UTBK, TKA, SNBP, SNBT, jalur mandiri, UM, kedinasan, persyaratan, dan timeline.

> “Linktree dibuat supaya orang tua mendapat sumber resmi. Kalau dibuka, semuanya langsung mengarah ke dokumen asli pemerintah. Untuk kedinasan ke BKN. Informasi jalur mandiri tidak bisa kami provide seluruhnya karena update-nya berkala dan jumlahnya banyak; yang lebih bisa disediakan adalah SNBP dan SNBT.”
>
> — Tim internal, sesi 17 September 2026, 00:47:58–00:49:32

Sumber resmi perlu dipisahkan dari data benchmark eksklusif, tetapi dapat berada dalam satu Knowledge Base dengan modul yang berbeda.

**Interpretasi:** kebutuhan solusinya adalah ekosistem informasi internal dengan sumber, tanggal pembaruan, dan aturan penggunaan yang jelas.

---

### Temuan 7 — Proyeksi target score per subtes akan membantu konsultasi

SA secara eksplisit menyebut kebutuhan proyeksi target score.

> “Kalau dari Ruangguru sendiri sudah bisa menyediakan proyeksi target score per subtes, itu akan sangat membantu SA.”
>
> — Narasumber SA, sesi 17 September 2026, 00:33:00–00:33:18

Fitur ini harus diperlakukan sebagai proyeksi dengan tingkat keyakinan dan keterbatasan, bukan “nilai aman”. Terutama untuk TKA, data historis masih terbatas dan pengaruhnya terhadap kelulusan belum dapat dipastikan.

---

### Temuan 8 — Konsultasi harus menjaga ekspektasi orang tua

SA saat ini menggunakan pendekatan bertahap. Ketika nilai siswa masih sekitar 400–500, fokus awal adalah mencapai fondasi minimal sebelum membahas proyeksi yang lebih detail.

> “Kalau nilai siswa masih di rata-rata 400–500, saya sampaikan targetnya harus minimal 600 dulu semua subtesnya. Kalau sudah mencapai 600, baru dianalisis lagi subtes mana yang perlu dilanjutkan lebih tinggi.”
>
> — Narasumber SA, sesi 29 September 2026, 00:16:48–00:17:26

Untuk target sangat kompetitif, SA perlu menyampaikan risiko secara terbuka.

> “Kalau targetnya tinggi, misalnya kedokteran, saya blak-blakan. Kalau nilai sekarang dan tiap bulan tidak ada progres kenaikan, akan berat. Siswa perlu mempertimbangkan jurusan atau universitas lain.”
>
> — Narasumber SA, sesi 29 September 2026, 00:17:26–00:17:56

**Interpretasi:** tool harus mendukung percakapan yang realistis, bukan mendorong SA memberi kepastian yang tidak dapat dibuktikan.

---

## 7. Sintesis kebutuhan pengguna

### 7.1 Kebutuhan fungsional SA

SA membutuhkan kemampuan untuk:

- mencari benchmark berdasarkan universitas, jurusan, tahun, dan jalur seleksi;
- melihat nilai atau skor lulusan yang relevan;
- membandingkan benchmark dengan hasil Tryout siswa;
- melihat gap per subtes;
- menyusun pilihan kampus dan jurusan;
- melihat daya tampung dan jumlah peminat;
- melihat persyaratan, portofolio, dokumen, dan timeline;
- menerima warning untuk pilihan yang terlalu berisiko;
- melihat prospek jurusan;
- mengakses sumber resmi;
- mencatat hasil konsultasi dan tindak lanjut.

### 7.2 Kebutuhan informasi orang tua dan siswa

Orang tua dan siswa membutuhkan:

- gambaran posisi siswa yang mudah dipahami;
- target yang perlu dikejar;
- penjelasan tentang gap dan prioritas belajar;
- alasan suatu pilihan dianggap berisiko;
- alternatif pilihan;
- informasi yang bersumber jelas;
- komunikasi yang tidak menjanjikan kelulusan.

### 7.3 Kebutuhan governance

Tim internal membutuhkan:

- owner data yang jelas;
- proses validasi benchmark;
- tanggal pembaruan dan review;
- role-based access;
- audit log akses dan perubahan;
- mekanisme pencabutan akses;
- pembatasan export dan download;
- perlindungan identitas lulusan;
- prosedur penanganan insiden.

---

## 8. User journey yang diharapkan

1. SA login menggunakan akun internal personal.
2. SA membuka profil siswa sesuai hak akses.
3. SA memasukkan target universitas dan jurusan.
4. Tool menampilkan benchmark historis yang relevan.
5. Tool membandingkan nilai siswa dengan benchmark dan target per subtes.
6. Tool menampilkan informasi pilihan: daya tampung, peminat, persyaratan, timeline, prospek, dan risiko.
7. Tool memberikan warning jika kombinasi pilihan terlalu kompetitif atau tidak seimbang.
8. SA menyusun pembahasan target, gap, prioritas belajar, dan alternatif.
9. SA menyampaikan ringkasan kepada orang tua dan siswa.
10. SA mencatat hasil konsultasi serta rencana tindak lanjut.

---

## 9. Implikasi desain solusi

### 9.1 Tool harus bersifat internal

Karena data benchmark bersifat eksklusif:

- tidak ada akses publik;
- tidak menggunakan akun bersama;
- akses dibatasi berdasarkan peran;
- data mentah tidak dikirim kepada orang tua atau siswa;
- identitas lulusan dianonimkan;
- export dan download dikontrol.

### 9.2 Benchmark dan sumber resmi perlu dipisahkan

Internal Benchmark dan sumber resmi berada dalam satu SA Knowledge Base, tetapi memiliki fungsi berbeda:

| Modul | Fungsi |
|---|---|
| Internal Benchmark | Benchmark historis lulusan dan perbandingan dengan siswa. |
| Pilihan Kampus/Jurusan | Informasi pilihan, risiko, persyaratan, dan prospek. |
| Sumber Resmi | Tautan dokumen pemerintah atau institusi. |
| Target Score | Proyeksi target per subtes dengan batasan data. |
| Panduan Konsultasi | Cara menjelaskan hasil secara konsisten. |

### 9.3 Tool harus menunjukkan kualitas data

Informasi harus dilengkapi:

- sumber;
- tanggal pembaruan;
- tahun dan jalur seleksi;
- status validasi;
- konteks perubahan kebijakan;
- tingkat keyakinan atau catatan keterbatasan.

### 9.4 Output harus berupa interpretasi

Output untuk orang tua sebaiknya berbentuk ringkasan seperti:

> “Berdasarkan data historis internal pada jalur dan periode yang relevan, posisi siswa saat ini masih memiliki gap pada subtes tertentu. Data ini bukan nilai aman atau jaminan diterima. Fokus berikutnya adalah meningkatkan subtes prioritas dan menyiapkan pilihan pembanding dengan mempertimbangkan daya tampung, peminat, dan persyaratan.”

---

## 10. Rekomendasi produk

### Prioritas 1 — Bangun MVP Internal Benchmark

MVP perlu memiliki:

1. login akun internal;
2. role-based access;
3. pencarian berdasarkan universitas, jurusan, tahun, jalur, dan nilai;
4. sumber, tanggal pembaruan, dan status validasi;
5. perbandingan dengan skor siswa;
6. gap per subtes jika datanya valid;
7. audit log;
8. pembatasan export dan tautan publik.

### Prioritas 2 — Tambahkan modul perencanaan pilihan

Modul ini perlu mendukung:

- pilihan 1, 2, 3, dan alternatif;
- daya tampung;
- jumlah peminat;
- persyaratan;
- portofolio;
- timeline;
- prospek jurusan;
- warning risiko;
- saran pilihan pembanding.

### Prioritas 3 — Integrasikan proyeksi target score

Proyeksi target score per subtes dapat membantu konsultasi, tetapi perlu:

- sumber dan periode data;
- penjelasan metode;
- tingkat keyakinan;
- pemisahan antara benchmark historis dan proyeksi;
- catatan khusus untuk TKA;
- larangan penggunaan istilah “nilai aman”.

### Prioritas 4 — Bangun governance sejak awal

Tetapkan:

- data owner;
- approver perubahan;
- role pengguna;
- jadwal review;
- klasifikasi kerahasiaan;
- proses offboarding;
- prosedur insiden;
- aturan komunikasi ke orang tua.

---

## 11. Rencana implementasi

### Fase 1 — 0–30 hari: definisi dan konsolidasi

- Menunjuk owner internal benchmark tool.
- Menetapkan role dan aturan akses.
- Menginventarisasi responses lulusan, data Ruangguru, Zebracross, sertifikat UTBK, dan sumber lain.
- Menetapkan struktur data dan definisi benchmark.
- Memilih universitas, jurusan, dan jalur prioritas.
- Menandai data yang valid, belum valid, atau perlu review.

### Fase 2 — 31–60 hari: MVP internal

- Membangun database terpusat.
- Menambahkan pencarian dan filter.
- Menampilkan sumber dan status validasi.
- Menguji perbandingan benchmark dengan profil siswa.
- Menguji input pilihan kampus/jurusan.
- Menguji warning risiko.
- Menguji pembatasan akses.

### Fase 3 — 61–90 hari: uji konsultasi

- Menggunakan tool dalam konsultasi nyata.
- Menyusun template ringkasan untuk orang tua.
- Mengaktifkan audit log.
- Mengumpulkan feedback SA.
- Menetapkan proses pembaruan dan review tahunan.

### Fase 4 — Pengembangan lanjutan

- Proyeksi target score per subtes.
- Rekomendasi belajar berbasis gap.
- Ranking pilihan kampus dan jurusan.
- Prospek jurusan dan politeknik.
- Integrasi data Tryout dan dashboard siswa.

---

## 12. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Benchmark dianggap sebagai nilai aman | Ekspektasi orang tua menjadi tidak realistis | Gunakan istilah benchmark historis, tampilkan disclaimer, dan gunakan panduan komunikasi. |
| Pembobotan subtes belum valid | Analisis posisi siswa dapat keliru | Tampilkan status validasi dan tunda penggunaan sebagai acuan final. |
| Data menjadi usang | Informasi pilihan kampus tidak relevan | Tampilkan tanggal pembaruan dan tetapkan jadwal review. |
| Data eksklusif tersebar | Risiko kerahasiaan dan reputasi | Role-based access, masking, audit log, dan pembatasan export. |
| Sumber jalur mandiri berubah cepat | Informasi konsultasi tidak akurat | Link ke sumber resmi dan wajib mencantumkan tanggal cek terakhir. |
| Tool terlalu kompleks di awal | Adopsi SA rendah | Mulai dari pencarian benchmark dan perbandingan sederhana. |
| Rekomendasi terlalu otomatis | SA atau orang tua menganggap hasil sebagai keputusan final | Tool menjadi alat bantu konsultasi, bukan pengganti judgment SA. |

---

## 13. Indikator keberhasilan

### Efisiensi kerja SA

- waktu yang dibutuhkan untuk menemukan benchmark;
- penurunan pencarian manual melalui banyak link;
- penurunan kebutuhan screenshot atau login ke akun siswa;
- waktu penyusunan ringkasan konsultasi.

### Kualitas konsultasi

- persentase konsultasi yang menggunakan benchmark terstruktur;
- konsistensi penjelasan SA;
- persentase konsultasi yang menghasilkan gap dan tindak lanjut;
- waktu penyusunan pilihan alternatif.

### Kualitas dan governance data

- persentase record dengan sumber;
- persentase record dengan tanggal pembaruan;
- persentase record dengan status validasi;
- persentase perubahan yang memiliki owner dan audit trail;
- jumlah insiden akses atau penyebaran data.

### Pengalaman pengguna internal

- kepuasan SA terhadap kemudahan pencarian;
- kepuasan SA terhadap kelengkapan informasi;
- tingkat penggunaan tool dalam konsultasi;
- feedback tentang data atau fitur yang belum tersedia.

---

## 14. Kesimpulan

Riset menunjukkan bahwa SA membutuhkan lebih dari sekadar database nilai lulusan. Mereka membutuhkan alat bantu internal yang dapat menghubungkan:

> benchmark historis → posisi siswa → gap per subtes → risiko pilihan → target belajar → alternatif → tindak lanjut

Internal Benchmark Tool sebaiknya dibangun sebagai modul di dalam SA Knowledge Base. Modul ini perlu menggabungkan data benchmark eksklusif dengan informasi pilihan kampus dan jurusan, sumber resmi, serta proyeksi target score yang memiliki batasan dan tingkat keyakinan yang jelas.

Keberhasilan solusi tidak ditentukan oleh banyaknya data yang dikumpulkan, tetapi oleh kemampuannya membantu SA menemukan informasi yang relevan, memahami kualitas data, dan mengubahnya menjadi konsultasi yang cepat, konsisten, aman, dan realistis.

Tool harus selalu menjaga tiga prinsip:

1. **Internal:** hanya dapat diakses pihak yang berwenang.
2. **Evidence-based:** setiap informasi memiliki sumber, tanggal, dan status validasi.
3. **No false certainty:** benchmark dan proyeksi tidak boleh dikomunikasikan sebagai jaminan kelulusan.

---

## Lampiran A — Kutipan verbatim pilihan

> “Kalau misalnya untuk target kuliahnya, kalau harian rata-rata orang tua itu nggak respons karena target drill dan target attendance sudah direport. Tapi kalau sudah masalah target kuliahnya, tiba-tiba nanya atau nge-WA perkembangan gimana.”
>
> — Narasumber SA, sesi 29 September 2026, 00:03:27–00:04:08

> “Kalau dari Ruangguru sendiri sudah bisa menyediakan proyeksi target score per subtes, itu akan sangat membantu SA.”
>
> — Narasumber SA, sesi 17 September 2026, 00:33:00–00:33:18

> “Masukkan pilihan satu, pilihan kedua, pilihan ketiga. Setelah disusun, langsung muncul berapa daya tampung, persyaratan yang harus dilengkapi, apakah ada portofolio atau persyaratan khusus, dan ringkasan informasi penting yang harus disiapkan siswa.”
>
> — Narasumber SA, sesi 17 September 2026, 00:42:12–00:44:14

> “Kalau bisa ada warning: pilihan kamu berbahaya atau tidak ideal. Pilihan kedua bisa disesuaikan dengan daya tampung yang lebih besar dan peminat yang lebih sedikit. Perlu juga ada prospek ke depannya seperti apa, terutama politeknik yang jurusan dan prospek kerjanya belum banyak dijelaskan.”
>
> — Narasumber SA, sesi 17 September 2026, 00:44:00–00:46:40

> “Kalau mau cari berapa jumlah peminat sama kuotanya, pasti arahnya ke SNPMB. Kalau orang tua minta nilai aman, tetap saya sampaikan bahwa tidak ada yang memberikan informasi secara tepat berapa nilai aman untuk masuk kampus tersebut. Kalau mau aman, kejar lebih tinggi.”
>
> — Narasumber SA, sesi 17 September 2026, 00:30:10–00:32:34

> “Acuan dari Zebracross buat grafik masih belum bisa diangkat karena pembobotan subtes belum yakin benar atau tidak. Kita sambil lihat Tryout yang berjalan dulu, baru simpulkan langkah berikutnya.”
>
> — Tim internal, sesi 29 September 2026, bagian penutup rekaman

> “Linktree dibuat supaya orang tua mendapat sumber resmi. Kalau dibuka, semuanya langsung mengarah ke dokumen asli pemerintah. Untuk kedinasan ke BKN. Informasi jalur mandiri tidak bisa kami provide seluruhnya karena update-nya berkala dan jumlahnya banyak; yang lebih bisa disediakan adalah SNBP dan SNBT.”
>
> — Tim internal, sesi 17 September 2026, 00:47:58–00:49:32

## Lampiran B — Definisi istilah

- **Benchmark historis:** data nilai atau skor siswa yang pernah diterima pada periode dan jalur tertentu.
- **Target belajar:** sasaran nilai atau aktivitas yang perlu dikejar siswa.
- **Proyeksi:** estimasi berbasis data dengan tingkat keyakinan dan keterbatasan tertentu.
- **Peluang:** interpretasi posisi siswa terhadap target, bukan kepastian diterima.
- **SA Knowledge Base:** sumber informasi internal yang menggabungkan benchmark, sumber resmi, panduan, dan informasi pilihan kampus/jurusan.
- **Internal Benchmark Tool:** modul terbatas dalam SA Knowledge Base untuk mencari, membandingkan, dan menggunakan benchmark dalam konsultasi.
