"use client";

export default function Faq() {
  return (
    <div className="flex flex-col items-center justify-center pb-10 pt-10 md:pt-20 m-auto">
      <h1 className="text-6xl md:text-6xl text-center">
        Você deve estar se perguntando...
      </h1>
      <div className="flex flex-row flex-wrap">
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl">Como posso chegar ao local?</h1>
          <p className="text-left max-w-[400px] md:p-0">
            O local é acessível por ônibus e carro. Você pode encontrar o
            endereço ao procurar por Vinttage Eventos em qualquer mapa.
          </p>
        </div>
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl">
            Quais são as regras de vestuário?
          </h1>
          <p className="text-left max-w-[400px] md:p-0">
            Lembre-se: branco somente para a noiva! O traje sugerido é elegante.
            A cerimônia e a recepção serão realizadas em ambiente climatizado.
          </p>
        </div>
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl">
            Posso convidar alguem?
          </h1>
          <p className="text-left max-w-[400px] md:p-0">
          Lembre-se: convidado não convida!
          Seu convite é pessoal, único e intransferível.
          </p>
        </div>
      </div>
    </div>
  );
}
