'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import MenuOverlay from './MenuOverlay';
import { Play } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { ShaderBackground } from './ShaderBackground';
import { FlowButton } from './ui/flow-button';
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
    subtitle: 'Escritório de Arquitetura',
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
      <div className="relative z-10 flex flex-col justify-between h-full px-6 py-6 md:px-12 md:py-8 lg:px-[232px]">
        
        {/* Top: Navbar */}
        <Navbar onOpenMenu={() => setIsMenuOpen(true)} />

        {/* Center: Main Headings */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 mt-4 md:mt-0 animate-fade-in-up">
          <motion.span 
            className="text-xs md:text-sm font-normal tracking-[0.2em] uppercase drop-shadow-lg text-[#FEFBF1]/90 letter-spacing-wider inline-flex items-center gap-4 px-6 py-2.5 before:content-[''] before:w-6 before:h-px before:bg-gradient-to-r before:from-transparent before:to-[#FEFBF1]/50 after:content-[''] after:w-6 after:h-px after:bg-gradient-to-l after:from-transparent after:to-[#FEFBF1]/50 transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            {currentData.subtitle}
          </motion.span>
          
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
              <FlowButton 
                text="Solicite um Orçamento"
                onClick={handleContactClick}
                className="relative z-10"
              />
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Bottom: Avatares */}
        <div className="flex flex-col items-center justify-center w-full pb-safe">
          
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
            size="sm"
            className=""
          />


        </div>
      </div>
    </div>
  );
};

export default HeroSection;