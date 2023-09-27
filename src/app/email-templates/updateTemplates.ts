"use server";

import { prisma } from "@/db";
import { requirePermission } from "@/serverFunctions/user/requirePermission";

export async function updateTemplate(data: FormData) {
  await requirePermission("admin");

  const role = data.get("role") as string;
  const subject = data.get("subject") as string;
  const body = data.get("body") as string;

  if (!role || !subject || !body) {
    throw new Error("Missing fields");
  }

  const dbRole = await prisma.role.findUnique({
    where: {
      name: role,
    },
  });

  const template = await prisma.emailTemplate.update({
    where: {
      roleId: dbRole?.id,
    },
    data: {
      subject,
      body,
    },
  });
}
