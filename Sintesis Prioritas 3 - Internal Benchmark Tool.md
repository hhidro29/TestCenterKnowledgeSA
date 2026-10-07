# Sintesis Prioritas 3: Internal Benchmark Tool

## 1. Ringkasan eksekutif

Prioritas 3 adalah membangun **internal benchmark tool** sebagai bagian dari SA Knowledge Base. Tool ini digunakan oleh SA dan tim internal yang berwenang untuk mencari serta membandingkan data historis penerimaan berdasarkan universitas, jurusan, tahun, jalur seleksi, dan nilai.

Data yang digunakan bersifat eksklusif, sehingga tool ini bukan database publik dan tidak boleh diakses langsung oleh orang tua, siswa, atau masyarakat umum. Orang tua dan siswa menerima hasil interpretasi dari SA, bukan data mentah, identitas lulusan, atau link sumber eksklusif.

Kebutuhan ini muncul karena orang tua tidak hanya menanyakan aktivitas harian, tetapi terutama ingin mengetahui posisi anak terhadap target kuliah:

> “Kalau misalnya untuk target kuliahnya, kalau harian rata-rata orang tua itu nggak respons karena target drill dan target attendance sudah direport. Tapi kalau sudah masalah target kuliahnya, tiba-tiba nanya atau nge-WA perkembangan gimana.”
>
> — Narasumber SA, sesi 29 September 2026, 00:03:27–00:04:08

Saat ini SA harus menggabungkan responses lulusan, data Ruangguru, data Zebracross, sertifikat UTBK, hasil Tryout, dan sumber resmi lain secara manual. Internal benchmark tool dibutuhkan untuk mengubah sumber-sumber tersebut menjadi referensi internal yang cepat dicari, memiliki status validasi, dan dapat langsung mendukung konsultasi.

## 2. Tujuan tool

Tool ini harus membantu SA menjawab tiga pertanyaan utama:

1. Seperti apa benchmark historis untuk jurusan atau universitas yang dituju?
2. Bagaimana posisi nilai siswa saat ini dibandingkan benchmark tersebut?
3. Apa target, risiko, dan langkah berikutnya yang perlu dibahas bersama siswa dan orang tua?

Tool bukan mesin untuk menjanjikan kelulusan. Fungsinya adalah membantu SA menyusun konsultasi yang lebih cepat, konsisten, transparan sumbernya, dan realistis.

## 3. Masalah saat ini

### 3.1 Data benchmark tersebar

SA saat ini membuka beberapa sumber secara terpisah, menyimpan link responses lulusan, membandingkan data Ruangguru dan Zebracross, serta melihat sertifikat UTBK siswa tahun sebelumnya.

> “Untuk benchmark jurusan, SA membuka responses lulusan Ruangguru tahun sebelumnya yang memuat jurusan, universitas, dan nilai siswa yang diterima.”

> “Sebelum konsultasi, data Ruangguru dapat dibandingkan dengan data Zebracross dan sertifikat UTBK siswa tahun sebelumnya.”

Karena belum ada tempat pencarian terpusat, SA harus mengingat atau mencari ulang sumber ketika orang tua mengajukan pertanyaan.

### 3.2 Akses data dan laporan belum cepat

Masalah keterlambatan data tidak hanya terjadi pada benchmark, tetapi juga memperlihatkan pola kerja yang masih manual.

> “Kalau drill soal, saya minta siswanya untuk selalu screenshot hasilnya. Kalau menunggu report dari pusat itu lumayan lama, jadi untuk nge-track siswa tiap hari, setelah drill hasil nilainya di-screenshot.”
>
> — Narasumber SA, sesi 29 September 2026, 00:07:41–00:08:41

> “Di Data Studio drilling soal itu akan update, jadi paling tidak tiga hari sekali saya tarik datanya. Saya cek siswa yang belum mencapai target.”
>
> — Narasumber SA, sesi 29 September 2026, 00:13:18–00:14:18

Pola ini menunjukkan pentingnya menampilkan tanggal pembaruan data, sumber data, dan status validasi di dalam tool.

### 3.3 Benchmark belum dapat dianggap sebagai acuan final

Data benchmark dan pembobotan subtes belum sepenuhnya tervalidasi.

> “Acuan dari Zebracross buat grafik masih belum bisa diangkat karena pembobotan subtes belum yakin benar atau tidak. Kita sambil lihat Tryout yang berjalan dulu, baru simpulkan langkah berikutnya.”
>
> — Tim internal, sesi 29 September 2026, bagian penutup rekaman

Karena itu, tool harus membedakan data historis, data pembanding, target belajar, dan proyeksi peluang. Setiap data perlu memiliki label tingkat keyakinan serta catatan keterbatasan.

### 3.4 Informasi pilihan kampus dan jurusan belum terintegrasi

Benchmark nilai saja belum cukup untuk konsultasi. SA juga membutuhkan informasi tentang daya tampung, jumlah peminat, persyaratan, portofolio, timeline, prospek, dan tingkat risiko pilihan.

> “Masukkan pilihan satu, pilihan kedua, pilihan ketiga. Setelah disusun, langsung muncul berapa daya tampung, persyaratan yang harus dilengkapi, apakah ada portofolio atau persyaratan khusus, dan ringkasan informasi penting yang harus disiapkan siswa.”
>
> — Narasumber SA, sesi 17 September 2026, 00:42:12–00:44:14

Kebutuhan ini memperluas fungsi tool: dari sekadar pencarian benchmark menjadi **alat bantu perencanaan pilihan** yang digunakan dalam konsultasi.

## 4. Posisi tool dalam SA Knowledge Base

Internal benchmark tool sebaiknya menjadi salah satu modul di dalam SA Knowledge Base, dengan pemisahan fungsi berikut:

| Modul | Fungsi |
|---|---|
| Internal Benchmark | Mencari benchmark historis lulusan dan membandingkannya dengan nilai siswa. |
| Pilihan Kampus/Jurusan | Menyusun beberapa pilihan, melihat persyaratan, daya tampung, peminat, risiko, dan prospek. |
| Sumber Resmi | Menyimpan tautan dokumen asli pemerintah atau institusi. |
| Target Score | Membantu menetapkan target per subtes dengan catatan tingkat keyakinan. |
| Panduan Konsultasi | Menyediakan cara menjelaskan hasil kepada orang tua dan siswa. |

Knowledge Base yang lebih luas diperlukan karena pertanyaan orang tua tidak hanya terkait benchmark, tetapi juga jalur SNBP, SNBT/UTBK, mandiri, UM, dan kedinasan.

> “Linktree dibuat supaya orang tua mendapat sumber resmi. Kalau dibuka, semuanya langsung mengarah ke dokumen asli pemerintah. Untuk kedinasan ke BKN. Informasi jalur mandiri tidak bisa kami provide seluruhnya karena update-nya berkala dan jumlahnya banyak; yang lebih bisa disediakan adalah SNBP dan SNBT.”
>
> — Tim internal, sesi 17 September 2026, 00:47:58–00:49:32

## 5. Kebutuhan pengguna

### SA

- Mencari benchmark berdasarkan universitas, jurusan, tahun, dan jalur seleksi.
- Melihat nilai atau skor lulusan yang relevan.
- Membandingkan benchmark dengan hasil Tryout dan nilai siswa saat ini.
- Melihat gap per subtes.
- Menyusun pilihan 1, 2, 3, dan alternatif lainnya.
- Melihat daya tampung, jumlah peminat, persyaratan, portofolio, timeline, dan prospek.
- Mendapat warning jika kombinasi pilihan terlalu berisiko.
- Melihat sumber, tanggal pembaruan, dan status validasi setiap informasi.
- Menggunakan ringkasan hasil dalam sesi konsultasi.

### Orang tua dan siswa

- Mendapat penjelasan yang realistis tentang posisi siswa.
- Memahami target belajar dan gap yang perlu dikejar.
- Mengetahui alasan suatu pilihan dianggap aman, berisiko, atau perlu alternatif.
- Mendapat informasi dari SA tanpa memperoleh akses ke data mentah eksklusif.

### Tim akademik atau data owner

- Mengelola sumber benchmark.
- Memvalidasi data dan pembobotan.
- Menetapkan tanggal review atau kedaluwarsa informasi.
- Menyetujui perubahan data dan mengawasi kualitasnya.

## 6. Struktur data minimum

### Data benchmark lulusan

| Kelompok data | Field minimum |
|---|---|
| Target | Universitas, kampus, fakultas, jurusan |
| Seleksi | Tahun, jalur seleksi, jenis ujian |
| Hasil | Nilai atau skor, subtes jika tersedia, status diterima |
| Profil | Kode anonim lulusan; atribut tambahan hanya jika relevan dan diizinkan |
| Sumber | Nama sumber, link internal, tanggal pengambilan |
| Validasi | Status validasi, validator, catatan keterbatasan |
| Konteks | Kuota, perubahan kebijakan, format ujian, dan catatan tahun berjalan |

### Data pilihan kampus dan jurusan

- Daya tampung.
- Jumlah peminat.
- Persyaratan akademik dan nonakademik.
- Portofolio atau dokumen tambahan.
- Timeline pendaftaran.
- Jalur seleksi.
- Prospek jurusan.
- Tingkat risiko pilihan.
- Tanggal pembaruan dan sumber resmi.

### Data siswa

- Nilai Tryout terbaru.
- Riwayat skor per subtes.
- Nilai rapor jika tersedia dan diizinkan.
- Target jurusan dan universitas.
- Aktivitas belajar dan progres.
- Catatan konsultasi serta rencana tindak lanjut.

Data pribadi lulusan yang tidak diperlukan untuk konsultasi tidak perlu disimpan. Fokusnya adalah pola benchmark, bukan identitas individu.

## 7. Alur penggunaan ideal

1. SA masuk menggunakan akun internal personal.
2. SA membuka profil siswa sesuai hak aksesnya.
3. SA memasukkan beberapa target universitas dan jurusan.
4. Tool menampilkan benchmark historis yang relevan berdasarkan tahun dan jalur.
5. Tool membandingkan nilai siswa saat ini dengan benchmark dan target per subtes.
6. Tool menampilkan daya tampung, peminat, persyaratan, timeline, prospek, dan tingkat risiko pilihan.
7. Tool memberikan warning jika pilihan terlalu kompetitif atau kombinasi pilihan tidak seimbang.
8. SA membahas target utama, gap, prioritas belajar, dan pilihan alternatif.
9. SA mencatat hasil konsultasi dan rencana tindak lanjut.

Output untuk orang tua sebaiknya berupa ringkasan, misalnya:

> “Berdasarkan data historis internal pada jalur dan periode yang relevan, posisi siswa saat ini masih memiliki gap pada subtes tertentu. Data ini bukan nilai aman atau jaminan diterima. Fokus berikutnya adalah meningkatkan subtes prioritas dan menyiapkan pilihan pembanding dengan mempertimbangkan daya tampung, peminat, dan persyaratan.”

## 8. Fitur prioritas MVP

MVP perlu memprioritaskan fungsi yang langsung membantu konsultasi dan keamanan data:

1. Login akun internal personal.
2. Role-based access untuk SA, lead, data owner, dan admin.
3. Pencarian benchmark berdasarkan universitas, jurusan, tahun, jalur, dan nilai.
4. Tampilan sumber, tanggal pembaruan, dan status validasi.
5. Perbandingan benchmark dengan skor siswa saat ini.
6. Tampilan gap per subtes jika datanya valid.
7. Input beberapa pilihan kampus dan jurusan.
8. Tampilan daya tampung, peminat, persyaratan, timeline, dan risiko.
9. Warning untuk pilihan yang terlalu kompetitif.
10. Template ringkasan hasil konsultasi tanpa data mentah.
11. Audit log akses dan perubahan data.
12. Pembatasan export, download, dan tautan publik.

Fitur prediksi otomatis yang lebih kompleks dapat dikerjakan setelah definisi benchmark, kualitas data, dan pembobotan subtes cukup stabil.

## 9. Keamanan dan governance

Karena data bersifat eksklusif, perlindungan data harus menjadi bagian dari MVP:

- tidak ada akses publik atau akun bersama;
- akses hanya untuk pengguna internal yang berwenang;
- identitas lulusan dimasking atau dianonimkan;
- export dan download dibatasi;
- sumber mentah tidak ditampilkan kepada orang tua atau siswa;
- setiap akses dan perubahan tercatat dalam audit log;
- perubahan benchmark memerlukan owner dan proses validasi;
- setiap record memiliki klasifikasi kerahasiaan dan tanggal review;
- akses dicabut ketika pengguna pindah peran atau tidak lagi memiliki kebutuhan kerja;
- insiden penyebaran data memiliki prosedur pelaporan dan penanganan.

Sumber eksternal untuk informasi penerimaan dan regulasi juga harus dipisahkan dari data benchmark eksklusif. SA Knowledge Base dapat menyimpan tautan dokumen resmi pemerintah atau institusi, tetapi informasi yang berubah setiap tahun wajib mencantumkan tanggal pembaruan.

## 10. Prinsip komunikasi hasil

SA perlu menggunakan istilah yang konsisten:

- **Benchmark historis:** data siswa yang pernah diterima pada periode tertentu.
- **Target belajar:** skor atau aktivitas yang perlu dikejar siswa.
- **Proyeksi:** estimasi berbasis data yang memiliki tingkat keyakinan dan keterbatasan.
- **Peluang:** interpretasi posisi siswa, bukan jaminan penerimaan.

> “Kalau mau cari berapa jumlah peminat sama kuotanya, pasti arahnya ke SNPMB. Kalau orang tua minta nilai aman, tetap saya sampaikan bahwa tidak ada yang memberikan informasi secara tepat berapa nilai aman untuk masuk kampus tersebut. Kalau mau aman, kejar lebih tinggi.”
>
> — Narasumber SA, sesi 17 September 2026, 00:30:10–00:32:34

Untuk siswa dengan skor masih sekitar 400–500, pembahasan sebaiknya dimulai dari target fondasi sebelum membuka proyeksi yang lebih detail.

> “Kalau nilai siswa masih di rata-rata 400–500, saya sampaikan targetnya harus minimal 600 dulu semua subtesnya. Kalau sudah mencapai 600, baru dianalisis lagi subtes mana yang perlu dilanjutkan lebih tinggi.”
>
> — Narasumber SA, sesi 29 September 2026, 00:16:48–00:17:26

Untuk target sangat kompetitif, SA perlu menyampaikan risiko secara terbuka dan membantu menyiapkan alternatif.

> “Kalau targetnya tinggi, misalnya kedokteran, saya blak-blakan. Kalau nilai sekarang dan tiap bulan tidak ada progres kenaikan, akan berat. Siswa perlu mempertimbangkan jurusan atau universitas lain.”
>
> — Narasumber SA, sesi 29 September 2026, 00:17:26–00:17:56

## 11. Proyeksi target score per subtes

Kebutuhan proyeksi target score muncul secara eksplisit dalam masukan SA:

> “Kalau dari Ruangguru sendiri sudah bisa menyediakan proyeksi target score per subtes, itu akan sangat membantu SA.”
>
> — Narasumber SA, sesi 17 September 2026, 00:33:00–00:33:18

Fitur ini dapat menjadi pengembangan penting, tetapi perlu dibangun dengan hati-hati:

- menampilkan sumber dan periode data;
- menjelaskan cara perhitungan secara ringkas;
- menunjukkan tingkat keyakinan atau kualitas data;
- memisahkan TKA dari benchmark yang historisnya lebih terbatas;
- tidak menampilkan hasil sebagai “nilai aman”;
- selalu menyediakan catatan bahwa kebijakan, kuota, peminat, dan tingkat persaingan dapat berubah.

## 12. Rencana implementasi

### 0–30 hari: definisi dan konsolidasi

- Menunjuk owner internal benchmark tool.
- Menetapkan role pengguna dan aturan akses.
- Menginventarisasi responses lulusan, data Ruangguru, Zebracross, sertifikat UTBK, dan sumber lain.
- Menetapkan struktur field dan definisi benchmark.
- Memilih universitas, jurusan, dan jalur prioritas berdasarkan frekuensi pertanyaan orang tua.
- Menandai data yang sudah valid, belum valid, atau membutuhkan review.

### 31–60 hari: MVP internal

- Membangun database terpusat dan pencarian internal.
- Menambahkan filter universitas, jurusan, tahun, jalur, dan nilai.
- Menambahkan status validasi, tanggal pembaruan, dan sumber.
- Menguji perbandingan benchmark dengan profil siswa.
- Menguji input pilihan kampus/jurusan dan warning risiko.
- Menguji apakah pengguna tanpa hak akses tidak dapat membuka data.

### 61–90 hari: uji konsultasi dan governance

- Menggunakan tool dalam kasus konsultasi nyata.
- Menyusun template ringkasan untuk orang tua.
- Mengaktifkan audit log dan review akses berkala.
- Mengumpulkan feedback SA tentang data, filter, dan output yang masih kurang.
- Menyusun proses pembaruan tahunan dan review benchmark.

### Tahap lanjutan

- Menambahkan proyeksi target score per subtes.
- Menambahkan rekomendasi program belajar berdasarkan gap.
- Menambahkan ranking pilihan 1, 2, 3, dan seterusnya.
- Menambahkan prospek jurusan dan informasi politeknik.
- Mengembangkan integrasi dengan data Tryout dan dashboard siswa.

## 13. Indikator keberhasilan

- Waktu SA menemukan benchmark yang relevan.
- Persentase data benchmark yang memiliki sumber dan tanggal pembaruan.
- Persentase data yang memiliki status validasi.
- Penurunan pencarian manual melalui banyak link, screenshot, atau akun siswa.
- Persentase konsultasi SMA yang menggunakan internal benchmark tool.
- Konsistensi penjelasan SA mengenai benchmark, proyeksi, dan batasannya.
- Waktu yang dibutuhkan untuk menyusun alternatif pilihan kampus/jurusan.
- Kepuasan SA terhadap kemudahan pencarian dan kelengkapan informasi.
- Tidak ada akses publik atau penyebaran data eksklusif di luar pengguna berwenang.
- Persentase perubahan data yang memiliki owner dan jejak audit.

## 14. Kesimpulan

Prioritas 3 sebaiknya diwujudkan sebagai **modul Internal Benchmark di dalam SA Knowledge Base**. Modul ini mengonsolidasikan data benchmark lulusan dan menghubungkannya dengan perencanaan pilihan kampus atau jurusan.

Nilai utama tool bukan sekadar menyimpan angka, tetapi membantu SA mengubah data eksklusif yang tersebar menjadi konsultasi yang terstruktur:

> benchmark historis → posisi siswa → gap per subtes → risiko pilihan → target belajar → alternatif → tindak lanjut

Tool harus bersifat internal, memiliki akses terbatas, mencatat sumber dan validasi, serta membantu SA berkomunikasi tanpa menjanjikan kelulusan. Pengembangan sebaiknya dimulai dari pencarian benchmark dan perbandingan sederhana, kemudian diperluas ke warning risiko, proyeksi target score, rekomendasi belajar, dan ranking pilihan.

## Sumber

Ringkasan Masukan Kak Nur dan Tim SA, yang menggabungkan temuan dari sesi **Ngobrol bareng SA - 2026_09_29 10_00 WIB** dan **Ngobrol sama SA - 2026_09_17 14_00 WIB**. Kutipan diambil dari bagian “Bukti Verbatim” dan “Lampiran Verbatim Pilihan” pada source yang diperbarui.
