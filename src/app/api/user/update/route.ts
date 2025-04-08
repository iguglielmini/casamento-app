import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const { id, username, password } = await request.json();

    if (!id || !username) {
      return NextResponse.json(
        { error: "ID e username são obrigatórios." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        ...(password && { password }), // Só atualiza se informado
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar o usuário." },
      { status: 500 }
    );
  }
}
