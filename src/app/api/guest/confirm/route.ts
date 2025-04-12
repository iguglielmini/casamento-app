import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { cleanPhone } from "@/utils/phoneUtils"; // se você tiver esse helper

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { phone, name, surname, hasCompanion } = await request.json();

    if (!phone || !name || !surname) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    const cleanedPhone = cleanPhone(phone);

    const guest = await prisma.guest.findUnique({
      where: { phone: cleanedPhone },
    });

    if (!guest) {
      return NextResponse.json(
        { error: "Telefone não encontrado na lista de convidados." },
        { status: 404 }
      );
    }

    const updatedGuest = await prisma.guest.update({
      where: { id: guest.id },
      data: {
        confirmed: true,
        confirmedAt: new Date(),
        hasCompanion: Boolean(hasCompanion),
        name, // atualiza caso queira manter sempre o último nome preenchido
        surname,
      },
    });

    return NextResponse.json(
      { message: "Presença confirmada!", guest: updatedGuest },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro na confirmação:", error);
    return NextResponse.json(
      { error: "Erro ao processar confirmação." },
      { status: 500 }
    );
  }
}
