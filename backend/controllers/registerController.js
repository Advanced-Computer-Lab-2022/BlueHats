const bcrypt = require('bcrypt')
const validator = require('validator')
const registerModel = require('../models/registerModel')
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")
require('dotenv').config();

const maxAge = 3 * 24 * 60 * 60;
const createToken = (userName) => 
{
    return jwt.sign({ userName }, 'supersecret',
     {
        expiresIn: maxAge
    })
}

let transporter = nodemailer.createTransport
({
    service:"gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS,
    }
})

//signUp method
const signUp = async (req, res) => {
    const { firstName,lastName,username, email, password,gender,type } = req.body;
    if(!email || !password || !username || !type || !firstName || !lastName || !gender)
    {
        return res.status(404).send({error:"please fill in all fields"})
    }

    if(!validator.isEmail(email))
    {
        return res.status(404).send({error:"email is not valid"})
    }

    if(!validator.isStrongPassword(password))
    {
        return res.status(404).send({error:"password is not strong enough"})
    }

    const exists = await registerModel.findOne({email})

    if(exists) 
    {
        return res.status(404).send({error:"This email is already in use"})
    }
    const used = await registerModel.findOne({username})

    if(used) 
    {
        return res.status(404).send({error:"This username is already taken"})
    }

    try
    {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await registerModel.create({ firstName:firstName ,lastName:lastName,username:username, email: email, password: hashedPassword ,gender:gender , type:type});
        const token = createToken(user.userName);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        //res.status(200).json(user)

        let mailOptions=
        {
            from:process.env.AUTH_EMAIL,
            to:email,
            subject:"Verify your email",
            html : `<p>Please verify your email.</p><p>Don't worry, use this link to reset it</p>
                <p>This link<b> expires in 60 minutes</b>.</p> 
                <a href="http://localhost:3000/login">Log in now to verify your account</a>` 
        }

        transporter.sendMail(mailOptions,(error,info) =>
        {
            if (error)
            return res.json(error)
        })

        res.status(200).json({success:"email sent"})
    } 
    catch (error) 
    {
        res.status(400).json({ error: error.message })
    }
}

//login method
const login = async (req, res) => 
{
    const {username,password}=req.body

    if(!username || !password)
    {
       return res.status(404).send({error:"please fill in all fields"})
    }

  try 
  {
    const user = await registerModel.findOne({username});
    console.log(user);

    if (user) 
    {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) 
      {
        res.send("Auth Successful");
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      } 
      else 
      {
        res.send("Wrong password.");
      }
    } 
    else 
    {
      res.send("Wrong username");
    }
  } 
  catch (error) 
  {
    res.status(400).json({error: error.message})
  }
}

//logout method
const logout = async (req, res) => 
{
        res.clearCookie('jwt')
        res.status(200).send("done")
}

module.exports={signUp,login,logout}