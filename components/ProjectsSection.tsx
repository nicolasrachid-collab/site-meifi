'use client';

import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { WordPressProject } from '@/types/wordpress';

interface ProjectItem {
  id: number;
  title: string;
  date: string;
  image: string;
  slug?: string;
}

interface ProjectsSectionProps {
  projects?: WordPressProject[];
  onNavigateToProjects?: () => void;
  onProjectClick?: (slug?: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects: wpProjects,
  onNavigateToProjects,
  onProjectClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Transforma projetos do WordPress em formato local
  const projects: ProjectItem[] = (wpProjects && Array.isArray(wpProjects) && wpProjects.length > 0)
    ? wpProjects.slice(0, 4).map((project) => {
        const featuredMedia =
          project._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        const date = project.acf?.project_date || project.date;
        const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });

        return {
          id: project.id,
          title: project.title.rendered,
          date: formattedDate,
          image: featuredMedia || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
          slug: project.slug,
        };
      })
    : (() => {
        const fallbackProjects = [
          // Fallback se não houver projetos do WordPress
          {
            id: 1,
            title: 'Mariana Residence',
            date: 'Jul 9, 2024',
            image: '/projeto01.jpg',
          },
          {
            id: 2,
            title: 'Gilberto Residence',
            date: 'Jun 13, 2024',
            image: '/projeto02.jpg',
          },
          {
            id: 3,
            title: 'Escritório de Advocacia',
            date: 'Mai 20, 2024',
            image: '/projeto03.jpg',
          },
          {
            id: 4,
            title: 'Projeto Refúgio',
            date: 'Abr 15, 2024',
            image: '/projeto04.jpg',
          },
        ];
        return fallbackProjects;
      })();

  // Palavras do carrossel
  const words = [
    "Arquitetura",
    "Forma",
    "Propósito",
    "Essência",
  ];

  // Verifica se é desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Scroll Jacking - trava a tela e move projetos horizontalmente
  useEffect(() => {
    if (!isDesktop) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current || !scrollContainerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const distance = scrollY - containerTop;
      const maxScroll = containerHeight - windowHeight;

      let progress = distance / maxScroll;
      
      // Limita o progresso entre 0 e 1
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      // Suavização com easing
      const smoothProgress = progress * progress * (3 - 2 * progress); // smoothstep
      
      setScrollProgress(smoothProgress);
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          handleScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isDesktop]);

  // Calcula a translação necessária para que o último card apareça no limite direito
  // No desktop: card tem 42vw (lg: 38vw), gap é ~2rem (aproximadamente 2vw)
  // Queremos que quando o último card aparecer no limite direito da viewport, o scroll já possa continuar
  // 
  // Posição inicial do último card: (n-1) * (card + gap)
  // Para ele aparecer no limite direito (100vw), precisamos mover:
  // translação = posição_inicial_último_card - (100vw - padding_left)
  // Mas como estamos usando %, precisamos calcular em relação ao container
  const cardWidth = 42; // vw (média entre 42vw e 38vw)
  const gap = 2; // vw (aproximação do gap-6 lg:gap-8)
  const cardWidthWithGap = cardWidth + gap;
  
  // Posição inicial do último card em vw
  const lastCardInitialPosition = (projects.length - 1) * cardWidthWithGap;
  
  // Padding left aproximado (lg:pl-[232px] em tela de 1600px ≈ 14.5vw)
  const paddingLeft = 14.5;
  
  // Para o último card aparecer no limite direito (100vw):
  // translação = lastCardInitialPosition - (100 - paddingLeft)
  // Isso garante que quando o último card tocar o limite direito, progresso = 1
  const totalTranslate = Math.max(0, lastCardInitialPosition - (100 - paddingLeft));
  const translateX = isDesktop ? -(scrollProgress * totalTranslate) : 0;

  return (
    <div 
      ref={containerRef} 
      className={`relative bg-[#FAFAFA] ${isDesktop ? 'h-[200vh] pb-32 lg:pb-40' : 'h-auto py-20 pb-32 lg:pb-40'}`}
    >
      {/* Sticky Container */}
      <div 
        ref={stickyRef} 
        className={`${isDesktop ? 'sticky top-0 h-screen overflow-hidden' : 'relative h-auto'} flex flex-col`}
      >
        {/* Header Section */}
        <div className="flex-shrink-0 pt-16 pb-12 px-6 md:px-12 lg:px-[232px] flex flex-col md:flex-row justify-between items-start md:items-end gap-8 z-10 bg-[#FAFAFA]">
          <div className="flex flex-col items-start w-full md:w-1/2 lg:w-2/3">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#08131A] mb-6">
              Projetos que carregam <span className="italic text-[#6B7280]">histórias.</span>
            </h2>
            
            <p className="text-sm md:text-base text-gray-600 text-left mb-0 w-full max-w-2xl">
              Cada projeto reafirma que a evolução na arquitetura passa pela<br className="hidden md:block"/>
              construção de caminhos com dedicação e atenção aos detalhes.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end w-full md:w-1/2 lg:w-1/3 gap-6">
            {/* Minimalist See All Button */}
            {onNavigateToProjects && (
              <button 
                onClick={onNavigateToProjects}
                className="group flex items-center gap-3 text-sm font-semibold text-[#08131A] hover:text-[#08131A]/90 transition-all self-start md:self-end px-5 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-gray-100/60 hover:to-gray-50/40 backdrop-blur-sm border border-transparent hover:border-gray-200/40 shadow-sm hover:shadow-md"
              >
                <span className="relative">
                  Ver todos
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#08131A]/40 group-hover:w-full transition-all duration-500"></span>
                </span>
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-500 ease-out" strokeWidth={2.5}/>
              </button>
            )}
            
            {/* Carrossel de palavras */}
            <div className="w-full overflow-hidden relative">
              <div className="flex gap-4 animate-scroll-right whitespace-nowrap items-center md:justify-start">
                {[...words, ...words, ...words].map((word, idx, arr) => (
                   <span key={idx} className="text-[#08131A] opacity-80 font-bold text-sm uppercase tracking-wider flex items-center">
                     {word}
                     {idx < arr.length - 1 && <span className="ml-2">•</span>}
                   </span>
                ))}
              </div>
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#FAFAFA] to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#FAFAFA] to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Content Area - Scroll Jacking Horizontal */}
        <div className={`flex-grow ${isDesktop ? 'flex items-center pl-6 lg:pl-[232px] overflow-hidden pb-8 lg:pb-12' : 'px-6 md:px-12 pb-8 lg:pb-12 overflow-x-auto overflow-y-hidden scrollbar-hide'}`}>
          <div 
            ref={scrollContainerRef}
            className={`flex ${isDesktop ? 'gap-6 lg:gap-8 will-change-transform' : 'gap-6 lg:gap-8 pb-4'}`}
            style={{ 
              transform: isDesktop ? `translateX(${translateX}%)` : 'none',
              transition: isDesktop ? 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectClick && onProjectClick(project.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onProjectClick && onProjectClick(project.slug);
                  }
                }}
                aria-label={`Ver projeto ${project.title}`}
                className="relative flex-shrink-0 flex flex-col w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[42vw] xl:w-[38vw] cursor-pointer group/card transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-[#08131A]/20 focus:ring-offset-2 rounded-[16px] overflow-hidden bg-white/70 backdrop-blur-xl border border-gray-200/40 hover:border-gray-300/60 hover:bg-white/95 shadow-md hover:shadow-2xl transition-all duration-700 hover:scale-[1.015]"
              >
                {/* Image Card */}
                <div className="aspect-[4/3] w-full overflow-hidden rounded-t-[16px] bg-gradient-to-br from-gray-50/80 to-gray-100/80 shadow-lg group-hover/card:shadow-2xl transition-all duration-700 relative border-b border-gray-200/30 group-hover/card:border-gray-300/50 group-hover/card:border-gray-400/40">
                  {/* Efeito de brilho no container */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-transparent group-hover/card:from-white/10 transition-all duration-1000 pointer-events-none z-0 rounded-t-[16px]"></div>
                  <div className="absolute inset-0 overflow-hidden rounded-t-[16px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-[1.1] transition-transform duration-1200 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover/card:brightness-110"
                      style={{
                        transform: 'scale(1.05)',
                        transition: 'transform 0.5s ease, filter 1s ease',
                        filter: 'saturate(0.95) contrast(1.05)',
                      }}
                      loading={project.id <= 2 ? 'eager' : 'lazy'}
                    />
                    
                    {/* Efeito de brilho elegante no hover - múltiplas camadas */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover/card:from-white/20 group-hover/card:via-white/8 group-hover/card:to-transparent transition-all duration-1200 pointer-events-none z-10"></div>
                    
                    {/* Overlay com gradiente refinado - camada superior */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08131A]/0 via-[#08131A]/0 to-[#08131A]/0 group-hover/card:from-[#08131A]/12 group-hover/card:via-[#08131A]/6 group-hover/card:to-[#08131A]/15 transition-all duration-800 z-10 pointer-events-none"></div>
                    
                    {/* Vignette effect elegante - múltiplas camadas */}
                    <div className="absolute inset-0 transition-all duration-800 pointer-events-none z-10" style={{
                      background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, transparent 40%, rgba(8, 19, 26, 0.05) 100%)'
                    }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08131A]/0 to-[#08131A]/0 group-hover/card:to-[#08131A]/10 transition-all duration-800"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-[#08131A]/0 to-[#08131A]/0 group-hover/card:from-[#08131A]/5 transition-all duration-800"></div>
                    </div>
                    
                    {/* Efeito de luz sutil - múltiplas direções */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/0 group-hover/card:to-white/8 transition-all duration-1200 pointer-events-none z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/0 via-transparent to-transparent group-hover/card:from-white/6 transition-all duration-1200 pointer-events-none z-10"></div>
                    
                    {/* Efeito de profundidade com sombra interna */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08131A]/0 group-hover/card:to-[#08131A]/20 transition-all duration-1000 pointer-events-none z-10" style={{
                      boxShadow: 'inset 0 -100px 100px -50px rgba(8, 19, 26, 0)',
                    }}>
                      <div className="absolute inset-0 group-hover/card:shadow-[inset_0_-120px_120px_-60px_rgba(8,19,26,0.3)] transition-all duration-1000"></div>
                    </div>
                    
                    {/* Efeito de brilho animado no hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent opacity-0 group-hover/card:opacity-100 group-hover/card:animate-shimmer pointer-events-none z-10" style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                      transform: 'translateX(-100%)',
                    }}></div>
                  </div>
                  
                  {/* Ícone de interação */}
                  <div className="absolute top-5 right-5 md:top-6 md:right-6 z-20 opacity-0 group-hover/card:opacity-100 group-focus/card:opacity-100 transition-all duration-700 group-hover/card:scale-110 group-hover/card:rotate-3">
                    <img 
                      src="/icon.svg" 
                      alt="" 
                      className="w-8 h-8 md:w-10 md:h-10 brightness-0 invert opacity-90 group-hover/card:opacity-100 transition-opacity duration-500"
                      aria-hidden="true"
                    />
                  </div>
                  
                  {/* Badge de categoria sutil */}
                  <div className="absolute top-5 left-5 md:top-6 md:left-6 z-20 opacity-0 group-hover/card:opacity-100 transition-all duration-700 group-hover/card:translate-y-0 translate-y-2">
                    <div className="bg-[#08131A]/80 backdrop-blur-xl rounded-lg px-3 py-1.5 text-[#FEFBF1] text-xs font-medium tracking-wide">
                      Projeto
                    </div>
                  </div>
                </div>
                
                {/* Metadata */}
                <div 
                  className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5 sm:gap-6 px-6 sm:px-7 md:px-8 py-6 sm:py-7 md:py-8 text-[#08131A] bg-gradient-to-br from-white/60 via-white/50 to-white/40 group-hover/card:from-white/80 group-hover/card:via-white/70 group-hover/card:to-white/60 backdrop-blur-2xl transition-all duration-700 relative overflow-hidden border-t border-white/20 group-hover/card:border-white/40 shadow-lg group-hover/card:shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.4) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  {/* Overlay de vidro com múltiplas camadas */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none z-0"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none z-0"></div>
                  
                  {/* Linha decorativa superior elegante com brilho */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover/card:via-white/80 transition-all duration-700 z-10 shadow-[0_1px_2px_rgba(255,255,255,0.3)]"></div>
                  
                  {/* Efeito de brilho animado no hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover/card:opacity-100 group-hover/card:animate-shimmer pointer-events-none z-0"></div>
                  
                  {/* Reflexo de luz sutil */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
                  
                  <div className="flex-1 min-w-0 sm:pr-6 relative z-10">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-[#08131A] group-hover/card:text-[#08131A] transition-all duration-700 leading-[1.15] break-words tracking-tight mb-2 group-hover/card:translate-x-0.5">
                      <span className="relative inline-block">
                        {project.title}
                        {/* Linha decorativa animada */}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#08131A]/20 to-[#08131A]/40 group-hover/card:w-full transition-all duration-700 ease-out"></span>
                      </span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-6 sm:gap-8 flex-shrink-0 sm:ml-auto relative z-10">
                    <span className="text-sm sm:text-base text-gray-500 group-hover/card:text-gray-800 font-semibold tracking-wide whitespace-nowrap transition-all duration-700 group-hover/card:translate-x-1">
                      {project.date}
                    </span>
                    <div className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/60 group-hover/card:bg-[#08131A] group-hover/card:border-[#08131A] transition-all duration-500 group-hover/card:scale-110 group-hover/card:shadow-xl">
                      <ArrowRight 
                        size={18} 
                        className="md:w-5 md:h-5 text-gray-600 group-hover/card:text-[#FEFBF1] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0 relative z-10" 
                        strokeWidth={2.5}
                      />
                      {/* Círculo pulsante elegante no hover */}
                      <div className="absolute inset-0 rounded-full bg-[#08131A]/10 scale-0 group-hover/card:scale-[1.8] opacity-0 group-hover/card:opacity-100 transition-all duration-500 ease-out"></div>
                      {/* Anel externo no hover */}
                      <div className="absolute inset-0 rounded-full border-2 border-[#08131A]/0 group-hover/card:border-[#08131A]/20 scale-0 group-hover/card:scale-[1.4] opacity-0 group-hover/card:opacity-100 transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;