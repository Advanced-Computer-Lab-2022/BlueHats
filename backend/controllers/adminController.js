const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config();
const nodemailer = require("nodemailer")
const validator = require('validator')

const Admin = require('../models/adminModel')
const CorporateTrainee = require('../models/corporateTraineeModel')
const Problem = require('../models/reportedProblem')
const CorporateTrainee = require('../models/corporateTraineeModel')
const Instructor = require('../models/instructorModel')
const IndTrainee = require('../models/indTraineeModel')

let transporter = nodemailer.createTransport
({
    service:"gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS,
    }
})

//get all admins
const getAdmins=async (req,res)=> {
    const admins=await Admin.find({}).sort ({createdAt:-1})
    res.status(200).json(admins)
}

//get a single admin
const getAdmin = async (req,res) => {
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such admin'})
    }
    const admin =await Admin.findById(id)

    if(!admin){
        return res.status(404).json({error:'No such admin'})
    }
    res.status(200).json(admin)
}

//create new adminModel
const createAdmin=async (req,res) =>
{
    const {firstName , lastName , username , email , password , gender} = req.body
    let emptyFields = []

    if (!firstName) 
    {
      emptyFields.push('firstName')
    }
    if (!lastName) 
    {
      emptyFields.push('lastName')
    }
    if (!username)
    {
      emptyFields.push('username')
    }
    if (!email) 
    {
      emptyFields.push('email')
    }
    if (!password) 
    {
      emptyFields.push('password')
    }
    if (!gender) 
    {
      emptyFields.push('gender')
    }

    if (emptyFields.length > 0) 
    {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    if(!validator.isEmail(email))
    {
        return res.status(404).json({error:"This email is not valid"})
    }

    if(!validator.isStrongPassword(password))
    {
        return res.status(404).json({error:"Your password is not strong enough "})
    }

  // checking that the email is not taken by any user
  const coTrainee = await CorporateTrainee.findOne({email})
  const indTrainee = await IndTrainee.findOne({email})
  const instructor = await Instructor.findOne({email})
  const admin = await Admin.findOne({email})

  if(indTrainee || coTrainee || instructor || admin) 
  {
      return res.status(404).json({error:"This email is already in use"})
  } 

  // checking that the username is not taken by any user
  const instUsername = await Instructor.findOne({username})
  const adminUsername = await Admin.findOne({username})
  const coTraineeUsername = await CorporateTrainee.findOne({username})
  const indTraineeUsername = await IndTrainee.findOne({username})

  if(instUsername || coTraineeUsername || indTraineeUsername || adminUsername) 
  {
      return res.status(404).json({error:"This username is already taken"})
  }
  
  try 
  {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({firstName, lastName, username , email, password:hashedPassword , gender , flag:"false"})
    const setFlag=admin.flag
    let mailOptions=
        {
            from:process.env.AUTH_EMAIL,
            to:email,
            subject:"Verify your account",
            html : `<p>Please verify your account.</p>
                    <p>You have to change your password for higher security </p>
                    <script>
                     document.getElementById('output').innerHTML = username;
                    </script>
                    <p>Your username: </p>
                    <p id="output"></p>
                    <script> {username} </script>
                    <a href="http://localhost:3000/login">Log in now to activate your account</a>
                    <p>You can change your password once you login</p>`  
                    
        }

        transporter.sendMail(mailOptions,(error,info) =>
        {
            if (error)
            {
              return res.json(error)
            }
        })
    res.status(200).send({admin})
    console.log({admin})
  } 
  catch (error) 
  {
    res.status(400).json({error: error.message})
  }
}

//delete an admin
const deleteAdmin =async (req,res) => 
{
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'No such admin'})
    }
    const admin = await Admin.findOneAndDelete({_id:id})

    if(!admin)
    {
        return res.status(400).json({error:'No such admin'})
    }
    res.status(200).json(admin)
}

//update an admin
const updateAdmin =async (req,res) => 
{
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'No such admin'})
    }

    const admin = await Admin.findOneAndUpdate({_id:id},{...req.body })

    if(!admin)
    {
        return res.status(400).json({error:'No such admin'})
    }
    res.status(200).json(admin)
}


module.exports={getAdmin,getAdmins,createAdmin,deleteAdmin,updateAdmin}