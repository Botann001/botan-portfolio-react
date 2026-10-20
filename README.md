# Botan® — Portfolio (React)

Portfolio satu halaman bergaya React Bits, mirip referensi video: loader hitung persen, hero **Text Pressure**, kartu ID **Lanyard 3D** yang bisa ditarik, teks **Decrypted**, panel **Magnet Lines**, dan galeri proyek **Infinite Menu** (bola menu yang bisa di-drag).

## Isi paket

- `botan-portfolio-react.zip` — source code lengkap (buat diedit / dikembangkan lagi)
- `botan-portfolio-dist.zip` — hasil build final (buat langsung deploy, tanpa install apa pun)

## Cara menjalankan (mode edit)

Butuh Node.js 18+.

```bash
npm install
npm run dev        # buka URL yang muncul (biasanya http://localhost:5173)
```

## Cara build & deploy

```bash
npm run build      # hasil final ada di folder dist/
```

Upload **isi folder `dist/`** ke hosting statis apa pun: VPS (nginx), GitHub Pages, Netlify, Vercel — semua bisa, karena hasil akhirnya cuma HTML/CSS/JS statis.

## Cara mengganti konten

| Mau ganti | Di mana |
|---|---|
| Daftar proyek (judul, deskripsi, link, gambar) | `src/App.jsx` — array `PROJECTS` |
| Teks hero, about, kontak | `src/App.jsx` |
| Desain kartu lanyard (depan/belakang) | `public/card-front.png`, `public/card-back.png` |
| Pola tali lanyard | `public/strap.png` |
| Gambar sampul proyek | `public/covers/*.png` |
| Warna tema (emas, background, tinta) | `src/index.css` — variabel di `:root` |
| Judul besar hero | `src/App.jsx` — komponen `TextPressure` (`text="BOTAN"`) |

## Teknologi

React 18 + Vite, Three.js (Lanyard & Infinite Menu ditulis murni dengan Three.js/WebGL), Motion (animasi Decrypted Text). Komponen Text Pressure, Decrypted Text, Magnet Lines, Lanyard, dan Infinite Menu diadaptasi dari [React Bits](https://github.com/DavidHDev/react-bits) (open source).

## Catatan

- Kartu lanyard bisa **ditarik & diayun** pakai mouse — coba di hero.
- Infinite Menu di bagian Works bisa di-drag memutar; klik kartu yang di tengah buat membuka link proyek.
- Jam di pojok kanan atas adalah jam live WITA (Asia/Makassar).
