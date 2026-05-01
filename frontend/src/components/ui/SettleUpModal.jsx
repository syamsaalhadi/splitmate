import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const SettleUpModal = ({ isOpen, onClose, defaultContact = "Budi", defaultAmount = 150000, fromUserId, toUserId, groupId, onSuccess }) => {
  const [method, setMethod] = useState('Transfer');
  const [amount, setAmount] = useState(defaultAmount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { setAmount(defaultAmount); }, [defaultAmount]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!toUserId || !groupId) { setError('Data tidak lengkap'); return; }
    setLoading(true);
    setError('');
    try {
      await api.post('/settlements', {
        from_user_id: fromUserId,
        to_user_id: toUserId,
        group_id: groupId,
        amount: Number(String(amount).replace(/\./g, '')),
        notes: method,
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'Gagal melakukan pelunasan');
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
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">handshake</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-headline leading-tight">Pelunasan Saldo</h2>
              <p className="text-xs text-slate-500 font-body">Settle up dengan {defaultContact}</p>
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
          
          {/* Amount Box */}
          <div className="text-center bg-surface-container-low p-6 rounded-3xl border border-surface-container-high transition-transform hover:scale-[1.02]">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-body mb-2">Total Dibayar</p>
            <div className="flex justify-center items-center gap-1 group">
              <span className="text-xl font-bold text-primary font-headline">Rp</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-4xl font-black text-on-surface text-center w-48 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-primary font-headline"
              />
              <span className="material-symbols-outlined text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 font-headline">Metode Pembayaran</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setMethod('Transfer')}
                className={`py-3 px-4 rounded-xl font-bold text-sm border-2 transition-all flex items-center justify-center gap-2 font-body ${method === 'Transfer' ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant/30 text-slate-500 hover:border-outline-variant/60'}`}
              >
                <span className="material-symbols-outlined text-lg">account_balance</span>
                Transfer
              </button>
              <button 
                onClick={() => setMethod('Cash')}
                className={`py-3 px-4 rounded-xl font-bold text-sm border-2 transition-all flex items-center justify-center gap-2 font-body ${method === 'Cash' ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant/30 text-slate-500 hover:border-outline-variant/60'}`}
              >
                <span className="material-symbols-outlined text-lg">payments</span>
                Tunai
              </button>
            </div>
          </div>
          
          {/* Tanggal */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 font-headline">Tanggal</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">calendar_month</span>
              <input 
                type="date" 
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-slate-800 dark:text-slate-100 font-medium placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 md:px-8 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800/60 flex flex-col gap-3">
          {error && <p className="text-error text-xs font-medium text-center font-body">{error}</p>}
          <div className="flex gap-3">
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
              {loading ? <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span> : <>Tandai Lunas <span className="material-symbols-outlined text-lg">check_circle</span></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettleUpModal;
