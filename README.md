# SplitMate 💸

SplitMate adalah aplikasi web fintech modern yang dirancang khusus untuk generasi muda (Gen Z) guna mengelola patungan, utang piutang antar teman, dan pengeluaran bersama secara lebih terstruktur, transparan, dan cerdas menggunakan kecerdasan buatan (AI).

---

## 📝 Deskripsi Singkat Proyek

SplitMate membantu memecahkan masalah pembagian tagihan dan pencatatan utang kelompok secara otomatis. Dilengkapi dengan fitur-fitur pintar, aplikasi ini memanfaatkan Machine Learning untuk:
1. **Klasifikasi Transaksi Otomatis**: Mengelompokkan catatan transaksi ke dalam kategori pengeluaran yang relevan secara otomatis berdasarkan catatan deskripsi teks dan detail numerik.
2. **Prediksi Pengeluaran Bulanan**: Memprediksi jumlah pengeluaran di masa depan berdasarkan tren pengeluaran historis pengguna.

### Tech Stack yang Digunakan:
- **Frontend**: React (Vite) + TailwindCSS
- **Backend**: FastAPI (Python 3.12)
- **Database**: PostgreSQL (Supabase)
- **AI/ML Model**: TensorFlow / Keras (Focal Loss, Attention, LSTM/GRU)

### 👥 Tim Pengembang (CC26-PSU310):
| Nama | Role |
|------|------|
| Syamsa Al Hadi | Full-Stack Web Developer (Frontend Lead) |
| Putra Indika Malik Hakim | Full-Stack Web Developer (Backend Lead) |
| Angelika Revalina Rismawati | Data Scientist (Data Wrangling & EDA) |
| Azza Kamila Al Haq | AI Engineer (Model Klasifikasi) |
| Mamluatul 'Azazah | AI Engineer (Model Prediksi) |

---

## 🛠️ Petunjuk Setup Environment

Ikuti langkah-langkah di bawah ini untuk menyiapkan lingkungan kerja di komputer lokal Anda.

### Prasyarat
Sebelum memulai, pastikan perangkat Anda telah terinstall:
- **Python 3.12** (Direkomendasikan untuk stabilitas model AI)
- **Node.js 18+** & **npm**

---

### 1. Setup Backend (FastAPI)

1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```

2. Buat Virtual Environment (venv):
   ```bash
   python -m venv venv
   ```

3. Aktifkan Virtual Environment:
   - **Mac/Linux**:
     ```bash
     source venv/bin/activate
     ```
   - **Windows**:
     ```bash
     venv\Scripts\activate
     ```

4. Install dependensi backend:
   ```bash
   pip install -r requirements.txt
   ```
   *(Atau secara terpisah `pip install -r requirements-core.txt` lalu `pip install -r requirements-ai.txt`)*

5. Konfigurasi Environment Variables (`.env`):
   Buat file `.env` di dalam folder `backend/` dengan menyalin template dari `.env.example` dan isi konfigurasinya:
   ```env
   SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
   JWT_SECRET_KEY=your_jwt_secret_key
   JWT_ALGORITHM=HS256
   JWT_EXPIRE_MINUTES=1440
   COOKIE_SECURE=False
   ```

---

### 2. Setup Frontend (React)

1. Masuk ke direktori frontend:
   ```bash
   cd frontend
   ```

2. Install dependensi Node.js:
   ```bash
   npm install
   ```

3. Konfigurasi Environment Variables (`.env`):
   Buat file `.env` di dalam folder `frontend/` dengan isi:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

---

## 🧠 Tautan Model ML (Jika Ada)

Proyek ini menggunakan model Machine Learning berbasis TensorFlow/Keras untuk mendukung fitur AI Insight (Klasifikasi & Prediksi).

### Tautan Unduhan Model (Google Drive)
Unduh folder artefak model melalui tautan berikut:
👉 [**Google Drive Model SplitMate**](https://drive.google.com/drive/folders/1UopXwzkox80d9gbCFwS2KCM0uQLuS6pz?usp=sharing)

### Cara Memuat (Load) Model ML
Setelah mengunduh file dari Google Drive di atas, tempatkan seluruh file model dan konfigurasi sesuai struktur berikut:

1. **Model Klasifikasi Transaksi**:
   Tempatkan di direktori `backend/app/ai/classifier_artifacts/`:
   - `best_model.keras`
   - `cat_columns.pkl`
   - `label_encoder.pkl`
   - `model_config.json`
   - `scaler.pkl`
   - `tokenizer.pkl`

2. **Model Prediksi Pengeluaran**:
   Tempatkan di direktori `backend/app/ai/predictor_artifacts/`:
   - `expense_predictor.keras`
   - `scalers.pkl`
   - `model_config.json`
   - `saved_model.pb` (jika ada)
   - `variables/` (jika ada)

Model-model tersebut akan otomatis dimuat oleh backend FastAPI saat aplikasi dijalankan melalui pustaka `tensorflow.keras.models.load_model` yang dikonfigurasi pada file service di backend.

---

## 🚀 Cara Menjalankan Aplikasi

Untuk menjalankan aplikasi lengkap (Frontend & Backend), Anda perlu membuka **dua terminal terpisah**.

### Terminal 1: Menjalankan Backend (FastAPI)
```bash
cd backend
source venv/bin/activate  # (atau venv\Scripts\activate untuk Windows)
uvicorn app.main:app --reload
```
Backend akan berjalan di: [http://localhost:8000](http://localhost:8000)
- Swagger UI (Dokumentasi API interaktif): [http://localhost:8000/docs](http://localhost:8000/docs)
- Health Check: [http://localhost:8000/health](http://localhost:8000/health)

### Terminal 2: Menjalankan Frontend (React + Vite)
```bash
cd frontend
npm run dev
```
Frontend akan berjalan di: [http://localhost:5173](http://localhost:5173)

Buka [http://localhost:5173](http://localhost:5173) di browser Anda untuk mulai menggunakan aplikasi SplitMate.