import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-3xl bg-primary-container/20 flex items-center justify-center text-primary mx-auto mb-8">
          <span className="material-symbols-outlined text-5xl">explore_off</span>
        </div>
        <h1 className="text-6xl font-black text-primary mb-4 font-headline">404</h1>
        <h2 className="text-2xl font-bold text-on-surface mb-3 font-headline">Halaman Tidak Ditemukan</h2>
        <p className="text-on-surface-variant mb-8 font-body">Sepertinya halaman yang kamu cari sudah tidak ada atau URL-nya salah.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-primary text-on-primary rounded-full font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 font-body"
          >
            Ke Beranda
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-3 border-2 border-primary/20 text-primary rounded-full font-bold hover:bg-primary/5 active:scale-95 transition-all font-body"
          >
            Ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
