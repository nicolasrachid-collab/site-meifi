'use client';

import React, { useState } from 'react';
import { ChevronRight, ScanLine, ArrowRight } from 'lucide-react';

const InsightsSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const featuredPost = {
    date: "Jun 19, 2025",
    title: "O conceito 'Meio Fio' na Arquitetura",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop" // Escada/Concreto/Moderno
  };

  const insights = [
    {
      id: 1,
      date: "Jun 18, 2025",
      title: "Como o Espaço Afeta o Bem-Estar",
      content: "A iluminação, o espaço aberto e elementos biofílicos influenciam diretamente nossos níveis de bem-estar. Projetamos layouts que maximizam a luz natural para acolher e inspirar."
    },
    {
      id: 2,
      date: "Jun 19, 2025",
      title: "Encontrando o Equilíbrio Certo",
      content: "Regras clássicas funcionam, mas quebrá-las intencionalmente cria caráter. Focamos em equilibrar texturas com cores para criar profundidade sem poluição visual, mantendo a autenticidade e simplicidade."
    },
    {
      id: 3,
      date: "Jun 18, 2025",
      title: "Por que a Sustentabilidade é Essencial",
      content: "Do material escolhido à eficiência energética, cada decisão importa. Acreditamos que a beleza deve ter propósito, e a responsabilidade ambiental é parte fundamental da nossa arquitetura."
    }
  ];

  const toggleInsight = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="w-full bg-[#FAFAFA] text-[#08131A] py-24 px-6 md:px-12 lg:px-16">
      
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#08131A] max-w-2xl">
          Dicas MEIFI para o <span className="italic text-[#6B7280]">seu projeto.</span>
        </h2>
        
        <div className="flex flex-col items-start lg:items-end text-left lg:text-right">
          <p className="text-gray-600 text-sm md:text-base leading-snug max-w-xs mb-6">
            Explore ideias, tendências e histórias dos bastidores do nosso escritório.
          </p>
          <button className="px-8 py-3 bg-[#08131A] text-[#FEFBF1] rounded-full font-medium text-sm transition-transform hover:scale-105 active:scale-95">
            Ver tudo
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Featured Card */}
        <div className="relative w-full h-[500px] lg:h-auto rounded-2xl overflow-hidden group cursor-pointer shadow-sm animate-fade-in-up">
          <img 
            src={featuredPost.image} 
            alt="Interior em destaque" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08131A]/60 via-transparent to-transparent"></div>
          
          {/* Content Overlay */}
          <div className="absolute top-6 left-6">
            <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold text-[#08131A] tracking-wide uppercase">
              {featuredPost.date}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <h3 className="text-2xl md:text-3xl text-[#FEFBF1] font-medium max-w-sm drop-shadow-md">
              {featuredPost.title}
            </h3>
            
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
               <ChevronRight className="w-6 h-6 text-[#08131A]" />
            </div>
          </div>
        </div>

        {/* Right Column: Expandable List */}
        <div className="flex flex-col gap-4">
          {insights.map((item, index) => {
             const isOpen = activeId === item.id;
             
             return (
              <div 
                key={item.id}
                onClick={() => toggleInsight(item.id)}
                className={`bg-white rounded-2xl p-8 transition-all duration-300 shadow-sm cursor-pointer hover:shadow-md border border-transparent ${isOpen ? 'border-gray-200' : ''} animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-start gap-4">
                    {/* Decorative Icon */}
                    <ScanLine className="w-5 h-5 text-gray-400 rotate-90" strokeWidth={1.5} />
                    
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                        {item.date}
                      </span>
                      <h3 className="text-xl md:text-2xl font-medium text-[#08131A]">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 flex-shrink-0 ml-4 ${isOpen ? 'bg-[#08131A] text-[#FEFBF1]' : 'bg-[#08131A] text-[#FEFBF1]'}`}>
                    <ChevronRight className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {/* Expandable Content */}
                <div 
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] mt-6 pt-6 border-t border-gray-100' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-600 leading-relaxed text-base">
                      {item.content}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#08131A] group hover:underline">
                        Ler artigo completo <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
             );
          })}
        </div>

      </div>
    </section>
  );
};

export default InsightsSection;