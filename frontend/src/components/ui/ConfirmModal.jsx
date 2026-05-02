import React, { useEffect } from 'react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Konfirmasi", 
  message = "Apakah Anda yakin ingin melanjutkan?", 
  confirmText = "Ya, Lanjutkan", 
  cancelText = "Batal",
  type = "info", // "info" (primary) or "danger" (error)
  loading = false
}) => {
  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDanger = type === "danger";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Icon Area */}
        <div className={`flex justify-center pt-8 pb-4`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isDanger ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'} animate-bounce`}>
            <span className="material-symbols-outlined text-4xl">
              {isDanger ? 'report' : 'help'}
            </span>
          </div>
        </div>

        {/* Text Area */}
        <div className="px-8 pb-8 text-center">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 font-headline leading-tight mb-3">
            {title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-body leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="p-6 md:px-8 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800/60 flex flex-col gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-sm transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg ${
              isDanger 
                ? 'bg-error text-white shadow-error/20 hover:brightness-110' 
                : 'bg-primary text-white shadow-primary/20 hover:brightness-110'
            } disabled:opacity-60`}
          >
            {loading ? (
              <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
            ) : (
              confirmText
            )}
          </button>
          <button 
            onClick={onClose}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors font-body text-sm disabled:opacity-50"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
