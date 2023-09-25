"use server";

import { prisma } from "@/db";
import { Prisma, User } from "@prisma/client";

type GetUserOptions = {
  include_auth: boolean;
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
      },
    });
  }
}

export { getUser };
