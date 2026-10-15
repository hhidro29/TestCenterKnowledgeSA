# Knowledge Chatbot Prototype

Prototype chat UI untuk mencoba knowledge base Linktree/Brain Academy. MVP ini memakai satu model hosted gratis supaya bisa dibagikan lewat URL publik.

## Student Tower consultation fixtures

Dataset sintetis permanen untuk eksplorasi chatbot konsultasi SA ada di `fixtures/student-tower/`. Gunakan `students.json` sebagai konteks siswa dan `scenarios.json` sebagai percakapan uji. Bentuk fixture mengikuti `schema.json`; jangan memakai data siswa nyata.

Prototype mendukung chat kosong untuk menemukan tujuan SA dan entry dari workflow aktif Student Tower sintetis. Workflow dapat dilanjutkan di UI melalui persiapan konsultasi, pencatatan raw note, konfirmasi ekstraksi, draft outcome, konfirmasi SA, action plan, dan penyelesaian. Status simulasi disimpan sementara di memori server per sesi browser dan akan kembali ke fixture awal saat server dimulai ulang. Ini belum menulis ke Student Tower operasional. Skenario konsultasi tetap tersedia sebagai alat uji; fixture yang dipilih ikut dikirim ke chat dan perbandingan model.

Untuk mensimulasikan pembukaan chatbot dari halaman detail siswa, gunakan deep-link berikut:

`http://127.0.0.1:4310/?source=student-tower&studentId=student-dummy-001&workflowId=workflow-dummy-001`

`studentId` wajib diisi untuk mengaktifkan konteks siswa. `workflowId` opsional; jika tidak dikirim, workflow aktif pertama siswa dipilih otomatis. Student Tower produksi nantinya cukup membangun URL dengan pola yang sama dari tombol "Buka chatbot".

Saat workflow aktif, panel ringkasan menampilkan fokus konsultasi, informasi yang belum diketahui, tahap saat ini, keputusan draft/terkonfirmasi, serta action plan. Outcome Pivot menampilkan kandidat sintetis melalui tiga sudut pandang (minat siswa, pertimbangan keluarga, dan kemampuan/data simulasi) untuk direview SA; kandidat bukan rekomendasi final. Outcome "Tunda keputusan" tetap membuka workflow untuk tindak lanjut informasi sebelum keputusan disusun kembali.

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

Jika kedua key tersedia, dropdown di UI menampilkan Qwen dan Gemini sekaligus. Model dipilih per pesan; riwayat chat tetap dikirim agar percakapan bisa dilanjutkan saat berpindah model.

GPT tersedia sebagai model tambahan jika `OPENAI_API_KEY` diisi. `GPT_MODEL` dapat digunakan untuk memilih model GPT yang tersedia pada akun OpenAI. API key tidak boleh dimasukkan ke repository.

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
