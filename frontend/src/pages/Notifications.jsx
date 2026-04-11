import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import NewExpenseModal from '../components/ui/NewExpenseModal';

const Notifications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

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

            {/* AI Insight Notification (Primary Focus) */}
            <div className="group relative overflow-hidden bg-surface-container-low rounded-3xl p-6 transition-all hover:bg-surface-container hover:-translate-y-1 cursor-pointer">
              <div className="flex gap-5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container">
                    <span className="material-symbols-outlined text-3xl">psychology</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-4 border-surface-container-low group-hover:border-surface-container"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-lg text-on-surface font-headline">AI Insight Ready</h4>
                    <span className="text-xs font-medium text-on-surface-variant opacity-60 font-body">2m ago</span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-4 font-body">Strategi baru terdeteksi: Kamu bisa hemat Rp250.000 bulan depan dengan menggabungkan langganan streaming kamu ke paket keluarga.</p>
                  <div className="flex gap-3">
                    <button className="px-5 py-2 bg-primary text-on-primary rounded-full text-xs font-bold hover:shadow-lg transition-all font-body">Lihat Detail</button>
                    <button className="px-5 py-2 text-primary text-xs font-bold hover:bg-white/50 rounded-full transition-all font-body">Abaikan</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Debt Reminder (Secondary Focus) */}
            <div className="bg-surface rounded-3xl p-6 border border-outline-variant/10 transition-all hover:bg-surface-container-low cursor-pointer">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-3xl">payments</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-lg text-on-surface font-headline">Reminder: Tagihan Makan Siang</h4>
                    <span className="text-xs font-medium text-on-surface-variant opacity-60 font-body">1h ago</span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-body">Bayu Aji belum membayar tagihan 'Ramen Gion' sebesar Rp85.000. Kirim pengingat?</p>
                  <div className="mt-4 flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-secondary text-secondary rounded-full text-xs font-bold hover:bg-secondary hover:text-white transition-all font-body">
                      <span className="material-symbols-outlined text-sm">send</span>
                      Kirim Buzzer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Confirmed */}
            <div className="bg-surface rounded-3xl p-6 border border-outline-variant/10 transition-all hover:bg-surface-container-low cursor-pointer">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-lg text-on-surface font-headline">Pembayaran Diterima</h4>
                    <span className="text-xs font-medium text-on-surface-variant opacity-60 font-body">3h ago</span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-body">Siska telah membayar tagihan 'Tiket Konser' sebesar Rp1.200.000. Saldo kamu telah diperbarui.</p>
                </div>
              </div>
            </div>

            {/* Group Invite */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-primary/5 transition-all hover:bg-surface-container-low cursor-pointer">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">group_add</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-lg text-on-surface font-headline">Undangan Grup Baru</h4>
                    <span className="text-xs font-medium text-on-surface-variant opacity-60 font-body">Yesterday</span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-body">Dimas mengundangmu ke grup <span className="font-bold text-primary">'Road Trip Bali 2026'</span>. Kelola pengeluaran perjalananmu bersama!</p>
                  <div className="mt-4 flex gap-3">
                    <button className="px-6 py-2 bg-primary-container text-on-primary rounded-full text-xs font-bold transition-all font-body">Terima</button>
                    <button className="px-6 py-2 border border-outline-variant text-on-surface-variant rounded-full text-xs font-bold transition-all font-body">Tolak</button>
                  </div>
                </div>
              </div>
            </div>

            {/* System Security */}
            <div className="bg-surface rounded-3xl p-6 border border-outline-variant/10 transition-all hover:bg-surface-container-low cursor-pointer">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-error-container flex items-center justify-center text-on-error-container">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-lg text-on-surface font-headline">Keamanan: Login Baru</h4>
                    <span className="text-xs font-medium text-on-surface-variant opacity-60 font-body">2 days ago</span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-body">Login terdeteksi dari perangkat MacOS di Jakarta, Indonesia. Jika ini bukan kamu, segera amankan akunmu.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Floating Summary Context */}
          <div className="mt-12 p-8 bg-surface-container rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2 font-body">Statistik Notifikasi</p>
                <h4 className="text-2xl font-black text-on-surface font-headline">3 Tagihan Menunggu Konfirmasi</h4>
                <p className="text-on-surface-variant text-sm font-body">Total Rp425.000 perlu divalidasi hari ini.</p>
              </div>
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all font-body">
                Berikan Konfirmasi Massal
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav onAddClick={() => setIsExpenseModalOpen(true)} />
      <NewExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} />
    </div>
  );
};

export default Notifications;
