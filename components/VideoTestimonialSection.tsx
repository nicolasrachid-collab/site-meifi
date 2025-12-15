'use client';

import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoTestimonialSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Imagem principal (grupo MEIFI)
  const mainImage = "/meifi_grupo.png";

  return (
    <>
      <section className="w-full bg-[#FAFAFA] text-[#08131A] py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-[232px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-start lg:items-stretch">
            
            {/* Left Side - Content (Título e Texto primeiro) */}
            <div className="w-full lg:w-[58%] xl:w-[62%] flex flex-col gap-10 lg:gap-12 order-1 lg:order-1">
              
              {/* Título - Primeiro */}
              <div className="flex flex-col gap-8 lg:gap-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif font-medium tracking-tight leading-[1.1] text-[#08131A] max-w-4xl">
                  Arquitetura feita com<br className="hidden md:block" />
                  <span className="md:inline"> calma, cuidado e </span>
                  <span className="italic text-[#6B7280]">propósito.</span>
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
            </div>

            {/* Right Side - Large Image with Video Trigger (Terceiro) */}
            <div className="w-full lg:w-[42%] xl:w-[38%] relative group cursor-pointer flex-shrink-0 order-2 lg:order-2 flex" onClick={() => setIsVideoOpen(true)}>
              <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-xl group-hover:shadow-2xl transition-all duration-500">
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

          {/* Cards Grid - Largura Total */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16">
            
            {/* Card 1 */}
            <div className="group relative bg-gradient-to-br from-white/90 via-white/85 to-white/80 backdrop-blur-xl p-7 md:p-9 rounded-[20px] border border-gray-200/50 hover:border-[#08131A]/30 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] flex flex-col overflow-hidden">
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Linha decorativa superior */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#08131A]/10 to-transparent group-hover:via-[#08131A]/30 transition-all duration-700"></div>
              
              {/* Conteúdo */}
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-serif font-medium text-[#08131A] mb-4 md:mb-5 group-hover:text-[#08131A] transition-colors duration-700">
                  Equipe colaborativa
                </h3>
                <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-700 leading-relaxed transition-colors duration-700">
                  Trabalho conjunto, troca constante e atenção a cada detalhe do processo.
                </p>
              </div>
              
              {/* Ícone decorativo no hover */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#08131A]/10 blur-xl"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-gradient-to-br from-white/90 via-white/85 to-white/80 backdrop-blur-xl p-7 md:p-9 rounded-[20px] border border-gray-200/50 hover:border-[#08131A]/30 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] flex flex-col overflow-hidden">
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Linha decorativa superior */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#08131A]/10 to-transparent group-hover:via-[#08131A]/30 transition-all duration-700"></div>
              
              {/* Conteúdo */}
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-serif font-medium text-[#08131A] mb-4 md:mb-5 group-hover:text-[#08131A] transition-colors duration-700">
                  Olhar contemporâneo
                </h3>
                <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-700 leading-relaxed transition-colors duration-700">
                  Arquitetura atual, sensível e alinhada ao tempo em que vivemos.
                </p>
              </div>
              
              {/* Ícone decorativo no hover */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#08131A]/10 blur-xl"></div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-gradient-to-br from-white/90 via-white/85 to-white/80 backdrop-blur-xl p-7 md:p-9 rounded-[20px] border border-gray-200/50 hover:border-[#08131A]/30 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] flex flex-col overflow-hidden">
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Linha decorativa superior */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#08131A]/10 to-transparent group-hover:via-[#08131A]/30 transition-all duration-700"></div>
              
              {/* Conteúdo */}
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-serif font-medium text-[#08131A] mb-4 md:mb-5 group-hover:text-[#08131A] transition-colors duration-700">
                  Comunicação autêntica
                </h3>
                <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-700 leading-relaxed transition-colors duration-700">
                  Processos claros, diálogo aberto e decisões construídas com leveza.
                </p>
              </div>
              
              {/* Ícone decorativo no hover */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#08131A]/10 blur-xl"></div>
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