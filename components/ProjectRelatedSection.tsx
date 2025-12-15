import React from 'react';

const ProjectRelatedSection: React.FC = () => {
  const relatedProjects = [
    {
      id: 1,
      title: "Modern Nest",
      date: "Jun 11, 2025",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1000&auto=format&fit=crop" // Interior moderno com luz e planta/árvore
    },
    {
      id: 2,
      title: "Hillside Haven",
      date: "Jun 4, 2025",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000&auto=format&fit=crop" // Tons bege, arcos, design clean
    },
    {
      id: 3,
      title: "City Calm",
      date: "Jul 9, 2025",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop" // Minimalista com sombras e quadro
    }
  ];

  return (
    <section className="w-full bg-[#F9F9F9] text-[#08131A] py-24 px-6 md:px-12 lg:px-[232px]">
      
      {/* Header da Seção */}
      <div className="flex justify-between items-center mb-10 border-t border-transparent">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#08131A]">
          Related Projects
        </h2>
        
        {/* Ícone decorativo de 5 pontos/cruz */}
        <div className="pt-1">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#08131A]">
              <circle cx="12" cy="12" r="2.5" />
              <circle cx="12" cy="4" r="2.5" />
              <circle cx="12" cy="20" r="2.5" />
              <circle cx="4" cy="12" r="2.5" />
              <circle cx="20" cy="12" r="2.5" />
           </svg>
        </div>
      </div>

      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProjects.map((project) => (
          <div key={project.id} className="group cursor-pointer flex flex-col gap-4">
            {/* Imagem do Card */}
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-200 relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#08131A]/0 group-hover:bg-[#08131A]/5 transition-colors duration-500"></div>
            </div>
            
            {/* Informações do Card */}
            <div className="flex justify-between items-center px-1">
              <h3 className="text-lg font-medium text-[#08131A] group-hover:text-gray-600 transition-colors">
                {project.title}
              </h3>
              <span className="text-sm font-medium text-gray-500">
                {project.date}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default ProjectRelatedSection;