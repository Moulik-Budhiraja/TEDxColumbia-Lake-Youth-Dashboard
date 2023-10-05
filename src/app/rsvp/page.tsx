import Header from "@/components/Header/Header";
import { getSessionUser } from "@/serverFunctions/user/getSessionUser";
import RsvpForm from "./RsvpForm";
import { prisma } from "@/db";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import { notFound, redirect } from "next/navigation";
import { RSVPDeadline } from "@/constants/eventDates";

export default async function Home() {
  const user = await requirePermission("scanQr");

  let allowedToRsvp = false;

  if (user?.allowLateRsvp) {
    allowedToRsvp = true;
  }

  if (new Date() < RSVPDeadline) {
    allowedToRsvp = true;
  }

  if (!allowedToRsvp) {
    return redirect("/");
  }

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
    <div className="w-full">
      <Header
        title="RSVP"
        description="Please fill out this form to let us know you'll be there"
      ></Header>
      <RsvpForm user={userWithRsvp}></RsvpForm>
    </div>
  );
}
