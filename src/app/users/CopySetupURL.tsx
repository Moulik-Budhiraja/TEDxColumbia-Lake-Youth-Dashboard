"use client";

import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

type Props = {
  url: string;
};

export default function CopySetupURL({ url }: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(url);
        router.refresh();
        return "success";
      }}
    >
      Copy
    </Button>
  );
}
