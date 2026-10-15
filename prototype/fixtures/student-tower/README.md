# Student Tower Synthetic Fixtures

Dataset sintetis kanonis untuk development, simulasi, demo, dan regression checks chatbot konsultasi SA.

Identitas siswa, sekolah, skor, preferensi, risiko, dan percakapan di direktori ini tetap sintetis. Untuk membuat simulasi lebih dekat dengan percakapan SA, nama sebagian PTN dan program studi memakai entitas nyata dan disertai metadata referensi resmi. Angka TO, target, persentil, jumlah pembanding, tren, dan risiko tidak boleh dibaca sebagai passing grade, statistik penerimaan, atau peluang resmi.

## Isi

- `students.json`: snapshot sintetis kondisi siswa mengikuti bentuk konteks Student Tower, termasuk workflow aktif yang membutuhkan tindakan SA dan referensi entitas PTN/prodi nyata.
- `scenarios.json`: skenario percakapan dan perilaku yang diharapkan, direferensikan melalui `student_id`.
- `schema.json`: kontrak struktur data fixture.

JSON dalam direktori ini adalah sumber kanonis. Dokumen Markdown di root hanya menjelaskan tujuan dan cara memakai fixture, bukan menyimpan salinan data.

## Cara Menggunakan

1. Pilih skenario dari `scenarios.json`.
2. Cari siswa berdasarkan `student_id` di `students.json`.
3. Pilih siswa dan workflow aktif di toolbar untuk menjalankan simulasi langkah demi langkah, atau mulai dari chat kosong untuk menguji penemuan intent.
4. Jalankan pesan SA sesuai urutan dalam skenario, atau mulai dari chat kosong untuk menguji penemuan intent.
5. Bandingkan perilaku chatbot dengan `expected_behaviors` dan `expected_state`.

Expected behavior menjelaskan kualitas perilaku, bukan teks jawaban yang harus persis sama. Ini memungkinkan variasi respons model tanpa mengubah tujuan tes.

## Aturan Perubahan

- Pertahankan `student_id` dan `scenario_id` setelah dipakai dalam test, kecuali ada alasan migrasi.
- Perubahan struktur harus memperbarui `schema.json` dan contoh terkait.
- Perubahan perilaku yang diharapkan harus memperbarui skenario yang terdampak.
- Tambahkan kasus baru sebagai siswa atau scenario baru; hindari mengubah satu fixture untuk menutupi banyak kondisi yang tidak berkaitan.
- Data akademik dan preferensi harus konsisten dengan skenario percakapannya.
- Jangan menambahkan PII atau data yang diambil dari siswa nyata.

## Status

Versi fixture: `0.1.0`  
Fokus awal: TO Check Point 2 dan outcome Lanjut, Lanjut dengan Risk, Pivot, atau belum dapat diputuskan.
