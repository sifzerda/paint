import { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

const PaintApp = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(5);
  const [fileFormat, setFileFormat] = useState('png');

  useEffect(() => {
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Set initial pencil options
    fabricCanvas.current.freeDrawingBrush.color = brushColor;
    fabricCanvas.current.freeDrawingBrush.width = brushWidth;

    // Cleanup on unmount
    return () => {
      fabricCanvas.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.freeDrawingBrush.color = brushColor;
      fabricCanvas.current.freeDrawingBrush.width = brushWidth;
    }
  }, [brushColor, brushWidth]);

  useEffect(() => {
    const handleResize = () => {
      fabricCanvas.current.setWidth(window.innerWidth);
      fabricCanvas.current.setHeight(window.innerHeight);
      fabricCanvas.current.renderAll();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size setup

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePencilTool = () => {
    setIsDrawing(prevIsDrawing => {
      const newDrawingState = !prevIsDrawing;
      fabricCanvas.current.isDrawingMode = newDrawingState;
      return newDrawingState;
    });
  };
      {/* FILE FORMAT CHOICE DROPDOWN -----------------------------------------------*/ }
  const handleSave = () => {
    const canvas = fabricCanvas.current;
    if (canvas) {
      const dataURL = canvas.toDataURL(`image/${fileFormat}`);
      // Trigger download
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `drawing.${fileFormat}`;
      link.click();
    }
  };

  const drawShape = (shape) => {
    const canvas = fabricCanvas.current;
    if (canvas) {
      let newShape;
      switch (shape) {
        case 'rectangle':
          newShape = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
            width: 100,
            height: 100,
          });
          break;
        case 'circle':
          newShape = new fabric.Circle({
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
            radius: 50,
          });
          break;
        // Add other shapes similarly
        default:
          return;
      }
      canvas.add(newShape);
    }
  };

  return (
    <div>
      <button onClick={handlePencilTool}>
        {isDrawing ? 'Stop Drawing' : 'Pencil Tool'}
      </button>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => drawShape('rectangle')}>Draw Rectangle</button>
      <button onClick={() => drawShape('circle')}>Draw Circle</button>
      
      <input 
        type="color" 
        value={brushColor} 
        onChange={(e) => setBrushColor(e.target.value)} 
        title="Brush Color"
      />
      <input 
        type="range" 
        min="1" 
        max="20" 
        value={brushWidth} 
        onChange={(e) => setBrushWidth(parseInt(e.target.value, 10))} 
        title="Brush Width"
      />
      {/* FILE FORMAT CHOICE DROPDOWN -----------------------------------------------*/ }
      <select value={fileFormat} onChange={(e) => setFileFormat(e.target.value)}>
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
        <option value="bmp">BMP</option>
        <option value="gif">GIF</option>
      </select>

      <canvas ref={canvasRef} />
    </div>
  );
};

export default PaintApp;