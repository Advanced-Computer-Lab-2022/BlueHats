const express = require('express')
const {getRequests,
getRequest,
  //  addReview,
  deleteRequest,
  editRequest,
  viewUserRequests} = require('../controllers/requestStatusController')

const router = express.Router()
//get all requests
router.get('/',getRequests)

// delete request 

router.delete('/:id',deleteRequest)

// update request status
router.patch('/update/:id',editRequest)

// get user requests
router.get('/viewrequests/:id',viewUserRequests)


module.exports = router