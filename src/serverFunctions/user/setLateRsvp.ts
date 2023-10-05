"use server";

import { prisma } from "@/db";
import { requirePermission } from "@/serverFunctions/user/requirePermission";

export async function setLateRsvp(userId: string, late: boolean) {
  await requirePermission("admin");

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      allowLateRsvp: late,
    },
  });

  return {
    late: late,
  };
}
