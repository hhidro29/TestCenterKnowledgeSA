# Handover Chat Codex — Test Center Knowledge

Dokumen ini dipakai untuk menguji chatbot knowledge base langsung lewat chat Codex. Tidak perlu menjalankan prototype web.

## Setup untuk tester

1. Buka project/repository `TestCenterKnowledgeSA` di Codex atau buka Space yang sudah dibagikan.
2. Buat **chat baru** untuk setiap sesi pengujian supaya riwayat chat tidak memengaruhi hasil.
3. Pastikan folder `knowledge-base/` tersedia sebagai konteks chat.
4. Pilih model yang ingin diuji dari model picker. Untuk validasi awal, gunakan model paling ringan/cepat yang tersedia.
5. Tempel prompt sistem di bawah ini sebagai pesan pertama.

## Prompt siap tempel

```text
Kamu adalah Test Center Knowledge Assistant berbasis knowledge base.

Gunakan hanya informasi dari file knowledge-base yang tersedia di chat ini. Jangan memakai browsing atau pengetahuan luar untuk menjawab pertanyaan faktual.

Aturan:
- Jawab dalam Bahasa Indonesia dengan gaya percakapan yang natural dan membantu.
- Mulai langsung dari inti jawaban. Jangan memakai template tetap seperti “Jawaban”, “Sumber”, dan “Catatan”.
- Gunakan paragraf pendek. Pakai bullet hanya jika memang membantu membaca daftar atau langkah.
- Jangan mengarang jadwal, kuota, biaya, syarat, angka, kebijakan, atau tautan.
- Jika informasinya belum ada atau sumbernya tidak cukup, katakan dengan jelas: “Informasi tersebut belum ditemukan atau belum tervalidasi di knowledge base.”
- Untuk pertanyaan yang ambigu, ajukan satu pertanyaan klarifikasi singkat.
- Jika menyebut sumber, sebutkan judul dokumen secara singkat dan statusnya bila tersedia. Jangan menyalin metadata panjang.
- Untuk informasi yang bisa berubah, sebutkan tanggal ekstraksi yang ada di dokumen dan sarankan pengecekan sumber resmi.
- Jangan menjelaskan proses berpikir internal.

Jawab pertanyaan berikutnya sebagai asisten knowledge base, bukan sebagai editor file.
``` 

## Pertanyaan uji yang realistis

### 1. Informasi yang kemungkinan tersedia

> Saya siswa kelas 12 dan ingin ikut SNBT. Dari knowledge base, apa saja hal yang perlu saya siapkan dan bagian mana yang harus saya cek ulang di laman resmi?

### 2. Pertanyaan gabungan

> Saya ingin memilih kota lokasi UTBK, memahami ketentuan peserta, lalu membuat rencana persiapan selama 8 minggu. Informasi apa yang benar-benar ada di knowledge base, dan bagian mana yang belum ada?

### 3. Kasus dengan tahun berbeda

> Saya menemukan informasi SNBT 2025, tetapi saya akan ikut seleksi 2026. Mana yang masih bisa dijadikan konteks dan mana yang tidak boleh langsung dianggap berlaku?

### 4. Informasi yang mungkin belum tersedia

> Berapa biaya pendaftaran dan tanggal pasti pendaftaran program yang saya tanyakan?

Perhatikan apakah asisten mengakui ketika datanya belum tersedia, bukan menebak.

### 5. Pertanyaan lanjutan

> Dari jawaban tadi, apa langkah pertama yang paling aman saya lakukan hari ini?

## Checklist feedback

- Jawaban terasa seperti percakapan manusia atau seperti laporan?
- Jawaban langsung menjawab kebutuhan pengguna?
- Daftar hanya dipakai saat memang diperlukan?
- Asisten membedakan fakta yang ada dan informasi yang belum tersedia?
- Sumber mudah dilacak?
- Ada bagian yang membingungkan, terlalu panjang, atau terdengar mengarang?

## Cara berbagi di Codex

Di Codex, buka Space atau page yang berisi dokumen ini dan knowledge base, lalu gunakan tombol **Share**. Berikan akses **View** untuk tester yang hanya perlu mencoba atau **Edit** untuk tester yang juga perlu memperbaiki prompt. Minta setiap tester membuat chat baru dari prompt yang sama agar hasilnya dapat dibandingkan dengan lebih adil.
