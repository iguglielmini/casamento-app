import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { name, phone } = await request.json();

  try {
    const guest = await prisma.guest.create({ data: { name, phone } });
    return NextResponse.json(guest, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao criar convidado." },
      { status: 400 }
    );
  }
}
