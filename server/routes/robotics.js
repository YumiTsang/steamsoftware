const express = require('express');
const { getAllRobots, getRobotById, updateRobotStatus } = require('../controllers/robotController');

const router = express.Router();

router.get('/', getAllRobots);
router.get('/:id', getRobotById);
router.put('/:id/status', updateRobotStatus);

module.exports = router;
