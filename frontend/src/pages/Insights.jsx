import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import NewExpenseModal from '../components/ui/NewExpenseModal';

const Insights = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-on-surface min-h-screen pb-20 md:pb-0">
      <TopAppBar searchPlaceholder="Search transactions..." onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen pt-24 p-8 lg:p-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-primary mb-2 font-headline">Insight Keuangan</h1>
            <p className="text-on-surface-variant font-medium font-body">Analisis cerdas pengeluaran harianmu.</p>
          </div>
          <div className="relative inline-block">
            <button className="flex items-center gap-3 px-5 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-full shadow-sm hover:shadow-md transition-all font-body">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              <span className="font-bold text-sm">Oktober 2026</span>
              <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
            </button>
          </div>
        </header>

        {/* Top Stat Cards (Bento Style) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-primary/10">
            <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-4 font-body">Total Pengeluaran Bulan Ini</p>
            <div className="flex items-baseline gap-1">
              <span className="text-primary font-headline text-3xl font-extrabold">Rp 3.450.000</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-error text-xs font-bold font-body">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+12.5% dari bulan lalu</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-secondary/10">
            <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-4 font-body">Kategori Terbesar</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-secondary font-headline text-3xl font-extrabold">Makan</span>
                <p className="text-on-surface-variant text-sm mt-1 font-body">Rp 1.200.000</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-primary text-white p-6 rounded-xl shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <p className="text-primary-fixed-dim text-xs font-bold uppercase tracking-wider font-body">Prediksi Bulan Depan</p>
                <span className="bg-[#1D9E75] text-white text-[10px] px-2 py-0.5 rounded font-black tracking-widest font-body">AI</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-3xl font-extrabold">Rp 3.100.000</span>
              </div>
              <p className="mt-4 text-primary-fixed-dim text-xs leading-relaxed font-body">Analisis AI memperkirakan pengeluaranmu akan turun karena tren belanja yang stabil.</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </section>

        {/* Two Column Charts/AI Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Charts & Visuals */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Donut Chart Card */}
              <div className="bg-surface-container-low p-8 rounded-xl h-full">
                <h3 className="font-headline font-bold text-lg mb-8">Spending by Category</h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-8">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" fill="transparent" r="40" stroke="#534AB7" strokeDasharray="251.2" strokeDashoffset="87.9" strokeWidth="12"></circle>
                      <circle cx="50" cy="50" fill="transparent" r="40" stroke="#006c4e" strokeDasharray="251.2" strokeDashoffset="200.9" strokeWidth="12"></circle>
                      <circle cx="50" cy="50" fill="transparent" r="40" stroke="#3b309e" strokeDasharray="251.2" strokeDashoffset="150.7" strokeWidth="12"></circle>
                      <circle cx="50" cy="50" fill="transparent" r="40" stroke="#f7cc58" strokeDasharray="251.2" strokeDashoffset="213.5" strokeWidth="12"></circle>
                      <circle cx="50" cy="50" fill="transparent" r="40" stroke="#c8c4d5" strokeDasharray="251.2" strokeDashoffset="238.6" strokeWidth="12"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs text-on-surface-variant font-bold font-body">TOTAL</span>
                      <span className="text-lg font-black text-primary font-headline">100%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-xs font-medium font-body">Makan (35%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary"></div>
                      <span className="text-xs font-medium font-body">Belanja (20%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                      <span className="text-xs font-medium font-body">Transport (20%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#f7cc58]"></div>
                      <span className="text-xs font-medium font-body">Hiburan (15%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
                      <span className="text-xs font-medium font-body">Lainnya (10%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Chart Card */}
              <div className="bg-surface-container-low p-8 rounded-xl h-full flex flex-col">
                <h3 className="font-headline font-bold text-lg mb-8">Monthly Spending Trend</h3>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-end justify-between h-40 gap-2 mb-4">
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="w-full bg-surface-container-highest rounded-t-lg h-[40%]"></div>
                      <span className="text-[10px] font-bold text-on-surface-variant font-body">Mei</span>
                    </div>
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="w-full bg-surface-container-highest rounded-t-lg h-[55%]"></div>
                      <span className="text-[10px] font-bold text-on-surface-variant font-body">Jun</span>
                    </div>
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="w-full bg-surface-container-highest rounded-t-lg h-[45%]"></div>
                      <span className="text-[10px] font-bold text-on-surface-variant font-body">Jul</span>
                    </div>
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="w-full bg-surface-container-highest rounded-t-lg h-[70%]"></div>
                      <span className="text-[10px] font-bold text-on-surface-variant font-body">Agu</span>
                    </div>
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="w-full bg-surface-container-highest rounded-t-lg h-[60%]"></div>
                      <span className="text-[10px] font-bold text-on-surface-variant font-body">Sep</span>
                    </div>
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="w-full bg-primary rounded-t-lg h-[85%]"></div>
                      <span className="text-[10px] font-bold text-primary font-body">Okt</span>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-outline-variant/30">
                    <p className="text-xs text-on-surface-variant leading-relaxed font-body">Pengeluaranmu mencapai puncaknya di <span className="text-primary font-bold">Oktober</span>. Pertimbangkan untuk mereview biaya langganan aktif.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations Section */}
            <div className="space-y-4">
              <h3 className="font-headline font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1D9E75]">auto_awesome</span>
                AI Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recommendation 1 */}
                <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 flex gap-4 hover:border-primary/30 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined">movie</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 font-headline">Limit Hiburan</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed font-body">Pengeluaran hiburanmu naik 30% bulan ini — coba batasi budget nonton ya!</p>
                  </div>
                </div>

                {/* Recommendation 2 */}
                <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 flex gap-4 hover:border-secondary/30 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-secondary/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined">savings</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 font-headline">Target Menabung</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed font-body">Kamu bisa hemat Rp 500rb jika mengurangi jajan kopi minggu depan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Financial Score & Profile Summary */}
          <div className="lg:col-span-4 space-y-8">
            {/* Financial Score Card */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-xl border border-outline-variant/10 text-center flex flex-col items-center">
              <h3 className="font-headline font-bold text-lg mb-8">Financial Score</h3>
              <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-[225deg]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="transparent" r="42" stroke="#e5e1eb" strokeDasharray="197.9 263.9" strokeLinecap="round" strokeWidth="8"></circle>
                  <circle cx="50" cy="50" fill="transparent" r="42" stroke="#534AB7" strokeDasharray="162.3 263.9" strokeLinecap="round" strokeWidth="8"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-primary font-headline">82</span>
                  <span className="text-sm font-bold text-secondary tracking-widest uppercase mt-1 font-body">Baik</span>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed px-4 font-body">
                Skor finansialmu di atas rata-rata pengguna seumuranmu. <span className="text-primary font-bold">Pertahankan!</span>
              </p>
              <button className="mt-8 text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all font-body">
                Lihat Detail Analisis
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Shared Bill Status */}
            <div className="bg-primary-container text-white p-8 rounded-xl overflow-hidden relative">
              <h4 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-6 font-body">Status Patungan</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS8FhnpPn2T_2AHsIFxfOlpxs3_Rvr48b9Nf5fnNCIssQ2_HSffcbFiMc_KLpyuhGlQY3WFjuebiV9RVyaKWBjzRVr0If4AO4YXLZ0LXSrQEJZIJV6F8YcigFT7zBT_XjYkpiH9gXPWwDBoCyJyiCZEC1kG81KeOAgqwyQ510zOBK_Yg_wJFDWTX8Os4vNBEGW_TUn3hpJJjzVPwgNHUhq2bQonAYe2NjHNqLhhjtk1OXDL4v0Z2pO4kihQv0K2lO6GBQTFsQwNJQ" />
                    <span className="text-sm font-medium font-body">Budi</span>
                  </div>
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full font-body">Rp 120.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnolPy9jAyrl5xyu5R9XK-jXJOvRYpDOiu0ikfwJ2boZBrINQxkxh9jyFfPmMPHrjkw4vCa5ld6tsrvCFmJMGPrZsN0qgnIcqAO2OwbOQU4LN9tpyuViMS4g7Cq_SuO_UNinLvCseGTbMpSu0PGWsnl1RMJVed3lyUekIUxyWqtIdySHTyc6Ol1fuJRRCQ4W3S2HZT1C4i133YZooy-g7e_RGEOSRrhyaKxNFmFH_OqN636aiBd2YcQzOmd-KFE4i0dx42OUXRdmM" />
                    <span className="text-sm font-medium font-body">Sarah</span>
                  </div>
                  <span className="text-xs font-bold text-secondary-container font-body">Lunas</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[10px] text-primary-fixed uppercase tracking-widest font-bold mb-2 font-body">Total Piutang</p>
                <p className="text-2xl font-black tracking-tight font-headline">Rp 450.000</p>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary opacity-20 rounded-full blur-3xl"></div>
            </div>

            {/* Transaction History Card */}
            <div className="bg-surface-container-low p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-sm font-headline">Aktivitas Terakhir</h4>
                <span className="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer">more_horiz</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-xl">shopping_bag</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold font-body">Uniqlo Store</p>
                    <p className="text-[10px] text-on-surface-variant font-body">Hari ini, 14:20</p>
                  </div>
                  <span className="text-xs font-bold text-error font-body">- Rp 299k</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-xl">coffee</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold font-body">Starbucks Coffee</p>
                    <p className="text-[10px] text-on-surface-variant font-body">Kemarin, 09:15</p>
                  </div>
                  <span className="text-xs font-bold text-error font-body">- Rp 55k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Live Split Status — hidden on mobile to avoid overlap with BottomNav */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <div className="backdrop-blur-xl bg-surface-container-high/70 p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4">
          <div className="flex -space-x-3">
            <img alt="Member" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaW3hofk_5vwUmr7fMUNiPttCru_3rrkp2h6y9d_jvXWVtfdKMc7rzCtbFPb8RjbOkSeS9wX2FUr0BOL_4pM8LszOgZyxX3DKrwqXIFDq3j68tCUQ2EYour6Tj0x154DpG8efT0yWKIJL0gfjyEeHScIZgEJW-JtHVFg1sFGSuQaPqO9jdpasBqodTukE5PBI8jrzNKx6CLbqVRoZv_pV6wrZKbXwoogSqCDja3heKe0n_oWJ5EwVUlcPBhqO09FN80JqielFjRvo" />
            <img alt="Member" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJcSvUlmNYi_8FV5zFXf3WTMwFWeJBboriv3XYhC3U0liLE7uCsI22w2WVFnzszrnXl4TSlhRGXQfum9LUVnchKDUNXLTR9zHNKUuMWdt22eGUcbmFZbe-qtmar45bRwHiCI_x38aS22WJSOi5bwL0QEhpXNavD2khHLqcEwNpqVVml4v9FIvkbHf9rDU0LI51_Vu3N5aThUqEv99nOObGAitFW16Y0AI-Prvv1FusfAg7SazFq5wY-36JzJ7vrDBtzdVdD9HqK_w" />
            <div className="w-8 h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">+2</div>
          </div>
          <div className="h-8 w-px bg-outline-variant/30"></div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-body">Live Split Math</p>
            <p className="text-sm font-black text-primary font-headline">Rp 125.000 <span className="text-[10px] text-on-surface-variant font-normal">per orang</span></p>
          </div>
          <button className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 active:scale-95 transition-transform">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </div>
      </div>

      <BottomNav onAddClick={() => setIsExpenseModalOpen(true)} />
      <NewExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} />
    </div>
  );
};

export default Insights;
