"use client";

import { ReactNode, useState } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void | "success" | "error";
};

const stateStyles = {
  neutral:
    "text-slate-950 border-slate-400 hocus:border-slate-950 hocus:text-slate-100",
  success:
    "text-green-700 border-green-700 hocus:border-green-700 hocus:text-green-600",
  error: "text-red-700 border-red-700 hocus:border-red-700 hocus:text-red-600",
};

type StateStyle = keyof typeof stateStyles;

export default function Button({
  children,
  className,
  type,
  onClick,
}: ButtonProps) {
  const [style, setStyle] = useState<StateStyle>("neutral");

  const applyStyle = (style: StateStyle) => {
    setStyle(style);
    setTimeout(() => {
      setStyle("neutral");
    }, 1000);
  };

  return (
    <button
      className={`p-2 border  rounded-md outline-none hocus:bg-slate-700  hocus:tracking-widest transition-all duration-300 ease-out ${
        stateStyles[style]
      } ${className || ""}`}
      onClick={() => {
        const result = onClick?.();

        result === "success" && applyStyle("success");
        result === "error" && applyStyle("error");
      }}
      type={type || "submit"}
    >
      {children}
    </button>
  );
}
