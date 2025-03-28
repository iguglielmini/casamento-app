import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextApiRequest
) {
  const { id } = request.query as never;
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
