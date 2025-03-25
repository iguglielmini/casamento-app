"use client";
import IntroPage from "./components/introPage/introPage";
import ConfirmingPresence from "./components/confirmingPresence/confirmingPresence";
import CardLocation from "./components/cardLocation/cardLocation";

export default function Home() {
  return (
    <main>
      <IntroPage
        backgroundImage="/wedding.jpg"
        subtitle="Está chegando o nosso dia!"
        title="Ítalo & Daniely"
        weddingDate="2025-11-28T17:00:00"
      />
      <div className="flex flex-col items-center justify-center pb-8 pt-10 md:pt-0">
        <h1 className="text-6xl md:text-6xl">Nossa História</h1>
        <p className="text-center max-w-[600px] p-5 md:p-0">
          Nós nos conhecemos há muito tempo, entre conversas e reclamações
          divertidas no Instagram. Após um breve afastamento, aqui estamos, mais
          próximos do que nunca, prontos para o grande dia do nosso casamento!
        </p>
      </div>
      <div className="pt-10 bg-(--marsala) p-8 flex flex-col items-center justify-center">
        <h1 className="text-6xl md:text-6xl text-amber-50">Cerimônia</h1>
        <p className="text-center max-w-[600px] text-white p-5 md:p-0">
          Não percam esse momento lindo e emocionante das nossas vidas. Contamos
          com você para ser ainda mais especial!
        </p>

        <CardLocation
          imageUrl="/vinttage.jpg"
          locationName="Vinttage Casa de Eventos"
          date="29 de Novembro de 2025 às 00:00"
          mapsEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.672912702654!2d-34.871793689047884!3d-7.1637595702606545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace9cfa13c71a5%3A0x49583301bfb4c765!2sVinttage%20Casa%20de%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1742863982942!5m2!1spt-BR!2sbr"
        />
      </div>
      <ConfirmingPresence />
    </main>
  );
}
