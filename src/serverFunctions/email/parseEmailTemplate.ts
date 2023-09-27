"use server";

import { prisma } from "@/db";
import { requirePermission } from "../user/requirePermission";
import { UserWithRole } from "@/types/morePrismaTypes";
import jwt from "jsonwebtoken";

const getSetupURL = (user: UserWithRole) => {
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role.name,
      iat: Date.now(),
    },
    process.env.NEXTAUTH_SECRET as string
  );

  return `${process.env.NEXTAUTH_URL}/auth/setup-account?token=${token}`;
};

export async function parseEmailTemplate(userId: string) {
  await requirePermission("admin");

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      role: {
        include: {
          permissions: true,
          emailTemplate: true,
        },
      },
    },
  });

  let subject = user?.role?.emailTemplate?.subject;

  if (subject) {
    subject = subject.replace(/\[firstName\]/g, user?.firstName ?? "");
    subject = subject.replace(/\[lastName\]/g, user?.lastName ?? "");
  }

  let body = user?.role?.emailTemplate?.body;

  if (body) {
    body = body.replace(/\[firstName\]/g, user?.firstName ?? "");
    body = body.replace(/\[lastName\]/g, user?.lastName ?? "");
    body = body.replace(/\[link\]/g, getSetupURL(user as UserWithRole) ?? "");
  }

  return {
    subject,
    body,
  };
}
