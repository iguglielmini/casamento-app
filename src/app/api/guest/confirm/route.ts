import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { phone } = await request.json();

  try {
    const guest = await prisma.guest.update({
      where: { phone },
      data: { confirmed: true, confirmedAt: new Date() },
    });

    return NextResponse.json(
      { message: "Presença confirmada!", guest },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Telefone não encontrado." },
      { status: 404 }
    );
  }
}
