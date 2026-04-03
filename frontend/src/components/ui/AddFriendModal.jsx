import React from 'react';

const AddFriendModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/60 bg-surface-container-lowest">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">person_add</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-headline leading-tight">Tambah Teman</h2>
              <p className="text-xs text-slate-500 font-body">Undang teman untuk SplitMate</p>
            </div>
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
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 font-headline">Alamat Email / Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">alternate_email</span>
              <input 
                type="text" 
                placeholder="Misal: andi@email.com atau @andi_k"
                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-slate-800 dark:text-slate-100 font-medium placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm"
              />
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex gap-4 items-start">
            <span className="material-symbols-outlined text-primary mt-0.5">link</span>
            <div>
              <p className="text-sm font-bold font-headline mb-1">Bagikan Tautan Undangan</p>
              <p className="text-xs text-on-surface-variant font-body mb-3">Kirim link ini via WhatsApp untuk mulai berbagi pengeluaran.</p>
              <button className="flex items-center gap-2 text-xs font-bold bg-surface-container-highest px-3 py-2 rounded-lg text-on-surface active:scale-95 transition-all font-body">
                <span className="material-symbols-outlined text-sm">content_copy</span>
                Salin Tautan
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 md:px-8 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800/60 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 px-4 rounded-xl font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors font-body text-sm"
          >
            Tutup
          </button>
          <button 
            className="flex-[2] py-3.5 px-4 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all font-body text-sm flex items-center justify-center gap-2"
          >
            Kirim Undangan <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
