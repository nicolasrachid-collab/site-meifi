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
            title: 'Residência Horizonte',
            date: 'Jul 9, 2024',
            image:
              'https://images.unsplash.com/photo-1599696881728-31842757271e?q=80&w=2070&auto=format&fit=crop',
          },
          {
            id: 2,
            title: 'Edifício Veredas',
            date: 'Jun 13, 2024',
            image:
              'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop',
          },
          {
            id: 3,
            title: 'Casa da Serra',
            date: 'Mai 20, 2024',
            image:
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
          },
          {
            id: 4,
            title: 'Oásis Urbano',
            date: 'Abr 15, 2024',
            image:
              'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2070&auto=format&fit=crop',
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#08131A] mb-6 md:mb-0">
            Nossos Projetos
          </h2>

          <div className="flex flex-col items-end w-full md:w-1/2 lg:w-1/3">
            <p className="text-sm md:text-base text-gray-600 text-left md:text-right mb-6 w-full">
              Cada projeto reafirma que a evolução na arquitetura passa pela<br className="hidden md:block"/>
              construção de caminhos com dedicação e atenção aos detalhes.
            </p>
            
            {/* Minimalist See All Button */}
            {onNavigateToProjects && (
              <button 
                onClick={onNavigateToProjects}
                className="group flex items-center gap-2 text-sm font-medium border-b border-[#08131A] pb-0.5 hover:text-gray-600 hover:border-gray-400 transition-all self-start md:self-end mb-6"
              >
                Ver todos
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300"/>
              </button>
            )}
            
            {/* Carrossel de palavras */}
            <div className="w-full overflow-hidden relative">
              <div className="flex space-x-12 animate-scroll-right whitespace-nowrap items-center md:justify-end">
                {[...words, ...words, ...words].map((word, idx) => (
                   <span key={idx} className="text-[#08131A] opacity-80 font-bold text-sm uppercase tracking-wider">
                      {word}
                   </span>
                ))}
              </div>
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#FAFAFA] to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#FAFAFA] to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex-grow ${isDesktop ? 'flex items-center pl-16 overflow-hidden' : 'px-6 md:px-12'}`}>
          <div 
            ref={scrollContainerRef}
            className={`flex ${isDesktop ? 'gap-6 will-change-transform' : 'flex-col gap-12 w-full'}`}
            style={{ 
              transform: isDesktop ? `translateX(${translateX}%)` : 'none',
              transition: isDesktop ? 'transform 0.075s linear' : 'none'
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectClick && onProjectClick(project.slug)}
                className={`relative flex-shrink-0 flex flex-col ${isDesktop ? 'w-[45vw]' : 'w-full'} cursor-pointer group/card`}
              >
                {/* Image Card */}
                <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-200 shadow-sm mb-4 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
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
                  <div className="absolute inset-0 bg-[#08131A]/0 group-hover/card:bg-[#08131A]/10 transition-colors duration-500 z-10 pointer-events-none"></div>
                </div>
                
                {/* Metadata */}
                <div 
                  className="flex justify-between items-center text-[#08131A] border-t border-gray-200 pt-3"
                  style={{
                     // Movimento oposto ou diferenciado para profundidade
                     transform: isDesktop 
                      ? `translateX(${scrollProgress * -90}px)` 
                      : 'none',
                     transition: isDesktop ? 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
                  }}
                >
                  <span className="text-lg md:text-xl font-medium group-hover/card:text-gray-600 transition-colors">{project.title}</span>
                  <span className="text-sm md:text-base text-gray-500">{project.date}</span>
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