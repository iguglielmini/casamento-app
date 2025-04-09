import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const { id, date, description, type, totalValue, paidValue } = await request.json();

  if (!id || !description || !type || !totalValue || !paidValue || !date) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
  }

  const updated = await prisma.weddingExpense.update({
    where: { id },
    data: {
      date: new Date(date),
      description,
      type,
      totalValue: parseFloat(totalValue),
      paidValue: parseFloat(paidValue),
    },
  });

  return NextResponse.json(updated);
}
