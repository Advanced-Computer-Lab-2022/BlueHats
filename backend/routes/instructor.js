const express = require('express')
const {
    createInstructor,
    getInstructors,
    getInstructor,
    deleteInstructor,
    updateInstructor
} = require('../controllers/instructorController' )

const router = express.Router()

router.get('/',getInstructors )

// GET a single instructor
router.get('/:id',getInstructor)

// POST a new instructor

router.post('/',createInstructor)

// DELETE an instructor
router.delete('/:id',deleteInstructor)

// UPDATE an insrtuctor
router.patch('/:id', updateInstructor)

module.exports = router