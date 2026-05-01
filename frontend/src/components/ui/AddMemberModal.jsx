import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AddMemberModal = ({ isOpen, onClose, onSuccess, groupId }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [friends, setFriends] = useState([]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      api.get('/friends').then(res => setFriends(res.data)).catch(e => console.error(e));
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (targetEmail = email) => {
    if (!targetEmail.trim()) { setError('Email wajib diisi'); return; }
    if (!/^\S+@\S+\.\S+$/.test(targetEmail)) { setError('Format email tidak valid'); return; }
    
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post(`/groups/${groupId}/members`, { email: targetEmail.trim() });
      setSuccess('Undangan grup berhasil dikirim!');
      onSuccess?.();
      setTimeout(() => {
        setEmail('');
        setSuccess('');
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.detail || 'Gagal menambahkan member');
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
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl relative z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/60 bg-surface-container-lowest">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-headline leading-tight">Tambah Member</h2>
            <p className="text-xs text-slate-500 font-body mt-1">Undang teman ke grup menggunakan email.</p>
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
          
          {/* Email Member */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 font-headline">Email Teman</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Misal: budi@gmail.com"
                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-slate-800 dark:text-slate-100 font-medium placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm"
              />
            </div>
          </div>
          
          {error && <p className="text-error text-xs font-medium font-body">{error}</p>}
          {success && <p className="text-[#1D9E75] text-xs font-medium font-body">{success}</p>}

          {/* Quick Select Friends */}
          {friends.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 font-headline">Pilih Dari Teman</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {friends.map((friend) => (
                  <div key={friend.id} onClick={() => handleSubmit(friend.email)} className="bg-surface-container-low p-3 rounded-xl flex items-center justify-between hover:bg-surface-container transition-colors cursor-pointer active:scale-[0.98]">
                    <div className="flex items-center gap-3">
                      {friend.avatar_url ? (
                        <img src={friend.avatar_url} alt={friend.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                          {friend.name[0]}
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-bold text-on-surface leading-tight font-headline">{friend.name}</h3>
                        <p className="text-[10px] text-on-surface-variant font-medium mt-0.5 font-body">{friend.email}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary text-sm">person_add</span>
                  </div>
                ))}
              </div>
            </div>
          )}

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
            onClick={() => handleSubmit(email)}
            disabled={loading}
            className="flex-[2] py-3.5 px-4 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all font-body text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span> : <>Kirim Undangan <span className="material-symbols-outlined text-lg">send</span></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
