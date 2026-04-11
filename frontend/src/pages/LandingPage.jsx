import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container text-sm font-medium">
              <span className="material-symbols-outlined mr-2 text-lg">verified</span>
              Solusi Keuangan Gen Z
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary leading-[1.1] font-headline">
              SplitMate
            </h1>
            
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-lg leading-relaxed font-body">
              Patungan & utang makin gampang, insight keuangan makin cerdas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 text-center">
                Mulai Gratis
              </Link>
              <button
                onClick={() => document.getElementById('fitur')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-primary/20 text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/5 active:scale-95 transition-all flex items-center justify-center"
              >
                <span className="material-symbols-outlined mr-2">play_circle</span>
                Lihat Demo
              </button>
            </div>
          </div>
          
          <div className="relative flex justify-center lg:justify-end">
            {/* Background Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl"></div>
            
            {/* Phone Mockup */}
            <div className="relative w-72 h-[580px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-slate-800">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
              
              <div className="w-full h-full bg-surface rounded-[2.2rem] overflow-hidden relative">
                {/* App UI Content */}
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center pt-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">notifications</span>
                  </div>
                  
                  <div className="bg-primary p-5 rounded-2xl text-on-primary shadow-lg">
                    <p className="text-xs opacity-80">Total Saldo</p>
                    <h3 className="text-xl font-bold font-headline">Rp 2.450.000</h3>
                    <div className="mt-4 flex gap-2">
                      <div className="bg-white/20 px-3 py-1 rounded-lg text-[10px]">Tagihan Aktif: 4</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Aktivitas Terbaru</p>
                    
                    <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-sm">restaurant</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold">Lunch Bareng</p>
                        <p className="text-[8px] text-slate-400">Pending - Rp 45.000</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-sm">home</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold">Listrik Kos</p>
                        <p className="text-[8px] text-slate-400">Selesai - Rp 120.000</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Split-Trays Visual Mockup */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/60 backdrop-blur-md p-3 rounded-2xl border border-white/40 shadow-xl">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] font-bold text-primary">Live Split</p>
                      <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full">Total: 150k</span>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-200 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-emerald-200 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-amber-200 border-2 border-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Decorative Stats */}
            <div className="absolute -right-4 top-20 bg-white p-4 rounded-2xl shadow-xl hidden md:block border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-body">Savings Rate</p>
                  <p className="font-bold text-lg font-headline">+12.4%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section: Bento Grid Inspired */}
        <section className="bg-surface-container-low py-24" id="fitur">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 tracking-tight font-headline">Kelola Keuangan Tanpa Drama</h2>
              <p className="text-on-surface-variant text-lg max-w-2xl font-body">Lupakan hitung-hitungan manual. SplitMate menangani segalanya untukmu.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="group bg-surface-container-lowest p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 font-headline">Split Otomatis</h3>
                <p className="text-on-surface-variant leading-relaxed font-body">
                  Bagi tagihan makan, belanja, atau sewa rumah secara adil. Pilih bagi rata atau kustom sesuai pesanan masing-masing dalam hitungan detik.
                </p>
                <div className="mt-8 pt-6 border-t border-surface-container-high opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-primary font-bold inline-flex items-center cursor-pointer">
                    Pelajari Selengkapnya <span className="material-symbols-outlined ml-2">arrow_forward</span>
                  </span>
                </div>
              </div>
              
              {/* Feature Card 2 */}
              <div className="group bg-surface-container-lowest p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 font-headline">Tracking Utang</h3>
                <p className="text-on-surface-variant leading-relaxed font-body">
                  Pantau siapa yang berhutang dan kepada siapa secara real-time. Notifikasi otomatis akan mengingatkan temanmu tanpa harus merasa canggung.
                </p>
                <div className="mt-8 pt-6 border-t border-surface-container-high opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-primary font-bold inline-flex items-center cursor-pointer">
                    Pelajari Selengkapnya <span className="material-symbols-outlined ml-2">arrow_forward</span>
                  </span>
                </div>
              </div>
              
              {/* Feature Card 3 */}
              <div className="group bg-surface-container-lowest p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-container/10 flex items-center justify-center text-tertiary mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 font-headline">AI Insight</h3>
                <p className="text-on-surface-variant leading-relaxed font-body">
                  Dapatkan analisis mendalam tentang gaya pengeluaranmu. AI kami memberikan prediksi saldo dan tips menabung yang dipersonalisasi.
                </p>
                <div className="mt-8 pt-6 border-t border-surface-container-high opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-primary font-bold inline-flex items-center cursor-pointer">
                    Pelajari Selengkapnya <span className="material-symbols-outlined ml-2">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Asymmetric Mid-Section */}
        <section className="bg-surface py-24 relative overflow-hidden" id="tentang-kami">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <img 
                alt="Financial Dashboard" 
                className="rounded-[2.5rem] shadow-2xl w-full object-cover aspect-video bg-slate-200" 
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop"
              />
              <div className="absolute -bottom-10 -right-10 bg-primary-container text-on-primary-container p-8 rounded-[2rem] shadow-xl max-w-xs hidden md:block">
                <p className="text-3xl font-bold mb-2 font-headline">99.9%</p>
                <p className="text-sm font-medium opacity-90 font-body">Akurasi kalkulasi transaksi yang dijamin oleh sistem ledger kami.</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight font-headline">
                Transparansi Total di Setiap Transaksi
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed font-body">
                Kami percaya bahwa hubungan pertemanan tidak seharusnya rusak karena masalah uang. Dengan SplitMate, setiap riwayat transaksi tercatat secara permanen dan transparan bagi semua pihak yang terlibat.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-xs">done</span>
                  </span>
                  <span className="font-medium font-body">Keamanan Enkripsi Bank-Grade</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-xs">done</span>
                  </span>
                  <span className="font-medium font-body">Backup Cloud Otomatis</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-xs">done</span>
                  </span>
                  <span className="font-medium font-body">Integrasi Dengan Berbagai E-Wallet</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-primary-container rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-extrabold text-on-primary-container tracking-tight font-headline">Siap Untuk Hidup Bebas Drama Finansial?</h2>
              <p className="text-on-primary-container/80 text-xl max-w-2xl mx-auto font-body">Gabung dengan 500.000+ pengguna yang sudah merasakan kemudahan mengelola keuangan bersama.</p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register" className="bg-white text-primary px-10 py-5 rounded-full font-bold text-xl hover:bg-slate-50 transition-all active:scale-95 shadow-xl inline-block">
                  Daftar Sekarang
                </Link>
                <a href="mailto:sales@splitmate.app" className="bg-primary text-white border border-white/20 px-10 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-all active:scale-95 inline-block text-center">
                  Hubungi Tim Sales
                </a>
              </div>
            </div>
            
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
