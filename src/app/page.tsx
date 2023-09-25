import Header from "@/components/Header/Header";
import { getSessionUser } from "@/serverFunctions/user/getSessionUser";
import Rsvp from "./Rsvp";
import { prisma } from "@/db";

export default async function Home() {
  const user = await getSessionUser();
  console.log(!!user);

  const userWithRsvp = await prisma.user.findUnique({
    where: {
      id: user?.id,
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

  return (
    <div className="h-screen w-full">
      <Header title="Home"></Header>
      {userWithRsvp && <Rsvp user={userWithRsvp}></Rsvp>}
    </div>
  );
}
