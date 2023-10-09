"use server";

import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { requirePermission } from "@/serverFunctions/user/requirePermission";

export async function generateQr() {
  await requirePermission("manageQr");

  const id = crypto.randomUUID();

  const url = new URL(`https://dash.tedxcolumbialakeyouth.com/qr/${id}`);

  const qr = await QRCode.toDataURL("URL:" + url.toString(), {
    errorCorrectionLevel: "M",
    type: "image/png",
    scale: 30,
  });

  return {
    qr,
    id,
  };
}
