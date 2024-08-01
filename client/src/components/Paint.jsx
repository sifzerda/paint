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
          const hexagonSideLength = 50;
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = hexagonSideLength * Math.cos(angle);
            const y = hexagonSideLength * Math.sin(angle);
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
        case 'pentagon':
          const pentagonPoints = [];
          const pentagonSideLength = 50;
          for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 / 5) * i;
            const x = pentagonSideLength * Math.cos(angle);
            const y = pentagonSideLength * Math.sin(angle);
            pentagonPoints.push({ x, y });
          }
          newShape = new fabric.Polygon(pentagonPoints, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
        case 'triangle':
          const trianglePoints = [];
          const triangleSideLength = 100;
          for (let i = 0; i < 3; i++) {
            const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
            const x = triangleSideLength * Math.cos(angle);
            const y = triangleSideLength * Math.sin(angle);
            trianglePoints.push({ x, y });
          }
          newShape = new fabric.Polygon(trianglePoints, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
        case 'rightAngleTriangle':
          const rightAngleTrianglePoints = [
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 0, y: 100 },
          ];
          newShape = new fabric.Polygon(rightAngleTrianglePoints, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
        case 'heart':
          // Create a new fabric.Path using the provided heart path data
          newShape = new fabric.Path(`
            M10,30 
            A20,20,0,0,1,50,30 
            A20,20,0,0,1,90,30 
            Q90,60,50,90 
            Q10,60,10,30
          `, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
        case 'star':
          newShape = new fabric.Path(`
              M 50% 0%
              L 61% 35%
              L 98% 35%
              L 68% 57%
              L 79% 91%
              L 50% 70%
              L 21% 91%
              L 32% 57%
              L 2% 35%
              L 39% 35%
              Z
            `, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
        case 'speechBubble':
          newShape = new fabric.Path(`
              M 0% 0%
              L 100% 0%
              L 100% 75%
              L 75% 75%
              L 75% 100%
              L 50% 75%
              L 0% 75%
              Z
            `, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
        case 'thoughtBubble':
          newShape = new fabric.Path(`
              M 30 10
              Q 20 0 10 0
              Q 0 0 0 10
              Q 0 20 10 20
              Q 20 20 20 10
              Q 20 0 30 0
              Z
              M 20 20
              L 20 30
              L 30 30
              L 30 20
            `, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
        case 'leftArrow':
          newShape = new fabric.Path(`
            M 40% 0%
            L 40% 20%
            L 100% 20%
            L 100% 80%
            L 40% 80%
            L 40% 100%
            L 0% 50%
            Z
            `, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
        case 'downArrow':
          newShape = new fabric.Path(`
          M 52% 97%,
          L 17% 60%,
          L 34% 60%,
          L 34% 0%,
          L 71% 0%,
          L 70% 60%,
          L 85% 60%
          Z
            `, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
        case 'upArrow':
          newShape = new fabric.Path(`
          M 52% 3%, 
          L 17% 40%, 
          L 34% 40%, 
          L 34% 100%, 
          L 71% 100%, 
          L 70% 40%, 
          L 85% 40%
            Z
            `, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
        case 'rightArrow':
          newShape = new fabric.Path(`
            M 0% 20%
            L 60% 20%
            L 60% 0%
            L 100% 50%
            L 60% 100%
            L 60% 80%
            L 0% 80%
            Z
            `, {
            left: 100,
            top: 100,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushWidth,
          });
          break;
        case 'square':
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
        case 'lightningBolt':
          newShape = new fabric.Path(`
              M 20 0
              L 40 30
              L 30 30
              L 20 50
              L 40 50
              L 20 100
              L 30 50
              L 50 50
              Z
            `, {
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
      <button onClick={() => drawShape('pentagon')}>Draw Pentagon</button>
      <button onClick={() => drawShape('triangle')}>Draw Triangle</button>
      <button onClick={() => drawShape('rightAngleTriangle')}>Draw Right Angle Triangle</button>
      <button onClick={() => drawShape('heart')}>Draw Heart</button>
      <button onClick={() => drawShape('star')}>Draw Star</button>
      <button onClick={() => drawShape('speechBubble')}>Draw Speech Bubble</button>
      <button onClick={() => drawShape('thoughtBubble')}>Draw Thought Bubble</button>
      <button onClick={() => drawShape('leftArrow')}>Draw Left Arrow</button>
      <button onClick={() => drawShape('downArrow')}>Draw Down Arrow</button>
      <button onClick={() => drawShape('upArrow')}>Draw Up Arrow</button>
      <button onClick={() => drawShape('rightArrow')}>Draw Right Arrow</button>
      <button onClick={() => drawShape('square')}>Draw Square</button>
      <button onClick={() => drawShape('lightningBolt')}>Draw Lightning Bolt</button>
      <button onClick={deleteSelectedObject}>Delete Selected Object</button>
      <div>
        <label>
          Brush Color:
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
        </label>
        <label>
          Brush Width:
          <input
            type="range"
            min="1"
            max="50"
            value={brushWidth}
            onChange={(e) => setBrushWidth(parseInt(e.target.value, 10))}
          />
        </label>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PaintApp;