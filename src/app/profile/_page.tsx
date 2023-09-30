"use server";

import IconGithub from "@/components/Icons/IconGithub";
import IconInstagram from "@/components/Icons/IconInstagram";
import IconLinkedin from "@/components/Icons/IconLinkedin";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import Link from "next/link";

export default async function Profile() {
  const user = await requirePermission("scanQr");

  return (
    <div className="md:flex 2xl:mx-auto 2xl:w-[60rem] 2xl:flex-col">
      <div className="flex flex-col justify-start items-center gap-4 h-fit bg-blue-300 pt-12 drop-shadow-xl md:h-screen md:w-1/2 md:justify-center 2xl:w-full 2xl:h-80">
        <div className="w-[min(50vh,75%)] aspect-square bg-blue-500 rounded-full drop-shadow-lg shadow-blue-950 flex items-center justify-center text-8xl text-blue-950 2xl:absolute 2xl:w-60 2xl:top-1/2 left-12 2xl:-translate-y-1/2">
          {user?.firstName?.at(0)?.toUpperCase()}
          {user?.lastName?.at(0)?.toUpperCase()}
        </div>
        <div className="flex gap-4 mt-4 2xl:absolute 2xl:bottom-6 2xl:right-8 2xl:mt-0">
          <Link
            className="opacity-50 cursor-pointer hocus:opacity-100 transition-all duration-300 ease-out"
            href={"#"}
          >
            <IconInstagram className="w-10 h-10 fill-blue-500 stroke-none" />
          </Link>
          <Link
            className="opacity-50 cursor-pointer hocus:opacity-100 transition-all duration-300 ease-out"
            href={"#"}
          >
            <IconLinkedin className="w-10 h-10 fill-blue-500 stroke-none" />
          </Link>
          <Link
            className="opacity-50 cursor-pointer hocus:opacity-100 transition-all duration-300 ease-out"
            href={"#"}
          >
            <IconGithub className="w-10 h-10 fill-blue-500 stroke-none" />
          </Link>
        </div>
        <div className="w-full p-2 mt-auto text-blue-950 text-center md:mt-4 2xl:text-right 2xl:pr-8">
          <div className="text-3xl 2xl:text-6xl">{`${user.firstName} ${user.lastName}`}</div>
          <div className="text-xl 2xl:text-4xl">
            {user.role.name?.at(0)?.toUpperCase() +
              user.role.name?.substring(1)}
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/2 md:flex md:flex-col md:justify-center 2xl:w-full 2xl:flex-row 2xl:justify-between 2xl:gap-8">
        <div className="2xl:w-full">
          <h2 className="font-bold">About Me</h2>
          <div className="pl-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae sint
            ullam vel expedita voluptate nam non modi est aliquid excepturi
            dolor dolorum vero placeat, odit blanditiis aliquam ea voluptatibus
            sapiente itaque in harum. Debitis provident dolores eaque omnis
            repudiandae, fugiat rem ipsa explicabo voluptatem. Aspernatur
            quaerat eveniet doloribus doloremque nulla?
          </div>
        </div>
        <div className="2xl:w-full">
          <h2 className="font-bold mt-4 2xl:mt-0">Other Links</h2>
          <div className="pl-2">
            <ul className="flex flex-col gap-1">
              <Link
                href={"#"}
                className="text-sky-600 underline hover:text-sky-400 transition-all duration-200 ease-out"
              >
                <li>Personal Website</li>
              </Link>
              <Link
                href={"#"}
                className="text-sky-600 underline hover:text-sky-400 transition-all duration-200 ease-out"
              >
                <li>Twitter</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
