import Header from "@/components/Header/Header";
import { prisma } from "@/db";
import { Jwt } from "@/types/jwtTypes";
import jwt from "jsonwebtoken";

type QrProps = {
  searchParams: {
    token: string;
  };
};

export default async function Qr({ searchParams }: QrProps) {
  const state = {
    valid: true,
    id: "",
  };

  jwt.verify(
    searchParams.token ?? "",
    process.env.NEXTAUTH_SECRET as string,
    (err, decoded) => {
      if (err || !decoded) {
        console.log("Invalid token");
        state.valid = false;
      } else {
        console.log(decoded);
        state.id = (decoded as Jwt).id;
      }
    }
  );

  return (
    <div className="h-screen">
      <Header
        title="Validate QR Code"
        description="Validate a QR code for a badge"
      ></Header>

      <div className="flex flex-col items-center mt-8 gap-8">
        {state.valid && (
          <div className="text-center">
            <div className="font-bold">Valid token:</div>
            <div className="text-sm">{state.id}</div>
          </div>
        )}
      </div>
    </div>
  );
}
