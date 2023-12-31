import jwt from "jsonwebtoken";
import SetupForm from "./SetupForm";
import { redirect } from "next/navigation";
import { prisma } from "@/db";
import { getUser } from "@/serverFunctions/user/getUser";
import { NewAccountJwt } from "@/types/jwtTypes";
import { getSessionUser } from "@/serverFunctions/user/getSessionUser";

type Props = {
  searchParams: {
    token: string;
  };
};

export default async function SetupAccount({ searchParams }: Props) {
  const sessionUser = await getSessionUser();
  if (sessionUser) return redirect("/");

  let decoded: NewAccountJwt;

  try {
    decoded = jwt.verify(
      searchParams.token ?? "",
      process.env.NEXTAUTH_SECRET as string
    ) as NewAccountJwt;
  } catch {
    console.log("Invalid token");
    return redirect("/");
  }

  const user = await getUser({
    by: "id",
    id: decoded.id,
    include_auth: true,
  });

  if (!user) {
    console.log("User not found");
    return redirect("/");
  }
  if (user.auth) {
    console.log("User already has an account", user.auth.id);
    return redirect("/auth/login");
  }

  return (
    <div className="w-full h-screen p-4 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 justify-center">
        <h1 className="font-display text-4xl text-slate-900 dark:text-tedx-white">
          New{" "}
          {decoded.role?.at(0)?.toUpperCase() +
            decoded.role?.slice(1).toLowerCase()}{" "}
          Account
        </h1>
        <SetupForm user={user} token={searchParams.token}></SetupForm>
      </div>
    </div>
  );
}
