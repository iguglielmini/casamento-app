import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { phone, name, hasCompanion } = await request.json();

  const guest = await prisma.guest.findFirst({ where: { phone, name } });

  if (!guest) {
    return NextResponse.json(
      { error: "Seu nome não está na lista de convidados. Tente mais tarde!" },
      { status: 404 }
    );
  }

  const updatedGuest = await prisma.guest.update({
    where: { id: guest.id },
    data: {
      confirmed: true,
      confirmedAt: new Date(),
      hasCompanion,
    },
  });

  return NextResponse.json(
    { message: "Presença confirmada!", guest: updatedGuest },
    { status: 200 }
  );
}
