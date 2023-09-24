"use server";

import { prisma } from "@/db";
import { getServerSession } from "next-auth";

export async function getSessionUser() {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

  return user;
}
