"use server";

import { prisma } from "@/db";
import { NewAccountJwt } from "@/types/jwtTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function saveDetails(token: string, password: string) {
  let decoded: NewAccountJwt;
  try {
    decoded = jwt.verify(
      token ?? "",
      process.env.NEXTAUTH_SECRET as string
    ) as NewAccountJwt;
  } catch {
    return null;
  }

  if (password.length < 8) return null;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        auth: {
          create: {
            passwordHash: hashedPassword,
          },
        },
      },
    });

    return updatedUser;
  } catch (e) {
    return null;
  }
}
