"use client";

import { useRouter } from "next/navigation";
import { type } from "os";
import { useCallback } from "react";

type Props = {
  searchParams: {
    [key: string]: string;
  };
};

export default function Filters({ searchParams }: Props) {
  const current = new URLSearchParams(searchParams);
  const router = useRouter();

  console.log(current.get("role"));

  const setParam = useCallback((key: string, value: string | null) => {
    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }

    const search = current.toString();

    router.replace(`${window.location.pathname}?${search}`);
  }, []);

  return (
    <div className="mx-4 my-2">
      <div className="font-bold">Filter:</div>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => {
            setParam("role", null);
          }}
          className={`py-1 px-2 border border-slate-400 rounded-md hover:bg-slate-700 hover:text-slate-100 transition-all duration-300 ease-out ${
            current.get("role") === null && "bg-slate-700 text-slate-100"
          }`}
        >
          All
        </button>
        <button
          onClick={() => {
            setParam("role", "admin");
          }}
          className={`py-1 px-2 border border-slate-400 rounded-md hover:bg-slate-700 hover:text-slate-100 transition-all duration-300 ease-out ${
            current.get("role") === "admin" && "bg-slate-700 text-slate-100"
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => {
            setParam("role", "speaker");
          }}
          className={`py-1 px-2 border border-slate-400 rounded-md hover:bg-slate-700 hover:text-slate-100 transition-all duration-300 ease-out ${
            current.get("role") === "speaker" && "bg-slate-700 text-slate-100"
          }`}
        >
          Speaker
        </button>
        <button
          onClick={() => {
            setParam("role", "attendee");
          }}
          className={`py-1 px-2 border border-slate-400 rounded-md hover:bg-slate-700 hover:text-slate-100 transition-all duration-300 ease-out ${
            current.get("role") === "attendee" && "bg-slate-700 text-slate-100"
          }`}
        >
          Attendee
        </button>
      </div>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => {
            setParam("attending", null);
          }}
          className={`py-1 px-2 border border-slate-400 rounded-md hover:bg-slate-700 hover:text-slate-100 transition-all duration-300 ease-out ${
            current.get("attending") === null && "bg-slate-700 text-slate-100"
          }`}
        >
          All
        </button>
        <button
          onClick={() => {
            setParam("attending", "true");
          }}
          className={`py-1 px-2 border border-slate-400 rounded-md hover:bg-slate-700 hover:text-slate-100 transition-all duration-300 ease-out ${
            current.get("attending") === "true" && "bg-slate-700 text-slate-100"
          }`}
        >
          Attending
        </button>
        <button
          onClick={() => {
            setParam("attending", "false");
          }}
          className={`py-1 px-2 border border-slate-400 rounded-md hover:bg-slate-700 hover:text-slate-100 transition-all duration-300 ease-out ${
            current.get("attending") === "false" &&
            "bg-slate-700 text-slate-100"
          }`}
        >
          Not Attending
        </button>
        <button
          onClick={() => {
            setParam("attending", "unknown");
          }}
          className={`py-1 px-2 border border-slate-400 rounded-md hover:bg-slate-700 hover:text-slate-100 transition-all duration-300 ease-out ${
            current.get("attending") === "unknown" &&
            "bg-slate-700 text-slate-100"
          }`}
        >
          Unknown
        </button>
      </div>
    </div>
  );
}
