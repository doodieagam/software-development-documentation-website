# Dokum — Panduan Dokumentasi Pengembangan Software

Dokum adalah website dokumentasi berbahasa Indonesia yang menjadi panduan untuk memahami dan menyusun lima dokumen utama dalam pengembangan software:

- **BRD** — Business Requirements Document
- **PRD** — Product Requirements Document
- **SRS** — Software Requirements Specification
- **ERD** — Entity Relationship Diagram dan dokumentasi database
- **UAT** — User Acceptance Testing

Website ini juga menyediakan ikhtisar hubungan antar-dokumen, daftar dokumen pendukung, standar pengelolaan dokumentasi, serta checklist kelengkapan.

## Fitur

- Navigasi untuk ikhtisar, BRD, PRD, SRS, ERD, UAT, dan checklist.
- Pencarian isi dokumentasi.
- Pintasan pencarian: `Ctrl + K` atau `Cmd + K`; tombol `/` juga dapat digunakan saat tidak sedang mengetik di kolom input.
- Daftar isi pada halaman untuk berpindah ke bagian tertentu.
- Checklist interaktif untuk memantau kelengkapan setiap dokumen.
- Status checklist disimpan di `localStorage` browser.
- Mode terang dan gelap; preferensi tema disimpan di `localStorage`.
- Navigasi responsif untuk layar desktop dan perangkat mobile.
- Dukungan navigasi berbasis URL hash, sehingga halaman/bagian dapat ditautkan.

## Teknologi

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- Lucide React
- React Markdown
- `vite-plugin-singlefile` untuk menghasilkan build satu file HTML

## Persyaratan

Pastikan sudah memasang:

- Node.js **20.19+** atau **22.12+**
- npm

Periksa versi yang terpasang:

```bash
node --version
npm --version
```

## Menjalankan secara lokal

1. Ekstrak atau clone repository.
2. Buka terminal di direktori proyek.
3. Pasang dependencies:

   ```bash
   npm install
   ```

4. Jalankan development server:

   ```bash
   npm run dev
   ```

5. Buka alamat lokal yang ditampilkan Vite di terminal (biasanya `http://localhost:5173`).

Development server mendukung hot reload saat file sumber diubah.

## Perintah yang tersedia

| Perintah | Kegunaan |
|---|---|
| `npm install` | Memasang dependencies |
| `npm run dev` | Menjalankan development server |
| `npm run build` | Membuat build production |
| `npm run preview` | Menjalankan preview dari hasil build |

Buat build production:

```bash
npm run build
```

Hasil build berada di direktori `dist/`. Untuk melihat hasil build secara lokal:

```bash
npm run preview
```

## Struktur proyek

```text
.
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── dokum.svg
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── navigation.tsx
    ├── components/
    │   ├── Blueprint.tsx
    │   ├── GuideContent.tsx
    │   └── SearchDialog.tsx
    ├── data/
    │   └── guide.ts
    └── utils/
        └── cn.ts
```

### Lokasi pengelolaan konten

Konten utama panduan berada di:

```text
src/data/guide.ts
```

File tersebut memuat struktur dan isi BRD, PRD, SRS, ERD, UAT, checklist, alur hubungan dokumen, daftar dokumen pendukung, standar dokumentasi, dan kesimpulan.

Komponen tampilan utama berada di:

- `src/components/GuideContent.tsx` — tampilan ikhtisar, halaman dokumen, dan checklist.
- `src/components/SearchDialog.tsx` — dialog pencarian.
- `src/components/Blueprint.tsx` — ilustrasi visual pada halaman.
- `src/App.tsx` — kerangka aplikasi, navigasi, tema, dan penyimpanan checklist.

## Mengubah konten dokumentasi

Untuk memperbarui isi panduan:

1. Buka `src/data/guide.ts`.
2. Temukan data dokumen yang ingin diubah (`brd`, `prd`, `srs`, `erd`, atau `uat`).
3. Edit judul, ringkasan, tujuan, peserta, struktur bagian, hasil akhir, atau checklist sesuai kebutuhan.
4. Simpan file. Jika development server aktif, perubahan akan dimuat ulang oleh Vite.

Jaga agar ID bagian tetap unik dalam satu halaman karena ID tersebut digunakan untuk navigasi dan daftar isi.

## Checklist dan penyimpanan browser

Progress checklist serta pilihan tema disimpan secara lokal di browser melalui `localStorage`. Artinya:

- Data tersimpan pada browser dan perangkat yang digunakan.
- Data tidak otomatis tersinkronisasi antarperangkat atau antar-browser.
- Menghapus data situs/browser dapat menghapus progress checklist dan preferensi tema.
- Website tidak memerlukan akun atau backend untuk fitur-fitur tersebut.

## Build dan deployment

Jalankan:

```bash
npm install
npm run build
```

Deploy isi direktori `dist/` ke layanan hosting statis yang mendukung website HTML, misalnya GitHub Pages, Netlify, Vercel, atau hosting statis lainnya.

Konfigurasi Vite saat ini menggunakan `vite-plugin-singlefile`, sehingga build ditujukan untuk menghasilkan halaman HTML dengan aset yang digabungkan ke dalam file tersebut. Periksa hasil build di `dist/` sebelum deployment.

Jika aplikasi dipasang pada subpath (bukan root domain), periksa konfigurasi `base` pada `vite.config.ts` dan uji URL hasil deployment. Navigasi internal aplikasi menggunakan URL hash, misalnya `#/brd` atau `#/uat/checklist`.

## Catatan pengembangan

- Konten panduan saat ini bersifat statis dan dikelola melalui file TypeScript; belum menggunakan CMS atau database.
- Checklist dan tema disimpan di browser pengguna.
- Tidak terdapat script `test` yang didefinisikan pada `package.json`.
- Sebelum publikasi, jalankan `npm run build` dan tinjau tampilan serta navigasi pada desktop dan mobile.

## Lisensi

Belum ada lisensi yang ditentukan di dalam proyek ini. Tambahkan file `LICENSE` jika proyek akan dibagikan atau digunakan oleh pihak lain dengan ketentuan lisensi tertentu.
