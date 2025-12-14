'use client';

import React from 'react';
import { Menu } from 'lucide-react';

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
          className="h-8 md:h-10 w-auto brightness-0 invert"
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
        <Menu 
          className="w-8 h-8 text-[#FEFBF1] drop-shadow-md transition-all duration-300 group-hover:scale-110 group-active:scale-95" 
          style={{
            transformOrigin: 'center center',
          }}
          strokeWidth={1.5} 
        />
      </button>
    </nav>
  );
};

export default Navbar;