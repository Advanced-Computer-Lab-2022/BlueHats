const express = require('express'); 

const {//updateIndividualTrainee,
    deleteCorporateTrainee,
    createCorporateTrainee,
    getCorporateTrainees,
    filterCourses, 
    rateCourse, rateInstructor,
    addReview,requestCourse} = require('../controllers/cTController');


const router = express.Router();

// Get all instructor 
router.get('/', getCorporateTrainees);

// Get a single course
//router.get('/:id', getInstructor);

// Post a new individual trainee account
router.post('/', createCorporateTrainee);

// Delete an individual trainee account
router.delete('/:id', deleteCorporateTrainee);

// Update an individual trainee account
//router.patch('/:id', updateIndividualTrainee);

// get all courses created by an user's id
router.get('/filter/:id', filterCourses);

// // rate a course
router.patch('/rateCourse', rateCourse);

// rate an instructor
router.patch('/rateInstructor', rateInstructor);

// review a course
router.patch('/addRev', addReview);

// request a course
router.post('/requestCourse', requestCourse);


module.exports = router;