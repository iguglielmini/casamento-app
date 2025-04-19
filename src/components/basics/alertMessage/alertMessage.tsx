import {
  Alert,
  AlertColor,
  AlertTitle,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

interface AlertMessageProps {
  open: boolean;
  onClose: () => void;
  severity?: AlertColor;
  title?: string;
  children: ReactNode;
}

export default function AlertMessage({
  open,
  onClose,
  severity = "info",
  title,
  children,
}: AlertMessageProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 1500,
        width: "fit-content",
        
      }}
    >
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {title && (
            <AlertTitle style={{ textAlign: "left" }}>{title}</AlertTitle>
          )}
          {children}
        </Alert>
      </Collapse>
    </Box>
  );
}
