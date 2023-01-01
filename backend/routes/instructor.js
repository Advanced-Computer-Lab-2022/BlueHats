const express = require('express')
const { updateCorporateTraineeProfile } = require('../controllers/corporateTraineeController')
const {
    createInstructor,
    getInstructors,
   getInstructor,
    deleteInstructor,
    updateBiography,
    changeEmailInstructor,
    changePasswordInstructor,
    forgotPasswordInstructor,
    filterCourses
} = require('../controllers/instructorController' )

const {instructorSearch} = require('../controllers/search')

const router = express.Router()

router.get('/',getInstructors )

// GET a single instructor
router.get('/:id',getInstructor)

// POST a new instructor

router.post('/',createInstructor)

// DELETE an instructor
router.delete('/:id',deleteInstructor)

// UPDATE an IndTrainee
router.patch('/changePassword', changePasswordInstructor)
router.patch('/changeEmail', changeEmailInstructor)
router.patch('/updateProfile',updateBiography)

// forgot password
 router.post("/forgotPassword",forgotPasswordInstructor)

// search in instructor courses
router.get('/search/:id/:key', instructorSearch);


// get all courses created by an instructor
// router.put('/myCourses', filterCourses);

router.get('/myCourses/:id', filterCourses);


module.exports = router