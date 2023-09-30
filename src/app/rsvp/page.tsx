import Header from "@/components/Header/Header";
import { getSessionUser } from "@/serverFunctions/user/getSessionUser";
import RsvpForm from "./RsvpForm";
import { prisma } from "@/db";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import { notFound } from "next/navigation";

export default async function Home() {
  const user = await requirePermission("scanQr");

  const userWithRsvp = await prisma.user.findUnique({
    where: {
      id: user?.id ?? "",
    },
    include: {
      rsvp: true,
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

  if (!userWithRsvp) {
    return notFound();
  }

  return (
    <div className="h-screen w-full">
      <Header
        title="RSVP"
        description="Please fill out this form to let us know you'll be there"
      ></Header>
      <RsvpForm user={userWithRsvp}></RsvpForm>
    </div>
  );
}
