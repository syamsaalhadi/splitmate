import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import CreateGroupModal from '../components/ui/CreateGroupModal';
import NewExpenseModal from '../components/ui/NewExpenseModal';
import { Link } from 'react-router-dom';

const Groups = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Group 1 */}
            <Link to="/groups/liburan-bali" className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-highest hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 transition-all group duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary-container/20 text-primary flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl">flight_takeoff</span>
              </div>
              <h3 className="font-bold text-xl font-headline mb-1 group-hover:text-primary transition-colors">Liburan Bali 2026</h3>
              <p className="text-sm font-medium text-on-surface-variant font-body mb-6">4 members</p>
              
              <div className="flex justify-between items-end pb-4 border-b border-surface-container-high mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-body">Total Spending</span>
                <span className="font-bold text-primary font-headline">Rp 5.420.000</span>
              </div>
              <div className="flex -space-x-2">
                 <img alt="Member" className="w-8 h-8 rounded-full border-2 border-white bg-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKKyvRziPAhigKfHHJuIOER4dIIGrtUMPZge0uSW99z8nR0pDwsSPKeLom9FKeN7_pjErpuuDO9oEGBEEIrU_okFE5WBRKDdhzT4bZM0mc4z4LBsDGCSME9SmzUND1el2Zq71DqAjQrQS-kelgD-reEnxdaFNr0Otc99xzo5_1IPcclPO266bquYasMSzXJfri2BubLCgNu0cnpb0x8ATNIGnJqjYhl4brvYSkHW_6mHMVI7vuP9fZNatkWBWBG_IJ3llbXN-Etkg" />
                 <img alt="Member" className="w-8 h-8 rounded-full border-2 border-white bg-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcIWoDnJ_7eVSvU7w8fPVUrV08VaAamrkl09j3hnzKVbuuaO5Uzwa1Yq-r2M61WjBRVe9KIufy_TrSNM9HNYU3dVm9sBbj_lzPMuhMeEX8qmyJtKaCRKL86501byNQlIAv3w5eQU0U3_DWWHqWryn7KooZphLFnCqtWROL8OYVeUIdU_MdLtVlI3c0Mia5LRJot8GValBbFCFwJFNEmf7vw162H7EEzq01lp42KAGjE3Com2rVyF46hmB4cRmiJP68DlHn6SSxkeY" />
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface-variant z-10">+2</div>
              </div>
            </Link>
            
            {/* Group 2 */}
            <Link to="/groups/kosan" className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-highest hover:shadow-xl hover:-translate-y-1 hover:border-secondary/20 transition-all group duration-300">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/20 text-secondary flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl">home</span>
              </div>
              <h3 className="font-bold text-xl font-headline mb-1 group-hover:text-secondary transition-colors">Iuran Kosan</h3>
              <p className="text-sm font-medium text-on-surface-variant font-body mb-6">6 members</p>
              
              <div className="flex justify-between items-end pb-4 border-b border-surface-container-high mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-body">Total Spending</span>
                <span className="font-bold text-secondary font-headline">Rp 1.200.000</span>
              </div>
              <div className="flex -space-x-2">
                 <img alt="Member" className="w-8 h-8 rounded-full border-2 border-white bg-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfTnKvL37NGJ-5fszKkecISr1x6Y5we_mNNHyH-TEc3LhljTy4wFnKWSoqnyhEExaJsMSzN831jl5IHXk3HgXU3rNrnPa3aWnKg0WiumC08v2-ccqhKO7a688uuzfFZYh5S9vq0_tlVz6NbLNU0tLO_oj7fENIagMZn6Juq8YW0sRZiXHNJs4V2MSY0HBcUDIhBFOogCJ2b9ihoxBzK0QUPiVhVUTZyJHGOA0hBffLuCm7B3avbRMSzh5yzpPwarCLbEXDXOxN_Tg" />
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface-variant z-10">+5</div>
              </div>
            </Link>
            
            {/* Empty State / Add Group */}
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/50 rounded-3xl p-6 text-on-surface-variant hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all outline-none group"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-white shadow-sm transition-all group-hover:scale-110">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <h3 className="font-bold text-lg font-headline">Buat Grup Baru</h3>
              <p className="text-xs font-body mt-1 text-center font-medium">Bagi tagihan makan, trip, atau kosan.</p>
            </button>
          </div>

        </div>
      </main>

      <BottomNav onAddClick={() => setIsExpenseModalOpen(true)} />

      <CreateGroupModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      <NewExpenseModal 
        isOpen={isExpenseModalOpen} 
        onClose={() => setIsExpenseModalOpen(false)} 
      />
    </div>
  );
};

export default Groups;
