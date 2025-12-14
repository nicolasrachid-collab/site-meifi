'use client';

import React from 'react';
import { Menu } from 'lucide-react';

interface CoastalRetreatHeroProps {
  onBack: () => void;
}

const CoastalRetreatHero: React.FC<CoastalRetreatHeroProps> = ({ onBack }) => {
  // Imagem que remete à "árvore dentro da sala com vista para montanhas/costa"
  // Usando uma imagem de arquitetura minimalista com natureza integrada
  const bgImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-sans">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay escuro sutil para garantir leitura do texto branco */}
        <div className="absolute inset-0 bg-[#08131A]/20"></div>
      </div>

      {/* Navbar Minimalista */}
      <nav className="relative z-10 w-full flex justify-between items-center px-8 py-6 md:px-12 md:py-8">
        {/* Logo Aestoria (clicável para voltar à home) */}
        <div 
          onClick={onBack}
          className="text-2xl font-serif tracking-wide cursor-pointer hover:opacity-80 transition-opacity"
        >
          Aestoria
        </div>

        {/* Menu Icon */}
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Menu className="w-6 h-6 text-white" />
        </button>
      </nav>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full -mt-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight mb-4 drop-shadow-lg">
          Coastal Retreat
        </h1>
        <p className="text-base md:text-lg font-light tracking-wide opacity-90 drop-shadow-md">
          Breezy home with serene coastal tones
        </p>
      </div>

    </div>
  );
};

export default CoastalRetreatHero;