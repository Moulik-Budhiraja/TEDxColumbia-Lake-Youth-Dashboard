import Header from "@/components/Header/Header";
import { prisma } from "@/db";
import { requirePermission } from "@/serverFunctions/user/requirePermission";
import { Jwt } from "@/types/jwtTypes";
import jwt from "jsonwebtoken";
import { notFound, redirect } from "next/navigation";

type QrProps = {
  params: {
    id: string;
  };
};

export default async function Qr({ params }: QrProps) {
  const scanner = await requirePermission("attendee");
  const state = {
    valid: true,
    id: "",
  };

  console.log("d8afa27c-4d83-49ac-b3ca-ab1865e006d9");

  const user = await prisma.user.findUnique({
    where: {
      qr: params.id,
    },
  });

  if (!user) {
    return notFound();
  }

  const targetURL = `/profile/${user?.firstName
    .toLowerCase()
    .replace(/ /g, "-")}-${user?.lastName.toLowerCase().replace(/ /g, "-")}`;

  await prisma.scans.create({
    data: {
      scannerId: scanner.id,
      scannedId: user.id,
    },
  });

  return redirect(targetURL);

  return (
    <div className="h-screen">
      <Header
        title="Validate QR Code"
        description="Validate a QR code for a badge"
      ></Header>

      <div className="flex flex-col items-center mt-8 gap-8">
        {state.valid && (
          <div className="text-center">
            <div className="font-bold">
              {params.id ? (
                <span>Got token: {params.id}</span>
              ) : (
                <span>Invalid token</span>
              )}
            </div>
            <div className="text-sm">{state.id}</div>
          </div>
        )}
      </div>
    </div>
  );
}
