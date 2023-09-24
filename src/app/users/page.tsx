import Header from "@/components/Header/Header";
import { prisma } from "@/db";
import jwt from "jsonwebtoken";
import CopySetupURL from "./CopySetupURL";

export default async function Networking() {
  const users = await prisma.user.findMany({
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
      auth: true,
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
                    <CopySetupURL url={getSetupURL(user)}></CopySetupURL>
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

// await prisma.user.create({
//   data: {
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@example.com",
//     affiliation: "Example University",
//     role: {
//       connect: {
//         id: "61e2e4ce-9de4-4159-b59b-4086c9d4fc66",
//       },
//     },
//   },
// });
