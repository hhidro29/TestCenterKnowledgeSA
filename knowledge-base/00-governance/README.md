---
doc_type: "governance"
knowledge_base: "linktree-brain-academy"
retrieval_default: "false"
---
# Knowledge Base Linktree Brain Academy

Paket ini adalah versi terstruktur dari `Ekstraksi Knowledge Semua Linktree - Rapi.md`.

## Tujuan

Memisahkan fakta yang berhasil diekstrak, sumber yang hanya dibuka sebagian, dan link yang belum tervalidasi agar retrieval chatbot tidak mencampur metadata dengan fakta.

## Aturan ingestion

- Masukkan folder `01-*` sampai `06-*` subfolder `01-facts/` sebagai knowledge faktual utama.
- Masukkan `02-partial/` hanya jika chatbot diberi instruksi eksplisit bahwa isinya parsial.
- Jangan masukkan `03-unverified-links.md` sebagai evidence faktual. File ini hanya untuk link rujukan dan status tindak lanjut.
- `00-catalog/source-register.csv` adalah metadata katalog, bukan sumber fakta.
- `90-appendices/` berisi data tambahan dari screenshot/browser dan harus diberi label sumber supplemental.
- `99-archive/` hanya dokumentasi arsip dan tidak perlu diindeks.

## Metadata yang dipakai

- `profile`: profil Linktree asal.
- `topic`: domain utama.
- `source_status`: status validasi sumber.
- `extraction_date`: tanggal pengambilan.
- `retrieval_default`: apakah aman dimasukkan ke retrieval default.
- `source_url`: URL sumber asli.
