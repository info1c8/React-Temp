import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Объектов недвижимости"
    },
    {
      number: "5,000+",
      label: "Довольных клиентов"
    },
    {
      number: "50+",
      label: "Городов России"
    }
  ];

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;