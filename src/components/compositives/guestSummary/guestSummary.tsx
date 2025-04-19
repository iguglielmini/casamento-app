import { Box } from "@mui/material";
import { SummaryCard } from "../../basics";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface GuestSummaryProps {
  total: number;
  confirmed: number;
  unconfirmed: number;
  lastUpdate: string;
}

export default function GuestSummary({
  total,
  confirmed,
  unconfirmed,
  lastUpdate,
}: GuestSummaryProps) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      justifyContent="space-between"
      sx={{ my: 3 }}
    >
      <Box flex={1} minWidth={250}>
        <SummaryCard
          label="Total de Convidados"
          value={total}
          lastUpdate={lastUpdate}
          color="primary"
          icon={<GroupIcon fontSize="large" color="primary" />}
        />
      </Box>
      <Box flex={1} minWidth={250}>
        <SummaryCard
          label="Presenças Confirmadas"
          value={confirmed}
          lastUpdate={lastUpdate}
          color="success"
          icon={<CheckCircleIcon fontSize="large" color="success" />}
        />
      </Box>
      <Box flex={1} minWidth={250}>
        <SummaryCard
          label="Não Confirmados"
          value={unconfirmed}
          lastUpdate={lastUpdate}
          color="error"
          icon={<CancelIcon fontSize="large" color="error" />}
        />
      </Box>
    </Box>
  );
}
