import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
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
            <h1 className="text-3xl font-extrabold tracking-tight text-primary font-headline">SplitMate</h1>
            <p className="text-on-surface-variant mt-2 text-sm font-body">Kelola pengeluaran bersama dengan presisi.</p>
          </div>

          {/* Login Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 md:p-10 shadow-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-on-surface font-headline mb-2">Masuk</h2>
              <p className="text-on-surface-variant text-sm font-body">Selamat datang kembali! Silakan masuk ke akun Anda.</p>
            </div>

            <form className="space-y-6">
              {/* Input Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-on-surface block px-1 font-body" htmlFor="email">Email</label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-surface-container-high border-none rounded-xl py-3 px-4 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none font-body"
                    placeholder="contoh@email.com"
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-medium text-on-surface font-body" htmlFor="password">Kata Sandi</label>
                  <a href="#" className="text-xs font-semibold text-primary hover:underline decoration-2 underline-offset-4 font-body">Lupa Password?</a>
                </div>
                <div className="relative group">
                  <input
                    type="password"
                    id="password"
                    className="w-full bg-surface-container-high border-none rounded-xl py-3 px-4 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none font-body"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Primary Action */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-4 rounded-full shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-body"
                >
                  <span>Masuk</span>
                  <span className="material-symbols-outlined text-lg">login</span>
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
