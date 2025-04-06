"use client";
import React from "react";

interface SectionBlockProps {
  id: string;
  title: string;
  text: string;
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

export default function SectionBlock({
  id,
  title,
  text,
  className = "",
  textClassName = "text-gray-900",
  children,
}: SectionBlockProps) {
  return (
    <div
      id={id}
      className={`flex flex-col items-center justify-center px-4 py-10 md:py-16 ${className}`}
    >
      <img
        alt="flores-retas"
        src="/flores-retas.png"
        className="w-full md:w-60 m-auto object-cover pb-8"
      />
      <h1 className={`text-4xl md:text-6xl mb-4 ${textClassName}`}>{title}</h1>
      <p
        className={`text-center max-w-[600px] p-5 md:p-0 ${textClassName}`}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {children}
    </div>
  );
}
