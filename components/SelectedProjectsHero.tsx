'use client';

import React from 'react';
import { Menu, Radio, Box, Triangle } from 'lucide-react';

interface SelectedProjectsHeroProps {
  onBack: () => void;
}

const SelectedProjectsHero: React.FC<SelectedProjectsHeroProps> = ({ onBack }) => {
  return (
    <section className="w-full bg-white text-[#08131A] min-h-[80vh] flex flex-col justify-between px-6 md:px-12 lg:px-16 py-8">
      
      {/* Top: Navbar */}
      <nav className="w-full flex items-center justify-between">
        {/* Logo Aestoria */}
        <div 
          onClick={onBack}
          className="text-h2 md:text-h1 font-serif cursor-pointer hover:opacity-70 transition-opacity text-[#08131A]"
        >
          Aestoria
        </div>

        {/* Menu Icon */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
          <Menu className="w-8 h-8 text-[#08131A] group-hover:scale-105 transition-transform" strokeWidth={1.5} />
        </button>
      </nav>

      {/* Center: Title & Subtitle */}
      <div className="flex-grow flex flex-col items-center justify-center text-center mt-12 mb-20">
        
        {/* Decorative 5-dot Icon */}
        <div className="mb-8">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#08131A]">
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="19" r="2" />
              <circle cx="5" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
           </svg>
        </div>

        <h1 className="text-display-lg md:text-display-xl lg:text-display-2xl font-medium text-[#08131A] mb-8">
          Selected Projects
        </h1>

        <p className="text-text-tertiary text-body md:text-body-lg max-w-xl">
          With a seamless process and attention to detail, we turn ideas
          into beautiful, livable realities.
        </p>
      </div>

      {/* Bottom: Counter & Logos */}
      <div className="w-full flex items-center justify-between mt-auto gap-4">
        
        {/* Counter */}
        <span className="text-body-sm font-medium text-[#08131A] whitespace-nowrap">
          (6)
        </span>

        {/* Separator Line */}
        <div className="h-px bg-gray-200 flex-grow mx-4"></div>

        {/* Partner Logos */}
        <div className="flex items-center gap-6 md:gap-12 opacity-80">
           {/* Frequencii */}
           <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
              <Radio size={16} strokeWidth={2.5} />
              <span className="font-bold text-body-sm hidden md:block">Frequencii</span>
           </div>

           {/* LaunchSimple */}
           <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
              <Box size={16} strokeWidth={2.5} />
              <span className="font-bold text-body-sm hidden md:block">LaunchSimple</span>
           </div>

           {/* 45 Degrees */}
           <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
              <Triangle size={16} strokeWidth={2.5} className="rotate-45" />
              <span className="font-bold text-body-sm hidden md:block">45 Degrees°</span>
           </div>
        </div>

      </div>

    </section>
  );
};

export default SelectedProjectsHero;