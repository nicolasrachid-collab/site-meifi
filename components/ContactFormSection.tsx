'use client';

import React from 'react';
import { ArrowRight, Send } from 'lucide-react';

const ContactFormSection: React.FC = () => {
  return (
    <section className="w-full bg-white text-[#08131A] py-24 px-6 md:px-12 lg:px-16 border-t border-gray-100">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Context */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between">
          <div>
            <span className="text-caption font-bold tracking-[0.1em] uppercase text-text-tertiary mb-6 block">
              Contato
            </span>
            <h2 className="text-h1 md:text-display-lg font-serif font-medium mb-6">
              Vamos materializar <br />
              o seu projeto?
            </h2>
            <p className="text-text-tertiary text-body-lg mb-8">
              Estamos prontos para ouvir suas ideias. Preencha o formulário ao lado com os detalhes iniciais e nossa equipe entrará em contato para agendar uma reunião de orçamento.
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Aceitando novos projetos para 2025
            </div>
          </div>
        </div>

        {/* Right Column: The Form */}
        <div className="w-full lg:w-2/3">
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="flex flex-col group">
                <label htmlFor="name" className="text-caption font-bold uppercase tracking-[0.05em] text-text-tertiary mb-2 group-focus-within:text-[#08131A] transition-colors">
                  Nome Completo
                </label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Ex: Ana Silva"
                  className="w-full border-b border-gray-300 py-3 bg-transparent text-body-lg focus:outline-none focus:border-[#08131A] transition-colors placeholder-gray-400"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col group">
                <label htmlFor="phone" className="text-caption font-bold uppercase tracking-[0.05em] text-text-tertiary mb-2 group-focus-within:text-[#08131A] transition-colors">
                  Telefone
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="Ex: (31) 99999-9999"
                  className="w-full border-b border-gray-300 py-3 bg-transparent text-lg focus:outline-none focus:border-[#08131A] transition-colors placeholder-gray-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col group">
              <label htmlFor="email" className="text-caption font-bold uppercase tracking-[0.05em] text-text-tertiary mb-2 group-focus-within:text-[#08131A] transition-colors">
                E-mail Profissional
              </label>
              <input 
                type="email" 
                id="email" 
                placeholder="Ex: ana@empresa.com"
                className="w-full border-b border-gray-300 py-3 bg-transparent text-lg focus:outline-none focus:border-[#08131A] transition-colors placeholder-gray-300"
              />
            </div>

            {/* Project Details */}
            <div className="flex flex-col group">
              <label htmlFor="details" className="text-caption font-bold uppercase tracking-[0.05em] text-text-tertiary mb-2 group-focus-within:text-[#08131A] transition-colors">
                Detalhes do Projeto
              </label>
              <textarea 
                id="details" 
                rows={4}
                placeholder="Conte-nos um pouco sobre o espaço, metragem aproximada e suas expectativas..."
                className="w-full border-b border-gray-300 py-3 bg-transparent text-lg focus:outline-none focus:border-[#08131A] transition-colors placeholder-gray-300 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex justify-end">
              <button 
                type="submit"
                className="group flex items-center gap-3 bg-[#08131A] text-white px-10 py-4 rounded-full font-semibold text-body-sm tracking-wide transition-all hover:bg-[#0a1f2a] hover:scale-[1.02] active:scale-95 shadow-lg"
              >
                Agendar Reunião para Orçamento
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactFormSection;