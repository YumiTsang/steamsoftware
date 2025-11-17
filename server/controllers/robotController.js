const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../../data');
const ROBOTS_FILE = path.join(DATA_DIR, 'robots.json');

const ensureRobotsFile = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ROBOTS_FILE)) {
    const defaultRobots = [
      {
        id: uuidv4(),
        name: 'Robot A',
        model: 'RX-100',
        status: 'available',
        createdAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: 'Robot B',
        model: 'RX-200',
        status: 'available',
        createdAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(ROBOTS_FILE, JSON.stringify(defaultRobots, null, 2));
  }
};

const readRobots = () => {
  ensureRobotsFile();
  const data = fs.readFileSync(ROBOTS_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeRobots = (robots) => {
  fs.writeFileSync(ROBOTS_FILE, JSON.stringify(robots, null, 2));
};

const getAllRobots = (req, res) => {
  try {
    const robots = readRobots();
    res.json(robots);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch robots' });
  }
};

const getRobotById = (req, res) => {
  try {
    const { id } = req.params;
    const robots = readRobots();
    const robot = robots.find((r) => r.id === id);
    if (!robot) {
      return res.status(404).json({ error: 'Robot not found' });
    }
    res.json(robot);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch robot' });
  }
};

const updateRobotStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const robots = readRobots();
    const robot = robots.find((r) => r.id === id);
    if (!robot) {
      return res.status(404).json({ error: 'Robot not found' });
    }
    robot.status = status;
    writeRobots(robots);
    res.json(robot);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update robot' });
  }
};

module.exports = {
  getAllRobots,
  getRobotById,
  updateRobotStatus,
};
