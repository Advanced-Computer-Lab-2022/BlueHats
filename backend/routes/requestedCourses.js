const express = require('express')
const {acceptRequest, rejectRequest,getAllRequests} = require('../controllers/requestCourseController')

const router = express.Router()
//get all requests
router.get('/',getAllRequests)
// delete request 
// router.delete('/:id',deleteRequest)
// accept request
router.delete('/accept/:id',acceptRequest)

// reject request
router.delete('/reject/:id',rejectRequest)


module.exports = router