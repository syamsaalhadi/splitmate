# SplitMate: Project Knowledge Base

Dokumen ini dirancang khusus untuk memberikan pemahaman mendalam tentang arsitektur, fitur, dan aturan bisnis SplitMate kepada agen AI atau pengembang baru.

## 1. Ringkasan Proyek
SplitMate adalah aplikasi manajemen pengeluaran bersama (bill splitting) premium yang fokus pada estetika "Rich Aesthetics" dan pengalaman pengguna yang mulus. Aplikasi ini memungkinkan pengguna untuk membuat grup, mencatat pengeluaran, membagi tagihan secara adil, dan memantau saldo hutang-piutang.

## 2. Tech Stack
### Backend
- **Framework**: FastAPI (Python)
- **ORM**: SQLAlchemy
- **Database**: PostgreSQL (Hosted via Supabase)
- **Auth**: JWT (OAuth2 Password Bearer)
- **Validation**: Pydantic v2

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS & Vanilla CSS (untuk komponen premium)
- **Routing**: React Router v7
- **HTTP Client**: Axios

## 3. Arsitektur Folder
### Backend (`/backend`)
- `app/models/`: Definisi tabel database (SQLAlchemy models).
- `app/schemas/`: Pydantic models untuk request/response validation.
- `app/services/`: Logika bisnis utama (CRUD, kalkulasi hutang, dll).
- `app/routers/`: Endpoint API yang dikelompokkan berdasarkan fitur.
- `app/main.py`: Entry point aplikasi.
- `schema.sql`: Skema database mentah (PostgreSQL).

### Frontend (`/frontend`)
- `src/pages/`: Halaman utama aplikasi (Dashboard, GroupDetail, dll).
- `src/components/ui/`: Komponen UI kustom (Modals, Toasts, Buttons).
- `src/context/`: State management global (AuthContext).
- `src/services/api.js`: Konfigurasi Axios dan interceptors.

## 4. Aturan Bisnis Penting (Business Rules)
1. **Pencatatan Pengeluaran**:
   - Pengeluaran bisa dibagi rata (**equal**) atau kustom (**custom amount**).
   - Setiap pengeluaran dicatat siapa yang membayar (`paid_by`) dan pecahannya (`splits`).
2. **Saldo (Debts)**:
   - Saldo dihitung secara optimal untuk meminimalisir jumlah transaksi pelunasan.
   - Status "Lunas" diberikan jika `amount_owed` semua member di grup tersebut adalah 0.
3. **Siklus Hidup Grup (Group Lifecycle)**:
   - **Status**: `active` (default) dan `closed`.
   - **Tutup Grup**: Hanya bisa dilakukan oleh pembuat grup (admin) dan **HANYA JIKA** semua pengeluaran di grup tersebut sudah lunas.
   - **Proteksi**: Grup yang berstatus `closed` tidak boleh menambah pengeluaran baru atau anggota baru.
   - **Hapus Grup**: Grup hanya bisa dihapus permanen jika statusnya sudah `closed`.
4. **Keamanan**:
   - Hanya anggota grup yang bisa melihat detail grup, pengeluaran, dan saldo.
   - Hanya pembuat grup yang bisa menutup atau menghapus grup.

## 5. Skema Database Utama
- `users`: Data profil dan autentikasi.
- `groups`: Informasi grup dan status siklus hidup.
- `group_members`: Relasi user ke grup (role, joined_at).
- `expenses`: Data transaksi pengeluaran.
- `expense_splits`: Detail siapa yang berhutang berapa pada pengeluaran tertentu.
- `settlements`: Catatan pembayaran/pelunasan antar user yang menunggu persetujuan.

## 6. Komponen UI Premium (Design System)
- **ConfirmModal**: Komponen konfirmasi kustom dengan glassmorphism dan animasi smooth untuk menggantikan `window.confirm`.
- **Toast**: Sistem notifikasi melayang di atas layar untuk feedback aksi (sukses/error).
- **Vibrant Badges**: Penggunaan warna HSL yang terkurasi untuk status (Lunas = Ijo, Belum Lunas = Kuning, Ditutup = Merah).

## 7. Roadmap & Future Work
- [ ] Implementasi fitur **Activity Sidebar** yang realtime.
- [ ] Penambahan fitur **Reminder** (Buzz) untuk menagih hutang secara otomatis.
- [ ] Optimasi **Insights** untuk analisis pengeluaran berbasis kategori.
- [ ] Integrasi sistem notifikasi push.

---
*Dokumen ini diperbarui terakhir pada: 2026-05-02*
