# SA Knowledge Portal — Revision Brief

## Tujuan

Buat draft revisi untuk **Opsi 1: SA Knowledge Portal**, yaitu portal knowledge internal dengan pola seperti wiki atau documentation website.

Draft revisi harus dibuat di **frame baru yang terpisah** dari desain existing. Jangan mengubah frame existing secara langsung.

File Figma target:

`https://www.figma.com/design/osWjLlKuruOaa82JDXgj6g/SA-Knowledge`

Frame referensi existing:

`portal-pengetahuan-tka-snbp`

## Konteks produk

Platform ini digunakan oleh SA dan tim internal yang berwenang untuk:

- mencari informasi penerimaan universitas;
- memahami persyaratan dan timeline;
- melihat sumber resmi dan status validasi informasi;
- melihat data historis siswa yang pernah diterima;
- membandingkan snapshot nilai siswa saat ini;
- menyimpan konteks konsultasi.

Platform ini **bukan database utama profil siswa**.

Profil dan progres siswa tetap berada di sistem eksternal. Nilai siswa yang dimasukkan ke platform hanya merupakan snapshot untuk kebutuhan perbandingan dan dapat disimpan sebagai bagian dari rekam konsultasi.

Gunakan data dummy. Jangan gunakan nama, email, nomor telepon, atau identitas siswa asli.

## Arah desain

Pertahankan karakter visual existing:

- layout documentation/wiki;
- header dengan global search;
- breadcrumb;
- daftar isi di kolom kiri;
- artikel utama di kolom kanan;
- card dengan border ringan;
- warna sederhana dan profesional;
- mudah dipindai oleh SA.

Namun, revisi harus membuat halaman lebih berguna untuk workflow SA. Artikel panjang tidak boleh menjadi satu-satunya cara untuk menemukan jawaban.

## Prinsip utama revisi

1. Tampilkan ringkasan jawaban sebelum artikel panjang.
2. Bedakan informasi resmi dari data historis siswa.
3. Tampilkan sumber, status validasi, dan tanggal terakhir dicek dengan jelas.
4. Sediakan CTA menuju data historis, comparison, dan consultation record.
5. Jangan memberi kesan bahwa data historis adalah nilai aman atau prediksi kelulusan.
6. Semua halaman harus memiliki label `Internal Only`.
7. Gunakan istilah `Data historis siswa yang pernah diterima`, bukan hanya `Benchmark`.
8. Informasi yang belum diketahui harus diberi label, bukan diisi dengan asumsi.

## Use case utama

SA ingin mencari informasi penerimaan:

> “Bagaimana penerimaan UTBK/SNBT untuk Kedokteran UI tahun 2026?”

Portal perlu membantu SA menemukan informasi dengan cepat tanpa membuka banyak sumber manual.

## Frame baru

Buat satu frame baru dengan nama:

`SA Knowledge — Portal Revision — UI Kedokteran SNBT 2026`

Rekomendasi ukuran desktop:

- width: 1440 px;
- height: sekitar 2600–3000 px;
- layout dua kolom;
- gunakan vertical scrolling secara konseptual.

Jangan menghapus atau mengubah frame referensi existing.

## Struktur halaman yang diminta

### 1. Header

Pertahankan header existing, tetapi tambahkan atau pastikan tersedia:

- logo atau nama produk;
- global search;
- label `Internal Only`;
- role user, misalnya `Senior Advisor`;
- avatar atau menu user.

Placeholder global search:

`Cari universitas, jurusan, jalur, atau topik...`

### 2. Breadcrumb

Contoh:

`SA Knowledge > Universitas Indonesia > Kedokteran > SNBT 2026`

Breadcrumb harus membantu user memahami konteks halaman yang sedang dibaca.

### 3. Kolom kiri: daftar isi artikel

Gunakan sticky table of contents.

Daftar isi:

1. Ringkasan penerimaan
2. Persyaratan utama
3. Timeline dan tahapan
4. Daya tampung dan peminat
5. Data historis siswa yang pernah diterima
6. Sumber dan validasi
7. Catatan keterbatasan

Section aktif harus terlihat jelas.

### 4. Bagian hero artikel

Judul:

`Panduan Penerimaan Kedokteran UI melalui SNBT 2026`

Deskripsi:

`Ringkasan persyaratan, timeline, daya tampung, sumber resmi, dan data historis yang relevan untuk kebutuhan konsultasi SA.`

Tambahkan metadata:

- `Universitas Indonesia`
- `Program Studi Kedokteran`
- `Jalur SNBT / UTBK`
- `Tahun 2026`
- `Internal Only`

## 5. Quick Summary — wajib ada di atas artikel

Buat card ringkasan yang muncul sebelum isi artikel panjang.

Judul card:

`Ringkasan cepat`

Isi minimal:

- Status informasi: `Tervalidasi`
- Sumber utama: `Portal resmi UI / SNPMB`
- Terakhir dicek: `12 Januari 2026`
- Knowledge owner: `Tim Knowledge Ops`
- Daya tampung: gunakan data dummy, misalnya `90 kursi`
- Jumlah peminat: gunakan data dummy, misalnya `1.834 pendaftar`
- CTA: `Buka sumber resmi`
- CTA: `Lihat riwayat perubahan`

Tambahkan status visual yang mudah dipindai:

- hijau atau teal untuk `Tervalidasi`;
- kuning untuk `Perlu ditinjau`;
- abu-abu untuk `Belum tersedia`.

## 6. Section: Persyaratan utama — harus actionable, bukan checklist generik

Jangan membuat daftar checkbox kosong seperti “memenuhi ketentuan peserta” atau “mengikuti persyaratan akademik”. Konten tersebut tidak membantu SA menjawab pertanyaan orang tua.

Setiap persyaratan harus menjawab empat hal:

1. Apa yang harus dipenuhi?
2. Detail atau angka apa yang diketahui?
3. Status konfirmasinya apa?
4. Apa yang perlu dilakukan SA selanjutnya?

Gunakan pola **requirement card** atau tabel dengan kolom:

| Persyaratan | Detail yang diketahui | Status | Sumber / terakhir dicek | Action SA |
|---|---|---|---|---|
| Peserta SNBT 2026 | Mengikuti ketentuan peserta pada panduan resmi SNPMB 2026 | Tervalidasi | SNPMB • 12 Jan 2026 | Buka sumber |
| Pilihan program studi | Maksimal pilihan dan ketentuan program studi mengikuti aturan SNPMB tahun berjalan | Perlu dikonfirmasi | SNPMB • 12 Jan 2026 | Cek panduan terbaru |
| Persyaratan khusus Kedokteran UI | Detail belum ditemukan pada repository; jangan menyimpulkan bahwa tidak ada persyaratan khusus | Belum tersedia | Belum ada sumber terverifikasi | Minta Knowledge Owner cek |
| Dokumen pendaftaran | Dokumen mengikuti daftar resmi pada portal pendaftaran | Tervalidasi sebagian | Portal pendaftaran • 12 Jan 2026 | Lihat daftar dokumen |

Gunakan dummy content yang terasa seperti jawaban nyata, tetapi jangan mengarang aturan spesifik yang belum memiliki sumber.

Contoh tampilan satu card:

```text
Persyaratan khusus program studi Kedokteran UI

Status: Belum tersedia di repository
Yang diketahui: belum ada catatan terverifikasi mengenai persyaratan tambahan
di luar ketentuan SNBT umum.

Yang perlu dilakukan:
Knowledge Owner perlu mengecek sumber resmi UI dan menambahkan referensi.

[Minta verifikasi] [Tambah sumber]
Sumber: belum tersedia
```

Tambahkan ringkasan jawaban di bagian atas section:

> Untuk saat ini, repository sudah memuat ketentuan SNBT umum. Persyaratan khusus Kedokteran UI belum dapat dikonfirmasi dan tidak boleh diasumsikan tidak ada.

Tambahkan label sumber **di setiap requirement card yang berbeda sumber**, bukan hanya satu label di akhir seluruh section.

Gunakan status berikut:

- `Tervalidasi`: isi didukung oleh sumber resmi yang masih berlaku;
- `Tervalidasi sebagian`: sebagian detail tersedia, tetapi ada bagian yang harus dicek lagi;
- `Perlu ditinjau`: sumber ada, tetapi tanggal atau relevansinya perlu diperbarui;
- `Belum tersedia`: jangan membuat kesimpulan; arahkan ke action berikutnya.

Hindari kata-kata yang memberi kepastian berlebihan:

- `pasti memenuhi`;
- `aman`;
- `pasti lolos`;
- `tidak ada persyaratan tambahan` jika belum ada sumber.

## 7. Section: Timeline dan tahapan

Gunakan timeline atau step cards yang mudah dipindai.

Contoh:

1. Registrasi akun SNPMB
2. Pendaftaran SNBT
3. Pelaksanaan UTBK
4. Pemilihan program studi
5. Pengumuman hasil
6. Tahap lanjutan atau registrasi ulang jika berlaku

Setiap tahap harus menampilkan tanggal atau status, sumber, dan action jika tanggal belum diketahui:

- `Tanggal resmi tersedia` + tanggal + sumber;
- `Menunggu pembaruan` + tanggal terakhir data dicek;
- `Perlu dikonfirmasi` + action `Minta verifikasi`.

Jangan mengarang tanggal jika tidak ada sumber.

## 8. Section: Daya tampung dan peminat

Buat card atau tabel ringkas:

| Informasi | Nilai dummy |
|---|---:|
| Daya tampung | 90 kursi |
| Jumlah peminat | 1.834 pendaftar |
| Tahun | 2026 |
| Jalur | SNBT |

Tambahkan catatan:

`Angka ini adalah informasi per siklus penerimaan dan bukan prediksi peluang diterima.`

## 9. Section: Data historis siswa yang pernah diterima

Section ini harus dipisahkan secara visual dari informasi resmi.

Gunakan judul:

`Data historis siswa yang pernah diterima`

Subjudul:

`Data anonim untuk referensi konsultasi — bukan nilai aman dan bukan jaminan diterima.`

Tampilkan tabel dummy:

| ID anonim | Skor total | Matematika | Verbal | Penalaran | Literasi | Tahun | Jalur | Status |
|---|---:|---:|---:|---:|---:|---:|---|---|
| HK-UI-001 | 742 | 128 | 121 | 126 | 124 | 2026 | SNBT | Tervalidasi |
| HK-UI-002 | 728 | 124 | 118 | 122 | 121 | 2026 | SNBT | Tervalidasi |
| HK-UI-003 | 715 | 119 | 116 | 120 | 118 | 2026 | SNBT | Tervalidasi |

Jangan tampilkan:

- nama siswa;
- nomor telepon;
- email;
- alamat;
- nomor identitas;
- profil lengkap siswa.

Tambahkan CTA:

`Lihat semua data historis`

`Bandingkan snapshot nilai siswa`

## 10. Section: Sumber dan validasi

Buat panel yang eksplisit membedakan sumber resmi dan catatan internal.

Contoh:

### Sumber utama

- Nama: `Portal resmi SNPMB / UI`
- Tipe: `Sumber resmi`
- URL: gunakan placeholder atau URL dummy yang jelas
- Status: `Tervalidasi`
- Terakhir dicek: `12 Januari 2026`
- Dicek oleh: `Tim Knowledge Ops`

### Riwayat perubahan

- `12 Jan 2026 — informasi diperbarui — Tim Knowledge Ops`
- `04 Dec 2025 — sumber awal ditambahkan — Tim Knowledge Ops`

CTA:

`Buka sumber resmi`

`Lihat riwayat perubahan`

## 11. Section: Catatan keterbatasan

Gunakan callout dengan warna yang berbeda dari informasi resmi.

Teks wajib:

> Data historis hanya merupakan referensi berdasarkan record yang tersedia. Data ini bukan nilai aman, bukan prediksi peluang diterima, dan bukan jaminan diterima.

Tambahkan:

> Profil dan progres siswa tetap berada di sistem eksternal. Nilai siswa yang dimasukkan ke module comparison hanya merupakan snapshot.

## 12. Action area

Letakkan action area setelah ringkasan atau di akhir artikel. CTA utama:

- `Bandingkan snapshot nilai`
- `Simpan rekam konsultasi`
- `Laporkan informasi perlu diperbarui`

CTA sekunder:

- `Kembali ke hasil pencarian`
- `Lihat sumber resmi`

## Knowledge Owner controls

Tambahkan area sederhana yang hanya terlihat untuk role berwenang:

`Knowledge Owner controls`

Isi:

- `Tambah sumber`
- `Ubah status validasi`
- `Ubah tanggal terakhir dicek`
- `Tambah catatan keterbatasan`
- `Lihat riwayat perubahan`

Jangan membuat halaman admin lengkap. Cukup tampilkan sebagai panel kecil atau action menu untuk menunjukkan konsepnya.

## Interaksi prototype

Buat koneksi prototype dasar jika memungkinkan:

1. `Buka sumber resmi` → source detail atau external link state.
2. `Lihat semua data historis` → historical records screen.
3. `Bandingkan snapshot nilai` → comparison screen.
4. `Simpan rekam konsultasi` → consultation record detail.
5. `Lihat riwayat perubahan` → change history panel.
6. Table of contents → scroll ke section terkait.

Jika seluruh konten berada dalam satu frame, gunakan scroll-to untuk section internal.

## Guardrails

- Ini adalah Opsi 1, bukan desain chatbot AI.
- Jangan menambahkan chat bubble, AI typing indicator, atau prompt conversational sebagai elemen utama.
- Jangan membuat prediction score atau probability of acceptance.
- Jangan menyebut data historis sebagai benchmark tanpa konteks.
- Jangan menyimpan nilai aktif sebagai profil siswa permanen.
- Jangan menggunakan identitas siswa asli.
- Jangan menghapus frame existing.
- Jangan membuat dashboard kompleks.
- Jangan menambahkan integrasi real-time atau sistem akademik lengkap.

## Acceptance criteria

Revisi dianggap berhasil jika:

- SA dapat memahami konteks universitas, jurusan, tahun, dan jalur dari bagian atas halaman;
- jawaban utama dapat ditemukan tanpa membaca seluruh artikel;
- status validasi, sumber, owner, dan tanggal terakhir dicek terlihat jelas;
- informasi resmi terpisah dari data historis siswa;
- data historis seluruhnya anonim;
- disclaimer tentang keterbatasan data terlihat jelas;
- tersedia CTA untuk historical records, comparison, dan consultation record;
- Knowledge Owner dapat memahami area pengelolaan sumber;
- frame revisi terpisah dari frame existing;
- desain tetap terasa seperti portal dokumentasi internal, bukan chatbot.

## Handoff note untuk AI/Figma agent

Gunakan frame existing sebagai referensi visual, tetapi buat frame baru untuk revisi.

Sebelum membuat elemen baru:

1. Inspect frame existing dan library yang sudah terhubung.
2. Pertahankan pola header, breadcrumb, table of contents, card, typography, dan spacing yang sudah ada.
3. Gunakan komponen/library yang tersedia jika relevan.
4. Bangun wrapper dan section secara bertahap.
5. Validasi dengan screenshot setelah major section.
6. Pastikan tidak ada clipping, overlap, placeholder, atau teks yang sulit dibaca.
7. Return semua node ID yang dibuat atau diubah.

Output yang diharapkan adalah **satu draft low-to-mid fidelity untuk portal documentation**, bukan implementasi final dan bukan AI chat interface.
