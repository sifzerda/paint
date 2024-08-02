// font selection inside same component

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
  const [recentColors, setRecentColors] = useState([]);
  const [tempColor, setTempColor] = useState('#000000'); // New state for pending color
  const [zoom, setZoom] = useState(1); // State to manage zoom level
  const [selectedFont, setSelectedFont] = useState('Arial'); // New state for selected font

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

  useEffect(() => {
    const canvas = fabricCanvas.current;
    if (canvas) {
      canvas.setZoom(zoom); // Apply the zoom level to the canvas
    }
  }, [zoom]);

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
        case 'octagon':
          const octagonPoints = [];
          const octagonSideLength = 50;
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI / 4) * i;
            const x = octagonSideLength * Math.cos(angle);
            const y = octagonSideLength * Math.sin(angle);
            octagonPoints.push({ x, y });
          }
          newShape = new fabric.Polygon(octagonPoints, {
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
        case 'cross':
          newShape = new fabric.Path(`
              M 20% 0%
              L 0% 20%
              L 30% 50%
              L 0% 80%
              L 20% 100%
              L 50% 70%
              L 80% 100%
              L 100% 80%
              L 70% 50%
              L 100% 20%
              L 80% 0%
              L 50% 30%
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

          case 'ellipse':
            newShape = new fabric.Ellipse({
              left: 250,
              top: 100,
              rx: 40,
              ry: 20,
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

  const addTextBox = () => {
    const canvas = fabricCanvas.current;
    if (canvas) {
      const textbox = new fabric.Textbox('Enter text here', {
        left: 100,
        top: 100,
        width: 200,
        fontSize: 20,
        fontFamily: selectedFont, // Apply selected font
        fill: brushColor,
        editable: true,
        borderColor: 'gray',
        cornerColor: 'blue',
        cornerSize: 8,
        transparentCorners: false,
      });
      canvas.add(textbox);
      canvas.setActiveObject(textbox);
      canvas.renderAll();
    }
  };


  const rotateSelectedObject = () => {
    const canvas = fabricCanvas.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.rotate((activeObject.angle || 0) + 90);
      canvas.renderAll();
    }
  };

  const flipVertical = () => {
    const canvas = fabricCanvas.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.toggle('flipY');
      canvas.renderAll();
    }
  };

  const flipHorizontal = () => {
    const canvas = fabricCanvas.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.toggle('flipX');
      canvas.renderAll();
    }
  };

  const deleteSelectedObject = () => {
    const activeObject = fabricCanvas.current.getActiveObject();
    if (activeObject) {
      fabricCanvas.current.remove(activeObject);
      fabricCanvas.current.discardActiveObject().renderAll();
    }
  };

  const handleBrushColorChange = (color) => {
    setTempColor(color); // Update pending color
  };

  const handleAddColorClick = () => {
    setBrushColor(tempColor); // Confirm color change
    setRecentColors((prevColors) => {
      const newColors = [tempColor, ...prevColors.filter(c => c !== tempColor)];
      return newColors.slice(0, 10);
    });
  };

  const handleRecentColorClick = (color) => {
    setBrushColor(color);
  };

  const handleZoomChange = (event) => {
    const zoomLevel = parseFloat(event.target.value);
    setZoom(zoomLevel);
  };

  return (
    <div className='paint'>
      <div className='paint-toolbar'>

        <h2>Draw Toggle</h2>
        <div className='button-container'>
          <button onClick={handleDrawingToggle}>
            {isDrawing ? 'Stop Draw' : 'Start Draw'}
          </button>
          <button onClick={handleLineDrawingToggle}>
            {isLineDrawing ? 'Stop Line' : 'Start Line'}
          </button>
        </div>

        <h2>Actions</h2>
        <div className='button-container'>
          <button onClick={handleSave}>💾</button>
          <button onClick={deleteSelectedObject}>🗑️</button>
          <button onClick={rotateSelectedObject}>↻</button>
          <button onClick={flipVertical}>↕️</button>
          <button onClick={flipHorizontal}>↔️</button>
        </div>

        <h2>Text</h2>
        <div className='button-container'>
        <button onClick={addTextBox}> &#91;A&#93; </button>
        <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value='Roboto'>Roboto</option>
            <option value='Tahoma'>Tahoma</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>

        <h2>Brushes</h2>
        <div className='button-container'>
          <button onClick={() => setBrushType('pencil')}>✏️</button>
          <button onClick={() => setBrushType('airbrush')}>🔫</button>
          <button onClick={() => setBrushType('pattern')}>Pattern Brush</button>
          <button onClick={() => setBrushType('circle')}>◎</button>
        </div>

        <h2>Zoom</h2>
        <div className='button-container'>
        <span role="img" aria-label="Magnifying Glass">🔎</span>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={handleZoomChange}
          />
        </div>

        <h2>Shapes</h2>
        <div className='button-container'>
          <button onClick={() => drawShape('rectangle')}>▯</button>
          <button onClick={() => drawShape('circle')}>⚪️</button>
          <button onClick={() => drawShape('hexagon')}>⬡</button>
          <button onClick={() => drawShape('pentagon')}>⬠</button>
          <button onClick={() => drawShape('triangle')}>ꕔ</button>
          <button onClick={() => drawShape('rightAngleTriangle')}>◺</button>
          <button onClick={() => drawShape('heart')}>❤️</button>
          <button onClick={() => drawShape('star')}>⭐</button>
          <button onClick={() => drawShape('speechBubble')}>🗨️</button>
          <button onClick={() => drawShape('thoughtBubble')}>💭</button>
          <button onClick={() => drawShape('leftArrow')}>⇦</button>
          <button onClick={() => drawShape('downArrow')}>⇩</button>
          <button onClick={() => drawShape('upArrow')}>⇧</button>
          <button onClick={() => drawShape('rightArrow')}>⇨</button>
          <button onClick={() => drawShape('cross')}>❌</button>
          <button onClick={() => drawShape('square')}>⬜️</button>
          <button onClick={() => drawShape('ellipse')}>⬯</button>
          <button onClick={() => drawShape('lightningBolt')}>⚡</button>        
        </div>

        <div>
          <h2>Config</h2>

          <div className='button-container'>
            <h3>Brush Color:</h3>

            <input
            type='color'
            value={tempColor}
            onChange={(e) => handleBrushColorChange(e.target.value)}
          />
          <button onClick={handleAddColorClick}>Use</button>



          <div className='button-container'>
            <h3>Recent Colors:</h3>
            {recentColors.map((color, index) => (
              <button
                key={index}
                style={{ 
                  backgroundColor: color, 
                  width: 40, 
                  height: 40, 
                  border: 'none', 
                  margin: 2 }}
                onClick={() => handleRecentColorClick(color)}
              />
            ))}
          </div>

          <div className='button-container'>
          <h3>
            Brush Width:
            <input
              type="range"
              min="1"
              max="50"
              value={brushWidth}
              onChange={(e) => setBrushWidth(parseInt(e.target.value, 10))}
            />
          </h3>
          </div>


        </div>
      </div>
      </div>


      <canvas ref={canvasRef} />
    </div>
  );
};

export default PaintApp;