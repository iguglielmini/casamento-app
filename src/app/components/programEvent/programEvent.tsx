"use client";
import React from "react";

const events = [
  { time: "18:30", description: "Recepção dos convidados" },
  { time: "19:00", description: "Cerimônia Religiosa" },
  { time: "20:00", description: "Jantar Programado" },
  { time: "21:00", description: "Celebração" },
];

const ProgramEvent: React.FC = () => {
  return (
    <section className="py-32 bg-(--marsala)">
      <div className="container mx-auto px-6 md:px-12 relative">
        <img
          src="/intro-1-casamento.png"
          alt="Left decoration"
          className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2"
        />
        <img
          src="/intro-2-casamento.png"
          alt="Right decoration"
          className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2"
        />
        <h1 className="text-4xl md:text-6xl text-center mb-8 text-white">
          Programação do Casamento
        </h1>
        <ul className="space-y-4 max-w-md mx-auto">
          {events.map((event, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b border-gray-300 pb-2"
            >
              <span className="text-lg font-medium text-white">
                {event.time}
              </span>
              <span className="text-white text-lg">{event.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProgramEvent;
