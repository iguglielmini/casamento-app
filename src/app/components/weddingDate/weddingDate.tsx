"use client";

import { useEffect, useState } from "react";
import SaveToCalendarButtons from "../saveToCalendarButtons/saveToCalendarButtons";

interface IntroWeddingDateProps {
  id?: string;
  weddingDate: string;
}

const calculateCountdown = (date: string) => {
  const difference = +new Date(date) - +new Date();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const timeLeft = {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
  return timeLeft;
};

export default function WeddingDate({
  weddingDate,
  id,
}: IntroWeddingDateProps) {
  const [timeLeft, setTimeLeft] = useState(calculateCountdown(weddingDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateCountdown(weddingDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section
      id={id}
      className="bg-(--marsala) bg-opacity-30 p-3 px-4 text-center shadow-xl backdrop-blur-sm w-full"
    >
      <div className="relative">
        <img
          alt="flores-retas"
          src="/flores-retas.png"
          className="w-full md:w-70 m-auto object-cover pb-2"
        />

        <h1 className="text-5xl md:text-7xl p-1  text-white">Falta</h1>
        <div className="flex justify-center text-white text-2xl md:text-4xl font-semibold space-x-4 md:space-x-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-xs md:text-sm mt-1">DIAS</span>
          </div>
          <span className="text-4xl md:text-6xl">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-xs md:text-sm mt-1">HORAS</span>
          </div>
          <span className="text-4xl md:text-6xl">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-xs md:text-sm mt-1">MINUTOS</span>
          </div>
          <span className="text-4xl md:text-6xl">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-xs md:text-sm mt-1">SEGUNDOS</span>
          </div>
        </div>

        <h1 className="text-md md:text-5xl pt-3 text-white">
          Até nos casarmos
        </h1>
      </div>

      <SaveToCalendarButtons />
    </section>
  );
}
