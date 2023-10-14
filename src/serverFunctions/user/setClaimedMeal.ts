"use server";

import { prisma } from "@/db";
import { requirePermission } from "./requirePermission";

export async function setClaimedMeal(userId: string, claimed: boolean) {
  await requirePermission("admin");

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      claimedMeal: claimed,
    },
  });
}
