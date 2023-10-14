import Header from "@/components/Header/Header";
import { prisma } from "@/db";
import { requirePermission } from "@/serverFunctions/user/requirePermission";

export default async function Networking() {
  const user = await requirePermission("attendee");

  const scanned = await prisma.scans.findMany({
    where: {
      scannerId: user.id,
    },
  });

  const scannedBy = await prisma.scans.findMany({
    where: {
      scannedId: user.id,
    },
  });

  const scannedSpeakers = await prisma.scans.findMany({
    where: {
      scannerId: user.id,
      scanned: {
        role: {
          name: "speaker",
        },
      },
    },
  });

  // Get all scans

  const allUsers = await prisma.user.findMany({
    include: {
      role: true,
    },
  });
  const allScans = await prisma.scans.findMany();

  const allSpeakerIds = allUsers
    .filter((user) => user.role.name === "speaker")
    .map((user) => user.id);

  const allPoints = allUsers
    .map((user) => {
      const scanned = allScans.filter((scan) => scan.scannerId === user.id);

      const scannedSpeakers = scanned.filter((scan) =>
        allSpeakerIds.includes(scan.scannedId)
      );

      const points =
        scanned.length - scannedSpeakers.length + scannedSpeakers.length * 2;

      return {
        ...user,
        points,
      };
    })
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);

  const points =
    scanned.length - scannedSpeakers.length + scannedSpeakers.length * 2;

  const scannedUsers = allUsers.filter((user) =>
    scanned.map((scan) => scan.scannedId).includes(user.id)
  );
  const scannedByUsers = allUsers.filter((user) =>
    scannedBy.map((scan) => scan.scannerId).includes(user.id)
  );

  return (
    <div className="h-screen">
      <Header
        title="Networking"
        description="Compete to be the best networker. (Yes thats a word now)"
      ></Header>
      <div className="flex p-4 mt-4">
        <div className="px-2 border-r-2 border-r-slate-500">
          <div className="text-xs">YOU SCANNED</div>
          <div className="text-4xl">{scanned.length}</div>
        </div>
        <div className="px-2 border-r-2 border-r-slate-500">
          <div className="text-xs">SCANNED YOU</div>
          <div className="text-4xl">{scannedBy.length}</div>
        </div>
        <div className="px-2">
          <div className="text-xs">TOTAL POINTS</div>
          <div className="text-4xl">{points}</div>
        </div>
      </div>
      <div className="font-bold ml-2">Leaderboard</div>
      <div className="border-t-2 border-slate-500">
        {allPoints.map((user) => (
          <div
            className="border-b-2 border-slate-300 dark:border-slate-500 flex gap-2 items-center"
            key={user.id}
          >
            <div
              className={`flex items-center justify-center p-2 m-2 rounded-full w-10 h-10 ${
                user.role.name === "admin" && "text-blue-950 bg-blue-400"
              } ${user.role.name === "speaker" && "text-red-950 bg-red-400"} ${
                user.role.name === "attendee" && "text-teal-950 bg-teal-400"
              }`}
            >
              {`${user.firstName?.at(0)?.toUpperCase()}${user.lastName
                ?.at(0)
                ?.toUpperCase()}`}
            </div>
            <div className="m-2">
              <div className="font-bold">
                {user.firstName + " " + user.lastName}
              </div>
              <div className="text-sm text-slate-500 -mt-1">
                {user.role.name.at(0)?.toUpperCase() + user.role.name.slice(1)}
              </div>
            </div>
            <div className="ml-auto pr-4">{user.points}</div>
          </div>
        ))}
      </div>
      {/* <div className="font-bold ml-2 mt-4">Your Scans</div> */}
      {/* <div className="border-2 border-slate-500 rounded">
        {scannedUsers.map((user) => (
          <div className="border-b-2 border-slate-500 flex gap-2 items-center">
            <div
              className={`flex items-center justify-center p-2 m-2 rounded-full w-10 h-10 ${
                user.role.name === "admin" && "text-blue-950 bg-blue-400"
              } ${user.role.name === "speaker" && "text-red-950 bg-red-400"} ${
                user.role.name === "attendee" && "text-teal-950 bg-teal-400"
              }`}
            >
              {`${user.firstName?.at(0)?.toUpperCase()}${user.lastName
                ?.at(0)
                ?.toUpperCase()}`}
            </div>
            <div className="m-2">
              <div className="font-bold">
                {user.firstName + " " + user.lastName}
              </div>
              <div className="text-sm text-slate-500 -mt-1">
                {user.role.name.at(0)?.toUpperCase() + user.role.name.slice(1)}
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
