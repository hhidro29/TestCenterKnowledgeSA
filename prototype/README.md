# Knowledge Chatbot Prototype

MVP lokal untuk menguji knowledge base Linktree dengan model yang bisa diganti.

## 1. Jalankan demo lokal

Tidak perlu install dependency tambahan. Dari folder workspace:

```bash
node prototype/server.mjs
```

Buka <http://127.0.0.1:4310>.

Tanpa environment variable, aplikasi berjalan dalam **demo-local mode**: aplikasi mencari dokumen paling relevan dari `knowledge-base/` dan menampilkan potongan sumber. Mode ini berguna untuk mengecek foldering dan retrieval awal, tetapi belum menghasilkan jawaban AI penuh.

## 2. Aktifkan OpenAI File Search

Buat vector store dari daftar file yang sudah dipilih:

```bash
export OPENAI_API_KEY="..."
node prototype/create-vector-store.mjs
export OPENAI_VECTOR_STORE_ID="vs_..."
node prototype/server.mjs
```

`create-vector-store.mjs` membaca `knowledge-base/00-catalog/ingest-default.txt`, mengunggah dokumen fakta, dan mencetak ID vector store. Jangan menaruh API key di file yang di-commit.

Model dapat diganti dari panel kiri. Prototype ini dibatasi ke model kelas Luna dan di bawahnya: `gpt-6-luna`, `gpt-5.6-luna`, dan `gpt-5.5`. Filter profil sengaja tidak ditampilkan supaya setiap pertanyaan memakai seluruh knowledge base. Untuk perbandingan yang adil, gunakan pertanyaan dan knowledge base yang sama pada chat baru atau sesi uji yang terpisah.

## Mode bandingkan

Klik **Bandingkan model** di header. Satu pertanyaan akan dikirim ke tiga panel model sekaligus. Setiap panel menyimpan riwayat percakapannya sendiri, sehingga pertanyaan lanjutan tetap memakai konteks model tersebut. Pada layar sempit, panel tetap berdampingan dan dapat digeser horizontal.

## 3. Struktur mode

- `demo-local`: retrieval lokal tanpa API.
- `openai-file-search`: Responses API + File Search + vector store.

Prompt sistem berada di `Prompt Sistem Chatbot - Knowledge Base Terstruktur.md` dan dipakai oleh server saat mode OpenAI aktif.
