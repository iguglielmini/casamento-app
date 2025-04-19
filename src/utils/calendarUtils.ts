export function downloadICS({
  title,
  description,
  location,
  start,
  end,
  filename = "evento.ics",
}: {
  title: string;
  description: string;
  location: string;
  start: string; // ex: "20251128T220000Z"
  end: string; // ex: "20251129T000000Z"
  filename?: string;
}) {
  const icsContent = `
  BEGIN:VCALENDAR
  VERSION:2.0
  BEGIN:VEVENT
  SUMMARY:${title}
  DTSTART:${start}
  DTEND:${end}
  DESCRIPTION:${description}
  LOCATION:${location}
  END:VEVENT
  END:VCALENDAR
    `.trim();

  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
