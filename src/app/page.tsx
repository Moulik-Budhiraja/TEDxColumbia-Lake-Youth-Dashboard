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

  const userProfile = await prisma.profile.findUnique({
    where: {
      userId: user?.id ?? "",
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
    <div className="mb-16 md:mb-0 md:flex 2xl:mx-auto 2xl:w-[60rem] 2xl:flex-col">
      <ProfileHeader user={user} profile={userProfile}></ProfileHeader>
      <div className="flex flex-col gap-4 p-4 md:w-1/2 2xl:w-full md:h-screen md:overflow-y-scroll 2xl:h-auto 2xl:overflow-y-visible transition-all duration-300 ease-out">
        <Notification show={!userWithRsvp?.rsvp}>
          Please{" "}
          <a href="#actions" className="underline">
            RSVP
          </a>{" "}
          by Oct 5th to secure your spot at{" "}
          <span className="font-black">
            TED
            <sup>X</sup>
          </span>{" "}
          Columbia Lake Youth
        </Notification>
        {userProfile && (
          <div className="md:flex md:flex-col md:justify-center 2xl:w-full 2xl:flex-row 2xl:justify-between 2xl:gap-8">
            <div className="2xl:w-full">
              <h2 className="font-bold">About Me</h2>
              <div className="pl-2 flex flex-col gap-2">
                {userProfile.aboutMe?.split("\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            {((userProfile.link1Name && userProfile.link1Url) ||
              (userProfile.link2Name && userProfile.link2Url)) && (
              <div className="2xl:w-full">
                <h2 className="font-bold mt-4 2xl:mt-0">Other Links</h2>
                <div className="pl-2">
                  <ul className="flex flex-col gap-1">
                    {userProfile.link1Name && userProfile.link1Url && (
                      <StyledLink
                        href={userProfile.link1Url}
                        target="_blank"
                        className="text-sky-600 underline hover:text-sky-400 transition-all duration-200 ease-out"
                      >
                        <li>{userProfile.link1Name}</li>
                      </StyledLink>
                    )}
                    {userProfile.link2Name && userProfile.link2Url && (
                      <StyledLink
                        href={userProfile.link2Url}
                        target="_blank"
                        className="text-sky-600 underline hover:text-sky-400 transition-all duration-200 ease-out"
                      >
                        <li>{userProfile.link2Name}</li>
                      </StyledLink>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
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
