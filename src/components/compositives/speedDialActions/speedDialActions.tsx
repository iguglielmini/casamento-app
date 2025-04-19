import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaymentIcon from "@mui/icons-material/Payment";
import { AddGuestModal } from "../addGuestModal";
import { useDashboardActions } from "../../../hooks";
import { useDashboard } from "../../../context/DashboardContext";

export default function SpeedDialActions() {
  const { openGuestModal, closeGuestModal, isGuestModalOpen } =
    useDashboardActions();
  const { addGuest } = useDashboard();

  const handleSubmit = async (data: {
    name: string;
    surname: string;
    phone: string;
    invitedBy: "Noivo" | "Noiva" | "Ambos";
    hasCompanion: boolean;
    type: "Amigos" | "Padrinhos" | "Familiar";
  }) => {
    await addGuest({
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      invitedBy: data.invitedBy,
      hasCompanion: data.hasCompanion,
      type: data.type,
    });

    closeGuestModal();
  };

  const actions = [
    {
      icon: <PersonAddIcon />,
      name: "Adicionar Convidado",
      handler: openGuestModal,
    },
    { icon: <AttachMoneyIcon />, name: "Adicionar Despesa", handler: () => {} },
    { icon: <PaymentIcon />, name: "Registrar Pagamento", handler: () => {} },
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="Menu de ações"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.handler}
          />
        ))}
      </SpeedDial>

      <AddGuestModal
        open={isGuestModalOpen}
        onClose={closeGuestModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}
