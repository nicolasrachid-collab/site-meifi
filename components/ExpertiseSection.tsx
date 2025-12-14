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
}

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
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 2,
      number: '02',
      title: 'Espaços Comerciais',
      subtitle: 'Ambientes com propósito',
      statValue: '15+',
      statLabel: '/ Lojas e Escritórios',
      description: 'Projetamos espaços que traduzem a identidade da sua marca, otimizando a funcionalidade e criando experiências marcantes para seus clientes.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 3,
      number: '03',
      title: 'Urbanismo e Loteamentos',
      subtitle: 'Conectando a cidade',
      statValue: '05+',
      statLabel: '/ Empreendimentos',
      description: 'Desenvolvemos soluções para loteamentos e edifícios, focando na sustentabilidade, impacto social e na humanização do espaço urbano.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  return (
    <section className="w-full bg-[#08131A] text-white py-24 px-6 md:px-12 lg:px-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 relative">
        <div className="max-w-2xl">
          <h2 className="text-h1 md:text-display-lg lg:text-display-xl font-medium mb-6">
            Nossa Expertise
          </h2>
          <p className="text-gray-400 text-body-lg max-w-xl">
            Oferecemos um portfólio diversificado em projetos residenciais, corporativos e urbanísticos — sempre equilibrando estética, funcionalidade e propósito.
          </p>
        </div>
        
        {/* Decorative Icon top right */}
        <div className="absolute top-0 right-0 hidden md:block">
           <Scan className="w-6 h-6 text-white opacity-80" strokeWidth={1.5} />
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
                <span className="text-body-sm font-medium text-gray-400 w-8 pt-1 flex-shrink-0">
                  {item.number}
                </span>

                {isActive ? (
                  // Expanded Content
                  <>
                    {/* Large Image */}
                    <div className="w-full md:w-1/3 lg:w-[400px] aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
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
                            <h3 className="text-h2 md:text-h1 font-medium mb-2">{item.title}</h3>
                            <p className="text-text-tertiary mb-12 text-body-lg">{item.subtitle}</p>

                            {item.statValue && (
                                <div className="mb-6">
                                    <span className="text-display-lg md:text-display-xl font-medium block mb-1">
                                        {item.statValue}
                                    </span>
                                    <span className="text-body-sm text-gray-400">
                                        {item.statLabel}
                                    </span>
                                </div>
                            )}

                            <p className="text-gray-400 text-body-lg max-w-md mb-8">
                                {item.description}
                            </p>
                        </div>

                        <div>
                             <button className="px-8 py-3 bg-white text-[#08131A] rounded-full font-semibold text-body-sm tracking-wide transition-transform hover:scale-105 active:scale-95">
                                Solicitar Proposta
                            </button>
                        </div>
                    </div>
                  </>
                ) : (
                  // Collapsed Content
                  <>
                    {/* Thumbnail */}
                    <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0 hidden md:block">
                         <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60" />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex-grow flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl font-medium text-white mb-1">{item.title}</h3>
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