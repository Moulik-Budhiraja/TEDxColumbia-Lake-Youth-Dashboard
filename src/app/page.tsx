import Header from "@/components/Header/Header";
import { getSessionUser } from "@/serverFunctions/user/getSessionUser";
import Rsvp from "./Rsvp";
import { prisma } from "@/db";
import Notification from "@/components/Notification/Notification";
import StyledLink from "@/components/StyledLink/StyledLink";
import ProfileHeader from "./ProfileHeader";

export default async function Home() {
  const user = await getSessionUser();

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

  if (!user) {
    return (
      <div className="h-screen w-full">
        <Header title="Home"></Header>
        <div className="p-4">
          Looks like you&apos;re not logged in.{" "}
          <StyledLink
            href={"/auth/login"}
            className="text-sky-600 underline hocus:text-sky-400 transition-all duration-300 ease-out"
          >
            Login
          </StyledLink>{" "}
          to access your dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 md:mb-0 md:flex 2xl:mx-auto 2xl:w-[60rem] 2xl:flex-col">
      <ProfileHeader user={user}></ProfileHeader>
      <div className="flex flex-col gap-4 p-4 md:w-1/2 2xl:w-full md:h-screen md:overflow-y-scroll 2xl:h-auto 2xl:overflow-y-visible transition-all duration-300 ease-out">
        <Notification>
          Please complete your{" "}
          <a href="#actions" className="underline">
            RSVP
          </a>{" "}
          by Oct 4th to secure your spot at{" "}
          <span className="font-bold">
            TED
            <sup>X</sup>
          </span>{" "}
          Columbia Lake Youth
        </Notification>
        <div className="md:flex md:flex-col md:justify-center 2xl:w-full 2xl:flex-row 2xl:justify-between 2xl:gap-8">
          <div className="2xl:w-full">
            <h2 className="font-bold">About Me</h2>
            <div className="pl-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
              sint ullam vel expedita voluptate nam non modi est aliquid
              excepturi dolor dolorum vero placeat, odit blanditiis aliquam ea
              voluptatibus sapiente itaque in harum. Debitis provident dolores
              eaque omnis repudiandae, fugiat rem ipsa explicabo voluptatem.
              Aspernatur quaerat eveniet doloribus doloremque nulla?
            </div>
          </div>
          <div className="2xl:w-full">
            <h2 className="font-bold mt-4 2xl:mt-0">Other Links</h2>
            <div className="pl-2">
              <ul className="flex flex-col gap-1">
                <StyledLink
                  href={"#"}
                  className="text-sky-600 underline hover:text-sky-400 transition-all duration-200 ease-out"
                >
                  <li>Personal Website</li>
                </StyledLink>
                <StyledLink
                  href={"#"}
                  className="text-sky-600 underline hover:text-sky-400 transition-all duration-200 ease-out"
                >
                  <li>Twitter</li>
                </StyledLink>
              </ul>
            </div>
          </div>
        </div>
        <div className="md:flex md:flex-col md:justify-center 2xl:w-full 2xl:flex-row 2xl:justify-between 2xl:gap-8">
          <div>
            <h2 className="font-bold" id="actions">
              Actions
            </h2>
            {userWithRsvp && <Rsvp user={userWithRsvp}></Rsvp>}
          </div>
        </div>
      </div>
    </div>
  );
}
