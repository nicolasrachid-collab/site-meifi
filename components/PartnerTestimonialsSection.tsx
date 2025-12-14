'use client';

import React, { useState } from 'react';
import { Star, Hexagon, Layers, Radio, Box, Triangle, Circle, Play, X } from 'lucide-react';

const PartnerTestimonialsSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  
  const testimonials = [
    {
      id: 1,
      type: 'text',
      stars: 5,
      text: "O trabalho da MEIFI trouxe vida ao nosso empreendimento — sutil, atencioso e atemporal. Cada elemento foi cuidadosamente pensado, tanto visual quanto emocionalmente.",
      author: "Juliana Mendes",
      role: "Incorporadora Vale",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 2,
      type: 'text',
      stars: 5,
      text: "A equipe capturou nossa visão melhor do que imaginávamos. Do conceito inicial ao espaço final, tudo fluiu com clareza, alinhado perfeitamente com a marca.",
      author: "Daniel Reis",
      role: "Reis & Cia",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 3,
      type: 'video',
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4",
      videoThumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
      author: "Juliano Maia",
      role: "Sócio",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 4,
      type: 'text',
      stars: 5,
      text: "Nos sentimos ouvidos e compreendidos em cada etapa. As escolhas de design não apenas impressionaram, mas contaram nossa história de uma forma que palavras não conseguiriam.",
      author: "Sofia Lemos",
      role: "Ateliê Nove",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const logos = [
    { name: "Cooperative", icon: Layers },
    { name: "CoreOS", icon: Hexagon },
    { name: "Frequencii", icon: Radio },
    { name: "LaunchSimple", icon: Box },
    { name: "45 Degrees", icon: Triangle },
    { name: "CircleInc", icon: Circle },
  ];

  return (
    <section className="w-full bg-[#FAFAFA] text-[#08131A] py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
      
      {/* Headline */}
      <div className="mb-16 max-w-3xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-[1.1] text-gray-900">
          Não nos ouça apenas — veja <br />
          o que nossos <span className="italic text-[#6B7280]">parceiros dizem.</span>
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {testimonials.map((item) => (
          <div 
            key={item.id} 
            className={`relative rounded-2xl overflow-hidden min-h-[500px] md:h-[600px] lg:h-[650px] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 ${item.type === 'video' ? 'bg-[#08131A] text-[#FEFBF1] p-0' : 'bg-white text-[#08131A] p-8'}`}
          >
            {item.type === 'video' ? (
              // Video Card
              <div 
                className="relative w-full h-full cursor-pointer group/video overflow-hidden"
                onClick={() => {
                  if (item.videoUrl) {
                    setPlayingVideo(item.videoUrl);
                    setIsVideoOpen(true);
                  }
                }}
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  <img 
                    src={item.videoThumbnail || item.image} 
                    alt={item.author} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08131A]/90 via-[#08131A]/60 to-[#08131A]/40"></div>
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="bg-white/20 backdrop-blur-md rounded-full p-4 group-hover/video:bg-[#275B7A] group-hover/video:scale-110 transition-all duration-300">
                    <Play size={32} fill="#FEFBF1" className="text-[#FEFBF1] group-hover/video:text-[#FEFBF1]" strokeWidth={0} />
                  </div>
                </div>
                
                {/* Spacer to push content down */}
                <div className="flex-grow"></div>

                {/* Video User Info */}
                <div className="relative z-10 flex items-center gap-3 p-6">
                  <img 
                    src={item.image} 
                    alt={item.author} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/40 shadow-lg"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-[#FEFBF1] leading-tight drop-shadow-md">{item.author}</span>
                    <span className="text-sm text-[#FEFBF1]/80 drop-shadow-sm">{item.role}</span>
                  </div>
                </div>
              </div>
            ) : (
              // Text Card
              <>
                <div>
                  <div className="flex space-x-1.5 mb-6">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} size={18} className="text-[#D99A55] fill-[#D99A55]" />
                    ))}
                  </div>
                  <p className="text-base leading-relaxed font-normal text-gray-800">
                    "{item.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <img 
                    src={item.image} 
                    alt={item.author} 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover grayscale opacity-80"
                  />
                  <div className="flex flex-col">
                    <span className="text-base md:text-lg font-bold text-[#08131A] leading-tight">{item.author}</span>
                    <span className="text-sm text-gray-500">{item.role}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Footer / Logos */}
      <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row items-center">
        {/* Logo Carousel */}
        <div className="w-full overflow-hidden relative mask-linear-fade">
            <div className="flex space-x-16 animate-scroll-right whitespace-nowrap items-center">
            {/* Triplicando para loop infinito suave */}
            {[...logos, ...logos, ...logos].map((logo, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-gray-500 hover:text-[#08131A] transition-colors">
                    <logo.icon size={20} strokeWidth={2} />
                    <span className="font-semibold text-lg">{logo.name}</span>
                </div>
            ))}
            </div>
             {/* Fade masks */}
             <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#FAFAFA] to-transparent pointer-events-none"></div>
             <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && playingVideo && (
        <div 
          className="fixed inset-0 z-[60] bg-[#08131A]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => {
            setIsVideoOpen(false);
            setPlayingVideo(null);
          }}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoOpen(false);
              setPlayingVideo(null);
            }}
            className="absolute top-6 right-6 text-[#FEFBF1]/70 hover:text-[#FEFBF1] transition-colors z-30 bg-[#08131A]/50 backdrop-blur-sm rounded-full p-2"
          >
            <X size={32} strokeWidth={1.5} />
          </button>
          
          <div 
            className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-[#08131A]"
            onClick={(e) => e.stopPropagation()}
          >
            <video 
              className="w-full h-full object-cover"
              controls
              autoPlay
              src={playingVideo}
            >
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </div>
      )}

    </section>
  );
};

export default PartnerTestimonialsSection;