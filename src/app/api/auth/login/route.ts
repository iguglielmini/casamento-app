import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (username === "admin" && password === "italoedaniely2025") {
    return NextResponse.json(
      { token: "secret-dashboard-token" },
      { status: 200 }
    )
  }

  return NextResponse.json(
    { error: "Credenciais inválidas." },
    { status: 401 }
  );
}
