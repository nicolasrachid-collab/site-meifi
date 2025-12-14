import React from 'react';
import { Star, Move } from 'lucide-react';

const DesignSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFAFA] text-[#08131A] py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
        <div className="max-w-3xl relative">
          <div className="absolute -left-6 top-1 w-1 h-12 bg-[#08131A]/10 hidden lg:block"></div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 block ml-1">Nossa Filosofia</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight leading-[1.05] text-gray-900">
            Do meio fio à cidade — <br/>
            arquitetura que <span className="italic font-serif text-gray-500">conecta mundos</span>
          </h2>
        </div>
        
        <div className="flex flex-col items-start lg:items-end text-left lg:text-right max-w-sm gap-8">
          <p className="text-gray-600 text-base font-medium leading-relaxed">
            Com um olhar sensível e colaborativo, transformamos projetos em experiências significativas, equilibrando estética e propósito.
          </p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Item 1: Testimonial (Large Block) */}
        <div className="md:col-span-12 lg:col-span-4 bg-white p-10 rounded-[2rem] flex flex-col justify-between min-h-[400px] shadow-sm hover:shadow-xl transition-all duration-700 ease-out hover:-translate-y-1 border border-gray-100/50 group">
          <div>
            <div className="flex space-x-1 mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} className="text-[#897E72] fill-[#897E72]" />
              ))}
            </div>
            <p className="text-xl md:text-2xl font-serif leading-relaxed text-gray-900 mb-8 italic">
              "A MEIFI transformou nossa visão em algo tangível. A sensibilidade deles em entender a rotina da nossa família foi impressionante."
            </p>
          </div>
          
          <div className="flex items-center gap-4 pt-8 border-t border-gray-50">
            <img 
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" 
              alt="Mariana S." 
              className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ring-2 ring-white shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#08131A] uppercase tracking-wide">Mariana S.</span>
              <span className="text-xs text-gray-500">Projeto Residencial</span>
            </div>
          </div>
        </div>

        {/* Item 2: Sustainability (Stacked) */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-6 group">
          <div className="h-64 rounded-[2rem] overflow-hidden relative shadow-sm border border-gray-100/50">
            <div className="absolute inset-0 bg-[#08131A]/0 group-hover:bg-[#08131A]/10 z-10 transition-colors duration-700"></div>
            <img 
              src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop" 
              alt="Design Interiores" 
              className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-105"
            />
          </div>
          <InfoCard 
            number="01" 
            title="Sustentabilidade" 
            description="Soluções inovadoras que respeitam o ambiente e humanizam o concreto." 
          />
        </div>

        {/* Item 3: Affection (Stacked Reverse) */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-6 group">
          <InfoCard 
            number="02" 
            title="Afeto e Escuta" 
            description="Cada projeto começa com uma boa conversa e atenção aos mínimos detalhes." 
          />
          <div className="h-64 rounded-[2rem] overflow-hidden relative shadow-sm border border-gray-100/50">
            <div className="absolute inset-0 bg-[#08131A]/0 group-hover:bg-[#08131A]/10 z-10 transition-colors duration-700"></div>
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop" 
              alt="Mesa Madeira" 
              className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        {/* Item 4: Authenticity (Stacked) */}
        <div className="md:col-span-12 lg:col-span-2 flex flex-col gap-6 group">
           <div className="h-64 lg:h-full rounded-[2rem] overflow-hidden relative min-h-[250px] shadow-sm border border-gray-100/50">
             <div className="absolute inset-0 bg-[#08131A]/0 group-hover:bg-[#08131A]/10 z-10 transition-colors duration-700"></div>
             <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" 
              alt="Ambiente Verde" 
              className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                 <h3 className="text-[#FEFBF1] font-serif text-2xl tracking-tight drop-shadow-md group-hover:translate-x-1 transition-transform duration-500">Autenticidade</h3>
                 <div className="h-0.5 w-12 bg-white/50 mt-4 group-hover:w-20 transition-all duration-700"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#08131A]/60 to-transparent opacity-60"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

// Reusable Small White Card Component
interface InfoCardProps {
  number: string;
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ number, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-[2rem] h-full flex flex-col justify-between shadow-sm transition-all duration-700 ease-out hover:shadow-xl hover:-translate-y-1 hover:border-[#DFDBCE] border border-gray-100/50 cursor-default group/card min-h-[200px]">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold tracking-widest text-[#897E72] transition-colors duration-500">{number}</span>
        <div className="p-2 bg-gray-50 rounded-full group-hover/card:bg-[#897E72] transition-colors duration-500 flex items-center justify-center">
             <Move className="w-3 h-3 text-gray-400 group-hover/card:text-[#FEFBF1] transition-colors duration-500" strokeWidth={2} />
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-serif font-medium text-[#08131A] mb-3 group-hover/card:translate-x-1 transition-transform duration-500">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed group-hover/card:text-gray-800 transition-colors duration-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default DesignSection;