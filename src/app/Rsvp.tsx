"use client";

import Button from "@/components/Button/Button";
import { UserWithRole, UserWithRsvp } from "@/types/morePrismaTypes";
import Link from "next/link";

type Props = {
  user: UserWithRsvp;
};

export default function Rsvp({ user }: Props) {
  return (
    <div className="m-2 p-2 rounded-md border border-slate-400 max-w-lg">
      <h2 className="text-2xl">RSVP</h2>
      <p className="mb-2">
        Please RSVP by <span className="underline">Wednesday, October 4th</span>{" "}
        to let us know that you&apos;ll be there.
      </p>
      <p>
        <span className="font-bold">Current Status: </span>{" "}
        {(!user.rsvp && "Not Started") ||
          (user.rsvp?.attending && "Attending") ||
          "Not Attending"}
      </p>

      {user.rsvp?.attending && (
        <>
          <p>
            <span className="font-bold">Date of Birth: </span>
            {user.rsvp.dateOfBirth?.toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {user.rsvp.phoneNumber && (
            <p>
              <span className="font-bold">Phone Number: </span>
              {user.rsvp.phoneNumber}
            </p>
          )}
          <p>
            <span className="font-bold">Meal Preference: </span>
            {user.rsvp.mealPreference}
          </p>
          {user.rsvp.dietaryRestrictions && (
            <p>
              <span className="font-bold">Dietary Restrictions: </span>
              {user.rsvp.dietaryRestrictions}
            </p>
          )}
          <p>
            <span className="font-bold">Waiver: </span>
            {user.rsvp.waiverName ? (
              <Link
                href={`/api/waiver/${user.id}`}
                className="text-sky-600 underline hover:text-sky-400 transition-all duration-300 ease-out"
                target="_blank"
              >
                Signed
              </Link>
            ) : (
              "Not Signed"
            )}
          </p>
        </>
      )}

      <div className="flex justify-end mt-4">
        <Link href="/rsvp">
          <Button>{(!user.rsvp && "Start Form") || "Edit"}</Button>
        </Link>
      </div>
    </div>
  );
}
