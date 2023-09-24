"use client";

import IconHamburger from "@/components/Icons/IconHamburger";
import IconHome from "@/components/Icons/IconHome";
import IconNetworking from "@/components/Icons/IconNetworking";
import { useVisibility } from "@/hooks/useVisibility/useVisibility";
import Link from "next/link";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import IconQrcode from "@/components/Icons/IconQrcode";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [visible, fadeIn] = useVisibility(open);

  return (
    <>
      <nav
        className={`${
          fadeIn ? "w-3/4" : "w-16"
        } fixed bg-slate-800 h-[100dvh] border-r border-slate-900 max-w-xs overflow-hidden text-tedx-white transition-all duration-300 ease-out cursor-default`}
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
          <div className="flex flex-col items-center text-xl mt-8">
            <ul className="flex flex-col gap-2">
              <Link href={"/"} onClick={() => setOpen(false)}>
                <SidebarItem
                  fadeIn={fadeIn}
                  icon={<IconHome className="fill-tedx-white" />}
                  text="Home"
                ></SidebarItem>
              </Link>
              <Link href={"/networking"} onClick={() => setOpen(false)}>
                <SidebarItem
                  fadeIn={fadeIn}
                  icon={<IconNetworking className="fill-tedx-white" />}
                  text="Networking"
                ></SidebarItem>
              </Link>
              <Link href={"/generate-qr"} onClick={() => setOpen(false)}>
                <SidebarItem
                  fadeIn={fadeIn}
                  icon={<IconQrcode className="fill-tedx-white" />}
                  text="Generate QR"
                ></SidebarItem>
              </Link>
            </ul>
          </div>
          <div className="border-t-2 border-slate-900 p-2 mt-auto">
            <div
              className={`flex items-center justify-center w-fit mx-auto p-2 rounded-md cursor-pointer hocus:bg-slate-700 transition-all duration-300 ease-out ${
                fadeIn ? "gap-4" : "-ml-1"
              }`}
              tabIndex={0}
            >
              <div className="p-2 bg-green-300 rounded-full flex justify-center items-center w-10 aspect-square">
                <span className="text-slate-950">JD</span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  !fadeIn && "w-0 opacity-0"
                } whitespace-nowrap`}
              >
                John Doe
              </div>
              <div
                className={`flex gap-1 flex-col overflow-hidden  transition-all duration-300 ease-out ${
                  !fadeIn && "w-0"
                }`}
              >
                <div className="bg-slate-400 w-1 aspect-square rounded-full"></div>
                <div className="bg-slate-400 w-1 aspect-square rounded-full"></div>
                <div className="bg-slate-400 w-1 aspect-square rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
