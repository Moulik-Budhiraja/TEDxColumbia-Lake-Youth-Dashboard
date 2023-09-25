import { prisma } from "@/db";
import { getSessionUser } from "@/serverFunctions/user/getSessionUser";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import fs from "fs/promises";
import { redirect } from "next/navigation";

type Waiver = {
  params: {
    userId: string;
  };
};

export async function GET(request: Request, { params }: Waiver) {
  const requester = await getSessionUser();

  if (!requester) {
    return redirect("/login");
  }

  if (requester.id !== params.userId) {
    await requirePermission("admin");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: params.userId,
    },
    include: {
      rsvp: true,
    },
  });

  // Get file buffer
  if (!user?.rsvp?.waiverName) {
    return new Response("No waiver found", {
      status: 404,
    });
  }

  const file = await fs.readFile(process.cwd() + user?.rsvp?.waiverName);

  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
