"use client";

import Header from "@/components/Header/Header";
import { generateQr } from "./generateQr";
import { useEffect, useState } from "react";

export default function GenerateQR() {
  const [qr, setQr] = useState("");
  const [id, setId] = useState("");

  const newQr = async () => {
    const { qr, id } = await generateQr();

    setQr(qr);
    setId(id);
  };

  const download = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = "qr.png";
    link.click();
  };

  useEffect(() => {
    newQr();
  }, []);

  return (
    <div className="h-screen">
      <Header
        title="Generate QR Code"
        description="Generate a QR code for a badge"
      ></Header>

      <div className="flex flex-col items-center mt-8 gap-8">
        <img src={qr} alt="QR code" className="max-w-[16rem]" />
        <div className="text-center">
          <div className="font-bold">Id:</div>
          <div className="text-sm">{id}</div>
        </div>
        <div className="flex gap-4">
          <button
            className="border border-slate-600 p-2 rounded-md"
            onClick={newQr}
          >
            Generate New QR code
          </button>
          <button
            className="border border-slate-600 p-2 rounded-md"
            onClick={download}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
