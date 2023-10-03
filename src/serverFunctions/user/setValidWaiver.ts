"use server";

import { prisma } from "@/db";
import { requirePermission } from "@/serverFunctions/user/requirePermission";

export async function setValidWaiver(userId: string, valid: boolean) {
  if (valid) {
    await requirePermission("admin");
  } else {
    await requirePermission("attendee");
  }

  await prisma.rsvp.update({
    where: {
      userId: userId,
    },
    data: {
      waiverValidated: valid,
    },
  });

  return {
    valid: valid,
  };
}
