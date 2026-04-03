import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl transition-all duration-300">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-indigo-900 tracking-tight font-headline">
          SplitMate
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <a className="text-indigo-700 font-semibold border-b-2 border-indigo-600 transition-all font-body" href="#fitur">
            Fitur
          </a>
          <a className="text-slate-600 hover:text-indigo-600 transition-colors font-body" href="#tentang-kami">
            Tentang Kami
          </a>
        </div>
        <Link
          to="/register"
          className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-semibold hover:opacity-80 active:scale-95 transition-all duration-200"
        >
          Mulai Gratis
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
