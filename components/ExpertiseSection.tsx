'use client';

import React, { useState } from 'react';
import { Plus, X, Scan } from 'lucide-react';

interface ExpertiseItem {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  statValue?: string;
  statLabel?: string;
  description?: string;
  image: string;
  drawingType: 'residential' | 'commercial' | 'urban';
}

// Componente de desenho de traço arquitetônico
const LineDrawing: React.FC<{ type: 'residential' | 'commercial' | 'urban'; isCompact?: boolean }> = ({ type, isCompact = false }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Opcional: desconectar após primeira visualização para melhor performance
            // observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2, // Dispara quando 20% do elemento está visível
        rootMargin: '0px 0px -50px 0px', // Aguarda um pouco antes de disparar
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Desenhos SVG - mesmo desenho para compacto e expandido
  const drawings = {
    residential: (
      <img 
        src="/banner-residencial.svg" 
        alt="Projetos Residenciais" 
        className={`w-full h-full object-contain transition-opacity duration-1000 ${isVisible ? 'animate-svg-fade-in animate-svg-float' : 'opacity-0'}`}
      />
    ),
    commercial: (
      <img 
        src="/banner-comercial.svg" 
        alt="Espaços Comerciais" 
        className={`w-full h-full object-contain transition-opacity duration-1000 ${isVisible ? 'animate-svg-fade-in animate-svg-float' : 'opacity-0'}`}
      />
    ),
    urban: (
      <img 
        src="/banner-urbanismo.svg" 
        alt="Urbanismo e Loteamentos" 
        className={`w-full h-full object-contain transition-opacity duration-1000 ${isVisible ? 'animate-svg-fade-in animate-svg-float' : 'opacity-0'}`}
      />
    )
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center rounded-lg text-[#FEFBF1] ${isCompact ? '' : 'p-8'}`}
    >
      {drawings[type]}
    </div>
  );
};

const ExpertiseSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(0);

  const items: ExpertiseItem[] = [
    {
      id: 1,
      number: '01',
      title: 'Projetos Residenciais',
      subtitle: 'Espaços que acolhem',
      statValue: '20+',
      statLabel: 'casas autênticas',
      description: 'Criamos residências que vão além da estética. São espaços funcionais, acolhedores e personalizados, pensados para refletir o estilo de vida e a identidade de cada cliente. Cada detalhe é cuidadosamente desenvolvido, unindo conforto, sofisticação e sensibilidade arquitetônica.',
      image: '',
      drawingType: 'residential'
    },
    {
      id: 2,
      number: '02',
      title: 'Espaços Comerciais',
      subtitle: 'Ambientes com propósito',
      statValue: '15+',
      statLabel: 'Lojas e escritórios',
      description: 'Projetamos espaços comerciais que expressam a identidade da marca, potencializam a funcionalidade e criam experiências consistentes e memoráveis para clientes e colaboradores.',
      image: '',
      drawingType: 'commercial'
    },
    {
      id: 3,
      number: '03',
      title: 'Urbanismo e Loteamentos',
      subtitle: 'Conectando a cidade',
      statValue: '05+',
      statLabel: 'Empreendimentos',
      description: 'Desenvolvemos soluções urbanísticas que promovem integração, sustentabilidade e qualidade de vida, com foco no impacto social e na humanização dos espaços urbanos.',
      image: '',
      drawingType: 'urban'
    }
  ];

  return (
    <section className="w-full bg-[#08131A] text-[#FEFBF1] py-24 px-6 md:px-12 lg:px-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 relative">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight mb-6 text-[#FEFBF1]">
            Tipos de Serviço
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Atuamos em diferentes escalas e tipologias, oferecendo soluções arquitetônicas completas, desenvolvidas com rigor técnico, sensibilidade estética e atenção às necessidades de cada projeto.
          </p>
        </div>
        
        {/* Decorative Icon top right */}
        <div className="absolute top-0 right-0 hidden md:block">
           <Scan className="w-6 h-6 text-[#FEFBF1] opacity-80" strokeWidth={1.5} />
        </div>
      </div>

      {/* Accordion List */}
      <div className="border-t border-white/10">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <div 
              key={item.id} 
              className={`border-b border-white/10 transition-all duration-700 ease-out ${isActive ? 'py-12 md:py-16' : 'py-6 md:py-8 cursor-pointer hover:bg-white/5'}`}
              onClick={() => !isActive && setActiveId(item.id)}
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 items-start md:items-center">
                
                {/* Number */}
                <span className="text-xl md:text-2xl font-semibold text-[#FEFBF1] w-12 md:w-16 flex-shrink-0 self-start md:self-center tracking-tight">
                  {item.number}
                </span>

                {isActive ? (
                  // Expanded Content
                  <>
                    {/* Large Drawing */}
                    <div className="w-full md:w-1/3 lg:w-[400px] aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
                      <LineDrawing type={item.drawingType} />
                    </div>

                    {/* Detailed Info */}
                    <div className="flex-grow flex flex-col justify-between relative">
                        {/* Close Button absolute top right of content area */}
                        <button 
                            className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 flex items-center justify-center text-[#FEFBF1] hover:text-[#FEFBF1] transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveId(0); // Optional: allow collapsing all
                            }}
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div>
                            <h3 className="text-2xl md:text-3xl font-medium mb-2">{item.title}</h3>
                            <p className="text-gray-500 mb-12">{item.subtitle}</p>

                            {item.statValue && (
                                <div className="mb-6">
                                    <span className="text-4xl md:text-5xl font-medium block mb-1">
                                        {item.statValue}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        {item.statLabel}
                                    </span>
                                </div>
                            )}

                            <p className="text-gray-400 leading-relaxed max-w-md mb-8">
                                {item.description}
                            </p>
                        </div>
                    </div>
                  </>
                ) : (
                  // Collapsed Content
                  <>
                    {/* Title & Subtitle */}
                    <div className="flex-grow flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl font-medium text-[#FEFBF1] mb-1.5">{item.title}</h3>
                        <p className="text-gray-500 text-sm md:text-base">{item.subtitle}</p>
                    </div>

                    {/* Plus Button */}
                    <div className="flex items-center justify-end flex-shrink-0">
                         <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/5 border-2 border-white/30 hover:bg-white/10 hover:border-white/50 flex items-center justify-center text-[#FEFBF1] hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <Plus className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
                         </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default ExpertiseSection;