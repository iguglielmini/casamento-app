import { DashboardProvider } from "@/contexts/dashboardContext";
import DashboardHeader from "../components/dashboardHeader/dashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-(--marsala)">
        <DashboardHeader />
        <main className="p-4">{children}</main>
      </div>
    </DashboardProvider>
  );
}
