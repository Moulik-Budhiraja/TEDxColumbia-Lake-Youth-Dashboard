"use client";

import Button from "@/components/Button/Button";
import StyledLink from "@/components/StyledLink/StyledLink";
import { setBadge } from "@/serverFunctions/user/setBadge";
import { UserWithRole } from "@/types/morePrismaTypes";
import { useRouter } from "next/navigation";

type Props = {
  user: UserWithRole;
};

export default function BadgeLinked({ user }: Props) {
  const router = useRouter();

  return user.qr ? (
    <Button
      small={true}
      noGrow={true}
      onClick={() => {
        setBadge(null, user.id);
        router.refresh();
      }}
    >
      Unlink
    </Button>
  ) : (
    <StyledLink href={`/check-in?assign=${user.id}`}>Assign</StyledLink>
  );
}
