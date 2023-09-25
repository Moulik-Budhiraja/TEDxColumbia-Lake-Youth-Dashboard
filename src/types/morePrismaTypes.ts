import { Prisma } from "@prisma/client";

export type UserWithRole = Prisma.UserGetPayload<{
  include: {
    role: {
      include: {
        permissions: true;
      };
    };
  };
}>;

export type UserWithRsvp = Prisma.UserGetPayload<{
  include: {
    rsvp: true;
    role: {
      include: {
        permissions: true;
      };
    };
  };
}>;
