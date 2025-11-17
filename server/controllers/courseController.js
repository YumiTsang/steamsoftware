const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../../data');
const COURSES_FILE = path.join(DATA_DIR, 'courses.json');

const ensureCoursesFile = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(COURSES_FILE)) {
    const defaultCourses = [
      {
        id: uuidv4(),
        title: 'Introduction to AI',
        category: 'AI Programming',
        duration: '4 weeks',
        level: 'Beginner',
        description: 'Learn the basics of artificial intelligence',
      },
      {
        id: uuidv4(),
        title: 'Basic Physics',
        category: 'STEM',
        duration: '6 weeks',
        level: 'Beginner',
        description: 'Explore the fundamentals of physics',
      },
    ];
    fs.writeFileSync(COURSES_FILE, JSON.stringify(defaultCourses, null, 2));
  }
};

const readCourses = () => {
  ensureCoursesFile();
  const data = fs.readFileSync(COURSES_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeCourses = (courses) => {
  fs.writeFileSync(COURSES_FILE, JSON.stringify(courses, null, 2));
};

const getAllCourses = (req, res) => {
  try {
    const courses = readCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

const getCoursesByCategory = (req, res) => {
  try {
    const { category } = req.params;
    const courses = readCourses();
    const filtered = courses.filter((c) => c.category === category);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

const createCourse = (req, res) => {
  try {
    const { title, category, duration, level, description } = req.body;
    const courses = readCourses();
    const newCourse = {
      id: uuidv4(),
      title,
      category,
      duration,
      level,
      description,
    };
    courses.push(newCourse);
    writeCourses(courses);
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create course' });
  }
};

module.exports = {
  getAllCourses,
  getCoursesByCategory,
  createCourse,
};
