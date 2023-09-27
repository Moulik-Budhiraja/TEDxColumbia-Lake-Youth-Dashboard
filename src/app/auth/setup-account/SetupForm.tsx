"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { User } from "@prisma/client";
import { saveDetails } from "./SaveDetails";
import { useState } from "react";
import Link from "next/link";

type Props = {
  user: User;
  token: string;
};

export default function LoginForm({ user, token }: Props) {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      method="post"
      className={`flex mx-auto flex-col gap-4 items-center max-w-lg`}
      onSubmit={async (e) => {
        e.preventDefault();

        const password = document.querySelector(
          "input[name=password]"
        ) as HTMLInputElement;
        const confirmPassword = document.querySelector(
          "input[name=confirm-password]"
        ) as HTMLInputElement;

        if (password?.value.length < 8) {
          setError("Password must be at least 8 characters long");
          return;
        }

        if (password?.value !== confirmPassword?.value) {
          setError("Passwords do not match");
          return;
        }

        await saveDetails(token, password.value);
        return window.location.replace("/auth/login");
      }}
    >
      <div className="flex gap-4 w-full flex-wrap md:flex-nowrap justify-center">
        <Input
          placeholder="First Name"
          type="text"
          name="username"
          className="w-full"
          defaultValue={user.firstName}
          disabled={true}
        ></Input>
        <Input
          placeholder="Last Name"
          type="text"
          name="username"
          className="w-full"
          defaultValue={user.lastName}
          disabled={true}
        ></Input>
        <Input
          placeholder="Affiliation"
          name="affiliation"
          type="text"
          className="w-full"
          defaultValue={user.affiliation}
          disabled={true}
        ></Input>
      </div>
      <Input
        placeholder="Email"
        type="email"
        name="username"
        className="w-full"
        defaultValue={user.email}
        disabled={true}
      ></Input>
      <div className="flex gap-4 w-full flex-wrap md:flex-nowrap">
        <Input
          placeholder="Password"
          name="password"
          type="password"
          className="w-full"
        ></Input>
        <Input
          placeholder="Confirm Password"
          name="confirm-password"
          type="password"
          className="w-full"
        ></Input>
      </div>

      <div className="flex gap-2 items-center">
        <input type="checkbox" id="terms" required={true} />
        <label htmlFor="terms">
          I agree to the{" "}
          <Link
            href={"/Terms-of-Service.pdf"}
            target="_blank"
            className="text-sky-600 underline hocus:text-sky-400 transition-all duration-300 ease-out"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={"/Privacy-Policy.pdf"}
            target="_blank"
            className="text-sky-600 underline hocus:text-sky-400 transition-all duration-300 ease-out"
          >
            Privacy Policy
          </Link>
          .
        </label>
      </div>

      <div className="font-bold text-tedx-red italic">{error}</div>
      <Button className="w-[10rem]">Save</Button>
    </form>
  );
}
