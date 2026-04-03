import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-container mb-6 shadow-xl shadow-primary/10">
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-primary mb-2 font-headline">SplitMate</h1>
            <p className="text-on-surface-variant font-medium font-body">Precision Fluidity in Finance.</p>
          </div>

          {/* Registration Card */}
          <div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)]">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-xl font-bold text-on-surface font-headline mb-1">Buat Akun Baru</h2>
              <p className="text-on-surface-variant text-sm font-body">Mulai perjalanan finansial Anda yang lebih teratur hari ini.</p>
            </div>

            <form className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullname" className="text-sm font-semibold text-on-surface-variant ml-1 font-body">Nama Lengkap</label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullname"
                    className="w-full px-5 py-4 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none placeholder:text-outline font-body"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-on-surface-variant ml-1 font-body">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="w-full px-5 py-4 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none placeholder:text-outline font-body"
                    placeholder="contoh@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-on-surface-variant ml-1 font-body">Kata Sandi</label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    className="w-full px-5 py-4 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none placeholder:text-outline font-body"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirm_password" className="text-sm font-semibold text-on-surface-variant ml-1 font-body">Konfirmasi Kata Sandi</label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirm_password"
                    className="w-full px-5 py-4 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none placeholder:text-outline font-body"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Primary Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all duration-200 hover:brightness-110 flex items-center justify-center gap-2 font-body"
                >
                  <span>Daftar Sekarang</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer Link */}
          <p className="text-center mt-8 text-on-surface-variant font-medium font-body">
            Sudah punya akun?
            <Link to="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1">Masuk</Link>
          </p>
        </div>
      </main>

      {/* Footer Component */}
      <footer className="w-full rounded-t-3xl bg-surface-container-low mt-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 w-full max-w-7xl mx-auto space-y-6 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="text-xl font-bold text-on-surface brand-font">SplitMate</span>
            <span className="text-on-surface-variant text-sm font-body">© 2026 SplitMate. Precision Fluidity in Finance.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-on-surface-variant text-sm font-body hover:text-primary transition-colors">Privasi</a>
            <a href="#" className="text-on-surface-variant text-sm font-body hover:text-primary transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="text-on-surface-variant text-sm font-body hover:text-primary transition-colors">Bantuan</a>
            <a href="#" className="text-on-surface-variant text-sm font-body hover:text-primary transition-colors">Karir</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;
