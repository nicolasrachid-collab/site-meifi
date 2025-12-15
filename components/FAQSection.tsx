'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';

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

  return (
    <section className="w-full bg-[#FAFAFA] text-[#08131A] py-24 px-6 md:px-12 lg:px-[232px]">
      
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#08131A] mb-6">
          Dúvida? MEIFI responde com <span className="italic text-[#6B7280]">clareza</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-snug max-w-2xl">
          Respondemos as dúvidas mais comuns para te ajudar a dar o próximo passo.
        </p>
      </div>

      {/* FAQ Accordion */}
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

    </section>
  );
};

export default FAQSection;