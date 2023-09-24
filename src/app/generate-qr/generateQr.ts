"use server";

import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export async function generateQr() {
  const id = crypto.randomUUID();
  const token = jwt.sign({ id }, process.env.NEXTAUTH_SECRET as string);

  const url = new URL("https://dash.tedxcolumbialakeyouth.com/qr");
  url.searchParams.append("token", token);

  const qr = await QRCode.toDataURL("URL:" + url.toString(), {
    errorCorrectionLevel: "M",
    type: "image/png",
    scale: 10,
  });

  return {
    qr,
    id,
  };
}
