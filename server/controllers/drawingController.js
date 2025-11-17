const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../../data');
const DRAWINGS_FILE = path.join(DATA_DIR, 'drawings.json');

const ensureDrawingsFile = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DRAWINGS_FILE)) {
    fs.writeFileSync(DRAWINGS_FILE, JSON.stringify([], null, 2));
  }
};

const readDrawings = () => {
  ensureDrawingsFile();
  const data = fs.readFileSync(DRAWINGS_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeDrawings = (drawings) => {
  fs.writeFileSync(DRAWINGS_FILE, JSON.stringify(drawings, null, 2));
};

const saveDrawing = (req, res) => {
  try {
    const { userId, title, image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const drawings = readDrawings();
    const requestUserId = req.user && req.user.userId ? req.user.userId : (userId || 'anonymous');
    const newDrawing = {
      id: uuidv4(),
      userId: requestUserId,
      title: title || 'Untitled Drawing',
      image, // base64 data URL
      createdAt: new Date().toISOString(),
    };

    drawings.push(newDrawing);
    writeDrawings(drawings);

    res.status(201).json(newDrawing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save drawing' });
  }
};

const getDrawings = (req, res) => {
  try {
    const drawings = readDrawings();
    res.json(drawings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drawings' });
  }
};

const getDrawingById = (req, res) => {
  try {
    const { id } = req.params;
    const drawings = readDrawings();
    const drawing = drawings.find((d) => d.id === id);
    if (!drawing) return res.status(404).json({ error: 'Drawing not found' });
    res.json(drawing);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drawing' });
  }
};

const deleteDrawing = (req, res) => {
  try {
    const { id } = req.params;
    let drawings = readDrawings();
    const index = drawings.findIndex((d) => d.id === id);
    if (index === -1) return res.status(404).json({ error: 'Drawing not found' });
    const drawing = drawings[index];
    // Ensure the requester is the owner
    if (!req.user || !req.user.userId || drawing.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this drawing' });
    }

    const [deleted] = drawings.splice(index, 1);
    writeDrawings(drawings);
    res.json({ message: 'Deleted', drawing: deleted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete drawing' });
  }
};

module.exports = {
  saveDrawing,
  getDrawings,
  getDrawingById,
  deleteDrawing,
};
