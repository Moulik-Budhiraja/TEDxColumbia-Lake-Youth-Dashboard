import Header from "@/components/Header/Header";
import { prisma } from "@/db";
import jwt from "jsonwebtoken";
import CopySetupURL from "./CopySetupURL";
import Link from "next/link";
import Filters from "./Filters";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import "./table.css";
import Underline from "@/components/Underline/Underline";
import ValidateWaiver from "./ValidateWaiver";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    role?: string;
    attending?: string;
    search?: string;
  };
};

export default async function Users({ searchParams }: Props) {
  await requirePermission("admin");
  console.log(searchParams);

  let users = await prisma.user.findMany({
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

  // Filter by search (Name, Email, Affiliation)
  if (searchParams.search) {
    const search = searchParams.search.toLowerCase();
    console.log(search);

    users = users.filter(
      (user) =>
        `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(
          search
        ) ||
        user.email.toLowerCase().includes(search) ||
        user.affiliation.toLowerCase().includes(search)
    );
  }

  return (
    <div className="h-screen">
      <Header title="Users" description="Manage User Accounts"></Header>

      {/* Show a table of users */}

      <Filters searchParams={searchParams}></Filters>

      <div className="w-full overflow-x-scroll">
        <table className="table-auto max-w-full">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Affiliation</th>
              <th>Role</th>
              <th>Account Setup</th>
              <th>Setup</th>
              <th>Auth Generations</th>
              <th>Attending</th>
              <th>Date of Birth</th>
              <th>Phone Number</th>
              <th>Meal Preference</th>
              <th>Dietary Restrictions</th>
              <th>Waiver</th>
              <th>Waiver Valid</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const search = searchParams.search ?? "";

              const fullName = `${user.firstName} ${user.lastName}`;
              const searchIndex = fullName
                .toLowerCase()
                .indexOf(search.toLowerCase());
              const searchEndIndex = searchIndex + search.length;

              const emailIndex = user.email.toLowerCase().indexOf(search);
              const affiliationIndex = user.affiliation
                .toLowerCase()
                .indexOf(search);

              return (
                <tr key={user.id}>
                  <td>
                    {searchIndex < user.firstName.length ? (
                      <Underline
                        start={Math.max(0, searchIndex)}
                        length={
                          Math.min(user.firstName.length, searchEndIndex) -
                          Math.max(0, searchIndex)
                        }
                      >
                        {user.firstName}
                      </Underline>
                    ) : (
                      user.firstName
                    )}
                  </td>
                  <td>
                    {searchEndIndex > user.firstName.length ? (
                      <Underline
                        start={Math.max(
                          0,
                          searchIndex - user.firstName.length - 1
                        )}
                        length={
                          searchEndIndex -
                          Math.max(user.firstName.length + 1, searchIndex)
                        }
                      >
                        {user.lastName}
                      </Underline>
                    ) : (
                      user.lastName
                    )}
                  </td>
                  <td>
                    <Underline start={emailIndex} length={search.length}>
                      {user.email}
                    </Underline>
                  </td>
                  <td>
                    <Underline start={affiliationIndex} length={search.length}>
                      {user.affiliation}
                    </Underline>
                  </td>
                  <td>{user.role.name.toUpperCase()}</td>
                  <td>{!!user.auth ? "TRUE" : "FALSE"}</td>
                  <td>
                    {!user.auth && (
                      <CopySetupURL
                        email={user.email}
                        userId={user.id}
                      ></CopySetupURL>
                    )}
                  </td>
                  <td>{user.authGeneratations}</td>
                  <td>
                    {user.rsvp == null
                      ? "UNKNOWN"
                      : user.rsvp?.attending
                      ? "TRUE"
                      : "FALSE"}
                  </td>
                  <td>
                    {user?.rsvp?.attending &&
                      user?.rsvp?.dateOfBirth?.toLocaleDateString("en-us", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </td>
                  <td>{user?.rsvp?.attending && user?.rsvp?.phoneNumber}</td>
                  <td>{user?.rsvp?.attending && user?.rsvp?.mealPreference}</td>
                  <td>
                    {user?.rsvp?.attending && user?.rsvp?.dietaryRestrictions}
                  </td>
                  <td>
                    {user?.rsvp?.attending && !!user?.rsvp?.waiverName && (
                      <a
                        href={`/api/waiver/${user.id}`}
                        className="text-sky-600 underline hover:text-sky-400 transition-all duration-300 ease-out"
                        target="_blank"
                      >
                        Signed
                      </a>
                    )}
                  </td>
                  <td className="text-center">
                    {user.rsvp?.attending && (
                      <ValidateWaiver
                        userId={user.id}
                        waiverValid={user.rsvp?.waiverValidated}
                      ></ValidateWaiver>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-right p-2 mb-16 md:mb-0">
        {users.length} {users.length == 1 ? "Result" : "Results"}
      </div>
    </div>
  );
}
