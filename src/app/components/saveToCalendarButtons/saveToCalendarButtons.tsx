"use client";
import React from "react";

export default function SaveToCalendarButtons() {
  const handleDownloadICS = () => {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Casamento Ítalo e Daniely
DTSTART:20251128T220000Z
DTEND:20251129T000000Z
DESCRIPTION:Vamos celebrar juntos! 💍
LOCATION:Vinttage Casa de Eventos
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "casamento-italo-daniely.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-wrap gap-4 mt-6 justify-center">
      <button
        onClick={handleDownloadICS}
        className="flex items-center justify-center gap-2 bg-(--marsala) hover:bg-(--paragraph) text-white font-medium py-2 px-4 rounded-full transition duration-300 min-w-[250px]"
      >
        📁 Salvar na Agenda (ICS)
      </button>

      <a
        href="https://www.google.com/calendar/render?action=TEMPLATE&text=Casamento+Ítalo+e+Daniely&dates=20251128T220000Z/20251129T000000Z&details=Vamos+celebrar+juntos!+💍&location=Vinttage+Casa+de+Eventos&sf=true&output=xml"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-(--marsala) hover:bg-(--paragraph) text-white font-medium py-2 px-4 rounded-full transition duration-300 min-w-[250px] text-center"
      >
        🗓️ Google Agenda
      </a>
    </div>
  );
}
