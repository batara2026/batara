# 🏕️ Rihlah Akbar Jilid 2 - Binjai Mengaji

> **Website Statis Landing Page** untuk event Rihlah Akbar Jilid 2 (1447H / 2026M)
> oleh Binjai Mengaji & LDA Al Madinah.

---

## 📁 Struktur Folder Proyek

```
rihlah/
│
├── index.html              ← Halaman utama (single-page)
├── README.md               ← Dokumentasi proyek (file ini)
│
├── css/
│   └── style.css           ← Stylesheet utama (design system)
│
├── js/
│   └── main.js             ← JavaScript utama (lightbox, form WA, animasi)
│
└── img/
    ├── logo.png            ← Logo Binjai Mengaji (navbar)
    ├── favicon.png         ← Favicon browser tab
    ├── hero-bg.jpg         ← Background gambar hero section
    ├── about.jpg           ← Gambar section "Tentang"
    ├── quote-bg.jpg        ← Background section kutipan ayat
    │
    └── gallery/
        ├── gallery-1.jpg   ← Galeri: Area Tenda
        ├── gallery-2.jpg   ← Galeri: Suasana Camping Malam
        ├── gallery-3.jpg   ← Galeri: Fasilitas Luar
        ├── gallery-4.jpg   ← Galeri: Pemandangan Pagi
        ├── gallery-5.jpg   ← Galeri: Pegunungan Langkat
        └── gallery-6.jpg   ← Galeri: Kegiatan Bersama
```

---

## 🛠️ Teknologi yang Digunakan

| Komponen       | Teknologi                          | Versi   |
| -------------- | ---------------------------------- | ------- |
| Framework CSS  | Bootstrap                          | 5.3.2   |
| Ikon           | Font Awesome                       | 5.15.4  |
| Font           | Google Fonts (Inter + Amiri)       | -       |
| Reaktivitas    | Alpine.js                          | 3.x     |
| JavaScript     | Vanilla JS (tanpa jQuery)          | ES6+    |

---

## 🚀 Cara Menjalankan

1. **Tanpa Server** — Buka `index.html` langsung di browser.
2. **Dengan Live Server** — Gunakan ekstensi VS Code "Live Server" atau:
   ```bash
   npx serve .
   ```

---

## 🖼️ Panduan Aset Gambar

Semua gambar direferensikan dari folder `img/`. Untuk menampilkan konten visual:

1. Siapkan gambar-gambar berikut (format `.jpg` atau `.png`):
   - `img/logo.png` — Logo organisasi (tinggi ideal: 36px)
   - `img/favicon.png` — Ikon tab browser (32x32px atau 64x64px)
   - `img/hero-bg.jpg` — Latar belakang hero (lebar min: 1920px)
   - `img/about.jpg` — Foto section tentang (lebar min: 800px)
   - `img/quote-bg.jpg` — Latar belakang ayat (lebar min: 1200px)
   - `img/gallery/gallery-1.jpg` s/d `gallery-6.jpg` — Foto galeri (lebar min: 600px)

2. Letakkan di folder sesuai struktur di atas.

> **Catatan:** Jika gambar lokal belum tersedia, website tetap berfungsi — hanya area gambar yang kosong.

---

## 📋 Fitur Utama

- ✅ **Formulir Pendaftaran → WhatsApp** — Data form otomatis dikirim ke admin via API WA
- ✅ **Kalkulator Biaya Real-time** — Alpine.js menghitung total paket + add-on
- ✅ **Tab Jadwal 2 Hari** — Bootstrap pills dengan efek fade
- ✅ **Galeri Lightbox** — Klik gambar untuk preview full-screen
- ✅ **Scroll Animations** — Intersection Observer untuk efek reveal
- ✅ **Responsif** — Optimal di mobile, tablet, dan desktop
- ✅ **SEO Ready** — Meta tags, Open Graph, semantic HTML

---

## 📞 Kontak Admin

- **WhatsApp:** 0813-7589-9408 (Akhi Dhana)
- **Email:** binjaimengaji@gmail.com

---

&copy; 2026 Binjai Mengaji. All Rights Reserved.
