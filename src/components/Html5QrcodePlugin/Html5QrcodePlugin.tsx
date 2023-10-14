import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import "./qrscanner.css";
import Button from "../Button/Button";
import QrScanner from "qr-scanner";
import { serverLog } from "@/serverFunctions/log/serverLog";

const qrcodeRegionId = "html5qr-code-full-region";

type Props = {
  fps?: number;
  scanning?: boolean;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  qrCodeSuccessCallback: (decodedText: string) => boolean | void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
  onStartScanning?: () => void;
  onStopScanning?: () => void;
};

const Html5QrcodePlugin = (props: Props) => {
  const [scanning, setScanning] = useState(false);
  const [scanner, setScanner] = useState<QrScanner>();

  useEffect(() => {
    setScanner(
      new QrScanner(
        document.getElementById("qr-target") as HTMLVideoElement,
        (result) => {
          props.qrCodeSuccessCallback(result.data);
        },
        {
          preferredCamera: "environment",
          highlightCodeOutline: true,
          highlightScanRegion: true,
          overlay: document.getElementById("overlay-div") as HTMLDivElement,
        }
      )
    );
  }, []);

  useEffect(() => {
    if (props.scanning === scanning) return;

    if (props.scanning) {
      startScanning();
    } else {
      stopScanning();
    }
  }, [props.scanning]);

  const startScanning = () => {
    scanner?.start();

    setScanning(true);
    props.onStartScanning?.();
  };

  const stopScanning = () => {
    scanner?.stop();

    setScanning(false);
    props.onStopScanning?.();
  };

  return (
    <div className="md:max-w-md w-full">
      <div
        id={qrcodeRegionId}
        className="aspect-square m-2 p-2 border-2 bg-slate-400 rounded-md dark:bg-slate-700 dark:border-slate-600"
      >
        <video id="qr-target"></video>
        <div id="overlay-div"></div>
      </div>
      <div className="flex justify-center">
        {!scanning ? (
          <Button
            key={1}
            onClick={() => {
              startScanning();
            }}
          >
            Start Cam
          </Button>
        ) : (
          <Button
            key={2}
            onClick={() => {
              stopScanning();
            }}
          >
            Stop Cam
          </Button>
        )}
      </div>
    </div>
  );
};

export default Html5QrcodePlugin;
