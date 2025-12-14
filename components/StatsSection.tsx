"use client";

import React, { useEffect, useState, useRef } from 'react';

interface Stat {
  value: number | string;
  label: string;
  suffix?: string;
  prefix?: string;
  isNumber: boolean;
}

const StatsSection: React.FC = () => {
  const stats: Stat[] = [
    { value: 7, label: "Anos de trajetória sólida", isNumber: true },
    { value: 40, label: "Projetos entregues com excelência", suffix: "+", isNumber: true },
    { value: 100, label: "Dedicação e cuidado mineiro", suffix: "%", isNumber: true },
    { value: 150, label: "Vidas impactadas", isNumber: true },
  ];

  const [countedValues, setCountedValues] = useState<number[]>(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (hasAnimatedRef.current) return;

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      
      hasAnimatedRef.current = true;
      
      stats.forEach((stat, index) => {
        if (stat.isNumber && typeof stat.value === 'number') {
          const targetValue = stat.value;
          const duration = 2000;
          const steps = 60;
          const increment = targetValue / steps;
          const stepDuration = duration / steps;
          
          // Delay escalonado sutil
          setTimeout(() => {
            let currentStep = 0;
            const timer = setInterval(() => {
              currentStep++;
              const currentValue = Math.min(increment * currentStep, targetValue);
              
              setCountedValues(prev => {
                const newValues = [...prev];
                newValues[index] = Math.floor(currentValue);
                return newValues;
              });
              
              if (currentStep >= steps) {
                clearInterval(timer);
                setCountedValues(prev => {
                  const newValues = [...prev];
                  newValues[index] = targetValue;
                  return newValues;
                });
              }
            }, stepDuration);
            
            timersRef.current.push(timer);
          }, index * 100);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            startAnimation();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    // Use a timeout to ensure the ref is set
    const timeoutId = setTimeout(() => {
      const currentRef = sectionRef.current;

      if (currentRef) {
        observer.observe(currentRef);
        // Check if already visible
        const rect = currentRef.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && !hasAnimatedRef.current) {
          startAnimation();
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      
      // Cleanup timers
      timersRef.current.forEach(timer => clearInterval(timer));
      timersRef.current = [];
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FAFAFA] text-[#08131A] px-6 md:px-12 lg:px-16">
      <div className="w-full py-20 border-b border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center"
            >
              <span className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-[#08131A] mb-3 leading-none">
                {stat.isNumber && typeof stat.value === 'number' 
                  ? `${stat.prefix || ''}${countedValues[index]}${stat.suffix || ''}`
                  : stat.value
                }
              </span>
              <p className="text-sm md:text-base text-gray-600 font-normal leading-relaxed max-w-[200px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;