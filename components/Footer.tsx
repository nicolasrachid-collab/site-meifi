'use client';

import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, Twitter, Facebook, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-black text-white pt-24 pb-8 px-6 md:px-12 lg:px-16 overflow-hidden flex flex-col">
      
      {/* Top Section: Newsletter & Intro */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-16">
        
        <div className="max-w-md">
          <h3 className="text-2xl md:text-3xl font-medium mb-6 tracking-tight">
            Mantenha-se inspirado.
          </h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Assine nossa newsletter para receber insights de design, atualizações de projetos e tendências diretamente em sua caixa de entrada.
          </p>
          
          <div className="relative border-b border-white/20 pb-2 focus-within:border-white transition-colors duration-300">
            <input 
              type="email" 
              placeholder="Endereço de e-mail" 
              className="w-full bg-transparent border-none outline-none text-white placeholder-gray-600 text-lg pr-12 pb-1"
            />
            <button className="absolute right-0 bottom-3 text-white/50 hover:text-white transition-colors">
              <ArrowUpRight size={20} />
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24 w-full lg:w-auto">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Explorar</h4>
            {['Projetos', 'Expertise', 'Studio', 'Notícias', 'Contato'].map((item) => (
              <a key={item} href="#" className="text-gray-300 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Social</h4>
            {['Instagram', 'LinkedIn', 'Pinterest', 'Behance'].map((item) => (
              <a key={item} href="#" className="text-gray-300 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Column 3 (Address) */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Visite-nos</h4>
            <address className="text-gray-300 not-italic leading-relaxed">
              Escritório Central<br />
              Belo Horizonte, MG<br />
              Brasil
            </address>
            <a href="mailto:contato@meifi.com.br" className="text-white border-b border-white/30 self-start pb-0.5 hover:border-white transition-colors mt-2">
              contato@meifi.com.br
            </a>
          </div>

        </div>
      </div>

      {/* Middle Section: Big Brand Name */}
      <div className="w-full border-t border-white/10 pt-16 mb-12">
        <h1 className="text-[15vw] md:text-[16vw] font-serif leading-none text-center tracking-tight opacity-90 select-none pointer-events-none text-white uppercase">
          MEIFI
        </h1>
      </div>

      {/* Bottom Section: Copyright & Legal */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-6 border-t border-white/10 pt-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <span>&copy; 2025 MEIFI Arquitetura. Todos os direitos reservados.</span>
          <div className="hidden md:block w-1 h-1 bg-gray-700 rounded-full"></div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Serviço</a>
          </div>
        </div>

        <button 
          onClick={scrollToTop} 
          className="flex items-center gap-2 group text-white hover:text-gray-300 transition-colors"
        >
          <span>Voltar ao topo</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowUp size={14} />
          </div>
        </button>
      </div>

    </footer>
  );
};

export default Footer;