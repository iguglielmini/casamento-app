import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest
) {
  const { searchParams } = request.nextUrl;
  const id = Number.parseInt(searchParams.get("id") as string);

  try {
    await prisma.guest.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Convidado deletado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar o convidado." },
      { status: 400 }
    );
  }
}
