import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DrawingsList.css';

function DeleteButton({ drawingId, onDeleted }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to delete drawings');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/drawing/${drawingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        alert('Unauthorized. Please login again.');
        return;
      }
      if (res.status === 403) {
        alert('You are not allowed to delete this drawing');
        return;
      }
      if (!res.ok) throw new Error('Delete failed');
      onDeleted && onDeleted();
    } catch (err) {
      console.error(err);
      alert('Failed to delete drawing');
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {!confirmOpen ? (
        <button className="btn btn-secondary" onClick={() => setConfirmOpen(true)}>Delete</button>
      ) : (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>Delete this drawing? This cannot be undone.</span>
          <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>{loading ? 'Deleting...' : 'Confirm'}</button>
          <button className="btn" onClick={() => setConfirmOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

const DrawingView = () => {
  const { id } = useParams();
  const [drawing, setDrawing] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/drawing');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const found = data.find((d) => d.id === id);
        setDrawing(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrawing();
  }, [id]);

  if (loading) return <div className="drawings-loading">Loading...</div>;
  if (!drawing) return <div className="drawings-empty">Drawing not found</div>;

  return (
    <div className="drawing-view-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <div style={{display: 'flex', gap: 8}}>
          <button className="btn" onClick={() => {
            // download
            if (!drawing.image) return alert('No image to download');
            const link = document.createElement('a');
            link.href = drawing.image;
            // derive filename from title or id
            const filename = `${drawing.title.replace(/[^a-z0-9-_\.]/gi, '_') || drawing.id}.png`;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>Download</button>
          <DeleteButton drawingId={drawing.id} onDeleted={() => navigate('/drawings')} />
        </div>
      </div>
      <div className="drawing-detail">
        <h2>{drawing.title}</h2>
        <div className="meta">By {drawing.userId} · {new Date(drawing.createdAt).toLocaleString()}</div>
        <div className="drawing-image-wrap">
          {drawing.image ? (
            <img src={drawing.image} alt={drawing.title} className="full-image" />
          ) : (
            <div className="thumb-empty">No Image</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawingView;
