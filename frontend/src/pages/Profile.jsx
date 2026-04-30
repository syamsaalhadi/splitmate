import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import NewExpenseModal from '../components/ui/NewExpenseModal';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-20 md:pb-0">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="md:ml-64 min-h-screen">
        <TopAppBar searchPlaceholder="Search accounts..." onMenuClick={() => setSidebarOpen(true)} />

        <section className="max-w-3xl mx-auto px-6 pt-24 pb-12">
          {/* Hero Avatar */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="relative mb-5">
              <div className="w-32 h-32 rounded-full bg-primary-container ring-4 ring-primary/10 flex items-center justify-center overflow-hidden">
                {user?.avatar_url ? (
                  <img alt={user.name} className="w-full h-full object-cover" src={user.avatar_url} />
                ) : (
                  <span className="text-5xl font-extrabold text-primary font-headline">
                    {user?.name?.[0]?.toUpperCase() || '?'}
                  </span>
                )}
              </div>
              <Link
                to="/settings"
                className="absolute bottom-1 right-1 p-2 bg-secondary text-on-secondary rounded-full shadow-lg border-4 border-surface hover:scale-110 transition-transform"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </Link>
            </div>
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight font-headline mb-1">{user?.name || '—'}</h2>
            <p className="text-on-surface-variant font-medium font-body mb-2">{user?.email || '—'}</p>
            {memberSince && (
              <span className="text-xs text-outline px-4 py-1.5 bg-surface-container-high rounded-full font-body">
                Member sejak {memberSince}
              </span>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: 'groups', label: 'Groups Joined', color: 'text-primary' },
              { icon: 'swap_horiz', label: 'Transactions', color: 'text-secondary' },
              { icon: 'trending_up', label: 'Financial Score', color: 'text-tertiary' },
            ].map(({ icon, label, color }) => (
              <div key={label} className="bg-surface-container-low p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-surface-container-high transition-colors group">
                <span className={`material-symbols-outlined ${color} mb-2 text-2xl opacity-60 group-hover:opacity-100 transition-opacity`}>{icon}</span>
                <span className="text-2xl font-black text-on-surface font-headline">—</span>
                <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest font-body mt-1">{label}</span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden divide-y divide-surface-container shadow-sm">
            <Link to="/settings" className="flex items-center justify-between p-5 hover:bg-surface-container transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined">settings</span>
                </div>
                <span className="font-semibold text-on-surface font-body">Pengaturan Akun</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </Link>
            <Link to="/activity" className="flex items-center justify-between p-5 hover:bg-surface-container transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                  <span className="material-symbols-outlined">notifications</span>
                </div>
                <span className="font-semibold text-on-surface font-body">Aktivitas</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </Link>
          </div>
        </section>
      </main>

      <BottomNav onAddClick={() => setIsExpenseModalOpen(true)} />
      <NewExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} />
    </div>
  );
};

export default Profile;
