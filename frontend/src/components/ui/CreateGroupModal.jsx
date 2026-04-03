import React from 'react';

const CreateGroupModal = ({ isOpen, onClose }) => {
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
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/60 bg-surface-container-lowest">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-headline leading-tight">Buat Grup Baru</h2>
            <p className="text-xs text-slate-500 font-body mt-1">Gabungkan pengeluaran untuk perjalanan, kosan, dll.</p>
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
          
          {/* Nam Grup */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 font-headline">Nama Grup</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">edit</span>
              <input 
                type="text" 
                placeholder="Misal: Trip Lombok 2026"
                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-slate-800 dark:text-slate-100 font-medium placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm"
              />
            </div>
          </div>

          {/* Kategori Grup */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 font-headline">Kategori</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-primary bg-primary/5 text-primary transition-all gap-1">
                <span className="material-symbols-outlined">flight</span>
                <span className="text-[10px] font-bold font-body">Trip</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300 transition-all gap-1">
                <span className="material-symbols-outlined">home</span>
                <span className="text-[10px] font-bold font-body">Kosan</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300 transition-all gap-1">
                <span className="material-symbols-outlined">favorite</span>
                <span className="text-[10px] font-bold font-body">Couple</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300 transition-all gap-1">
                <span className="material-symbols-outlined">category</span>
                <span className="text-[10px] font-bold font-body">Lainnya</span>
              </button>
            </div>
          </div>
          
          {/* Tambah Anggota */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 font-headline">Anggota</label>
            <div className="relative mb-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">person_add</span>
              <input 
                type="text" 
                placeholder="Ketik email atau nama teman..."
                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-24 text-slate-800 dark:text-slate-100 font-medium placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-primary text-white px-3 py-1.5 rounded-lg active:scale-95 transition-transform font-body">
                Undang
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-full filter hover:brightness-95">
                <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">A</div>
                <span className="text-xs font-medium font-body text-on-surface">Alex (Kamu)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 md:px-8 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800/60 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 px-4 rounded-xl font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors font-body text-sm"
          >
            Batal
          </button>
          <button 
            className="flex-[2] py-3.5 px-4 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all font-body text-sm flex items-center justify-center gap-2"
          >
            Selesai Buat <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
