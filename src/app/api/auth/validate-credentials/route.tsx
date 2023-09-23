import { prisma } from "@/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
    include: {
      auth: true,
    },
  });

  if (!user || !user.auth) return NextResponse.json({ error: "Invalid login" });

  const isValid = await bcrypt.compare(password, user.auth.passwordHash);

  if (!isValid) return NextResponse.json({ error: "Invalid login" });

  const { auth, ...rest } = user;

  return NextResponse.json({ user: rest });
}
