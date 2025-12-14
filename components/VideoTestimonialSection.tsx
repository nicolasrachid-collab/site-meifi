'use client';

import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoTestimonialSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Imagem principal (grupo MEIFI)
  const mainImage = "/meifi_grupo.png";

  return (
    <>
      <section className="w-full bg-[#FAFAFA] text-[#08131A] py-24 px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-start lg:items-end">
          
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
          <div className="w-full lg:flex-1 flex flex-col gap-8 lg:gap-12 justify-end">
            
            {/* Top Content */}
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-[1.1] text-gray-900">
                Arquitetura feita com calma,<br />
                cuidado e <span className="italic text-[#6B7280]">propósito.</span>
              </h2>

              <div className="flex flex-col">
                <div className="flex-1 max-w-2xl">
                  <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-4">
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

            {/* Bottom Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Card 1 */}
              <div className="group bg-white p-8 rounded-2xl border border-gray-200/50 hover:border-gray-300 transition-all duration-500 hover:shadow-lg flex flex-col">
                <h3 className="text-xl font-serif font-medium text-[#08131A] mb-4">
                  Equipe colaborativa
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Trabalho conjunto, troca constante e atenção a cada detalhe do processo.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group bg-white p-8 rounded-2xl border border-gray-200/50 hover:border-gray-300 transition-all duration-500 hover:shadow-lg flex flex-col">
                <h3 className="text-xl font-serif font-medium text-[#08131A] mb-4">
                  Olhar contemporâneo
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Arquitetura atual, sensível e alinhada ao tempo em que vivemos.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group bg-white p-8 rounded-2xl border border-gray-200/50 hover:border-gray-300 transition-all duration-500 hover:shadow-lg flex flex-col">
                <h3 className="text-xl font-serif font-medium text-[#08131A] mb-4">
                  Comunicação autêntica
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Processos claros, diálogo aberto e decisões construídas com leveza.
                </p>
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