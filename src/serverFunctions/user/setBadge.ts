"use server";

import { prisma } from "@/db";
import { requirePermission } from "./requirePermission";

export async function setBadge(badgeUrl: string | null, userId: string) {
  await requirePermission("admin");

  if (badgeUrl === null) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        qr: null,
      },
    });

    return {
      success: true,
      error: null,
    };
  }

  const badgeId = badgeUrl.split("/").pop();

  if (badgeUrl.split("/").length <= 1) {
    return {
      success: false,
      error: "Invalid badge QR",
    };
  }

  if (!badgeId) {
    throw new Error("Invalid badge URL");
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        qr: badgeId,
      },
    });
  } catch (e) {
    return {
      success: false,
      error:
        "An error occurred while updating the user. An incorrect QR code may have been scanned or the badge may already be assigned to another user.",
    };
  }

  return {
    success: true,
    error: null,
  };
}
