import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6E1414" }, // Marsala
    secondary: { main: "#EFB7BF" }, // Rosé
    background: {
      default: "#fff",
      paper: "#FADADD", // Rosé claro
    },
    warning: { main: "#FF8C69" }, // Salmão
  },
  typography: {
    fontFamily: `'Outfit', sans-serif`, // Fonte base
    h1: {
      fontFamily: `'Mrs Saint Delafield', cursive`,
    },
    h2: {
      fontFamily: `'Geist Mono', cursive`,
    },
  },
});
