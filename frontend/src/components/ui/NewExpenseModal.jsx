import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const NewExpenseModal = ({ isOpen, onClose, groupId, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ title: '', amount: '', category: 'lainnya', split_type: 'equal' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(groupId || '');

  useEffect(() => {
    setSelectedGroupId(groupId || '');
    if (!groupId && isOpen) {
      api.get('/groups').then(r => setGroups(r.data)).catch(() => {});
    }
  }, [groupId, isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.amount) { setError('Judul dan jumlah wajib diisi'); return; }
    const gId = selectedGroupId || groupId;
    if (!gId) { setError('Pilih grup terlebih dahulu'); return; }
    setLoading(true);
    setError('');
    try {
      await api.post(`/groups/${gId}/expenses`, {
        title: form.title.trim(),
        amount: Number(form.amount),
        category: form.category,
        split_type: form.split_type,
        paid_by: user?.id,
      });
      setForm({ title: '', amount: '', category: 'lainnya', split_type: 'equal' });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'Gagal menambah pengeluaran');
    } finally {
      setLoading(false);
    }
  };

  const CATEGORIES = [
    { id: 'makanan', label: 'Makanan' },
    { id: 'transportasi', label: 'Transportasi' },
    { id: 'travel', label: 'Travel' },
    { id: 'belanja', label: 'Belanja' },
    { id: 'hiburan', label: 'Hiburan' },
    { id: 'tagihan', label: 'Tagihan' },
    { id: 'lainnya', label: 'Lainnya' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2rem] shadow-2xl relative z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/60">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-headline">Tambah Beban Baru</h2>
            <p className="text-xs text-slate-500 font-body mt-1">Catat pengeluaran baru untuk dibagi bersama.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors active:scale-95">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-5">
          {/* Group selector (only when no groupId prop) */}
          {!groupId && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-headline">Grup</label>
              <select
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-slate-800 font-medium focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm"
              >
                <option value="">-- Pilih Grup --</option>
                {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-headline">Deskripsi</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">description</span>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Contoh: Makan siang bareng..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm"
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-headline">Total Biaya</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium font-body pr-2">Rp</span>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-800 font-bold placeholder-slate-300 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-xl"
              />
            </div>
          </div>

          {/* Category + Split */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-headline">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-slate-800 font-medium focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm"
              >
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-headline">Cara Bagi</label>
              <select
                value={form.split_type}
                onChange={(e) => setForm({ ...form, split_type: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-slate-800 font-medium focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm"
              >
                <option value="equal">Sama Rata</option>
              </select>
            </div>
          </div>

          {error && <p className="text-error text-xs font-medium font-body">{error}</p>}
        </div>

        {/* Footer */}
        <div className="p-6 md:px-8 md:py-6 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800/60 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3.5 px-4 rounded-xl font-semibold text-slate-600 hover:bg-slate-200/50 transition-colors font-body text-sm">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-[2] py-3.5 px-4 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all font-body text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span> : <>Simpan <span className="material-symbols-outlined text-lg">check_circle</span></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewExpenseModal;
