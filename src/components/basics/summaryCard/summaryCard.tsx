import { Card, CardContent, Typography, Box } from "@mui/material";
import { format } from "date-fns";
import { ReactNode } from "react";

interface SummaryCardProps {
  label: string;
  value: number;
  lastUpdate: string;
  color?: "primary" | "success" | "error" | "info";
  icon?: ReactNode;
}

export default function SummaryCard({
  label,
  value,
  lastUpdate,
  color = "primary",
  icon,
}: SummaryCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        boxShadow: 3,
        minWidth: 200,
        flex: 1,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" flexDirection="column" flexWrap="wrap">
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              {icon}
              <Typography variant="subtitle2" color="textSecondary">
                {label}
              </Typography>
            </Box>

            <Typography variant="caption" color="textSecondary">
              Última atualização:{" "}
              {format(new Date(lastUpdate), "dd/MM/yyyy HH:mm")}
            </Typography>
          </Box>

          <Typography
            variant="h3"
            color={`${color}.main`}
            fontWeight="bold"
            mb={1}
          >
            {value.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
