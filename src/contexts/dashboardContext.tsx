"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { cleanPhone } from "@/utils/phoneUtils";
import { useRouter } from "next/navigation";

interface Guest {
  id: number;
  name: string;
  phone: string;
  confirmed: boolean;
  invitedBy: string;
  hasCompanion: boolean;
}

interface DashboardContextType {
  guests: Guest[];
  totalGuests: number;
  confirmedGuests: number;
  unconfirmedGuests: number;
  fetchGuests: () => void;
  addGuest: (
    name: string,
    phone: string,
    invitedBy: string,
    hasCompanion: boolean
  ) => Promise<{
    success: boolean;
    type: "success" | "error" | "warning";
    message: string;
  }>;
  deleteGuest: (id: number) => void;
  logout: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

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

  const addGuest = async (
    name: string,
    phone: string,
    invitedBy: string,
    hasCompanion: boolean
  ) => {
    try {
      const res = await fetch("/api/guest/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: cleanPhone(phone),
          invitedBy,
          hasCompanion,
        }),
      });

      if (res.status === 409) {
        return {
          success: false,
          type: "warning" as const,
          message: "Este telefone já está cadastrado como convidado.",
        };
      }
  
      if (!res.ok) {
        return {
          success: false,
          type: "error" as const,
          message: "Erro ao adicionar convidado. Tente novamente.",
        };
      }
  
      await fetchGuests();
      return {
        success: true,
        type: "success" as const,
        message: "Convidado adicionado com sucesso!",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        type: "error" as const,
        message: "Erro inesperado. Verifique sua conexão ou tente mais tarde.",
      };
    }
  };
  
  const deleteGuest = async (id: number) => {
    if (confirm("Deseja realmente excluir este convidado?")) {
      await fetch(`/api/guest/delete?id=${id}`, { method: "DELETE" });
      fetchGuests();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const totalGuests = guests.reduce((acc, guest) => acc + 1 + (guest.hasCompanion ? 1 : 0), 0);
  const confirmedGuests = guests.filter((g) => g.confirmed).length;
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
