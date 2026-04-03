import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import SettleUpModal from '../components/ui/SettleUpModal';

const GroupDetail = () => {
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);
  const [settleData, setSettleData] = useState({ contact: "Grup", amount: 0 });

  const handleSettleUp = (contact, amount) => {
    setSettleData({ contact, amount });
    setIsSettleModalOpen(true);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Sidebar />

      <TopAppBar searchPlaceholder="Search groups..." />
      {/* Main Content Area */}
      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">

          <div className="flex-1 space-y-8">
            {/* Group Header Card */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-sm">flight_takeoff</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/60 font-body">Active Trip</span>
                  </div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Liburan Bali 2026</h1>
                  <p className="text-on-surface-variant font-medium font-body">4 members • Travel & Leisure</p>
                </div>
                <div className="bg-surface-container-low p-6 rounded-xl text-right">
                  <p className="text-sm font-semibold text-on-surface-variant mb-1 uppercase tracking-tighter font-headline">Total Group Spending</p>
                  <p className="text-3xl font-bold text-primary font-headline">Rp 5.420.000</p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="mt-8 pt-8 border-t border-surface-container-highest flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-primary to-primary-container text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all transform active:scale-95 font-body">
                  <span className="material-symbols-outlined">add_circle</span>
                  Tambah Pengeluaran
                </button>
                <button 
                  onClick={() => handleSettleUp("Grup", 5420000)}
                  className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all transform active:scale-95 font-body"
                >
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                  Settle Up
                </button>
              </div>
            </section>

            {/* Members Balance Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 font-headline">
                <span className="material-symbols-outlined text-secondary">group</span>
                Member Balances
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Member Card: Alex */}
                <div className="bg-surface-container-low p-4 rounded-xl border-b-4 border-secondary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <img alt="Alex" className="w-10 h-10 rounded-full bg-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKKyvRziPAhigKfHHJuIOER4dIIGrtUMPZge0uSW99z8nR0pDwsSPKeLom9FKeN7_pjErpuuDO9oEGBEEIrU_okFE5WBRKDdhzT4bZM0mc4z4LBsDGCSME9SmzUND1el2Zq71DqAjQrQS-kelgD-reEnxdaFNr0Otc99xzo5_1IPcclPO266bquYasMSzXJfri2BubLCgNu0cnpb0x8ATNIGnJqjYhl4brvYSkHW_6mHMVI7vuP9fZNatkWBWBG_IJ3llbXN-Etkg" />
                    <span className="font-bold font-body">Alex</span>
                  </div>
                  <p className="text-xs font-semibold text-on-surface-variant uppercase mb-1 font-body">Is owed</p>
                  <p className="text-lg font-bold text-secondary font-headline">Rp 850.000</p>
                </div>

                {/* Member Card: Budi */}
                <div className="bg-surface-container-low p-4 rounded-xl border-b-4 border-error/20">
                  <div className="flex items-center gap-3 mb-3">
                    <img alt="Budi" className="w-10 h-10 rounded-full bg-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcIWoDnJ_7eVSvU7w8fPVUrV08VaAamrkl09j3hnzKVbuuaO5Uzwa1Yq-r2M61WjBRVe9KIufy_TrSNM9HNYU3dVm9sBbj_lzPMuhMeEX8qmyJtKaCRKL86501byNQlIAv3w5eQU0U3_DWWHqWryn7KooZphLFnCqtWROL8OYVeUIdU_MdLtVlI3c0Mia5LRJot8GValBbFCFwJFNEmf7vw162H7EEzq01lp42KAGjE3Com2rVyF46hmB4cRmiJP68DlHn6SSxkeY" />
                    <span className="font-bold font-body">Budi</span>
                  </div>
                  <p className="text-xs font-semibold text-on-surface-variant uppercase mb-1 font-body">Owes</p>
                  <p className="text-lg font-bold text-error font-headline">Rp 320.000</p>
                </div>

                {/* Member Card: Citra */}
                <div className="bg-surface-container-low p-4 rounded-xl border-b-4 border-secondary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <img alt="Citra" className="w-10 h-10 rounded-full bg-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfTnKvL37NGJ-5fszKkecISr1x6Y5we_mNNHyH-TEc3LhljTy4wFnKWSoqnyhEExaJsMSzN831jl5IHXk3HgXU3rNrnPa3aWnKg0WiumC08v2-ccqhKO7a688uuzfFZYh5S9vq0_tlVz6NbLNU0tLO_oj7fENIagMZn6Juq8YW0sRZiXHNJs4V2MSY0HBcUDIhBFOogCJ2b9ihoxBzK0QUPiVhVUTZyJHGOA0hBffLuCm7B3avbRMSzh5yzpPwarCLbEXDXOxN_Tg" />
                    <span className="font-bold font-body">Citra</span>
                  </div>
                  <p className="text-xs font-semibold text-on-surface-variant uppercase mb-1 font-body">Is owed</p>
                  <p className="text-lg font-bold text-secondary font-headline">Rp 120.000</p>
                </div>

                {/* Member Card: Dandi */}
                <div className="bg-surface-container-low p-4 rounded-xl border-b-4 border-error/20">
                  <div className="flex items-center gap-3 mb-3">
                    <img alt="Dandi" className="w-10 h-10 rounded-full bg-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs8Q3VS-VsVluI4iTwo9GuBUoZ7E6-YEFHFb4q2fVnlyFZh4df6hrEMBdWzYwBZvmjG38o6dFprgP7LYkuzG-58jKYVbEhw29HXgtZM2QKFKVXEijkf2uLhsnRRBhSohhPDV6-R0s2PE8GAQXTDfXO4ybz-pKKWQntVPR3OrifW8RnPl9HCuTDphQbGn1wRZhE8YQ_MDs21fV6yp8IrvPaO4aJSBoJH7-AYSYxq6xtAPv-Ch2mm9DEktGW9TOPtZteDbAtMEaMc-U" />
                    <span className="font-bold font-body">Dandi</span>
                  </div>
                  <p className="text-xs font-semibold text-on-surface-variant uppercase mb-1 font-body">Owes</p>
                  <p className="text-lg font-bold text-error font-headline">Rp 650.000</p>
                </div>
              </div>
            </section>

            {/* Expenses List */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold font-headline">Recent Expenses</h2>
                <button className="text-primary font-bold text-sm font-body">View All History</button>
              </div>

              {/* Expense Item 1 */}
              <div className="group bg-surface-container-low rounded-xl p-4 flex items-center justify-between hover:bg-surface-container-high transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">flight</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-headline">Tiket Pesawat</h3>
                    <p className="text-sm text-on-surface-variant font-medium font-body">Paid by <span className="text-primary">Alex</span> • 24 Oct 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-lg font-bold font-headline">Rp 3.200.000</p>
                    <p className="text-xs font-bold text-secondary-container bg-on-secondary-container/10 px-2 py-0.5 rounded inline-block font-body">Split equally</p>
                  </div>
                  <button className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">keyboard_arrow_down</button>
                </div>
              </div>

              {/* Expense Item 2 */}
              <div className="group bg-surface-container-low rounded-xl p-4 flex items-center justify-between hover:bg-surface-container-high transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary-container">
                    <span className="material-symbols-outlined">restaurant</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-headline">Dinner Seafood Jimbaran</h3>
                    <p className="text-sm text-on-surface-variant font-medium font-body">Paid by <span className="text-primary">Citra</span> • 25 Oct 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-lg font-bold font-headline">Rp 1.450.000</p>
                    <p className="text-xs font-bold text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded inline-block font-body">Custom split</p>
                  </div>
                  <button className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">keyboard_arrow_down</button>
                </div>
              </div>

              {/* Expense Item 3 */}
              <div className="group bg-surface-container-low rounded-xl p-4 flex items-center justify-between hover:bg-surface-container-high transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">directions_car</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-headline">Sewa Mobil 2 Hari</h3>
                    <p className="text-sm text-on-surface-variant font-medium font-body">Paid by <span className="text-primary">Alex</span> • 26 Oct 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-lg font-bold font-headline">Rp 770.000</p>
                    <p className="text-xs font-bold text-secondary-container bg-on-secondary-container/10 px-2 py-0.5 rounded inline-block font-body">Split equally</p>
                  </div>
                  <button className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">keyboard_arrow_down</button>
                </div>
              </div>
            </section>

            {/* Debt Summary Card */}
            <section className="bg-surface-container-high rounded-2xl p-6 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 font-headline">
                  <span className="material-symbols-outlined text-primary">currency_exchange</span>
                  How to Settle
                </h2>
                <span className="text-xs font-bold bg-white/50 px-3 py-1 rounded-full uppercase tracking-tighter font-body">Optimal Path Found</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Debt 1 */}
                <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <img alt="Dandi" className="w-8 h-8 rounded-full ring-2 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTYtpqk3Agla8w6VTqtZXsat_9ebA1nhB9JtAarmZ4WLsh2BIj1y6amZX1VgHx27wE9cmb3N_eYUM7E7xK85aSXdOrGDkpt6gUPDFUI50rWbLtoLCCbjbMCczBqtP0Anqcw1r1VN1yZpcSvssp23wNDjhOMmnYzsIr4hJW6Ar3eUa3dfjZUsFRqm7UsioKa6ZdTjXfyVxaIYyeBhpO35Jz5VNAlwhOsdkWqpsHlcvCOiSnXbNrQu_hZZZRlFRO5QoWWulrEVLWWsE" />
                      <span className="material-symbols-outlined text-primary text-base translate-y-2">arrow_forward</span>
                      <img alt="Alex" className="w-8 h-8 rounded-full ring-2 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4IuFgRdRhPZUAzlC94W29fSr85cFUdddqNckLTGoH0SRNFRCFrb8FTlnw4Kf8qe3wEnp_xxl5Fku69b95O5Fb5Lf3vPMiVbBq-9eJb71NGMEnogC1H3lqHYP-l_nTkihQAk_g6l4DfwtUOevE1lqfDeuNNS1q-h9f1r_OnNwUxZ365z8U95gSOz-9FexUeYAZTdWyCK7373lYzwxBChHrmXuKb9qERCtVPvIBfPgMLYgcrMznBTEX9a4KRF20Hm7pG1ifCCgKNVg" />
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium font-body"><span className="font-bold">Dandi</span> owes <span className="font-bold">Alex</span></p>
                      <p className="text-primary font-bold font-headline">Rp 150.000</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleSettleUp("Alex", 150000)}
                    className="text-xs font-bold bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 active:scale-95 transition-all font-body"
                  >Tandai Lunas</button>
                </div>

                {/* Debt 2 */}
                <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <img alt="Budi" className="w-8 h-8 rounded-full ring-2 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu96td-Nu92Ua7NZjF39sle2PjyXpZushRHpUsr7xjTEEg0SwOKkMGF3ESQ874Koc8jeZEzBPiXa6p0yMvDwW2LnJQbImQjvv1yvG_m60ch4cbxQl4EVkOn3sG5UEv08F0awOlpu_2klhDsBA1V1bxAsgbFMBxvDmnTr21VuS8iiZ4hk2ansttZ3SKAc7ILTzRROZ0NSQK4F0YtLLTROiSLf46uvIeFsi-iJX-L4qnYc0qmp-lX49kkkJuEp1yZB647i1XkMHN-QM" />
                      <span className="material-symbols-outlined text-primary text-base translate-y-2">arrow_forward</span>
                      <img alt="Citra" className="w-8 h-8 rounded-full ring-2 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBwVl5LnagFZza6IkEPbE09I3p-eQrp1f-djfm-9iOtn_V9qzruN82a_aEhnqDi7R2dH81v4oEA6pN6vyH7XOdD8YVn7lg7RirmXRrtGAxiSYZ1Bku6qTLBnI-vAbz4ciamQWHgUAwpiYT2xvhoMPlm2-YuZJJQTXhu8CgNChIYkVlm2E3Ef0fw-Y37Vwa5kucp8YX70yumWeCgY5p6fs-DFj-uWO4MJqrEEL-8WAH7NCKSn6sTKG2Lw1eGTiuk30vdIlOdPuuSkE" />
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium font-body"><span className="font-bold">Budi</span> owes <span className="font-bold">Citra</span></p>
                      <p className="text-primary font-bold font-headline">Rp 320.000</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleSettleUp("Citra", 320000)}
                    className="text-xs font-bold bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 active:scale-95 transition-all font-body"
                  >Tandai Lunas</button>
                </div>
              </div>
            </section>
          </div>



        </div>
      </main>

      {/* Modals outside the main layout flow */}
      <SettleUpModal 
        isOpen={isSettleModalOpen} 
        onClose={() => setIsSettleModalOpen(false)} 
        defaultContact={settleData.contact}
        defaultAmount={settleData.amount}
      />
    </div>
  );
};

export default GroupDetail;
