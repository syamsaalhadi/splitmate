import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen">
        <TopAppBar searchPlaceholder="Search accounts..." onMenuClick={() => setSidebarOpen(true)} />
        {/* Profile Hero Section */}
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-12">
          <div className="relative flex flex-col items-center mb-16 text-center">
            {/* Large Centered User Avatar */}
            <div className="relative mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary-container p-1 ring-4 ring-primary/10">
                <img alt="Alex Thompson" className="w-full h-full rounded-full object-cover shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUIGjw1pagkErh0psyRo28u0c9ZStW52dczHLoPHO2gxJCXADK0IDtpwDTZe_6ke2PNfuB2xBJvQlsQhb1nV7d1Ukwk7_wrHv8c1A7VU5T6djQkwbmOJ-0MEjMtftQB_5r-dep3yZSGTZuzVZXLbtxjqyfndEAzuKBfZCr7zJ9u0QSXVVVltupnSJg0lPaCipJjKf3AyIUS9mihCIjZU0MihQhq_9HZHUd8FBYOPyrv6X_sAieWvF5GMDkptL3KfvE9Jh82exy9Zs" />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-secondary text-on-secondary rounded-full shadow-lg border-4 border-surface hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-2 tracking-tight font-headline">Alex Thompson</h2>
            <p className="text-on-surface-variant font-medium mb-1 font-body">alex.thompson@fluidledger.com</p>
            <p className="text-sm text-outline px-4 py-1 bg-surface-container-high rounded-full font-body">Member since Oct 2023</p>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-surface-container-low p-8 rounded-xl flex flex-col items-center justify-center text-center transition-all hover:bg-surface-container-high group">
              <span className="material-symbols-outlined text-primary mb-3 text-3xl opacity-60 group-hover:opacity-100 transition-opacity">groups</span>
              <span className="text-3xl font-black text-on-surface mb-1 font-headline">12</span>
              <span className="text-sm font-bold text-outline-variant uppercase tracking-widest font-body">Groups Joined</span>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl flex flex-col items-center justify-center text-center transition-all hover:bg-surface-container-high group">
              <span className="material-symbols-outlined text-secondary mb-3 text-3xl opacity-60 group-hover:opacity-100 transition-opacity">swap_horiz</span>
              <span className="text-3xl font-black text-on-surface mb-1 font-headline">156</span>
              <span className="text-sm font-bold text-outline-variant uppercase tracking-widest font-body">Transactions</span>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl flex flex-col items-center justify-center text-center transition-all hover:bg-surface-container-high group border-2 border-transparent hover:border-secondary-container">
              <span className="material-symbols-outlined text-on-tertiary-fixed-variant mb-3 text-3xl opacity-60 group-hover:opacity-100 transition-opacity">trending_up</span>
              <span className="text-3xl font-black text-on-surface mb-1 font-headline">850</span>
              <span className="text-sm font-bold text-outline-variant uppercase tracking-widest font-body">Financial Score</span>
            </div>
          </div>

          {/* Settings Menu List */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-on-surface mb-6 px-2 font-headline">Account Settings</h3>
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden divide-y divide-surface-container">

              {/* Edit Profile */}
              <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container transition-colors group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <span className="font-bold text-on-surface font-body">Edit Profil</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </button>

              {/* Notifikasi */}
              <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container transition-colors group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                    <span className="material-symbols-outlined">notifications</span>
                  </div>
                  <span className="font-bold text-on-surface font-body">Notifikasi</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </button>

              {/* Keamanan */}
              <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container transition-colors group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-on-surface-variant group-hover:bg-on-background group-hover:text-surface transition-all">
                    <span className="material-symbols-outlined">lock</span>
                  </div>
                  <span className="font-bold text-on-surface font-body">Keamanan</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </button>

              {/* Bantuan */}
              <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container transition-colors group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed group-hover:bg-tertiary group-hover:text-on-tertiary transition-all">
                    <span className="material-symbols-outlined">help</span>
                  </div>
                  <span className="font-bold text-on-surface font-body">Bantuan</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </button>

              {/* Tentang Aplikasi */}
              <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container transition-colors group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
                    <span className="material-symbols-outlined">info</span>
                  </div>
                  <span className="font-bold text-on-surface font-body">Tentang Aplikasi</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </button>

              {/* Keluar */}
              <button className="w-full flex items-center justify-between p-5 hover:bg-error-container transition-colors group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#E24B4A] shadow-sm">
                    <span className="material-symbols-outlined">logout</span>
                  </div>
                  <span className="font-bold text-[#E24B4A] font-body">Keluar</span>
                </div>
                <span className="material-symbols-outlined text-[#E24B4A] opacity-50">chevron_right</span>
              </button>

            </div>
          </div>
        </section>

        {/* Footer Accent */}
        <footer className="mt-20 py-8 px-6 border-t border-surface-container-high text-center">
          <p className="text-xs text-outline uppercase tracking-[0.2em] font-bold font-body">SplitMate x The Fluid Ledger</p>
          <p className="text-xs text-outline-variant mt-2 font-body">© 2026 Alex Thompson Personal Account</p>
        </footer>
      </main>
    </div>
  );
};

export default Profile;
