const express = require('express')
const 
{
    getCorporateTrainee,
    getCorporateTrainees,
    gradeExam,
    createCorporateTrainee,
    getCertificateCoTrainee,
    viewSolution,
    getCourses,
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
    updateProgress,
    getProgress,
    getMyCourses
} = require('../controllers/corporateTraineeController' )

const router = express.Router()

router.get('/',getCorporateTrainees )

// GET a single CorporateTrainee
router.get('/:id',getCorporateTrainee)

// POST a new CorporateTrainee

router.post('/',createCorporateTrainee)

// DELETE a CorporateTrainee
//router.delete('/:id',deleteCorporateTrainee)

// UPDATE an IndTrainee
// router.patch('/changePassword', changePasswordCorporateTrainee)
// router.patch('/changeEmail', changeEmailCorporateTrainee)
// router.patch('/updateProfile',updateCorporateTraineeProfile)

// forgot password
//router.post("/forgotPassword",forgotPasswordCorporateTrainee)

 router.post("/getCertificate", getCertificateCoTrainee)

// router.put('/addCourse/:id/:idCourse',addCourse)

router.get('/getCourses/:id',getCourses);

router.put('/compareAnswers/:solution/:answer',compareAnswers)

router.put('/addProblem/:problem',addProblem)

router.get('/viewProblem/:id',viewProblem)

////////////////////

router.get('/filter/:id', filterCourses);
// router.put('/filter', filterCourses);

// // rate a course
router.patch('/rateCourse', rateCourse);

// rate an instructor
router.patch('/rateInstructor', rateInstructor);

// review a course
router.patch('/addRev', addReview);

// request a course
router.post('/requestCourse', requestCourse);

router.put('/availableCourses', availableCourses);

router.post('/addreview', reviewCourse);

// Update Course Progress
router.patch('/progress', updateProgress);

//Get corporate trainee Progress
router.put('/getProgress', getProgress);

// Get corporate trainee Courses
router.put('/getMyCourses', getMyCourses);


module.exports = router