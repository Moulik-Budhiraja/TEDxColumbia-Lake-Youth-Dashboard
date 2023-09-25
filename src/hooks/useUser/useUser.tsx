import { getUser } from "@/serverFunctions/user/getUser";
import { UserWithRole } from "@/types/morePrismaTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<UserWithRole>();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      getUser({
        by: "email",
        email: session.user.email,
        include_auth: false,
      }).then((user) => {
        user && setUser(user);
      });
    }
  }, [status, session?.user?.email]);

  return user;
}
