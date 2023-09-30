import { requirePermission } from "@/serverFunctions/user/requirePermission";
import fs from "fs/promises";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import crypto from "crypto";

type Props = {};

export async function GET(request: Request, {}: Props) {
  await requirePermission("manageQr");

  const id = crypto.randomUUID();
  const token = jwt.sign({ id }, process.env.NEXTAUTH_SECRET as string);

  const url = new URL("https://dash.tedxcolumbialakeyouth.com/qr");
  url.searchParams.append("token", token);

  const qr = await QRCode.toBuffer("URL:" + url.toString(), {
    errorCorrectionLevel: "M",
    type: "png",
    scale: 30,
  });

  return new Response(qr, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
