"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { cleanPhone } from "@/utils/phoneUtils";
import { useRouter } from "next/navigation";

interface Guest {
  id: number;
  name: string;
  phone: string;
  confirmed: boolean;
}

interface DashboardContextType {
  guests: Guest[];
  totalGuests: number;
  confirmedGuests: number;
  unconfirmedGuests: number;
  fetchGuests: () => void;
  addGuest: (name: string, phone: string) => void;
  deleteGuest: (id: number) => void;
  logout: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard deve ser usado dentro do DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const router = useRouter();

  const fetchGuests = async () => {
    const res = await fetch("/api/guest/list");
    const data = await res.json();
    setGuests(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "secret-dashboard-token") {
      router.push("/login");
    } else {
      fetchGuests();
    }
  }, [router]);

  const addGuest = async (name: string, phone: string) => {
    await fetch("/api/guest/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone: cleanPhone(phone) }),
    });
    fetchGuests();
  };

  const deleteGuest = async (id: number) => {
    if (confirm("Deseja realmente excluir este convidado?")) {
      await fetch(`/api/guest/delete/${id}`, { method: "DELETE" });
      fetchGuests();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(g => g.confirmed).length;
  const unconfirmedGuests = totalGuests - confirmedGuests;

  return (
    <DashboardContext.Provider
      value={{
        guests,
        totalGuests,
        confirmedGuests,
        unconfirmedGuests,
        fetchGuests,
        addGuest,
        deleteGuest,
        logout,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
