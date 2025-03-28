import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest
) {
  const { id } = await request.json();
  const guestId = Number.parseInt(id);

  try {
    await prisma.guest.delete({
      where: { id: guestId },
    });

    return NextResponse.json(
      { message: "Convidado deletado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      { error: "Erro ao deletar o convidado." },
      { status: 400 }
    );
  }
}
