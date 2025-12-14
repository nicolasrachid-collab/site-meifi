'use client';

import React from 'react';
import { X, Move, Scan, Grip } from 'lucide-react';

interface MenuOverlayProps {
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ onClose }) => {
  // Imagem similar à da cadeira laranja moderna
  const menuImage = "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1965&auto=format&fit=crop";

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-white text-[#08131A] animate-fade-in">
      
      {/* Left Panel - Image */}
      <div className="relative w-full md:w-1/2 h-1/3 md:h-full bg-gray-100 overflow-hidden group">
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${menuImage})` }}
        >
             <div className="absolute inset-0 bg-[#08131A]/20"></div>
        </div>

        {/* Content Overlay on Image */}
        <div className="absolute bottom-8 left-8 text-white z-10">
           <div className="mb-4">
             <Scan className="w-6 h-6 opacity-80" />
           </div>
           <h2 className="text-h2 md:text-h1 font-medium mb-3">
             Arquitetura autoral,<br/> vida contemporânea.
           </h2>
           <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-body-sm font-semibold border border-white/10 tracking-wide">
             Inspirador
           </span>
        </div>
      </div>

      {/* Right Panel - Content */}
      <div className="w-full md:w-1/2 h-2/3 md:h-full flex flex-col p-8 md:p-12 lg:p-16 relative">
        
        {/* Header: Logo & Close Button */}
        <div className="flex items-center justify-between mb-16">
          <span className="text-h2 md:text-h1 font-serif uppercase">MEIFI</span>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <X className="w-8 h-8 md:w-10 md:h-10 font-light text-gray-800 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" strokeWidth={1} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col justify-center max-w-lg">
          <h1 className="text-h1 md:text-display-lg font-normal mb-4 text-[#08131A] uppercase">
            Entre em Contato
          </h1>
          <a href="mailto:contato@meifi.com.br" className="text-body-lg md:text-h4 border-b border-[#08131A] pb-1 inline-block self-start hover:opacity-70 transition-opacity mb-16">
            contato@meifi.com.br
          </a>

          <div className="space-y-6">
            <h3 className="text-body-sm font-bold uppercase tracking-[0.05em] text-gray-900">
              Navegação:
            </h3>
            <ul className="flex flex-wrap gap-8 text-body-lg md:text-h4 text-gray-800">
              {['Sobre Nós', 'Projetos', 'Notícias', 'Contato'].map((item) => (
                <li key={item} className="cursor-pointer hover:text-text-tertiary transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between mt-auto pt-8 border-t border-transparent">
          <span className="text-body-sm font-medium text-text-tertiary">
            © 2025. Todos os direitos reservados.
          </span>
          <Grip className="w-5 h-5 text-[#08131A] cursor-pointer hover:rotate-90 transition-transform" />
        </div>

      </div>
    </div>
  );
};

export default MenuOverlay;