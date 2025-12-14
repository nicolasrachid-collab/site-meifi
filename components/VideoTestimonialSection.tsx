'use client';

import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoTestimonialSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Imagem principal (grupo MEIFI)
  const mainImage = "/meifi_grupo.png";

  return (
    <>
      <section className="w-full bg-[#FAFAFA] text-[#08131A] py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-start">
            
            {/* Left Side - Content (Título e Texto primeiro) */}
            <div className="w-full lg:w-[58%] xl:w-[62%] flex flex-col gap-10 lg:gap-12 order-1 lg:order-1">
              
              {/* Título - Primeiro */}
              <div className="flex flex-col gap-8 lg:gap-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium tracking-tight leading-[1.05] text-[#08131A] max-w-3xl">
                  Arquitetura feita com calma,<br />
                  cuidado e <span className="italic text-[#6B7280]">propósito.</span>
                </h2>

                {/* Texto - Segundo */}
                <div className="flex flex-col max-w-2xl">
                  <div className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed space-y-5">
                    <p>
                      A MEIFI nasce do encontro entre sensibilidade, técnica e tempo. Desde o início, nosso olhar sempre esteve voltado para as pessoas e para a forma como elas vivem os espaços no dia a dia.
                    </p>
                    <p>
                      Acreditamos que arquitetura não é apenas forma ou estética. É escuta, cuidado e intenção. Cada projeto começa com uma boa conversa e se desenvolve com atenção aos detalhes, respeitando rotinas, desejos e histórias.
                    </p>
                    <p>
                      Inspirados pela tranquilidade e pelo cuidado mineiro, buscamos criar uma arquitetura contemporânea, humana e atemporal, capaz de traduzir identidade em espaço e transformar ideias em experiências reais.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Card 1 */}
                <div className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-200/60 hover:border-[#08131A]/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                  <h3 className="text-lg md:text-xl font-serif font-medium text-[#08131A] mb-3 md:mb-4">
                    Equipe colaborativa
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Trabalho conjunto, troca constante e atenção a cada detalhe do processo.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-200/60 hover:border-[#08131A]/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                  <h3 className="text-lg md:text-xl font-serif font-medium text-[#08131A] mb-3 md:mb-4">
                    Olhar contemporâneo
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Arquitetura atual, sensível e alinhada ao tempo em que vivemos.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-200/60 hover:border-[#08131A]/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                  <h3 className="text-lg md:text-xl font-serif font-medium text-[#08131A] mb-3 md:mb-4">
                    Comunicação autêntica
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Processos claros, diálogo aberto e decisões construídas com leveza.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Side - Large Image with Video Trigger (Terceiro) */}
            <div className="w-full lg:w-[42%] xl:w-[38%] relative group cursor-pointer flex-shrink-0 order-2 lg:order-2" onClick={() => setIsVideoOpen(true)}>
              <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden relative shadow-xl group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={mainImage} 
                  alt="Equipe MEIFI" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08131A]/40 via-transparent to-transparent group-hover:from-[#08131A]/50 transition-colors duration-500"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm border-2 border-white/50 pl-3 pr-7 py-3 rounded-full hover:bg-white transition-all duration-300 hover:scale-105 group-hover:scale-110 shadow-2xl">
                    <div className="w-12 h-12 bg-[#08131A] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play size={18} fill="#FEFBF1" className="text-[#FEFBF1] ml-0.5" />
                    </div>
                    <span className="text-[#08131A] font-semibold text-sm md:text-base">Nossa história</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-[#08131A]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoOpen(false);
            }} 
            className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 flex items-center justify-center text-[#FEFBF1] hover:text-[#FEFBF1] transition-all duration-300 hover:scale-110 shadow-xl z-10"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
          
          <div 
            className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-[#08131A] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/2g811Eo7K8U?autoplay=1" 
              title="Nossa história - MEIFI" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoTestimonialSection;