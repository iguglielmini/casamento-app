"use client";
import { useState } from "react";
import { useDashboard } from "@/contexts/dashboardContext";
import { formatPhone } from "@/utils/phoneUtils";
import Notification from "../components/notification/notification";

export default function Dashboard() {
  const {
    guests,
    totalGuests,
    confirmedGuests,
    unconfirmedGuests,
    addGuest,
    deleteGuest,
    logout,
  } = useDashboard();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addGuest(name, phone);

    if (result?.success) {
      setNotification({
        type: "success",
        message: result.message || "Convidado adicionado com sucesso!",
      });
      setName("");
      setPhone("");
    } else {
      setNotification({
        type: result?.type || "error",
        message: result?.message || "Erro ao adicionar convidado.",
      });
    }

    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="min-h-screen p-10 bg-(--marsala)">
      <h1 className="text-4xl font-bold mb-4">Dashboard de Convidados</h1>

      {notification && (
        <div className="mb-4">
          <Notification type={notification.type} message={notification.message} />
        </div>
      )}

      {/* Totais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 shadow rounded">Total: {totalGuests}</div>
        <div className="bg-green-200 p-4 shadow rounded">Confirmados: {confirmedGuests}</div>
        <div className="bg-red-200 p-4 shadow rounded">Não confirmados: {unconfirmedGuests}</div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleAddGuest} className="bg-white p-6 shadow rounded mb-6">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="border p-2 md:mr-2 rounded w-full md:w-100"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          required
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          className="border p-2 mr-2 mt-4 md:mt-0 rounded w-full md:w-50"
        />
        <button
          type="submit"
          className="bg-(--marsala) w-full md:w-50 text-white px-4 py-2 mt-4 rounded cursor-pointer"
        >
          Adicionar Convidado
        </button>
      </form>

      {/* Tabela de convidados */}
      <table className="bg-white w-full shadow rounded">
        <thead>
          <tr>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Telefone</th>
            <th className="p-2 border">Confirmado</th>
            <th className="p-2 border">Ação</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td className="p-2 border">{guest.name}</td>
              <td className="p-2 border">{formatPhone(guest.phone)}</td>
              <td className="p-2 border text-center">
                {guest.confirmed ? "✅" : "❌"}
              </td>
              <td className="p-2 border">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteGuest(guest.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={logout}
        className="bg-gray-600 text-white px-4 py-2 rounded mt-4 w-full md:w-50"
      >
        Sair
      </button>
    </div>
  );
}
