"use client";
import { useEffect, useState } from "react";

interface IntroPageProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}
export default function IntroPage({
  backgroundImage,
  title,
  subtitle,
}: IntroPageProps) {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("our-history");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-white overflow-hidden animate-fade-in">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
      <div className="relative w-full flex flex-col">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center items-start ">
            <h2 className="text-lg md:text-xl pb-6">{subtitle}</h2>
            <h1 className="text-6xl md:text-9xl">{title}</h1>
            <h2 className="text-sm md:text-xl p-5 max-w-[250px] md:max-w-[600px]">
              Participe da celebração enquanto Italo e Daniely dizem
              &quot;SIM&quot; nesse dia mágico no Vinttage festas.
            </h2>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToNextSection}
        className="w-20 h-20 flex items-center justify-center rounded-full bg-(--bg-wedding) text-gray-800 shadow animate-bounce text-4xl"
      >
        ↓
      </button>
    </section>
  );
}
