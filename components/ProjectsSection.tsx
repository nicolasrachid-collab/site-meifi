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

  // Verifica se é desktop para ativar o efeito
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

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

  // Lógica de Scroll Jacking
  useEffect(() => {
    if (!isDesktop) return; // Não executa lógica de scroll no mobile

    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current || !scrollContainerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const distance = scrollY - containerTop;
      const maxScroll = containerHeight - windowHeight;

      let progress = distance / maxScroll;
      
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  // Calcula a translação apenas se for desktop
  const translateX = isDesktop ? -(scrollProgress * 60) : 0;

  return (
    <div 
      ref={containerRef} 
      className={`relative bg-[#FAFAFA] ${isDesktop ? 'h-[300vh]' : 'h-auto py-20'}`}
    >
      
      {/* Sticky Container ou Normal Flow no Mobile */}
      <div 
        ref={stickyRef} 
        className={`${isDesktop ? 'sticky top-0 h-screen overflow-hidden' : 'relative h-auto'} flex flex-col`}
      >
        
        {/* Header Section */}
        <div className="flex-shrink-0 pt-16 px-6 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-start md:items-end mb-8 z-10 bg-[#FAFAFA]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#08131A] mb-6 md:mb-0">
            Projetos que carregam <span className="italic text-[#6B7280]">histórias.</span>
          </h2>

          <div className="flex flex-col items-start w-full md:w-1/2 lg:w-1/3">
            <p className="text-sm md:text-base text-gray-600 text-left mb-6 w-full">
              Cada projeto reafirma que a evolução na arquitetura passa pela<br className="hidden md:block"/>
              construção de caminhos com dedicação e atenção aos detalhes.
            </p>
            
            {/* Minimalist See All Button */}
            {onNavigateToProjects && (
              <button 
                onClick={onNavigateToProjects}
                className="group flex items-center gap-2 text-sm font-medium border-b border-[#08131A] pb-0.5 hover:text-gray-600 hover:border-gray-400 transition-all self-start mb-6"
              >
                Ver todos
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300"/>
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

        {/* Content Area */}
        <div className={`flex-grow ${isDesktop ? 'flex items-center pl-6 lg:pl-16 overflow-hidden' : 'px-6 md:px-12'}`}>
          <div 
            ref={scrollContainerRef}
            className={`flex ${isDesktop ? 'gap-4 lg:gap-6 will-change-transform' : 'flex-col gap-8 md:gap-12 w-full'}`}
            style={{ 
              transform: isDesktop ? `translateX(${translateX}%)` : 'none',
              transition: isDesktop ? 'transform 0.075s linear' : 'none'
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
                className={`relative flex-shrink-0 flex flex-col ${isDesktop ? 'w-[45vw]' : 'w-full'} cursor-pointer group/card transition-all duration-500 ease-out hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-[#08131A]/20 focus:ring-offset-2 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm border border-transparent hover:border-gray-200/50 hover:bg-white/80`}
              >
                {/* Image Card */}
                <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm group-hover/card:shadow-2xl transition-all duration-500 relative">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 ease-out will-change-transform"
                      style={{
                        // Parallax e Scale aplicados conforme solicitado
                        transform: isDesktop
                          ? `scale(1.1) translateX(${scrollProgress * 15}px)`
                          : 'scale(1)',
                        // Transição mais suave e com peso (cubic-bezier) para sensação premium
                        transition: isDesktop
                          ? 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)'
                          : 'transform 0.5s ease',
                      }}
                      loading={project.id <= 2 ? 'eager' : 'lazy'}
                    />
                    
                    {/* Efeito de brilho sutil no hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover/card:from-white/10 group-hover/card:via-transparent group-hover/card:to-transparent transition-all duration-700 pointer-events-none z-10"></div>
                    
                    {/* Overlay com gradiente sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08131A]/0 via-[#08131A]/0 to-[#08131A]/0 group-hover/card:from-[#08131A]/5 group-hover/card:via-[#08131A]/5 group-hover/card:to-[#08131A]/10 transition-all duration-500 z-10 pointer-events-none"></div>
                    
                    {/* Vignette effect sutil */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#08131A]/0 group-hover/card:to-[#08131A]/5 transition-all duration-500 pointer-events-none z-10" style={{
                      background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(8, 19, 26, 0.05) 100%)'
                    }}></div>
                  </div>
                  
                  {/* Ícone de interação com efeito de vidro */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 opacity-0 group-hover/card:opacity-100 group-focus/card:opacity-100 transition-opacity duration-500">
                    <div className="bg-white/20 backdrop-blur-xl rounded-lg p-2.5 md:p-3 shadow-2xl border border-white/30 ring-1 ring-white/20">
                      <img 
                        src="/icon.svg" 
                        alt="" 
                        className="w-6 h-6 md:w-7 md:h-7 brightness-0 invert"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Metadata */}
                <div 
                  className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 text-[#08131A] bg-gradient-to-br from-white/70 via-white/60 to-white/50 group-hover/card:from-white/95 group-hover/card:via-white/90 group-hover/card:to-white/85 backdrop-blur-md transition-all duration-500 relative overflow-hidden border border-white/20 group-hover/card:border-white/40"
                >
                  {/* Efeito de vidro com overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-transparent opacity-50 group-hover/card:opacity-70 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Efeito de brilho sutil no hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/card:opacity-100 group-hover/card:animate-shimmer pointer-events-none"></div>
                  
                  {/* Linha decorativa sutil */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/card:via-white/60 transition-all duration-500"></div>
                  
                  <div className="flex-1 min-w-0 sm:pr-4 relative z-10">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-medium text-[#08131A] group-hover/card:text-[#08131A] transition-all duration-500 leading-tight break-words tracking-tight">
                      <span className="relative inline-block">
                        {project.title}
                        {/* Sublinhado animado no hover */}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#08131A]/20 group-hover/card:w-full transition-all duration-500 ease-out"></span>
                      </span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 sm:ml-auto relative z-10">
                    <span className="text-xs sm:text-sm md:text-base text-gray-500/80 group-hover/card:text-gray-600 font-normal tracking-wide whitespace-nowrap transition-colors duration-500">
                      {project.date}
                    </span>
                    <div className="relative w-6 h-6 md:w-7 md:h-7 flex items-center justify-center">
                      <ArrowRight 
                        size={14} 
                        className="md:w-4 md:h-4 text-gray-400/60 group-hover/card:text-[#08131A] opacity-0 group-hover/card:opacity-100 group-focus/card:opacity-100 group-hover/card:translate-x-1 transition-all duration-500 ease-out flex-shrink-0 relative z-10" 
                        strokeWidth={2}
                      />
                      {/* Círculo decorativo no hover */}
                      <div className="absolute inset-0 rounded-full bg-[#08131A]/10 scale-0 group-hover/card:scale-100 opacity-0 group-hover/card:opacity-100 transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Spacer apenas no Desktop */}
            {isDesktop && <div className="w-[10vw] flex-shrink-0"></div>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectsSection;