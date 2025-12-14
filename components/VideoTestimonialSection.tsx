'use client';

import React, { useState } from 'react';
import { Play, X, Scan, Move } from 'lucide-react';

const VideoTestimonialSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Imagem principal (pôr do sol/piscina minimalista)
  const mainImage = "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?q=80&w=1974&auto=format&fit=crop";
  
  // Imagens dos cards
  const cardImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop", // Team
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=500&auto=format&fit=crop", // Experts
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=500&auto=format&fit=crop"  // Communication
  ];

  return (
    <>
      <section className="w-full bg-[#FAFAFA] text-[#102735] py-24 px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Left Side - Large Image with Video Trigger */}
          {/* Reduced width to 30% and set aspect-square for a smaller, compact look */}
          <div className="w-full lg:w-[30%] relative group cursor-pointer flex-shrink-0" onClick={() => setIsVideoOpen(true)}>
            <div className="aspect-square w-full rounded-2xl overflow-hidden relative shadow-md">
              <img 
                src={mainImage} 
                alt="Architecture at dusk" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#102735]/10 group-hover:bg-[#102735]/20 transition-colors"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 pl-2 pr-6 py-2 rounded-full hover:bg-white/30 transition-all hover:scale-105">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play size={16} fill="#102735" className="ml-1 text-[#102735]" />
                  </div>
                  <span className="text-white font-medium text-sm">Ver Manifesto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:flex-1 flex flex-col justify-between self-stretch">
            
            {/* Top Content */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-12 text-[#102735]">
                Arquitetura feita com calma, cuidado e propósito.
              </h2>

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16 border-t border-transparent md:border-transparent pt-0">
                <span className="text-sm font-medium text-gray-500 min-w-[100px] hidden md:block">(Essência)</span>
                
                <div className="flex-grow">
                  <p className="text-gray-700 leading-relaxed mb-8 max-w-md">
                    A MEIFI trouxe um olhar contemporâneo e humano para o nosso projeto. Superando o convencional, eles aplicaram a tranquilidade e a atenção aos detalhes típicas de Minas, criando algo que realmente nos representa.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <button className="px-8 py-3 bg-[#102735] text-white rounded-full font-medium text-sm transition-transform hover:scale-105 active:scale-95">
                    Fale Conosco
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-auto">
              
              {/* Card 1 */}
              <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow h-48 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img src={cardImages[0]} alt="Team" className="w-full h-full object-cover" />
                  </div>
                  <Move className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 leading-snug pr-2">
                  Uma equipe colaborativa que traz clareza a cada detalhe
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow h-48 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img src={cardImages[1]} alt="Experts" className="w-full h-full object-cover" />
                  </div>
                  <Move className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 leading-snug pr-2">
                  Olhar contemporâneo que traduz visão em espaço
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow h-48 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img src={cardImages[2]} alt="Communication" className="w-full h-full object-cover" />
                  </div>
                  <Move className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 leading-snug pr-2">
                  Comunicação autêntica e processos leves
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[60] bg-[#102735]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-fade-in">
          <button 
            onClick={() => setIsVideoOpen(false)} 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={40} strokeWidth={1} />
          </button>
          
          <div className="w-full max-w-6xl aspect-video rounded-lg overflow-hidden shadow-2xl bg-[#102735]">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/2g811Eo7K8U?autoplay=1" 
              title="Interior Design Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoTestimonialSection;