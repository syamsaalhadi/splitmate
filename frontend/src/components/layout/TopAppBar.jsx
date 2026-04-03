import React from 'react';

const TopAppBar = ({ searchPlaceholder = "Search..." }) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm dark:shadow-none border-b border-slate-100 dark:border-slate-800 md:w-[calc(100%-16rem)] md:left-64">
      <div className="flex justify-between items-center px-6 h-16 w-full ml-auto md:ml-0">
        
        {/* Left Side: Mobile Menu & Search Bar */}
        <div className="flex items-center flex-1 gap-4">
          <button className="md:hidden text-indigo-700 flex items-center justify-center">
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
          <button className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors active:scale-95 duration-200 relative">
            <span className="material-symbols-outlined">notifications</span>
            {/* Unread indicator */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          
          <button className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors active:scale-95 duration-200 hidden sm:block">
            <span className="material-symbols-outlined">help</span>
          </button>
          
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
          
          <button className="flex items-center gap-2 active:scale-95 duration-200 group outline-none">
            {/* Hardcoded user data for now based on previous mockup */}
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
              <img 
                alt="User profile" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsqNGYqckA9HwyX8c35IkckSsZGgT2yWHQ6pPx_-kU_NeVbrxmMdR50wbJqNmoCEfcRnAOIkk2VUIl4VVktRTFRk8xTZvh3OPhzsixnk0kNmfvOum6ejmUXrce4xqmSzHCKAZjGNUXsD1pxGqqnSNRkszQyulSuO62xoNuKq9ItVY95GasV1kI0gl7iQh0ZpAwFKjcxCKUi0MUrzqnx7gcYyByISQjxgLeJkY6g8OW6veFVHAPpGvH82MWuTRVYRmgZn4YJ0Qn454"
              />
            </div>
            <span className="hidden md:block font-headline text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">
              Sarah
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default TopAppBar;
