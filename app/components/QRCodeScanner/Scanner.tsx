"use client";

import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanner = ({
  onScanSuccess,
}: {
  onScanSuccess: (decodedText: string) => void;
}) => {
  const qrboxFunction = (viewfinderWidth: number, viewfinderHeight: number) => {
    let minEdgePercentage = 0.7; // 70%
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    return {
      width: qrboxSize,
      height: qrboxSize,
    };
  };

  const onScanFailure = (err: any) => {
    console.info(`Code not scanned`);
    console.error("Couldn't scan code", err);
  };

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: qrboxFunction,
      aspectRatio: 1,
      disableFlip: false,
      
    };

    const verbose = true;

    const html5QrCodeScanner = new Html5QrcodeScanner(
      "scanner",
      config,
      verbose
    );

    html5QrCodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      html5QrCodeScanner.clear().catch((err) => {
        console.error("Failed to clear the QR code scanner", err);
      });
    };
  }, [onScanSuccess]);

  return (
    <>
      <p>QrCodeScanner</p>
      <div id="scanner"></div>
    </>
  );
};

export default Scanner;
