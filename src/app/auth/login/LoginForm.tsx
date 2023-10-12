"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  return (
    <form
      method="post"
      className={`flex mx-auto flex-col gap-4 items-center w-full max-w-[17rem]`}
      onSubmit={async (e) => {
        e.preventDefault();

        signIn("credentials", {
          username: e.currentTarget.username.value,
          password: e.currentTarget.password.value,
          callbackUrl: process.env.NEXTAUTH_URL,
        });
      }}
    >
      <Input
        placeholder="Email"
        type="email"
        name="username"
        className="w-full"
      ></Input>
      <Input
        placeholder="Password"
        name="password"
        type="password"
        className="w-full"
      ></Input>
      <Button className="w-[10rem]">Login</Button>
    </form>
  );
}
