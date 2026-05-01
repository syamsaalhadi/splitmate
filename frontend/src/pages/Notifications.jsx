import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import NewExpenseModal from '../components/ui/NewExpenseModal';
import api from '../services/api';

const Notifications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/users/me/notifications');
      setNotifications(res.data);
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleGroupInvite = async (groupId, action) => {
    try {
      await api.patch(`/groups/invitations/${groupId}`, { action });
      fetchNotifications();
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    }
  };

  const handleSettlementRespond = async (settlementId, action) => {
    try {
      await api.patch(`/settlements/${settlementId}`, { action });
      fetchNotifications();
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    }
  };

  const handleBuzzer = async (expenseId, userId) => {
    try {
      await api.patch(`/expenses/${expenseId}/splits/${userId}/remind`);
      fetchNotifications();
      alert("Pengingat berhasil dikirim!");
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
      alert(e.response?.data?.detail || "Gagal mengirim pengingat");
    }
  };

  const tabs = [
    { id: 'all', label: 'Semua' },
    { id: 'unread', label: 'Belum Dibaca' },
    { id: 'bills', label: 'Tagihan' },
    { id: 'system', label: 'Sistem' },
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-20 md:pb-0">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen">
        <TopAppBar searchPlaceholder="Search activity..." onMenuClick={() => setSidebarOpen(true)} />
        {/* Content Canvas */}
        <div className="pt-24 pb-20 max-w-4xl mx-auto px-6">
          {/* Filters (Asymmetric Layout) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <div>
              <h3 className="text-3xl font-extrabold text-on-surface leading-tight tracking-tighter font-headline">
                Stay Updated. <br />
                <span className="text-primary">Finance is fluid.</span>
              </h3>
            </div>
            <div className="flex p-1 bg-surface-container-low rounded-2xl">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-xl transition-all text-sm font-body ${activeTab === tab.id ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-primary font-medium'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List (Tonal Transitions) */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
              </div>
            ) : (() => {
              const filteredNotifications = notifications.filter(notif => {
                if (activeTab === 'all') return true;
                if (activeTab === 'unread') return ['group_invite', 'settlement_pending', 'buzzed_reminder'].includes(notif.type);
                if (activeTab === 'bills') return ['debt_reminder', 'buzzed_reminder', 'settlement_pending', 'settlement_confirmed'].includes(notif.type);
                if (activeTab === 'system') return ['group_invite'].includes(notif.type);
                return true;
              });

              if (filteredNotifications.length === 0) {
                return (
                  <div className="text-center py-12 bg-surface-container-lowest rounded-3xl border border-surface-container-high">
                    <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">notifications_off</span>
                    <p className="text-on-surface-variant font-medium font-body">Belum ada aktivitas terbaru.</p>
                  </div>
                );
              }

              return filteredNotifications.map((notif) => {
                let icon = "notifications";
                let bgColor = "bg-surface-container-highest text-on-surface";
                let actionButtons = null;

                if (notif.type === "group_invite") {
                  icon = "group_add";
                  bgColor = "bg-primary/10 text-primary border border-primary/5";
                  actionButtons = (
                    <div className="mt-4 flex gap-3">
                      <button onClick={() => handleGroupInvite(notif.group_id, 'accept')} className="px-6 py-2 bg-primary-container text-on-primary rounded-full text-xs font-bold transition-all font-body hover:brightness-110 active:scale-95">Terima</button>
                      <button onClick={() => handleGroupInvite(notif.group_id, 'reject')} className="px-6 py-2 border border-outline-variant text-on-surface-variant rounded-full text-xs font-bold transition-all font-body hover:bg-surface-container active:scale-95">Tolak</button>
                    </div>
                  );
                } else if (notif.type === "settlement_pending") {
                  icon = "hourglass_empty";
                  bgColor = "bg-primary-container text-on-primary-container";
                  actionButtons = (
                    <div className="mt-4 flex gap-3">
                      <button onClick={() => handleSettlementRespond(notif.settlement_id, 'accept')} className="px-6 py-2 bg-primary text-white rounded-full text-xs font-bold hover:shadow-lg transition-all font-body active:scale-95">Konfirmasi Lunas</button>
                      <button onClick={() => handleSettlementRespond(notif.settlement_id, 'reject')} className="px-6 py-2 text-primary border border-primary/30 text-xs font-bold hover:bg-primary/5 rounded-full transition-all font-body active:scale-95">Tolak</button>
                    </div>
                  );
                } else if (notif.type === "settlement_confirmed") {
                  icon = "receipt_long";
                  bgColor = "bg-secondary-container text-on-secondary-container";
                } else if (notif.type === "debt_reminder") {
                  icon = "payments";
                  bgColor = "bg-error-container text-on-error-container";
                  actionButtons = (
                    <div className="mt-4 flex items-center gap-3">
                      <button 
                        onClick={() => handleBuzzer(notif.expense_id, notif.user_id)}
                        className="flex items-center gap-2 px-4 py-2 border border-error text-error rounded-full text-xs font-bold hover:bg-error hover:text-white transition-all font-body active:scale-95"
                      >
                        <span className="material-symbols-outlined text-sm">send</span>
                        Kirim Buzzer
                      </button>
                    </div>
                  );
                } else if (notif.type === "buzzed_reminder") {
                  icon = "warning";
                  bgColor = "bg-[#FFF0E6] text-[#FF6B00] border border-[#FF6B00]/20"; // Custom warning colors
                  actionButtons = (
                    <div className="mt-4 flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#FF6B00] text-white rounded-full text-xs font-bold hover:brightness-110 transition-all font-body active:scale-95">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        Bayar Sekarang
                      </button>
                    </div>
                  );
                }

                return (
                  <div key={notif.id} className="bg-surface rounded-3xl p-6 border border-outline-variant/10 transition-all hover:bg-surface-container-low cursor-default">
                    <div className="flex gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${bgColor}`}>
                        <span className="material-symbols-outlined text-3xl" style={notif.type === "settlement_confirmed" ? {fontVariationSettings: "'FILL' 1"} : {}}>{icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-lg text-on-surface font-headline">{notif.title}</h4>
                          <span className="text-xs font-medium text-on-surface-variant opacity-60 font-body">{notif.time_ago}</span>
                        </div>
                        <p className="text-on-surface-variant text-sm leading-relaxed font-body">{notif.message}</p>
                        {actionButtons}
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Floating Summary Context */}
          {notifications.filter(n => n.type === 'settlement_pending' || n.type === 'group_invite').length > 0 && (
            <div className="mt-12 p-8 bg-surface-container rounded-[2rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                  <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2 font-body">Tindakan Diperlukan</p>
                  <h4 className="text-2xl font-black text-on-surface font-headline">{notifications.filter(n => n.type === 'settlement_pending' || n.type === 'group_invite').length} Aktivitas Menunggu Respon</h4>
                  <p className="text-on-surface-variant text-sm font-body">Kamu memiliki undangan grup atau persetujuan pembayaran yang perlu divalidasi.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav onAddClick={() => setIsExpenseModalOpen(true)} />
      <NewExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} />
    </div>
  );
};

export default Notifications;
