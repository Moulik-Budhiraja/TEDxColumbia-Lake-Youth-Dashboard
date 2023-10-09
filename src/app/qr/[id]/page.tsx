import Header from "@/components/Header/Header";
import { prisma } from "@/db";
import { Jwt } from "@/types/jwtTypes";
import jwt from "jsonwebtoken";

type QrProps = {
  params: {
    id: string;
  };
};

export default async function Qr({ params }: QrProps) {
  const state = {
    valid: true,
    id: "",
  };

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
