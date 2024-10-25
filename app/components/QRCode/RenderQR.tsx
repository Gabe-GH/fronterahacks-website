"use client";

import Image from "next/image";

const RenderQR = (props: any) => {
  return (
    <Image
      src={props.qrcode}
      width={props.size}
      height={props.size}
      alt="user's qr code"
    />
  );
};

export default RenderQR;
