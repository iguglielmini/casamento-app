"use client";

import { useState } from "react";
import { formatPhone } from "@/utils/phoneUtils";
import { PlusCircle } from "lucide-react";

interface GuestFormModalProps {
  onSubmit: (data: {
    name: string;
    surname: string;
    phone: string;
    invitedBy: string;
    hasCompanion: boolean;
  }) => void;
  loading?: boolean;
}

export default function GuestFormModal({
  onSubmit,
  loading = false,
}: GuestFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [invitedBy, setInvitedBy] = useState("Ambos");
  const [hasCompanion, setHasCompanion] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, surname, phone, invitedBy, hasCompanion });
    setName("");
    setSurname("");
    setPhone("");
    setInvitedBy("Ambos");
    setHasCompanion(false);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded gap-2 hover:bg-green-700 transition"
      >
        <PlusCircle className="w-5 h-5" />
        Adicionar Convidado
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>

            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-semibold mb-4">Novo Convidado</h2>

              <input
                type="text"
                placeholder="Nome"
                value={name}
                required
                disabled={loading}
                onChange={(e) => setName(e.target.value)}
                className="border p-3 mb-3 w-full rounded"
              />

              <input
                type="text"
                placeholder="Sobrenome"
                value={surname}
                required
                disabled={loading}
                onChange={(e) => setSurname(e.target.value)}
                className="border p-3 mb-3 w-full rounded"
              />

              <input
                type="text"
                placeholder="Telefone"
                value={phone}
                required
                disabled={loading}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className="border p-3 mb-3 w-full rounded"
              />

              <div className="mb-3">
                <label className="block mb-1 font-semibold">
                  Convidado por:
                </label>
                <select
                  value={invitedBy}
                  onChange={(e) => setInvitedBy(e.target.value)}
                  disabled={loading}
                  className="border p-3 w-full rounded"
                >
                  <option value="Noivo">Noivo</option>
                  <option value="Noiva">Noiva</option>
                  <option value="Ambos">Ambos</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block mb-1 font-semibold">
                  Acompanhante:
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      checked={hasCompanion}
                      onChange={() => setHasCompanion(true)}
                      disabled={loading}
                    />{" "}
                    Sim
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={!hasCompanion}
                      onChange={() => setHasCompanion(false)}
                      disabled={loading}
                    />{" "}
                    Não
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-(--marsala) text-white px-4 py-2 w-full rounded mt-4"
              >
                {loading ? "Adicionando..." : "Salvar Convidado"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
