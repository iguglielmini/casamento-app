"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { formatPhone } from "@/utils/phoneUtils";
import { useConfirmPresence } from "@/contexts/ConfirmPresenceContext";

export default function ConfirmingPresence() {
  const { confirmPresence, loading } = useConfirmPresence();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const confirmed = localStorage.getItem("guestConfirmed");
    setIsConfirmed(confirmed === "true");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await confirmPresence(phone, name);
    setMessage(result.message);
    if (result.success) {
      setIsConfirmed(true);
      setIsModalOpen(false);
    }
  };

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <img
          alt="flores-retas"
          src="/flores-retas.png"
          className="w-full md:w-60 m-auto object-cover"
        />
        <h1 className="text-6xl mb-4 text-center">Presença confirmada!</h1>
        <h2 className="text-2xl text-center pt-8">
          Esperamos você no nosso casamento! Saiba que você é importante e sua
          presença fará diferença!
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <img
        alt="flores-retas"
        src="/flores-retas.png"
        className="w-full md:w-40 m-auto mb-4"
      />
      <h1 className="text-4xl md:text-6xl text-center mb-4">
        Estamos ansiosos para comemorar com você!
      </h1>
      <h2 className="text-2xl text-center max-w-[600px]">
        A sua presença já é um presente enorme. Se você desejar nos enviar algo
        mais, nossa lista de presentes está no{" "}
        <Link
          className="text-amber-800"
          href="https://www.ferreiracosta.com/lista-de-casamento/presentes/italoedaniely2"
          target="_blank"
        >
          Ferreira Costa.
        </Link>
      </h2>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="bg-(--marsala) text-white px-6 py-3 text-2xl md:text-3xl hover:opacity-90 transition rounded-full mt-6"
      >
        Confirme sua presença
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-invert backdrop-opacity-10 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative animate-fade-in">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>

            <form onSubmit={handleSubmit}>
              <img
                alt="flores-retas"
                src="/flores-retas.png"
                className="w-full md:w-40 m-auto mb-4 object-cover"
              />
              <h1 className="text-4xl md:text-6xl text-center mb-4">
                Confirme sua presença
              </h1>

              <input
                type="text"
                placeholder="Seu nome completo"
                value={name}
                disabled={loading}
                required
                onChange={(e) => setName(e.target.value)}
                className="border p-4 w-full mb-4 rounded-full"
              />

              <input
                type="text"
                placeholder="Número de telefone"
                value={phone}
                disabled={loading}
                required
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className="border p-4 w-full mb-4 rounded-full"
              />

              <button
                type="submit"
                disabled={loading}
                className={`bg-(--marsala) text-white px-3 py-3 w-full rounded-full ${
                  loading ? "opacity-50" : ""
                }`}
              >
                {loading ? "Enviando..." : "Confirmar presença"}
              </button>

              {message && (
                <p className="mt-4 animate-fade-in text-center text-gray-700">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
