# TestCenter Knowledge SA

Prototype chatbot untuk mencoba knowledge base Brain Academy/Ruangguru dengan satu model AI hosted gratis.

## Jalankan lokal

```bash
cd prototype
cp .env.example .env
npm start
```

Buka <http://127.0.0.1:4310/>.

Tanpa API key, prototype memakai retrieval lokal dari `knowledge-base/`. Untuk jawaban AI dengan Qwen, isi `GROQ_API_KEY` dan gunakan `AI_PROVIDER=groq`. Model default adalah `qwen/qwen3.8-27b`. Gemini tetap tersedia dengan `AI_PROVIDER=gemini`.

Di UI, model yang tersedia bisa dipilih per pesan. Agar keduanya aktif sekaligus, isi `GROQ_API_KEY` dan `GEMINI_API_KEY`; pilihan yang tidak memiliki key akan ditandai belum dikonfigurasi.

GPT tersedia sebagai model tambahan yang sengaja nonaktif secara default. Isi `OPENAI_API_KEY` dan `GPT_MODEL`, lalu aktifkan hanya dengan mengisi `GPT_ACTIVE_UNTIL` menggunakan timestamp ISO empat jam ke depan. Setelah timestamp lewat, GPT otomatis mati dan harus diaktifkan ulang secara manual. API key tidak boleh di-commit.

## Deploy publik

Repository ini juga sudah memiliki konfigurasi Vercel. Import repository di Vercel dengan **Root Directory** tetap di root repository, lalu tambahkan environment variable berikut pada **Production** dan **Preview**:

```text
AI_PROVIDER=groq
GROQ_API_KEY=...
GROQ_MODEL=qwen/qwen3.8-27b
OPENAI_API_KEY=...
GPT_MODEL=gpt-5-mini
GPT_ACTIVE_UNTIL=
MAX_REQUESTS_PER_MINUTE=30
```

Setelah **Redeploy**, endpoint `/api/config` harus menampilkan `mode: "gemini"`. `GEMINI_API_KEY` tidak boleh ditulis di frontend atau di-commit ke repository.

## Knowledge base

Gunakan file di [knowledge-base/README.md](knowledge-base/README.md). Daftar file yang masuk retrieval default ada di [ingest-default.txt](knowledge-base/00-catalog/ingest-default.txt).

Jangan commit API key. File `.env.example` hanya berisi nama konfigurasi.
