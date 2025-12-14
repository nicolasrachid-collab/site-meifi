'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from './Navbar';
import MenuOverlay from './MenuOverlay';
import { Play } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import type { WordPressPage } from '@/types/wordpress';

interface HeroSectionProps {
  data?: WordPressPage | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroData, setHeroData] = useState<{
    subtitle: string;
    title: string;
    bgImage: string;
    videoThumbnail: string;
    videoUrl?: string;
    statsText: string;
    statsNumber: string;
  } | null>(null);
  const animationRef = useRef<number | null>(null);

  // Valores padrão (fallback)
  const defaultData = {
    subtitle: 'Arquitetura Autoral & Colaborativa',
    title: 'Transformando ideias\nem espaços que acolhem',
    bgImage: '/banner_meifi.png',
    videoThumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    statsText: 'Parcerias de confiança',
    statsNumber: '+50 projetos entregues',
  };

  useEffect(() => {
    if (data?.acf) {
      const acf = data.acf;
      const bgMedia = data._embedded?.['wp:featuredmedia']?.[0];
      const videoThumbMedia = acf.hero_video_thumbnail
        ? data._embedded?.['wp:featuredmedia']?.find((m) => m.id === acf.hero_video_thumbnail)
        : null;

      setHeroData({
        subtitle: acf.hero_subtitle || defaultData.subtitle,
        title: acf.hero_title || data.title.rendered || defaultData.title,
        bgImage: bgMedia?.source_url || defaultData.bgImage,
        videoThumbnail: videoThumbMedia?.source_url || defaultData.videoThumbnail,
        videoUrl: acf.hero_video_url,
        statsText: defaultData.statsText,
        statsNumber: defaultData.statsNumber,
      });
    } else {
      setHeroData(defaultData);
    }
  }, [data]);

  const currentData = heroData || defaultData;

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact-section');
    if (!contactSection) return;

    // Cancela animação anterior se houver
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const targetPosition = contactSection.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1800; // Duração luxuosa e suave
    let startTime: number | null = null;

    // Função de Easing Quintic para suavidade máxima no início e fim
    const easeInOutQuint = (t: number) => {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuint(progress);

      window.scrollTo(0, startPosition + (distance * ease));

      if (timeElapsed < duration) {
        animationRef.current = requestAnimationFrame(animation);
      } else {
        animationRef.current = null;
        cleanupListeners();
      }
    };

    // Permite que o usuário interrompa o scroll ao interagir
    const onUserInteraction = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('wheel', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('keydown', onUserInteraction);
    };

    window.addEventListener('wheel', onUserInteraction, { passive: true });
    window.addEventListener('touchstart', onUserInteraction, { passive: true });
    window.addEventListener('keydown', onUserInteraction, { passive: true });

    animationRef.current = requestAnimationFrame(animation);
  };

  return (
    // Usa h-[100dvh] para lidar corretamente com barras de navegadores mobile
    <div className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden text-white">
      {/* Menu Overlay */}
      {isMenuOpen && <MenuOverlay onClose={() => setIsMenuOpen(false)} />}

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 transition-transform duration-1000 ease-out hover:scale-105">
        <Image
          src={currentData.bgImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08131A]/30 via-transparent to-[#08131A]/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full px-6 py-6 md:px-12 md:py-8">
        
        {/* Top: Navbar */}
        <Navbar onOpenMenu={() => setIsMenuOpen(true)} />

        {/* Center: Main Headings */}
        <div className="flex flex-col items-center justify-center text-center space-y-8 mt-4 md:mt-0 animate-fade-in-up">
          <span className="text-caption md:text-body-sm font-medium tracking-[0.1em] uppercase opacity-90 drop-shadow-md">
            {currentData.subtitle}
          </span>
          
          <h1 className="text-display-lg md:text-display-xl lg:text-display-2xl font-medium drop-shadow-lg max-w-5xl whitespace-pre-line">
            {currentData.title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < currentData.title.split('\n').length - 1 && <br className="hidden md:block" />}
              </React.Fragment>
            ))}
          </h1>

          <ScrollAnimationWrapper className="mt-8">
            <div className="relative group flex flex-col items-center">
              <button 
                onClick={handleContactClick}
                className="px-10 py-4 bg-white text-[#08131A] rounded-full font-semibold text-body-lg tracking-wide transition-all duration-300 hover:animate-pulse-scale active:scale-95 shadow-lg relative z-10"
              >
                Solicite um Orçamento
              </button>
              
              {/* Tooltip Discreto */}
              <div className="absolute top-full mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 group-hover:translate-y-0 text-caption font-normal tracking-[0.05em] text-white/80 pointer-events-none bg-[#08131A]/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                Clique para agendar sua consulta
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Bottom: Social Proof & Video Widget */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between w-full space-y-6 md:space-y-0 pb-safe">
          
          {/* Bottom Left: Trusted Users */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
             <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                    alt={`User ${i}`}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                ))}
             </div>
             <div className="flex flex-col text-left drop-shadow-md">
                <span className="text-body-sm md:text-body font-semibold">{currentData.statsText}</span>
                <span className="text-caption md:text-body-sm opacity-90">{currentData.statsNumber}</span>
             </div>
          </div>

          {/* Bottom Right: Video Card */}
          <div className="bg-glassDark/60 backdrop-blur-md p-2 pr-6 rounded-2xl flex items-center space-x-4 max-w-[90%] md:max-w-sm border border-white/10 shadow-2xl transition-all duration-500 ease-out hover:bg-glassDark/90 hover:border-white/30 hover:-translate-y-1 cursor-pointer group">
             {/* Thumbnail Container */}
             <div className="relative w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-inner group-hover:shadow-white/10 transition-shadow duration-500">
                <Image
                  src={currentData.videoThumbnail}
                  alt="Video thumbnail"
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-[#08131A]/20 group-hover:bg-[#08131A]/0 transition-colors duration-500"></div>
                {/* Efeito de brilho/pulsação sutil no thumbnail */}
                <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none"></div>
             </div>
             
             <div className="flex flex-col flex-grow min-w-0">
                <span className="text-body-sm md:text-body font-semibold mb-1 truncate group-hover:text-white transition-colors">Veja nosso manifesto</span>
                <div className="flex items-center gap-2">
                    {/* Botão Play com Pulse Scale */}
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#08131A] shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-white/20 animate-pulse-scale">
                      <Play size={14} fill="currentColor" className="ml-0.5" />
                    </div>
                    <span className="text-caption text-white/70 group-hover:text-white transition-colors duration-500">Assista agora</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;