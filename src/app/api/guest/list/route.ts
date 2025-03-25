import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const guests = await prisma.guest.findMany();
  return NextResponse.json(guests, { status: 200 });
}
