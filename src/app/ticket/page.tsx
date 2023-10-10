import Header from "@/components/Header/Header";
import Ticket from "./Ticket";
// import Notification from "@/components/Notification/Notification";
import InfoNotification from "@/components/Notification/InfoNotification";

export const dynamic = "force-dynamic";

type Props = {};

export default async function Users({}: Props) {
  return (
    <div className="h-[100svh] overflow-hidden relative">
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
        <div className="mt-2 flex flex-col gap-2">
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
        </div>
      </div>

      <Ticket></Ticket>
    </div>
  );
}