import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = ({ onAddClick }) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dash' },
    { path: '/groups', icon: 'group', label: 'Groups' },
    null, // placeholder for center FAB
    { path: '/insights', icon: 'insights', label: 'Insights' },
    { path: '/profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item, index) => {
        if (!item) {
          return (
            <button
              key="fab"
              onClick={onAddClick}
              className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white -mt-8 shadow-lg shadow-primary/30 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          );
        }

        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400'}`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-bold font-headline">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
