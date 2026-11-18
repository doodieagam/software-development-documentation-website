export type DocumentId = "brd" | "prd" | "srs" | "erd" | "uat";
export type PageId = "ikhtisar" | "checklist" | DocumentId;

export type ContentSection = {
  id: string;
  title: string;
  body: string;
};

export type GuideDocument = {
  id: DocumentId;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  purpose: string;
  participants: string[];
  structure: ContentSection[];
  outcome: string;
  checklist: string[];
};

const section = (id: string, title: string, body: string): ContentSection => ({ id, title, body });

export const documents: GuideDocument[] = [
  {
    id: "brd",
    number: "01",
    title: "Business Requirements Document",
    shortTitle: "Kebutuhan Bisnis",
    summary: "Tetapkan masalah, tujuan, dan ruang lingkup bisnis.",
    purpose: "BRD menjelaskan kebutuhan bisnis, masalah yang ingin diselesaikan, tujuan organisasi, dan ruang lingkup solusi yang akan dikembangkan. BRD menjadi acuan bagi stakeholder dan tim proyek untuk memahami **mengapa sistem dibutuhkan**.",
    participants: [
      "Sponsor atau pemilik kebutuhan bisnis.",
      "Stakeholder dan pemilik proses.",
      "Business Analyst.",
      "Product Manager atau Product Owner.",
      "Perwakilan pengguna.",
      "Tim teknologi sebagai pemberi masukan kelayakan.",
    ],
    structure: [
      section("informasi-dokumen", "Informasi Dokumen", `Cantumkan:

- Nama proyek atau sistem dan judul dokumen.
- Nomor atau kode dokumen, serta versi dokumen.
- Tanggal dibuat dan diperbarui.
- Penulis dan pihak yang meninjau.
- Status dokumen: Draft, Review, Approved.`),
      section("ringkasan-eksekutif", "Ringkasan Eksekutif", "Ringkas konteks, masalah utama, solusi yang diusulkan, manfaat, dan keputusan yang dibutuhkan."),
      section("latar-belakang", "Latar Belakang Bisnis", "Jelaskan kondisi organisasi atau proses saat ini, alasan perubahan diperlukan, serta konteks yang melatarbelakangi proyek."),
      section("masalah-dan-peluang", "Permasalahan dan Peluang", `Untuk setiap masalah, tuliskan:

- Kondisi saat ini.
- Dampak terhadap proses, biaya, waktu, kualitas, atau pengguna.
- Penyebab yang diketahui.
- Peluang perbaikan.`),
      section("sasaran-bisnis", "Tujuan dan Sasaran Bisnis", "Nyatakan hasil bisnis yang ingin dicapai. Gunakan sasaran yang spesifik dan dapat diukur jika memungkinkan."),
      section("kpi", "Indikator Keberhasilan (KPI)", `Untuk setiap KPI, cantumkan:

- Nama indikator.
- Definisi dan cara pengukuran.
- Kondisi awal (baseline), jika tersedia.
- Target dan periode pengukuran.
- Pemilik indikator dan sumber data.`),
      section("ruang-lingkup", "Ruang Lingkup", `**In Scope:** proses, unit kerja, pengguna, lokasi, dan kemampuan bisnis yang termasuk dalam proyek.

**Out of Scope:** hal yang secara eksplisit tidak termasuk dalam proyek.`),
      section("stakeholder", "Stakeholder", `Daftar pihak yang berkepentingan beserta:

- Nama atau peran.
- Tanggung jawab.
- Kebutuhan atau kepentingan.
- Tingkat pengaruh.
- Kewenangan persetujuan.`),
      section("as-is", "Gambaran Proses Bisnis Saat Ini (As-Is)", "Jelaskan langkah proses yang berjalan sekarang, aktor yang terlibat, sistem yang digunakan, masukan, keluaran, serta kendala proses. Sertakan diagram proses jika membantu."),
      section("to-be", "Proses Bisnis yang Diusulkan (To-Be)", "Jelaskan proses yang diharapkan setelah solusi diterapkan. Tunjukkan perubahan dari proses saat ini dan manfaatnya."),
      section("kebutuhan-bisnis", "Kebutuhan Bisnis (Business Requirements)", `Daftarkan kebutuhan bisnis menggunakan ID unik, misalnya \`BR-001\`.

Untuk setiap kebutuhan, cantumkan:

- ID dan nama kebutuhan.
- Deskripsi kebutuhan.
- Alasan atau manfaat.
- Prioritas.
- Sumber atau stakeholder peminta.
- Kriteria keberhasilan tingkat bisnis.`),
      section("aturan-bisnis", "Aturan Bisnis (Business Rules)", `Tuliskan kebijakan dan aturan yang harus dipatuhi proses atau sistem. Beri ID unik, misalnya \`BRL-001\`.

Contoh aspek yang perlu dijelaskan:

- Batasan dan syarat suatu proses.
- Otorisasi atau persetujuan.
- Perhitungan dan pembagian nilai.
- Kondisi perubahan status.
- Pengecualian dan penanganannya.

Aturan bisnis harus disetujui pemilik proses, bukan ditentukan berdasarkan asumsi tim pengembang.`),
      section("asumsi", "Asumsi, Ketergantungan, dan Batasan", `- **Asumsi:** hal yang dianggap benar untuk perencanaan.
- **Dependencies:** sistem, tim, data, vendor, atau keputusan lain yang dibutuhkan.
- **Constraints:** batasan anggaran, waktu, regulasi, teknologi, atau operasional.`),
      section("risiko", "Risiko dan Mitigasi", "Catat risiko, kemungkinan, dampak, tingkat risiko, pemilik risiko, dan rencana mitigasi."),
      section("dampak", "Dampak Perubahan", "Jelaskan dampak solusi terhadap orang, proses, kebijakan, data, sistem yang sudah ada, pelatihan, dan operasional."),
      section("sign-off", "Persetujuan (Approval / Sign-off)", "Cantumkan nama, jabatan atau peran, keputusan, tanggal, dan catatan persetujuan stakeholder yang berwenang."),
    ],
    outcome: "BRD yang disetujui harus memberikan pemahaman bersama tentang masalah bisnis, sasaran, ruang lingkup, kebutuhan, aturan, batasan, risiko, dan pihak yang berwenang mengambil keputusan.",
    checklist: [
      "Latar belakang dan masalah bisnis jelas.",
      "Tujuan dan KPI didefinisikan.",
      "Scope dan out of scope disepakati.",
      "Stakeholder dan pemilik keputusan teridentifikasi.",
      "Proses As-Is dan To-Be dijelaskan.",
      "Business requirements dan business rules memiliki ID.",
      "Risiko, asumsi, dan dependensi dicatat.",
      "Persetujuan stakeholder diperoleh.",
    ],
  },
  {
    id: "prd",
    number: "02",
    title: "Product Requirements Document",
    shortTitle: "Kebutuhan Produk",
    summary: "Rumuskan fitur, kebutuhan pengguna, dan pengalaman produk.",
    purpose: "PRD menerjemahkan kebutuhan bisnis menjadi kebutuhan produk dan pengalaman pengguna. PRD menjelaskan **produk apa yang perlu dibuat, untuk siapa, fitur apa yang diperlukan, dan bagaimana keberhasilan fitur dinilai**.",
    participants: [
      "Product Manager atau Product Owner.",
      "Business Analyst.",
      "UX/UI Designer.",
      "System Analyst.",
      "Developer.",
      "QA Engineer.",
      "Stakeholder bisnis dan perwakilan pengguna.",
    ],
    structure: [
      section("informasi-dokumen", "Informasi Dokumen", "Nama produk, kode dokumen, versi, tanggal, penulis, reviewer, dan status."),
      section("ringkasan-produk", "Ringkasan Produk", "Jelaskan produk, pengguna utama, masalah yang diselesaikan, dan nilai yang diberikan."),
      section("visi-produk", "Visi dan Tujuan Produk", "Nyatakan visi produk, tujuan yang ingin dicapai, serta hubungan tujuan produk dengan tujuan bisnis."),
      section("persona", "Target Pengguna dan Persona", `Untuk setiap kelompok pengguna, jelaskan:

- Peran dan karakteristik.
- Tujuan yang ingin dicapai.
- Kebutuhan utama.
- Hambatan atau masalah.
- Konteks penggunaan produk.`),
      section("ruang-lingkup", "Ruang Lingkup Produk", "Daftar kemampuan yang termasuk dan tidak termasuk dalam versi atau rilis yang direncanakan."),
      section("hak-akses", "Peran Pengguna dan Gambaran Hak Akses", "Jelaskan jenis pengguna dan gambaran kewenangan masing-masing. Matriks izin yang terperinci dapat dirujuk ke SRS."),
      section("daftar-fitur", "Daftar Fitur", `Buat daftar fitur dengan:

- ID fitur, misalnya \`FEAT-001\`.
- Nama fitur dan deskripsi singkat.
- Pengguna terkait.
- Tujuan atau manfaat.
- Prioritas.
- Rilis atau fase target.`),
      section("spesifikasi-fitur", "Spesifikasi Fitur", `Untuk setiap fitur, jelaskan:

- Tujuan fitur.
- Aktor atau pengguna.
- Kondisi awal (precondition).
- Alur utama dan alur alternatif.
- Kondisi gagal dan pengecualian.
- Masukan dan keluaran yang terlihat oleh pengguna.
- Aturan produk yang relevan.
- Ketergantungan dengan fitur lain.`),
      section("user-stories", "User Stories", `Gunakan format:

> Sebagai [jenis pengguna], saya ingin [kemampuan], sehingga [manfaat].

Setiap user story diberi ID, misalnya \`US-001\`, dan ditautkan ke fitur serta kebutuhan bisnis terkait.`),
      section("acceptance-criteria", "Acceptance Criteria", `Tuliskan syarat yang harus terpenuhi agar user story atau fitur dianggap selesai. Kriteria harus spesifik, dapat diuji, dan tidak multitafsir.

Format yang dapat digunakan:

- **Given:** kondisi awal.
- **When:** tindakan yang dilakukan.
- **Then:** hasil yang diharapkan.`),
      section("user-journey", "User Journey dan Alur Pengguna", "Jelaskan perjalanan pengguna dari awal sampai tujuan tercapai, termasuk titik keputusan, kondisi gagal, dan perpindahan antarhalaman atau fitur. Sertakan diagram jika diperlukan."),
      section("use-case", "Use Case", `Untuk setiap use case, tuliskan:

- ID dan nama.
- Aktor dan tujuan.
- Prasyarat dan pemicu.
- Alur utama dan alur alternatif.
- Kondisi akhir.`),
      section("ui-ux", "Kebutuhan UI/UX", `Jelaskan kebutuhan tampilan dan interaksi, seperti:

- Daftar halaman atau layar.
- Navigasi.
- Formulir dan komponen.
- Kondisi loading, kosong, berhasil, dan gagal.
- Responsif pada perangkat.
- Aksesibilitas.
- Tautan ke wireframe atau desain.`),
      section("notifikasi", "Notifikasi dan Komunikasi", "Jelaskan peristiwa pemicu, penerima, kanal, isi atau informasi notifikasi, preferensi pengguna, dan kondisi pengiriman ulang jika relevan."),
      section("integrasi", "Integrasi Produk", "Daftar layanan atau sistem eksternal yang perlu terhubung, tujuan integrasi, data yang dipertukarkan, dan batasan yang diketahui. Detail teknis API dijelaskan di SRS atau dokumentasi API."),
      section("prioritas", "Prioritas Fitur", `Gunakan metode yang disepakati, misalnya:

- Must Have.
- Should Have.
- Could Have.
- Won't Have (untuk rilis ini).

Tuliskan alasan prioritas dan pihak yang menyetujuinya.`),
      section("metrik", "Metrik Keberhasilan Produk", "Tentukan metrik penggunaan, penyelesaian tugas, adopsi, kualitas, atau dampak produk. Sertakan definisi dan sumber pengukurannya."),
      section("rencana-rilis", "Rencana Rilis", "Cantumkan fase, fitur yang masuk setiap fase, dependensi, target waktu, dan kriteria kesiapan rilis."),
      section("keputusan", "Pertanyaan Terbuka dan Keputusan", "Catat hal yang belum diputuskan, pemilik keputusan, tenggat, dan statusnya."),
    ],
    outcome: "PRD yang disetujui harus memberi gambaran jelas tentang pengguna, fitur, alur, prioritas, dan kriteria penerimaan produk. PRD bukan pengganti spesifikasi teknis terperinci.",
    checklist: [
      "Visi, tujuan, dan target pengguna jelas.",
      "Daftar fitur dan prioritas tersedia.",
      "Setiap fitur memiliki spesifikasi.",
      "User stories dan acceptance criteria tersedia.",
      "User journey dan use case dijelaskan.",
      "Kebutuhan UI/UX dicatat.",
      "Metrik keberhasilan dan rencana rilis ditetapkan.",
      "Hubungan dengan BRD dapat ditelusuri.",
    ],
  },
  {
    id: "srs",
    number: "03",
    title: "Software Requirements Specification",
    shortTitle: "Spesifikasi Software",
    summary: "Definisikan perilaku, batasan, dan kebutuhan teknis sistem.",
    purpose: "SRS menjelaskan kebutuhan perangkat lunak secara rinci dan dapat diverifikasi. SRS menjadi acuan utama bagi tim teknis untuk **merancang, membangun, mengintegrasikan, dan menguji sistem**.",
    participants: [
      "System Analyst.",
      "Software Architect atau Technical Lead.",
      "Developer.",
      "Database Engineer.",
      "QA Engineer.",
      "Security Engineer, jika diperlukan.",
      "Product Owner dan stakeholder terkait.",
    ],
    structure: [
      section("informasi-dokumen", "Informasi Dokumen", "Nama sistem, kode dokumen, versi, tanggal, penulis, reviewer, dan status."),
      section("pendahuluan", "Pendahuluan", "Jelaskan tujuan SRS, ruang lingkup sistem, istilah, singkatan, referensi, dan cara membaca dokumen."),
      section("gambaran-sistem", "Gambaran Umum Sistem", "Jelaskan konteks sistem, fungsi utama, jenis pengguna, lingkungan operasional, batasan, asumsi, dan ketergantungan."),
      section("arsitektur-sistem", "Konteks dan Arsitektur Sistem", `Jelaskan:

- Sistem dan aktor eksternal.
- Komponen utama dan hubungan antar-komponen.
- Batas kepercayaan dan batas integrasi.
- Diagram konteks atau arsitektur tingkat tinggi.

Detail desain arsitektur yang sangat mendalam dapat ditempatkan pada dokumen Software Architecture Document (SAD) terpisah.`),
      section("lingkungan", "Lingkungan dan Teknologi", "Cantumkan platform, bahasa pemrograman, framework, database, layanan hosting, perangkat, browser, dan versi yang relevan. Bedakan teknologi yang sudah diputuskan dari opsi yang masih dievaluasi."),
      section("hak-akses", "Jenis Pengguna dan Hak Akses", "Jelaskan setiap role, kewenangan, batas akses, serta tindakan yang diizinkan atau dilarang. Sertakan matriks role-permission bila diperlukan."),
      section("kebutuhan-fungsional", "Kebutuhan Fungsional (Functional Requirements)", `Setiap kebutuhan harus memiliki ID unik, misalnya \`FR-AUTH-001\`.

Untuk setiap kebutuhan, tuliskan:

- ID dan nama.
- Deskripsi perilaku sistem.
- Aktor atau komponen terkait.
- Pemicu dan kondisi awal.
- Alur atau aturan pemrosesan.
- Masukan, keluaran, dan validasi.
- Kondisi gagal dan penanganan.
- Prioritas dan sumber requirement.
- Kriteria verifikasi.

Gunakan bahasa yang tegas, misalnya: "Sistem harus menolak permintaan..." Hindari kata yang tidak terukur seperti "secepatnya" atau "mudah" tanpa definisi.`),
      section("kebutuhan-nonfungsional", "Kebutuhan Nonfungsional (Non-Functional Requirements)", `Kelompokkan kebutuhan yang relevan, misalnya:

- **Performance:** waktu respons, kapasitas, throughput.
- **Availability:** target ketersediaan dan perilaku saat gangguan.
- **Security:** autentikasi, otorisasi, enkripsi, pengelolaan secret.
- **Privacy:** pengumpulan, penggunaan, retensi, dan penghapusan data.
- **Reliability:** konsistensi dan pemulihan kegagalan.
- **Scalability:** pertumbuhan pengguna, transaksi, dan data.
- **Usability:** kemudahan penggunaan yang dapat dievaluasi.
- **Accessibility:** dukungan aksesibilitas.
- **Compatibility:** perangkat, browser, dan sistem yang didukung.
- **Maintainability:** standar kode, dokumentasi, dan kemudahan perubahan.
- **Backup & Recovery:** frekuensi backup, retensi, RPO, dan RTO jika ditetapkan.
- **Auditability:** pencatatan aktivitas penting.

Setiap kebutuhan nonfungsional harus memiliki ukuran atau metode verifikasi.`),
      section("logika-sistem", "Alur dan Logika Sistem", "Jelaskan workflow, state/status, transisi, kondisi keputusan, proses otomatis, proses manual, dan skenario pengecualian. Sertakan flowchart atau sequence diagram bila membantu."),
      section("input-output", "Spesifikasi Input dan Output", `Untuk setiap input/output, cantumkan:

- Nama field atau data.
- Tipe dan format.
- Wajib atau opsional.
- Batas panjang atau rentang.
- Nilai yang diperbolehkan dan aturan validasi.
- Sumber dan tujuan data.
- Pesan kesalahan yang diharapkan jika relevan.`),
      section("validasi-data", "Aturan dan Validasi Data", "Jelaskan validasi di sisi aplikasi dan database, keunikan, referential integrity, batas transaksi, aturan perubahan data, dan perlakuan terhadap data tidak valid."),
      section("database", "Kebutuhan Database", "Jelaskan entitas utama, hubungan, kebutuhan transaksi, integritas data, retensi, dan kebutuhan akses. Detail struktur tabel dapat dirujuk ke ERD dan Data Dictionary."),
      section("api", "Spesifikasi API dan Integrasi", `Untuk setiap endpoint atau integrasi, dokumentasikan:

- Nama dan tujuan.
- Method dan path.
- Autentikasi dan otorisasi.
- Parameter, header, dan request body.
- Skema response.
- HTTP status code dan error code.
- Validasi.
- Pagination, filtering, dan sorting jika ada.
- Rate limit dan timeout jika relevan.
- Idempotency dan retry untuk operasi yang membutuhkannya.
- Contoh request/response dan versi API.`),
      section("autentikasi", "Autentikasi dan Manajemen Sesi", "Jelaskan metode login, pengelolaan sesi/token, masa berlaku, logout, reset kredensial, dan perlindungan terhadap penyalahgunaan akun."),
      section("otorisasi", "Otorisasi dan Kontrol Akses", "Jelaskan bagaimana sistem memeriksa izin pada setiap tindakan dan data. Sertakan kebijakan akses pada level aplikasi, API, dan database bila digunakan."),
      section("error-logging", "Penanganan Error dan Logging", "Jelaskan kategori error, format pesan, kode error, informasi yang boleh dicatat, informasi sensitif yang tidak boleh dicatat, korelasi log, monitoring, dan mekanisme eskalasi."),
      section("keamanan", "Kebutuhan Keamanan", `Dokumentasikan kontrol keamanan yang diperlukan, seperti:

- Validasi dan sanitasi input.
- Proteksi terhadap serangan umum.
- Enkripsi saat transit dan saat tersimpan.
- Pengelolaan secret dan kredensial.
- Pembatasan akses dan audit log.
- Pengelolaan kerentanan dan dependency.
- Prosedur respons insiden.`),
      section("deployment", "Deployment dan Operasional", "Jelaskan lingkungan development, staging, dan production; konfigurasi; proses deployment; migrasi database; rollback; monitoring; dan tanggung jawab operasional."),
      section("traceability-matrix", "Traceability Matrix", `Petakan hubungan antara kebutuhan bisnis, fitur produk, requirement sistem, komponen desain, dan test case.

Contoh kolom:

- Business Requirement ID.
- Feature / User Story ID.
- Software Requirement ID.
- Komponen atau modul.
- Test Case ID.
- Status verifikasi.`),
      section("lampiran", "Lampiran dan Persetujuan", "Cantumkan glosarium, diagram, referensi, daftar isu terbuka, reviewer, dan pihak yang menyetujui SRS."),
    ],
    outcome: "SRS harus cukup jelas, konsisten, lengkap, dapat diuji, dan dapat ditelusuri. Developer tidak seharusnya perlu menebak perilaku sistem yang penting dari requirement yang ambigu.",
    checklist: [
      "Konteks dan ruang lingkup sistem jelas.",
      "Functional requirements memiliki ID.",
      "Non-functional requirements terukur.",
      "Alur, input, output, dan validasi dijelaskan.",
      "Role dan hak akses didefinisikan.",
      "API dan integrasi didokumentasikan.",
      "Keamanan, logging, dan error handling dijelaskan.",
      "Deployment dan kebutuhan operasional dicatat.",
      "Requirement dapat diverifikasi dan ditelusuri.",
    ],
  },
  {
    id: "erd",
    number: "04",
    title: "Entity Relationship Diagram",
    shortTitle: "Desain Database",
    summary: "Petakan entitas, relasi, dan aturan integritas data.",
    purpose: "ERD menggambarkan **struktur data dan hubungan antar-entitas**. ERD biasanya menjadi bagian dari dokumentasi desain database. ERD bukan sekadar gambar; rancangan yang baik juga dilengkapi Data Dictionary dan aturan integritas.",
    participants: [
      "System Analyst.",
      "Database Designer atau Database Engineer.",
      "Software Architect.",
      "Backend Developer.",
      "QA Engineer.",
      "Pemilik data atau stakeholder bisnis.",
    ],
    structure: [
      section("informasi-dokumen", "Informasi Dokumen", "Nama sistem atau database, versi skema, tanggal, penulis, dan status."),
      section("gambaran-database", "Gambaran Database", "Jelaskan tujuan database, ruang lingkup data, teknologi database, serta batasan desain yang relevan."),
      section("entitas", "Identifikasi Entitas", "Daftar objek utama yang datanya perlu disimpan. Untuk setiap entitas, jelaskan definisi dan alasan keberadaannya."),
      section("diagram", "Diagram ERD", `Sediakan diagram yang menunjukkan:

- Entitas atau tabel.
- Atribut penting.
- Primary key dan foreign key.
- Relasi.
- Kardinalitas dan optionality.

Pilih notasi yang konsisten, misalnya Crow's Foot.`),
      section("relasi", "Definisi Relasi", `Untuk setiap relasi, jelaskan:

- Entitas asal dan tujuan.
- Jenis relasi: one-to-one, one-to-many, atau many-to-many.
- Apakah relasi wajib atau opsional.
- Aturan saat data induk dihapus atau diperbarui.
- Tabel penghubung untuk relasi many-to-many jika diperlukan.`),
      section("data-dictionary", "Data Dictionary", `Untuk setiap tabel dan kolom, cantumkan:

- Nama tabel dan nama kolom.
- Definisi atau kegunaan.
- Tipe data dan panjang.
- Nullable atau NOT NULL.
- Primary key / foreign key.
- Default value.
- Unique atau check constraint.
- Contoh atau format nilai.
- Sensitivitas data jika relevan.`),
      section("kunci", "Primary Key dan Foreign Key", "Jelaskan strategi penentuan primary key, foreign key, keunikan, dan referential integrity."),
      section("constraint", "Constraint dan Aturan Integritas", `Dokumentasikan:

- NOT NULL.
- UNIQUE.
- CHECK.
- FOREIGN KEY.
- Default.
- Aturan delete/update.
- Constraint lain yang diperlukan.`),
      section("normalisasi", "Normalisasi dan Denormalisasi", "Jelaskan keputusan normalisasi, redundansi yang dihindari, dan alasan denormalisasi jika memang diperlukan."),
      section("indexing", "Indexing Strategy", "Daftar index yang diperlukan, kolom yang diindeks, pola query yang didukung, dan pertimbangan biaya penyimpanan serta penulisan."),
      section("keamanan", "Keamanan Database", `Jelaskan:

- Role database.
- Hak akses schema, tabel, dan fungsi.
- Row-Level Security (RLS), jika digunakan.
- Kebijakan akses per role.
- Perlindungan data sensitif.
- Audit dan pencatatan akses.`),
      section("retensi", "Siklus Hidup dan Retensi Data", "Jelaskan pembuatan, perubahan, pengarsipan, retensi, backup, dan penghapusan data sesuai kebijakan yang berlaku."),
      section("migration", "Migration dan Versioning", "Dokumentasikan perubahan skema, urutan migration, dependensi, prosedur rollback, dan kompatibilitas dengan versi aplikasi."),
      section("transaksi", "Query dan Transaksi Penting", "Dokumentasikan query atau transaksi yang kritis, kebutuhan konsistensi, potensi locking, dan penanganan transaksi gagal."),
      section("persetujuan", "Persetujuan Desain", "Catat reviewer teknis, pemilik data, keputusan desain, dan status persetujuan."),
    ],
    outcome: `Paket dokumentasi database idealnya berisi:

- File diagram ERD.
- Data Dictionary.
- Definisi constraint dan relasi.
- SQL schema atau migration.
- Dokumentasi index.
- Kebijakan akses dan keamanan database.`,
    checklist: [
      "Entitas dan relasi teridentifikasi.",
      "Primary key dan foreign key ditentukan.",
      "Kardinalitas dan optionality jelas.",
      "Data Dictionary tersedia.",
      "Tipe data dan constraint didefinisikan.",
      "Normalisasi dan index dipertimbangkan.",
      "Hak akses dan keamanan database dirancang.",
      "Migration dan versioning direncanakan.",
    ],
  },
  {
    id: "uat",
    number: "05",
    title: "User Acceptance Testing",
    shortTitle: "Penerimaan Pengguna",
    summary: "Validasi solusi bersama pengguna sebelum penerimaan.",
    purpose: `UAT adalah proses pengujian penerimaan untuk memastikan sistem **mendukung proses bisnis dan memenuhi kebutuhan pengguna**. UAT umumnya dilakukan oleh perwakilan pengguna atau stakeholder bisnis dengan dukungan QA dan tim teknis.

UAT berbeda dari seluruh aktivitas QA. QA mencakup pendekatan yang lebih luas untuk menjaga kualitas proses dan produk, sedangkan UAT berfokus pada penerimaan solusi oleh pengguna bisnis.`,
    participants: [
      "Business Owner atau pemilik proses.",
      "Perwakilan pengguna.",
      "UAT Coordinator.",
      "QA Engineer atau Tester.",
      "Developer atau tim teknis sebagai pendukung perbaikan.",
      "Product Owner atau Project Manager.",
    ],
    structure: [
      section("informasi-dokumen", "Informasi Dokumen", "Nama sistem, versi build, lingkungan pengujian, versi dokumen, tanggal, penyusun, dan status."),
      section("ringkasan", "Ringkasan UAT", "Jelaskan tujuan pengujian, fitur yang diuji, pengguna yang terlibat, dan keputusan yang ingin diperoleh."),
      section("tujuan-pengujian", "Tujuan Pengujian", "Nyatakan proses bisnis dan kebutuhan pengguna yang harus divalidasi."),
      section("ruang-lingkup", "Ruang Lingkup Pengujian", `**In Scope:** modul, fitur, role, dan skenario yang diuji.

**Out of Scope:** area yang tidak diuji dalam siklus UAT tersebut beserta alasannya.`),
      section("referensi", "Referensi", "Cantumkan BRD, PRD, SRS, desain, kebijakan bisnis, dan dokumen terkait yang menjadi dasar pengujian."),
      section("lingkungan", "Lingkungan Pengujian", `Tuliskan:

- URL atau nama environment.
- Versi aplikasi/build.
- Browser atau perangkat.
- Konfigurasi yang relevan.
- Integrasi yang aktif atau disimulasikan.
- Batasan environment.

Jangan mencantumkan password, token, atau secret di dokumen.`),
      section("peserta", "Peserta dan Tanggung Jawab", "Daftar peserta, peran, skenario yang menjadi tanggung jawabnya, serta pihak yang berwenang memberi persetujuan."),
      section("prasyarat", "Prasyarat Pengujian", `Contohnya:

- Build tersedia di environment UAT.
- Data uji telah disiapkan.
- Akun dan hak akses tersedia.
- Integrasi atau layanan pendukung siap.
- Skenario dan kriteria penerimaan telah disetujui.
- Bug penghambat yang diketahui telah ditangani atau dicatat.`),
      section("strategi", "Strategi dan Jadwal UAT", "Jelaskan pendekatan pengujian, urutan modul, jadwal, sesi pengujian, mekanisme pelaporan, dan jadwal retest."),
      section("test-scenario", "Test Scenario", `Setiap skenario memiliki:

- Scenario ID, misalnya \`UAT-SCN-001\`.
- Tujuan bisnis.
- Role atau aktor.
- Kondisi awal.
- Alur proses yang diuji.
- Requirement atau user story terkait.
- Prioritas.`),
      section("test-case", "Test Case", `Setiap test case memiliki:

- Test Case ID, misalnya \`UAT-TC-001\`.
- Scenario ID.
- Requirement ID atau User Story ID.
- Nama dan tujuan test.
- Role penguji.
- Precondition dan data uji.
- Langkah pengujian.
- Expected Result dan Actual Result.
- Status: Not Run, Pass, Fail, Blocked.
- Bukti pengujian.
- Tanggal dan nama penguji.`),
      section("data-uji", "Data Uji", "Jelaskan data yang diperlukan, sumber data, cara menyiapkan data, variasi kondisi, dan cara membersihkan data setelah pengujian. Gunakan data sintetis atau data yang telah disamarkan bila memungkinkan."),
      section("kriteria-penerimaan", "Kriteria Penerimaan", `Tetapkan kriteria sebelum pengujian, misalnya:

- Skenario bisnis kritis berhasil.
- Tidak ada defect kritis yang terbuka.
- Defect yang tersisa memiliki keputusan dan rencana penanganan.
- Hasil pengujian memiliki bukti yang memadai.
- Pemilik proses menyetujui hasil.

Ambang batas numerik harus disepakati oleh stakeholder, bukan diasumsikan oleh penguji.`),
      section("defect-log", "Defect dan Issue Log", `Untuk setiap temuan, catat:

- Defect ID dan ringkasan.
- Langkah reproduksi.
- Expected Result dan Actual Result.
- Severity dan Priority.
- Bukti dan environment.
- Status dan PIC.
- Target perbaikan.
- Hasil retest.`),
      section("retest", "Retesting dan Regression", "Catat test case yang dijalankan ulang setelah perbaikan, hasilnya, serta pengujian regresi pada area yang berpotensi terdampak."),
      section("hasil-uat", "Ringkasan Hasil UAT", `Laporkan:

- Jumlah test case.
- Jumlah Pass, Fail, Blocked, dan Not Run.
- Defect berdasarkan severity.
- Risiko yang masih terbuka.
- Rekomendasi hasil UAT.`),
      section("keputusan", "Keputusan UAT", `Nyatakan keputusan:

- Accepted.
- Accepted with Conditions.
- Rejected.

Sertakan alasan, syarat yang harus dipenuhi, risiko yang diterima, dan tindak lanjut.`),
      section("sign-off", "Sign-off", "Cantumkan nama, jabatan atau peran, keputusan, tanggal, dan persetujuan pemilik proses atau stakeholder yang berwenang."),
    ],
    outcome: "Hasil UAT adalah catatan pengujian yang dapat ditelusuri, daftar defect, ringkasan hasil, keputusan penerimaan, serta persetujuan stakeholder bisnis.",
    checklist: [
      "Scope dan tujuan UAT disepakati.",
      "Environment dan build dicatat.",
      "Peserta dan tanggung jawab jelas.",
      "Prasyarat dan data uji tersedia.",
      "Skenario serta test case memiliki ID.",
      "Expected Result didefinisikan.",
      "Actual Result dan bukti dicatat.",
      "Defect, retest, dan regression terdokumentasi.",
      "Kriteria penerimaan disepakati.",
      "Keputusan dan sign-off tersedia.",
    ],
  },
];

export const relationshipRows: { id: DocumentId; question: string; reference: string }[] = [
  { id: "brd", question: "Mengapa perubahan dibutuhkan dan hasil bisnis apa yang diharapkan?", reference: "PRD dan validasi tujuan bisnis" },
  { id: "prd", question: "Produk dan kemampuan apa yang dibutuhkan pengguna?", reference: "SRS, desain UI/UX, dan prioritas produk" },
  { id: "srs", question: "Bagaimana perilaku dan batasan perangkat lunak harus didefinisikan?", reference: "Implementasi, integrasi, dan pengujian" },
  { id: "erd", question: "Bagaimana data disimpan dan saling berhubungan?", reference: "Implementasi database dan akses data" },
  { id: "uat", question: "Apakah solusi memenuhi kebutuhan dan dapat diterima pengguna?", reference: "Keputusan penerimaan dan rilis" },
];

export const workflow = [
  "Gali kebutuhan dan proses bisnis.",
  "Susun serta validasi BRD.",
  "Terjemahkan kebutuhan menjadi fitur dan alur produk di PRD.",
  "Detailkan perilaku sistem dalam SRS.",
  "Rancang ERD dan dokumentasi database berdasarkan kebutuhan data.",
  "Lakukan desain, development, dan pengujian internal.",
  "Siapkan skenario dan test case UAT dari requirement yang telah disetujui.",
  "Jalankan UAT bersama pengguna.",
  "Perbaiki temuan, lakukan retest, dan dokumentasikan keputusan penerimaan.",
];

export const workflowNote = "ERD dapat dikerjakan bersamaan dengan pendetailan SRS. Keduanya saling memengaruhi dan dapat mengalami revisi selama desain teknis.";

export const supportingDocuments = [
  ["Software Architecture Document (SAD)", "Arsitektur aplikasi, komponen, deployment, dan keputusan desain"],
  ["UI/UX Specification", "Wireframe, desain layar, navigasi, dan perilaku komponen"],
  ["API Documentation", "Detail endpoint, request, response, autentikasi, dan error"],
  ["Test Strategy", "Pendekatan, level, jenis, dan cakupan testing"],
  ["Test Plan", "Jadwal, sumber daya, environment, risiko, dan pelaksanaan testing"],
  ["Test Case / Test Suite", "Langkah pengujian, data, dan hasil yang diharapkan"],
  ["Deployment Guide", "Prosedur rilis, konfigurasi, migrasi, dan rollback"],
  ["User Manual", "Panduan pengguna menjalankan fungsi sistem"],
  ["SOP", "Prosedur operasional dan tanggung jawab pengguna"],
  ["Maintenance Guide", "Monitoring, backup, pemeliharaan, dan penanganan insiden"],
  ["Change Log", "Riwayat perubahan dokumen dan keputusan"],
];

export const standards = [
  section("identitas", "Identitas dan Versi", "Setiap dokumen sebaiknya memiliki kode dokumen, nama dokumen, versi, status, tanggal perubahan, penulis, reviewer, dan approver."),
  section("status", "Status Dokumen", `Gunakan status yang konsisten:

- Draft.
- In Review.
- Approved.
- Superseded.
- Archived.`),
  section("penomoran", "Penomoran Requirement", `Gunakan ID unik dan konsisten, misalnya:

- \`BR-001\`: Business Requirement.
- \`BRL-001\`: Business Rule.
- \`FEAT-001\`: Feature.
- \`US-001\`: User Story.
- \`FR-001\`: Functional Requirement.
- \`NFR-001\`: Non-Functional Requirement.
- \`UAT-SCN-001\`: UAT Scenario.
- \`UAT-TC-001\`: UAT Test Case.
- \`BUG-001\`: Defect atau bug.

Jangan menggunakan ulang ID yang sudah pernah diterbitkan. Jika requirement diubah, pertahankan ID selama identitas kebutuhannya tetap sama dan catat revisinya.`),
  section("traceability", "Traceability", `Pastikan kebutuhan dapat ditelusuri dari awal sampai akhir.

Contoh hubungan:

- \`BR-001\` diturunkan menjadi \`FEAT-001\`.
- \`FEAT-001\` memiliki \`US-001\`.
- \`US-001\` dijabarkan menjadi \`FR-001\`.
- \`FR-001\` didukung oleh tabel dan relasi pada ERD.
- \`FR-001\` diverifikasi melalui \`UAT-TC-001\`.

Tidak semua requirement harus berhubungan dengan tabel database tertentu. Hubungan hanya dibuat jika memang relevan.`),
  section("kualitas", "Prinsip Kualitas Dokumen", `Dokumentasi yang baik harus:

- Jelas dan tidak multitafsir.
- Konsisten antar-dokumen.
- Memiliki sumber kebutuhan yang dapat ditelusuri.
- Dapat ditinjau dan disetujui.
- Dapat diuji atau diverifikasi sesuai jenis dokumennya.
- Mencatat asumsi, keputusan, dan hal yang belum diputuskan.
- Diperbarui ketika kebutuhan atau desain berubah.
- Tidak memuat kredensial, password, token, atau data pribadi yang tidak diperlukan.`),
];

export const conclusion = `BRD, PRD, SRS, ERD, dan UAT membentuk rangkaian dokumentasi yang menghubungkan kebutuhan bisnis, kebutuhan produk, spesifikasi perangkat lunak, desain data, dan penerimaan pengguna.

Dokumen tidak harus panjang. Kelengkapan dan ketepatan isinya lebih penting daripada jumlah halaman. Sesuaikan kedalaman setiap bagian dengan risiko, kompleksitas, skala, dan kebutuhan sistem.`;

export const checklistTotal = documents.reduce((total, doc) => total + doc.checklist.length, 0);