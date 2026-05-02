import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import CreateGroupModal from '../components/ui/CreateGroupModal';
import { Link } from 'react-router-dom';
import api from '../services/api';

const CATEGORY_ICONS = {
  trip: 'flight',
  kosan: 'home',
  couple: 'favorite',
  other: 'category',
};

const Groups = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    try {
      const [gRes, invRes] = await Promise.all([
        api.get('/groups'),
        api.get('/groups/invitations')
      ]);
      setGroups(gRes.data);
      setInvitations(invRes.data);
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGroups(); }, []);

  const handleRespondInvite = async (groupId, action) => {
    try {
      await api.patch(`/groups/invitations/${groupId}`, { action });
      fetchGroups();
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    }
  };

  const formatRupiah = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`;

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-20 md:pb-0">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TopAppBar searchPlaceholder="Search groups..." onMenuClick={() => setSidebarOpen(true)} />
      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Grup Anda</h1>
              <p className="text-on-surface-variant font-body">Kelola semua pengeluaran bersama di satu tempat.</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-primary text-white px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all font-body shadow-lg shadow-primary/20 active:scale-95"
            >
              <span className="material-symbols-outlined">group_add</span>
              Buat Grup
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
            </div>
          ) : (
            <>
              {invitations.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h2 className="text-xl font-bold text-on-surface font-headline flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">mail</span>
                    Undangan Grup
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {invitations.map((inv) => (
                      <div key={inv.group_id} className="p-5 bg-surface-container-high rounded-3xl border border-primary/20 flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                            <span className="material-symbols-outlined">{inv.group_icon}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-on-surface mb-0.5 font-headline">{inv.group_name}</h3>
                            <p className="text-slate-500 text-xs font-body">Diundang oleh <span className="font-bold text-on-surface-variant">{inv.inviter_name}</span></p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                          <button
                            onClick={() => handleRespondInvite(inv.group_id, 'accept')}
                            className="flex-1 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1 font-body"
                          >
                            <span className="material-symbols-outlined text-sm">check</span> Terima
                          </button>
                          <button
                            onClick={() => handleRespondInvite(inv.group_id, 'reject')}
                            className="flex-1 py-2 rounded-xl bg-surface-container-highest text-on-surface text-xs font-bold hover:brightness-90 active:scale-95 transition-all flex items-center justify-center gap-1 font-body"
                          >
                            <span className="material-symbols-outlined text-sm">close</span> Tolak
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Link
                  key={group.id}
                  to={`/groups/${group.id}`}
                  className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-highest hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 transition-all group duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/20 text-primary flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-2xl">{group.icon || CATEGORY_ICONS[group.category] || 'category'}</span>
                  </div>
                  <h3 className="font-bold text-xl font-headline mb-1 group-hover:text-primary transition-colors">{group.name}</h3>
                  <p className="text-sm font-medium text-on-surface-variant font-body mb-6">{group.member_count} anggota</p>
                  <div className="flex justify-between items-end pb-4 border-b border-surface-container-high mb-4">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-body">Total Spending</span>
                    <span className="font-bold text-primary font-headline">{formatRupiah(group.total_spending)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full font-body ${group.payment_status === 'Lunas' ? 'bg-secondary-container text-on-secondary-container' : 'bg-amber-100 text-amber-700'}`}>
                      {group.payment_status}
                    </span>
                    {group.status === 'closed' && (
                      <span className="bg-error/10 text-error text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest font-body border border-error/20 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">lock</span>
                        Ditutup
                      </span>
                    )}
                  </div>
                </Link>
              ))}

              {/* Add Group Card */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/50 rounded-3xl p-6 text-on-surface-variant hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all outline-none group"
              >
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-white shadow-sm transition-all group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">add</span>
                </div>
                <span className="font-bold text-sm font-body">Buat Grup Baru</span>
              </button>
            </div>
            </>
          )}
        </div>
      </main>

      <BottomNav />
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => fetchGroups()}
      />
    </div>
  );
};

export default Groups;
