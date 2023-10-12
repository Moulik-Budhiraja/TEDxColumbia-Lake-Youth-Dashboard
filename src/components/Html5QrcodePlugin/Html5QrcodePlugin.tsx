import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import "./qrscanner.css";
import Button from "../Button/Button";

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

const createConfig = (props: Props) => {
  let config = {
    fps: 10,
    qrbox: 250,
    aspectRatio: 1.0,
    disableFlip: false,
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props: Props) => {
  const config = createConfig(props);
  const [scanning, setScanning] = useState(false);
  const [htmlQRCode, setHtmlQRCode] = useState<Html5Qrcode>();

  useEffect(() => {
    setHtmlQRCode(new Html5Qrcode(qrcodeRegionId));
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
    htmlQRCode
      ?.start(
        { facingMode: "environment" },
        { fps: config.fps, aspectRatio: 1.0 },
        (decodedText, decodedResult) => {
          const stopCam = props.qrCodeSuccessCallback(decodedText);
          if (stopCam) {
            stopScanning();
          }
        },
        () => {}
      )
      .then(() => {
        setScanning(true);
        props.onStartScanning?.();
      });
  };

  const stopScanning = () => {
    htmlQRCode?.stop().then(() => {
      setScanning(false);
      props.onStopScanning?.();
    });
  };

  return (
    <div className="md:max-w-md w-full">
      <div
        id={qrcodeRegionId}
        className="aspect-square m-2 p-2 border-2 bg-slate-400 rounded-md dark:bg-slate-700 dark:border-slate-600"
      ></div>
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
