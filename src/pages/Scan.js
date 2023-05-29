import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@mui/material';
import JsPDF from 'jspdf';

const Scan = ({ show, setShow }) => {

  const GeneratePDF = () => {
    const corpus = new JsPDF('paysage', 'pt', 'a2');
    console.log("corpus", corpus);
    corpus.html(document.querySelector('#idQrCode'), {
      callback() {
        console.log("HTML added to PDF");
        corpus.save('QrCode.pdf');
      }
    });
  }
  
  return (
    <div className="App" style={{ display: show ? 'block' : 'none' }}  >
      <header className="App-header">
        
        <div style={{ marginLeft:30}} id='idQrCode' >
        <p style={{ marginLeft:50}} >Scan My QR Code</p>
      <QRCodeCanvas value="https://www.corpusls.com" size={250}  />
      </div>
        
      </header>
      <div style={{ marginLeft:45}} >
     
        <br/>
      <br/>
                <Button color="success" variant="contained" onClick={GeneratePDF}>
                  Télécharger
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button color="error" variant="contained" onClick={() => setShow(false)}>
                  Fermer
                </Button>
              </div>
    </div>
  );
};

export default Scan;
