const express = require('express')
const router = express.Router()

const{getIndTrainees,getIndTrainee,signupIndTrainee,deleteIndTrainee,changePasswordIndTrainee,loginIndTrainee,forgotPasswordIndTrainee,updateIndTraineeProfile} = require('../controllers/indTraineeController')

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
// router.patch('/changeEmail', changeEmailIndTrainee)
router.patch('/updateProfile',updateIndTraineeProfile)

// forgot password
 router.post("/forgotPassword",forgotPasswordIndTrainee)

module.exports = router

    
