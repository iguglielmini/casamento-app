"use client";
import IntroPage from "./components/introPage/introPage";
import ConfirmingPresence from "./components/confirmingPresence/confirmingPresence";
import CardLocation from "./components/cardLocation/cardLocation";
import Faq from "./components/faq/faq";
import ProgramEvent from "./components/programEvent/programEvent";
import SectionBlock from "./components/sectionBlock.tsx/sectionBlock";
import ScrollFadeIn from "./components/scrollFadeIn/scrollFadeIn";

export default function Home() {
  return (
    <main>
      <IntroPage
        backgroundImage="/wedding.jpg"
        subtitle="Está chegando o nosso dia!"
        title="Ítalo & Daniely"
        weddingDate="2025-11-28T19:00:00"
      />
      <SectionBlock
        id="our-history"
        title="Nossa História"
        text={`Nós nos conhecemos há muito tempo, entre conversas e reclamações
          divertidas no Instagram. Após um breve afastamento, aqui estamos, mais
          próximos do que nunca, prontos para o grande dia do nosso casamento!`}
      />
      <ScrollFadeIn>
        <SectionBlock
          id="ceremony"
          title="Cerimônia"
          text="Não percam esse momento lindo e emocionante das nossas vidas. Contamos com você para ser ainda mais especial!"
          className="bg-(--marsala)"
          textClassName="text-white"
        >
          <CardLocation
            imageUrl="/vinttage.jpg"
            locationName="Vinttage Casa de Eventos"
            date="29 de Novembro de 2025 às 19:00"
            mapsEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.672912702654!2d-34.871793689047884!3d-7.1637595702606545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace9cfa13c71a5%3A0x49583301bfb4c765!2sVinttage%20Casa%20de%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1742863982942!5m2!1spt-BR!2sbr"
          />
        </SectionBlock>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <Faq />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <ProgramEvent />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <ConfirmingPresence />
      </ScrollFadeIn>
    </main>
  );
}
