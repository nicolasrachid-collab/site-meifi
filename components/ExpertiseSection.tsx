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

  // Desenhos SVG - mesmo desenho para compacto e expandido
  const drawings = {
    residential: (
      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Casa residencial minimalista */}
        <rect x="120" y="150" width="160" height="100" stroke="white" opacity="0.9"/>
        <polygon points="200,80 120,150 280,150" stroke="white" opacity="0.9"/>
        <rect x="160" y="180" width="40" height="70" stroke="white" opacity="0.7"/>
        <rect x="220" y="180" width="30" height="30" stroke="white" opacity="0.7"/>
        <line x1="200" y1="150" x2="200" y2="250" stroke="white" opacity="0.5"/>
        <circle cx="180" cy="195" r="3" fill="white" opacity="0.6"/>
        <circle cx="240" cy="195" r="3" fill="white" opacity="0.6"/>
        {/* Detalhes decorativos */}
        <line x1="100" y1="200" x2="120" y2="200" stroke="white" opacity="0.4"/>
        <line x1="280" y1="200" x2="300" y2="200" stroke="white" opacity="0.4"/>
      </svg>
    ),
    commercial: (
      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Edifício comercial moderno */}
        <rect x="100" y="100" width="200" height="150" stroke="white" opacity="0.9"/>
        <line x1="150" y1="100" x2="150" y2="250" stroke="white" opacity="0.7"/>
        <line x1="200" y1="100" x2="200" y2="250" stroke="white" opacity="0.7"/>
        <line x1="250" y1="100" x2="250" y2="250" stroke="white" opacity="0.7"/>
        <line x1="100" y1="150" x2="300" y2="150" stroke="white" opacity="0.7"/>
        <line x1="100" y1="200" x2="300" y2="200" stroke="white" opacity="0.7"/>
        <rect x="120" y="120" width="60" height="20" stroke="white" opacity="0.6"/>
        <rect x="220" y="120" width="60" height="20" stroke="white" opacity="0.6"/>
        <rect x="120" y="170" width="60" height="20" stroke="white" opacity="0.6"/>
        <rect x="220" y="170" width="60" height="20" stroke="white" opacity="0.6"/>
        {/* Detalhes estruturais */}
        <line x1="80" y1="110" x2="100" y2="110" stroke="white" opacity="0.4"/>
        <line x1="300" y1="110" x2="320" y2="110" stroke="white" opacity="0.4"/>
      </svg>
    ),
    urban: (
      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Cidade/Urbanismo */}
        <rect x="80" y="120" width="60" height="130" stroke="white" opacity="0.9"/>
        <rect x="160" y="100" width="80" height="150" stroke="white" opacity="0.9"/>
        <rect x="260" y="140" width="60" height="110" stroke="white" opacity="0.9"/>
        {/* Linha do horizonte */}
        <line x1="0" y1="250" x2="400" y2="250" stroke="white" opacity="0.6" strokeWidth="2"/>
        {/* Janelas */}
        <rect x="95" y="140" width="15" height="15" stroke="white" opacity="0.5"/>
        <rect x="115" y="140" width="15" height="15" stroke="white" opacity="0.5"/>
        <rect x="95" y="165" width="15" height="15" stroke="white" opacity="0.5"/>
        <rect x="115" y="165" width="15" height="15" stroke="white" opacity="0.5"/>
        <rect x="175" y="120" width="20" height="20" stroke="white" opacity="0.5"/>
        <rect x="200" y="120" width="20" height="20" stroke="white" opacity="0.5"/>
        <rect x="225" y="120" width="20" height="20" stroke="white" opacity="0.5"/>
        <rect x="175" y="150" width="20" height="20" stroke="white" opacity="0.5"/>
        <rect x="200" y="150" width="20" height="20" stroke="white" opacity="0.5"/>
        <rect x="225" y="150" width="20" height="20" stroke="white" opacity="0.5"/>
        <rect x="275" y="160" width="15" height="15" stroke="white" opacity="0.5"/>
        <rect x="295" y="160" width="15" height="15" stroke="white" opacity="0.5"/>
        {/* Elementos urbanos */}
        <circle cx="110" cy="150" r="4" fill="white" opacity="0.4"/>
        <circle cx="200" cy="130" r="4" fill="white" opacity="0.4"/>
        <circle cx="290" cy="170" r="4" fill="white" opacity="0.4"/>
      </svg>
    )
  };

  return (
    <div className={`w-full h-full flex items-center justify-center rounded-lg text-[#FEFBF1] ${isCompact ? '' : 'p-8'}`}>
      {drawings[type]}
    </div>
  );
};

const ExpertiseSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);

  const items: ExpertiseItem[] = [
    {
      id: 1,
      number: '01',
      title: 'Projetos Residenciais',
      subtitle: 'Espaços que acolhem',
      statValue: '20+',
      statLabel: '/ Casas autênticas',
      description: 'Criamos refúgios funcionais que refletem sua personalidade. Unimos conforto e sofisticação com o cuidado mineiro em cada detalhe.',
      image: '',
      drawingType: 'residential'
    },
    {
      id: 2,
      number: '02',
      title: 'Espaços Comerciais',
      subtitle: 'Ambientes com propósito',
      statValue: '15+',
      statLabel: '/ Lojas e Escritórios',
      description: 'Projetamos espaços que traduzem a identidade da sua marca, otimizando a funcionalidade e criando experiências marcantes para seus clientes.',
      image: '',
      drawingType: 'commercial'
    },
    {
      id: 3,
      number: '03',
      title: 'Urbanismo e Loteamentos',
      subtitle: 'Conectando a cidade',
      statValue: '05+',
      statLabel: '/ Empreendimentos',
      description: 'Desenvolvemos soluções para loteamentos e edifícios, focando na sustentabilidade, impacto social e na humanização do espaço urbano.',
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
            Nossa Expertise
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Oferecemos um portfólio diversificado em projetos residenciais, corporativos e urbanísticos — sempre equilibrando estética, funcionalidade e propósito.
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
              className={`border-b border-white/10 transition-all duration-500 ease-in-out ${isActive ? 'py-12' : 'py-8 cursor-pointer hover:bg-white/5'}`}
              onClick={() => !isActive && setActiveId(item.id)}
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-16">
                
                {/* Number */}
                <span className="text-sm font-medium text-gray-400 w-8 pt-1 flex-shrink-0">
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
                            className="absolute top-0 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveId(0); // Optional: allow collapsing all
                            }}
                        >
                            <X className="w-5 h-5 text-gray-300" />
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

                        <div>
                             <button className="px-6 py-3 bg-white text-[#08131A] rounded-full font-medium text-sm transition-transform hover:scale-105 active:scale-95">
                                Solicitar Proposta
                            </button>
                        </div>
                    </div>
                  </>
                ) : (
                  // Collapsed Content
                  <>
                    {/* Thumbnail Drawing */}
                    <div className="w-32 h-20 md:w-40 md:h-28 rounded-lg overflow-hidden flex-shrink-0 hidden md:block">
                      <LineDrawing type={item.drawingType} isCompact={true} />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex-grow flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl font-medium text-[#FEFBF1] mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.subtitle}</p>
                    </div>

                    {/* Plus Button */}
                    <div className="flex items-center justify-end">
                         <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400">
                            <Plus className="w-5 h-5" />
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