"use server";

import { prisma } from "@/db";
import { Prisma, User } from "@prisma/client";
import { requirePermission } from "./requirePermission";

type GetUserOptions = {
  include_auth?: boolean;
  include_rsvp?: boolean;
} & (
  | {
      by: "email";
      email: string;
    }
  | {
      by: "id";
      id: string;
    }
);

async function getUser(options: GetUserOptions) {
  if (options.include_auth) {
    await requirePermission("admin");
  }

  if (options.by === "email") {
    return await prisma.user.findUnique({
      where: {
        email: options.email,
      },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
        auth: options.include_auth,
        rsvp: options.include_rsvp,
      },
    });
  } else {
    return await prisma.user.findUnique({
      where: {
        id: options.id,
      },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
        auth: options.include_auth,
        rsvp: options.include_rsvp,
      },
    });
  }
}

export { getUser };
