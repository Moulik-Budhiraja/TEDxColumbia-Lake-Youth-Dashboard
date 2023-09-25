"use server";

import { redirect } from "next/navigation";
import { getSessionUser } from "./getSessionUser";
import { Prisma } from "@prisma/client";

type validPermissions = keyof Omit<
  Prisma.PermissionsGetPayload<{}>,
  "id" | "createdAt" | "updatedAt"
>;

export async function requirePermission(
  permission: validPermissions,
  redirectPath: string = "/auth/login"
) {
  const user = await getSessionUser();

  if (!user?.role.permissions[permission]) {
    redirect(redirectPath);
  }

  return user;
}
