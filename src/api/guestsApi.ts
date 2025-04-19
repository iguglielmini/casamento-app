import { Guest } from "../@types";

export async function getGuests(): Promise<Guest[]> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/guests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao buscar convidados");
  }

  const data = await res.json();
  return data.data;
}

export async function fetchGuests(token: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/guests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao buscar convidados");
  }

  const data = await res.json();
  return data.data; // Array de convidados
}

export async function createGuest(
  guest: Omit<Guest, "id" | "confirmed" | "createdAt">
): Promise<Guest> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/guests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(guest),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao adicionar convidado");
  }

  const data = await res.json();
  return data.data;
}

export async function deleteGuest(id: string): Promise<void> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/guests/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao remover convidado");
  }
}

export async function updateGuest(
  id: string,
  updatedFields: Partial<Omit<Guest, "id" | "confirmed" | "createdAt">>
): Promise<Guest> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/guests/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedFields),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao atualizar convidado");
  }

  const data = await res.json();
  return data.data;
}

export async function confirmGuestPresence(data: {
  phone: string;
  name: string;
  hasCompanion: boolean;
}) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/guests/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao confirmar presença");
  }

  const responseData = await res.json();
  return responseData.data; // retorna o Guest atualizado
}

export async function getGuestById(id: string): Promise<Guest> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/guests/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao buscar convidado");
  }

  const data = await res.json();
  return data.data;
}