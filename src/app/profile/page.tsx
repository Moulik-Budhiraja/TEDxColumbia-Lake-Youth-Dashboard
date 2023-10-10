"use server";

import IconGithub from "@/components/Icons/IconGithub";
import IconInstagram from "@/components/Icons/IconInstagram";
import IconLinkedin from "@/components/Icons/IconLinkedin";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Profile() {
  const user = await requirePermission("attendee");

  const fullName = `${user.firstName} ${user.lastName}`;
  const profileSlug = fullName.toLowerCase().replace(/ /g, "-");

  return redirect(`/profile/${profileSlug}`);
}
