import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email: form.email, password: form.password });
      login(res.data.user);  // cookie di-set otomatis oleh backend
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.detail || 'Email atau password salah';
      setErrors({ password: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-low min-h-screen flex flex-col">
      {/* Hero Background Texture */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-fixed/20 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-secondary-fixed/20 blur-[100px] rounded-full"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">

          {/* Brand Identity */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img src="/logo.png" alt="SplitMate Logo" className="w-16 h-16 object-contain mx-auto mb-4" />
              <h1 className="text-3xl font-extrabold tracking-tight text-primary font-headline">SplitMate</h1>
            </Link>
            <p className="text-on-surface-variant mt-2 text-sm font-body">Kelola pengeluaran bersama dengan presisi.</p>
          </div>

          {/* Login Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-10 shadow-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-on-surface font-headline mb-2">Masuk</h2>
              <p className="text-on-surface-variant text-sm font-body">Selamat datang kembali! Silakan masuk ke akun Anda.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {/* Input Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-on-surface block px-1 font-body" htmlFor="email">Email</label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                    className={`w-full bg-surface-container-high border rounded-xl py-3 px-4 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none font-body ${errors.email ? 'border-error' : 'border-transparent'}`}
                    placeholder="contoh@email.com"
                  />
                </div>
                {errors.email && <p className="text-error text-xs font-medium px-1 font-body">{errors.email}</p>}
              </div>

              {/* Input Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-medium text-on-surface font-body" htmlFor="password">Kata Sandi</label>
                  <span className="text-xs font-semibold text-primary font-body cursor-pointer hover:underline decoration-2 underline-offset-4">Lupa Password?</span>
                </div>
                <div className="relative group">
                  <input
                    type="password"
                    id="password"
                    value={form.password}
                    onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
                    className={`w-full bg-surface-container-high border rounded-xl py-3 px-4 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none font-body ${errors.password ? 'border-error' : 'border-transparent'}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-error text-xs font-medium px-1 font-body">{errors.password}</p>}
              </div>

              {/* Primary Action */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-4 rounded-full shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-body disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk</span>
                      <span className="material-symbols-outlined text-lg">login</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Redirect Link */}
            <div className="mt-8 text-center border-t border-outline-variant/20 pt-6">
              <p className="text-sm text-on-surface-variant font-body">
                Belum punya akun?
                <Link to="/register" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 ml-1">Daftar</Link>
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex justify-center items-center gap-8 opacity-40 grayscale">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">verified_user</span>
                <span className="text-xs font-medium font-body">Secure SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">lock</span>
                <span className="text-xs font-medium font-body">Privacy First</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer Component */}
      <footer className="w-full py-8 px-6 text-center relative z-10">
        <p className="text-xs text-outline font-body">© 2026 SplitMate. Precision Fluidity in Finance.</p>
      </footer>
    </div>
  );
};

export default Login;
