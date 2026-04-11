import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import NewExpenseModal from '../components/ui/NewExpenseModal';
import CreateGroupModal from '../components/ui/CreateGroupModal';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

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
              <p className="text-on-surface-variant mt-1 font-body">Halo Alex, ini performa pengeluaranmu bulan ini.</p>
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
                <span className="text-3xl font-bold font-headline">12</span>
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined">layers</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary-container text-on-primary-container rounded-3xl shadow-md">
              <span className="text-on-primary-container/80 text-sm font-medium font-body">Utang Saya</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold font-headline">Rp 450.000</span>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">trending_down</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-secondary text-on-secondary rounded-3xl shadow-md">
              <span className="text-on-secondary/80 text-sm font-medium font-body">Piutang Saya</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold font-headline">Rp 1.200.000</span>
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
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-on-surface font-headline">Grup Terbaru</h2>
                <Link to="/groups" className="text-primary font-semibold text-sm hover:underline font-body">Lihat Semua</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Group Card 1 */}
                <Link to="/groups/makan-malam-jumat" className="block p-5 bg-surface-container-low rounded-3xl hover:bg-surface-container-high transition-colors group cursor-pointer border border-outline-variant/5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-indigo-600">restaurant</span>
                    </div>
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-wider">Lunas</span>
                  </div>
                  <h3 className="font-bold text-lg text-on-surface mb-1 font-headline">Makan Malam Jumat</h3>
                  <p className="text-slate-500 text-xs mb-4 font-body">6 Anggota • Update 2 jam lalu</p>
                  <div className="flex justify-between items-end">
                    <div className="flex -space-x-2">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFRJxPh9H80JV1KqV4eWZIhTOAo9LvtlFe2tBpkgEZgXFb0o0LRmAq0J4CpL-CX57b52oFAyCYvEL1V7eK-ZhwDU9Toh_ZOlI59Aj0UnDP5DGXNwYEHELF3vEr9zds1G8WthY6O7_ZnrH7JF5RK5N4bJylBoq8y1SkzGtxAUkSZoc-Ph-bhghawVfEusOzgDc9_GKQSJRkXzw1K_aAg-OXie6_vB-c4gVjK_XSzzCFA7JEfrR-Ji01cAs9yrLb2abisjWRhi70qlc" alt="member" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTaxCdGZaEQjqOFXmMaCBYzanJROt0EBRMUKREQajaoI1UJv46OLbdnBErj8Qy91LoIkGxfqtoZ_TjR6aFl4NV87CO3rp7VUf4RzOcqHaS2zjaMALm_NFmOkTncuju50mp9IEI94JsXp7Lpz3VDKmzAapKy6mCDFGOx0Dr4BhLdNjW7ES_luQrc5cKgR1xhQbSn0hTJpL_Bwb-756hM_BCuv8d3Vy90N0aC__o1O0VzpNlZsQ1OnBH5qVgpzXBy23YEHJ5UysEInw" alt="member" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">+4</div>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase font-body">Total</span>
                      <span className="font-bold text-on-surface font-headline">Rp 840.000</span>
                    </div>
                  </div>
                </Link>

                {/* Group Card 2 */}
                <Link to="/groups/liburan-bali" className="block p-5 bg-surface-container-low rounded-3xl hover:bg-surface-container-high transition-colors group cursor-pointer border border-outline-variant/5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-indigo-600">flight</span>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Belum Lunas</span>
                  </div>
                  <h3 className="font-bold text-lg text-on-surface mb-1 font-headline">Liburan Bali 2026</h3>
                  <p className="text-slate-500 text-xs mb-4 font-body">4 Anggota • Update 1 hari lalu</p>
                  <div className="flex justify-between items-end">
                    <div className="flex -space-x-2">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC47A4yLIZRpJUgTeiJtV_TPtssSDUrGebKG3K9fvo9S6hiU_p5bjwHDHT3WvvenQWLeBtaugUNS61y3HsuEJ27cktsCrmSbVhKowoWO0A0f1U1RUjdghtsAqEl1mfmqMrvpo5iAxXmV6ukNfkypgUu2BazkqiEKqqBcYtXJbhWhXIT_zMPf7vrTnUl-BkWKChaudw6AdcmEGOB8CAk3BPoZDx2QuScMPQMtCldv1wL2ry3ZYVv9ri3s9dVOhkEvA2JP3JI3eHPZV4" alt="member" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBof5LQmu7-g1LDL3ZK3lfq8jznhI019F0VqAy-GF9Gqh9HBf-7nuPTis1bqHUdEnD01R7FhRwcJUe3DglB4TeHFO2ojMRQ57ZF5HAGyOK1hhXkTXf6OsOfcSwSyz4pjmOmCFJKXdbBnbOqxtLSjzWgIJsvhBNsCec0XVxnWKfwTirGQFbrDgr6LQd3J3m33D_VL6ZXdoklQ6kN4k_485nqusFIc1iObkfAnaZrU7KcVDIOkg144d0zn8IWXaVTN8iNxrrVSjs91IQ" alt="member" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">+2</div>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase font-body">Total</span>
                      <span className="font-bold text-on-surface font-headline">Rp 5.420.000</span>
                    </div>
                  </div>
                </Link>

                {/* Group Card 3 */}
                <Link to="/groups/listrik-wifi-kos" className="block p-5 bg-surface-container-low rounded-3xl hover:bg-surface-container-high transition-colors group cursor-pointer border border-outline-variant/5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-indigo-600">home</span>
                    </div>
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-wider">Lunas</span>
                  </div>
                  <h3 className="font-bold text-lg text-on-surface mb-1 font-headline">Listrik & WiFi Kos</h3>
                  <p className="text-slate-500 text-xs mb-4 font-body">3 Anggota • Update 3 hari lalu</p>
                  <div className="flex justify-between items-end">
                    <div className="flex -space-x-2">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRXutCxxo4-VJ3wwdUXjZCBkznLzko4390qmUxJ47anHr-CIQp0KknwtGME-IZ_lWGSCWFG5siGEgz9FUTnkmaQ-pLjKReTbwuTf5dD45k7n2V3RXxzm1CkLDxmj8Wf0sXVLUQ7zVHlvKONJ1csGHZkmVKjSnI49GC_QNB9jrgHnq8dXKlfp6C4aQ6-mGfXsevyVDB6cOyNUACscDAyQ0sFdgMXIEmn3ajBfMXbkpGqlATmsmYNelGsmlYfuzn1apZA_nVUQkliG4" alt="member" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">+2</div>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase font-body">Total</span>
                      <span className="font-bold text-on-surface font-headline">Rp 1.250.000</span>
                    </div>
                  </div>
                </Link>
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
                  {/* Activity 1 */}
                  <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-surface-container-highest rounded-2xl flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">restaurant</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-on-surface font-headline">Nasi Goreng Kambing</h4>
                      <p className="text-[10px] text-slate-500 font-body">Makan Malam Jumat • 12 Okt</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-bold text-error font-body">-Rp 45.000</span>
                      <span className="text-[10px] text-slate-400 font-medium font-body">Split 3 orang</span>
                    </div>
                  </div>

                  {/* Activity 2 */}
                  <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-secondary-container/30 rounded-2xl flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-on-surface font-headline">Pembayaran WiFi</h4>
                      <p className="text-[10px] text-slate-500 font-body">Listrik & WiFi Kos • 10 Okt</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-bold text-secondary font-body">+Rp 150.000</span>
                      <span className="text-[10px] text-slate-400 font-medium font-body">Diterima</span>
                    </div>
                  </div>

                  {/* Activity 3 */}
                  <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-surface-container-highest rounded-2xl flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">commute</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-on-surface font-headline">Grab Car Bandara</h4>
                      <p className="text-[10px] text-slate-500 font-body">Liburan Bali 2026 • 08 Okt</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-bold text-error font-body">-Rp 120.000</span>
                      <span className="text-[10px] text-slate-400 font-medium font-body">Split 4 orang</span>
                    </div>
                  </div>
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
      <CreateGroupModal isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
