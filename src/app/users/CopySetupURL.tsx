"use client";

import Button from "@/components/Button/Button";

type Props = {
  url: string;
};

export default function CopySetupURL({ url }: Props) {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(url);
        return "success";
      }}
    >
      Copy
    </Button>
  );
}
