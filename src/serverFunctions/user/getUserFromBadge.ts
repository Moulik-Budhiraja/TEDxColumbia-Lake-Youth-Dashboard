"use server";

import { prisma } from "@/db";
import { requirePermission } from "./requirePermission";
import { UserWithRole, UserWithRsvp } from "@/types/morePrismaTypes";

type returnType = {
  success: boolean;
} & (
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      error: null;
      user: UserWithRsvp;
    }
);

export async function getUserFromBadge(badgeUrl: string): Promise<returnType> {
  await requirePermission("admin");

  const badgeId = badgeUrl.split("/").pop();

  if (badgeUrl.split("/").length <= 1) {
    return {
      success: false,
      error: "Invalid badge QR",
    };
  }

  if (!badgeId) {
    return {
      success: false,
      error: "Invalid badge QR",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      qr: badgeId,
    },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
      rsvp: true,
    },
  });

  if (!user) {
    return {
      success: false,
      error: "No user found with that badge",
    };
  }

  return {
    success: true,
    error: null,
    user: user,
  };
}
