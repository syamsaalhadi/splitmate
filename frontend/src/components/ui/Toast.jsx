import React, { useEffect, useState } from 'react';

const Toast = ({ message, type = 'error', isOpen, onClose, duration = 4000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen && !visible) return null;

  const isError = type === 'error';
  const isSuccess = type === 'success';

  return (
    <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ease-out transform ${visible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'
      }`}>
      <div className={`flex items-center gap-3 px-6 py-4 rounded-[2rem] shadow-2xl backdrop-blur-xl border ${isError
          ? 'bg-error/10 border-error/20 text-error'
          : isSuccess
            ? 'bg-secondary/10 border-secondary/20 text-secondary'
            : 'bg-primary/10 border-primary/20 text-primary'
        }`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isError ? 'bg-error/20' : isSuccess ? 'bg-secondary/20' : 'bg-primary/20'
          }`}>
          <span className="material-symbols-outlined text-xl">
            {isError ? 'error' : isSuccess ? 'check_circle' : 'info'}
          </span>
        </div>
        <p className="font-bold text-sm font-body whitespace-nowrap pr-2">
          {message}
        </p>
        <button
          onClick={() => setVisible(false)}
          className="p-1 hover:bg-black/5 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-lg opacity-50">close</span>
        </button>
      </div>
    </div>
  );
};

export default Toast;
