"use client";

import { useVisibility } from "@/hooks/useVisibility/useVisibility";
import { useState } from "react";

type Props = {
  show?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
};

export default function SuccessNotification({
  show = true,
  children,
  onClose,
}: Props) {
  const [open, setOpen] = useState(show);
  const [visible, fadeIn] = useVisibility(open);

  return visible ? (
    <div
      className={`flex items-center p-4 mt-2 rounded-lg text-green-800 border-t-4 border-green-400 bg-green-100 dark:text-green-400 dark:bg-slate-800 dark:border-green-700 ${
        !fadeIn && "opacity-0"
      }  transition-all duration-300 ease-out`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ml-3 text-sm font-medium">{children}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 dark:bg-slate-800 dark:text-green-400 dark:hover:bg-slate-700 inline-flex items-center justify-center h-8 w-8 transition-all duration-300 ease-out"
        aria-label="Close"
        onClick={() => {
          onClose?.();
          setOpen(false);
        }}
      >
        <span className="sr-only">Dismiss</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  ) : null;
}
