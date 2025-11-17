const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const DATA_DIR = path.join(__dirname, '../../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// 確保 users.json 存在
const ensureUsersFile = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
};

// 讀取用戶數據
const readUsers = () => {
  ensureUsersFile();
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
};

// 寫入用戶數據
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// 登錄控制器
const login = (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ error: 'User ID and Password are required' });
  }

  const users = readUsers();
  const user = users.find((u) => u.userId === userId);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const stored = user.password || '';
  const isHashed = stored.startsWith('$2');

  const checkPassword = () => {
    if (isHashed) {
      return bcrypt.compareSync(password, stored);
    }
    // legacy plain-text support: if matches, re-hash and store
    if (password === stored) {
      const hashed = bcrypt.hashSync(password, 10);
      user.password = hashed;
      writeUsers(users);
      return true;
    }
    return false;
  };

  if (!checkPassword()) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const payload = { id: user.id, userId: user.userId, name: user.name };
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });

  res.json({
    token,
    user: {
      id: user.id,
      userId: user.userId,
      name: user.name,
    },
  });
};

// 註冊控制器
const register = (req, res) => {
  const { userId, password, name } = req.body;

  if (!userId || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const users = readUsers();
  const existingUser = users.find((u) => u.userId === userId);

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashed = bcrypt.hashSync(password, 10);

  const newUser = {
    id: uuidv4(),
    userId,
    password: hashed,
    name,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: newUser.id,
      userId: newUser.userId,
      name: newUser.name,
    },
  });
};

module.exports = {
  login,
  register,
};
