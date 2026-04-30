import React, { useState, useEffect, useCallback, useContext } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import NewExpenseModal from '../components/ui/NewExpenseModal';
import SettleUpModal from '../components/ui/SettleUpModal';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const AddMemberModal = ({ groupId, onSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError('Email wajib diisi'); return; }
    setLoading(true);
    setError('');
    try {
      await api.post(`/groups/${groupId}/members`, { email: email.trim() });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'Gagal menambah anggota');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-surface-container-lowest rounded-3xl p-8 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-extrabold text-on-surface font-headline">Tambah Anggota</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-outline">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-on-surface-variant font-body block mb-1.5">Email anggota</label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              className={`w-full bg-surface-container-high border rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition font-body focus:border-primary ${error ? 'border-error' : 'border-transparent'}`}
              placeholder="contoh@email.com"
              autoFocus
            />
            {error && <p className="text-error text-xs mt-1 font-body">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary font-bold py-3 rounded-full text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 font-body flex items-center justify-center gap-2"
          >
            {loading ? <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-lg">person_add</span>}
            {loading ? 'Menambahkan...' : 'Tambah Anggota'}
          </button>
        </form>
      </div>
    </div>
  );
};

const GroupDetail = () => {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);
  const [settleData, setSettleData] = useState({ contact: '', amount: 0, toUserId: null, groupId: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [debts, setDebts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [gRes, eRes, dRes] = await Promise.all([
        api.get(`/groups/${id}`),
        api.get(`/groups/${id}/expenses`),
        api.get(`/groups/${id}/debts`),
      ]);
      setGroup(gRes.data);
      setExpenses(eRes.data.items ?? eRes.data);
      setDebts(dRes.data);
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleSettleUp = (contact, amount, toUserId) => {
    setSettleData({ contact, amount, toUserId, groupId: id });
    setIsSettleModalOpen(true);
  };

  const handleRemoveMember = async (userId) => {
    if (!confirm('Hapus anggota ini dari grup?')) return;
    try {
      await api.delete(`/groups/${id}/members/${userId}`);
      fetchAll();
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    }
  };

  const formatRupiah = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`;

  const CATEGORY_ICONS = { trip: 'flight', kosan: 'home', couple: 'favorite', other: 'category' };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="material-symbols-outlined text-5xl animate-spin text-primary">progress_activity</span>
    </div>
  );

  if (!group) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-on-surface-variant font-body">Grup tidak ditemukan.</p>
    </div>
  );

  const hasActiveBalances = debts && debts.member_balances.some(m => m.status !== 'Settled');

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-20 md:pb-0">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TopAppBar searchPlaceholder="Cari grup..." onMenuClick={() => setSidebarOpen(true)} />

      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">

          {/* Header Grup */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-sm">{group.icon || CATEGORY_ICONS[group.category] || 'category'}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary/60 font-body">{group.category}</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">{group.name}</h1>
                <p className="text-on-surface-variant font-medium font-body">{group.member_count} anggota</p>
              </div>
              <div className="bg-surface-container-low p-6 rounded-xl text-right">
                <p className="text-sm font-semibold text-on-surface-variant mb-1 uppercase tracking-tighter font-headline">Total Pengeluaran Grup</p>
                <p className="text-3xl font-bold text-primary font-headline">{formatRupiah(group.total_spending)}</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-surface-container-highest flex flex-wrap gap-4">
              <button
                onClick={() => setIsExpenseModalOpen(true)}
                className="bg-gradient-to-r from-primary to-primary-container text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all transform active:scale-95 font-body"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Tambah Pengeluaran
              </button>
              <button
                onClick={() => setIsAddMemberOpen(true)}
                className="border-2 border-primary text-primary px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-primary/5 transition-all active:scale-95 font-body"
              >
                <span className="material-symbols-outlined">person_add</span>
                Tambah Anggota
              </button>
            </div>
          </section>

          {/* Daftar Anggota */}
          {group.members && group.members.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 font-headline">
                <span className="material-symbols-outlined text-primary">group</span>
                Anggota Grup
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {group.members.map((m) => (
                  <div key={m.user_id} className="bg-surface-container-low rounded-xl p-4 flex items-center gap-3 relative group">
                    {m.user.avatar_url
                      ? <img src={m.user.avatar_url} alt={m.user.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      : <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">{m.user.name[0]}</div>
                    }
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-on-surface font-body truncate">{m.user.name}</p>
                      <p className="text-xs text-outline font-body capitalize">{m.role}</p>
                    </div>
                    {currentUser && m.user_id !== currentUser.id && (
                      <button
                        onClick={() => handleRemoveMember(m.user_id)}
                        className="absolute top-2 right-2 p-1 rounded-full text-outline hover:text-error hover:bg-error/10 transition-all opacity-0 group-hover:opacity-100"
                        title="Hapus anggota"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Saldo Anggota — hanya tampil kalau ada hutang aktif */}
          {hasActiveBalances && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 font-headline">
                <span className="material-symbols-outlined text-secondary">account_balance_wallet</span>
                Saldo Anggota
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {debts.member_balances.filter(m => m.status !== 'Settled').map((m) => (
                  <div
                    key={m.user_id}
                    className={`bg-surface-container-low p-4 rounded-xl border-b-4 ${m.status === 'Is owed' ? 'border-secondary/20' : 'border-error/20'}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {m.avatar_url
                        ? <img src={m.avatar_url} alt={m.user_name} className="w-10 h-10 rounded-full object-cover" />
                        : <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">{m.user_name[0]}</div>
                      }
                      <span className="font-bold font-body text-sm">{m.user_name}</span>
                    </div>
                    <p className="text-xs font-semibold text-on-surface-variant uppercase mb-1 font-body">
                      {m.status === 'Is owed' ? 'Piutang' : 'Hutang'}
                    </p>
                    <p className={`text-lg font-bold font-headline ${m.status === 'Is owed' ? 'text-secondary' : 'text-error'}`}>
                      {formatRupiah(m.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Pengeluaran */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold font-headline">Pengeluaran</h2>
            {expenses.length === 0 ? (
              <div className="text-center py-12 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-4xl text-outline mb-3 block">receipt_long</span>
                <p className="text-on-surface-variant text-sm font-body">Belum ada pengeluaran.</p>
                <button
                  onClick={() => setIsExpenseModalOpen(true)}
                  className="mt-4 text-primary font-semibold text-sm font-body hover:underline"
                >
                  Tambah pengeluaran pertama
                </button>
              </div>
            ) : (
              expenses.map((exp) => (
                <div key={exp.id} className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between hover:bg-surface-container-high transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{exp.icon || 'receipt'}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg font-headline">{exp.title}</h3>
                      <p className="text-sm text-on-surface-variant font-medium font-body">
                        Dibayar <span className="text-primary">{exp.paid_by_name}</span> • {exp.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold font-headline">{formatRupiah(exp.amount)}</p>
                    <p className="text-xs font-bold text-secondary-container bg-on-secondary-container/10 px-2 py-0.5 rounded inline-block font-body">{exp.split_type_label}</p>
                  </div>
                </div>
              ))
            )}
          </section>

          {/* Cara Melunasi */}
          {debts && debts.settlements.length > 0 && (
            <section className="bg-surface-container-high rounded-2xl p-6 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 font-headline">
                  <span className="material-symbols-outlined text-primary">currency_exchange</span>
                  Cara Melunasi
                </h2>
                <span className="text-xs font-bold bg-white/50 px-3 py-1 rounded-full uppercase tracking-tighter font-body">Jalur Optimal</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {debts.settlements.map((s, i) => (
                  <div key={i} className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">{s.from_user_name[0]}</div>
                        <span className="material-symbols-outlined text-primary text-base">arrow_forward</span>
                        <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs">{s.to_user_name[0]}</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium font-body">
                          <span className="font-bold">{s.from_user_name}</span> bayar ke <span className="font-bold">{s.to_user_name}</span>
                        </p>
                        <p className="text-primary font-bold font-headline">{formatRupiah(s.amount)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSettleUp(s.to_user_name, s.amount, s.to_user_id)}
                      className="text-xs font-bold bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 active:scale-95 transition-all font-body"
                    >Tandai Lunas</button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {isAddMemberOpen && (
        <AddMemberModal
          groupId={id}
          onSuccess={fetchAll}
          onClose={() => setIsAddMemberOpen(false)}
        />
      )}
      <SettleUpModal
        isOpen={isSettleModalOpen}
        onClose={() => setIsSettleModalOpen(false)}
        defaultContact={settleData.contact}
        defaultAmount={settleData.amount}
        toUserId={settleData.toUserId}
        groupId={settleData.groupId}
        onSuccess={fetchAll}
      />
      <NewExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        groupId={id}
        onSuccess={fetchAll}
      />
      <BottomNav onAddClick={() => setIsExpenseModalOpen(true)} />
    </div>
  );
};

export default GroupDetail;
