const express = require('express'); 

const {updateInstructor,
    deleteInstructor,
    createInstructor,
    getInstructors,
   // getInstructor,
    filterCourses} = require('../controllers/instController');


const router = express.Router();

// Get all instructor 
router.get('/', getInstructors);

// Get a single course
//router.get('/:id', getInstructor);

// Post a new instructor account
router.post('/', createInstructor);

// Delete an instructor account
router.delete('/:id', deleteInstructor);

// Update an instructor account
router.patch('/:id', updateInstructor);

// get all courses created by an instructor
router.put('/myCourses', filterCourses);


module.exports = router;