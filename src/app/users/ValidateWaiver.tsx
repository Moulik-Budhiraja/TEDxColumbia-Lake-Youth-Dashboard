"use client";

import { setValidWaiver } from "../../serverFunctions/user/setValidWaiver";

type Props = {
  userId: string;
  waiverValid: boolean;
};

export default function ValidateWaiver({ userId, waiverValid }: Props) {
  return (
    <>
      <input
        type="checkbox"
        onChange={async (e) => await setValidWaiver(userId, e.target.checked)}
        defaultChecked={waiverValid}
      />
    </>
  );
}
