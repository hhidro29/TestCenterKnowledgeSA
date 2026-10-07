# Knowledge Chatbot Prototype

Prototype chat UI untuk mencoba knowledge base Linktree/Brain Academy. MVP ini memakai satu model hosted gratis supaya bisa dibagikan lewat URL publik.

## Jalankan lokal

Dari folder `prototype/`:

```bash
cp .env.example .env
npm start
```

Buka <http://127.0.0.1:4310>.

Tanpa `GEMINI_API_KEY`, aplikasi tetap berjalan dalam `demo-local`: server melakukan retrieval sederhana dari folder `knowledge-base/` dan menampilkan potongan sumber. Dengan key, server memakai Gemini API.

## Model dan API key

Model default saat provider `groq` adalah `qwen/qwen3.8-27b`. Buat API key di <https://console.groq.com/keys>, lalu isi environment variable:

```bash
AI_PROVIDER=groq
GROQ_API_KEY=...
GROQ_MODEL=qwen/qwen3.8-27b
```

Model dapat diganti tanpa mengubah kode selama model tersebut tersedia untuk akun Groq. API key hanya dibaca server; jangan menaruh nilainya di GitHub. Untuk kembali ke Gemini, gunakan `AI_PROVIDER=gemini` dan `GEMINI_API_KEY`.

## Deploy publik dengan Render

Repository sudah memiliki `render.yaml` di root. Di Render pilih **New Blueprint**, hubungkan repository GitHub ini, lalu isi secret `GEMINI_API_KEY` ketika diminta. Render akan memakai `prototype/` sebagai root, menjalankan `npm install` dan `npm start`, lalu memberi URL publik.

Variabel yang dipakai:

- `GEMINI_API_KEY`: wajib untuk jawaban AI.
- `GEMINI_MODEL`: default `gemini-3.5-flash-lite`.
- `MAX_REQUESTS_PER_MINUTE`: batas sederhana per alamat IP, default 30.

## Cara kerja

1. Pertanyaan masuk ke server.
2. Server mengambil potongan dokumen yang paling relevan dari `knowledge-base/`.
3. Pertanyaan dan konteks dikirim ke Gemini.
4. Jawaban ditampilkan seperti chat WhatsApp/Telegram bersama kartu sumber.

Jika Gemini gagal atau kuota habis, aplikasi memberi jawaban retrieval lokal dan menandainya sebagai fallback.
