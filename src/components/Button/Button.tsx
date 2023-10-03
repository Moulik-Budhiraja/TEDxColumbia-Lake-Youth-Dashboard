"use client";

import { ReactNode, useState } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  small?: boolean;
  noGrow?: boolean;
  onClick?: () => void | "success" | "error";
};

export default function Button({
  children,
  className,
  type,
  small,
  noGrow,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${
        small ? "px-2 py-1" : "p-2"
      } border rounded-md outline-none bg-slate-50 hocus:bg-slate-700 ${
        !noGrow && "hocus:tracking-widest"
      } dark:border-slate-700 dark:bg-slate-800 transition-all duration-300 ease-out border-slate-400 hocus:border-slate-950 hocus:text-slate-100 dark:hocus:border-slate-500 focus:outline-2 focus:outline-offset-0 focus:outline-slate-600 ${
        className || ""
      }`}
      onClick={() => {
        const result = onClick?.();
      }}
      type={type || "submit"}
    >
      {children}
    </button>
  );
}
