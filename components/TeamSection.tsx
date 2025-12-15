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
    <section className="w-full bg-[#FAFAFA] pb-24 px-6 md:px-12 lg:px-[232px]">
      
      {/* Container Branco Arredondado (Card Principal) */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm">
        
        {/* Header Row */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-gray-900 max-w-xl leading-[1.1] mb-6">
            Conheça quem faz a <span className="italic text-[#6B7280]">MEIFI acontecer</span>
          </h2>
          
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
            Design excepcional é um esforço coletivo. Somos um time de amigos que acredita no poder das boas ideias e no trabalho feito com calma, cuidado e propósito.
          </p>
        </div>

        {/* Team Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer transform transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Imagem */}
              <div className="absolute inset-0 overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
                />
                
                {/* Efeito de brilho sutil no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/5 group-hover:to-transparent transition-all duration-700 pointer-events-none z-10"></div>
              </div>
              
              {/* Gradient Overlay - Melhorado */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08131A]/90 via-[#08131A]/40 via-[#08131A]/20 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-500 z-10"></div>
              
              {/* Overlay adicional para mais profundidade */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08131A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              
              {/* Top Right Icon - Com animação */}
              <div className="absolute top-4 right-4 text-[#FEFBF1]/70 z-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                <img 
                  src="/icon.svg" 
                  alt="" 
                  className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:rotate-12"
                  style={{
                    filter: 'brightness(0) invert(1)',
                    WebkitFilter: 'brightness(0) invert(1)',
                    mixBlendMode: 'difference'
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Name at Bottom Left - Com animação */}
              <div className="absolute bottom-6 left-6 pr-4 z-20 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                <h3 className="text-[#FEFBF1] text-lg md:text-xl font-medium tracking-wide drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-500">
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
          
          <button className="bg-[#08131A] text-[#FEFBF1] px-8 py-3 rounded-full font-medium text-sm flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg">
            Vamos conversar
          </button>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;