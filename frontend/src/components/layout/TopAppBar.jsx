import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const TopAppBar = ({ searchPlaceholder = "Search...", onMenuClick }) => {
  const { user } = useContext(AuthContext);

  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <header className="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm dark:shadow-none border-b border-slate-100 dark:border-slate-800 md:w-[calc(100%-16rem)] md:left-64">
      <div className="flex justify-between items-center px-6 h-16 w-full ml-auto md:ml-0">

        {/* Left Side: Mobile Menu & Search Bar */}
        <div className="flex items-center flex-1 gap-4">
          <button
            className="md:hidden text-indigo-700 flex items-center justify-center"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-900 px-4 py-1.5 rounded-full w-full max-w-md border border-transparent focus-within:border-primary/20 transition-colors">
            <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full font-headline font-medium placeholder-slate-400 outline-none text-on-surface"
              placeholder={searchPlaceholder}
              type="text"
            />
          </div>
        </div>

        {/* Right Side: Icons & Avatar */}
        <div className="flex items-center gap-2 sm:gap-4 ml-4">
          <button className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors active:scale-95 duration-200">
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <button className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors active:scale-95 duration-200 hidden sm:block">
            <span className="material-symbols-outlined">help</span>
          </button>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

          <Link to="/profile" className="flex items-center gap-2 active:scale-95 duration-200 group outline-none" >
            {user?.avatar_url ? (
              <img
                alt="User profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform"
                src={user.avatar_url}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm ring-1 ring-slate-100">
                {avatarLetter}
              </div>
            )}
            <span className="hidden md:block font-headline text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">
              {user?.name || '—'}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default TopAppBar;
