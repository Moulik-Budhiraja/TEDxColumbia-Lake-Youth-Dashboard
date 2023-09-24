"use client";

import Link from "next/link";
import { useState } from "react";

type SidebarItemProps = {
  fadeIn: boolean;
  icon: React.ReactNode;
  text: string;
};

export default function SidebarItem({ fadeIn, icon, text }: SidebarItemProps) {
  return (
    <li
      className={`flex items-center py-2 rounded-md cursor-pointer hocus:bg-slate-700 transition-all duration-200 ease-out whitespace-nowrap ${
        fadeIn ? "gap-4 px-6" : "px-2 mx-4"
      }`}
    >
      {icon}

      <span
        className={`${
          !fadeIn && "w-0 opacity-0"
        } overflow-hidden transition-all duration-200 ease-out`}
      >
        {text}
      </span>
    </li>
  );
}
