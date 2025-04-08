import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, surname, phone, invitedBy, hasCompanion } = await request.json();

    // Validação básica
    if (!name || !surname || !phone || !invitedBy) {
      return NextResponse.json(
        { error: "Dados obrigatórios ausentes." },
        { status: 400 }
      );
    }
    const guest = await prisma.guest.create({
      data: {
        name,
        surname,
        phone,
        invitedBy,
        hasCompanion: Boolean(hasCompanion),
      },
    });

    return NextResponse.json(guest, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao adicionar convidado:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Telefone já cadastrado como convidado." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao criar convidado." },
      { status: 400 }
    );
  }
}
