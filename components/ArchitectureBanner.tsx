'use client';

import React from 'react';

interface ArchitectureBannerProps {
  className?: string;
  opacity?: number;
}

const ArchitectureBanner: React.FC<ArchitectureBannerProps> = ({ 
  className = '', 
  opacity = 0.15 
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg 
        viewBox="0 0 1920 1080" 
        className="w-full h-full" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ opacity }}
      >
        {/* Skyline Arquitetônico - Perspectiva */}
        
        {/* Edifício 1 - Esquerda (mais distante) */}
        <rect x="100" y="600" width="180" height="280" stroke="white" opacity="0.4" strokeWidth="2"/>
        <line x1="190" y1="600" x2="190" y2="880" stroke="white" opacity="0.3" strokeWidth="1.5"/>
        <line x1="100" y1="700" x2="280" y2="700" stroke="white" opacity="0.3" strokeWidth="1"/>
        <line x1="100" y1="800" x2="280" y2="800" stroke="white" opacity="0.3" strokeWidth="1"/>
        <rect x="120" y="620" width="50" height="60" stroke="white" opacity="0.3" strokeWidth="1.5"/>
        <rect x="210" y="620" width="50" height="60" stroke="white" opacity="0.3" strokeWidth="1.5"/>
        
        {/* Edifício 2 - Centro (principal) */}
        <polygon points="400,500 400,300 800,300 800,500" stroke="white" opacity="0.6" strokeWidth="2.5" fill="none"/>
        <polygon points="800,300 800,500 900,480 900,280" stroke="white" opacity="0.5" strokeWidth="2" fill="none"/>
        <line x1="400" y1="300" x2="900" y2="280" stroke="white" opacity="0.4" strokeWidth="2"/>
        
        {/* Divisões verticais do edifício principal */}
        <line x1="500" y1="300" x2="500" y2="500" stroke="white" opacity="0.4" strokeWidth="1.5"/>
        <line x1="600" y1="300" x2="600" y2="500" stroke="white" opacity="0.4" strokeWidth="1.5"/>
        <line x1="700" y1="300" x2="700" y2="500" stroke="white" opacity="0.4" strokeWidth="1.5"/>
        
        {/* Janelas do edifício principal */}
        <rect x="420" y="330" width="60" height="50" stroke="white" opacity="0.5" strokeWidth="1.5"/>
        <rect x="520" y="330" width="60" height="50" stroke="white" opacity="0.5" strokeWidth="1.5"/>
        <rect x="620" y="330" width="60" height="50" stroke="white" opacity="0.5" strokeWidth="1.5"/>
        <rect x="720" y="330" width="60" height="50" stroke="white" opacity="0.5" strokeWidth="1.5"/>
        
        <rect x="420" y="400" width="60" height="50" stroke="white" opacity="0.5" strokeWidth="1.5"/>
        <rect x="520" y="400" width="60" height="50" stroke="white" opacity="0.5" strokeWidth="1.5"/>
        <rect x="620" y="400" width="60" height="50" stroke="white" opacity="0.5" strokeWidth="1.5"/>
        <rect x="720" y="400" width="60" height="50" stroke="white" opacity="0.5" strokeWidth="1.5"/>
        
        {/* Linhas horizontais internas */}
        <line x1="400" y1="380" x2="800" y2="380" stroke="white" opacity="0.3" strokeWidth="1"/>
        <line x1="400" y1="450" x2="800" y2="450" stroke="white" opacity="0.3" strokeWidth="1"/>
        
        {/* Edifício 3 - Direita (médio) */}
        <polygon points="1100,550 1100,400 1400,400 1400,550" stroke="white" opacity="0.5" strokeWidth="2"/>
        <polygon points="1400,400 1400,550 1480,540 1480,390" stroke="white" opacity="0.4" strokeWidth="2" fill="none"/>
        <line x1="1100" y1="400" x2="1480" y2="390" stroke="white" opacity="0.3" strokeWidth="1.5"/>
        
        <line x1="1200" y1="400" x2="1200" y2="550" stroke="white" opacity="0.3" strokeWidth="1.5"/>
        <line x1="1300" y1="400" x2="1300" y2="550" stroke="white" opacity="0.3" strokeWidth="1.5"/>
        
        <rect x="1120" y="420" width="50" height="40" stroke="white" opacity="0.4" strokeWidth="1.5"/>
        <rect x="1220" y="420" width="50" height="40" stroke="white" opacity="0.4" strokeWidth="1.5"/>
        <rect x="1320" y="420" width="50" height="40" stroke="white" opacity="0.4" strokeWidth="1.5"/>
        
        {/* Edifício 4 - Fundo direito (pequeno) */}
        <rect x="1600" y="650" width="200" height="230" stroke="white" opacity="0.3" strokeWidth="2"/>
        <line x1="1700" y1="650" x2="1700" y2="880" stroke="white" opacity="0.2" strokeWidth="1.5"/>
        <rect x="1620" y="680" width="40" height="50" stroke="white" opacity="0.25" strokeWidth="1.5"/>
        <rect x="1720" y="680" width="40" height="50" stroke="white" opacity="0.25" strokeWidth="1.5"/>
        
        {/* Linha do horizonte */}
        <line x1="0" y1="880" x2="1920" y2="880" stroke="white" opacity="0.4" strokeWidth="2"/>
        
        {/* Elementos decorativos - Linhas de perspectiva */}
        <line x1="0" y1="500" x2="400" y2="500" stroke="white" opacity="0.2" strokeWidth="1" strokeDasharray="5,5"/>
        <line x1="800" y1="500" x2="1100" y2="550" stroke="white" opacity="0.2" strokeWidth="1" strokeDasharray="5,5"/>
        <line x1="1400" y1="550" x2="1600" y2="650" stroke="white" opacity="0.2" strokeWidth="1" strokeDasharray="5,5"/>
        
        {/* Detalhes arquitetônicos - Árvores/vegetação sutil */}
        <circle cx="300" cy="880" r="15" fill="white" opacity="0.15"/>
        <circle cx="950" cy="880" r="20" fill="white" opacity="0.15"/>
        <circle cx="1550" cy="880" r="12" fill="white" opacity="0.15"/>
        
        {/* Linhas de profundidade atmosférica */}
        <line x1="0" y1="600" x2="1920" y2="600" stroke="white" opacity="0.1" strokeWidth="1" strokeDasharray="10,20"/>
        <line x1="0" y1="700" x2="1920" y2="700" stroke="white" opacity="0.1" strokeWidth="1" strokeDasharray="10,20"/>
      </svg>
    </div>
  );
};

export default ArchitectureBanner;
