"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPhone, cleanPhone } from "@/utils/phoneUtils";

interface Guest {
  id: number;
  name: string;
  phone: string;
  confirmed: boolean;
}

export default function Dashboard() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "secret-dashboard-token") {
      router.push("/login");
    } else {
      fetchGuests();
    }
  }, [router]);

  const fetchGuests = async () => {
    const res = await fetch("/api/guest/list");
    const data = await res.json();
    setGuests(data);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const addGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = cleanPhone(phone);

    await fetch("/api/guest/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone: cleanedPhone }),
    });
    setName("");
    setPhone("");
    fetchGuests();
  };

  const deleteGuest = async (id: number) => {
    if (confirm("Deseja realmente excluir este convidado?")) {
      await fetch(`/api/guest/delete/${id}`, {
        method: "DELETE",
      });
      fetchGuests();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen p-10 bg-(--marsala)">
      <h1 className="text-4xl font-bold mb-4">Dashboard de Convidados</h1>

      <form onSubmit={addGuest} className="bg-white p-6 shadow rounded mb-6">
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
          onChange={handlePhoneChange}
          className="border p-2 mr-2 mt-4 md:mt-0 rounded w-full md:w-50"
        />
        <button
          type="submit"
          className="bg-(--marsala) w-full md:w-50 text-white px-4 py-2 mt-4 rounded cursor-pointer"
        >
          Adicionar Convidado
        </button>
      </form>

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
              <td className="p-2 border text-center">{guest.confirmed ? "✅" : "❌"}</td>
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
