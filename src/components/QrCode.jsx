import React from "react";
import QRCode from "react-qr-code";

function QrCode(props) {
  return <QRCode title={props.title} value={props.value} size={250} />;
}

export default QrCode;
