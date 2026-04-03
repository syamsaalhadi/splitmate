import React from 'react';

const NewExpenseModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/60">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-headline">Tambah Beban Baru</h2>
            <p className="text-xs text-slate-500 font-body mt-1">Catat pengeluaran baru untuk dibagi bersama teman Anda.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-headline">Total Biaya</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium font-body pr-2">Rp</span>
              <input 
                type="text" 
                placeholder="0"
                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-800 dark:text-slate-100 font-bold placeholder-slate-300 dark:placeholder-slate-700 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-xl"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-headline">Deskripsi Pengeluaran</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">description</span>
              <input 
                type="text" 
                placeholder="Contoh: Makan siang bareng di cafe..."
                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm"
              />
            </div>
          </div>

          {/* Configuration (Paid By & Split) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-headline">Dibayar Oleh</label>
              <button className="w-full flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] shadow-sm transition-all text-left">
                <span className="flex items-center gap-3 font-body font-medium">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold leading-none">A</span>
                  Anda
                </span>
                <span className="material-symbols-outlined text-slate-400 text-lg">expand_more</span>
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-headline">Cara Bagi</label>
              <button className="w-full flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] shadow-sm transition-all text-left">
                <span className="flex items-center gap-3 font-body font-medium">
                  <span className="material-symbols-outlined text-lg text-primary">call_split</span>
                  Sama Rata
                </span>
                <span className="material-symbols-outlined text-slate-400 text-lg">expand_more</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 md:px-8 md:py-6 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800/60 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 px-4 rounded-xl font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors font-body text-sm"
          >
            Batal
          </button>
          <button 
            className="flex-[2] py-3.5 px-4 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all font-body text-sm flex items-center justify-center gap-2"
          >
            Simpan Pengeluaran <span className="material-symbols-outlined text-lg">check_circle</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewExpenseModal;
