'use client';

import React, { useState } from 'react';
import { Play, X, Scan, Move } from 'lucide-react';

const VideoTestimonialSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Imagem principal (grupo MEIFI)
  const mainImage = "/meifi_grupo.png";
  
  // Imagens dos cards
  const cardImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop", // Team
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=500&auto=format&fit=crop", // Experts
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=500&auto=format&fit=crop"  // Communication
  ];

  return (
    <>
      <section className="w-full bg-[#FAFAFA] text-[#08131A] py-24 px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-start lg:items-center">
          
          {/* Left Side - Large Image with Video Trigger */}
          <div className="w-full lg:w-[35%] xl:w-[30%] relative group cursor-pointer flex-shrink-0" onClick={() => setIsVideoOpen(true)}>
            <div className="aspect-square w-full rounded-2xl overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <img 
                src={mainImage} 
                alt="Architecture at dusk" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#08131A]/10 group-hover:bg-[#08131A]/20 transition-colors duration-500"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 pl-2 pr-6 py-2.5 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 group-hover:scale-110">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play size={16} fill="#08131A" className="text-[#08131A]" />
                  </div>
                  <span className="text-[#FEFBF1] font-medium text-sm">Nossa história</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:flex-1 flex flex-col gap-8 lg:gap-12">
            
            {/* Top Content */}
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-[1.1] text-gray-900">
                Arquitetura feita com calma,<br />
                cuidado e <span className="italic text-[#6B7280]">propósito.</span>
              </h2>

              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                <div className="flex-1 max-w-2xl">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    A MEIFI trouxe um olhar contemporâneo e humano para o nosso projeto. Superando o convencional, eles aplicaram a tranquilidade e a atenção aos detalhes típicas de Minas, criando algo que realmente nos representa.
                  </p>
                </div>

                <div className="flex-shrink-0 md:self-start">
                  <button className="px-8 py-3 bg-[#08131A] text-[#FEFBF1] rounded-full font-medium text-sm transition-all hover:bg-[#275B7A] hover:scale-105 active:scale-95 shadow-md hover:shadow-lg whitespace-nowrap">
                    Fale Conosco
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Card 1 */}
              <div className="group relative bg-gradient-to-br from-white to-gray-50/50 p-8 rounded-3xl border border-gray-200/50 hover:border-[#275B7A]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between min-h-[200px] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#275B7A]/5 rounded-full blur-3xl group-hover:bg-[#275B7A]/10 transition-colors duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg ring-2 ring-gray-100 group-hover:ring-[#275B7A]/20 transition-all duration-500">
                      <img src={cardImages[0]} alt="Team" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#275B7A] flex items-center justify-center transition-all duration-500 group-hover:rotate-12">
                      <Move className="w-4 h-4 text-gray-400 group-hover:text-[#FEFBF1] transition-colors duration-300" />
                    </div>
                  </div>
                  <p className="text-base font-medium text-gray-900 leading-relaxed group-hover:text-[#08131A] transition-colors">
                    Uma equipe colaborativa que traz clareza a cada detalhe
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative bg-gradient-to-br from-white to-gray-50/50 p-8 rounded-3xl border border-gray-200/50 hover:border-[#275B7A]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between min-h-[200px] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#275B7A]/5 rounded-full blur-3xl group-hover:bg-[#275B7A]/10 transition-colors duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg ring-2 ring-gray-100 group-hover:ring-[#275B7A]/20 transition-all duration-500">
                      <img src={cardImages[1]} alt="Experts" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#275B7A] flex items-center justify-center transition-all duration-500 group-hover:rotate-12">
                      <Move className="w-4 h-4 text-gray-400 group-hover:text-[#FEFBF1] transition-colors duration-300" />
                    </div>
                  </div>
                  <p className="text-base font-medium text-gray-900 leading-relaxed group-hover:text-[#08131A] transition-colors">
                    Olhar contemporâneo que traduz visão em espaço
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative bg-gradient-to-br from-white to-gray-50/50 p-8 rounded-3xl border border-gray-200/50 hover:border-[#275B7A]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between min-h-[200px] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#275B7A]/5 rounded-full blur-3xl group-hover:bg-[#275B7A]/10 transition-colors duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg ring-2 ring-gray-100 group-hover:ring-[#275B7A]/20 transition-all duration-500">
                      <img src={cardImages[2]} alt="Communication" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#275B7A] flex items-center justify-center transition-all duration-500 group-hover:rotate-12">
                      <Move className="w-4 h-4 text-gray-400 group-hover:text-[#FEFBF1] transition-colors duration-300" />
                    </div>
                  </div>
                  <p className="text-base font-medium text-gray-900 leading-relaxed group-hover:text-[#08131A] transition-colors">
                    Comunicação autêntica e processos leves
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[60] bg-[#08131A]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-fade-in">
          <button 
            onClick={() => setIsVideoOpen(false)} 
            className="absolute top-6 right-6 text-[#FEFBF1]/70 hover:text-[#FEFBF1] transition-colors"
          >
            <X size={40} strokeWidth={1} />
          </button>
          
          <div className="w-full max-w-6xl aspect-video rounded-lg overflow-hidden shadow-2xl bg-[#08131A]">
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