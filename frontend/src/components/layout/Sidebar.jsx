import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NewExpenseModal from '../ui/NewExpenseModal';

const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`h-screen w-64 fixed z-50 left-0 top-0 border-r border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col gap-2 p-4 pt-0 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        {/* Mobile close button */}
        <div className="md:hidden flex justify-end pt-3">
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 transition-colors"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Container matches TopAppBar height to align perfectly */}
        <div className="h-16 flex items-center gap-3 px-4 mb-4 md:mt-0 -mt-2">
          <img src="/logo.png" alt="SplitMate Logo" className="w-9 h-9 object-contain" />
          <div>
            <h2 className="text-xl font-black text-indigo-700 dark:text-indigo-400 font-headline leading-tight">SplitMate</h2>
            <p className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase font-headline">Precision Finance</p>
          </div>
        </div>

      <nav className="flex flex-col gap-1">
        <Link to="/dashboard" onClick={onClose} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/dashboard' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/dashboard' ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
          Dashboard
        </Link>
        <Link to="/groups" onClick={onClose} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/groups' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/groups' ? "'FILL' 1" : "'FILL' 0" }}>group</span>
          Groups
        </Link>
        <Link to="/friends" onClick={onClose} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/friends' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/friends' ? "'FILL' 1" : "'FILL' 0" }}>person</span>
          Friends
        </Link>
        <Link to="/activity" onClick={onClose} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/activity' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/activity' ? "'FILL' 1" : "'FILL' 0" }}>notifications_active</span>
          Activity
        </Link>
        <Link to="/insights" onClick={onClose} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/insights' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/insights' ? "'FILL' 1" : "'FILL' 0" }}>insights</span>
          Insights
        </Link>
        <Link to="/settings" onClick={onClose} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 cursor-pointer active:opacity-80 ${location.pathname === '/settings' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50'}`}>
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
