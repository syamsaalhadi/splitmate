import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import NewExpenseModal from '../components/ui/NewExpenseModal';
import SettleUpModal from '../components/ui/SettleUpModal';
import AddFriendModal from '../components/ui/AddFriendModal';
import api from '../services/api';

const DebtTracking = () => {
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [settleData, setSettleData] = useState({ contact: '', amount: 0, toUserId: null, groupId: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('friends');
  const [debts, setDebts] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [debtsRes, friendsRes, reqsRes] = await Promise.all([
        api.get('/users/me/debts'),
        api.get('/friends'),
        api.get('/friends/requests')
      ]);
      setDebts(debtsRes.data);
      setFriends(friendsRes.data);
      setFriendRequests(reqsRes.data);
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSettleUp = (contact, amount, toUserId, groupId) => {
    setSettleData({ contact, amount, toUserId, groupId });
    setIsSettleModalOpen(true);
  };

  const handleBuzzer = async (expenseId, userId) => {
    try {
      await api.patch(`/expenses/${expenseId}/splits/${userId}/remind`);
      fetchData();
      alert("Pengingat berhasil dikirim!");
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
      alert(e.response?.data?.detail || "Gagal mengirim pengingat");
    }
  };

  const handleRespondRequest = async (userId, action) => {
    try {
      await api.patch(`/friends/requests/${userId}`, { action });
      fetchData();
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    }
  };

  const formatRupiah = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`;

  const oweList = debts?.owe || [];
  const owedList = debts?.owed || [];

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-20 md:pb-0">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TopAppBar searchPlaceholder="Search friends..." onMenuClick={() => setSidebarOpen(true)} />

      <main className="pt-24 pb-20 md:ml-64 px-6 min-h-screen">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Teman & Hutang</h1>
              <p className="text-on-surface-variant font-body">Kelola daftar teman dan lacak hutang piutang.</p>
            </div>
            <button
              onClick={() => setIsAddFriendModalOpen(true)}
              className="bg-surface-container-high text-on-surface border border-outline-variant px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-all transform active:scale-95 font-body"
            >
              <span className="material-symbols-outlined">person_add</span>
              Add Friend
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
            </div>
          ) : (
            <>
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest p-6 rounded-[2rem]">
                  <span className="text-on-surface-variant font-medium text-sm flex items-center gap-2 font-body">
                    <span className="material-symbols-outlined text-error text-lg">call_made</span>
                    Total Hutang Saya
                  </span>
                  <h2 className="text-3xl font-bold mt-2 text-[#E24B4A] tracking-tight font-headline">{formatRupiah(debts?.total_hutang || 0)}</h2>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-[2rem]">
                  <span className="text-on-surface-variant font-medium text-sm flex items-center gap-2 font-body">
                    <span className="material-symbols-outlined text-secondary text-lg">call_received</span>
                    Total Piutang Saya
                  </span>
                  <h2 className="text-3xl font-bold mt-2 text-[#1D9E75] tracking-tight font-headline">{formatRupiah(debts?.total_piutang || 0)}</h2>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex bg-surface-container-low p-1.5 rounded-2xl w-fit flex-wrap gap-1">
                <button
                  onClick={() => setActiveTab('friends')}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all font-body ${activeTab === 'friends' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-primary'}`}
                >
                  Daftar Teman ({friends.length})
                </button>
                <button
                  onClick={() => setActiveTab('owe')}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all font-body ${activeTab === 'owe' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-primary'}`}
                >
                  Saya Berutang ({oweList.length})
                </button>
                <button
                  onClick={() => setActiveTab('owed')}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all font-body ${activeTab === 'owed' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-primary'}`}
                >
                  Saya Diutangi ({owedList.length})
                </button>
              </div>

              {/* List */}
              <div className="space-y-4">
                {activeTab === 'friends' && (
                  <div className="space-y-8">
                    {friendRequests.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-on-surface mb-3 font-headline">Permintaan Pertemanan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {friendRequests.map((req) => (
                            <div key={req.id} className="bg-surface-container-high p-4 rounded-[1.5rem] flex items-center justify-between hover:shadow-sm transition-shadow">
                              <div className="flex items-center gap-4">
                                {req.avatar_url ? (
                                  <img src={req.avatar_url} alt={req.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-base">
                                    {req.name[0]}
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-sm font-bold text-on-surface leading-tight font-headline">{req.name}</h3>
                                  <p className="text-xs text-on-surface-variant font-medium mt-0.5 font-body">{req.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleRespondRequest(req.id, 'accept')}
                                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
                                  title="Terima"
                                >
                                  <span className="material-symbols-outlined text-sm">check</span>
                                </button>
                                <button
                                  onClick={() => handleRespondRequest(req.id, 'reject')}
                                  className="w-8 h-8 rounded-full bg-error text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
                                  title="Tolak"
                                >
                                  <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      {friendRequests.length > 0 && <h3 className="text-lg font-bold text-on-surface mb-3 font-headline">Daftar Teman</h3>}
                      {friends.length === 0
                        ? <p className="text-on-surface-variant text-sm font-body text-center py-8">Belum ada teman yang ditambahkan.</p>
                        : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {friends.map((friend) => (
                              <div key={friend.id} className="bg-surface-container-lowest p-4 rounded-[1.5rem] flex items-center gap-4 hover:shadow-sm transition-shadow">
                                {friend.avatar_url ? (
                                  <img src={friend.avatar_url} alt={friend.name} className="w-12 h-12 rounded-full object-cover" />
                                ) : (
                                  <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                                    {friend.name[0]}
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-base font-bold text-on-surface leading-tight font-headline">{friend.name}</h3>
                                  <p className="text-xs text-on-surface-variant font-medium mt-1 font-body">{friend.email}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                      }
                    </div>
                  </div>
                )}

                {activeTab === 'owe' && (
                  oweList.length === 0
                    ? <p className="text-on-surface-variant text-sm font-body text-center py-8">Tidak ada hutang aktif.</p>
                    : oweList.map((item) => (
                        <div key={item.expense_split_id} className="bg-surface-container-lowest p-6 rounded-[1.5rem] flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xl">
                              {item.to_user_name[0]}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-on-surface leading-tight font-headline">{item.to_user_name}</h3>
                              <p className="text-xs text-on-surface-variant font-medium mt-1 font-body">Grup: <span className="text-primary">{item.group_name}</span></p>
                              <p className="text-xs text-on-surface-variant mt-1 font-body">{item.expense_title}</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end justify-center">
                            <span className="text-xl font-extrabold text-[#E24B4A] tracking-tight font-headline">{formatRupiah(item.amount)}</span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-error-container text-on-error-container mt-2 w-fit font-body">{item.status}</span>
                          </div>
                          <div className="flex items-center gap-2 sm:ml-4">
                            <button
                              onClick={() => handleSettleUp(item.to_user_name, item.amount, item.to_user_id, item.group_id)}
                              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-primary text-white shadow-md shadow-primary/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-body"
                            >
                              <span className="material-symbols-outlined text-sm">check_circle</span> Tandai Lunas
                            </button>
                          </div>
                        </div>
                      ))
                )}

                {activeTab === 'owed' && (
                  owedList.length === 0
                    ? <p className="text-on-surface-variant text-sm font-body text-center py-8">Tidak ada piutang aktif.</p>
                    : owedList.map((item) => (
                        <div key={item.expense_split_id} className="bg-surface-container-lowest p-6 rounded-[1.5rem] flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xl">
                              {item.from_user_name[0]}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-on-surface leading-tight font-headline">{item.from_user_name}</h3>
                              <p className="text-xs text-on-surface-variant font-medium mt-1 font-body">Grup: <span className="text-primary">{item.group_name}</span></p>
                              <p className="text-xs text-on-surface-variant mt-1 font-body">{item.expense_title}</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end justify-center">
                            <span className="text-xl font-extrabold text-[#1D9E75] tracking-tight font-headline">{formatRupiah(item.amount)}</span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-secondary-container text-on-secondary-container mt-2 w-fit font-body">{item.status}</span>
                          </div>
                          <div className="flex items-center gap-2 sm:ml-4">
                            <button
                              onClick={() => handleBuzzer(item.expense_id, item.from_user_id)}
                              className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[#E24B4A] text-[#E24B4A] hover:bg-[#E24B4A] hover:text-white transition-colors flex items-center justify-center gap-2 font-body"
                            >
                              <span className="material-symbols-outlined text-sm">notifications_active</span> Kirim Buzzer
                            </button>
                          </div>
                        </div>
                      ))
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <SettleUpModal
        isOpen={isSettleModalOpen}
        onClose={() => setIsSettleModalOpen(false)}
        defaultContact={settleData.contact}
        defaultAmount={settleData.amount}
        toUserId={settleData.toUserId}
        groupId={settleData.groupId}
        onSuccess={fetchData}
      />
      <AddFriendModal isOpen={isAddFriendModalOpen} onClose={() => setIsAddFriendModalOpen(false)} onSuccess={fetchData} />
      <NewExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} />
      <BottomNav onAddClick={() => setIsExpenseModalOpen(true)} />
    </div>
  );
};

export default DebtTracking;
