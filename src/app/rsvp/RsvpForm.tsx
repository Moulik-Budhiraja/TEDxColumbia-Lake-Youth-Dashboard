"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import { menuOptions } from "./menuOptions";
import { rsvpFormSubmit } from "./rsvpFormSubmit";
import { UserWithRsvp } from "@/types/morePrismaTypes";

type Props = {
  user: UserWithRsvp;
};

export default function RsvpForm({ user }: Props) {
  const [attending, setAttending] = useState(false);
  const [filename, setFilename] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  // Sketchy date manipulation, basically subtracting 1 day from the date of birth
  const t = user.rsvp?.dateOfBirth
    ? new Date(user.rsvp.dateOfBirth.toISOString()).setDate(
        user.rsvp?.dateOfBirth.getDate() - 1
      )
    : undefined;

  const oldDateOfBirth = t
    ? new Date(t).toISOString().substring(0, 10)
    : undefined;

  useEffect(() => {
    fetch(`/api/waiver/${user.id}`)
      .then((res) => res.blob())
      .then((data) => {
        if (data && user?.rsvp?.attending) {
          const container = new DataTransfer();
          container.items.add(
            new File([data], "waiver.pdf", { type: "application/pdf" })
          );
          fileInput.current?.files &&
            (fileInput.current.files = container.files);

          setFilename("waiver.pdf");
        }
      });
  }, [attending]);

  return (
    <form
      action={rsvpFormSubmit}
      className="p-4 flex flex-col gap-4 mb-16 md:mb-0"
    >
      <div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            id="attending-1"
            name="attending"
            value="on"
            onChange={() => setAttending(true)}
          />
          <label htmlFor="attending-1">
            I will be attending TED<sup>X</sup> Columbia Lake Youth
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            id="attending-2"
            name="attending"
            value="off"
            onChange={() => setAttending(false)}
          />
          <label htmlFor="attending-2">
            I will <span className="font-bold underline">not</span> be attending
            TED
            <sup>X</sup> Columbia Lake Youth
          </label>
        </div>
      </div>

      {attending && (
        <>
          <h2 className="font-bold text-2xl mt-4">Personal Information</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="date-of-birth" className="font-bold">
              Date of Birth*:{" "}
            </label>
            <input
              type="date"
              name="date-of-birth"
              id="date-of-birth"
              className="w-40 p-2 rounded-md border border-slate-400 bg-tedx-white outline-none focus:outline-2 focus:outline-offset-0 focus:outline-slate-600 dark:bg-slate-800 dark:border-slate-700 transition-all duration-300 ease-out"
              defaultValue={oldDateOfBirth}
              required={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="date-of-birth" className="font-bold">
              Phone Number:{" "}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(123) 456-7890"
              className="w-40 p-2 rounded-md border border-slate-400 outline-none focus:outline-2 focus:outline-offset-0 focus:outline-slate-600 dark:bg-slate-800 dark:border-slate-700 transition-all duration-300 ease-out"
              defaultValue={user.rsvp?.phoneNumber ?? ""}
            />
          </div>

          <div>
            <h2 className="font-bold text-2xl mt-4">Meal Preference</h2>
            <p className="mb-4">
              Please indicate your preferred meal option below*:
            </p>
            <select
              name="meal-preference"
              id="meal"
              className="w-64 bg-white border border-slate-400 p-2 rounded-md  mb-4 outline-none focus:outline-2 focus:outline-offset-0 focus:outline-slate-600 dark:bg-slate-800 dark:border-slate-700 transition-all duration-300 ease-out"
              required={true}
              defaultValue={user.rsvp?.mealPreference ?? ""}
            >
              {menuOptions.map((option) => (
                <option
                  value={option.name}
                  key={option.name}
                  className="font-sans"
                >
                  {option.name}
                </option>
              ))}
            </select>
            <Menu></Menu>
          </div>

          <div>
            <h2 className="font-bold text-2xl mt-4">Dietary Restrictions</h2>
            <p>
              Please list any dietary restrictions that you would like us to be
              aware of:
            </p>
            <input
              placeholder="Vegetarian, Gluten Free, etc."
              name="dietary-restrictions"
              className="mt-4 p-2 border border-slate-400 rounded-md outline-none focus:outline-2 focus:outline-offset-0 focus:outline-slate-600 dark:bg-slate-800 dark:border-slate-700 transition-all duration-300 ease-out"
              defaultValue={user.rsvp?.dietaryRestrictions ?? ""}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="font-bold text-2xl mt-4">Waiver</h2>
            <p>
              Please sign and upload{" "}
              <Link
                target="_blank"
                href="/waiver/TEDxColumbia_Lake_Youth_Waiver.pdf"
                className="text-sky-600 underline hover:text-sky-400 transition-all duration-300 ease-out"
              >
                this waiver
              </Link>{" "}
              as a pdf.
            </p>

            <div className="flex gap-4 items-center mt-4 mb-8">
              <label className="font-display p-2 bg-white border cursor-pointer border-slate-400 rounded-md outline-none hocus:bg-slate-700 hocus:border-slate-600 hocus:text-slate-100 hocus:tracking-widest dark:bg-slate-800 dark:border-slate-700 dark:hocus:border-slate-500 focus:outline-2 focus:outline-offset-0 focus:outline-slate-600 transition-all duration-300 ease-out">
                Upload File
                <input
                  className="hidden"
                  type="file"
                  name="file"
                  accept="application/pdf"
                  required={true}
                  ref={fileInput}
                  onChange={(e) => {
                    console.log(e.target.files?.[0]);
                    setFilename(e.target.value.replace(/.*[\/\\]/, ""));
                  }}
                />
              </label>
              <span>{filename}</span>
            </div>
          </div>
        </>
      )}

      <div className="flex gap-4">
        <Link href="/">
          <Button type="button" className="w-24">
            Cancel
          </Button>
        </Link>
        <Button className="w-24">Submit</Button>
      </div>
    </form>
  );
}
