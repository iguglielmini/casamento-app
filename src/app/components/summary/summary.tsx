"use client";

interface SummaryProps {
    total: number;
    confirmed: number;
    unconfirmed: number;
  }
  
  export default function Summary({
    total,
    confirmed,
    unconfirmed,
  }: SummaryProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 shadow rounded">
          Total: {total}
        </div>
        <div className="bg-green-200 p-4 shadow rounded">
          Confirmados: {confirmed}
        </div>
        <div className="bg-red-200 p-4 shadow rounded">
          Não confirmados: {unconfirmed}
        </div>
      </div>
    );
  }
  