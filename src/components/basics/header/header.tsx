import { AppBar, Toolbar, IconButton, Slide, useScrollTrigger, Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom"; // para Vite com react-router

export default function Header() {
  const trigger = useScrollTrigger({ threshold: 100 });
  const navigate = useNavigate();

  return (
    <Slide appear={false} direction="down" in={trigger}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#efb7bfd8",
          boxShadow: 3,
          color: "primary.main",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box fontWeight="bold" fontSize="1.25rem" fontFamily="Mrs Saint Delafield">
            Ítalo e Daniely
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            onClick={() => navigate("/login")}
            aria-label="login"
          >
            <LoginIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
