"use client";

import { setLateRsvp } from "@/serverFunctions/user/setLateRsvp";

type Props = {
  userId: string;
  late: boolean;
};

export default function LateRsvp({ userId, late }: Props) {
  return (
    <>
      <input
        type="checkbox"
        onChange={async (e) => await setLateRsvp(userId, e.target.checked)}
        defaultChecked={late}
      />
    </>
  );
}
