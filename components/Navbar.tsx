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
          className="h-6 md:h-8 w-auto brightness-0"
        />
      </div>

      {/* Menu Trigger */}
      <button 
        onClick={onOpenMenu}
        className="p-2 hover:bg-[#08131A]/10 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#08131A]/20 group relative hover:scale-110 active:scale-95"
        style={{
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
        aria-label="Abrir Menu"
      >
        <svg 
          className="w-8 h-8 text-[#08131A] drop-shadow-md transition-all duration-300 group-hover:scale-110 group-active:scale-95" 
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
          <line x1="4" y1="8" x2="20" y2="8" />
          <line x1="4" y1="16" x2="14" y2="16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;