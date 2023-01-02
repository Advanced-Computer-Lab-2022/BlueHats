const express = require('express')
const 
{
    createCorporateTrainee,
    getCorporateTrainees,
    getCorporateTrainee,
    deleteCorporateTrainee,
    updateCorporateTraineeProfile,
    changeEmailCorporateTrainee,
    forgotPasswordCorporateTrainee,
    compareAnswers,
    addProblem,
    viewProblem,
    rateCourse,
    rateInstructor,
    addReview,
    requestCourse,
    availableCourses,
    filterCourses,
    reviewCourse,
    addCourse,
    getCourses
} = require('../controllers/corporateTraineeController' )

const router = express.Router()

router.get('/',getCorporateTrainees )

// GET a single CorporateTrainee
router.get('/:id',getCorporateTrainee)

// POST a new CorporateTrainee

router.post('/',createCorporateTrainee)

// DELETE a CorporateTrainee
router.delete('/:id',deleteCorporateTrainee)

// UPDATE an IndTrainee
// router.patch('/changePassword', changePasswordCorporateTrainee)
router.patch('/changeEmail', changeEmailCorporateTrainee)
router.patch('/updateProfile',updateCorporateTraineeProfile)

// forgot password
router.post("/forgotPassword",forgotPasswordCorporateTrainee)

router.put('/addCourse/:id/:idCourse',addCourse)

router.get('/getCourses/:id',getCourses)

router.put('/compareAnswers/:solution/:answer',compareAnswers)

router.put('/addProblem/:problem',addProblem)

router.get('/viewProblem/:id',viewProblem)

////////////////////

// get all courses created by the user's id
router.get('/filter/:id', filterCourses);

// // rate a course
router.patch('/rateCourse', rateCourse);

// rate an instructor
router.patch('/rateInstructor', rateInstructor);

// review a course
router.patch('/addRev', addReview);

// request a course
router.post('/requestCourse', requestCourse);

router.get('/availableCourses/:id', availableCourses);

router.post('/addreview', reviewCourse);


module.exports = router