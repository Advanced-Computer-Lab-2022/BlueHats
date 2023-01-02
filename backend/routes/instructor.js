const express = require('express')
//const { updateCorporateTraineeProfile } = require('../controllers/corporateTraineeController')
const {
    createInstructor,
    getInstructors,
   getInstructor,
   getInstAccepted,
    deleteInstructor,
    updateBiography,
    updateAccepted,
    changeEmail,
    filterCourses
} = require('../controllers/instructorController' )

const {instructorSearch} = require('../controllers/search')

const router = express.Router()

router.get('/',getInstructors )

// GET a single instructor
router.get('/:id',getInstructor)

//Get accepted state of a single instructor
router.get('/getAccepted/:id',getInstAccepted)

// POST a new instructor

router.post('/',createInstructor)

// DELETE an instructor
router.delete('/:id',deleteInstructor)

// UPDATE an IndTrainee
//router.patch('/changePassword', changePasswordInstructor)
router.patch('/changeEmail', changeEmail)
router.patch('/updateProfile',updateBiography)
router.patch('/updateAccepted',updateAccepted)


// forgot password
//router.post("/forgotPassword",forgotPasswordInstructor)

// search in instructor courses
router.get('/search/:id/:key', instructorSearch);


// get all courses created by an instructor
// router.put('/myCourses', filterCourses);

router.get('/myCourses/:id', filterCourses);


module.exports = router