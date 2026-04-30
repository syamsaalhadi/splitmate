import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import NewExpenseModal from '../components/ui/NewExpenseModal';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const SettingRow = ({ icon, iconBg, iconColor, label, onClick, danger = false, children, expanded }) => (
  <div className="divide-y divide-surface-container">
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-5 transition-colors group text-left ${danger ? 'hover:bg-error/5' : 'hover:bg-surface-container'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${iconBg} ${iconColor}`}>
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        <span className={`font-semibold font-body ${danger ? 'text-error' : 'text-on-surface'}`}>{label}</span>
      </div>
      <span className={`material-symbols-outlined transition-transform duration-200 ${danger ? 'text-error/50' : 'text-outline-variant'} ${expanded ? 'rotate-90' : ''}`}>
        chevron_right
      </span>
    </button>
    {expanded && (
      <div className="px-5 pb-5 pt-4 bg-surface-container/40">
        {children}
      </div>
    )}
  </div>
);

const Settings = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const [nameForm, setNameForm] = useState({ value: user?.name || '', loading: false, error: '', success: false });

  const toggle = (key) => setExpanded(prev => prev === key ? null : key);

  const handleUpdateName = async () => {
    if (!nameForm.value.trim()) {
      setNameForm(f => ({ ...f, error: 'Nama tidak boleh kosong' }));
      return;
    }
    setNameForm(f => ({ ...f, loading: true, error: '', success: false }));
    try {
      const res = await api.patch('/users/me', { name: nameForm.value.trim() });
      if (setUser) setUser(res.data);
      setNameForm(f => ({ ...f, loading: false, success: true }));
      setTimeout(() => setNameForm(f => ({ ...f, success: false })), 2000);
    } catch (err) {
      const msg = err.response?.data?.detail || 'Gagal memperbarui nama';
      setNameForm(f => ({ ...f, loading: false, error: msg }));
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-20 md:pb-0">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="md:ml-64 min-h-screen">
        <TopAppBar searchPlaceholder="Cari pengaturan..." onMenuClick={() => setSidebarOpen(true)} />

        <section className="max-w-2xl mx-auto px-6 pt-24 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-on-surface font-headline">Pengaturan</h1>
            <p className="text-sm text-on-surface-variant font-body mt-1">Kelola akun dan preferensi kamu</p>
          </div>

          {/* Profil singkat */}
          <div className="flex items-center gap-4 bg-surface-container-low rounded-2xl p-5 mb-8">
            <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-2xl font-extrabold text-primary font-headline flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="font-bold text-on-surface font-headline">{user?.name || '—'}</p>
              <p className="text-sm text-on-surface-variant font-body">{user?.email || '—'}</p>
            </div>
          </div>

          {/* Menu */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden divide-y divide-surface-container">

            {/* Edit Profil */}
            <SettingRow
              icon="person"
              iconBg="bg-primary/10 group-hover:bg-primary"
              iconColor="text-primary group-hover:text-on-primary"
              label="Edit Profil"
              onClick={() => toggle('profil')}
              expanded={expanded === 'profil'}
            >
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant font-body mb-1 block">Nama</label>
                  <input
                    type="text"
                    value={nameForm.value}
                    onChange={e => setNameForm(f => ({ ...f, value: e.target.value, error: '' }))}
                    className="w-full bg-surface-container-high border border-transparent focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition font-body"
                    placeholder="Nama lengkap"
                  />
                  {nameForm.error && <p className="text-error text-xs mt-1 font-body">{nameForm.error}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant font-body mb-1 block">Email</label>
                  <input
                    type="text"
                    value={user?.email || ''}
                    disabled
                    className="w-full bg-surface-container border border-transparent rounded-xl px-4 py-3 text-sm text-outline outline-none font-body cursor-not-allowed"
                  />
                  <p className="text-xs text-outline-variant mt-1 font-body">Email tidak dapat diubah</p>
                </div>
                <button
                  onClick={handleUpdateName}
                  disabled={nameForm.loading}
                  className="w-full bg-primary text-on-primary font-bold py-3 rounded-full text-sm transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60 font-body"
                >
                  {nameForm.loading ? 'Menyimpan...' : nameForm.success ? 'Tersimpan!' : 'Simpan Perubahan'}
                </button>
              </div>
            </SettingRow>

            {/* Notifikasi */}
            <SettingRow
              icon="notifications"
              iconBg="bg-secondary/10 group-hover:bg-secondary"
              iconColor="text-secondary group-hover:text-on-secondary"
              label="Notifikasi"
              onClick={() => toggle('notif')}
              expanded={expanded === 'notif'}
            >
              <div className="space-y-4">
                {[
                  { label: 'Pengeluaran baru di grup', desc: 'Notifikasi saat ada expense ditambahkan' },
                  { label: 'Pengingat utang', desc: 'Ingatkan jika masih ada utang belum lunas' },
                  { label: 'Settlement diterima', desc: 'Notifikasi saat ada pembayaran masuk' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-on-surface font-body">{item.label}</p>
                      <p className="text-xs text-on-surface-variant font-body">{item.desc}</p>
                    </div>
                    <div className="w-10 h-6 bg-surface-container-high rounded-full flex items-center px-1 cursor-not-allowed opacity-40">
                      <div className="w-4 h-4 bg-outline rounded-full"></div>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-outline font-body pt-2">Fitur notifikasi segera hadir.</p>
              </div>
            </SettingRow>

            {/* Keamanan */}
            <SettingRow
              icon="lock"
              iconBg="bg-surface-container-high group-hover:bg-on-background"
              iconColor="text-on-surface-variant group-hover:text-surface"
              label="Keamanan"
              onClick={() => toggle('keamanan')}
              expanded={expanded === 'keamanan'}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-surface-container rounded-xl">
                  <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                  <div>
                    <p className="text-sm font-semibold text-on-surface font-body">Sesi Aman</p>
                    <p className="text-xs text-on-surface-variant font-body">Login menggunakan cookie terenkripsi (httpOnly)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-container rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-xl">lock</span>
                  <div>
                    <p className="text-sm font-semibold text-on-surface font-body">Ganti Password</p>
                    <p className="text-xs text-on-surface-variant font-body">Fitur segera hadir</p>
                  </div>
                </div>
              </div>
            </SettingRow>

            {/* Bantuan */}
            <SettingRow
              icon="help"
              iconBg="bg-tertiary-fixed/30 group-hover:bg-tertiary"
              iconColor="text-on-tertiary-fixed group-hover:text-on-tertiary"
              label="Bantuan"
              onClick={() => toggle('bantuan')}
              expanded={expanded === 'bantuan'}
            >
              <div className="space-y-3 text-sm font-body text-on-surface-variant">
                {[
                  { q: 'Bagaimana cara menambah anggota grup?', a: 'Buka detail grup lalu ketuk tombol "Tambah Anggota" dan masukkan email.' },
                  { q: 'Bagaimana cara catat pengeluaran?', a: 'Tekan tombol + di navigasi bawah, isi detail pengeluaran dan pilih grup.' },
                  { q: 'Bagaimana cara melunasi utang?', a: 'Buka halaman Debt Tracking, pilih utang, lalu tekan "Bayar".' },
                ].map(item => (
                  <div key={item.q} className="p-3 bg-surface-container rounded-xl">
                    <p className="font-semibold text-on-surface mb-1">{item.q}</p>
                    <p className="text-xs">{item.a}</p>
                  </div>
                ))}
              </div>
            </SettingRow>

            {/* Tentang */}
            <SettingRow
              icon="info"
              iconBg="bg-primary-fixed/30 group-hover:bg-primary-container"
              iconColor="text-on-primary-fixed-variant group-hover:text-on-primary-container"
              label="Tentang Aplikasi"
              onClick={() => toggle('tentang')}
              expanded={expanded === 'tentang'}
            >
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between py-2 border-b border-surface-container">
                  <span className="text-on-surface-variant">Versi</span>
                  <span className="font-semibold text-on-surface">1.0.0</span>
                </div>
                <div className="flex justify-between py-2 border-b border-surface-container">
                  <span className="text-on-surface-variant">Dibuat oleh</span>
                  <span className="font-semibold text-on-surface">CC26-PSU310</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-on-surface-variant">Tahun</span>
                  <span className="font-semibold text-on-surface">2026</span>
                </div>
                <p className="text-xs text-outline pt-2">SplitMate — Precision Fluidity in Finance.</p>
              </div>
            </SettingRow>

            {/* Keluar */}
            <SettingRow
              icon="logout"
              iconBg="bg-error/10"
              iconColor="text-error"
              label="Keluar"
              onClick={handleLogout}
              danger
            />

          </div>
        </section>
      </main>

      <BottomNav onAddClick={() => setIsExpenseModalOpen(true)} />
      <NewExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} />
    </div>
  );
};

export default Settings;
