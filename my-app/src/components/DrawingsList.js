import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DrawingsList.css';

const DrawingsList = () => {
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/drawing');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setDrawings(data.reverse());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrawings();
  }, []);

  if (loading) return <div className="drawings-loading">Loading drawings...</div>;

  return (
    <div className="drawings-page">
      <header className="drawings-header">
        <h1>My Drawings</h1>
        <p>Saved drawings from the Art Board</p>
      </header>

      <div className="drawings-grid">
        {drawings.length === 0 && <div className="empty">No drawings yet.</div>}
        {drawings.map((d) => (
          <div key={d.id} className="drawing-card" onClick={() => navigate(`/drawing/${d.id}`)}>
            <div className="thumb-wrap">
              {d.image ? (
                <img src={d.image} alt={d.title} className="thumb" />
              ) : (
                <div className="thumb-empty">No Image</div>
              )}
            </div>
            <div className="drawing-info">
              <div className="title">{d.title}</div>
              <div className="meta">By {d.userId} · {new Date(d.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawingsList;
