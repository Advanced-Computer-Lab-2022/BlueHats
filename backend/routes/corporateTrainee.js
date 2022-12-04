const express = require('express')
const {
    createCorporateTrainee,
    getCorporateTrainees,
    getCorporateTrainee,
    deleteCorporateTrainee,
    updateCorporateTrainee,
    gradeExam,
    viewSolution,
    setAnswer
} = require('../controllers/corporateTraineeController' )

const router = express.Router()

router.get('/',getCorporateTrainees )

// GET a single CorporateTrainee
router.get('/:id',getCorporateTrainee)

// POST a new CorporateTrainee

router.post('/',createCorporateTrainee)

// DELETE a CorporateTrainee
router.delete('/:id',deleteCorporateTrainee)

// UPDATE a CorporateTrainee
router.patch('/:id', updateCorporateTrainee)

router.get('/gradeExam/:idCourse/:idTrainee',gradeExam) 

router.get('/viewSolution/:idCourse',viewSolution)

router.put('/setAnswer/:id/:answer',setAnswer)

module.exports = router