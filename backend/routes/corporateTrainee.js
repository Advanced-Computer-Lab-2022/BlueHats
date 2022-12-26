const express = require('express')
const 
{
    createCorporateTrainee,
    getCorporateTrainees,
    getCorporateTrainee,
    deleteCorporateTrainee,
    updateCorporateTraineeProfile,
    changeEmailCorporateTrainee,
    changePasswordCorporateTrainee,
    forgotPasswordCorporateTrainee,
    viewSolution,
    gradeExam,
    setAnswer,
    compareAnswers,
    addProblem,
    viewProblem,
    getEx
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
router.patch('/changePassword', changePasswordCorporateTrainee)
router.patch('/changeEmail', changeEmailCorporateTrainee)
router.patch('/updateProfile',updateCorporateTraineeProfile)

// forgot password
router.post("/forgotPassword",forgotPasswordCorporateTrainee)

router.get('/gradeExam/:idTrainee/:idCourse',gradeExam) 

router.get('/viewSolution/:idCourse',viewSolution)

router.put('/setAnswer/:id/:idCourse/:idEx/:answer',setAnswer)

router.put('/compareAnswers/:solution/:answer',compareAnswers)

router.post('/addProblem/:id/:problem',addProblem)

router.get('/viewProblem/:id',viewProblem)

router.get('/getEx/:idCourse/:idEx', getEx)

module.exports = router