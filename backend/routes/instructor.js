const express = require('express')
const {
    createInstructor,
    getInstructors,
    getInstructor,
    deleteInstructor,
    updateInstructor
} = require('../controllers/instructorController' )

const {instructorSearch} = require('../controllers/search')

const router = express.Router()

router.get('/',getInstructors )

// GET a single instructor
router.get('/:id',getInstructor)

// POST a new instructor

router.post('/',createInstructor)

// DELETE an instructor
router.delete('/:id',deleteInstructor)

// UPDATE an instructor
router.patch('/:id', updateInstructor)

// search in instructor courses
router.get('/search/:id/:key', instructorSearch);

module.exports = router