# 🛠️ Modular Admin Panel - FakeStore API

Admin panel modular yang dibangun menggunakan **Next.js App Router**, **Tailwind CSS**, dan **FakeStoreAPI**. Proyek ini menerapkan prinsip **Clean Architecture** untuk menjaga struktur kode tetap rapi, scalable, dan maintainable.

## ✨ Fitur Utama

- 🔐 **Login Page**
  - Login menggunakan email/password hardcoded
  - Simpan token/flag auth di Zustand atau Context API

- 📊 **Dashboard Produk**
  - Menampilkan statistik dan daftar produk dari FakeStoreAPI
  - Dilengkapi dengan pagination

- 🛍️ **Manajemen Produk (CRUD)**
  - Create, Read, Update, Delete produk
  - Validasi dengan react-hook-form + zod

- 👥 **Role-based Access Control**
  - Halaman terbatas hanya untuk user admin

- 🔎 **Search & Pagination**
  - Fitur pencarian dan navigasi halaman produk

- 💅 **UI Modern**
  - Dibuat dengan Tailwind CSS dan Headless UI
  - Responsive dan clean design

- 🛑 **Error Handling**
  - Penanganan error baik di client maupun server

## 🧱 Struktur Proyek (Clean Architecture)

```
src/
├── app/                   # Struktur App Router dari Next.js
├── features/             # Modul fitur (product, auth)
│   └── product/
│       ├── components/   # Komponen UI terkait produk
│       ├── pages/        # Halaman produk
│       ├── services/     # Logika API call
│       └── hooks/        # Custom hooks
├── entities/             # Model domain & tipe data
├── infrastructure/       # Antarmuka ke API eksternal (FakeStore)
├── shared/               # Komponen bersama, utils, konfigurasi
└── store/                # Global state (Zustand / Context API)
```

## 🚀 Cara Menjalankan

1. **Clone repositori**

```bash
git clone https://github.com/username/modular-admin-panel.git
cd modular-admin-panel
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
```

3. **Jalankan aplikasi**

```bash
npm run dev
# atau
yarn dev
```

4. **Akses di browser**

```
http://localhost:3000
```

## 🔐 Login Credentials (Hardcoded)

```txt
Email: admin@example.com
Password: admin123
```

## 🔗 API Publik

Proyek ini menggunakan [FakeStoreAPI](https://fakestoreapi.com) sebagai data source utama untuk produk.

## 📦 Dependencies Utama

- Next.js 14+ (App Router)
- Tailwind CSS
- Headless UI
- React Hook Form + Zod
- Zustand / Context API
- Lucide Icons

## ❤️ Kontribusi

Pull request dan issue sangat diterima untuk pengembangan proyek lebih lanjut.

---

© 2025 - Dibuat dengan semangat Clean Code ✨