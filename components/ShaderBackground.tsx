'use client';

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "react";

interface ShaderBackgroundProps {
  children?: React.ReactNode;
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#08131A]"
    >
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders - Tons de azul #08131A */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#08131A", "#0a1f2a", "#0d2a3a", "#10354a", "#08131A"]}
        speed={0.3}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-60"
        colors={["#08131A", "#0a1f2a", "#0d2a3a", "#10354a"]}
        speed={0.2}
        wireframe="true"
      />

      {/* Overlay sutil para profundidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08131A]/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent"></div>

      {children}
    </div>
  );
}



