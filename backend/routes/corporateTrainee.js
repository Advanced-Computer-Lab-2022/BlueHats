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
    compareAnswers
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


router.get('/gradeExam/:idCourse/:idTrainee',gradeExam) 

router.get('/viewSolution/:idCourse',viewSolution)

router.put('/setAnswer/:idCourse/:id/:answer',setAnswer)

router.get('/compareAnswers/:solution/:answer',compareAnswers)

module.exports = router