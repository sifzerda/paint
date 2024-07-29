import { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

const PaintApp = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Set initial pencil options
    fabricCanvas.current.freeDrawingBrush.color = '#000000'; // Black
    fabricCanvas.current.freeDrawingBrush.width = 5; // Brush width

    // Cleanup on unmount
    return () => {
      fabricCanvas.current.dispose();
    };
  }, []);

  const handlePencilTool = () => {
    setIsDrawing((prevIsDrawing) => {
      const newDrawingState = !prevIsDrawing;
      fabricCanvas.current.isDrawingMode = newDrawingState;
      return newDrawingState;
    });
  };

  return (
    <div>
      <button onClick={handlePencilTool}>
        {isDrawing ? 'Stop Drawing' : 'Pencil Tool'}
      </button>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PaintApp;