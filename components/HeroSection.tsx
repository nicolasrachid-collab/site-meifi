'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import MenuOverlay from './MenuOverlay';
import { Play } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { ShaderBackground } from './ShaderBackground';
import { HoverButton } from './HoverButton';
import AvatarGroup from './ui/avatar';
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
  const [visibleWords, setVisibleWords] = useState<boolean[]>([]);
  const animationRef = useRef<number | null>(null);

  // Valores padrão (fallback)
  const defaultData = {
    subtitle: 'Design, técnica e cuidado em cada detalhe',
    title: 'Arquitetura com identidade, propósito e sensibilidade',
    bgImage: '/banner_meifi.png',
    videoThumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    statsText: 'Quem confia na MEIFI',
    statsNumber: '+50 Projetos entregues',
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
    <div className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden text-[#FEFBF1]">
      {/* Menu Overlay */}
      {isMenuOpen && <MenuOverlay onClose={() => setIsMenuOpen(false)} />}

      {/* Shader Background */}
      <ShaderBackground />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full px-6 py-6 md:px-12 md:py-8">
        
        {/* Top: Navbar */}
        <Navbar onOpenMenu={() => setIsMenuOpen(true)} />

        {/* Center: Main Headings */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 mt-4 md:mt-0 animate-fade-in-up">
          <span className="text-xs md:text-base font-medium tracking-[0.15em] uppercase opacity-90 drop-shadow-md text-[#FEFBF1]/46 letter-spacing-wider inline-flex items-center gap-3 before:content-[''] before:w-8 before:h-px before:bg-[#FEFBF1]/30 after:content-[''] after:w-8 after:h-px after:bg-[#FEFBF1]/30">
            {currentData.subtitle}
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-[66px] font-medium tracking-tight leading-tight drop-shadow-lg max-w-5xl whitespace-pre-line">
            {currentData.title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < currentData.title.split('\n').length - 1 && <br className="hidden md:block" />}
              </React.Fragment>
            ))}
          </h1>

          <ScrollAnimationWrapper className="mt-8">
            <div className="relative group flex flex-col items-center">
              <HoverButton 
                onClick={handleContactClick}
                className="relative z-10"
              >
                Solicite um Orçamento
              </HoverButton>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Bottom: Avatares e Video Widget */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between w-full pb-safe">
          
          {/* Left: Avatares */}
          <AvatarGroup
            avatars={[
              {
                id: 1,
                name: 'Cliente 1',
                image: 'https://i.pravatar.cc/100?img=47',
                alt: 'Cliente 1'
              },
              {
                id: 2,
                name: 'Cliente 2',
                image: 'https://i.pravatar.cc/100?img=45',
                alt: 'Cliente 2'
              },
              {
                id: 3,
                name: 'Cliente 3',
                image: 'https://i.pravatar.cc/100?img=44',
                alt: 'Cliente 3'
              }
            ]}
            additionalCount={3}
            size="md"
            className="mb-4 md:mb-0"
          />

          {/* Right: Video Card */}
          <div className="bg-white/10 backdrop-blur-xl p-2 md:p-3 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 max-w-[90%] md:max-w-sm border border-white/20 shadow-2xl transition-all duration-500 ease-out hover:bg-white/15 hover:border-white/40 hover:-translate-y-1.5 hover:shadow-3xl cursor-pointer group">
             {/* Thumbnail Container - Ilustração Vetorial */}
             <div className="relative w-8 h-12 md:w-10 md:h-14 flex-shrink-0 transition-all duration-700 ease-out group-hover:scale-110 flex items-center justify-center">
                <svg 
                  viewBox="0 0 300 400" 
                  className="w-full h-full" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  {/* Estrutura arquitetônica moderna e minimalista */}
                  {/* Edifício principal - perspectiva */}
                  <polygon 
                    points="75,240 75,150 225,150 225,240" 
                    stroke="white" 
                    opacity="0.9" 
                    strokeWidth="2" 
                    fill="none"
                    className="animate-draw"
                    style={{ animationDelay: '0s', animationDuration: '1.5s' }}
                  />
                  <polygon 
                    points="225,150 225,240 240,230 240,135" 
                    stroke="white" 
                    opacity="0.8" 
                    strokeWidth="2" 
                    fill="none"
                    className="animate-draw"
                    style={{ animationDelay: '0.15s', animationDuration: '1.5s' }}
                  />
                  <line 
                    x1="75" 
                    y1="150" 
                    x2="240" 
                    y2="135" 
                    stroke="white" 
                    opacity="0.7" 
                    strokeWidth="1.5"
                    className="animate-draw"
                    style={{ animationDelay: '0.3s', animationDuration: '1.2s' }}
                  />
                  
                  {/* Divisões verticais */}
                  <line 
                    x1="112.5" 
                    y1="150" 
                    x2="112.5" 
                    y2="240" 
                    stroke="white" 
                    opacity="0.6" 
                    strokeWidth="1.5"
                    className="animate-draw"
                    style={{ animationDelay: '0.45s', animationDuration: '1s' }}
                  />
                  <line 
                    x1="150" 
                    y1="150" 
                    x2="150" 
                    y2="240" 
                    stroke="white" 
                    opacity="0.6" 
                    strokeWidth="1.5"
                    className="animate-draw"
                    style={{ animationDelay: '0.5s', animationDuration: '1s' }}
                  />
                  <line 
                    x1="187.5" 
                    y1="150" 
                    x2="187.5" 
                    y2="240" 
                    stroke="white" 
                    opacity="0.6" 
                    strokeWidth="1.5"
                    className="animate-draw"
                    style={{ animationDelay: '0.55s', animationDuration: '1s' }}
                  />
                  
                  {/* Janelas modernas */}
                  <rect 
                    x="82.5" 
                    y="180" 
                    width="22.5" 
                    height="18.75" 
                    stroke="white" 
                    opacity="0.7" 
                    strokeWidth="1.5"
                    className="animate-fade-in-up"
                    style={{ animationDelay: '0.7s', animationDuration: '0.6s' }}
                  />
                  <rect 
                    x="120" 
                    y="180" 
                    width="22.5" 
                    height="18.75" 
                    stroke="white" 
                    opacity="0.7" 
                    strokeWidth="1.5"
                    className="animate-fade-in-up"
                    style={{ animationDelay: '0.75s', animationDuration: '0.6s' }}
                  />
                  <rect 
                    x="157.5" 
                    y="180" 
                    width="22.5" 
                    height="18.75" 
                    stroke="white" 
                    opacity="0.7" 
                    strokeWidth="1.5"
                    className="animate-fade-in-up"
                    style={{ animationDelay: '0.8s', animationDuration: '0.6s' }}
                  />
                  <rect 
                    x="195" 
                    y="180" 
                    width="22.5" 
                    height="18.75" 
                    stroke="white" 
                    opacity="0.7" 
                    strokeWidth="1.5"
                    className="animate-fade-in-up"
                    style={{ animationDelay: '0.85s', animationDuration: '0.6s' }}
                  />
                  
                  {/* Linhas horizontais internas */}
                  <line 
                    x1="75" 
                    y1="195" 
                    x2="225" 
                    y2="195" 
                    stroke="white" 
                    opacity="0.5" 
                    strokeWidth="1"
                    className="animate-draw"
                    style={{ animationDelay: '0.9s', animationDuration: '0.8s' }}
                  />
                  <line 
                    x1="75" 
                    y1="210" 
                    x2="225" 
                    y2="210" 
                    stroke="white" 
                    opacity="0.5" 
                    strokeWidth="1"
                    className="animate-draw"
                    style={{ animationDelay: '0.95s', animationDuration: '0.8s' }}
                  />
                  
                  {/* Base/terreno */}
                  <line 
                    x1="60" 
                    y1="240" 
                    x2="255" 
                    y2="230" 
                    stroke="white" 
                    opacity="0.6" 
                    strokeWidth="2"
                    className="animate-draw"
                    style={{ animationDelay: '1s', animationDuration: '1s' }}
                  />
                  
                  {/* Elementos decorativos laterais */}
                  <line 
                    x1="45" 
                    y1="200" 
                    x2="75" 
                    y2="195" 
                    stroke="white" 
                    opacity="0.4" 
                    strokeWidth="1"
                    className="animate-draw"
                    style={{ animationDelay: '1.1s', animationDuration: '0.6s' }}
                  />
                  <line 
                    x1="255" 
                    y1="195" 
                    x2="285" 
                    y2="190" 
                    stroke="white" 
                    opacity="0.4" 
                    strokeWidth="1"
                    className="animate-draw"
                    style={{ animationDelay: '1.15s', animationDuration: '0.6s' }}
                  />
                  
                  {/* Detalhes de profundidade */}
                  <line 
                    x1="240" 
                    y1="135" 
                    x2="240" 
                    y2="230" 
                    stroke="white" 
                    opacity="0.6" 
                    strokeWidth="1.5"
                    className="animate-draw"
                    style={{ animationDelay: '0.2s', animationDuration: '1.2s' }}
                  />
                  <line 
                    x1="225" 
                    y1="240" 
                    x2="240" 
                    y2="230" 
                    stroke="white" 
                    opacity="0.6" 
                    strokeWidth="1.5"
                    className="animate-draw"
                    style={{ animationDelay: '0.25s', animationDuration: '1s' }}
                  />
                </svg>
             </div>
             
             <div className="flex flex-col flex-grow min-w-0 gap-0.5">
                <span className="text-xs md:text-sm font-semibold text-[#FEFBF1] drop-shadow-md group-hover:text-[#FEFBF1] transition-colors leading-tight">Projetar é transformar</span>
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] md:text-xs text-[#FEFBF1]/80 group-hover:text-[#FEFBF1]/90 transition-colors duration-500 font-medium">Agendar reunião</span>
                    <div className="w-0.5 h-0.5 rounded-full bg-white/60 group-hover:bg-white transition-colors"></div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;