# TestCenter Knowledge SA

Prototype chatbot untuk mencoba knowledge base Brain Academy/Ruangguru dengan satu model AI hosted gratis.

## Jalankan lokal

```bash
cd prototype
cp .env.example .env
npm start
```

Buka <http://127.0.0.1:4310/>.

Tanpa API key, prototype memakai retrieval lokal dari `knowledge-base/`. Untuk jawaban AI, isi `GEMINI_API_KEY` dari Google AI Studio. Model default adalah `gemini-2.5-flash-lite` dan bisa diganti lewat `GEMINI_MODEL`.

## Deploy publik

File `render.yaml` sudah disiapkan untuk Render. Hubungkan repository GitHub ini sebagai Blueprint, lalu isi secret `GEMINI_API_KEY`. Render akan menjalankan aplikasi dari folder `prototype/` dan memberi URL publik.

## Knowledge base

Gunakan file di [knowledge-base/README.md](knowledge-base/README.md). Daftar file yang masuk retrieval default ada di [ingest-default.txt](knowledge-base/00-catalog/ingest-default.txt).

Jangan commit API key. File `.env.example` hanya berisi nama konfigurasi.
