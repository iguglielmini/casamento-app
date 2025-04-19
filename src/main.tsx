import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./styles";
import "./styles/variables.css";
import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { DashboardProvider } from "./context/DashboardContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
      <DashboardProvider>
        <App />
        </DashboardProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
