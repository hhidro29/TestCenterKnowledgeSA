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

## Deploy publik

Repository ini juga sudah memiliki konfigurasi Vercel. Import repository di Vercel dengan **Root Directory** tetap di root repository, lalu tambahkan environment variable berikut pada **Production** dan **Preview**:

```text
AI_PROVIDER=groq
GROQ_API_KEY=...
GROQ_MODEL=qwen/qwen3.8-27b
MAX_REQUESTS_PER_MINUTE=30
```

Setelah **Redeploy**, endpoint `/api/config` harus menampilkan `mode: "gemini"`. `GEMINI_API_KEY` tidak boleh ditulis di frontend atau di-commit ke repository.

## Knowledge base

Gunakan file di [knowledge-base/README.md](knowledge-base/README.md). Daftar file yang masuk retrieval default ada di [ingest-default.txt](knowledge-base/00-catalog/ingest-default.txt).

Jangan commit API key. File `.env.example` hanya berisi nama konfigurasi.
