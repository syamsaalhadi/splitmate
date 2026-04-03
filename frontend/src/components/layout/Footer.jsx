import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full rounded-t-[3rem] bg-slate-50 dark:bg-slate-900 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 w-full max-w-7xl mx-auto">
        <div className="mb-8 md:mb-0 space-y-4 text-center md:text-left">
          <div className="text-xl font-bold text-slate-900 dark:text-white font-headline">SplitMate</div>
          <p className="text-slate-500 text-sm max-w-xs font-body">
            Precision Fluidity in Finance. Solusi modern untuk generasi baru.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
          <a className="text-slate-500 hover:text-indigo-500 transition-colors text-sm font-medium font-body" href="#">Privasi</a>
          <a className="text-slate-500 hover:text-indigo-500 transition-colors text-sm font-medium font-body" href="#">Syarat & Ketentuan</a>
          <a className="text-slate-500 hover:text-indigo-500 transition-colors text-sm font-medium font-body" href="#">Bantuan</a>
          <a className="text-slate-500 hover:text-indigo-500 transition-colors text-sm font-medium font-body" href="#">Karir</a>
        </div>
        <div className="text-slate-400 text-xs text-center md:text-right font-body">
          © 2026 SplitMate. Precision Fluidity in Finance.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
