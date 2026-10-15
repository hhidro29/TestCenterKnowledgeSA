# Student Tower - Source of Truth & Data Gap Map

**Status:** Draft untuk validasi produk dan engineering  
**Tanggal:** 13 Oktober 2026  
**Tujuan:** Menentukan sumber, ketersediaan, kualitas, dan penggunaan data untuk chatbot konsultasi SA.

## Keputusan Awal

Chatbot hanya boleh menyusun rekomendasi berdasarkan data yang:

- memiliki sumber yang diketahui;
- memiliki status atau tingkat kelengkapan yang jelas;
- memiliki tanggal pembaruan jika sifatnya berubah;
- dapat dibedakan antara fakta sistem, hasil konsultasi, dan interpretasi chatbot.

Jika data penting belum tersedia, chatbot harus mengubahnya menjadi pertanyaan klarifikasi atau status `belum dapat disimpulkan`.

## Kategori Sumber

| Kategori | Peran |
|---|---|
| Student Tower | Source of truth untuk checkpoint, target, keputusan, dan workflow siswa. |
| Modul tryout/simulasi | Source of truth untuk skor, persentil, tren, benchmark, dan kualitas data pembanding. |
| Profiling siswa | Source of truth untuk preferensi awal, rencana seleksi, kondisi belajar, dan diskusi awal dengan orang tua. |
| Catatan konsultasi | Source of truth untuk perubahan minat, kekhawatiran, kompromi, dan kesepakatan terbaru. |
| Knowledge penerimaan PTN | Referensi untuk aturan jalur, persyaratan, daya tampung, dan informasi program studi. |
| Chatbot | Pengolah konteks dan penyusun draft rekomendasi; bukan source of truth keputusan. |

## Data Context Chatbot

| Informasi | Sumber utama | Status awal | Dipakai untuk |
|---|---|---|---|
| Student ID anonim | Student Tower | Perlu validasi | Menghubungkan sesi chatbot dengan siswa tanpa menampilkan data pribadi berlebih. |
| Checkpoint aktif | Student Tower | Diperkirakan tersedia | Menentukan tujuan dan mode percakapan. |
| Jalur masuk | Student Tower | Diperkirakan tersedia | Membedakan analisis SNBP, SNBT, dan jalur lain. |
| Pilihan PTN/prodi | Student Tower | Tersedia pada halaman pilihan | Mengevaluasi target dan pilihan alternatif. |
| Urutan pilihan | Student Tower | Perlu validasi | Memahami prioritas siswa. |
| Skor tryout terbaru | Modul simulasi | Perlu konfirmasi akses | Membaca posisi akademik terbaru. |
| Target skor | Modul simulasi | Terlihat pada halaman pilihan | Membandingkan skor dengan acuan. |
| Persentil siswa | Modul simulasi | Terlihat pada halaman pilihan | Membaca posisi relatif siswa. |
| Persentil acuan kuota | Modul simulasi | Terlihat pada halaman pilihan | Membaca risiko kompetisi. |
| Jumlah pemilih/profil pembanding | Modul simulasi | Terlihat pada halaman pilihan | Menilai kualitas dan kestabilan sinyal. |
| Tren nilai antar tryout | Modul simulasi | Perlu validasi | Menilai apakah gap membaik atau memburuk. |
| Profiling siswa | Student Tower/profiling | Sebagian tersedia | Membaca minat, batasan, dan kesiapan awal. |
| Nilai rapor | Student Tower/profiling | Perlu validasi format | Mendukung evaluasi SNBP dan mata pelajaran pendukung. |
| Mata pelajaran pendukung | Profiling/knowledge penerimaan | Perlu validasi | Mengevaluasi kecocokan akademik dengan prodi. |
| Keputusan checkpoint sebelumnya | Student Tower | Perlu validasi | Menjaga kesinambungan keputusan. |
| Action sebelumnya | Student Tower/workflow | Perlu validasi | Menilai apakah risk plan dijalankan. |
| Status action | Student Tower/workflow | Perlu validasi | Membedakan risiko yang baru muncul dan risiko yang berulang. |
| Perubahan minat siswa | Catatan konsultasi | Belum tersedia sebagai field khusus | Menilai apakah target masih relevan. |
| Harapan orang tua/wali | Profiling/catatan konsultasi | Sebagian tersedia | Menilai dukungan dan batasan keluarga. |
| Kesepakatan siswa dan orang tua | Catatan konsultasi | Belum tersedia sebagai field khusus | Menentukan apakah keputusan dapat difinalisasi. |
| Batas biaya dan lokasi | Profiling/catatan konsultasi | Sebagian tersedia | Menyaring pilihan pivot. |
| Kesediaan mengambil risiko | Catatan konsultasi | Belum tersedia sebagai field khusus | Membedakan Lanjut dan Lanjut dengan Risk. |
| Kandidat pilihan alternatif | Modul simulasi/knowledge/SA | Belum ditentukan | Menyusun rekomendasi pivot. |
| Daya tampung dan benchmark alternatif | Knowledge penerimaan | Perlu tanggal dan sumber | Membandingkan kelayakan pilihan alternatif. |

## Tingkat Kepercayaan Data

Setiap data yang dipakai chatbot perlu memiliki salah satu status berikut:

- `system_fact`: data langsung dari Student Tower atau modul resmi yang terhubung.
- `consultation_fact`: informasi yang diucapkan siswa/orang tua dan sudah dikonfirmasi SA.
- `sa_observation`: observasi atau penilaian SA yang belum menjadi fakta objektif.
- `chatbot_interpretation`: kesimpulan sementara dari chatbot.
- `missing`: informasi belum tersedia.
- `conflicting`: terdapat dua informasi yang bertentangan.
- `stale`: data tersedia tetapi tanggal pembaruannya melewati batas yang disepakati.

Chatbot tidak boleh menyamakan `chatbot_interpretation` dengan `system_fact` atau `consultation_fact`.

## Minimum Context untuk MVP

Chatbot dapat mulai membantu SA jika tersedia:

1. Checkpoint aktif.
2. Jalur masuk.
3. Pilihan PTN/prodi.
4. Skor atau hasil simulasi terbaru.
5. Profiling singkat siswa.
6. Keputusan sebelumnya, jika ada.
7. Tujuan sesi SA.

Jika skor atau hasil simulasi belum tersedia, chatbot hanya membantu menyiapkan pertanyaan dan merangkum konsultasi. Chatbot belum boleh menyimpulkan tingkat daya saing.

## Data yang Harus Digali dari SA

Chatbot perlu meminta informasi dari SA jika belum ada atau sudah berubah:

- Apa yang paling diinginkan siswa saat ini?
- Apakah siswa lebih memprioritaskan kampus, prodi, peluang, lokasi, atau biaya?
- Apa harapan dan kekhawatiran orang tua?
- Apakah siswa dan orang tua sudah sepakat?
- Kompromi apa yang masih dapat diterima?
- Apa yang berubah sejak checkpoint sebelumnya?
- Apakah action sebelumnya dijalankan?
- Apakah siswa bersedia mempertahankan target dengan risiko?

## Data yang Tidak Boleh Dianggap Cukup Sendiri

Satu indikator tidak cukup untuk menghasilkan keputusan:

- rata-rata skor;
- satu hasil tryout;
- target score;
- persentil;
- jumlah pemilih;
- nilai rapor rata-rata;
- opini SA tanpa konteks;
- preferensi orang tua tanpa konfirmasi siswa.

Rekomendasi harus menghubungkan kondisi akademik, preferensi siswa, posisi orang tua, batasan nyata, dan waktu yang tersedia.

## Data Gap Prioritas

### P0 - Wajib sebelum rekomendasi keputusan

- Struktur data context dari Student Tower.
- Akses atau snapshot skor tryout terbaru.
- Pilihan PTN/prodi dan jalur masuk.
- Checkpoint aktif.
- Cara menyimpan outcome resmi.
- Cara menyimpan action dan workflow.

### P1 - Wajib sebelum rekomendasi Pivot

- Minat siswa terbaru.
- Prioritas siswa.
- Harapan dan batasan orang tua.
- Kesepakatan atau konflik siswa-orang tua.
- Daftar kandidat alternatif.
- Benchmark dan kualitas data kandidat alternatif.

### P2 - Memperbaiki kualitas rekomendasi

- Tren skor lintas tryout.
- Riwayat pencapaian action.
- Nilai mata pelajaran pendukung.
- Riwayat perubahan pilihan.
- Alasan keputusan pada checkpoint sebelumnya.

## Context Contract Awal

Contoh payload yang perlu dibahas dengan engineering:

```json
{
  "student_id": "anonymous-id",
  "checkpoint": {
    "type": "TO_CHECKPOINT_2",
    "status": "OPEN",
    "occurred_at": "2026-10-13T10:00:00+07:00"
  },
  "admission_route": "SNBT",
  "choices": [],
  "latest_simulation": {},
  "score_history": [],
  "profiling_summary": {},
  "previous_decisions": [],
  "previous_actions": [],
  "active_workflows": [],
  "data_quality": {}
}
```

Payload ini masih draft. Nama field, pemilik data, dan format perlu divalidasi bersama tim Student Tower.

## Langkah Berikutnya

1. Validasi tabel sumber data dengan product owner dan engineering Student Tower.
2. Tandai setiap field sebagai `tersedia`, `tersedia sebagian`, `belum tersedia`, atau `tidak diperlukan`.
3. Tentukan field P0 untuk context contract MVP.
4. Kumpulkan tiga sampai lima contoh kasus konsultasi nyata.
5. Uji Conversation State Map menggunakan context P0 dan raw note tersebut.
6. Baru setelah itu finalisasi prompt, output schema, dan behavior chatbot.

## Keputusan Build

Prototype chatbot boleh dibangun menggunakan mock context P0 setelah field P0 disepakati. Integrasi produksi menunggu validasi source of truth, pemilik data, dan mekanisme penyimpanan keputusan.
