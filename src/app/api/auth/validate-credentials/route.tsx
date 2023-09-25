import { prisma } from "@/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  console.log(username, " Attempted login");

  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
    include: {
      auth: true,
    },
  });

  if (!user || !user.auth)
    return NextResponse.json({ error: "User not registered" });

  const isValid = await bcrypt.compare(password, user.auth.passwordHash);

  if (!isValid) return NextResponse.json({ error: "Invalid login" });

  console.log(username, " Logged in");

  const { auth, ...rest } = user;

  return NextResponse.json({ user: rest });
}
