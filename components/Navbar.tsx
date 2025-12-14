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
      <div className="text-h2 md:text-h1 font-serif cursor-pointer hover:opacity-80 transition-opacity drop-shadow-md uppercase">
        MEIFI
      </div>

      {/* Menu Trigger */}
      <button 
        onClick={onOpenMenu}
        className="p-2 hover:bg-white/10 rounded-full transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-white/50 hover:rotate-90 hover:scale-110 active:scale-95 active:rotate-90 origin-center group"
        aria-label="Abrir Menu"
      >
        <Menu className="w-8 h-8 text-white drop-shadow-md transition-transform duration-500 group-hover:stroke-[2px]" strokeWidth={1.5} />
      </button>
    </nav>
  );
};

export default Navbar;