const express = require('express')
const {
    createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin,
    updateAdmin,
} = require('../controllers/adminController' )

const router = express.Router()

router.get('/',getAdmins )

// GET a single admin
router.get('/:id',getAdmin)

// POST a new admin

router.post('/',createAdmin)

// DELETE an admin
router.delete('/:id',deleteAdmin)

// UPDATE an admin
router.patch('/:id', updateAdmin)

module.exports = router