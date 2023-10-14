"use client";

import IconHamburger from "@/components/Icons/IconHamburger";
import IconHome from "@/components/Icons/IconHome";
import IconNetworking from "@/components/Icons/IconNetworking";
import { useVisibility } from "@/hooks/useVisibility/useVisibility";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import IconQrcode from "@/components/Icons/IconQrcode";
import { useUser } from "@/hooks/useUser/useUser";
import IconLogin from "@/components/Icons/IconLogin";
import { signOut } from "next-auth/react";
import IconKey from "@/components/Icons/IconKey";
import IconMail from "@/components/Icons/IconMail";
import { isAllowedToRsvp } from "@/serverFunctions/user/isAllowedToRsvp";
import IconTicket from "@/components/Icons/IconTicket";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [visible, fadeIn] = useVisibility(open);
  const [showTicket, setShowTicket] = useState(false);

  const user = useUser(true);

  useEffect(() => {
    if (user) {
      isAllowedToRsvp(user).then((allowed) => {
        return setShowTicket(user?.rsvp && !allowed ? true : false);
      });
    }
  }, [user]);

  return (
    <>
      <nav
        className={`${
          fadeIn ? "w-[20rem]" : "w-16"
        } fixed bg-tedx-blue h-[100dvh] border-r border-slate-900 max-w-xs text-tedx-white transition-[width] duration-300 ease-out cursor-default z-40`}
      >
        <IconHamburger
          className="absolute top-4 right-5 z-10"
          onClick={(open) => {
            setOpen(open);
          }}
        ></IconHamburger>

        <div className={`h-full flex flex-col gap-8`}>
          <div
            className={`text-2xl ml-8 mt-6 whitespace-nowrap transition-all duration-300 ease-out ${
              !fadeIn && "opacity-0"
            }`}
          >
            <span className="font-black text-tedx-red">
              TED<sup>x</sup>
            </span>
            <br />
            Columbia Lake
            <br />
            <span className="font-bold">Youth</span>
          </div>
          <div className="flex flex-col items-center text-xl mt-4 overflow-y-auto overflow-x-hidden">
            <ul className="flex flex-col gap-2">
              <Link href={"/"} onClick={() => setOpen(false)}>
                <SidebarItem
                  fadeIn={fadeIn}
                  icon={<IconHome className="fill-tedx-white" />}
                  text="Home"
                ></SidebarItem>
              </Link>
              {showTicket && (
                <Link href={"/networking"} onClick={() => setOpen(false)}>
                  <SidebarItem
                    fadeIn={fadeIn}
                    icon={<IconNetworking className="fill-tedx-white" />}
                    text="Networking"
                  ></SidebarItem>
                </Link>
              )}
              {showTicket && (
                <Link href={"/ticket"} onClick={() => setOpen(false)}>
                  <SidebarItem
                    fadeIn={fadeIn}
                    icon={<IconTicket className="fill-tedx-white" />}
                    text="Ticket"
                  ></SidebarItem>
                </Link>
              )}

              {user?.role.permissions.manageQr && (
                <>
                  <Link href={"/check-in"} onClick={() => setOpen(false)}>
                    <SidebarItem
                      fadeIn={fadeIn}
                      icon={<IconQrcode className="fill-tedx-white" />}
                      text="QR Management"
                    ></SidebarItem>
                  </Link>
                </>
              )}

              {user?.role.permissions.admin && (
                <>
                  <Link href={"/users"} onClick={() => setOpen(false)}>
                    <SidebarItem
                      fadeIn={fadeIn}
                      icon={<IconKey className="fill-tedx-white" />}
                      text="Manage Users"
                    ></SidebarItem>
                  </Link>
                  <Link
                    href={"/email-templates"}
                    onClick={() => setOpen(false)}
                  >
                    <SidebarItem
                      fadeIn={fadeIn}
                      icon={<IconMail className="fill-tedx-white" />}
                      text="Email Templates"
                    ></SidebarItem>
                  </Link>
                </>
              )}
            </ul>
          </div>

          <div className="border-t-2 border-slate-900 p-2 mt-auto">
            <div
              className={`flex items-center justify-center w-fit mx-auto p-2 rounded-md cursor-pointer hocus:bg-slate-700 transition-all duration-300 ease-out group ${
                fadeIn ? "gap-4" : "-ml-1"
              }`}
              tabIndex={0}
              onClick={() => {
                !user && window.location.replace("/auth/login");
              }}
            >
              {user ? (
                <div
                  className={`p-2 rounded-full flex justify-center items-center w-10 aspect-square ${
                    (user.role.name === "attendee" && "bg-teal-300") ||
                    (user.role.name === "speaker" && "bg-red-300") ||
                    (user.role.name === "admin" && "bg-blue-300")
                  }`}
                >
                  <span className="text-slate-950">
                    {user?.firstName?.at(0)?.toUpperCase()}
                    {user?.lastName?.at(0)?.toUpperCase()}
                  </span>
                </div>
              ) : (
                <IconLogin className="fill-tedx-white" />
              )}

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  !fadeIn && "w-0 opacity-0"
                } whitespace-nowrap`}
              >
                {user ? user.firstName + " " + user.lastName : "Login"}
              </div>
              {user && (
                <div
                  className={`flex gap-1 flex-col overflow-hidden  transition-all duration-300 ease-out ${
                    !fadeIn && "w-0"
                  }`}
                >
                  <div className="bg-slate-400 w-1 aspect-square rounded-full"></div>
                  <div className="bg-slate-400 w-1 aspect-square rounded-full"></div>
                  <div className="bg-slate-400 w-1 aspect-square rounded-full"></div>
                </div>
              )}

              {user && (
                <div
                  className={`z-20 absolute bg-slate-600 ${
                    fadeIn ? "-right-32" : "-right-40"
                  } bottom-6 rounded-md w-40 p-2 opacity-0 pointer-events-none group-focus:opacity-100 group-focus:pointer-events-auto transition-all duration-300 ease-out before:content-[''] before:w-2 before:h-2 before:rotate-45 before:absolute before:-left-1 before:bottom-3 before:bg-slate-600`}
                >
                  <ul>
                    {/* <li
                      className=" px-2 py-1 rounded hocus:bg-slate-400"
                      onClick={() => window.location.replace("/profile")}
                    >
                      Profile
                    </li> */}

                    <li
                      className="py-1 px-2 rounded hocus:bg-slate-400"
                      onClick={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
