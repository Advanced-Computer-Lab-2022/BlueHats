const express = require('express')

const { updateProblem, deleteProblem, createProblem, getProblem, getProblems, getPending, updateStatus, addResponse, updateSeen, getUnseen } = require('../controllers/problemController')

const router = express.Router()

//router.get('/',getProblems )


router.get('/:id',getProblem)


router.post('/',createProblem)


router.delete('/:id',deleteProblem)


router.patch('/:id', updateProblem)


router.get('/',getPending)


router.put('/updateStatus/:idProblem', updateStatus)


router.put('/updateSeen/:idProblem', updateSeen)


router.get('/getUnseen/:idProblem', getUnseen)


router.put('/addResponse/:idProblem/:response', addResponse)

module.exports = router