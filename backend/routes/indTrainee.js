const express = require('express')
const router = express.Router()

const{getIndTrainees,getIndTrainee,signupIndTrainee,deleteIndTrainee,changePasswordIndTrainee,loginIndTrainee,forgotPasswordIndTrainee,updateIndTraineeProfile,gradeExam,viewSolution,setAnswer,compareAnswers,updateProgress,getProgress,getMyCourses} = require('../controllers/indTraineeController')

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

// Grade Exam
router.get('/gradeExam/:idCourse/:idTrainee',gradeExam) 

router.get('/viewSolution/:idCourse',viewSolution)

router.put('/setAnswer/:id/:answer',setAnswer)
 
router.get('/compareAnswers/:solution/:answer',compareAnswers)

// Update Course Progress
router.patch('/progress', updateProgress)

//Get an indTrainee Progress
router.put('/getProgress', getProgress);

// Get an indTrainee Courses
router.put('/getMyCourses', getMyCourses);


module.exports = router