import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Rotas privadas */}
        <Route path="/dashboard/*" element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
