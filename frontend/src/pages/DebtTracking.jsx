import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';

const DebtTracking = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Sidebar />

      <TopAppBar searchPlaceholder="Cari teman..." />
      {/* Main Content Canvas */}
      <main className="pt-24 pb-20 md:ml-64 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

          {/* LEFT: Debt Summary & List */}
          <div className="flex-1 space-y-8">
            {/* Summary Bar (Asymmetric Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-6 rounded-[2rem] flex flex-col justify-between group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div>
                  <span className="text-on-surface-variant font-medium text-sm flex items-center gap-2 font-body">
                    <span className="material-symbols-outlined text-error text-lg">call_made</span>
                    Total Hutang Saya
                  </span>
                  <h2 className="text-3xl font-bold mt-2 text-[#E24B4A] tracking-tight font-headline">Rp 470.000</h2>
                </div>
                <div className="mt-4 flex -space-x-2">
                  <img alt="Budi" className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcHafuweslarGPzHEuNpWKWogWRssmBQc_I_-kPYRx3ysvH9SaQy-7RJL4uJlxARtFtwx6n9wg6WC6zLcfoJB46JDUZnYCT31H7pRMmvDjLF3XMGVtSk6kwy3vSScQra6wkdbGBeiph7NwmmQs-rx4n9lVw8K9C5hGze-mWfzVlz7sp30zaSyk8Grdj9CeAozE4M4y12W9Hfwyba3jjaMwnNOaDY-nHLXaqGsszVotLreuxlS7L2zZGlvWMjDG2ComhhV0SDWjHt4" />
                  <img alt="Dika" className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ8SW6FC_4Whsm-EN53nE_oZKQHSXM2a6ej1YDzkyOtnNg58q3Y7uVTvAvMme7LfS32aBe6MgPVnhSLjVuG0bARE52eZVBqELkM6rNWD14N4dIfilJptufu9PjeojnZm9tV_xm0Yf1kaTIODuGU-mSKAfX5GK2Qc16MBn_N1_RH-SguHoETjSE_VxA-YfLgjUm2R7tvreBKExD-cdVulPSoZbstJLsrO6IUqwvwVL5w3VTaC-X7Wyk1ydu9hTItO0fpOy44_qPIbs" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">+1</div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-[2rem] flex flex-col justify-between group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div>
                  <span className="text-on-surface-variant font-medium text-sm flex items-center gap-2 font-body">
                    <span className="material-symbols-outlined text-secondary text-lg">call_received</span>
                    Total Piutang Saya
                  </span>
                  <h2 className="text-3xl font-bold mt-2 text-[#1D9E75] tracking-tight font-headline">Rp 1.250.000</h2>
                </div>
                <div className="mt-4 flex -space-x-2">
                  <img alt="Citra" className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQjSp4XlHBLulJar0m-8EPxz7IuQurtyNh0X2MS01CP8O1lAoVvYF6uCQLUp3oXt0ivUBitKKdvTCk1VBe4QWj8szauGK62jwthQz88yMYqsAEMScCjdvbiZkopRKYfR-3ceAvziC2lz75GoVduWzgnJBdGUh38wXA6WNMYA2od4zevEH5mm7Lc4447EkvPF9au5WcWY_H4Gy3osCfDgxbkdeet0aQFwoSRGme_BALAYiFGow2cpg7Vm9CPw3peyHDXN2kb8MiUD8" />
                  <img alt="Eka" className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9ygQhSfaNQyzsienjx2KsWHH73PsfVdh_XLlmhFmr0x_i30jx8cC6FpEklh2XZNS6yV3qK-DU6KmsPQdTU6YOcGRNw_eGmQE87V78TzhYLJ3z_QkGCg-nUJ1VIKaQbZtzoIAu1tpG3tys7gLoszc5WQzNRH-kaEcMOGhwOfavpPWKB8kmX7pLkKofplVAnxgVWnHu86-u-Rsr-VydT7rw1ubnVidvZ5qo4GbICmV-uBQoMph0vB6MmXSZQlHd62eKA4x1pdMZDv8" />
                  <img alt="Fahmi" className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg7WTluedepTejtW2fT_56Pmuhmd2eb9L48sh6IoceztAqPMUtxAP6f2bS3FtcV5LDlyfXEvwbQrMytHtP8EMTfqogr2XB4jLfyKUMDNmdqUGTlMjBzYYkYoydlhP6Aj-1nGM92YA_Bztu6dX5iMOtIC6jBYbDRLwa-YDYNeDoCu9CQqJOpYz_PzHKlhSbbp6rU70Zoi9xUIj9jZC4Z9fZ4RIfnWVt39BA1MTHvIhAsvIV7tV9ikPD50qZRhXn0SYATuSpiggJ9aY" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">+2</div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="space-y-6">
              {/* Tabs & Filters Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex bg-surface-container-low p-1.5 rounded-2xl w-fit">
                  <button className="px-6 py-2.5 rounded-xl text-sm font-bold bg-white shadow-sm text-primary transition-all font-body">Saya Berutang (3)</button>
                  <button className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-primary transition-all font-body">Saya Diutangi (5)</button>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-outline-variant/30">
                    <span className="text-xs font-bold text-slate-400 font-body">Status:</span>
                    <select className="border-none bg-transparent p-0 text-sm font-medium focus:ring-0 text-on-surface font-body outline-none">
                      <option>Semua</option>
                      <option>Belum Lunas</option>
                      <option>Lunas</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-outline-variant/30">
                    <span className="text-xs font-bold text-slate-400 font-body">Urutkan:</span>
                    <select className="border-none bg-transparent p-0 text-sm font-medium focus:ring-0 text-on-surface font-body outline-none">
                      <option>Terbaru</option>
                      <option>Terlama</option>
                      <option>Terbesar</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Debt List */}
              <div className="space-y-4">
                {/* Card 1: Unpaid Debt */}
                <div className="bg-surface-container-lowest p-6 rounded-[1.5rem] flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <img alt="Budi" className="w-14 h-14 rounded-2xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRChw4fmcqfUlljtUJ3FPlyexHzgKJQVhSdw7E_62E71y5WLP0jlmnJoLlTYnMiO_fQS6T_1_0ZRLxy8PRwfNNG39dc8Uf01LoqLAI6wGFnLjQqkeiWI73gkVzxfXMfrnDnVPj0hpsw577VbsS9h-_skfSv8CmE1PuwiFppcdFKaPLa1PTevHC4RnTnc_-8poX-bGTL6yALTHzCaidKHVK3F--tY-7e_dHGREySv1hOdI4WxT2c94X4ECyRGhCG_RadKSSAN4kOGs" />
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-error rounded-full flex items-center justify-center border-2 border-white">
                        <span className="material-symbols-outlined text-[12px] text-white">priority_high</span>
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-on-surface leading-tight font-headline">Budi</h3>
                      <p className="text-xs text-on-surface-variant font-medium mt-1 font-body">Grup: <span className="text-primary">Liburan Bali 2026</span></p>
                      <p className="text-xs text-error font-semibold mt-1 flex items-center gap-1 font-body">
                        <span className="material-symbols-outlined text-sm">schedule</span> Jatuh tempo hari ini
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end justify-center">
                    <span className="text-xl font-extrabold text-[#E24B4A] tracking-tight font-headline">Rp 150.000</span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-error-container text-on-error-container mt-2 w-fit font-body">Belum Lunas</span>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-4">
                    <button className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 font-body">
                      <span className="material-symbols-outlined text-sm">notifications_active</span> Ingatkan
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold bg-primary text-white shadow-md shadow-primary/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-body">
                      <span className="material-symbols-outlined text-sm">check_circle</span> Tandai Lunas
                    </button>
                  </div>
                </div>

                {/* Card 2: Paid Debt */}
                <div className="bg-surface-container-lowest p-6 rounded-[1.5rem] flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-lg transition-shadow opacity-80">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <img alt="Citra" className="w-14 h-14 rounded-2xl object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVRsCGK2oXwsVJpPyUvu6PDcsfmzB_uegt0rNdxgMmE_Aed390MzBLm0aCU-TtSqegBhk8RcnGE_ntindbeXRSPlmmMwixe1XIryQ_xj2lMssMQ4XA3BmYhs49qH6wJXkAKahWTbnTME-My0fgE9QpwqzxvHrz3KYqcU8qDJzMP9sZK6Z34Ad2NSieFz3PzNmGoPDAsngEZcbuH6zxo4Fh1bHrIsAOxdko-Mr8FyK23QYTzyWPF6fZ7H_O8Gz7A2UlHBEBc8Vu6ts" />
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center border-2 border-white">
                        <span className="material-symbols-outlined text-[12px] text-white">check</span>
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-on-surface leading-tight font-headline">Citra</h3>
                      <p className="text-xs text-on-surface-variant font-medium mt-1 font-body">Grup: <span className="text-primary">Dinner Seafood</span></p>
                      <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1 font-body">
                        <span className="material-symbols-outlined text-sm">event_available</span> Diterima 2 hari lalu
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end justify-center">
                    <span className="text-xl font-extrabold text-[#1D9E75] tracking-tight font-headline">Rp 320.000</span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-secondary-container text-on-secondary-container mt-2 w-fit font-body">Lunas</span>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-4">
                    <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors font-body">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contextual Split-Tray */}
            <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-40">
              <div className="bg-surface-variant/60 backdrop-blur-2xl p-5 rounded-[2rem] shadow-2xl border border-white/20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined">calculate</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-container font-headline">Live Tracker</p>
                    <p className="text-sm font-bold text-indigo-900 font-body">3 Hutang Jatuh Tempo</p>
                  </div>
                </div>
                <button className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors">
                  <span className="material-symbols-outlined text-primary">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar Form Add Expense Area */}
          <aside className="w-full lg:w-96">
            <div className="lg:sticky top-24 bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-highest shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold font-headline">Tambah Pengeluaran</h2>
                <button className="material-symbols-outlined text-outline">close</button>
              </div>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-body">Expense Name</label>
                  <input className="w-full bg-surface-container-high border-none rounded-lg focus:ring-1 focus:ring-primary px-4 py-3 font-medium font-body outline-none" placeholder="e.g. Beli Oleh-oleh" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-body">Amount (IDR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant font-body">Rp</span>
                    <input className="w-full bg-surface-container-high border-none rounded-lg focus:ring-1 focus:ring-primary pl-12 pr-4 py-3 font-bold text-xl font-headline outline-none" placeholder="0" type="number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-body">Paid By</label>
                  <select className="w-full bg-surface-container-high border-none rounded-lg focus:ring-1 focus:ring-primary px-4 py-3 font-medium font-body outline-none">
                    <option>Alex (You)</option>
                    <option>Budi</option>
                    <option>Citra</option>
                    <option>Dandi</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-body">Split Method</label>
                  </div>
                  <div className="flex bg-surface-container-high p-1 rounded-xl">
                    <button className="flex-1 bg-white text-primary font-bold py-2 rounded-lg shadow-sm font-body" type="button">Sama Rata</button>
                    <button className="flex-1 text-on-surface-variant font-bold py-2 rounded-lg font-body" type="button">Custom</button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-body">Split with</label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 bg-surface rounded-xl border border-surface-container-highest cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input className="rounded text-primary focus:ring-primary h-4 w-4" defaultChecked type="checkbox" />
                        <span className="font-medium font-body">Alex</span>
                      </div>
                      <span className="text-xs font-bold text-primary/50 font-body">Rp 0</span>
                    </label>
                    <label className="flex items-center justify-between p-3 bg-surface rounded-xl border border-surface-container-highest cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input className="rounded text-primary focus:ring-primary h-4 w-4" defaultChecked type="checkbox" />
                        <span className="font-medium font-body">Budi</span>
                      </div>
                      <span className="text-xs font-bold text-primary/50 font-body">Rp 0</span>
                    </label>
                    <label className="flex items-center justify-between p-3 bg-surface rounded-xl border border-surface-container-highest cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input className="rounded text-primary focus:ring-primary h-4 w-4" defaultChecked type="checkbox" />
                        <span className="font-medium font-body">Citra</span>
                      </div>
                      <span className="text-xs font-bold text-primary/50 font-body">Rp 0</span>
                    </label>
                    <label className="flex items-center justify-between p-3 bg-surface rounded-xl border border-surface-container-highest cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input className="rounded text-primary focus:ring-primary h-4 w-4" defaultChecked type="checkbox" />
                        <span className="font-medium font-body">Dandi</span>
                      </div>
                      <span className="text-xs font-bold text-primary/50 font-body">Rp 0</span>
                    </label>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-4 rounded-xl font-extrabold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all font-body">Simpan</button>
              </form>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DebtTracking;
