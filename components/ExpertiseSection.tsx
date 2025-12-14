'use client';

import React, { useState } from 'react';
import { Plus, X, Scan } from 'lucide-react';

interface ExpertiseItem {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  statValue?: string;
  statLabel?: string;
  description?: string;
  image: string;
  drawingType: 'residential' | 'commercial' | 'urban';
}

// Componente de desenho de traço arquitetônico
const LineDrawing: React.FC<{ type: 'residential' | 'commercial' | 'urban'; isCompact?: boolean }> = ({ type, isCompact = false }) => {

  // Desenhos SVG - mesmo desenho para compacto e expandido
  const drawings = {
    residential: (
      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Casa residencial minimalista e elegante */}
        {/* Estrutura principal */}
        <rect x="100" y="130" width="200" height="120" stroke="white" opacity="0.9" strokeWidth="2.5" className="animate-draw" style={{ animationDelay: '0s', animationDuration: '1.5s' }}/>
        <polygon points="200,60 100,130 300,130" stroke="white" opacity="0.9" strokeWidth="2.5" fill="none" className="animate-draw" style={{ animationDelay: '0.15s', animationDuration: '1.5s' }}/>
        {/* Porta principal centralizada */}
        <rect x="170" y="190" width="40" height="60" stroke="white" opacity="0.85" strokeWidth="2" className="animate-fade-in-up" style={{ animationDelay: '0.8s', animationDuration: '0.6s' }}/>
        <circle cx="205" cy="220" r="2.5" fill="white" opacity="0.8" className="animate-fade-in-up" style={{ animationDelay: '0.9s', animationDuration: '0.4s' }}/>
        {/* Janelas superiores - simétricas */}
        <rect x="120" y="150" width="30" height="30" stroke="white" opacity="0.8" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '0.5s', animationDuration: '0.6s' }}/>
        <line x1="135" y1="150" x2="135" y2="180" stroke="white" opacity="0.8" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.6s', animationDuration: '0.4s' }}/>
        <line x1="120" y1="165" x2="150" y2="165" stroke="white" opacity="0.8" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.65s', animationDuration: '0.4s' }}/>
        
        <rect x="250" y="150" width="30" height="30" stroke="white" opacity="0.8" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '0.55s', animationDuration: '0.6s' }}/>
        <line x1="265" y1="150" x2="265" y2="180" stroke="white" opacity="0.8" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.7s', animationDuration: '0.4s' }}/>
        <line x1="250" y1="165" x2="280" y2="165" stroke="white" opacity="0.8" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.75s', animationDuration: '0.4s' }}/>
        {/* Janela inferior direita */}
        <rect x="250" y="200" width="30" height="30" stroke="white" opacity="0.8" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '0.85s', animationDuration: '0.6s' }}/>
        <line x1="265" y1="200" x2="265" y2="230" stroke="white" opacity="0.8" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.95s', animationDuration: '0.4s' }}/>
        <line x1="250" y1="215" x2="280" y2="215" stroke="white" opacity="0.8" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '1s', animationDuration: '0.4s' }}/>
        {/* Linha divisória central sutil */}
        <line x1="200" y1="130" x2="200" y2="250" stroke="white" opacity="0.3" strokeWidth="1" className="animate-draw" style={{ animationDelay: '0.3s', animationDuration: '1s' }}/>
        {/* Detalhes decorativos - elementos naturais */}
        <path d="M 85 210 Q 75 200, 85 190 Q 95 200, 85 210" stroke="white" opacity="0.25" fill="none" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '1.1s', animationDuration: '0.8s' }}/>
        <path d="M 315 210 Q 325 200, 315 190 Q 305 200, 315 210" stroke="white" opacity="0.25" fill="none" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '1.15s', animationDuration: '0.8s' }}/>
        <line x1="80" y1="205" x2="100" y2="205" stroke="white" opacity="0.25" className="animate-draw" style={{ animationDelay: '1.2s', animationDuration: '0.5s' }}/>
        <line x1="300" y1="205" x2="320" y2="205" stroke="white" opacity="0.25" className="animate-draw" style={{ animationDelay: '1.25s', animationDuration: '0.5s' }}/>
      </svg>
    ),
    commercial: (
      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Edifício comercial moderno e elegante */}
        {/* Estrutura principal */}
        <rect x="80" y="80" width="240" height="170" stroke="white" opacity="0.9" strokeWidth="2.5" className="animate-draw" style={{ animationDelay: '0s', animationDuration: '1.5s' }}/>
        {/* Divisórias verticais principais */}
        <line x1="150" y1="80" x2="150" y2="250" stroke="white" opacity="0.7" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.2s', animationDuration: '1s' }}/>
        <line x1="200" y1="80" x2="200" y2="250" stroke="white" opacity="0.7" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.25s', animationDuration: '1s' }}/>
        <line x1="250" y1="80" x2="250" y2="250" stroke="white" opacity="0.7" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.3s', animationDuration: '1s' }}/>
        {/* Andares horizontais */}
        <line x1="80" y1="120" x2="320" y2="120" stroke="white" opacity="0.7" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.4s', animationDuration: '0.8s' }}/>
        <line x1="80" y1="160" x2="320" y2="160" stroke="white" opacity="0.7" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.45s', animationDuration: '0.8s' }}/>
        <line x1="80" y1="200" x2="320" y2="200" stroke="white" opacity="0.7" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.5s', animationDuration: '0.8s' }}/>
        {/* Janelas - primeiro andar (4 colunas) */}
        <rect x="95" y="95" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '0.6s', animationDuration: '0.5s' }}/>
        <line x1="112.5" y1="95" x2="112.5" y2="115" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '0.7s', animationDuration: '0.3s' }}/>
        <rect x="155" y="95" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '0.65s', animationDuration: '0.5s' }}/>
        <line x1="172.5" y1="95" x2="172.5" y2="115" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '0.75s', animationDuration: '0.3s' }}/>
        <rect x="215" y="95" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '0.7s', animationDuration: '0.5s' }}/>
        <line x1="232.5" y1="95" x2="232.5" y2="115" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '0.8s', animationDuration: '0.3s' }}/>
        <rect x="275" y="95" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '0.75s', animationDuration: '0.5s' }}/>
        <line x1="292.5" y1="95" x2="292.5" y2="115" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '0.85s', animationDuration: '0.3s' }}/>
        {/* Janelas - segundo andar */}
        <rect x="95" y="135" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '0.8s', animationDuration: '0.5s' }}/>
        <line x1="112.5" y1="135" x2="112.5" y2="155" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '0.9s', animationDuration: '0.3s' }}/>
        <rect x="155" y="135" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '0.85s', animationDuration: '0.5s' }}/>
        <line x1="172.5" y1="135" x2="172.5" y2="155" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '0.95s', animationDuration: '0.3s' }}/>
        <rect x="215" y="135" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '0.9s', animationDuration: '0.5s' }}/>
        <line x1="232.5" y1="135" x2="232.5" y2="155" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '1s', animationDuration: '0.3s' }}/>
        <rect x="275" y="135" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '0.95s', animationDuration: '0.5s' }}/>
        <line x1="292.5" y1="135" x2="292.5" y2="155" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '1.05s', animationDuration: '0.3s' }}/>
        {/* Janelas - terceiro andar */}
        <rect x="95" y="175" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '1s', animationDuration: '0.5s' }}/>
        <line x1="112.5" y1="175" x2="112.5" y2="195" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '1.1s', animationDuration: '0.3s' }}/>
        <rect x="155" y="175" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '1.05s', animationDuration: '0.5s' }}/>
        <line x1="172.5" y1="175" x2="172.5" y2="195" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '1.15s', animationDuration: '0.3s' }}/>
        <rect x="215" y="175" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '1.1s', animationDuration: '0.5s' }}/>
        <line x1="232.5" y1="175" x2="232.5" y2="195" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '1.2s', animationDuration: '0.3s' }}/>
        <rect x="275" y="175" width="35" height="20" stroke="white" opacity="0.75" strokeWidth="1.5" className="animate-fade-in-up" style={{ animationDelay: '1.15s', animationDuration: '0.5s' }}/>
        <line x1="292.5" y1="175" x2="292.5" y2="195" stroke="white" opacity="0.75" className="animate-draw" style={{ animationDelay: '1.25s', animationDuration: '0.3s' }}/>
        {/* Porta principal centralizada */}
        <rect x="182.5" y="230" width="35" height="20" stroke="white" opacity="0.85" strokeWidth="2" className="animate-fade-in-up" style={{ animationDelay: '1.2s', animationDuration: '0.6s' }}/>
        <circle cx="215" cy="240" r="2.5" fill="white" opacity="0.8" className="animate-fade-in-up" style={{ animationDelay: '1.3s', animationDuration: '0.4s' }}/>
        {/* Detalhes estruturais - extensões laterais sutis */}
        <line x1="60" y1="90" x2="80" y2="90" stroke="white" opacity="0.35" className="animate-draw" style={{ animationDelay: '1.3s', animationDuration: '0.5s' }}/>
        <line x1="320" y1="90" x2="340" y2="90" stroke="white" opacity="0.35" className="animate-draw" style={{ animationDelay: '1.35s', animationDuration: '0.5s' }}/>
      </svg>
    ),
    urban: (
      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Cidade/Urbanismo - composição elegante */}
        {/* Edifício 1 - esquerda (médio) */}
        <rect x="60" y="100" width="80" height="150" stroke="white" opacity="0.9" strokeWidth="2.5" className="animate-draw" style={{ animationDelay: '0s', animationDuration: '1.2s' }}/>
        <line x1="100" y1="100" x2="100" y2="250" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.2s', animationDuration: '0.8s' }}/>
        <line x1="60" y1="140" x2="140" y2="140" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.3s', animationDuration: '0.6s' }}/>
        <line x1="60" y1="180" x2="140" y2="180" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.35s', animationDuration: '0.6s' }}/>
        <line x1="60" y1="220" x2="140" y2="220" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.4s', animationDuration: '0.6s' }}/>
        {/* Janelas edifício 1 */}
        <g className="animate-fade-in-up" style={{ animationDelay: '0.5s', animationDuration: '0.6s' }}>
          <rect x="72" y="115" width="20" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="82" y1="115" x2="82" y2="133" stroke="white" opacity="0.75"/>
          <rect x="96" y="115" width="20" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="106" y1="115" x2="106" y2="133" stroke="white" opacity="0.75"/>
          <rect x="120" y="115" width="20" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="130" y1="115" x2="130" y2="133" stroke="white" opacity="0.75"/>
          <rect x="72" y="155" width="20" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="82" y1="155" x2="82" y2="173" stroke="white" opacity="0.75"/>
          <rect x="96" y="155" width="20" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="106" y1="155" x2="106" y2="173" stroke="white" opacity="0.75"/>
          <rect x="120" y="155" width="20" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="130" y1="155" x2="130" y2="173" stroke="white" opacity="0.75"/>
          <rect x="72" y="195" width="20" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="82" y1="195" x2="82" y2="213" stroke="white" opacity="0.75"/>
          <rect x="96" y="195" width="20" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="106" y1="195" x2="106" y2="213" stroke="white" opacity="0.75"/>
          <rect x="120" y="195" width="20" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="130" y1="195" x2="130" y2="213" stroke="white" opacity="0.75"/>
        </g>
        
        {/* Edifício 2 - centro (maior e mais alto) */}
        <rect x="160" y="70" width="110" height="180" stroke="white" opacity="0.9" strokeWidth="2.5" className="animate-draw" style={{ animationDelay: '0.15s', animationDuration: '1.2s' }}/>
        <line x1="215" y1="70" x2="215" y2="250" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.35s', animationDuration: '0.8s' }}/>
        <line x1="160" y1="110" x2="270" y2="110" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.45s', animationDuration: '0.6s' }}/>
        <line x1="160" y1="150" x2="270" y2="150" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.5s', animationDuration: '0.6s' }}/>
        <line x1="160" y1="190" x2="270" y2="190" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.55s', animationDuration: '0.6s' }}/>
        <line x1="160" y1="230" x2="270" y2="230" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.6s', animationDuration: '0.6s' }}/>
        {/* Janelas edifício 2 */}
        <g className="animate-fade-in-up" style={{ animationDelay: '0.65s', animationDuration: '0.6s' }}>
          <rect x="175" y="85" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="187" y1="85" x2="187" y2="103" stroke="white" opacity="0.75"/>
          <rect x="203" y="85" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="215" y1="85" x2="215" y2="103" stroke="white" opacity="0.75"/>
          <rect x="231" y="85" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="243" y1="85" x2="243" y2="103" stroke="white" opacity="0.75"/>
          <rect x="175" y="125" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="187" y1="125" x2="187" y2="143" stroke="white" opacity="0.75"/>
          <rect x="203" y="125" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="215" y1="125" x2="215" y2="143" stroke="white" opacity="0.75"/>
          <rect x="231" y="125" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="243" y1="125" x2="243" y2="143" stroke="white" opacity="0.75"/>
          <rect x="175" y="165" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="187" y1="165" x2="187" y2="183" stroke="white" opacity="0.75"/>
          <rect x="203" y="165" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="215" y1="165" x2="215" y2="183" stroke="white" opacity="0.75"/>
          <rect x="231" y="165" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="243" y1="165" x2="243" y2="183" stroke="white" opacity="0.75"/>
          <rect x="175" y="205" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="187" y1="205" x2="187" y2="223" stroke="white" opacity="0.75"/>
          <rect x="203" y="205" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="215" y1="205" x2="215" y2="223" stroke="white" opacity="0.75"/>
          <rect x="231" y="205" width="24" height="18" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="243" y1="205" x2="243" y2="223" stroke="white" opacity="0.75"/>
        </g>
        
        {/* Edifício 3 - direita (menor) */}
        <rect x="290" y="120" width="80" height="130" stroke="white" opacity="0.9" strokeWidth="2.5" className="animate-draw" style={{ animationDelay: '0.3s', animationDuration: '1.2s' }}/>
        <line x1="330" y1="120" x2="330" y2="250" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.5s', animationDuration: '0.8s' }}/>
        <line x1="290" y1="155" x2="370" y2="155" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.6s', animationDuration: '0.6s' }}/>
        <line x1="290" y1="190" x2="370" y2="190" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.65s', animationDuration: '0.6s' }}/>
        <line x1="290" y1="225" x2="370" y2="225" stroke="white" opacity="0.6" strokeWidth="1.5" className="animate-draw" style={{ animationDelay: '0.7s', animationDuration: '0.6s' }}/>
        {/* Janelas edifício 3 */}
        <g className="animate-fade-in-up" style={{ animationDelay: '0.8s', animationDuration: '0.6s' }}>
          <rect x="302" y="135" width="20" height="14" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="312" y1="135" x2="312" y2="149" stroke="white" opacity="0.75"/>
          <rect x="328" y="135" width="20" height="14" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="338" y1="135" x2="338" y2="149" stroke="white" opacity="0.75"/>
          <rect x="354" y="135" width="20" height="14" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="364" y1="135" x2="364" y2="149" stroke="white" opacity="0.75"/>
          <rect x="302" y="170" width="20" height="14" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="312" y1="170" x2="312" y2="184" stroke="white" opacity="0.75"/>
          <rect x="328" y="170" width="20" height="14" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="338" y1="170" x2="338" y2="184" stroke="white" opacity="0.75"/>
          <rect x="354" y="170" width="20" height="14" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="364" y1="170" x2="364" y2="184" stroke="white" opacity="0.75"/>
          <rect x="302" y="205" width="20" height="14" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="312" y1="205" x2="312" y2="219" stroke="white" opacity="0.75"/>
          <rect x="328" y="205" width="20" height="14" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="338" y1="205" x2="338" y2="219" stroke="white" opacity="0.75"/>
          <rect x="354" y="205" width="20" height="14" stroke="white" opacity="0.75" strokeWidth="1.5"/>
          <line x1="364" y1="205" x2="364" y2="219" stroke="white" opacity="0.75"/>
        </g>
        
        {/* Linha do horizonte */}
        <line x1="0" y1="250" x2="400" y2="250" stroke="white" opacity="0.75" strokeWidth="3" className="animate-draw" style={{ animationDelay: '0.9s', animationDuration: '1s' }}/>
        {/* Elementos urbanos decorativos - postes de luz */}
        <g className="animate-fade-in-up" style={{ animationDelay: '1.1s', animationDuration: '0.8s' }}>
          <line x1="40" y1="250" x2="40" y2="238" stroke="white" opacity="0.5" strokeWidth="1.5"/>
          <circle cx="40" cy="233" r="3.5" fill="white" opacity="0.5"/>
          <line x1="360" y1="250" x2="360" y2="238" stroke="white" opacity="0.5" strokeWidth="1.5"/>
          <circle cx="360" cy="233" r="3.5" fill="white" opacity="0.5"/>
        </g>
      </svg>
    )
  };

  return (
    <div className={`w-full h-full flex items-center justify-center rounded-lg text-[#FEFBF1] ${isCompact ? '' : 'p-8'}`}>
      {drawings[type]}
    </div>
  );
};

const ExpertiseSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);

  const items: ExpertiseItem[] = [
    {
      id: 1,
      number: '01',
      title: 'Projetos Residenciais',
      subtitle: 'Espaços que acolhem',
      statValue: '20+',
      statLabel: 'casas autênticas',
      description: 'Criamos residências que vão além da estética. São espaços funcionais, acolhedores e personalizados, pensados para refletir o estilo de vida e a identidade de cada cliente. Cada detalhe é cuidadosamente desenvolvido, unindo conforto, sofisticação e sensibilidade arquitetônica.',
      image: '',
      drawingType: 'residential'
    },
    {
      id: 2,
      number: '02',
      title: 'Espaços Comerciais',
      subtitle: 'Ambientes com propósito',
      statValue: '15+',
      statLabel: 'Lojas e escritórios',
      description: 'Projetamos espaços comerciais que expressam a identidade da marca, potencializam a funcionalidade e criam experiências consistentes e memoráveis para clientes e colaboradores.',
      image: '',
      drawingType: 'commercial'
    },
    {
      id: 3,
      number: '03',
      title: 'Urbanismo e Loteamentos',
      subtitle: 'Conectando a cidade',
      statValue: '05+',
      statLabel: 'Empreendimentos',
      description: 'Desenvolvemos soluções urbanísticas que promovem integração, sustentabilidade e qualidade de vida, com foco no impacto social e na humanização dos espaços urbanos.',
      image: '',
      drawingType: 'urban'
    }
  ];

  return (
    <section className="w-full bg-[#08131A] text-[#FEFBF1] py-24 px-6 md:px-12 lg:px-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 relative">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight mb-6 text-[#FEFBF1]">
            Tipos de Serviço
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Oferecemos um portfólio diversificado em projetos residenciais, corporativos e urbanísticos — sempre equilibrando estética, funcionalidade e propósito.
          </p>
        </div>
        
        {/* Decorative Icon top right */}
        <div className="absolute top-0 right-0 hidden md:block">
           <Scan className="w-6 h-6 text-[#FEFBF1] opacity-80" strokeWidth={1.5} />
        </div>
      </div>

      {/* Accordion List */}
      <div className="border-t border-white/10">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <div 
              key={item.id} 
              className={`border-b border-white/10 transition-all duration-700 ease-out ${isActive ? 'py-12' : 'py-8 cursor-pointer hover:bg-white/5'}`}
              onClick={() => !isActive && setActiveId(item.id)}
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-16">
                
                {/* Number */}
                <span className="text-sm font-medium text-gray-400 w-8 flex-shrink-0 self-center">
                  {item.number}
                </span>

                {isActive ? (
                  // Expanded Content
                  <>
                    {/* Large Drawing */}
                    <div className="w-full md:w-1/3 lg:w-[400px] aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
                      <LineDrawing type={item.drawingType} />
                    </div>

                    {/* Detailed Info */}
                    <div className="flex-grow flex flex-col justify-between relative">
                        {/* Close Button absolute top right of content area */}
                        <button 
                            className="absolute top-0 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveId(0); // Optional: allow collapsing all
                            }}
                        >
                            <X className="w-5 h-5 text-gray-300" />
                        </button>

                        <div>
                            <h3 className="text-2xl md:text-3xl font-medium mb-2">{item.title}</h3>
                            <p className="text-gray-500 mb-12">{item.subtitle}</p>

                            {item.statValue && (
                                <div className="mb-6">
                                    <span className="text-4xl md:text-5xl font-medium block mb-1">
                                        {item.statValue}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        {item.statLabel}
                                    </span>
                                </div>
                            )}

                            <p className="text-gray-400 leading-relaxed max-w-md mb-8">
                                {item.description}
                            </p>
                        </div>
                    </div>
                  </>
                ) : (
                  // Collapsed Content
                  <>
                    {/* Thumbnail Drawing */}
                    <div className="w-32 h-20 md:w-40 md:h-28 rounded-lg overflow-hidden flex-shrink-0 hidden md:block">
                      <LineDrawing type={item.drawingType} isCompact={true} />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex-grow flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl font-medium text-[#FEFBF1] mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.subtitle}</p>
                    </div>

                    {/* Plus Button */}
                    <div className="flex items-center justify-end">
                         <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400">
                            <Plus className="w-5 h-5" />
                         </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default ExpertiseSection;