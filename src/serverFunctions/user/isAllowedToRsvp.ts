import { RSVPDeadline, RSVPWaitlist1Deadline } from "@/constants/eventDates";
import { UserWithRsvp } from "@/types/morePrismaTypes";
import { User } from "@prisma/client";

export async function isAllowedToRsvp(user: User | UserWithRsvp | null) {
  if (!user) {
    return false;
  }

  let allowedToRsvp = false;

  if (user?.allowLateRsvp) {
    allowedToRsvp = true;
  }

  if (new Date() < RSVPDeadline) {
    allowedToRsvp = true;
  }

  if (new Date() < RSVPWaitlist1Deadline && user.waitlisted1) {
    allowedToRsvp = true;
  }

  return allowedToRsvp;
}
