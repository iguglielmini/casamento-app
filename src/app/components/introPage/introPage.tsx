"use client";
import { useEffect, useState } from "react";

interface IntroPageProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  weddingDate: string; // YYYY-MM-DDTHH:mm:ss
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

export default function IntroPage({
  backgroundImage,
  title,
  subtitle,
  weddingDate,
}: IntroPageProps) {
  const [timeLeft, setTimeLeft] = useState(calculateCountdown(weddingDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateCountdown(weddingDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("our-history");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100vh] md:min-h-[75vh] flex flex-col items-center justify-center text-white overflow-hidden animate-fade-in">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:max-h-[550px]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(1.5px)",
        }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-25 md:max-h-[550px]"></div>

      <div className="relative w-full flex flex-col">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center items-start ">
            <h2 className="text-lg md:text-xl pb-6">{subtitle}</h2>
            <h1 className="text-6xl md:text-8xl">{title}</h1>
          </div>
          <div className="w-[100px] md:w-[300px]"></div>
        </div>
        <div className="relative flex flex-row justify-center">
          <h2 className="text-xs md:text-xl p-5">
            Sábado, 29 de Novembro de 2025
          </h2>
          <h2 className="text-sm md:text-xl p-5 max-w-[250px] md:max-w-[400px]">
            Participe da celebração enquanto Italo e Daniely dizem
            &quot;SIM&quot; nesse dia mágico no Vinttage festas.
          </h2>
        </div>
      </div>

      <div className="relative bg-(--marsala) bg-opacity-30 p-3 px-4 rounded-sm text-center shadow-xl backdrop-blur-sm w-full max-w-[700px]">
        <div
          className="absolute inset-1 bg-contain bg-no-repeat ml-[-60px] mb-[-30px] md:ml-[-40px] md:mb-[-60px]"
          style={{
            backgroundImage: `url(/flores-marsala.png)`,
          }}
        ></div>

        <h1 className="text-md md:text-5xl p-1">Falta</h1>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <div>
            <span className="text-3xl md:text-5xl">{timeLeft.days}</span>
            <h1 className="text-lg md:text-3xl">Dias</h1>
          </div>
          <div>
            <span className="text-3xl md:text-5xl">{timeLeft.hours}</span>
            <h1 className="text-lg md:text-3xl">Horas</h1>
          </div>
          <div>
            <span className="text-3xl md:text-5xl">{timeLeft.minutes}</span>
            <h1 className="text-lg md:text-3xl">Minutos</h1>
          </div>
          <div>
            <span className="text-3xl md:text-5xl">{timeLeft.seconds}</span>
            <h1 className="text-lg md:text-3xl">Segundos</h1>
          </div>
        </div>
        <h1 className="text-md md:text-5xl pt-3">Até nos casarmos</h1>
      </div>

      <button
        type="button"
        onClick={scrollToNextSection}
        className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-(--bg-wedding) shadow text-gray-800 shadow animate-bounce"
      >
        ↓
      </button>
    </section>
  );
}
