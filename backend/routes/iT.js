const express = require('express'); 

const {//updateIndividualTrainee,
    deleteIndividualTrainee,
    createIndividualTrainee,
    getIndividualTrainees,
    filterCourses, rateCourse, rateInstructor,addReview} = require('../controllers/iTController');


const router = express.Router();

// Get all instructor 
router.get('/', getIndividualTrainees);

// Get a single course
//router.get('/:id', getInstructor);

// Post a new individual trainee account
router.post('/', createIndividualTrainee);

// Delete an individual trainee account
router.delete('/:id', deleteIndividualTrainee);

// Update an individual trainee account
//router.patch('/:id', updateIndividualTrainee);

// get all courses created by an user's id
router.get('/filter', filterCourses);

// rate a course
router.patch('/rateCourse', rateCourse);

// rate an instructor
router.patch('/rateInstructor', rateInstructor);

// review a course
router.patch('/addRev', addReview);

module.exports = router;