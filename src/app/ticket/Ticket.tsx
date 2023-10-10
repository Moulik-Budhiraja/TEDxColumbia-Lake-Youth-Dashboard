import { requirePermission } from "@/serverFunctions/user/requirePermission";
import "./ticket.css";
import Image from "next/image";
import QRCode from "qrcode";

type Props = {
  className?: string;
};

export default async function Ticket({ className }: Props) {
  const user = await requirePermission("attendee");

  const qr = await QRCode.toDataURL(user.id, {
    errorCorrectionLevel: "M",
    type: "image/png",
    scale: 30,
  });

  return (
    <>
      {" "}
      <div
        className={`${className} fill-white w-11/12 max-w-xs absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 drop-shadow-2xl brightness-100 dark:brightness-90 hocus:brightness-100 hocus:-translate-y-1/3 md:hocus:translate-y-1/2 md:hocus:bottom-1/2 transition-all duration-500 ease-in-out peer/ticket z-10`}
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 601 801"
          className="w-full h-full"
        >
          <g>
            <path
              d="M368 .5a70.66 70.66 0 0 1-67.5 49.63A70.66 70.66 0 0 1 233.05.5H.5v800h600V.5Z"
              style={{
                strokeMiterlimit: 10,
              }}
            />
          </g>
        </svg>
        <div className="absolute top-3 left-4 w-[32%] z-20 text-tedx-red font-bold text-sm">
          {
            {
              attendee: "ATTENDEE",
              admin: "ORGANIZER",
              speaker: "SPEAKER",
            }[user.role.name]
          }
        </div>
        <div className="absolute top-2 right-3 z-20 text-tedx-blue text-[0.5rem] font-semibold">
          DATE
        </div>
        <div className="absolute top-4 right-3 z-20 text-tedx-red text-sm">
          Oct 14
        </div>
        <div className="absolute left-0 top-12 w-full h-56">
          <Image
            src={"/images/ticket-banner.png"}
            alt="Ticket Banner"
            width={2500}
            height={1041}
          ></Image>
          <div className="px-3 py-2 flex flex-col gap-2">
            <div>
              <div className="text-tedx-blue text-[0.5rem] font-semibold">
                NAME
              </div>
              <div className="text-tedx-red text-md -mt-1">
                {`${user.firstName} ${user.lastName}`}
              </div>
            </div>
            <div>
              <div className="text-tedx-blue text-[0.5rem] font-semibold">
                EMAIL
              </div>
              <div className="text-tedx-red text-md -mt-1">{user.email}</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 max-w-[40%] ">
          <img src={qr} />
        </div>
      </div>
      <div className="fixed left-0 top-0 w-full h-full pointer-events-none peer-focus/ticket:backdrop-blur-md peer-hover/ticket:backdrop-blur-md transition-all duration-500 ease-in-out"></div>
    </>
  );
}
