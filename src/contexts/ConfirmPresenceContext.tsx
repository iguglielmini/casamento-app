"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { cleanPhone } from "@/utils/phoneUtils";

interface ConfirmPresenceContextType {
  confirmPresence: (
    phone: string,
    name: string,
    surname: string,
    hasCompanion: boolean
  ) => Promise<{ success: boolean; message: string }>;
  loading: boolean;
}

const ConfirmPresenceContext = createContext<ConfirmPresenceContextType | undefined>(undefined);

export const useConfirmPresence = () => {
  const context = useContext(ConfirmPresenceContext);
  if (!context) {
    throw new Error("useConfirmPresence deve ser usado dentro do ConfirmPresenceProvider");
  }
  return context;
};

export const ConfirmPresenceProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const confirmPresence = async (
    phone: string,
    name: string,
    surname: string,
    hasCompanion: boolean
  ) => {
    setLoading(true);
    const cleanedPhone = cleanPhone(phone);

    const res = await fetch("/api/guest/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: cleanedPhone, name, surname, hasCompanion }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      localStorage.setItem("guestConfirmed", "true");
      return {
        success: true,
        message: `Presença confirmada com sucesso, ${data.guest.name}!`,
      };
    } else {
      return {
        success: false,
        message: data.error || "Ocorreu um erro na confirmação.",
      };
    }
  };

  return (
    <ConfirmPresenceContext.Provider value={{ confirmPresence, loading }}>
      {children}
    </ConfirmPresenceContext.Provider>
  );
};
