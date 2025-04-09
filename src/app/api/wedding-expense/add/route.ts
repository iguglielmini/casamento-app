// src/app/api/wedding-expense/add/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { date, description, type, totalValue, paidValue } =
    await request.json();

  if (!description || !type || !totalValue || !paidValue || !date) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 400 }
    );
  }

  const expense = await prisma.weddingExpense.create({
    data: {
      date: new Date(date),
      description,
      type,
      totalValue: parseFloat(totalValue),
      paidValue: parseFloat(paidValue),
    },
  });

  return NextResponse.json(expense, { status: 201 });
}
