"use client";

import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { urlCopied } from "./urlCopied";

type Props = {
  url: string;
  userId: string;
};

export default function CopySetupURL({ url, userId }: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(url);
        urlCopied(userId).then(() => {
          router.refresh();
          return "success";
        });
      }}
    >
      Copy
    </Button>
  );
}
