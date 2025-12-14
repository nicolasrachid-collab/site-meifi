'use client';

import React, { useState } from 'react';
import { ChevronDown, Scan, MessageSquare } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Segundo item aberto por padrão

  const faqs = [
    {
      question: "Quais serviços a MEIFI oferece?",
      answer: "Oferecemos soluções completas em arquitetura: projetos residenciais, comerciais, corporativos e de interiores. Além disso, atuamos com urbanismo e loteamentos, sempre com foco em funcionalidade e estética."
    },
    {
      question: "Como funciona o processo de design?",
      answer: "Nosso processo começa com a escuta genuína. Passamos pelo desenvolvimento do conceito, execução do projeto e entrega final. Mantemos uma colaboração clara e troca constante em cada etapa."
    },
    {
      question: "Quanto tempo leva um projeto típico?",
      answer: "Os prazos variam conforme a escala e complexidade. Um projeto de interiores pode levar de 4 a 6 semanas, enquanto um edifício ou residência completa pode levar meses. Fornecemos um cronograma detalhado na proposta."
    },
    {
      question: "Posso solicitar revisões?",
      answer: "Com certeza. Acreditamos que o projeto é uma construção conjunta. Incluímos rodadas de revisão em cada etapa para garantir que o resultado final esteja alinhado com sua visão e necessidades."
    },
    {
      question: "Vocês atendem fora de Minas Gerais?",
      answer: "Sim, atuamos expandindo horizontes, com foco especial em Minas Gerais e Rio de Janeiro, mas atendemos clientes de outras regiões através de consultorias e projetos à distância."
    },
    {
      question: "Qual é o diferencial da MEIFI?",
      answer: "Nosso diferencial está na abordagem autoral e humana. Unimos a tranquilidade e o cuidado mineiro a referências internacionais, criando espaços contemporâneos que fogem do convencional."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Imagem de equipe colaborando em mesa
  const teamImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop";

  return (
    <section className="w-full bg-[#FAFAFA] text-[#08131A] py-24 px-6 md:px-12 lg:px-16">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#08131A]">
          Respostas que trazem clareza
        </h2>
        
        <div className="flex items-start gap-4 max-w-sm lg:text-right lg:items-end lg:flex-col">
           <div className="hidden lg:block">
              <Scan className="w-6 h-6 text-[#08131A] opacity-80 ml-auto" />
           </div>
           <p className="text-gray-600 text-sm md:text-base leading-snug">
             Respondemos as dúvidas mais comuns para te ajudar a dar o próximo passo.
           </p>
           {/* Mobile icon */}
           <div className="lg:hidden">
              <Scan className="w-6 h-6 text-[#08131A] opacity-80" />
           </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Column: FAQ Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-transparent hover:border-gray-100"
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`px-6 md:px-8 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}
                >
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Image with Floating CTA */}
        <div className="relative rounded-2xl overflow-hidden h-[500px] lg:h-auto shadow-md group">
          <img 
            src={teamImage} 
            alt="Equipe trabalhando junta" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Dark Overlay for better text visibility if needed, mostly for style */}
          <div className="absolute inset-0 bg-[#08131A]/10 group-hover:bg-[#08131A]/0 transition-colors"></div>

          {/* Floating Pill CTA at Bottom */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-[#1A1A1A]/90 backdrop-blur-md rounded-full p-2 pl-6 flex justify-between items-center shadow-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <Scan className="w-4 h-4 text-white/60" />
                <span className="text-white font-medium text-sm md:text-base">
                  Ainda tem dúvidas?
                </span>
              </div>
              <button className="bg-white text-[#08131A] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                Fale Conosco
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default FAQSection;