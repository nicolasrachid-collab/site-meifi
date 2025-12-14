'use client';

import React from 'react';

interface SelectedProjectsGridProps {
  onProjectClick: () => void;
}

const SelectedProjectsGrid: React.FC<SelectedProjectsGridProps> = ({ onProjectClick }) => {
  const projects = [
    {
      id: 1,
      title: "Coastal Retreat",
      date: "Jun 13, 2025",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" // Árvore interna, vista montanha
    },
    {
      id: 2,
      title: "Modern Nest",
      date: "Jun 11, 2025",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1000&auto=format&fit=crop" // Vidro, cidade
    },
    {
      id: 3,
      title: "Hillside Haven",
      date: "Jun 4, 2025",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000&auto=format&fit=crop" // Arcos, bege
    },
    {
      id: 4,
      title: "City Calm",
      date: "Jul 9, 2025",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop" // Sombras, quadro
    },
    {
      id: 5,
      title: "Mono Retreat",
      date: "Jul 4, 2025",
      image: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=1000&auto=format&fit=crop" // Concreto, espelho redondo
    },
    {
      id: 6,
      title: "Timber Lane",
      date: "Jul 5, 2025",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1000&auto=format&fit=crop" // Madeira
    }
  ];

  return (
    <section className="w-full bg-white text-black px-6 md:px-12 lg:px-16 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {projects.map((project) => (
          <div 
            key={project.id} 
            onClick={onProjectClick}
            className="group cursor-pointer flex flex-col"
          >
            {/* Image Container */}
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-100 relative mb-4">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
            </div>
            
            {/* Metadata */}
            <div className="flex justify-between items-baseline border-t border-transparent pt-1">
              <h3 className="text-lg font-medium text-black group-hover:text-gray-600 transition-colors">
                {project.title}
              </h3>
              <span className="text-sm text-gray-500 font-medium">
                {project.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedProjectsGrid;