"use server";

import { prisma } from "@/db";

export async function urlCopied(id: string) {
  await prisma.user.update({
    where: { id },
    data: { authGeneratations: { increment: 1 } },
  });
}
