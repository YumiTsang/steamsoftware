const express = require('express');
const { getAllCourses, getCoursesByCategory, createCourse } = require('../controllers/courseController');

const router = express.Router();

router.get('/', getAllCourses);
router.get('/category/:category', getCoursesByCategory);
router.post('/', createCourse);

module.exports = router;
