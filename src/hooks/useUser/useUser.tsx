import { getUser } from "@/serverFunctions/user/getUser";
import { UserWithRole, UserWithRsvp } from "@/types/morePrismaTypes";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type UserHook = Prisma.UserGetPayload<{
  include: {
    role: {
      include: {
        permissions: true;
      };
    };
    auth: boolean;
    rsvp: boolean;
  };
}>;

export function useUser(includeRsvp: boolean = false) {
  const [user, setUser] = useState<UserHook>();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      getUser({
        by: "email",
        email: session.user.email,
        include_auth: false,
        include_rsvp: includeRsvp,
      }).then((user) => {
        user && setUser(user);
      });
    }
  }, [status, session?.user?.email]);

  return user;
}
