"use client";
import { useState } from "react";
import { formatPhone, cleanPhone } from "@/utils/phoneUtils";

export default function ConfirmingPresence() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedPhone = cleanPhone(phone);

    const res = await fetch("/api/guest/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: cleanedPhone }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`Presença confirmada com sucesso, ${data.guest.name}!`);
    } else {
      setMessage(data.error || "Ocorreu um erro na confirmação.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-8">
      <form onSubmit={handleConfirm} className="md:pt-36 md:pb-36">
        <img
          src="/flores-retas.png"
          alt="Rosas Marsalas"
          className="w-full md:w-60  object-cover m-auto"
        />
        <h1 className="text-6xl mb-4 text-center ">Confirme sua presença</h1>
        <input
          type="text"
          placeholder="Número de telefone"
          value={phone}
          onChange={handlePhoneChange}
          required
          className="border p-2 w-full mb-10 mt-10 rounded"
        />
        <button
          type="submit"
          className="bg-(--marsala) text-white px-4 py-2  w-full rounded cursor-pointer"
        >
          Confirmar presença
        </button>
        {message && <p className="mt-4 animate-fade-in text-center">{message}</p>}
      </form>
    </div>
  );
}
