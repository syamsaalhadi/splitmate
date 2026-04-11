import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-4 transition-all duration-500">
      <div
        className={`flex items-center justify-between w-full max-w-4xl px-3 py-2.5 rounded-full border transition-all duration-500 ${
          scrolled
            ? 'bg-white/50 backdrop-blur-xl shadow-lg shadow-black/5 border-white/40'
            : 'bg-white/30 backdrop-blur-lg shadow-md shadow-black/5 border-white/20'
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-on-primary hover:opacity-90 transition-all duration-300 shrink-0"
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            account_balance_wallet
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#fitur"
            className="px-5 py-2 text-sm font-semibold text-on-surface/70 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300 font-body"
          >
            Fitur
          </a>
          <a
            href="#tentang-kami"
            className="px-5 py-2 text-sm font-semibold text-on-surface/70 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300 font-body"
          >
            Tentang Kami
          </a>
        </div>

        {/* CTA Button */}
        <Link
          to="/register"
          className="px-6 py-2.5 rounded-full bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all duration-300 active:scale-95 shrink-0 font-body"
        >
          Mulai Gratis
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
