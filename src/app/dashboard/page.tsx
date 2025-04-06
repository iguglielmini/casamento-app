"use client";

import { useState } from "react";
import { useDashboard } from "@/contexts/dashboardContext";
import { formatPhone } from "@/utils/phoneUtils";
import Notification from "../components/notification/notification";
import Summary from "../components/summary/summary";
import GuestFormModal from "../components/guestFormModal/guestFormModal";
import { Download } from "lucide-react";
import { exportGuestsToCSV } from "@/utils/exportCSV";

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

  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  const handleAddGuest = async ({
    name,
    phone,
    invitedBy,
    hasCompanion,
  }: {
    name: string;
    phone: string;
    invitedBy: string;
    hasCompanion: boolean;
  }) => {
    const result = await addGuest(name, phone, invitedBy, hasCompanion);

    setNotification({
      type: result.type,
      message: result.message,
    });

    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="min-h-screen p-10 bg-(--marsala)">
      <div className="w-full flex flex-wrap items-center justify-between">
        <h1 className="text-4xl font-bold mb-4">Dashboard de Convidados</h1>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <GuestFormModal onSubmit={handleAddGuest} />

          <button
            type="button"
            onClick={() => exportGuestsToCSV(guests)}
            className="flex items-center bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            <Download className="w-5 h-5 mr-2" />
            Exportar em CSV
          </button>

          <button
            type="button"
            onClick={logout}
            className="bg-gray-600 hover:bg-gray-700  text-white px-4 py-2 rounded"
          >
            Sair
          </button>
        </div>
      </div>

      {notification && (
        <div className="mb-4">
          <Notification
            type={notification.type}
            message={notification.message}
          />
        </div>
      )}

      <Summary
        total={totalGuests}
        confirmed={confirmedGuests}
        unconfirmed={unconfirmedGuests}
      />

      {/* Tabela de convidados */}
      <div className="w-full overflow-x-auto mb-4">
        <table className="min-w-[700px] bg-white w-full shadow rounded">
          <thead>
            <tr>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Telefone</th>
              <th className="p-2 border">Convidado por</th>
              <th className="p-2 border">Acompanhante</th>
              <th className="p-2 border">Confirmado</th>
              <th className="p-2 border">Ação</th>
            </tr>
          </thead>
          <tbody>
            {guests.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Não há convidados no momento!
                </td>
              </tr>
            ) : (
              guests.map((guest) => (
                <tr key={guest.id}>
                  <td className="p-2 border">{guest.name}</td>
                  <td className="p-2 border">{formatPhone(guest.phone)}</td>
                  <td className="p-2 border">{guest.invitedBy}</td>
                  <td className="p-2 border text-center">
                    {guest.hasCompanion ? "✅" : "❌"}
                  </td>
                  <td className="p-2 border text-center">
                    {guest.confirmed ? "✅" : "❌"}
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      type="button"
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => deleteGuest(guest.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
