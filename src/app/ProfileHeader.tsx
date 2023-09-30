import IconEdit from "@/components/Icons/IconEdit";
import IconInstagram from "@/components/Icons/IconInstagram";
import IconLinkedin from "@/components/Icons/IconLinkedin";
import IconTwitter from "@/components/Icons/IconTwitter";
import { UserWithRole } from "@/types/morePrismaTypes";
import { Profile } from "@prisma/client";
import Link from "next/link";

type Props = {
  user: UserWithRole;
  profile: Profile | null;
};

export default function ProfileHeader({ user, profile }: Props) {
  const baseColor =
    (user.role.name === "admin" && "blue") ||
    (user.role.name === "speaker" && "red") ||
    (user.role.name === "attendee" && "teal");

  return (
    <div
      className={`flex flex-col justify-start items-center gap-4 h-fit bg-${baseColor}-300 pt-12 drop-shadow-xl md:h-screen md:w-1/2 md:justify-center 2xl:w-full 2xl:h-80 `}
    >
      <div
        className={`w-[min(50vh,75%)] aspect-square bg-${baseColor}-500 rounded-full drop-shadow-lg shadow-${baseColor}-950 flex items-center justify-center text-8xl text-${baseColor}-950 2xl:absolute 2xl:w-60 2xl:top-1/2 left-12 2xl:-translate-y-1/2`}
      >
        {user?.firstName?.at(0)?.toUpperCase()}
        {user?.lastName?.at(0)?.toUpperCase()}
      </div>
      <div
        className={`flex gap-4 mt-4 2xl:absolute 2xl:bottom-6 2xl:right-8 2xl:mt-0`}
      >
        {profile?.instagramHandle && (
          <Link
            className={`opacity-50 cursor-pointer hocus:opacity-100 transition-all duration-300 ease-out`}
            href={`https://www.instagram.com/${profile.instagramHandle}`}
            target="_blank"
          >
            <IconInstagram
              className={`w-10 h-10 fill-${baseColor}-500 stroke-none`}
            />
          </Link>
        )}
        {profile?.linkedInHandle && (
          <Link
            className={`opacity-50 cursor-pointer hocus:opacity-100 transition-all duration-300 ease-out`}
            href={`https://www.linkedin.com/in/${profile?.linkedInHandle}`}
            target="_blank"
          >
            <IconLinkedin
              className={`w-10 h-10 fill-${baseColor}-500 stroke-none`}
            />
          </Link>
        )}
        {profile?.twitterHandle && (
          <Link
            className={`opacity-50 cursor-pointer hocus:opacity-100 transition-all duration-300 ease-out`}
            href={`https://twitter.com/${profile?.twitterHandle}`}
            target="_blank"
          >
            <IconTwitter
              className={`w-10 h-10 fill-${baseColor}-500 stroke-none`}
            />
          </Link>
        )}
      </div>
      <div
        className={`w-full p-2 mt-auto text-${baseColor}-950 text-center md:mt-4 2xl:text-right 2xl:pr-8`}
      >
        <div
          className={`text-3xl 2xl:text-6xl`}
        >{`${user.firstName} ${user.lastName}`}</div>
        <div className={`text-xl 2xl:text-4xl`}>
          {user.role.name?.at(0)?.toUpperCase() + user.role.name?.substring(1)}
        </div>
      </div>
      <Link href={`/profile/edit`}>
        <div
          className={`opacity-50 cursor-pointer hocus:opacity-100 transition-all duration-300 ease-out absolute top-4 right-4`}
        >
          <IconEdit
            className={`w-8 h-8 fill-${baseColor}-500 stroke-none`}
          ></IconEdit>
        </div>
      </Link>
    </div>
  );
}
