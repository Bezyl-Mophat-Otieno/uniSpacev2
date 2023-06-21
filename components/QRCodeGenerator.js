import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import styles from '../styles/QrCodegenerator.module.css';
import { useState } from 'react';
import Image from 'next/image';

const QRCodeGenerator = () => {
  const [url , setUrl]= useState("")
  const qrValue = 'https://example.com'; // The value you want to encode in the QR code

  const download = () => {
    const canvas = document.getElementById('qrEl');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
      setUrl(pngUrl)
    // let downloadLink = document.createElement('a');
    // downloadLink.href = pngUrl;
    // downloadLink.download = 'qr.png';

    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);

  }
  return (
    <div className={styles.qrContainer}>
      <QRCode value={qrValue} renderAs="canvas" id='qrEl'/>
    </div>
  );
};

export default QRCodeGenerator;
