return (
    <div>
      <div className="toolbar">
        <div className="toolbar-group">
          <h2>Brush Controls</h2>
          <button onClick={handleDrawingToggle}>{isDrawing ? 'Disable Drawing' : 'Enable Drawing'}</button>
          <button onClick={handleLineDrawingToggle}>{isLineDrawing ? 'Disable Line Drawing' : 'Enable Line Drawing'}</button>
          <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
          <input type="range" min="1" max="50" value={brushWidth} onChange={(e) => setBrushWidth(parseInt(e.target.value))} />
        </div>

        <div className="toolbar-group">
        <h2>Brush Types</h2>
      <button onClick={() => setBrushType('pencil')}>Pencil</button>
      <button onClick={() => setBrushType('airbrush')}>Airbrush</button>
      <button onClick={() => setBrushType('pattern')}>Pattern Brush</button>
      <button onClick={() => setBrushType('circle')}>Circle Brush</button>
        </div>


        <div className="toolbar-group">
          <h2>Shapes</h2>
          <button onClick={() => drawShape('rectangle')}>Rectangle</button>
          <button onClick={() => drawShape('square')}>Draw Square</button>
          <button onClick={() => drawShape('circle')}>Circle</button>
          <button onClick={() => drawShape('hexagon')}>Hexagon</button>
          <button onClick={() => drawShape('pentagon')}>Pentagon</button>
          <button onClick={() => drawShape('triangle')}>Triangle</button>
          <button onClick={() => drawShape('rightAngleTriangle')}>Right Angle Triangle</button>
          <button onClick={() => drawShape('octagon')}>Octagon</button>
          <button onClick={() => drawShape('heart')}>Heart</button>
          <button onClick={() => drawShape('star')}>Draw Star</button>
          <button onClick={() => drawShape('speechBubble')}>Draw Speech Bubble</button>
          <button onClick={() => drawShape('thoughtBubble')}>Draw Thought Bubble</button>
          <button onClick={() => drawShape('leftArrow')}>Draw Left Arrow</button>
      <button onClick={() => drawShape('downArrow')}>Draw Down Arrow</button>
      <button onClick={() => drawShape('upArrow')}>Draw Up Arrow</button>
      <button onClick={() => drawShape('rightArrow')}>Draw Right Arrow</button>
      <button onClick={() => drawShape('cross')}>Draw Cross</button>
      <button onClick={() => drawShape('lightningBolt')}>Draw Lightning Bolt</button>
        </div>




        <div className="toolbar-group">
          <h2>Actions</h2>
          <button onClick={handleSave}>Save</button>
          <button onClick={deleteSelectedObject}>Delete Object</button>
        </div>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default PaintApp;