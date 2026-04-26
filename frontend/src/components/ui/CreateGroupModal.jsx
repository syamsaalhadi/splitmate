import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const CreateGroupModal = ({ isOpen, onClose, onSuccess }) => {
  const [category, setCategory] = useState('trip');
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { id: 'trip', icon: 'flight', label: 'Trip' },
    { id: 'kosan', icon: 'home', label: 'Kosan' },
    { id: 'couple', icon: 'favorite', label: 'Couple' },
    { id: 'other', icon: 'category', label: 'Lainnya' },
  ];

  const handleSubmit = async () => {
    if (!groupName.trim()) { setError('Nama grup wajib diisi'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/groups', { name: groupName.trim(), category });
      onSuccess?.(res.data);
      setGroupName('');
      setCategory('trip');
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'Gagal membuat grup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2rem] shadow-2xl relative z-10 overflow-hidden">
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
          
          {/* Nama Grup */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 font-headline">Nama Grup</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">edit</span>
              <input 
                type="text" 
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Misal: Trip Lombok 2026"
                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-slate-800 dark:text-slate-100 font-medium placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm"
              />
            </div>
          </div>

          {/* Kategori Grup */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 font-headline">Kategori</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-1 ${category === cat.id ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  <span className="material-symbols-outlined">{cat.icon}</span>
                  <span className="text-[10px] font-bold font-body">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {error && <p className="text-error text-xs font-medium font-body">{error}</p>}

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
            onClick={handleSubmit}
            disabled={loading}
            className="flex-[2] py-3.5 px-4 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all font-body text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span> : <>Selesai Buat <span className="material-symbols-outlined text-lg">arrow_forward</span></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
