"use client";
import { useState, useEffect } from "react";
import { formatPhone } from "@/utils/phoneUtils";
import { useConfirmPresence } from "@/contexts/ConfirmPresenceContext";

export default function ConfirmingPresence() {
  const { confirmPresence, loading } = useConfirmPresence();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

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
    }
  };

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <img
          src="/flores-retas.png"
          className="w-full md:w-60 object-cover m-auto"
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
      <form onSubmit={handleSubmit} className="md:pt-36 md:pb-36">
        <img
          src="/flores-retas.png"
          className="w-full md:w-60 object-cover m-auto"
        />
        <h1 className="text-4xl mb-4 text-center">Confirme sua presença</h1>

        <input
          type="text"
          placeholder="Seu nome completo"
          value={name}
          disabled={loading}
          required
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <input
          type="text"
          placeholder="Número de telefone"
          value={phone}
          disabled={loading}
          required
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`bg-(--marsala) text-white px-4 py-2 w-full rounded cursor-pointer ${
            loading ? "opacity-50" : ""
          }`}
        >
          {loading ? "Enviando..." : "Confirmar presença"}
        </button>

        {message && (
          <p className="mt-4 animate-fade-in text-center">{message}</p>
        )}
      </form>
    </div>
  );
}
