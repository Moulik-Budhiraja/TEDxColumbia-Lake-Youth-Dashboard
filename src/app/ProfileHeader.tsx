"use client";

import IconEdit from "@/components/Icons/IconEdit";
import IconInstagram from "@/components/Icons/IconInstagram";
import IconLinkedin from "@/components/Icons/IconLinkedin";
import IconShare from "@/components/Icons/IconShare";
import IconTwitter from "@/components/Icons/IconTwitter";
import { UserWithRole } from "@/types/morePrismaTypes";
import { Profile } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

type Props = {
  user: UserWithRole;
  profile: Profile | null;
  editable?: boolean;
};

export default function ProfileHeader({
  user,
  profile,
  editable = true,
}: Props) {
  const [showCopied, setShowCopied] = useState(false);

  const baseColor =
    (user.role.name === "admin" && "blue") ||
    (user.role.name === "speaker" && "red") ||
    (user.role.name === "attendee" && "teal");

  return (
    <div
      className={`flex flex-col justify-start relative items-center gap-4 h-fit pt-12 drop-shadow-xl md:h-screen md:w-1/2 md:justify-center 2xl:w-full 2xl:h-80 ${
        baseColor === "blue" && "bg-blue-300"
      } ${baseColor === "red" && "bg-red-300"} ${
        baseColor === "teal" && "bg-teal-300"
      }`}
    >
      <div
        className={`w-[min(50vh,75%)] aspect-square rounded-full drop-shadow-lg flex items-center justify-center text-8xl 2xl:absolute 2xl:w-60 2xl:top-1/2 left-12 2xl:-translate-y-1/2 ${
          baseColor === "blue" && "bg-blue-500 text-blue-950 shadow-blue-950"
        } ${baseColor === "red" && "bg-red-500 text-red-950 shadow-red-950"} ${
          baseColor === "teal" && "bg-teal-500 text-teal-950 shadow-teal-950"
        }`}
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
            href={profile.instagramHandle}
            target="_blank"
          >
            <IconInstagram
              className={`w-10 h-10 stroke-none ${
                baseColor === "blue" && "fill-blue-500"
              } ${baseColor === "red" && "fill-red-500"} ${
                baseColor === "teal" && "fill-teal-500"
              }`}
            />
          </Link>
        )}
        {profile?.linkedInHandle && (
          <Link
            className={`opacity-50 cursor-pointer hocus:opacity-100 transition-all duration-300 ease-out`}
            href={profile?.linkedInHandle}
            target="_blank"
          >
            <IconLinkedin
              className={`w-10 h-10 stroke-none ${
                baseColor === "blue" && "fill-blue-500"
              } ${baseColor === "red" && "fill-red-500"} ${
                baseColor === "teal" && "fill-teal-500"
              }`}
            />
          </Link>
        )}
        {profile?.twitterHandle && (
          <Link
            className={`opacity-50 cursor-pointer hocus:opacity-100 transition-all duration-300 ease-out`}
            href={profile?.twitterHandle}
            target="_blank"
          >
            <IconTwitter
              className={`w-10 h-10 stroke-none ${
                baseColor === "blue" && "fill-blue-500"
              } ${baseColor === "red" && "fill-red-500"} ${
                baseColor === "teal" && "fill-teal-500"
              }`}
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
      <div
        className={`opacity-60 cursor-pointer hocus:opacity-100 transition-all duration-300 ease-out absolute top-4 left-4`}
        tabIndex={0}
        onClick={async () => {
          try {
            await navigator.share({
              title: `${user.firstName} ${user.lastName}'s Profile | TEDxColumbia Lake Youth`,
              url: `${
                window.location.origin
              }/profile/${user.firstName.toLowerCase()}-${user.lastName
                .toLowerCase()
                .replace(/ /g, "-")}`,
            });
          } catch (err) {
            // Copy to clipboard fallback
            await navigator.clipboard.writeText(
              `${
                window.location.origin
              }/profile/${user.firstName.toLowerCase()}-${user.lastName
                .toLowerCase()
                .replace(/ /g, "-")}`
            );

            setShowCopied(true);

            setTimeout(() => {
              setShowCopied(false);
            }, 2000);
          }
        }}
      >
        <IconShare
          className={`w-8 h-8 stroke-none ${
            baseColor === "blue" && "fill-blue-600"
          } ${baseColor === "red" && "fill-red-600"} ${
            baseColor === "teal" && "fill-teal-600"
          }`}
        ></IconShare>
        <div
          className={`absolute top-0 left-12 py-1 px-2 w-28 text-center rounded-md ${
            baseColor === "blue" &&
            "bg-blue-500 text-blue-950 before:bg-blue-500"
          } ${
            baseColor === "red" && "bg-red-500 text-red-950 before:bg-red-500"
          } ${
            baseColor === "teal" &&
            "bg-teal-500 text-teal-950 before:bg-teal-500"
          } before:conetnt-[''] before:w-2 before:h-2 before:rotate-45 before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 transition-all duration-300 ease-out ${
            showCopied ? "opacity-100" : "opacity-0"
          }`}
        >
          Copied Link!
        </div>
      </div>

      {editable && (
        <Link href={`/profile/edit`}>
          <div
            className={`opacity-60 cursor-pointer hocus:opacity-100 transition-all duration-300 ease-out absolute top-4 right-4`}
          >
            <IconEdit
              className={`w-8 h-8 stroke-none ${
                baseColor === "blue" && "fill-blue-600"
              } ${baseColor === "red" && "fill-red-600"} ${
                baseColor === "teal" && "fill-teal-600"
              }`}
            ></IconEdit>
          </div>
        </Link>
      )}
    </div>
  );
}
