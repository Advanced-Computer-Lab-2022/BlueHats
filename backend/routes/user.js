const express = require('express')
const router = express.Router()

const
{
   signUp,
   login,
   logout,
   forgotPassword,
   changePassword,
   resetPassword
} = require('../controllers/registerController' )

//SignUp
router.post("/signup", signUp);

//LogIn
router.post('/login', login)

//LogOut
router.get('/logout', logout);

//forgot password
router.post("/forgotPassword",forgotPassword)

//change password
router.patch('/changePassword', changePassword)

//change password
router.patch('/resetPassword', resetPassword)

module.exports = router