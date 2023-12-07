import React from "react";
import QRCode from "react-qr-code";
import { useRef } from "react";

function QrCode(props) {
  const qrRef = useRef();

  // const downloadQRCode = (e) => {
  //   e.preventDefault();
  //   let canvas = qrRef.current.querySelector("canvas");
  //   let image = canvas.toDataURL("image/png");
  //   let anchor = document.createElement("a");
  //   anchor.href = image;
  //   anchor.download = `qr-code.png`;
  //   document.body.appendChild(anchor);
  //   anchor.click();
  //   document.body.removeChild(anchor);
  //   setUrl("");
  // };

  return (
    <div>
      <QRCode ref={qrRef} title={props.title} value={props.value} size={250} />
    </div>
  );
}

export default QrCode;
