# TestCenter Knowledge SA

Prototype chatbot untuk menguji knowledge Brain Academy/Ruangguru dengan beberapa model AI.

## Prototype lokal

```bash
node prototype/server.mjs
```

Buka <http://127.0.0.1:4310/>.

Prototype menyediakan:

- mode chat bergaya messenger;
- mode **Bandingkan model** untuk mengirim satu pertanyaan ke `gpt-6-luna`, `gpt-5.6-luna`, dan `gpt-5.5`;
- knowledge base terstruktur di `knowledge-base/`;
- OpenAI File Search melalui vector store;
- fallback retrieval lokal jika API belum tersedia.

Panduan lengkap ada di [prototype/README.md](prototype/README.md).

## Knowledge base

Gunakan file di [knowledge-base/README.md](knowledge-base/README.md). Daftar file yang masuk retrieval default ada di [ingest-default.txt](knowledge-base/00-catalog/ingest-default.txt).

## Konfigurasi API

```bash
export OPENAI_API_KEY="..."
export OPENAI_VECTOR_STORE_ID="vs_..."
node prototype/server.mjs
```

Jangan commit API key. File `.env.example` hanya berisi nama konfigurasi.
