import React from 'react';

const ProjectInfoSection: React.FC = () => {
  // Imagem que corresponde visualmente à referência (closet/quarto com cadeira e espelho redondo)
  const projectImage = "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=1000&auto=format&fit=crop";

  return (
    <section className="w-full bg-white text-[#08131A] py-20 px-6 md:px-12 lg:px-16">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
        
        {/* Coluna 1: Label Lateral */}
        <div className="w-full lg:w-1/4 flex items-center gap-2">
           {/* Ícone customizado de 5 pontos/cruz similar à imagem */}
           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#08131A]">
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="19" r="2" />
              <circle cx="5" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
           </svg>
           <span className="text-body-sm font-medium tracking-[0.05em] text-text-secondary">Project info</span>
        </div>

        {/* Coluna 2: Dados e Texto Descritivo */}
        <div className="w-full lg:w-[35%] flex flex-col">
           {/* Grid de Informações */}
           <div className="grid grid-cols-2 gap-y-10 gap-x-8 mb-12">
              <div>
                  <h4 className="font-bold text-body-sm mb-2 text-[#08131A]">Date</h4>
                  <p className="text-text-tertiary text-body-sm">Jun 13, 2025</p>
              </div>
              <div>
                  <h4 className="font-bold text-body-sm mb-2 text-[#08131A]">Category</h4>
                  <p className="text-text-tertiary text-body-sm">Home</p>
              </div>
              <div>
                  <h4 className="font-bold text-body-sm mb-2 text-[#08131A]">Space Plan</h4>
                  <p className="text-text-tertiary text-body-sm">3 Bedrooms, Open Kitchen</p>
              </div>
              <div>
                  <h4 className="font-bold text-body-sm mb-2 text-[#08131A]">Timeline</h4>
                  <p className="text-text-tertiary text-body-sm">2 Weeks</p>
              </div>
           </div>

           {/* Texto Descritivo */}
           <p className="text-body-lg text-text-primary font-normal">
              A calming coastal-inspired home designed with soft blues, natural textures, and breezy open spaces. Every detail was curated to create a light-filled, serene environment perfect for relaxed living.
           </p>
        </div>

        {/* Coluna 3: Imagem Lateral */}
        <div className="w-full lg:w-[40%] lg:pl-12">
           <div className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] shadow-sm">
             <img 
              src={projectImage} 
              alt="Interior detail with wardrobe and mirror" 
              className="w-full h-full object-cover"
             />
           </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectInfoSection;