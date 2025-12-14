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
  const [visibleWords, setVisibleWords] = useState<boolean[]>([]);
  const animationRef = useRef<number | null>(null);

  // Valores padrão (fallback)
  const defaultData = {
    subtitle: 'Arquitetura Autoral & Colaborativa',
    title: 'Transformando ideias\nem espaços que acolhem',
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

  // Animação de palavras aparecendo sequencialmente
  useEffect(() => {
    if (!heroData) return;
    
    const title = heroData.title;
    const words = title.split(/\s+/);
    const initialVisibility = words.map(() => false);
    setVisibleWords(initialVisibility);

    // Anima cada palavra com delay escalonado
    words.forEach((_, index) => {
      setTimeout(() => {
        setVisibleWords(prev => {
          const newVisibility = [...prev];
          newVisibility[index] = true;
          return newVisibility;
        });
      }, index * 150 + 300); // Delay de 300ms inicial + 150ms por palavra
    });
  }, [heroData]);

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

      {/* Background Video with Enhanced Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Video Container with Parallax Effect */}
        <div className="absolute inset-0 scale-110 animate-zoom-slow will-change-transform">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'brightness(0.95) contrast(1.1) saturate(1.15)',
            }}
          >
            <source src="/hero_video.mp4" type="video/mp4" />
            {/* Fallback para imagem caso o vídeo não carregue */}
            <Image
              src={currentData.bgImage}
              alt="Hero background"
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </video>
        </div>
        
        {/* Animated Glow Ring Effect - Destaque ao vídeo */}
        <div 
          className="absolute inset-0 animate-pulse-slow pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at center, rgba(39, 91, 122, 0.15) 0%, rgba(39, 91, 122, 0.08) 40%, transparent 70%)',
            animation: 'pulse-slow 4s ease-in-out infinite',
          }}
        ></div>
        
        {/* Brilho central animado - Foco no vídeo */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
            animation: 'pulse-slow 3s ease-in-out infinite',
            mixBlendMode: 'overlay',
          }}
        ></div>
        
        {/* Multi-layer Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08131A]/50 via-[#08131A]/15 via-transparent to-[#08131A]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#08131A]/25 via-transparent to-[#08131A]/25"></div>
        
        {/* Borda de luz sutil ao redor - Destaque visual */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 100px rgba(39, 91, 122, 0.1), inset 0 0 200px rgba(255, 255, 255, 0.05)',
          }}
        ></div>
        
        {/* Vignette Effect - Mais suave para destacar o centro */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 90% 70% at center, transparent 0%, rgba(8, 19, 26, 0.3) 100%)'
          }}
        ></div>
        
        {/* Efeito de brilho pulsante no centro */}
        <div 
          className="absolute inset-0 animate-pulse-slow pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(39, 91, 122, 0.12) 0%, transparent 60%)',
            animation: 'pulse-slow 5s ease-in-out infinite',
            mixBlendMode: 'screen',
          }}
        ></div>
        
        {/* Subtle Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        ></div>
        
        {/* Overlay de profundidade com gradiente radial */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(8, 19, 26, 0.2) 100%)',
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full px-6 py-6 md:px-12 md:py-8">
        
        {/* Top: Navbar */}
        <Navbar onOpenMenu={() => setIsMenuOpen(true)} />

        {/* Center: Main Headings */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 mt-4 md:mt-0 animate-fade-in-up">
          <span className="text-xs md:text-base font-medium tracking-[0.2em] uppercase text-[#FEFBF1]/85 drop-shadow-lg inline-flex items-center gap-4 before:content-[''] before:w-12 before:h-px before:bg-gradient-to-r before:from-transparent before:to-[#FEFBF1]/40 after:content-[''] after:w-12 after:h-px after:bg-gradient-to-l after:from-transparent after:to-[#FEFBF1]/40 transition-all duration-500 hover:text-[#FEFBF1] hover:opacity-100">
            {currentData.subtitle}
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tight leading-tight drop-shadow-lg max-w-5xl">
            {currentData.title.split('\n').map((line, lineIndex) => {
              const words = line.split(/\s+/);
              const lineStartIndex = currentData.title.split('\n').slice(0, lineIndex).join(' ').split(/\s+/).length;
              
              return (
                <React.Fragment key={lineIndex}>
                  <span className="inline-block">
                    {words.map((word, wordIndex) => {
                      const globalIndex = lineStartIndex + wordIndex;
                      const isVisible = visibleWords[globalIndex] ?? false;
                      
                      return (
                        <span
                          key={wordIndex}
                          className="inline-block mr-2 md:mr-3"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: `${globalIndex * 0.05}s`,
                          }}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </span>
                  {lineIndex < currentData.title.split('\n').length - 1 && (
                    <br className="hidden md:block" />
                  )}
                </React.Fragment>
              );
            })}
          </h1>

          <ScrollAnimationWrapper className="mt-8">
            <div className="relative group flex flex-col items-center">
              <button 
                onClick={handleContactClick}
                className="relative px-10 py-4 bg-white/90 backdrop-blur-xl text-[#08131A] rounded-full font-medium text-base md:text-lg transition-all duration-500 ease-out hover:bg-white/95 hover:backdrop-blur-2xl hover:shadow-2xl hover:shadow-[#275B7A]/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 shadow-xl overflow-hidden group/btn border border-white/50"
              >
                {/* Efeito de brilho animado */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                
                {/* Efeito de vidro - overlay interno */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                
                {/* Texto do botão */}
                <span className="relative z-10 flex items-center gap-2">
                  Solicite um Orçamento
                  <svg 
                    className="w-5 h-5 transition-transform duration-500 group-hover/btn:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                
                {/* Borda animada com efeito de vidro */}
                <div className="absolute inset-0 rounded-full border-2 border-white/60 group-hover/btn:border-white/80 group-hover/btn:shadow-[0_0_20px_rgba(39,91,122,0.3)] transition-all duration-500"></div>
              </button>
              
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Bottom: Social Proof & Video Widget */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between w-full space-y-6 md:space-y-0 pb-safe">
          
          {/* Bottom Left: Trusted Users */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
             <div className="flex -space-x-3">
                {[
                  'https://i.pravatar.cc/100?img=47',
                  'https://i.pravatar.cc/100?img=45',
                  'https://i.pravatar.cc/100?img=44'
                ].map((img, i) => (
                  <img 
                    key={i}
                    src={img} 
                    alt={`Client ${i + 1}`}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                ))}
             </div>
             <div className="flex flex-col text-left drop-shadow-md">
                <span className="text-sm md:text-base font-medium">{currentData.statsText}</span>
                <span className="text-xs md:text-base opacity-90">{currentData.statsNumber}</span>
             </div>
          </div>

          {/* Bottom Right: Video Card */}
          <div className="bg-white/10 backdrop-blur-xl p-3 md:p-4 rounded-2xl md:rounded-3xl flex items-center gap-3 md:gap-4 max-w-[90%] md:max-w-sm border border-white/20 shadow-2xl transition-all duration-500 ease-out hover:bg-white/15 hover:border-white/40 hover:-translate-y-1.5 hover:shadow-3xl cursor-pointer group">
             {/* Thumbnail Container - Ilustração Vetorial */}
             <div className="relative w-24 h-16 md:w-28 md:h-20 flex-shrink-0 transition-all duration-500 group-hover:scale-105 flex items-center justify-center">
                <svg 
                  viewBox="0 0 400 300" 
                  className="w-full h-full" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  {/* Estrutura arquitetônica moderna e minimalista */}
                  {/* Edifício principal - perspectiva */}
                  <polygon points="100,180 100,100 300,100 300,180" stroke="white" opacity="0.9" strokeWidth="2" fill="none"/>
                  <polygon points="300,100 300,180 320,170 320,90" stroke="white" opacity="0.8" strokeWidth="2" fill="none"/>
                  <line x1="100" y1="100" x2="320" y2="90" stroke="white" opacity="0.7" strokeWidth="1.5"/>
                  
                  {/* Divisões verticais */}
                  <line x1="150" y1="100" x2="150" y2="180" stroke="white" opacity="0.6" strokeWidth="1.5"/>
                  <line x1="200" y1="100" x2="200" y2="180" stroke="white" opacity="0.6" strokeWidth="1.5"/>
                  <line x1="250" y1="100" x2="250" y2="180" stroke="white" opacity="0.6" strokeWidth="1.5"/>
                  
                  {/* Janelas modernas */}
                  <rect x="110" y="120" width="30" height="25" stroke="white" opacity="0.7" strokeWidth="1.5"/>
                  <rect x="160" y="120" width="30" height="25" stroke="white" opacity="0.7" strokeWidth="1.5"/>
                  <rect x="210" y="120" width="30" height="25" stroke="white" opacity="0.7" strokeWidth="1.5"/>
                  <rect x="260" y="120" width="30" height="25" stroke="white" opacity="0.7" strokeWidth="1.5"/>
                  
                  {/* Linhas horizontais internas */}
                  <line x1="100" y1="140" x2="300" y2="140" stroke="white" opacity="0.5" strokeWidth="1"/>
                  <line x1="100" y1="160" x2="300" y2="160" stroke="white" opacity="0.5" strokeWidth="1"/>
                  
                  {/* Base/terreno */}
                  <line x1="80" y1="180" x2="340" y2="170" stroke="white" opacity="0.6" strokeWidth="2"/>
                  
                  {/* Elementos decorativos laterais */}
                  <line x1="60" y1="150" x2="100" y2="140" stroke="white" opacity="0.4" strokeWidth="1"/>
                  <line x1="340" y1="140" x2="380" y2="130" stroke="white" opacity="0.4" strokeWidth="1"/>
                  
                  {/* Detalhes de profundidade */}
                  <line x1="320" y1="90" x2="320" y2="170" stroke="white" opacity="0.6" strokeWidth="1.5"/>
                  <line x1="300" y1="180" x2="320" y2="170" stroke="white" opacity="0.6" strokeWidth="1.5"/>
                </svg>
             </div>
             
             <div className="flex flex-col flex-grow min-w-0 gap-1">
                <span className="text-sm md:text-base font-semibold text-[#FEFBF1] drop-shadow-md group-hover:text-[#FEFBF1] transition-colors leading-tight">Tire o seu projeto do papel</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm text-[#FEFBF1]/80 group-hover:text-[#FEFBF1]/90 transition-colors duration-500 font-medium">Agendar reunião</span>
                    <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-white transition-colors"></div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;