import Papa from "papaparse";
import { saveAs } from "file-saver";

interface GuestExport {
  name: string;
  phone: string;
  invitedBy: string;
  hasCompanion: boolean;
  confirmed: boolean;
}

export const exportGuestsToCSV = (guests: GuestExport[]) => {
  const csv = Papa.unparse(
    guests.map((guest) => ({
      Nome: guest.name,
      Telefone: guest.phone,
      "Convidado por": guest.invitedBy,
      Acompanhante: guest.hasCompanion ? "Sim" : "Não",
      Confirmado: guest.confirmed ? "Sim" : "Não",
    }))
  );

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "convidados.csv");
};
