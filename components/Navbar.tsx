'use client';

import React from 'react';

interface NavbarProps {
  onOpenMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenMenu }) => {
  return (
    <nav className="w-full flex items-center justify-between">
      {/* Logo */}
      <div className="cursor-pointer hover:opacity-80 transition-opacity drop-shadow-md">
        <img 
          src="/Logotipo.svg" 
          alt="MEIFI" 
          className="h-6 md:h-8 w-auto brightness-0 invert"
        />
      </div>

      {/* Menu Trigger */}
      <button 
        onClick={onOpenMenu}
        className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white/50 group relative hover:scale-110 active:scale-95"
        style={{
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
        aria-label="Abrir Menu"
      >
        <svg 
          className="w-8 h-8 text-[#FEFBF1] drop-shadow-md transition-all duration-300 group-hover:scale-110 group-active:scale-95" 
          style={{
            transformOrigin: 'center center',
          }}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;