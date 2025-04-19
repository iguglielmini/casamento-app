import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage, ExpensesPage, GuestPage } from "../pages";
import DashboardLayout from "../layout/dashboardLayout";
import { useAuth } from "../context";

export default function PrivateRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/guests" element={<GuestPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        {/* outras rotas internas */}
      </Routes>
    </DashboardLayout>
  );
}
