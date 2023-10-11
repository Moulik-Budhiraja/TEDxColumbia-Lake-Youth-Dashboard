import ProfileHeader from "@/app/ProfileHeader";
import StyledLink from "@/components/StyledLink/StyledLink";
import { prisma } from "@/db";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import { notFound } from "next/navigation";
import Notification from "@/components/Notification/Notification";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserProfile({ params }: Props) {
  const requestUser = await requirePermission("attendee");

  const name = params.username.replace(/-/g, " ");

  const fullName = await prisma.$queryRaw<
    { firstName: string; lastName: string }[]
  >`SELECT firstName, lastName FROM User WHERE CONCAT_WS(" ", firstName, lastName) = ${name}`;

  if (fullName.length === 0) {
    return notFound();
  }

  const user = await prisma.user.findFirst({
    where: {
      firstName: fullName[0].firstName,
      lastName: fullName[0].lastName,
    },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

  

  const userAuth = await prisma.auth.findUnique({
    where: {
      userId: user?.id ?? "",
    },
  });

  const userProfile = await prisma.profile.findUnique({
    where: {
      userId: user?.id ?? "",
    },
  });

  if (!user || !userAuth) {
    return notFound();
  }

  return (
    <div className="mb-16 md:mb-0 md:flex 2xl:mx-auto 2xl:w-[60rem] 2xl:flex-col">
      <ProfileHeader
        user={user}
        profile={userProfile}
        editable={false}
      ></ProfileHeader>
      <div className="flex flex-col gap-4 p-4 md:w-1/2 2xl:w-full md:h-screen md:overflow-y-scroll 2xl:h-auto 2xl:overflow-y-visible transition-all duration-300 ease-out">
        {user.id === requestUser.id && (
          <Notification>
            This is your public profile. You can share this link with other
            attendees to show them your profile. To edit your profile, do so
            from the{" "}
            <a href="/" className="underline">
              home page
            </a>
            .
          </Notification>
        )}

        {userProfile && (
          <div className="md:flex md:flex-col md:justify-center 2xl:w-full 2xl:flex-row 2xl:justify-between 2xl:gap-8">
            {userProfile.aboutMe && (
              <div className="2xl:w-full">
                <h2 className="font-bold">About Me</h2>
                <div className="pl-2 flex flex-col gap-2">
                  {userProfile.aboutMe?.split("\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
            {userProfile.talkDescription && userProfile.talkTitle && (
              <div className="2xl:w-full mt-4">
                <h2 className="font-bold">{userProfile.talkTitle}</h2>
                <div className="pl-2 flex flex-col gap-2">
                  {userProfile.talkDescription?.split("\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
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
      </div>
    </div>
  );
}
