import { Box, Typography } from "@mui/material";
import { Guest } from "../../@types";
import { ModalCustom, TableCustom } from "../../components/basics";
import { TableColumn } from "../../components/basics/tableCustom/tableCustom";
import { formatPhone } from "../../utils";
import { useDashboard } from "../../context/DashboardContext";
import { useEffect, useState } from "react";
import { GuestSummary } from "../../components/compositives";
// import { useDashboardActions } from "../../hooks";

export default function GuestPage() {
  const {
    guests,
    fetchAllGuests,
    deleteGuest,
    viewGuest,
    totalGuestsCount,
    confirmedGuestsCount,
    unconfirmedGuestsCount,
  } = useDashboard();
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewGuest = async (id: string) => {
    const guest = await viewGuest(id);
    if (guest) {
      setSelectedGuest(guest);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    fetchAllGuests();
  }, []);

  const columns = [
    { id: "name", label: "Nome" },
    { id: "surname", label: "Sobrenome" },
    {
      id: "phone",
      label: "Telefone",
      format: (v: string) => formatPhone(v),
    },
    { id: "type", label: "Tipo" },
    { id: "invitedBy", label: "Convidado por" },
    {
      id: "hasCompanion",
      label: "Acompanhante",
      format: (v: boolean) => (v ? "✅" : "❌"),
    },
    {
      id: "confirmed",
      label: "Confirmado",
      format: (v: boolean) => (v ? "✅" : "❌"),
    },
  ] satisfies TableColumn<Guest>[];

  const lastUpdate = new Date().toISOString();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Lista de Convidados
      </Typography>

      <GuestSummary
        total={totalGuestsCount}
        confirmed={confirmedGuestsCount}
        unconfirmed={unconfirmedGuestsCount}
        lastUpdate={lastUpdate}
      />

      <TableCustom<Guest>
        columns={columns}
        rows={guests}
        onDelete={(row) => deleteGuest(row.id)}
        onEdit={() => {}}
        onView={(row) => handleViewGuest(row.id)}
      />

      <ModalCustom
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Detalhes do Convidado"
      >
        {selectedGuest && (
          <Box>
            <Typography pb={2}>
              <strong>Nome:</strong> {selectedGuest.name}{" "}
              {selectedGuest.surname}
            </Typography>
            <Typography pb={2}>
              <strong>Telefone:</strong> {formatPhone(selectedGuest.phone)}
            </Typography>
            <Typography pb={2}>
              <strong>Convidado por:</strong> {selectedGuest.invitedBy}
            </Typography>
            <Typography pb={2}>
              <strong>Tipo:</strong> {selectedGuest.type}
            </Typography>
            <Typography pb={2}>
              <strong>Acompanhante:</strong>{" "}
              {selectedGuest.hasCompanion ? "Sim" : "Não"}
            </Typography>
            <Typography>
              <strong>Confirmado:</strong>{" "}
              {selectedGuest.confirmed ? "Sim" : "Não"}
            </Typography>
          </Box>
        )}
      </ModalCustom>
    </Box>
  );
}
