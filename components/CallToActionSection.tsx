'use client';

import React, { useEffect, useRef, useState } from 'react';

const CallToActionSection: React.FC = () => {
  // Imagem de fundo local
  const bgImage = "/banner_body_meifi.svg";

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
      </div>
    </section>
  );
};

export default CallToActionSection;