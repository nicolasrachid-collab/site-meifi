'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Scan, Move } from 'lucide-react';

const CallToActionSection: React.FC = () => {
  // Imagem escura, moderna, escada de concreto/madeira com iluminação quente
  const bgImage = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop";
  const profileImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop";

  const sectionRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  // Efeito de Paralaxe Manual
  useEffect(() => {
    const handleScroll = () => {
      // Verifica se é mobile (se for, reduz ou desabilita o efeito para performance)
      const isMobile = window.innerWidth < 768;
      
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const scrollSpeed = isMobile ? 0.1 : 0.4; // Menos movimento no mobile
          setOffsetY((window.scrollY - sectionRef.current.offsetTop) * scrollSpeed);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="contact-section" 
      ref={sectionRef} 
      className="relative w-full min-h-[90vh] overflow-hidden flex flex-col"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 will-change-transform"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          height: '130%', 
          top: '-15%', 
          transform: `translateY(${offsetY}px)`
        }}
      >
        <div className="absolute inset-0 bg-[#08131A]/40"></div>
      </div>

      <div className="relative z-10 flex-grow flex flex-col justify-between p-6 md:p-12 lg:p-16">
        
        {/* 1. Top Content: Headline */}
        <div className="max-w-4xl pt-10">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1] drop-shadow-lg">
            Vamos conversar sobre o seu espaço —<br className="hidden md:block"/>
            estamos prontos quando você estiver
          </h2>
        </div>

        {/* 2. Middle Content: Centered Text */}
        <div className="flex justify-center items-center py-12 md:py-20">
          <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-2xl text-center drop-shadow-md">
            Nosso trabalho fala através das vozes daqueles com quem colaboramos. Parcerias atenciosas, resultados significativos — e espaços que realmente inspiram.
          </p>
        </div>

        {/* 3. Bottom Content: Card (Relative on Mobile, Absolute on Desktop) */}
        <div className="flex flex-col lg:block mt-auto lg:mt-0">
            {/* O card flutua no desktop, mas flui no mobile */}
            <div className="relative lg:absolute lg:bottom-12 lg:right-16 flex justify-end items-end w-full lg:w-auto">
                <div className="bg-[#F9F9F9] p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in-up">
                    
                    {/* Header: Profile & Icon */}
                    <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <img 
                        src={profileImage} 
                        alt="Helena M." 
                        className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex flex-col">
                        <span className="text-[#08131A] font-bold text-base leading-tight">Helena M.</span>
                        <span className="text-gray-500 text-xs font-medium">Consultora MEIFI</span>
                        </div>
                    </div>
                    <Scan className="w-5 h-5 text-[#08131A]" strokeWidth={2} />
                    </div>

                    <p className="text-[#08131A] font-medium text-lg leading-snug mb-8">
                    Com clareza, criatividade e precisão.
                    </p>

                    <div className="flex justify-end">
                    <button className="bg-[#08131A] text-white px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform active:scale-95 shadow-lg w-full md:w-auto">
                        Solicite um Orçamento
                    </button>
                    </div>

                </div>
            </div>
        </div>

        {/* Decorative Corner Icon (Hidden on mobile) */}
        <div className="absolute bottom-12 left-16 hidden lg:block">
             <Move className="w-6 h-6 text-white/50" strokeWidth={1.5} />
        </div>

      </div>
    </section>
  );
};

export default CallToActionSection;