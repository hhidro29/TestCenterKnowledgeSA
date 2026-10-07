# Knowledge Base Linktree Brain Academy

Paket terstruktur untuk prototype chatbot. Sumber mentah tidak diubah; paket ini dibuat dari `Ekstraksi Knowledge Semua Linktree - Rapi.md`.

## Struktur

```text
knowledge-base/
├── 00-governance/       aturan ingestion dan pembaruan
├── 00-catalog/          overview, manifest, dan source register
├── 01-kejarkedinasan/
├── 02-pejuang-kampus-impian/
├── 03-pendekar-tka/
├── 04-bac-12-sma/
├── 05-math-champs/
├── 06-brain-academy-online/
├── 90-appendices/       data tambahan screenshot/browser
└── 99-archive/          pointer arsip; jangan diindeks default
```

## Paket untuk retrieval default

Indeks hanya:

- `00-catalog/overview.md`
- `00-catalog/cross-profile-summary.md`
- setiap `00-profile.md`
- setiap file di `01-*/01-facts/` sampai `06-*/01-facts/`

Jangan memasukkan `03-unverified-links.md`, `00-catalog/source-register.csv`, atau `90-appendices/` sebagai evidence default.

## File daftar ingestion

- `00-catalog/ingest-default.txt`: daftar file untuk vector store utama.
- `00-catalog/ingest-partial.txt`: daftar supplemental opsional.
- `00-catalog/exclude-from-ingest.txt`: metadata/governance yang tidak diindeks sebagai evidence.

## Status data

- `verified_extracted`: boleh dipakai sebagai fakta dari knowledge base.
- `opened_partial`: sumber dibuka tetapi belum tentu ditranskripsi penuh.
- `listed_only`, `unfetched_error`, `not_found`: metadata/link saja, bukan fakta tervalidasi.

## Ringkasan

- 6 profil Linktree
- 100 link terdaftar
- 50 dokumen sumber terpisah
- 51 link berstatus `Terekstrak` di inventaris sumber
- tanggal ekstraksi: 6 Oktober 2026
