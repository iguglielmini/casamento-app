import { ScrollFadeIn } from "../../components/basics";
import {
  IntroPage,
  OurHistory,
  WeddingDate,
  Location,
  Faq,
  WeddingTimeline,
  ConfirmingPresence,
} from "../../components/compositives";

import VinttageImg from "../../assets/vinttage.jpg";

import WeddingImg from "../../assets/bg-save-date.png";
import IntroPageImg from "../../assets/intro-home.png";

export default function LandingPage() {
  return (
    <>
      <IntroPage backgroundImage={IntroPageImg} />
      <ScrollFadeIn>
        <WeddingDate
          id="our-history"
          weddingDate="2025-11-29T19:00:00Z"
          backgroundImage={WeddingImg}
        />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <OurHistory />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <Location
          imageUrl={VinttageImg}
          locationName="Vinttage Casa de Evento"
          date="29 de Novembro de 2025 às 19:00"
          mapsEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.672912702654!2d-34.871793689047884!3d-7.1637595702606545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace9cfa13c71a5%3A0x49583301bfb4c765!2sVinttage%20Casa%20de%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1742863982942!5m2!1spt-BR!2sbr"
        />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <Faq />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <WeddingTimeline />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <ConfirmingPresence />
      </ScrollFadeIn>
    </>
  );
}
