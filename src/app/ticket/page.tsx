import Header from "@/components/Header/Header";
import Ticket from "./Ticket";
// import Notification from "@/components/Notification/Notification";
import InfoNotification from "@/components/Notification/InfoNotification";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {};

export default async function TicketPage({}: Props) {
  const user = await requirePermission("attendee");

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

  if (!userWithRsvp?.rsvp?.attending) {
    return redirect("/");
  }

  return (
    <div className="h-[100svh] relative">
      <Header
        title="Ticket"
        description="You'll need your ticket and a piece of ID to check in on event day."
      ></Header>

      <div className="px-4 lg:w-1/2 lg:absolute lg:right-0">
        <InfoNotification>
          We recommend you print or take a screenshot of your ticket to ensure
          you have it on event day.
        </InfoNotification>
      </div>

      <div className="p-4">
        <h2 className="font-bold text-2xl">Event Details</h2>
        <div className="mt-2 flex flex-col gap-2 overflow-y-scroll mb-52 md:mb-0">
          <div>
            <div className="font-bold">Location</div>
            <div>
              Centre for Environmental and Information Technology (EIT), <br />
              University of Waterloo
            </div>
          </div>
          <div>
            <div className="font-bold">Time</div>
            <div>
              October 14th, 2023 <br /> 10:00 a.m. - 5:30 p.m.
            </div>
          </div>
          <div>
            <div className="font-bold">Parking</div>
            <div className="md:max-w-xs">
              The recommended place to park is Lot X. It&apos;s about a 10
              minute walk to the venue, but it is free on weekends.
              <br />
              <br />
              Lot N is a little closer, but is a $5 pay and display lot, even on
              weekends. Lot M is $6.
            </div>
          </div>
        </div>
      </div>

      <Ticket user={user}></Ticket>
    </div>
  );
}
