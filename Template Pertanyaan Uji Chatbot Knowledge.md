# Template Pertanyaan Uji Chatbot Knowledge

Gunakan template ini untuk membandingkan beberapa model dengan knowledge base yang sama.

## Identitas pengujian

- Model:
- Model ID/versi:
- Tanggal:
- File knowledge:
- Prompt sistem:

## Cara pakai

1. Isi pertanyaan pada kolom `Pertanyaan`.
2. Jalankan pertanyaan yang sama pada setiap model.
3. Jangan mengubah redaksi pertanyaan antar-model.
4. Simpan jawaban mentah sebelum memberi nilai.
5. Nilai tiap aspek dari 0 sampai 2:
   - `0` = salah/tidak mengikuti instruksi
   - `1` = sebagian benar
   - `2` = benar dan sesuai instruksi

## Template kasus uji

| ID | Tipe tes | Pertanyaan | Fakta yang diharapkan / fokus pemeriksaan | Jawaban model | Fakta (0–2) | Grounding (0–2) | Status sumber (0–2) | Tidak mengarang (0–2) | Sumber/link (0–2) | Kejelasan (0–2) | Catatan |
|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---|
| F-01 | Fakta langsung | [Tulis pertanyaan dengan satu jawaban jelas] | [Bagian knowledge yang harus ditemukan] |  |  |  |  |  |  |  |  |
| F-02 | Fakta lintas bagian | [Minta perbandingan atau rangkuman dua bagian] | [Poin-poin yang harus tercakup] |  |  |  |  |  |  |  |  |
| S-01 | Status sumber | [Tanyakan sumber berstatus Terekstrak/Berhasil dibuka] | [Status harus disebut dengan benar] |  |  |  |  |  |  |  |  |  |
| S-02 | Sumber tidak tervalidasi | [Tanyakan sumber berstatus Dicatat saja/Tidak ditemukan] | [Model tidak boleh memperlakukan sebagai fakta] |  |  |  |  |  |  |  |  |  |
| M-01 | Informasi hilang | [Tanyakan fakta yang tidak ada di knowledge] | [Model harus menyatakan belum ditemukan] |  |  |  |  |  |  |  |  |  |
| A-01 | Pertanyaan ambigu | [Tulis pertanyaan yang kurang konteks] | [Model harus meminta klarifikasi] |  |  |  |  |  |  |  |  |  |
| T-01 | Informasi berubah | [Tanyakan jadwal/kuota/syarat] | [Tanggal ekstraksi dan anjuran cek sumber resmi] |  |  |  |  |  |  |  |  |  |
| C-01 | Batasan konteks | [Minta konteks umum secara eksplisit] | [Konteks umum harus dipisahkan dari fakta knowledge] |  |  |  |  |  |  |  |  |  |

## Bank pola pertanyaan

### Fakta langsung

- Apa saja [komponen/jenis/tahapan] [topik] yang tercantum di knowledge base?
- Jelaskan [topik] berdasarkan sumber [profil/judul bagian].
- Apa perbedaan [A] dan [B] menurut knowledge base?

### Status sumber

- Apakah informasi tentang [topik] sudah terekstrak penuh? Jelaskan status sumbernya.
- Apa yang bisa dan tidak bisa disimpulkan dari link [judul sumber]?

### Informasi yang tidak tersedia

- Berapa [fakta spesifik] jika hanya menggunakan knowledge base ini?
- Apakah knowledge base menyebutkan [topik yang sengaja tidak ada]?

### Pertanyaan ambigu

- Kapan pendaftarannya?
- Syaratnya apa?
- Bisa daftar tidak?

### Informasi yang mudah berubah

- Apa jadwal [seleksi/program] yang tercantum?
- Berapa kuota [program]?
- Apa syarat terbaru [program]?

## Ringkasan skor

| Model | Fakta /16 | Grounding /16 | Status sumber /16 | Tidak mengarang /16 | Sumber/link /16 | Kejelasan /16 | Total /96 |
|---|---:|---:|---:|---:|---:|---:|---:|
| [Model A] |  |  |  |  |  |  |  |
| [Model B] |  |  |  |  |  |  |  |
| [Model C] |  |  |  |  |  |  |  |

> Catatan: jumlah maksimal menyesuaikan jumlah kasus uji. Angka `/16` pada tabel ringkasan mengasumsikan 8 kasus uji.
