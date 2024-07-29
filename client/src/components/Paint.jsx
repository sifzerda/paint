import { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

const PaintApp = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(5);
  const [brushType, setBrushType] = useState('pencil');

  useEffect(() => {
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    fabricCanvas.current.freeDrawingBrush.color = brushColor;
    fabricCanvas.current.freeDrawingBrush.width = brushWidth;

    const handleKeyDown = (event) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        deleteSelectedObject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      fabricCanvas.current.dispose();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.freeDrawingBrush.color = brushColor;
      fabricCanvas.current.freeDrawingBrush.width = brushWidth;

      switch (brushType) {
        case 'pencil':
          fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas.current);
          break;
        case 'airbrush':
          fabricCanvas.current.freeDrawingBrush = new fabric.SprayBrush(fabricCanvas.current);
          fabricCanvas.current.freeDrawingBrush.decimate = 0.1;
          break;
        case 'pattern':
          const img = new Image();
          img.src = 'https://fabricjs.com/assets/honey_im_subtle.png';
          img.onload = () => {
            const patternBrush = new fabric.PatternBrush(fabricCanvas.current);
            patternBrush.source = img;
            fabricCanvas.current.freeDrawingBrush = patternBrush;
          };
          break;
        case 'marker':
          fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas.current);
          fabricCanvas.current.freeDrawingBrush.strokeLineCap = 'round';
          fabricCanvas.current.freeDrawingBrush.strokeLineJoin = 'round';
          break;
        case 'crayon':
          fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas.current);
          fabricCanvas.current.freeDrawingBrush.strokeLineCap = 'round';
          fabricCanvas.current.freeDrawingBrush.strokeLineJoin = 'round';
          fabricCanvas.current.freeDrawingBrush.shadow = new fabric.Shadow({
            color: brushColor,
            blur: 10,
            offsetX: 0,
            offsetY: 0,
          });
          break;
        case 'calligraphy':
          fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas.current);
          fabricCanvas.current.freeDrawingBrush.strokeLineCap = 'round';
          fabricCanvas.current.freeDrawingBrush.strokeLineJoin = 'round';
          break;
        case 'circle':
          const circleBrush = new fabric.CircleBrush(fabricCanvas.current);
          circleBrush.color = brushColor;
          circleBrush.width = brushWidth;
          fabricCanvas.current.freeDrawingBrush = circleBrush;
          break;
        default:
          fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas.current);
      }
    }
  }, [brushColor, brushWidth, brushType]);

  useEffect(() => {
    const handleResize = () => {
      fabricCanvas.current.setWidth(window.innerWidth);
      fabricCanvas.current.setHeight(window.innerHeight);
      fabricCanvas.current.renderAll();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDrawingToggle = () => {
    setIsDrawing((prevIsDrawing) => {
      const newDrawingState = !prevIsDrawing;
      fabricCanvas.current.isDrawingMode = newDrawingState;
      return newDrawingState;
    });
  };

  const handleSave = () => {
    const canvas = fabricCanvas.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'drawing.png';
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
        default:
          return;
      }
      canvas.add(newShape);
    }
  };

  const deleteSelectedObject = () => {
    const activeObject = fabricCanvas.current.getActiveObject();
    if (activeObject) {
      fabricCanvas.current.remove(activeObject);
      fabricCanvas.current.discardActiveObject().renderAll();
    }
  };

  return (
    <div>
      <button onClick={handleDrawingToggle}>
        {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
      </button>
      <button onClick={() => setBrushType('pencil')}>Pencil</button>
      <button onClick={() => setBrushType('airbrush')}>Airbrush</button>
      <button onClick={() => setBrushType('pattern')}>Pattern Brush</button>
      <button onClick={() => setBrushType('marker')}>Marker</button>
      <button onClick={() => setBrushType('crayon')}>Crayon</button>
      <button onClick={() => setBrushType('calligraphy')}>Calligraphy Pen</button>
      <button onClick={() => setBrushType('circle')}>Circle Brush</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => drawShape('rectangle')}>Draw Rectangle</button>
      <button onClick={() => drawShape('circle')}>Draw Circle</button>
      <button onClick={deleteSelectedObject}>Delete</button>

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

      <canvas ref={canvasRef} />
    </div>
  );
};

export default PaintApp;