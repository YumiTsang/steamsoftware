const express = require('express');
const { saveDrawing, getDrawings, getDrawingById, deleteDrawing } = require('../controllers/drawingController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getDrawings);
router.post('/', saveDrawing);
router.get('/:id', getDrawingById);
router.delete('/:id', auth, deleteDrawing);

module.exports = router;
