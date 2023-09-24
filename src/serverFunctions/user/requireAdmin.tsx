import { redirect } from "next/navigation";
import { getSessionUser } from "./getSessionUser";

export async function requireAdmin() {
  const user = await getSessionUser();
  if (user?.role.permissions.admin) {
    redirect("/auth/login");
  }

  return user;
}
