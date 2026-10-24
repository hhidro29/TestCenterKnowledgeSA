// Institution-specific health intent routing. The generic health article is
// kept as a fallback; school-specific queries should land on the institution
// article whenever that article exists.
export const KEDINASAN_HEALTH_ROUTING = {
  "stan-2026": {
    aliases: ["kesehatan pkn stan", "tes kesehatan stan", "kebugaran stan"],
    section: {
      heading: "Kesehatan dan kebugaran PKN STAN",
      body: "Artikel ini tidak memuat ambang kesehatan rinci PKN STAN. Jika siswa menanyakan kesehatan atau kebugaran, baca persyaratan dan tahapan seleksi pada pengumuman PKN STAN tahun berjalan. Jangan memakai ketentuan IPDN, STIN, atau sekolah kedinasan lain sebagai pengganti aturan PKN STAN."
    }
  },
  "stis-2026": {
    aliases: ["kesehatan stis", "tes kesehatan stis", "buta warna stis"]
  },
  "stmkg-2026": {
    aliases: ["kesehatan stmkg", "tes kesehatan stmkg", "buta warna stmkg"]
  },
  "sipencatar-kemenhub-2026": {
    aliases: ["kesehatan sipencatar", "tes kesehatan kemenhub", "kesehatan kemenhub"],
    section: {
      heading: "Persyaratan kesehatan SIPENCATAR Kemenhub",
      body: "Persyaratan kesehatan dan kebugaran SIPENCATAR dapat berbeda menurut sekolah, program studi, dan matra transportasi. Gunakan pengumuman atau portal sekolah tujuan untuk mengecek penglihatan, kebugaran, pemeriksaan medis, serta dokumen yang diminta. Artikel ini tidak menetapkan batas kesehatan umum untuk seluruh sekolah Kemenhub."
    }
  },
  "poltekpin-2026": {
    aliases: ["kesehatan poltekpin", "tes kesehatan poltekpin", "buta warna poltekpin"]
  },
  "poltekimipas-2026": {
    aliases: ["kesehatan poltekimipas", "tes kesehatan poltekimipas", "buta warna poltekimipas"],
    section: {
      heading: "Persyaratan kesehatan Poltekimipas",
      body: "Detail kesehatan Poltekimipas harus mengikuti pengumuman penerimaan tahun berjalan dan pemeriksaan panitia. Jika siswa menanyakan penglihatan, kebugaran, atau kondisi medis tertentu, arahkan ke sumber resmi dan jangan mengambil ketentuan dari sekolah kedinasan lain."
    }
  },
  "poltek-ssn-2026": {
    aliases: ["kesehatan poltek ssn", "tes kesehatan poltek ssn", "buta warna poltek ssn"]
  },
  "ipdn-2026": {
    aliases: ["kesehatan ipdn", "tes kesehatan ipdn", "buta warna ipdn", "tinggi badan ipdn"]
  },
  "stin-2026": {
    aliases: ["kesehatan stin", "tes kesehatan stin", "buta warna stin", "tinggi badan stin"]
  }
};

export default KEDINASAN_HEALTH_ROUTING;
