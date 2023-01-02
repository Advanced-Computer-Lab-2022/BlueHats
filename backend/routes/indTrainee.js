const express = require('express')
const router = express.Router()

const{getIndTrainees,
    getIndTrainee,
    signupIndTrainee,
    deleteIndTrainee,
    changePasswordIndTrainee,
    loginIndTrainee,
    forgotPasswordIndTrainee,
    updateIndTraineeProfile,
    compareAnswers,
    addProblem,
    viewProblem,
    getCourses,
    updateProgress,
    getProgress,
    getMyCourses,
    rateCourse,
    addReview,
    rateInstructor,
    filterCourses,
    reviewCourse} = require('../controllers/indTraineeController')
const {payWithWallet} = require('../controllers/payment');

//login route
router.post('/login',loginIndTrainee)

//signup route
router.post('/signup',signupIndTrainee)

//get all IndTrainees
router.get('/',getIndTrainees )

//get an IndTrainee
router.get('/:id',getIndTrainee )
   
// DELETE an IndTrainee
router.delete('/:id',deleteIndTrainee)

// UPDATE an IndTrainee
router.patch('/changePassword', changePasswordIndTrainee)

router.patch('/updateProfile',updateIndTraineeProfile)

// forgot password
router.post("/forgotPassword",forgotPasswordIndTrainee)

// Update Course Progress
router.put('/progress', updateProgress)

//Get an indTrainee Progress
router.put('/getProgress', getProgress);

// Get an indTrainee Courses
router.put('/getMyCourses', getMyCourses);

// Pay for a course with wallet
router.put('/payWithWallet', payWithWallet);

router.get('/getCourses/:id',getCourses)

router.put('/compareAnswers/:solution/:answer',compareAnswers)

router.put('/addProblem/:problem',addProblem)

router.get('/viewProblem/:id',viewProblem)



 // get all courses created by an user's id
router.get('/filter/:id', filterCourses);

// rate an instructor
router.patch('/rateInstructor', rateInstructor);

// review a course
router.patch('/addRev', addReview);

// rate a course
router.patch('/rateCourse', rateCourse);

router.post('/addReview', reviewCourse);


module.exports = router