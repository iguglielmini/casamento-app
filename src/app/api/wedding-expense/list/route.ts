import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const expenses = await prisma.weddingExpense.findMany({
    orderBy: { date: "desc" },
  });

  const grouped = expenses.reduce((acc, expense) => {
    const saldoDevedor = expense.totalValue - expense.paidValue;
    const status = saldoDevedor <= 0 ? "Pago até hoje" : "Saldo devedor";

    if (!acc[expense.type]) acc[expense.type] = [];

    acc[expense.type].push({
      ...expense,
      saldoDevedor,
      status,
    });

    return acc;
  }, {} as Record<string, any[]>);

  return NextResponse.json(grouped);
}
