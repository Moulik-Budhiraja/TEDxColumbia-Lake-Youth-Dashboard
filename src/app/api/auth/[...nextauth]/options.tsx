import { serverLog } from "@/serverFunctions/log/serverLog";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        try {
          const res = await fetch(
            process.env.NEXTAUTH_URL + "/api/auth/validate-credentials",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          // console.log(await res.json());

          const data = await res.json();

          if (data.user) {
            return data.user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/setup-account",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
