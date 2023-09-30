"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { EmailTemplate } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { updateTemplate } from "./updateTemplates";

type Props = {
  searchParams: {
    [key: string]: string;
  };
  previousTemplate: EmailTemplate;
};

export default function Editor({ searchParams, previousTemplate }: Props) {
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
    <div className="h-full w-full p-4">
      <div className="font-bold">Target:</div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setParam("role", "admin");
          }}
          className={`py-1 px-2 border border-slate-400 rounded-md hover:bg-slate-700 hover:text-slate-100 transition-all duration-300 ease-out ${
            (current.get("role") === "admin" || current.get("role") === null) &&
            "bg-slate-700 text-slate-100"
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
      <form
        action={(data: FormData) => {
          updateTemplate(data);
          router.refresh();
        }}
        className="mt-6 flex flex-col gap-4 max-w-xl"
      >
        <input
          type="hidden"
          name="role"
          value={current.get("role") ?? "admin"}
        />
        <Input
          type="text"
          placeholder="Subject"
          name="subject"
          defaultValue={previousTemplate?.subject}
        />
        <textarea
          name="body"
          id=""
          cols={30}
          rows={8}
          className="p-2 font-sans bg-slate-50 border border-slate-400 rounded-md outline-none focus:outline-2 focus:outline-offset-0 dark:bg-slate-800 focus:outline-slate-600 dark:border-slate-600 transition-colors duration-300 ease-out peer"
          placeholder="Body"
          spellCheck={true}
          key={searchParams.role}
          defaultValue={previousTemplate?.body}
        ></textarea>
        <Button className="w-40">Save</Button>
      </form>
      <div className="mt-4">
        <div className="font-bold">Tips:</div>
        <ul className="pl-4">
          <li>Use [firstName] to embed the users first name</li>
          <li>Use [lastName] to embed the users last name</li>
          <li>Use [link] to place the users account link</li>
        </ul>
      </div>
    </div>
  );
}
