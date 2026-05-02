import React, { useState, useEffect, useCallback, useContext } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import NewExpenseModal from '../components/ui/NewExpenseModal';
import SettleUpModal from '../components/ui/SettleUpModal';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import AddMemberModal from '../components/ui/AddMemberModal';
import ConfirmModal from '../components/ui/ConfirmModal';
import Toast from '../components/ui/Toast';



const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);
  const [settleData, setSettleData] = useState({ contact: '', amount: 0, fromUserId: null, toUserId: null, groupId: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [debts, setDebts] = useState(null);
  const [pendingSettlements, setPendingSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isRemoveMemberConfirmOpen, setIsRemoveMemberConfirmOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'error' });

  const showToast = (message, type = 'error') => {
    setToast({ isOpen: true, message, type });
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [gRes, eRes, dRes, pendingRes] = await Promise.all([
        api.get(`/groups/${id}`),
        api.get(`/groups/${id}/expenses`),
        api.get(`/groups/${id}/debts`),
        api.get(`/groups/${id}/settlements/pending`)
      ]);
      setGroup(gRes.data);
      setExpenses(eRes.data.items ?? eRes.data);
      setDebts(dRes.data);
      setPendingSettlements(pendingRes.data);
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleSettleUp = (contact, amount, fromUserId, toUserId) => {
    setSettleData({ contact, amount, fromUserId, toUserId, groupId: id });
    setIsSettleModalOpen(true);
  };

  const confirmRemoveMember = (member) => {
    setMemberToRemove(member);
    setIsRemoveMemberConfirmOpen(true);
  };

  const handleRemoveMember = async () => {
    if (!memberToRemove) return;
    setActionLoading(true);
    try {
      await api.delete(`/groups/${id}/members/${memberToRemove.user_id}`);
      setIsRemoveMemberConfirmOpen(false);
      setMemberToRemove(null);
      showToast('Anggota berhasil dihapus', 'success');
      fetchAll();
    } catch (e) {
      showToast(e.response?.data?.detail || 'Gagal menghapus anggota');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRespondSettlement = async (settlementId, action) => {
    try {
      await api.patch(`/settlements/${settlementId}`, { action });
      fetchAll();
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    }
  };

  const handleCloseGroup = async () => {
    setActionLoading(true);
    try {
      await api.patch(`/groups/${id}/close`);
      setIsCloseConfirmOpen(false);
      showToast('Grup berhasil ditutup', 'success');
      fetchAll();
    } catch (e) {
      showToast(e.response?.data?.detail || 'Gagal menutup grup');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteGroup = async () => {
    setActionLoading(true);
    try {
      await api.delete(`/groups/${id}`);
      setIsDeleteConfirmOpen(false);
      navigate('/groups');
    } catch (e) {
      showToast(e.response?.data?.detail || 'Gagal menghapus grup');
    } finally {
      setActionLoading(false);
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
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">{group.icon || CATEGORY_ICONS[group.category] || 'category'}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/60 font-body">{group.category}</span>
                  </div>
                  {group.status === 'closed' ? (
                    <span className="bg-error/10 text-error text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest font-body border border-error/20 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">lock</span>
                      Ditutup
                    </span>
                  ) : (
                    <span className="bg-secondary/10 text-secondary text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest font-body border border-secondary/20 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">bolt</span>
                      Aktif
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">{group.name}</h1>
                <p className="text-on-surface-variant font-medium font-body">{group.member_count} anggota • {group.payment_status}</p>
              </div>
              <div className="bg-surface-container-low p-6 rounded-xl text-right">
                <p className="text-sm font-semibold text-on-surface-variant mb-1 uppercase tracking-tighter font-headline">Total Pengeluaran Grup</p>
                <p className="text-3xl font-bold text-primary font-headline">{formatRupiah(group.total_spending)}</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-surface-container-highest flex flex-wrap gap-4">
              {group.status === 'active' ? (
                <>
                  <button
                    onClick={() => setIsAddMemberModalOpen(true)}
                    className="bg-surface-container-high text-on-surface border border-outline-variant px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-all transform active:scale-95 font-body"
                  >
                    <span className="material-symbols-outlined">person_add</span>
                    Tambah Anggota
                  </button>
                  <button
                    onClick={() => setIsExpenseModalOpen(true)}
                    className="bg-gradient-to-r from-primary to-primary-container text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all transform active:scale-95 font-body"
                  >
                    <span className="material-symbols-outlined">add_circle</span>
                    Tambah Pengeluaran
                  </button>
                  {currentUser?.id === group.created_by && (
                    <button
                      onClick={() => setIsCloseConfirmOpen(true)}
                      className="bg-surface-container-lowest text-on-surface border border-outline-variant px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-error/5 hover:text-error hover:border-error transition-all transform active:scale-95 font-body"
                    >
                      <span className="material-symbols-outlined">lock</span>
                      Tutup Grup
                    </button>
                  )}
                </>
              ) : (
                <>
                  {currentUser?.id === group.created_by && (
                    <button
                      onClick={() => setIsDeleteConfirmOpen(true)}
                      className="bg-error text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all transform active:scale-95 font-body"
                    >
                      <span className="material-symbols-outlined">delete_forever</span>
                      Hapus Grup Permanen
                    </button>
                  )}
                  <p className="text-on-surface-variant text-sm font-medium font-body flex items-center gap-2 bg-surface-container-low px-4 py-3 rounded-2xl border border-outline-variant/10">
                    <span className="material-symbols-outlined text-error">info</span>
                    Grup ini sudah ditutup. Tidak ada aktivitas baru yang diizinkan.
                  </p>
                </>
              )}
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
                    {currentUser && m.user_id !== currentUser.id && group.status === 'active' && (
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


          {/* Persetujuan Pembayaran */}
          {pendingSettlements.length > 0 && (
            <section className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 font-headline text-primary">
                  <span className="material-symbols-outlined">hourglass_empty</span>
                  Persetujuan Pembayaran
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingSettlements.map((s) => (
                  <div key={s.id} className="bg-surface-container-lowest p-5 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                        {s.from_user_name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium font-body leading-tight text-on-surface">
                          <span className="font-bold">{s.from_user_name}</span> telah membayar ke kamu sebesar:
                        </p>
                        <p className="text-2xl font-bold font-headline text-primary mt-1">{formatRupiah(s.amount)}</p>
                        {s.notes && <p className="text-xs text-on-surface-variant font-body mt-1">Via {s.notes}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        onClick={() => handleRespondSettlement(s.id, 'accept')}
                        className="flex-1 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1 font-body"
                      >
                        <span className="material-symbols-outlined text-sm">check</span> Terima
                      </button>
                      <button
                        onClick={() => handleRespondSettlement(s.id, 'reject')}
                        className="flex-1 py-2 rounded-xl bg-surface-container-highest text-on-surface text-xs font-bold hover:brightness-90 active:scale-95 transition-all flex items-center justify-center gap-1 font-body"
                      >
                        <span className="material-symbols-outlined text-sm">close</span> Tolak
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}


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
                      onClick={() => handleSettleUp(s.to_user_name, s.amount, s.from_user_id, s.to_user_id)}
                      className="text-xs font-bold bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 active:scale-95 transition-all font-body"
                    >Tandai Lunas</button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>


      <SettleUpModal
        isOpen={isSettleModalOpen}
        onClose={() => setIsSettleModalOpen(false)}
        defaultContact={settleData.contact}
        defaultAmount={settleData.amount}
        fromUserId={settleData.fromUserId}
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
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        groupId={id}
        onSuccess={fetchAll}
      />
      
      <ConfirmModal
        isOpen={isCloseConfirmOpen}
        onClose={() => setIsCloseConfirmOpen(false)}
        onConfirm={handleCloseGroup}
        loading={actionLoading}
        title="Tutup Grup?"
        message="Apakah Anda yakin ingin menutup grup ini? Setelah ditutup, tidak ada anggota yang bisa menambah pengeluaran baru."
        confirmText="Ya, Tutup Sekarang"
        cancelText="Batal"
      />

      <ConfirmModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteGroup}
        loading={actionLoading}
        title="Hapus Grup Permanen?"
        message="Data grup, riwayat pengeluaran, dan saldo akan dihapus selamanya. Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus Selamanya"
        cancelText="Jangan Hapus"
        type="danger"
      />

      <Toast 
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />

      <BottomNav onAddClick={() => setIsExpenseModalOpen(true)} />
    </div>
  );
};

export default GroupDetail;
