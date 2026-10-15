# Student Tower - Conversation State Map

## Objective

Membantu SA mengubah percakapan konsultasi yang raw menjadi keputusan yang jelas, beralasan, dan dapat ditindaklanjuti.

Chatbot berperan sebagai pendamping pengambilan keputusan. Student Tower menyediakan konteks dan menyimpan keputusan resmi. SA tetap mengonfirmasi outcome akhir.

## Prinsip Dasar

- SA tidak perlu memahami struktur data atau menulis dengan format tertentu.
- SA dapat menulis dengan bahasa bebas, termasuk catatan singkat, bullet point, atau transkrip.
- Chatbot membedakan fakta, observasi SA, interpretasi, dan keputusan.
- Chatbot tidak mengubah interpretasi menjadi fakta tanpa konfirmasi SA.
- Chatbot bertanya satu per satu berdasarkan informasi yang paling memengaruhi keputusan.
- Setiap sesi harus berakhir dengan status yang jelas: keputusan dikonfirmasi, keputusan ditunda, menunggu data, atau workflow dibuat.

## Model Informasi

### Data dari Student Tower

- Checkpoint aktif.
- Jalur masuk.
- Target PTN dan program studi.
- Skor tryout, target, persentil, dan tren nilai.
- Profiling siswa.
- Risiko atau nudge dari sistem.
- Keputusan dan action sebelumnya.

### Informasi dari konsultasi

- Keinginan terbaru siswa.
- Minat dan keraguan siswa.
- Harapan dan kekhawatiran orang tua/wali.
- Batasan lokasi dan biaya.
- Kompromi yang dapat diterima.
- Kesepakatan atau perbedaan pendapat.
- Keputusan dan tindak lanjut konsultasi.

## Alur Utama

```text
SA membuka chatbot
    -> memilih tujuan konsultasi
    -> meninjau konteks siswa
    -> menyiapkan atau mencatat konsultasi
    -> chatbot mengekstrak informasi
    -> SA mengonfirmasi atau mengoreksi
    -> chatbot meminta klarifikasi jika diperlukan
    -> chatbot menyusun skenario keputusan
    -> SA memilih dan mengonfirmasi outcome
    -> Student Tower membuat workflow
```

## Conversation States

| State | Kondisi masuk | Respons chatbot | Input SA | Output |
|---|---|---|---|---|
| S0. Entry | SA membuka chatbot | Menampilkan checkpoint dan konteks singkat | Memilih tujuan atau menulis bebas | Sesi dimulai |
| S1. Pilih tujuan | Tujuan SA belum jelas | Menawarkan tujuan percakapan | Memilih tujuan | Mode percakapan ditentukan |
| S2. Review konteks | Data Student Tower tersedia | Menampilkan data yang digunakan dan yang belum tersedia | Konfirmasi atau koreksi | Konteks tervalidasi |
| S3. Persiapan konsultasi | Konsultasi belum dilakukan | Menyusun fokus dan pertanyaan | Memilih pertanyaan prioritas | Consultation brief |
| S4. Input raw | Konsultasi sudah dilakukan | Meminta SA bercerita dengan bahasa bebas | Catatan, bullet point, atau transkrip | Raw consultation note |
| S5. Ekstraksi | Raw note tersedia | Mengelompokkan informasi | Konfirmasi atau edit | Structured consultation insight |
| S6. Klarifikasi | Informasi penting belum lengkap | Mengajukan pertanyaan satu per satu | Menjawab pertanyaan | Informasi dilengkapi |
| S7. Eksplorasi | SA belum menentukan outcome | Membandingkan Lanjut, Lanjut dengan Risk, dan Pivot | Memilih topik atau skenario | Decision scenarios |
| S8. Draft rekomendasi | Informasi cukup | Menampilkan rekomendasi, alasan, risiko, dan kompromi | Terima, edit, atau tolak | Draft decision |
| S9. Review SA | SA tidak langsung setuju | Menanyakan bagian yang tidak sesuai | Koreksi atau alasan penolakan | Draft diperbarui |
| S10. Konfirmasi keputusan | SA sudah memilih outcome | Menampilkan ringkasan final | Konfirmasi outcome | Keputusan resmi |
| S11. Workflow | Keputusan dikonfirmasi | Menyarankan action, PIC, deadline, dan evaluasi ulang | Edit atau konfirmasi | Workflow dibuat |
| S12. Selesai | Workflow tersimpan | Menampilkan ringkasan sesi | Mulai sesi baru atau selesai | Riwayat konsultasi tersimpan |

## Entry Point

Chatbot tidak dimulai dari kolom kosong. Tampilkan beberapa tujuan:

- Siapkan konsultasi.
- Saya sudah selesai konsultasi.
- Bantu evaluasi pilihan.
- Bantu cari risiko.
- Bantu eksplorasi pivot.
- Saya belum tahu harus memilih outcome apa.

Jika SA langsung menulis pertanyaan seperti `Menurut kamu, anak ini harus pivot?`, chatbot mengarahkan SA ke mode evaluasi dan menjelaskan data yang akan digunakan.

## Review Konteks

Chatbot perlu menampilkan:

> Data yang tersedia: skor tryout, persentil, pilihan PTN/prodi, profiling, dan action sebelumnya.

> Belum tersedia: perubahan minat siswa, pendapat terbaru orang tua, dan hasil konsultasi terakhir.

SA dapat memilih:

- Semua sudah sesuai.
- Ada data yang berubah.
- Ada data yang tidak sesuai.
- Lanjut dengan data yang tersedia.

## Raw Input dan Ekstraksi

Instruksi untuk SA:

> Ceritakan konsultasi dengan bahasa Anda sendiri. Tidak perlu mengikuti format tertentu. Masukkan hal yang berubah, kekhawatiran siswa/orang tua, dan hasil pembicaraan.

Contoh raw input:

> Siswa masih ingin mempertahankan UI, tetapi mulai ragu dengan prodinya. Orang tua mendukung UI, namun mempertimbangkan biaya dan lokasi.

Contoh hasil ekstraksi:

- Keinginan siswa: masih ingin mempertahankan UI.
- Keraguan siswa: belum yakin dengan program studi.
- Orang tua: mendukung UI.
- Pertimbangan orang tua: biaya dan lokasi.
- Risiko: pilihan program studi belum sepenuhnya diyakini.
- Status: belum ada keputusan pivot.

SA dapat mengonfirmasi semua hasil, mengedit bagian tertentu, atau menandai informasi sebagai belum diketahui.

## Pertanyaan Klarifikasi

Chatbot tidak menanyakan semua hal sekaligus. Pertanyaan dipilih berdasarkan pengaruhnya terhadap keputusan.

### Prioritas siswa belum jelas

> Jika harus memilih, mana yang lebih penting bagi siswa?

- Program studi yang sesuai minat.
- Kampus tertentu.
- Peluang diterima.
- Lokasi.
- Biaya.
- Belum tahu.

### Sikap orang tua belum jelas

> Bagaimana posisi orang tua terhadap pilihan siswa?

- Mendukung.
- Mendukung dengan syarat.
- Belum sepakat.
- Menginginkan pilihan berbeda.
- Belum dibahas.

### Keputusan belum jelas

> Setelah konsultasi, apakah target masih dipertahankan?

- Ya, tetap lanjut.
- Tetap lanjut tetapi dengan risiko.
- Ingin membahas pilihan lain.
- Belum bisa diputuskan.

## Informasi yang Perlu Ditemukan

### Siswa

- Minat utama.
- Prioritas: kampus, program studi, peluang, lokasi, atau biaya.
- Pilihan yang masih dapat diterima.
- Kesediaan mengambil risiko.

### Orang tua/wali

- Harapan utama.
- Batasan biaya.
- Batasan lokasi.
- Tingkat dukungan.
- Ruang kompromi.

### Akademik

- Skor dan tren.
- Gap terhadap target.
- Kekuatan dan kelemahan.
- Waktu yang tersedia.
- Konsistensi menjalankan action.

### Keputusan

- Hal yang disepakati.
- Hal yang belum disepakati.
- Pihak yang perlu dilibatkan.
- Waktu evaluasi ulang.

## Decision Scenarios

### Lanjut

Gunakan ketika pilihan masih sesuai dengan minat, siswa dan orang tua selaras, kemampuan cukup mendukung, dan risiko dapat ditangani.

Output:

- Alasan target masih layak.
- Risiko yang tetap dipantau.
- Action berikutnya.
- Tanggal evaluasi ulang jika diperlukan.

### Lanjut dengan Risk

Gunakan ketika pilihan sangat diinginkan, tetapi ada gap atau ketidakpastian yang masih mungkin dikejar.

Output wajib:

- Risiko spesifik.
- Dampak risiko.
- Syarat keberhasilan.
- Action pengurangan risiko.
- Deadline.
- Batas waktu evaluasi ulang.
- Pilihan cadangan yang perlu disiapkan.

### Pivot

Gunakan ketika gap terlalu besar, tren tidak membaik, pilihan tidak sesuai minat, konflik tidak terselesaikan, atau tidak ada risk plan yang realistis.

Output wajib:

- Alasan target lama ditinjau ulang.
- Prioritas siswa.
- Batasan orang tua.
- Kandidat pilihan baru.
- Kompromi tiap kandidat.
- Persetujuan siswa dan orang tua.
- Perubahan target yang akan dicatat.

### Belum bisa memutuskan

Gunakan ketika informasi belum cukup atau siswa dan orang tua belum mencapai kesepakatan.

Output:

- Alasan keputusan ditunda.
- Informasi yang masih kurang.
- Pihak yang perlu dilibatkan.
- Action sebelum konsultasi berikutnya.
- Deadline pengambilan keputusan.

## Exception States

### SA menulis sangat singkat

Input: `Masih bingung.`

Chatbot menanyakan bagian yang membingungkan:

- Pilihan kampus.
- Pilihan program studi.
- Peluang diterima.
- Keinginan siswa.
- Persetujuan orang tua.
- Keputusan Lanjut atau Pivot.

### SA meminta keputusan terlalu cepat

Chatbot menyebutkan informasi yang perlu dipastikan sebelum memberi rekomendasi, misalnya prioritas siswa, batasan orang tua, gap akademik, dan kesediaan menjalankan risk plan.

### Data tidak cukup

Chatbot menyatakan keterbatasan secara eksplisit dan menawarkan tiga pilihan:

- Lengkapi informasi.
- Lanjut dengan data yang tersedia.
- Simpan sebagai keputusan tertunda.

### Data sistem bertentangan dengan catatan konsultasi

Chatbot menampilkan konflik dan meminta SA memilih:

- Pertahankan data tersimpan.
- Gunakan hasil pembicaraan terbaru.
- Tandai sebagai belum diputuskan.

### Siswa dan orang tua tidak sepakat

Chatbot menampilkan perbedaan secara netral dan membantu mengeksplorasi kompromi:

- Program studi sama, kampus berbeda.
- Kampus sama, program studi serumpun.
- Lokasi sama, tingkat kompetisi diturunkan.
- Target utama dipertahankan dengan pilihan cadangan.

### SA tidak setuju dengan rekomendasi

Chatbot menanyakan alasan:

- Data sistem tidak akurat.
- Informasi konsultasi belum lengkap.
- Ada pertimbangan profesional lain.
- Kondisi siswa baru berubah.
- Rekomendasi terlalu berisiko.

## Intent yang Perlu Dikenali

- Minta ringkasan.
- Minta penjelasan risiko.
- Menambahkan informasi.
- Mengoreksi informasi.
- Menanyakan rekomendasi.
- Meminta perbandingan pilihan.
- Menentukan outcome.
- Menunda keputusan.
- Mengubah target.
- Membuat workflow.
- Meminta bantuan karena tidak tahu harus bertanya apa.

## Status Sesi

- Belum dimulai.
- Sedang eksplorasi.
- Menunggu informasi SA.
- Menunggu konfirmasi SA.
- Rekomendasi siap ditinjau.
- Keputusan ditunda.
- Keputusan dikonfirmasi.
- Workflow dibuat.
- Selesai.

## Guardrails Produk

- Chatbot tidak boleh menyimpulkan pivot hanya dari satu skor.
- Chatbot harus menjelaskan data yang menjadi dasar rekomendasi.
- Chatbot harus membedakan fakta dan interpretasi.
- Chatbot harus menyebutkan data yang belum tersedia.
- Chatbot tidak boleh mengarang preferensi siswa atau orang tua.
- Outcome resmi hanya tersimpan setelah dikonfirmasi SA.
- Setiap outcome harus menghasilkan alasan dan tindak lanjut.
- Pivot harus menampilkan kompromi, bukan hanya daftar pilihan baru.

## Artefak Output Konsultasi

Setiap sesi idealnya menghasilkan:

1. Ringkasan kondisi.
2. Fakta yang dikonfirmasi.
3. Hal yang belum jelas.
4. Perbedaan pandangan siswa dan orang tua.
5. Risiko.
6. Skenario yang dipertimbangkan.
7. Outcome yang dipilih.
8. Alasan keputusan.
9. Action plan.
10. PIC, deadline, dan tanggal evaluasi ulang.

## Langkah Berikutnya

1. Kumpulkan contoh catatan konsultasi nyata.
2. Tandai bagian raw berdasarkan state di atas.
3. Uji apakah state dan pertanyaan klarifikasi sudah mencakup variasi kasus.
4. Buat prototype percakapan untuk satu checkpoint, idealnya TO Check Point 2.
5. Uji prototype bersama SA dan revisi berdasarkan kebingungan yang muncul.
