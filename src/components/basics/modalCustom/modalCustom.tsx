import { Modal, Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

interface ModalCustomProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: number;
}

export default function ModalCustom({
  open,
  onClose,
  title,
  children,
  maxWidth = 600,
}: ModalCustomProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          width: "90%",
          maxWidth,
          p: 3,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          {title && <Typography variant="h6">{title}</Typography>}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {title && <Divider sx={{ mb: 2 }} />}

        {children}
      </Box>
    </Modal>
  );
}
