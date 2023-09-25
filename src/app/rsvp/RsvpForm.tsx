"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Link from "next/link";
import { ReactNode, useState } from "react";
import Menu from "./Menu";
import { menuOptions } from "./menuOptions";
import { rsvpFormSubmit } from "./rsvpFormSubmit";

export default function RsvpForm() {
  const [attending, setAttending] = useState(false);
  const [filename, setFilename] = useState("");

  return (
    <form action={rsvpFormSubmit} className="p-4 flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          name="attending"
          id="attending"
          onChange={(e) => {
            console.log(e.target.checked);
            setAttending(e.target.checked);
          }}
        />
        <label htmlFor="attending">
          I will be attending TED<sup>X</sup> Columbia Lake Youth
        </label>
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
              className="w-40 p-2 rounded-md border border-slate-400 bg-white"
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
              className="w-40 p-2 rounded-md border border-slate-400"
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
              className="w-64 bg-white border border-slate-400 p-2 rounded-md outline-none hocus:border-slate-800 transition-all duration-300 ease-out mb-4"
              required={true}
            >
              {menuOptions.map((option) => (
                <option value={option.name}>{option.name}</option>
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
              className="mt-4 p-2 border border-slate-400 rounded-md outline-none hocus:border-slate-800 transition-all duration-300 ease-out"
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
              <label className="font-display p-2 bg-white border cursor-pointer border-slate-400 rounded-md outline-none hocus:bg-slate-700 hocus:border-slate-600 hocus:text-slate-100 hocus:tracking-widest transition-all duration-300 ease-out">
                Upload File
                <input
                  className="hidden"
                  type="file"
                  name="file"
                  accept="application/pdf"
                  required={true}
                  onChange={(e) => {
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
