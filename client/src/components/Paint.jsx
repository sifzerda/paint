import { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

const PaintApp = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLineDrawing, setIsLineDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(5);
  const [brushType, setBrushType] = useState('pencil');
  const lineRef = useRef(null);

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

  useEffect(() => {
    const canvas = fabricCanvas.current;

    const startLine = (event) => {
      if (isLineDrawing) {
        const pointer = canvas.getPointer(event.e);
        lineRef.current = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
          stroke: brushColor,
          strokeWidth: brushWidth,
          selectable: false,
        });
        canvas.add(lineRef.current);
      }
    };

    const drawLine = (event) => {
      if (isLineDrawing && lineRef.current) {
        const pointer = canvas.getPointer(event.e);
        lineRef.current.set({ x2: pointer.x, y2: pointer.y });
        canvas.renderAll();
      }
    };

    const endLine = () => {
      if (isLineDrawing && lineRef.current) {
        lineRef.current.setCoords();
        lineRef.current.selectable = true;
        lineRef.current = null;
      }
    };

    canvas.on('mouse:down', startLine);
    canvas.on('mouse:move', drawLine);
    canvas.on('mouse:up', endLine);

    return () => {
      canvas.off('mouse:down', startLine);
      canvas.off('mouse:move', drawLine);
      canvas.off('mouse:up', endLine);
    };
  }, [isLineDrawing, brushColor, brushWidth]);

  const handleDrawingToggle = () => {
    setIsDrawing((prevIsDrawing) => {
      const newDrawingState = !prevIsDrawing;
      fabricCanvas.current.isDrawingMode = newDrawingState;
      return newDrawingState;
    });
  };

  const handleLineDrawingToggle = () => {
    setIsLineDrawing((prevIsLineDrawing) => !prevIsLineDrawing);
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
        case 'hexagon':
          const hexagonPoints = [];
          const sideLength = 50;
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = sideLength * Math.cos(angle);
            const y = sideLength * Math.sin(angle);
            hexagonPoints.push({ x, y });
          }
          newShape = new fabric.Polygon(hexagonPoints, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
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
      <button onClick={handleLineDrawingToggle}>
        {isLineDrawing ? 'Stop Line Drawing' : 'Start Line Drawing'}
      </button>
      <button onClick={() => setBrushType('pencil')}>Pencil</button>
      <button onClick={() => setBrushType('airbrush')}>Airbrush</button>
      <button onClick={() => setBrushType('pattern')}>Pattern Brush</button>
      <button onClick={() => setBrushType('circle')}>Circle Brush</button>
      <button onClick={handleSave}>💾 SAVE</button>
      <button onClick={() => drawShape('rectangle')}>Draw Rectangle</button>
      <button onClick={() => drawShape('circle')}>Draw Circle</button>
      <button onClick={() => drawShape('hexagon')}>Draw Hexagon</button>
      <button onClick={deleteSelectedObject}>🗑️ DELETE</button>

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