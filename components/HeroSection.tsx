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

      {/* Background Video with Enhanced Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110 animate-zoom-slow will-change-transform"
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
        
        {/* Multi-layer Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08131A]/50 via-[#08131A]/20 via-transparent to-[#08131A]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#08131A]/30 via-transparent to-[#08131A]/30"></div>
        
        {/* Animated Glow Effect */}
        <div 
          className="absolute inset-0 animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(39, 91, 122, 0.05) 50%, transparent 100%)'
          }}
        ></div>
        
        {/* Vignette Effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(8, 19, 26, 0.4) 100%)'
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
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full px-6 py-6 md:px-12 md:py-8">
        
        {/* Top: Navbar */}
        <Navbar onOpenMenu={() => setIsMenuOpen(true)} />

        {/* Center: Main Headings */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 mt-4 md:mt-0 animate-fade-in-up">
          <span className="text-xs md:text-base font-medium tracking-[0.15em] uppercase opacity-90 drop-shadow-md text-[#FEFBF1]/46 letter-spacing-wider inline-flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 before:content-[''] before:w-8 before:h-px before:bg-[#FEFBF1]/30 after:content-[''] after:w-8 after:h-px after:bg-[#FEFBF1]/30">
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
              <button 
                onClick={handleContactClick}
                className="px-8 py-3 bg-white text-[#08131A] rounded-full font-medium text-lg transition-all duration-300 hover:animate-pulse-scale active:scale-95 shadow-lg relative z-10"
              >
                Solicite um Orçamento
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
             <div className="relative w-16 h-24 md:w-20 md:h-28 flex-shrink-0 transition-all duration-700 ease-out group-hover:scale-110 flex items-center justify-center">
                <svg 
                  viewBox="0 0 300 400" 
                  className="w-full h-full animate-pulse-glow" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ 
                    filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))',
                  }}
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
             
             <div className="flex flex-col flex-grow min-w-0 gap-1">
                <span className="text-sm md:text-base font-semibold text-[#FEFBF1] drop-shadow-md group-hover:text-[#FEFBF1] transition-colors leading-tight">Projetar é transformar</span>
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