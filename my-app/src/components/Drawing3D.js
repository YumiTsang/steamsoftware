import React, { useState, useRef, useEffect } from 'react';
import '../styles/Drawing3D.css';

const Drawing3D = () => {
  const [activeTab, setActiveTab] = useState('board');
  const [showAIHelp, setShowAIHelp] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
    ctxRef.current = ctx;
  }, [brushSize, brushColor]);

  const getPointerPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handlePointerDown = (e) => {
    drawing.current = true;
    const pos = getPointerPos(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(pos.x, pos.y);
    e.preventDefault();
  };

  const handlePointerMove = (e) => {
    if (!drawing.current) return;
    const pos = getPointerPos(e);
    ctxRef.current.lineTo(pos.x, pos.y);
    ctxRef.current.stroke();
    e.preventDefault();
  };

  const handlePointerUp = (e) => {
    if (!drawing.current) return;
    ctxRef.current.closePath();
    drawing.current = false;
    e.preventDefault();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = async () => {
    try {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL('image/png');

      const payload = {
        userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userId : 'anonymous',
        title: `Drawing ${new Date().toISOString()}`,
        image: dataUrl,
      };

      const res = await fetch('http://localhost:5000/api/drawing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      alert('Saved drawing: ' + data.id);
    } catch (err) {
      console.error(err);
      alert('Failed to save drawing');
    }
  };

  const tabs = [
    { id: 'board', label: 'Art Board', icon: '🎨' },
    { id: 'ai-help', label: 'Computer AI Help', icon: '🤖' },
  ];

  return (
    <div className="drawing-3d">
      <header className="drawing-header">
        <h1>3D Drawing Studio</h1>
        <p>Create and design with advanced drawing tools</p>
      </header>

      <div className="drawing-container">
        {/* 標籤導航 */}
        <div className="tab-navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Art Board */}
        {activeTab === 'board' && (
          <section className="art-board-section">
            <div className="board-content">
              <canvas
                ref={canvasRef}
                className="drawing-canvas"
                width={1000}
                height={700}
                style={{ border: '1px solid #ddd', backgroundColor: 'white' }}
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
              ></canvas>
            </div>

            {/* 工具欄 */}
            <div className="tools-panel">
              <div className="tools-group">
                <h3>Drawing Tools</h3>
                <div className="tools-grid">
                  <button className="tool-btn" title="Frame">📐 Frame</button>
                  <button className="tool-btn" title="Pen">✏️ Pen</button>
                  <button className="tool-btn" title="Paint">🎨 Paint</button>
                  <button className="tool-btn" title="Eraser" onClick={() => { ctxRef.current.globalCompositeOperation = 'destination-out'; }}>🧹 Eraser</button>
                  <button className="tool-btn" title="Color">🎨 Color</button>
                  <button className="tool-btn" title="Shape">⭕ Shape</button>
                  <button className="tool-btn" title="Text">📝 Text</button>
                  <button className="tool-btn" title="Icon">⭐ Icon</button>
                </div>
              </div>

              <div className="tools-group">
                <h3>Properties</h3>
                <div className="property-item">
                  <label>Brush Size</label>
                  <input type="range" min="1" max="50" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value, 10))} />
                </div>
                <div className="property-item">
                  <label>Opacity</label>
                  <input type="range" min="0" max="100" defaultValue="100" onChange={(e) => { ctxRef.current.globalAlpha = parseInt(e.target.value, 10) / 100; }} />
                </div>
                <div className="property-item">
                  <label>Color</label>
                  <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
                </div>
              </div>

              <div className="tools-group">
                <h3>Actions</h3>
                <button className="action-btn primary" onClick={saveDrawing}>Save Drawing</button>
                <button className="action-btn secondary" onClick={clearCanvas}>Clear Canvas</button>
                <button className="action-btn secondary" onClick={() => { /* Undo not implemented */ }}>Undo</button>
              </div>

              <button className="ai-help-toggle" onClick={() => setShowAIHelp(!showAIHelp)}>🤖 Get AI Help</button>
            </div>
          </section>
        )}

        {/* AI Help */}
        {activeTab === 'ai-help' && (
          <section className="ai-help-section">
            <div className="ai-help-card">
              <h2>Computer AI Help</h2>
              <p className="ai-description">Get intelligent suggestions and assistance for your drawings</p>

              <div className="ai-features">
                <div className="feature">
                  <span className="feature-icon">💡</span>
                  <h4>Design Suggestions</h4>
                  <p>Get AI-powered design suggestions based on your current drawing</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎯</span>
                  <h4>Composition Help</h4>
                  <p>Tips on composition, balance, and visual hierarchy</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🌈</span>
                  <h4>Color Palette</h4>
                  <p>Intelligent color palette recommendations</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">📐</span>
                  <h4>Shape Recognition</h4>
                  <p>Identify and improve shapes in your drawings</p>
                </div>
              </div>

              <div className="ai-chat">
                <div className="chat-messages">
                  <div className="message ai-message"><p>Hi! I'm your AI drawing assistant. How can I help you today?</p></div>
                  <div className="message ai-message"><p>You can ask me for design suggestions, color advice, or composition tips!</p></div>
                </div>

                <div className="chat-input-area">
                  <input type="text" placeholder="Ask for help... (e.g., 'suggest colors for my drawing')" className="chat-input" />
                  <button className="send-btn">Send</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Drawing3D;
