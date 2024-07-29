// basic vanilla JS paint app without npm dependencies

import { useState, useRef } from 'react';
//import spinner from '../assets/spinner.gif';

const Paint = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [pencilSelected, setPencilSelected] = useState(false);

  const startDrawing = (e) => {
    if (pencilSelected) {
      setDrawing(true);
      draw(e);
    }
  };

  const stopDrawing = () => {
    if (pencilSelected) {
      setDrawing(false);
      const ctx = canvasRef.current.getContext('2d');
      ctx.beginPath(); // Start a new path to prevent connecting lines
    }
  };

  const draw = (e) => {
    if (!drawing || !pencilSelected) return;

    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = 5; // Fixed brush size
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000'; // Fixed color

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handlePencilClick = () => {
    setPencilSelected(true);
  };

  return (
    <div className="paint">
      <button onClick={handlePencilClick} className="pencil-button">
        Pencil
      </button>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        className="paint-canvas"
      />
    </div>
  );
};

export default Paint;