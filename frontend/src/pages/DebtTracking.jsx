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
  const [activeTab, setActiveTab] = useState('owe');
  const [debts, setDebts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDebts = async () => {
    try {
      const res = await api.get('/users/me/debts');
      setDebts(res.data);
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDebts(); }, []);

  const handleSettleUp = (contact, amount, toUserId, groupId) => {
    setSettleData({ contact, amount, toUserId, groupId });
    setIsSettleModalOpen(true);
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
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Daftar Hutang</h1>
              <p className="text-on-surface-variant font-body">Lacak hutang dan piutang pribadi untuk pelunasan mudah.</p>
            </div>
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
              <div className="flex bg-surface-container-low p-1.5 rounded-2xl w-fit">
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
        onSuccess={fetchDebts}
      />
      <AddFriendModal isOpen={isAddFriendModalOpen} onClose={() => setIsAddFriendModalOpen(false)} />
      <NewExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} />
      <BottomNav onAddClick={() => setIsExpenseModalOpen(true)} />
    </div>
  );
};

export default DebtTracking;
