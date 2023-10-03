"use client";

import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { urlCopied } from "./urlCopied";
import { parseEmailTemplate } from "@/serverFunctions/email/parseEmailTemplate";

type Props = {
  email: string;
  userId: string;
};

export default function CopySetupURL({ email, userId }: Props) {
  const router = useRouter();

  return (
    <Button
      small={true}
      noGrow={true}
      onClick={() => {
        parseEmailTemplate(userId).then((emailContent) => {
          const targetURL = new URL(`mailto:${email}`);
          targetURL.searchParams.append("subject", emailContent.subject ?? "");
          targetURL.searchParams.append("body", emailContent.body ?? "");

          window.open(targetURL.toString(), "_blank", "noopener,noreferrer");
          urlCopied(userId).then(() => {
            router.refresh();
            return "success";
          });
        });
      }}
    >
      Email
    </Button>
  );
}
