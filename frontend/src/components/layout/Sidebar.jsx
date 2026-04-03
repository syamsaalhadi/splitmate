import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NewExpenseModal from '../ui/NewExpenseModal';

const Sidebar = () => {
  const location = useLocation();
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  return (
    <>
      <aside className="h-screen w-64 fixed z-30 left-0 top-0 border-r border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col gap-2 p-4 pt-0 hidden md:flex">
      {/* Container matches TopAppBar height to align perfectly */}
      <div className="h-16 flex flex-col justify-center px-4 mb-4">
        <h2 className="text-xl font-black text-indigo-700 dark:text-indigo-400 font-headline leading-tight">SplitMate</h2>
        <p className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase font-headline">Precision Finance</p>
      </div>

      <nav className="flex flex-col gap-1">
        <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/dashboard' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/dashboard' ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
          Dashboard
        </Link>
        <Link to="/groups" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/groups' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/groups' ? "'FILL' 1" : "'FILL' 0" }}>group</span>
          Groups
        </Link>
        <Link to="/friends" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/friends' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/friends' ? "'FILL' 1" : "'FILL' 0" }}>person</span>
          Friends
        </Link>
        <Link to="/activity" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/activity' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/activity' ? "'FILL' 1" : "'FILL' 0" }}>notifications_active</span>
          Activity
        </Link>
        <Link to="/insights" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/insights' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/insights' ? "'FILL' 1" : "'FILL' 0" }}>insights</span>
          Insights
        </Link>
        <Link to="/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/settings' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/settings' ? "'FILL' 1" : "'FILL' 0" }}>settings</span>
          Settings
        </Link>
      </nav>

      <div className="mt-auto p-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
        <button 
          onClick={() => setIsExpenseModalOpen(true)}
          className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md shadow-primary/20 active:scale-95 transition-all"
        >
          New Expense
        </button>
      </div>
    </aside>

    {/* Modal component rendered outside the sidebar for better z-index stacking */}
    <NewExpenseModal 
      isOpen={isExpenseModalOpen} 
      onClose={() => setIsExpenseModalOpen(false)} 
    />
    </>
  );
};

export default Sidebar;
