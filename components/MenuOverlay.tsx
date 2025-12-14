'use client';

import React, { useState } from 'react';
import { X, Move, Scan, Grip } from 'lucide-react';

interface MenuOverlayProps {
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  // Imagem similar à da cadeira laranja moderna
  const menuImage = "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1965&auto=format&fit=crop";

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Duração da animação de saída
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-white text-[#08131A] ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
    >
      <div className="relative w-full h-full flex flex-col md:flex-row">
        {/* Left Panel - Image */}
        <div className="relative w-full md:w-1/2 h-1/3 md:h-full bg-gray-100 overflow-hidden group">
          <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url(${menuImage})` }}
          >
               <div className="absolute inset-0 bg-[#08131A]/20"></div>
          </div>

          {/* Content Overlay on Image */}
          <div className="absolute bottom-8 left-8 text-[#FEFBF1] z-10">
             <div className="mb-4">
               <Scan className="w-6 h-6 opacity-80" />
             </div>
             <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
               Arquitetura autoral,<br/> vida contemporânea.
             </h2>
             <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium border border-white/10">
               Inspirador
             </span>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="w-full md:w-1/2 h-2/3 md:h-full flex flex-col px-6 py-6 md:px-12 md:py-8 relative">
          
          {/* Header: Logo & Close Button */}
          <div className="flex items-center justify-between mb-16">
          <div>
            <img 
              src="/Logotipo.svg" 
              alt="MEIFI" 
              className="h-8 md:h-10 w-auto"
              style={{
                filter: 'brightness(0) saturate(100%) invert(3%) sepia(8%) saturate(2000%) hue-rotate(180deg) brightness(0.9) contrast(1.1)',
              }}
            />
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group relative"
            style={{
              transformOrigin: 'center center',
            }}
          >
            <X 
              className="w-8 h-8 md:w-10 md:h-10 font-light text-gray-800 group-hover:text-[#275B7A] transition-all duration-300 group-hover:rotate-90 group-hover:scale-110" 
              style={{
                transformOrigin: 'center center',
                willChange: 'transform',
              }}
              strokeWidth={1} 
            />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col justify-center max-w-lg">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-4 text-[#08131A] uppercase">
            Entre em Contato
          </h1>
          <a href="mailto:contato@meifi.com.br" className="text-xl md:text-2xl border-b border-[#08131A] pb-1 inline-block self-start hover:text-[#275B7A] hover:border-[#275B7A] transition-colors mb-16">
            contato@meifi.com.br
          </a>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Conheça nossos projetos
            </h3>
            <ul className="flex flex-wrap gap-8 text-lg md:text-xl text-gray-800">
              <li className="cursor-pointer hover:text-[#275B7A] transition-colors">
                Ver projetos
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between mt-auto pt-8 border-t border-transparent">
          <span className="text-sm font-medium text-gray-500">
            © 2025. Todos os direitos reservados.
          </span>
          <Grip className="w-5 h-5 text-[#08131A] cursor-pointer hover:rotate-90 transition-transform" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;