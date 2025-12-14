import React from 'react';

const ProjectProcessSection: React.FC = () => {
  // Imagem que remete aos tons neutros, sofá de linho e estante de madeira da referência
  const processImage = "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2000&auto=format&fit=crop";

  const steps = [
    {
      title: "1. Concept Development",
      description: "We started by capturing the essence of coastal life—light, air, and movement. The palette leaned into ocean blues, sandy neutrals, and breezy white finishes."
    },
    {
      title: "2. Spatial Planning",
      description: "An open floor plan with visual flow from room to room allows natural light to fill the entire home. We emphasized seamless indoor-outdoor transitions."
    },
    {
      title: "3. Final Touches",
      description: "Textural elements like linen, rattan, and aged wood brought a grounded elegance. Subtle brass accents added polish without overwhelming the calm aesthetic."
    }
  ];

  return (
    <section className="w-full bg-white text-[#08131A] py-20 px-6 md:px-12 lg:px-16">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
        
        {/* Coluna 1: Label Lateral */}
        <div className="w-full lg:w-1/4 flex items-center gap-2 pt-1">
           {/* Ícone customizado de 5 pontos/cruz consistente com a seção anterior */}
           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#08131A]">
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="19" r="2" />
              <circle cx="5" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
           </svg>
           <span className="text-sm font-medium tracking-wide text-gray-800">The process</span>
        </div>

        {/* Coluna 2: Lista de Etapas */}
        <div className="w-full lg:w-[35%] flex flex-col gap-10">
           {steps.map((step, index) => (
             <div key={index} className="flex flex-col gap-3">
               <h3 className="text-base font-bold text-[#08131A]">{step.title}</h3>
               <p className="text-base leading-relaxed text-gray-800 font-normal">
                 {step.description}
               </p>
             </div>
           ))}
        </div>

        {/* Coluna 3: Imagem Lateral */}
        <div className="w-full lg:w-[40%] lg:pl-12 mt-8 lg:mt-0">
           <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-sm relative group">
             <img 
              src={processImage} 
              alt="Sala de estar minimalista com tons neutros" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-[#08131A]/0 group-hover:bg-[#08131A]/5 transition-colors duration-500"></div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectProcessSection;