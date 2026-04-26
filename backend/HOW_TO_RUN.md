# Cara Menjalankan Backend SplitMate

## Prasyarat
- Python 3.10+
- Virtual environment sudah dibuat

---

## Pertama Kali (One-time Setup)

```bash
# 1. Masuk ke folder backend
cd backend

# 2. Buat virtual environment
python -m venv venv

# 3. Aktifkan virtual environment (Windows)
venv\Scripts\activate

# 4. Install semua dependencies
pip install -r requirements.txt
pip install pydantic-settings
```

---

## Setiap Kali Mau Jalankan

```bash
# 1. Masuk ke folder backend
cd backend

# 2. Aktifkan virtual environment (Windows)
venv\Scripts\activate

# 3. Jalankan server
uvicorn app.main:app --reload
```

Server berjalan di **http://localhost:8000**

---

## URL Penting

| URL | Keterangan |
|-----|------------|
| http://localhost:8000 | Root — cek API running |
| http://localhost:8000/health | Health check |
| http://localhost:8000/docs | Swagger UI — testing API interaktif |
| http://localhost:8000/redoc | ReDoc — dokumentasi API alternatif |

---

## Matikan Server

Tekan `Ctrl + C` di terminal.

---

## Matikan Virtual Environment

```bash
deactivate
```
