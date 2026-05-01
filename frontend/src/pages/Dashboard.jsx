import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import NewExpenseModal from '../components/ui/NewExpenseModal';
import CreateGroupModal from '../components/ui/CreateGroupModal';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const CATEGORY_ICONS = { trip: 'flight', kosan: 'home', couple: 'favorite', other: 'category' };

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [debts, setDebts] = useState(null);
  const [activities, setActivities] = useState([]);

  const fetchData = async () => {
    try {
      const [gRes, dRes, aRes, invRes] = await Promise.all([
        api.get('/groups'),
        api.get('/users/me/debts'),
        api.get('/users/me/activities'),
        api.get('/groups/invitations')
      ]);
      setGroups(gRes.data.slice(0, 3));
      setDebts(dRes.data);
      setActivities(aRes.data.slice(0, 3));
      setInvitations(invRes.data);
    } catch (e) { if (import.meta.env.DEV) console.error(e); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleRespondInvite = async (groupId, action) => {
    try {
      await api.patch(`/groups/invitations/${groupId}`, { action });
      fetchData();
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    }
  };

  const formatRupiah = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`;

  return (
    <div className="bg-background text-on-background min-h-screen pb-20 md:pb-0">
      <TopAppBar searchPlaceholder="Search dashboard..." onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Canvas */}
      <main className="md:ml-64 pt-24 min-h-screen px-6 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline">Ringkasan Keuangan</h1>
              <p className="text-on-surface-variant mt-1 font-body">Halo {user?.name?.split(' ')[0] || 'Kamu'}, ini performa pengeluaranmu.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsGroupModalOpen(true)}
                className="px-6 py-2.5 bg-secondary-container text-on-secondary-container rounded-full font-semibold text-sm hover:opacity-90 transition-all flex items-center gap-2 font-body"
              >
                <span className="material-symbols-outlined text-lg">group_add</span>
                Buat Grup Baru
              </button>
              <button 
                onClick={() => setIsExpenseModalOpen(true)}
                className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-md font-body"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                Catat Pengeluaran
              </button>
            </div>
          </header>

          {/* Summary Bento Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10">
              <span className="text-slate-500 text-sm font-medium font-body">Total Grup Aktif</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-3xl font-bold font-headline">{groups.length}</span>
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined">layers</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary-container text-on-primary-container rounded-3xl shadow-md">
              <span className="text-on-primary-container/80 text-sm font-medium font-body">Utang Saya</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold font-headline">{formatRupiah(debts?.total_hutang || 0)}</span>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">trending_down</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-secondary text-on-secondary rounded-3xl shadow-md">
              <span className="text-on-secondary/80 text-sm font-medium font-body">Piutang Saya</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold font-headline">{formatRupiah(debts?.total_piutang || 0)}</span>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10">
              <span className="text-slate-500 text-sm font-medium font-body">Skor Finansial</span>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-headline">850</span>
                  <span className="text-xs font-bold text-secondary tracking-wider uppercase font-body">Excellent</span>
                </div>
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Recent Groups */}
            <section className="lg:col-span-2 space-y-6">

              {/* Invitations Section */}
              {invitations.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h2 className="text-xl font-bold text-on-surface font-headline flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">mail</span>
                    Undangan Grup
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-on-surface font-headline">Grup Terbaru</h2>
                <Link to="/groups" className="text-primary font-semibold text-sm hover:underline font-body">Lihat Semua</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.length === 0 ? (
                  <p className="text-on-surface-variant text-sm font-body col-span-2 text-center py-8">
                    Belum ada grup.{' '}
                    <button onClick={() => setIsGroupModalOpen(true)} className="text-primary font-semibold hover:underline">Buat grup pertamamu!</button>
                  </p>
                ) : (
                  groups.map((group) => (
                    <Link key={group.id} to={`/groups/${group.id}`} className="block p-5 bg-surface-container-low rounded-3xl hover:bg-surface-container-high transition-colors group cursor-pointer border border-outline-variant/5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-indigo-600">{group.icon || CATEGORY_ICONS[group.category] || 'group'}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${group.status === 'settled' ? 'bg-secondary-container text-on-secondary-container' : 'bg-amber-100 text-amber-700'}`}>
                          {group.status === 'settled' ? 'Lunas' : 'Belum Lunas'}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-on-surface mb-1 font-headline">{group.name}</h3>
                      <p className="text-slate-500 text-xs mb-4 font-body">{group.member_count} Anggota</p>
                      <div className="flex justify-between items-end">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                          {group.name[0]}
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] text-slate-400 font-bold uppercase font-body">Total</span>
                          <span className="font-bold text-on-surface font-headline">{formatRupiah(group.total_spending || 0)}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </section>

            {/* Right Column: Transactions & Insight CTA */}
            <section className="space-y-6">
              <Link to="/insights" className="block p-6 bg-gradient-to-br from-indigo-900 to-primary rounded-3xl text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="font-bold text-xl mb-2 font-headline">Lihat Insight</h3>
                  <p className="text-indigo-100 text-sm mb-6 leading-relaxed font-body">Analisis kebiasaan belanjamu dan hemat hingga 20% bulan depan.</p>
                  <span className="inline-block w-full py-3 bg-white text-primary rounded-2xl font-bold text-sm text-center group-hover:bg-indigo-50 transition-colors font-body">
                    Mulai Analisis
                  </span>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-20">
                  <span className="material-symbols-outlined text-9xl">insights</span>
                </div>
              </Link>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-on-surface font-headline">Aktivitas Terakhir</h2>
                  <Link to="/activity" className="text-primary font-semibold text-xs font-body hover:underline">Lihat Semua</Link>
                </div>

                <div className="space-y-3">
                  {activities.length === 0 ? (
                    <p className="text-on-surface-variant text-sm font-body text-center py-4">Belum ada aktivitas.</p>
                  ) : (
                    activities.map((act) => (
                      <div key={act.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${act.paid_by_me ? 'bg-secondary-container/30 text-secondary' : 'bg-surface-container-highest text-primary'}`}>
                          <span className="material-symbols-outlined">{act.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-on-surface font-headline">{act.title}</h4>
                          <p className="text-[10px] text-slate-500 font-body">{act.group_name} • {act.date}</p>
                        </div>
                        <div className="text-right">
                          <span className={`block text-sm font-bold font-body ${act.paid_by_me ? 'text-secondary' : 'text-error'}`}>
                            {act.paid_by_me ? '+' : '-'}Rp {Number(act.amount).toLocaleString('id-ID')}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium font-body">
                            {act.paid_by_me ? 'Kamu bayar' : 'Bagianmu'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <BottomNav onAddClick={() => setIsExpenseModalOpen(true)} />

      {/* Modals */}
      <NewExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} />
      <CreateGroupModal isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} onSuccess={fetchData} />
    </div>
  );
};

export default Dashboard;
