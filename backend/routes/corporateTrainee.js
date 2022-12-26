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
    viewSolution,
    gradeExam,
    setAnswer,
    compareAnswers,
    addProblem,
    viewProblem,
    getEx,
    rateCourse,
    rateInstructor,
    addReview,
    requestCourse,
    availableCourses,
    filterCourses,
    reviewCourse
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

router.get('/gradeExam/:idTrainee/:idCourse',gradeExam) 

router.get('/viewSolution/:idCourse',viewSolution)

// router.put('/setAnswer/:id/:idCourse/:idEx/:answer',setAnswer)

router.put('/compareAnswers/:solution/:answer',compareAnswers)

router.post('/addProblem/:id/:problem',addProblem)

router.get('/viewProblem/:id',viewProblem)

router.get('/getEx/:idCourse/:idEx', getEx)


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