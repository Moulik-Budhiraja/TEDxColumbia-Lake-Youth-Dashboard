import { getServerSession } from "next-auth/next";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen w-full">
      <h1 className="font-display text-4xl text-slate-900">Login</h1>
      <LoginForm></LoginForm>
    </div>
  );
}
