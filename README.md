# TestCenter Knowledge SA

Prototype chatbot untuk mencoba knowledge base Brain Academy/Ruangguru dengan satu model AI hosted gratis.

## Jalankan lokal

```bash
cd prototype
cp .env.example .env
npm start
```

Buka <http://127.0.0.1:4310/>.

Tanpa API key, prototype memakai retrieval lokal dari `knowledge-base/`. Untuk jawaban AI, isi `GEMINI_API_KEY` dari Google AI Studio. Model default adalah `gemini-3.5-flash-lite` dan bisa diganti lewat `GEMINI_MODEL`.

## Deploy publik

Repository ini juga sudah memiliki konfigurasi Vercel. Import repository di Vercel dengan **Root Directory** tetap di root repository, lalu tambahkan environment variable berikut pada **Production** dan **Preview**:

```text
AI_PROVIDER=gemini
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-3.5-flash-lite
MAX_REQUESTS_PER_MINUTE=30
```

Setelah **Redeploy**, endpoint `/api/config` harus menampilkan `mode: "gemini"`. `GEMINI_API_KEY` tidak boleh ditulis di frontend atau di-commit ke repository.

## Knowledge base

Gunakan file di [knowledge-base/README.md](knowledge-base/README.md). Daftar file yang masuk retrieval default ada di [ingest-default.txt](knowledge-base/00-catalog/ingest-default.txt).

Jangan commit API key. File `.env.example` hanya berisi nama konfigurasi.
