/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import { Guest } from "../@types";
import {
  getGuests,
  getGuestById,
  createGuest,
  deleteGuest as deleteGuestApi,
  updateGuest as updateGuestApi,
} from "../api/guestsApi";
import { AlertMessage } from "../components/basics";
import { Box } from "@mui/material";

interface DashboardContextType {
  guests: Guest[];
  addGuest: (guest: Omit<Guest, "id" | "confirmed" | "createdAt">) => Promise<void>;
  deleteGuest: (id: string) => Promise<void>;
  updateGuest: (id: string, data: Partial<Guest>) => Promise<void>;
  fetchAllGuests: () => Promise<void>;
  viewGuest: (id: string) => Promise<Guest | null>;
  totalGuestsCount: number;
  confirmedGuestsCount: number;
  unconfirmedGuestsCount: number;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({ open: false, message: "", severity: "success" });

  const showAlert = (message: string, severity: "success" | "error" | "info") => {
    setAlert({ open: true, message, severity });
    setTimeout(() => setAlert((prev) => ({ ...prev, open: false })), 4000);
  };

  const loadGuests = async () => {
    try {
      const data = await getGuests();
      setGuests(data);
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  const addGuest: DashboardContextType["addGuest"] = async (guest) => {
    try {
      const newGuest = await createGuest(guest);
      setGuests((prev) => [...prev, newGuest]);
      showAlert("Convidado adicionado com sucesso!", "success");
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  const deleteGuest: DashboardContextType["deleteGuest"] = async (id) => {
    try {
      await deleteGuestApi(id);
      setGuests((prev) => prev.filter((g) => g.id !== id));
      showAlert("Convidado removido com sucesso!", "success");
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  const updateGuest: DashboardContextType["updateGuest"] = async (id, data) => {
    try {
      const updated = await updateGuestApi(id, data);
      setGuests((prev) => prev.map((g) => (g.id === id ? updated : g)));
      showAlert("Convidado atualizado com sucesso!", "success");
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  const fetchAllGuests = async () => {
    await loadGuests();
  };

  const viewGuest: DashboardContextType["viewGuest"] = async (id) => {
    try {
      const guest = await getGuestById(id);
      return guest;
    } catch (error: any) {
      showAlert(error.message, "error");
      return null;
    }
  };

  const totalGuestsCount = guests.reduce((acc, g) => acc + (g.hasCompanion ? 2 : 1), 0);
  const confirmedGuestsCount = guests.reduce(
    (acc, g) => acc + (g.confirmed ? (g.hasCompanion ? 2 : 1) : 0),
    0
  );
  const unconfirmedGuestsCount = totalGuestsCount - confirmedGuestsCount;

  useEffect(() => {
    loadGuests();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        guests,
        addGuest,
        deleteGuest,
        updateGuest,
        fetchAllGuests,
        viewGuest,
        totalGuestsCount,
        confirmedGuestsCount,
        unconfirmedGuestsCount,
      }}
    >
      {children}
      <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1500 }}>
        <AlertMessage
          open={alert.open}
          onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
          severity={alert.severity}
        >
          {alert.message}
        </AlertMessage>
      </Box>
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard deve ser usado dentro do DashboardProvider");
  }
  return context;
};