const express = require('express');
const { createCourse, getCourses, getCourse, deleteCourse, updateCourse } = require('../controllers/courseController');

const router = express.Router();

// Get all courses 
router.get('/', getCourses);

// Get a single course
router.get('/:id', getCourse);

// Post a new course
router.post('/', createCourse);

// Delete a course
router.delete('/:id', deleteCourse);

// Update a course
router.patch('/:id', updateCourse);

module.exports = router;