const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'STEAM Teaching System API Server' });
});

// Import route files
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const roboticsRoutes = require('./routes/robotics');
// const drawingRoutes = require('./routes/drawing');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/robotics', roboticsRoutes);
const drawingRoutes = require('./routes/drawing');
app.use('/api/drawing', drawingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
