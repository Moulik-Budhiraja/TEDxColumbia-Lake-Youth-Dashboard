"use server";

import { RSVPDeadline } from "@/constants/eventDates";
import { prisma } from "@/db";
import { isAllowedToRsvp } from "@/serverFunctions/user/isAllowedToRsvp";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import fs from "fs/promises";
import { redirect } from "next/navigation";

export async function rsvpFormSubmit(data: FormData) {
  const user = await requirePermission("rsvp");

  const attending = data.get("attending") === "on";

  const allowedToRsvp = await isAllowedToRsvp(user);

  if (!allowedToRsvp) {
    return redirect("/");
  }

  const oldRsvp = await prisma.rsvp.findFirst({
    where: {
      userId: user.id,
    },
  });

  console.log(attending);

  if (attending) {
    const dateOfBirth = data.get("date-of-birth") as string;
    const phoneNumber = data.get("phone") as string;
    const mealPreference = data.get("meal-preference") as string;
    const dietaryRestrictions = data.get("dietary-restrictions") as string;
    const waiver = data.get("file") as File;

    console.table({
      attending,
      dateOfBirth,
      phoneNumber,
      mealPreference,
      dietaryRestrictions,
      waiver: waiver.name,
    });

    const waiverPath = `/files/waivers/${user.firstName}-${user.lastName}-${user.id}-Waiver.pdf`;

    if (!oldRsvp) {
      const rsvp = await prisma.rsvp.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          attending: true,
          dateOfBirth: new Date(
            new Date(dateOfBirth).setDate(new Date(dateOfBirth).getDate() + 1)
          ), // Scuffed way to fix off-by-one error
          phoneNumber,
          mealPreference,
          dietaryRestrictions,
          waiverName: waiverPath,
        },
      });
    } else {
      const rsvp = await prisma.rsvp.update({
        where: {
          id: oldRsvp.id,
        },
        data: {
          attending: true,
          dateOfBirth: new Date(
            new Date(dateOfBirth).setDate(new Date(dateOfBirth).getDate() + 1)
          ),
          phoneNumber,
          mealPreference,
          dietaryRestrictions,
          waiverName: waiverPath,
        },
      });
    }

    await fs.writeFile(
      process.cwd() + waiverPath,
      Buffer.from(await waiver.arrayBuffer())
    );
  } else {
    if (!oldRsvp) {
      const rsvp = await prisma.rsvp.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          attending: false,
        },
      });
    } else {
      const rsvp = await prisma.rsvp.update({
        where: {
          id: oldRsvp.id,
        },
        data: {
          attending: false,
        },
      });
    }
  }

  return redirect("/");
}
