import React from 'react';

const TeamSection: React.FC = () => {
  
  const teamMembers = [
    {
      name: "David Luis Lemos",
      image: "/david.png"
    },
    {
      name: "Eduardo Barbosa Mancini",
      image: "/eduardo.png"
    },
    {
      name: "Rodrigo Augusto Alves",
      image: "/rodrigo.png"
    }
  ];

  return (
    <section className="w-full bg-[#FAFAFA] pb-24 px-4 md:px-8 lg:px-12">
      
      {/* Container Branco Arredondado (Card Principal) */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm">
        
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#08131A] max-w-xl leading-[1.1]">
            Conheça quem faz a MEIFI acontecer
          </h2>
          
          <div className="lg:max-w-md text-left lg:text-left">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Design excepcional é um esforço coletivo. Somos um time de amigos que acredita no poder das boas ideias e no trabalho feito com calma, cuidado e propósito.
            </p>
          </div>
        </div>

        {/* Team Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Imagem */}
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08131A]/80 via-[#08131A]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              {/* Top Right Icon */}
              <div className="absolute top-4 right-4 text-white/70">
                <img 
                  src="/icon.svg" 
                  alt="" 
                  className="w-6 h-6"
                  aria-hidden="true"
                />
              </div>

              {/* Name at Bottom Left */}
              <div className="absolute bottom-6 left-6 pr-4">
                <h3 className="text-white text-lg font-medium tracking-wide">
                  {member.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-gray-100 pt-12 gap-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#08131A] mb-2">
              Junte-se a nós na criação de espaços melhores
            </h3>
            <p className="text-gray-600 text-sm md:text-base max-w-md">
              Pronto para construir algo significativo? Vamos conversar e transformar ideias em arquitetura de impacto.
            </p>
          </div>
          
          <button className="bg-[#08131A] text-white px-8 py-3 rounded-full font-medium text-sm flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg">
            Vamos conversar
          </button>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;