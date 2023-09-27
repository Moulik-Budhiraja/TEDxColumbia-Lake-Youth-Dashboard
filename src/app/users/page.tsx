import Header from "@/components/Header/Header";
import { prisma } from "@/db";
import jwt from "jsonwebtoken";
import CopySetupURL from "./CopySetupURL";
import Link from "next/link";
import Filters from "./Filters";
import { requirePermission } from "@/serverFunctions/user/requirePermission";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    role?: string;
    attending?: string;
  };
};

export default async function Users({ searchParams }: Props) {
  await requirePermission("admin");
  console.log(searchParams);

  const users = await prisma.user.findMany({
    where: {
      role: {
        name: searchParams.role,
      },
      rsvp:
        searchParams.attending === "true"
          ? { attending: true }
          : searchParams.attending === "false"
          ? { attending: false }
          : searchParams.attending === "unknown"
          ? null
          : undefined,
    },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
      auth: true,
      rsvp: true,
    },
    orderBy: [
      {
        firstName: "asc",
      },
      {
        lastName: "asc",
      },
    ],
  });

  const getSetupURL = (user: (typeof users)[0]) => {
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role.name,
        iat: Date.now(),
      },
      process.env.NEXTAUTH_SECRET as string
    );

    return `${process.env.NEXTAUTH_URL}/auth/setup-account?token=${token}`;
  };

  return (
    <div className="h-screen">
      <Header title="Users" description="Manage User Accounts"></Header>

      {/* Show a table of users */}

      <div className="w-full overflow-x-scroll">
        <Filters searchParams={searchParams}></Filters>
        <table className="table-auto max-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Affiliation</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Account Setup</th>
              <th className="px-4 py-2">Setup</th>
              <th className="px-4 py-2">Auth Generations</th>
              <th className="px-4 py-2">Attending</th>
              <th className="px-4 py-2">Date of Birth</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Meal Preference</th>
              <th className="px-4 py-2">Dietary Restrictions</th>
              <th className="px-4 py-2">Waiver</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.firstName}</td>
                <td className="border px-4 py-2">{user.lastName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.affiliation}</td>
                <td className="border px-4 py-2">
                  {user.role.name.toUpperCase()}
                </td>
                <td className="border px-4 py-2">
                  {!!user.auth ? "TRUE" : "FALSE"}
                </td>
                <td className="border px-4 py-2">
                  {!user.auth && (
                    <CopySetupURL
                      email={user.email}
                      userId={user.id}
                    ></CopySetupURL>
                  )}
                </td>
                <td className="border px-4 py-2">{user.authGeneratations}</td>
                <td className="border px-4 py-2">
                  {user.rsvp == null
                    ? "UNKNOWN"
                    : user.rsvp?.attending
                    ? "TRUE"
                    : "FALSE"}
                </td>
                <td className="border px-4 py-2">
                  {!!user.rsvp?.dateOfBirth &&
                    user.rsvp.dateOfBirth.toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </td>
                <td className="border px-4 py-2">
                  {!!user?.rsvp?.phoneNumber && user.rsvp.phoneNumber}
                </td>
                <td className="border px-4 py-2">
                  {!!user?.rsvp?.mealPreference && user.rsvp.mealPreference}
                </td>
                <td className="border px-4 py-2">
                  {!!user?.rsvp?.dietaryRestrictions &&
                    user.rsvp.dietaryRestrictions}
                </td>
                <td className="border px-4 py-2">
                  {!!user?.rsvp?.waiverName && (
                    <a
                      href={`/api/waiver/${user.id}`}
                      className="text-sky-600 underline hover:text-sky-400 transition-all duration-300 ease-out"
                      target="_blank"
                    >
                      Signed
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
