/**
 * Canonical higher-education admissions articles generated from the verified
 * knowledge-base facts. Keep this module independent so it can be reviewed
 * before being merged into KNOWLEDGE in data.js.
 *
 * The 2026 jalur mandiri, UM-PTKIN, and SMM-PTN Barat facts are archival and
 * must be refreshed against the official portal before use for a new cycle.
 */

const official = (title, url, kind = "Sumber resmi") => ({ title, url, kind });

export const GENERATED_ADMISSIONS_ARTICLES = [
  {
    id: "snbp-pdss-2026",
    type: "article",
    topic: "Universitas & Jurusan",
    subtopic: "SNBP dan PDSS 2026",
    title: "Panduan SNBP dan PDSS 2026",
    aliases: [
      "snbp",
      "snbp 2026",
      "panduan snbp",
      "pendaftaran snbp",
      "cara daftar snbp",
      "pdss",
      "pdss 2026",
      "siswa eligible",
      "syarat snbp",
      "pilihan prodi snbp",
      "portofolio snbp",
      "prestasi snbp",
      "kuota snbp",
      "rapor snbp"
    ],
    summary: "Panduan canonical untuk menjelaskan hubungan sekolah, PDSS, siswa eligible, pendaftaran SNBP, pilihan prodi, portofolio, prestasi, finalisasi, dan kartu peserta.",
    snippet: "SNBP hanya dapat diikuti siswa yang dinyatakan eligible oleh sekolah, memiliki akun SNPMB yang sudah permanen, dan memiliki nilai lengkap di PDSS. Pendaftaran siswa dilakukan melalui portal SNPMB setelah sekolah menyelesaikan PDSS.",
    highlights: [
      "Sekolah mengisi dan memfinalisasi PDSS; siswa mendaftar SNBP setelah dinyatakan eligible.",
      "Siswa dapat memilih paling banyak dua program studi dari satu atau dua PTN/Politeknik Negeri.",
      "Jika memilih dua prodi, salah satunya harus berada di provinsi yang sama dengan sekolah asal, dengan pengecualian yang berlaku untuk sekolah luar negeri dan ketentuan Papua.",
      "Portofolio hanya diisi jika prodi yang dipilih mensyaratkannya; prestasi bersifat tidak wajib dan maksimal tiga prestasi pada panduan pendaftaran.",
      "Finalisasi bersifat permanen. Setelah finalisasi, data tidak dapat dibatalkan atau diubah."
    ],
    sections: [
      {
        heading: "Kapan artikel ini digunakan",
        body: "Gunakan artikel ini ketika SA perlu menjelaskan apakah siswa dapat mendaftar SNBP, apa peran sekolah dan PDSS, bagaimana memilih prodi, atau apa yang perlu dilakukan sebelum finalisasi. SNBP berbasis penelusuran prestasi melalui rapor dan prestasi lain sesuai kriteria PTN; hasil rasionalisasi bukan hasil seleksi resmi."
      },
      {
        heading: "Syarat agar siswa dapat mendaftar",
        bullets: [
          "Siswa dinyatakan eligible oleh sekolah.",
          "Siswa memiliki Akun SNPMB Siswa yang sudah disimpan permanen.",
          "Nilai siswa lengkap di PDSS dan data PDSS sudah diisi serta difinalisasi oleh sekolah.",
          "Siswa memenuhi persyaratan tambahan yang ditetapkan PTN dan program studi.",
          "Pendaftar KIP Kuliah perlu melakukan pendaftaran di SIM KIP Kuliah sebelum mendaftar SNBP sesuai instruksi tahun berjalan."
        ]
      },
      {
        heading: "Peran sekolah: PDSS dan siswa eligible",
        body: "Sekolah mengecek profil dan data sekolah, mengisi kurikulum serta nilai, menentukan peringkat siswa eligible, dan melakukan finalisasi setiap tahapan PDSS. Pada mekanisme 2026 terdapat pengisian manual atau sinkronisasi dengan e-Rapor. Presentasi sosialisasi PDSS menyebut siswa eligible harus memiliki nilai TKA lengkap (tiga mata pelajaran wajib dan dua pilihan) sesuai ketentuan siklus tersebut. Perubahan data setelah finalisasi dapat memerlukan proses bantuan; sekolah harus memastikan data benar sebelum mengunci tahap.",
        table: [
          ["Tahap", "Pelaksana", "Catatan"],
          ["Cek profil dan kuota sekolah", "Sekolah", "Data mengikuti sumber sekolah/Pusdatin dan akreditasi."],
          ["Menentukan peringkat eligible", "Sekolah", "Peringkat tiap jurusan tidak boleh sama."],
          ["Mengisi kurikulum dan nilai", "Sekolah", "Manual atau sinkronisasi e-Rapor sesuai mekanisme."],
          ["Finalisasi PDSS", "Sekolah", "Unduh tanda bukti setelah finalisasi akhir."],
          ["Pendaftaran SNBP", "Siswa eligible", "Dilakukan melalui portal SNPMB setelah syarat terpenuhi."]
        ],
        tableHeader: true
      },
      {
        heading: "Pilihan program studi",
        body: "Setiap siswa dapat memilih dua program studi dari satu PTN/Politeknik Negeri atau dua PTN/Politeknik Negeri. Jika memilih satu prodi, pilihan PTN dapat berada di provinsi mana pun. Jika memilih dua prodi, salah satunya harus berada di provinsi yang sama dengan SMA/MA/SMK asal. Siswa dari SMA luar negeri dan ketentuan khusus siswa/lulusan Papua mengikuti pengecualian yang dijelaskan dalam panduan resmi.",
        bullets: [
          "Daftar prodi yang tampil pada portal mengikuti data pilihan SNBP dan tidak lagi dibatasi kelompok jurusan MIPA/IPS/Bahasa pada panduan 2026.",
          "Periksa kolom portofolio pada daftar prodi sebelum menyimpan pilihan.",
          "Urutkan pilihan sesuai prioritas; seleksi memproses pilihan pertama lalu pilihan berikutnya jika tidak lulus pada pilihan pertama."
        ]
      },
      {
        heading: "Portofolio dan prestasi",
        bullets: [
          "Prodi seni, desain, kriya, olahraga, atau prodi lain yang ditandai pada portal dapat meminta portofolio. Unduh instruksi resmi prodi sebelum mengunggah berkas.",
          "Jika prodi tidak mensyaratkan portofolio, halaman portofolio tidak perlu diisi.",
          "Prestasi pada halaman pendaftaran bersifat tidak wajib. Panduan 2026 menyediakan maksimal tiga prestasi dengan bukti, deskripsi, bidang, tingkat, status individu/kelompok, tahun, dan lembaga pemberi.",
          "Format dan ukuran file mengikuti validasi portal pada siklus berjalan."
        ]
      },
      {
        heading: "Alur pendaftaran siswa",
        numbered: [
          "Login ke portal SNPMB atau laman SNBP dengan email dan kata sandi yang telah didaftarkan serta diverifikasi.",
          "Periksa halaman Profil; biodata berasal dari data portal dan tidak diedit di aplikasi pendaftaran.",
          "Pilih PTN/Politeknik Negeri dan program studi sesuai aturan pilihan.",
          "Isi portofolio jika prodi mensyaratkannya.",
          "Isi prestasi jika ada dan sesuai ketentuan.",
          "Periksa seluruh data, lakukan finalisasi, lalu unduh dan cetak kartu peserta SNBP."
        ]
      },
      {
        heading: "Cara menjelaskan rasionalisasi SNBP",
        body: "Rasionalisasi Ruangguru dapat menjadi referensi untuk membaca daya saing berdasarkan data yang dimasukkan siswa, tetapi hasilnya adalah prediksi dengan metode Ruangguru, bukan hasil seleksi SNBP. SA perlu memisahkan prediksi tersebut dari keputusan resmi PTN dan tetap membahas kecocokan prodi, pilihan alternatif, serta sumber resmi."
      },
      {
        heading: "Catatan siklus dan verifikasi",
        body: "Sumber yang tersedia merupakan panduan 2026 dan materi ketentuan 2025 yang digunakan sebagai konteks. Tanggal pendaftaran, kuota, mekanisme TKA, syarat prodi, dan aturan PTN harus dicek ulang pada portal SNPMB dan panduan terbaru sebelum disampaikan sebagai informasi aktif."
      }
    ],
    ops: [
      "Sebelum konsultasi, pastikan siswa benar-benar eligible dan sekolah sudah memfinalisasi PDSS.",
      "Buka portal resmi untuk mengecek pilihan prodi, kebutuhan portofolio, dan jadwal siklus berjalan.",
      "Jangan menyebut hasil rasionalisasi sebagai peluang pasti atau hasil seleksi.",
      "Jika siswa sudah finalisasi, jelaskan bahwa data tidak dapat dibatalkan atau diubah melalui aplikasi."
    ],
    sources: [
      official("Panduan Pendaftaran SNBP 2026", "https://files.snpmb.id/web2026/Panduan%20Pendaftaran%20SNBP%202026.pdf"),
      official("Sosialisasi PDSS 2026", "https://files.snpmb.id/web2026/Sosialisasi%20PDSS%202026.pdf"),
      official("Portal SNPMB", "https://snpmb.id/"),
      official("Portal pendaftaran SNBP", "https://snbp.snpmb.id/"),
      official("Ketentuan SNBP 2025", "https://drive.google.com/file/d/1BuQZOX2RPmwI2AqCuQ4i4v_6hUICvVVN/view", "Knowledge base — konteks historis"),
      official("Rasionalisasi SNBP Ruangguru", "https://www.ruangguru.com/rasionalisasi", "Sumber pendukung — prediksi, bukan hasil seleksi")
    ],
    metadata: {
      audience: "Student Advisor",
      topic: "SNBP dan PDSS",
      sourcePeriod: "2026",
      status: "Canonical article; jadwal dan ketentuan wajib diverifikasi pada siklus berjalan",
      owner: "Tim akademik/kesiswaan terkait",
      note: "Pisahkan peran sekolah (PDSS/eligible) dan peran siswa (pendaftaran SNBP). Rasionalisasi adalah prediksi, bukan keputusan PTN.",
      sourceFiles: [
        "knowledge-base/02-pejuang-kampus-impian/01-facts/11-panduan-pendaftaran-snbp-2026.md",
        "knowledge-base/02-pejuang-kampus-impian/01-facts/12-sosialisasi-pdss-2026.md",
        "knowledge-base/02-pejuang-kampus-impian/01-facts/13-ketentuan-snbp-2025.md",
        "knowledge-base/02-pejuang-kampus-impian/01-facts/14-rasionalisasi-snbp-ruangguru.md"
      ]
    }
  },

  {
    id: "jalur-mandiri-utbk-2026",
    type: "article",
    topic: "Universitas & Jurusan",
    subtopic: "Jalur Mandiri PTN berbasis UTBK 2026",
    title: "Jalur Mandiri PTN Berbasis Skor UTBK 2026",
    aliases: [
      "jalur mandiri",
      "jalur mandiri utbk",
      "mandiri pakai nilai utbk",
      "kampus yang menerima skor utbk",
      "ptn jalur utbk",
      "seleksi mandiri skor utbk",
      "mandiri utbk 2026",
      "simak ui",
      "um ugm cbt",
      "smup utbk",
      "sm ipb utbk",
      "smub nilai utbk"
    ],
    summary: "Direktori cara membaca jalur mandiri PTN yang menggunakan skor UTBK, baik sebagai komponen tunggal maupun bersama rapor, prestasi, portofolio, atau tes mandiri.",
    snippet: "Jalur mandiri berbasis UTBK tidak seragam: ada PTN yang memakai skor UTBK murni, menggabungkannya dengan rapor, atau menjadikannya syarat sebelum tes CBT. Cek jalur, periode, prodi, dan portal resmi masing-masing PTN.",
    highlights: [
      "Skor UTBK dapat menjadi satu-satunya komponen, salah satu komponen, atau syarat untuk mengikuti tes mandiri.",
      "Nama jalur, persyaratan, biaya, jadwal, dan jumlah pilihan berbeda di setiap PTN.",
      "Data tahun 2026 pada artikel ini adalah rekap arsip dan perlu diperbarui untuk siklus berikutnya.",
      "Tidak semua jalur mandiri yang memakai UTBK bebas dari tes tambahan atau portofolio."
    ],
    sections: [
      {
        heading: "Tiga pola penggunaan skor UTBK",
        table: [
          ["Skema", "Cara kerja", "Contoh pada rekap 2026"],
          ["UTBK murni", "Peringkat/seleksi memakai skor UTBK tanpa tes tulis tambahan, dengan kemungkinan syarat portofolio tertentu.", "UM, IPB, UNJ, UPN Veteran Jawa Timur, UNESA, UNUD, UNY, UNS, UNNES, UNP, UNSOED, UPNVJ, UIN Jakarta, UPI"],
          ["UTBK + rapor/prestasi", "Skor UTBK digabungkan dengan rapor, prestasi, portofolio, atau surat motivasi.", "SMUP Unpad, SSU-ITB Jalur Nilai UTBK, SMUB UB"],
          ["UTBK + tes mandiri", "Peserta wajib memiliki atau mengirim skor UTBK, lalu mengikuti CBT/tes atau komponen seleksi kampus.", "SIMAK UI, UM UGM CBT, Mandiri UTBK Plus UNAIR, SMITS ACE, JSM UTBK UNHAS"]
        ],
        tableHeader: true
      },
      {
        heading: "Matriks jalur yang tercatat pada 2026",
        table: [
          ["PTN", "Jalur", "Skema", "Portal resmi"],
          ["Universitas Padjadjaran", "SMUP Jalur UTBK & Rapor", "UTBK + rapor", "https://smup.unpad.ac.id"],
          ["Universitas Negeri Malang", "Seleksi Mandiri Skor UTBK", "UTBK murni", "https://seleksi.um.ac.id/sm-skor-utbk/"],
          ["Universitas Gadjah Mada", "UM UGM CBT", "UTBK + CBT", "https://admissions.ugm.ac.id/"],
          ["Universitas Airlangga", "Mandiri UTBK Plus", "UTBK + CBT mata pelajaran", "https://ppmb.unair.ac.id/"],
          ["Institut Pertanian Bogor", "SM-IPB Eligible Skor UTBK", "UTBK murni", "https://admisi.ipb.ac.id/sm-ipb-s1/"],
          ["Universitas Negeri Jakarta", "PENMABA Nilai UTBK", "UTBK murni", "https://penmaba.unj.ac.id/nilaiutbk/"],
          ["Institut Teknologi Bandung", "SSU-ITB Jalur Nilai UTBK", "UTBK + portofolio/rapor", "https://admission.itb.ac.id/"],
          ["Universitas Brawijaya", "SMUB Nilai UTBK", "UTBK + rapor", "https://selma.ub.ac.id/"],
          ["Universitas Indonesia", "SIMAK UI", "UTBK sebagai syarat + ujian tulis", "https://simak.ui.ac.id/"],
          ["Institut Teknologi Sepuluh Nopember", "SMITS ACE", "Tes SMITS + rapor + UTBK jika ada", "https://www.its.ac.id/admission/smits-ace/"],
          ["Universitas Sebelas Maret", "SM UNS Jalur UTBK", "UTBK murni", "https://spmb.uns.ac.id/"]
        ],
        tableHeader: true
      },
      {
        heading: "Checklist sebelum memberi arahan",
        numbered: [
          "Identifikasi PTN, jenjang, program studi, dan tahun penerimaan yang ditanyakan.",
          "Pastikan jalur benar-benar menerima skor UTBK pada tahun tersebut; jangan menyamakan semua jalur mandiri.",
          "Cek apakah UTBK hanya menjadi syarat, komponen nilai, atau satu-satunya dasar pemeringkatan.",
          "Periksa tes tambahan, rapor, portofolio, jumlah pilihan, syarat kelulusan, serta batas tahun ijazah.",
          "Buka portal resmi untuk jadwal, biaya, formulir, dan pengumuman terbaru.",
          "Simpan sumber dan tanggal pengecekan karena jalur mandiri berubah lebih cepat daripada jalur nasional."
        ]
      },
      {
        heading: "Contoh pembeda yang sering ditanyakan SA",
        bullets: [
          "SIMAK UI pada rekap 2026 menggunakan skor UTBK sebagai syarat bagi S1 Reguler dan tetap memiliki ujian tulis SIMAK UI.",
          "UM UGM CBT menggabungkan skor UTBK-SNBT dengan CBT UGM serta mata pelajaran pendukung.",
          "SM-IPB dan beberapa jalur lain melakukan pemeringkatan berbasis skor UTBK tanpa tes tulis tambahan pada data rekap.",
          "SSU-ITB Jalur Nilai UTBK tetap meminta komponen rapor, motivation letter, dan portofolio pada prodi tertentu."
        ]
      },
      {
        heading: "Batasan data",
        body: "Spreadsheet [BAC] Data Jalur Mandiri 2026 adalah kompilasi internal dengan status arsip. Tanggal pendaftaran, biaya, daftar prodi, bobot nilai, dan portal dapat berubah. Gunakan matriks ini untuk menemukan jalur yang relevan, lalu verifikasi langsung pada pengumuman resmi PTN sebelum siswa mendaftar."
      }
    ],
    ops: [
      "Jangan menjawab bahwa semua jalur mandiri menerima UTBK dengan cara yang sama.",
      "Buka sumber resmi PTN untuk memeriksa siklus dan prodi yang sedang dibuka.",
      "Catat jika skor UTBK hanya syarat administrasi atau menjadi komponen pembobotan.",
      "Tanyakan apakah siswa membutuhkan jalur tanpa tes tambahan, karena banyak jalur UTBK tetap memiliki CBT/portofolio."
    ],
    sources: [
      official("Data Jalur Mandiri 2026 — kompilasi internal", "https://docs.google.com/spreadsheets/d/1FpjdOHVsJRqTMTqFnrRtb84epu_YMk_0reg0SrR4xVA/edit?usp=sharing", "Knowledge base — arsip 2026"),
      official("SIMAK UI", "https://simak.ui.ac.id/simak-ui/"),
      official("UM UGM CBT", "https://admissions.ugm.ac.id/v26/pendaftaran-mahasiswa-baru-wni/sarjana-sarjana-terapan/ragam-seleksi-sarjana-sarjana-terapan-2025/um-ugm-computer-based-test-um-ugm-cbt-2026/"),
      official("SMUP Unpad", "https://smup.unpad.ac.id"),
      official("SM-IPB", "https://admisi.ipb.ac.id/sm-ipb-s1/"),
      official("SSU-ITB", "https://admission.itb.ac.id/id/program/sarjana/seleksi-siswa-unggul-itb"),
      official("SMUA UNAIR", "https://ppmb.unair.ac.id/id/page1/informasi-umum-smua?tabmenu=front-tab-menu-pendaftaran-sarjana&menu=Pendaftaran&label=Sarjana"),
      official("SMITS ACE", "https://www.its.ac.id/admission/smits-ace/"),
      official("SMUB UB", "https://selma.ub.ac.id/smub-nilai-utbk-2/")
    ],
    metadata: {
      audience: "Student Advisor",
      topic: "Jalur mandiri PTN berbasis UTBK",
      sourcePeriod: "2026",
      status: "Canonical directory; arsip 2026 dan wajib refresh sebelum siklus baru",
      owner: "Tim akademik/kesiswaan terkait",
      note: "Sumber utama berupa kompilasi spreadsheet internal; detail pendaftaran tetap mengikuti portal resmi PTN.",
      sourceFiles: ["knowledge-base/02-pejuang-kampus-impian/01-facts/16-jalur-mandiri-berbasis-skor-utbk-2026.md"]
    }
  },

  {
    id: "um-ptkin-2026",
    type: "article",
    topic: "Universitas & Jurusan",
    subtopic: "UM-PTKIN 2026",
    title: "Panduan UM-PTKIN 2026",
    aliases: [
      "um ptkin",
      "um-ptkin",
      "um ptkin 2026",
      "ujian masuk ptkin",
      "jalur masuk uin",
      "jalur masuk iain",
      "seleksi ptkin",
      "sse um ptkin",
      "pendaftaran um ptkin",
      "ujian ptkin"
    ],
    summary: "Panduan ringkas seleksi nasional UM-PTKIN untuk calon mahasiswa yang memilih program studi pada UIN, IAIN, STAIN, dan PTN mitra peserta.",
    snippet: "UM-PTKIN adalah seleksi nasional berbasis SSE bagi program studi pada PTKIN. Peserta membuat akun, membayar biaya, memilih hingga tiga prodi, menentukan titik lokasi ujian, mengikuti ujian, lalu memantau pengumuman di portal resmi.",
    highlights: [
      "Ujian menggunakan Sistem Seleksi Elektronik (SSE) secara online on-site di titik lokasi PTKIN.",
      "Peserta dapat memilih maksimal tiga program studi dan mengurutkannya berdasarkan prioritas.",
      "Lokasi ujian dapat dipilih dari titik PTKIN yang tersedia dan tidak harus sama dengan kampus tujuan.",
      "Jadwal dan daftar kampus pada artikel ini adalah arsip UM-PTKIN 2026; verifikasi ulang untuk siklus berikutnya."
    ],
    sections: [
      {
        heading: "Apa itu UM-PTKIN",
        body: "Ujian Masuk Perguruan Tinggi Keagamaan Islam Negeri (UM-PTKIN) merupakan seleksi mandiri nasional yang diselenggarakan bersama oleh UIN, IAIN, STAIN, dan PTN mitra yang memiliki program studi dengan izin Kementerian Agama. Jalur ini dapat diikuti siswa madrasah maupun sekolah umum sesuai kualifikasi dan ketentuan tahun berjalan."
      },
      {
        heading: "Sistem ujian",
        bullets: [
          "Ujian memakai aplikasi Sistem Seleksi Elektronik (SSE) berbasis PC/laptop.",
          "Pelaksanaan bersifat online on-site di titik lokasi ujian PTKIN.",
          "Peserta dapat memilih titik lokasi ujian yang tersedia; lokasi ujian tidak harus sama dengan kampus prodi tujuan.",
          "Pastikan perangkat, jadwal sesi, dan instruksi titik lokasi mengikuti kartu peserta."
        ]
      },
      {
        heading: "Materi ujian SSE",
        table: [
          ["Komponen", "Fokus"],
          ["Penalaran Akademik", "Kemampuan verbal, numerik, dan penalaran induktif/deduktif."],
          ["Penalaran Matematika", "Pemecahan masalah kuantitatif dan logika matematika dasar."],
          ["Literasi Membaca", "Pemahaman bacaan Bahasa Indonesia dan literasi analitis."],
          ["Literasi Ajaran Islam", "Pengetahuan dasar ajaran Islam, moderasi beragama, dan akhlak."]
        ],
        tableHeader: true
      },
      {
        heading: "Jadwal UM-PTKIN 2026 pada arsip",
        table: [
          ["Tahap", "Waktu arsip 2026"],
          ["Pendaftaran online dan pembayaran", "13 April – 30 Mei 2026"],
          ["Finalisasi pendaftaran", "13 April – 3 Juni 2026"],
          ["Cetak kartu peserta", "Mulai 14 April 2026"],
          ["Ujian SSE", "8 – 14 Juni 2026"],
          ["Pengumuman kelulusan", "30 Juni 2026"]
        ],
        tableHeader: true
      },
      {
        heading: "Persyaratan dan pilihan prodi",
        bullets: [
          "Arsip 2026 menerima lulusan MA, MAK, SMA, SMK, SPM, PDF, PKPPS, atau sederajat dari tahun 2024, 2025, dan 2026.",
          "Siapkan ijazah atau bukti kelulusan yang dipersyaratkan, NISN valid, email aktif, dan nomor WhatsApp aktif.",
          "Peserta dapat memilih maksimal tiga program studi pada PTKIN/PTN peserta.",
          "Urutkan pilihan prodi berdasarkan prioritas minat karena urutan menjadi bagian dari pendaftaran.",
          "Biaya yang telah dibayarkan tidak dapat ditarik kembali dan pendaftaran sah setelah finalisasi serta kartu peserta dicetak."
        ]
      },
      {
        heading: "Alur pendaftaran",
        numbered: [
          "Buka portal UM-PTKIN dan buat akun sesuai instruksi tahun berjalan.",
          "Isi biodata dan pilih program studi sampai maksimal tiga pilihan.",
          "Pilih titik lokasi ujian yang tersedia.",
          "Bayar biaya seleksi melalui kanal resmi yang ditunjuk.",
          "Finalisasi pendaftaran, simpan bukti, dan cetak kartu peserta.",
          "Ikuti ujian SSE sesuai sesi dan titik lokasi, lalu cek pengumuman melalui portal resmi."
        ]
      },
      {
        heading: "Cakupan kampus",
        body: "Data arsip memuat 59 peserta: UIN, IAIN, STAIN, serta Universitas Singaperbangsa Karawang sebagai PTN mitra. Daftar kampus, prodi yang tersedia, dan status peserta dapat berubah, sehingga SA perlu membuka daftar peserta pada portal UM-PTKIN ketika membantu siswa memilih."
      },
      {
        heading: "Batasan informasi",
        body: "Jadwal, biaya, syarat kelulusan, materi, titik lokasi, dan daftar program studi pada artikel ini berasal dari kompilasi UM-PTKIN 2026 yang berstatus arsip. Jangan menyampaikan angka atau tanggal ini sebagai jadwal aktif sebelum ada pengumuman resmi terbaru."
      }
    ],
    ops: [
      "Pastikan siswa membedakan UM-PTKIN dari SNBP/SNBT dan seleksi mandiri satu kampus.",
      "Cek portal UM-PTKIN untuk siklus terbaru sebelum memberi jadwal atau biaya.",
      "Tanyakan program studi dan kampus tujuan karena tidak semua prodi tersedia di setiap PTKIN.",
      "Ingatkan siswa menyimpan bukti pembayaran, finalisasi, dan kartu peserta."
    ],
    sources: [
      official("Portal UM-PTKIN", "https://um.ptkin.ac.id/"),
      official("Portal PTKIN", "https://ptkin.ac.id/"),
      official("Jalur Seleksi Mandiri Nasional UM-PTKIN 2026", "https://um.ptkin.ac.id/", "Knowledge base — kompilasi arsip 2026")
    ],
    metadata: {
      audience: "Student Advisor",
      topic: "Seleksi masuk PTKIN",
      sourcePeriod: "2026",
      status: "Canonical article; data jadwal dan kampus berstatus arsip",
      owner: "Tim akademik/kesiswaan terkait",
      note: "Verifikasi ulang ketentuan terbaru pada portal UM-PTKIN sebelum konsultasi.",
      sourceFiles: ["knowledge-base/02-pejuang-kampus-impian/01-facts/17-jalur-um-ptkin-2026.md"]
    }
  },

  {
    id: "smm-ptn-barat-2026",
    type: "article",
    topic: "Universitas & Jurusan",
    subtopic: "SMM-PTN Barat 2026",
    title: "Panduan SMM-PTN Barat 2026",
    aliases: [
      "smm ptn barat",
      "smm-ptn barat",
      "smm ptn barat 2026",
      "jalur mandiri ptn barat",
      "ptn konsorsium barat",
      "utbk smm ptn barat",
      "pendaftaran smmptn barat",
      "smmptnbarat",
      "kampus smm ptn barat",
      "ujian mandiri sumatera"
    ],
    summary: "Panduan seleksi mandiri bersama BKS-PTN Barat yang menggunakan UTBK SMM-PTN Barat dan satu portal pendaftaran untuk PTN peserta.",
    snippet: "SMM-PTN Barat menyatukan pendaftaran ujian mandiri beberapa PTN peserta. Peserta memilih prodi dan titik ujian melalui satu portal, lalu mengikuti UTBK SMM-PTN Barat di lokasi yang tersedia.",
    highlights: [
      "Seleksi memakai UTBK SMM-PTN Barat dengan materi TPS, literasi Bahasa Indonesia, literasi Bahasa Inggris, dan penalaran matematika.",
      "Titik ujian tidak harus berada di kampus pilihan; peserta dapat memilih PTN titik ujian yang lebih dekat dari domisili.",
      "Arsip 2026 membuka pilihan pada 18 PTN peserta dan memiliki pengecualian tahun ijazah pada kampus tertentu.",
      "Jadwal, peserta, biaya, dan persyaratan wajib dikonfirmasi ulang pada portal resmi ketika siklus baru dibuka."
    ],
    sections: [
      {
        heading: "Apa itu SMM-PTN Barat",
        body: "Seleksi Mandiri Masuk PTN Barat (SMM-PTN Barat) adalah seleksi bersama yang diselenggarakan oleh Rektor PTN dalam konsorsium BKS-PTN Barat. Peserta mendaftar melalui satu portal dan dapat memilih PTN/prodi peserta tanpa melakukan pendaftaran terpisah ke setiap kampus."
      },
      {
        heading: "Sistem ujian dan lokasi",
        bullets: [
          "Ujian menggunakan UTBK SMM-PTN Barat berbasis komputer.",
          "Kampus tujuan tidak harus menjadi lokasi ujian.",
          "Pilih titik ujian PTN yang tersedia dan paling realistis dari domisili.",
          "Sesi dan ruang ujian ditetapkan panitia lokal; ikuti informasi pada kartu peserta."
        ]
      },
      {
        heading: "Materi ujian",
        table: [
          ["Komponen", "Materi"],
          ["Tes Potensi Skolastik", "Penalaran umum, kemampuan kuantitatif, pengetahuan/pemahaman umum, serta pemahaman bacaan dan menulis."],
          ["Tes literasi", "Literasi Bahasa Indonesia dan literasi Bahasa Inggris."],
          ["Penalaran matematika", "Pemecahan masalah dan penalaran matematika."]
        ],
        tableHeader: true
      },
      {
        heading: "Jadwal SMM-PTN Barat 2026 pada arsip",
        table: [
          ["Tahap", "Waktu arsip 2026"],
          ["Registrasi online dan ID bayar", "4 Mei – 11 Juni 2026, 16.00 WIB"],
          ["Batas pembayaran", "11 Juni 2026, 16.00 WIB"],
          ["Simpan permanen formulir", "Paling lambat 12 Juni 2026, 16.00 WIB"],
          ["Cetak kartu peserta", "Paling lambat 16 Juni 2026, 16.00 WIB"],
          ["Pelaksanaan UTBK", "17 – 24 Juni 2026"]
        ],
        tableHeader: true
      },
      {
        heading: "Syarat umum dan pengecualian tahun ijazah",
        bullets: [
          "Arsip 2026 menerima lulusan SMA, SMK, MA, atau Paket C dengan ijazah resmi; lulusan 2026 dapat memakai SKL sesuai format yang disyaratkan.",
          "Ketentuan umum menerima ijazah tiga tahun terakhir (2024–2026).",
          "Beberapa peserta menerima ijazah lima tahun terakhir (2022–2026): UNJA, UTU, UNSAM, UMRAH, ISI Padangpanjang, UPNVJ, dan UIN Mahmud Yunus Batusangkar.",
          "ISBI Aceh pada arsip 2026 menerima ijazah sepuluh tahun terakhir (2017–2026); Paket C memiliki batas usia khusus maksimal 35 tahun.",
          "Peserta harus sehat jasmani dan rohani serta memenuhi ketentuan status seleksi nasional yang tercantum pada pengumuman."
        ]
      },
      {
        heading: "Alur pendaftaran",
        numbered: [
          "Buka portal resmi SMM-PTN Barat dan buat akun.",
          "Dapatkan ID bayar dan lakukan pembayaran melalui kanal bank mitra.",
          "Lengkapi biodata, pilihan PTN/prodi, dan titik lokasi ujian.",
          "Simpan permanen formulir sebelum batas waktu.",
          "Cetak kartu peserta dan ikuti UTBK pada tanggal dan lokasi yang tercantum.",
          "Pantau pengumuman dan instruksi daftar ulang pada portal resmi atau laman PTN tujuan."
        ]
      },
      {
        heading: "PTN peserta pada arsip 2026",
        bullets: [
          "USK, Untirta, UNIB, UNJA, ISI Padangpanjang, UPR, Unimal, UMRAH, UBB, UTU, ITERA, ISBI Aceh, UNSAM, UNRI, UNSIL, USU, Unila, dan UNAND."
        ]
      },
      {
        heading: "Batasan informasi",
        body: "Data SMM-PTN Barat 2026 berasal dari kompilasi internal dengan status arsip. Daftar PTN, prodi, masa berlaku ijazah, jadwal, biaya, materi, dan status penerimaan nasional dapat berubah. Gunakan artikel ini untuk memahami alur dan menemukan portal, lalu ikuti pengumuman terbaru panitia SMM-PTN Barat."
      }
    ],
    ops: [
      "Cek tahun kelulusan siswa karena batas ijazah dapat berbeda antar-PTN peserta.",
      "Pastikan siswa memahami bahwa titik ujian dan kampus tujuan dapat berbeda.",
      "Buka portal resmi untuk ID bayar, jadwal, biaya, pilihan prodi, dan kartu peserta.",
      "Jangan menganggap SMM-PTN Barat sama dengan SNBT; materi dan proses pendaftarannya memiliki aturan sendiri."
    ],
    sources: [
      official("Portal pendaftaran SMM-PTN Barat", "https://pendaftaran.smmptnbarat.id/"),
      official("SMM-PTN Barat 2026 — kompilasi internal", "https://pendaftaran.smmptnbarat.id/", "Knowledge base — arsip 2026")
    ],
    metadata: {
      audience: "Student Advisor",
      topic: "Seleksi mandiri konsorsium PTN Barat",
      sourcePeriod: "2026",
      status: "Canonical article; data jadwal dan peserta berstatus arsip",
      owner: "Tim akademik/kesiswaan terkait",
      note: "Siklus baru harus diverifikasi pada portal SMM-PTN Barat dan PTN tujuan.",
      sourceFiles: ["knowledge-base/02-pejuang-kampus-impian/01-facts/18-smm-ptn-barat-2026.md"]
    }
  }
];

export default GENERATED_ADMISSIONS_ARTICLES;
