import React from 'react';

const StatsSection: React.FC = () => {
  const stats = [
    { value: "+1.5", label: "Anos de trajetória sólida" },
    { value: "40+", label: "Projetos entregues com excelência" },
    { value: "100%", label: "Dedicação e cuidado mineiro" },
    { value: "MG/RJ", label: "Expandindo horizontes" },
  ];

  return (
    <section className="w-full bg-[#FAFAFA] text-[#08131A] px-6 md:px-12 lg:px-16">
      <div className="w-full pb-20 pt-10 border-b border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-start">
              <span className="text-5xl md:text-6xl font-medium tracking-tight mb-4 text-[#08131A]">
                {stat.value}
              </span>
              <p className="text-sm md:text-base text-gray-900 font-medium leading-snug max-w-[200px]">
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