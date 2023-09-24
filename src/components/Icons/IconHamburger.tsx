"use client";

import { useState } from "react";

type IconProps = {
  className?: string;
  pathClassName?: string;
  onClick?: (open: boolean) => void;
};

export default function IconHamburger({
  className,
  pathClassName,
  onClick,
}: IconProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${className} flex flex-col gap-[0.375rem] cursor-pointer`}
      tabIndex={0}
      onClick={() => {
        onClick?.(!open);
        setOpen(!open);
      }}
    >
      <div
        className={`${pathClassName} w-6 h-[0.125rem] bg-tedx-white rounded-full transition-all duration-500 ease-out ${
          open && "transform -rotate-45 translate-y-2"
        }`}
      ></div>
      <div
        className={`${pathClassName} w-6 h-[0.125rem] bg-tedx-white rounded-full transition-all duration-500 ease-out ${
          open && "opacity-0"
        }`}
      ></div>
      <div
        className={`${pathClassName} w-6 h-[0.125rem] bg-tedx-white rounded-full transition-all duration-500 ease-out ${
          open && "transform rotate-45 -translate-y-2"
        }`}
      ></div>
    </div>
  );
}
