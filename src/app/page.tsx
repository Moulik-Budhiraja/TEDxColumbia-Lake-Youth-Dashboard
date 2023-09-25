import Header from "@/components/Header/Header";
import { getSessionUser } from "@/serverFunctions/user/getSessionUser";
import Rsvp from "./Rsvp";
import { prisma } from "@/db";
import Link from "next/link";

export default async function Home() {
  const user = await getSessionUser();
  console.log(!!user);

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

  return (
    <div className="h-screen w-full">
      <Header title="Home"></Header>
      {userWithRsvp ? (
        <Rsvp user={userWithRsvp}></Rsvp>
      ) : (
        <div className="p-4">
          Looks like you&apos;re not logged in.{" "}
          <Link
            href={"/auth/login"}
            className="text-sky-600 underline hocus:text-sky-400 transition-all duration-300 ease-out"
          >
            Login
          </Link>{" "}
          to access your dashboard.
        </div>
      )}
    </div>
  );
}
