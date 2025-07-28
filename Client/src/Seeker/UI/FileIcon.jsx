import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/webpack';

GlobalWorkerOptions.workerSrc = pdfjsWorker;

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const Thumbnail = ({ file }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPDF = async () => {
      const fileReader = new FileReader();
      fileReader.onload = async function () {
        const typedarray = new Uint8Array(this.result);

        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
      };

      fileReader.readAsArrayBuffer(file);
    };

    if (file) {
      renderPDF();
    }
  }, [file]);

  return (
    <canvas
      ref={canvasRef}
      className="mt-2 border rounded-lg shadow-md"
      style={{ maxWidth: '300px', height: 'auto' }}
    />
  );
};

export default Thumbnail;
