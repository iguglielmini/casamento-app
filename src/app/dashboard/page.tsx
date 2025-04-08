"use client";

import { useDashboard } from "@/contexts/dashboardContext";
import Summary from "../components/summary/summary";

export default function Dashboard() {
  const { totalGuests, confirmedGuests, unconfirmedGuests } = useDashboard();

  return (
    <div className="max-w-7xl mx-auto mt-20 bg-(--marsala)">
      <div className="w-full flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">Dashboard do Casamento</h1>
      </div>

      <Summary
        total={totalGuests}
        confirmed={confirmedGuests}
        unconfirmed={unconfirmedGuests}
      />
    </div>
  );
}
