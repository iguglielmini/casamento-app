"use client";

interface CardLocationProps {
  imageUrl: string;
  locationName: string;
  date: string;
  mapsEmbedUrl: string;
}

export default function CardLocation({
  imageUrl,
  locationName,
  date,
  mapsEmbedUrl,
}: CardLocationProps) {
  return (
    <div className="w-full max-w-4xl mx-auto shadow-2xl bg-(--foreground) rounded overflow-hidden my-8">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={imageUrl}
          alt={locationName}
          className="w-full md:w-60 h-60 object-cover"
        />
        <div className="p-6 text-center md:text-left">
          <h1 className="text-6xl mb-2">{locationName}</h1>
          <p className="text-md font-outfit">{date}</p>
        </div>
      </div>
      <div className="w-full h-64">
        <iframe
          src={mapsEmbedUrl}
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
