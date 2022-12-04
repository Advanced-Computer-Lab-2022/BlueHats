const express = require('express')
const router = express.Router()

const
{
   signUp,
   login,
   logout
} = require('../controllers/registerController' )

//SignUp
router.post("/signup", signUp);

//LogIn
router.post('/login', login)

//LogOut
router.get('/logout', logout);

module.exports = router