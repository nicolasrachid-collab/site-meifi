import React from 'react';

const ProjectGallerySection: React.FC = () => {
  // Imagens selecionadas para corresponder à estética "Coastal/Minimalist" da referência
  const images = {
    lakeView: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2000&auto=format&fit=crop", // Quarto com vista
    livingRoom: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2000&auto=format&fit=crop", // Sala minimalista
    office: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" // Home Office com quadro
  };

  return (
    <section className="w-full bg-white px-6 md:px-12 lg:px-16 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Imagem Superior Esquerda: Vista da Natureza/Lago */}
        <div className="w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden relative group">
          <img
            src={images.lakeView}
            alt="Quarto com vista para o lago"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#102735]/0 group-hover:bg-[#102735]/5 transition-colors duration-500"></div>
        </div>

        {/* Imagem Superior Direita: Sala de Estar Minimalista */}
        <div className="w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden relative group">
          <img
            src={images.livingRoom}
            alt="Sala de estar minimalista"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#102735]/0 group-hover:bg-[#102735]/5 transition-colors duration-500"></div>
        </div>

        {/* Imagem Inferior: Home Office (Full Width) */}
        <div className="md:col-span-2 w-full h-[300px] md:h-[650px] rounded-[2rem] overflow-hidden relative group">
          <img
            src={images.office}
            alt="Home office com arte abstrata"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
           <div className="absolute inset-0 bg-[#102735]/0 group-hover:bg-[#102735]/5 transition-colors duration-500"></div>
        </div>

      </div>
    </section>
  );
};

export default ProjectGallerySection;