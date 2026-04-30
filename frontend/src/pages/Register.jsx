import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ fullname: '', email: '', password: '', confirm_password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.fullname.trim()) newErrors.fullname = 'Nama lengkap wajib diisi';
    if (!form.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!form.password) {
      newErrors.password = 'Kata sandi wajib diisi';
    } else if (form.password.length < 8) {
      newErrors.password = 'Minimal 8 karakter';
    }
    if (!form.confirm_password) {
      newErrors.confirm_password = 'Konfirmasi kata sandi wajib diisi';
    } else if (form.password !== form.confirm_password) {
      newErrors.confirm_password = 'Kata sandi tidak cocok';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post('/auth/register', {
        name: form.fullname,
        email: form.email,
        password: form.password,
      });
      login(res.data.user);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      const msg = err.response?.data?.detail || 'Registrasi gagal, coba lagi';
      setErrors({ email: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      {/* Hero Background Texture */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-secondary/5 blur-[100px]"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Brand Identity */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-block">
              <img src="/logo.png" alt="SplitMate Logo" className="w-16 h-16 object-contain mx-auto mb-6" />
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight text-primary mb-2 font-headline">SplitMate</h1>
            <p className="text-on-surface-variant font-medium font-body">Precision Fluidity in Finance.</p>
          </div>

          {/* Registration Card */}
          <div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)]">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-3xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h2 className="text-xl font-bold text-on-surface font-headline mb-2">Akun Berhasil Dibuat!</h2>
                <p className="text-on-surface-variant text-sm font-body">Mengalihkan ke halaman login...</p>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center md:text-left">
                  <h2 className="text-xl font-bold text-on-surface font-headline mb-1">Buat Akun Baru</h2>
                  <p className="text-on-surface-variant text-sm font-body">Mulai perjalanan finansial Anda yang lebih teratur hari ini.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullname" className="text-sm font-semibold text-on-surface-variant ml-1 font-body">Nama Lengkap</label>
                    <input
                      type="text"
                      id="fullname"
                      value={form.fullname}
                      onChange={(e) => handleChange('fullname', e.target.value)}
                      className={`w-full px-5 py-4 bg-surface-container-high border rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none placeholder:text-outline font-body ${errors.fullname ? 'border-error' : 'border-transparent'}`}
                      placeholder="Masukkan nama lengkap Anda"
                    />
                    {errors.fullname && <p className="text-error text-xs font-medium ml-1 font-body">{errors.fullname}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-on-surface-variant ml-1 font-body">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full px-5 py-4 bg-surface-container-high border rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none placeholder:text-outline font-body ${errors.email ? 'border-error' : 'border-transparent'}`}
                      placeholder="contoh@email.com"
                    />
                    {errors.email && <p className="text-error text-xs font-medium ml-1 font-body">{errors.email}</p>}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-semibold text-on-surface-variant ml-1 font-body">Kata Sandi</label>
                    <input
                      type="password"
                      id="password"
                      value={form.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className={`w-full px-5 py-4 bg-surface-container-high border rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none placeholder:text-outline font-body ${errors.password ? 'border-error' : 'border-transparent'}`}
                      placeholder="••••••••"
                    />
                    {errors.password && <p className="text-error text-xs font-medium ml-1 font-body">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label htmlFor="confirm_password" className="text-sm font-semibold text-on-surface-variant ml-1 font-body">Konfirmasi Kata Sandi</label>
                    <input
                      type="password"
                      id="confirm_password"
                      value={form.confirm_password}
                      onChange={(e) => handleChange('confirm_password', e.target.value)}
                      className={`w-full px-5 py-4 bg-surface-container-high border rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none placeholder:text-outline font-body ${errors.confirm_password ? 'border-error' : 'border-transparent'}`}
                      placeholder="••••••••"
                    />
                    {errors.confirm_password && <p className="text-error text-xs font-medium ml-1 font-body">{errors.confirm_password}</p>}
                  </div>

                  {/* Primary Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all duration-200 hover:brightness-110 flex items-center justify-center gap-2 font-body disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                          <span>Memproses...</span>
                        </>
                      ) : (
                        <>
                          <span>Daftar Sekarang</span>
                          <span className="material-symbols-outlined text-xl">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Link */}
          {!success && (
            <p className="text-center mt-8 text-on-surface-variant font-medium font-body">
              Sudah punya akun?
              <Link to="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1">Masuk</Link>
            </p>
          )}
        </div>
      </main>

      {/* Footer Component */}
      <footer className="w-full py-8 px-6 text-center relative z-10">
        <p className="text-xs text-outline font-body">© 2026 SplitMate. Precision Fluidity in Finance.</p>
      </footer>

    </div>
  );
};

export default Register;
