const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")

const Instructor = require('../models/instructorModel')

//////////////////
const course = require('../models/course');


//get all instructors
const getInstructors=async (req,res)=>
{
    const instructors=await Instructor.find({}).sort ({createdAt:-1})
    res.status(200).json(instructors)
}

//get a single instructor
const getInstructor = async (req,res) => 
{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'No such instructor'})
    }

    const instructor =await Instructor.findById(id)

    if(!instructor)
    {
        return res.status(404).json({error:'No such instructor'})
    }
    res.status(200).json(instructor)
}

//create a new instructor
const createInstructor =async (req,res) =>
{
    const {name, username , email, password} = req.body
    let emptyFields = []

    if (!name) 
    {
      emptyFields.push('name')
    }

    if (!username) 
    {
      emptyFields.push('username')
    }
    if (!email) {
      emptyFields.push('email')
    }
    if (!password) 
    {
      emptyFields.push('password')
    }

    if (emptyFields.length > 0) 
    {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

  try 
  {
    const instructor = await Instructor.create({name, username ,email , password})
    res.status(200).json(instructor)
  }
  
  catch (error) 
  {
    res.status(400).json({error: error.message})
  }
}

//delete an instructor
const deleteInstructor =async (req,res) => 
{
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such instructor'})
    }
    const instructor = await Instructor.findOneAndDelete({_id:id})

    if(!instructor){
        return res.status(400).json({error:'No such instructor'})
    }
    res.status(200).json(instructor)
}

//update an instructor
const changePasswordInstructor = async (req,res) => 
{
  const {id}=req.body
  const {password}=req.body
  // const{confirmPassword}=req.body
  
  if(!id || !password )
  {
    return res.status(400).json({ error: 'Please fill in all fields'})
  }
  // const pass = await bcrypt.compare(password, confirmPassword);
  // if(!password === confirmPassword)
  // {
  //   return res.status(400).json({ error: 'Password is  not confirmed'})
  // }
  
  if(!mongoose.Types.ObjectId.isValid(id))
  {
      return res.status(404).json({error:'No such instructor'})
  }
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  const instructor = await Instructor.findOneAndUpdate({_id:id},{password:hashedPassword})
  if(!instructor)
  {
      return res.status(400).json({error:'No such instructor'})
  }
  res.status(200).json(instructor)
}

const changeEmailInstructor = async (req,res) => 
{
  // const {id}=req.body
  const {email}=req.body

  if( !email)
  {
    return res.status(400).json({ error: 'Please fill in all fields'})
  }

  // if(!mongoose.Types.ObjectId.isValid(id))
  // {
  //   return res.status(404).json({error:'No such instructor'})
  // }

  try
  {
    const instructor = await Instructor.findOneAndUpdate({_id:"638b4508ecdf4b2561760c25"},{email:email})
    if(!instructor)
    {
        return res.status(400).json({error:'No such instructor'})
    }
    res.status(200).json(instructor)
  }
  catch(error)
  {
    console.log(error)
    res.status(404).json(error)
  }
}

const updateBiography =async (req,res) => 
{
  //const {id}=req.body
  const {biography}=req.body

  // if(!mongoose.Types.ObjectId.isValid(id))
  // {
  //     return res.status(404).json({error:'No such instructor'})
  // }

  const instructor = await Instructor.findOneAndUpdate({_id:"638b4508ecdf4b2561760c25"},{biography:biography})
  if(!instructor)
  {
      return res.status(400).json({error:'No such instructor'})
  }
  res.status(200).json(instructor)
}

let transporter = nodemailer.createTransport
({
    service:"gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS,
    }
})

const forgotPasswordInstructor = async (req,res) =>
{
  const{email}=req.body

  if(!email)
  {
    return res.status(400).json({ error: 'Please Write your email'})
  }

  try
  {
    const user = await Instructor.findOne({email:email})
    if(user)
    {
      let mailOptions=
      {
        from:process.env.AUTH_EMAIL,
        to:email,
        subject:"Reset Password",
        html : `<p>We heard that you lost the password.</p><p>Don't worry, use this link to reset it</p>
            <p>This link<b> expires in 60 minutes</b>.</p> 
            <a href="http://localhost:3000/resetPassword">reset your password now</a>` 
      }

      transporter.sendMail(mailOptions,(error,info) =>
      {
        if (error)
          return res.json(error)
      })
      res.status(200).json({success:"email sent"})
    }
    else
    {
      res.status(404).json({error:"incorrect email"})
    }
  }
  catch (error)
  {
    res.status(404).json(error)
  }
}
//////////////////////////////////////////////////////////////////


const filterCourses = async(req,res) => {
  const { id } = req.params;

  const result = await course.find({instructor:mongoose.Types.ObjectId(id)});
  res.status(200).json(result)

  if(!result) {
      res.status(400).json({error:"No such instructor"})
  }

}

module.exports={getInstructor,getInstructors,createInstructor,deleteInstructor,forgotPasswordInstructor,updateBiography,changeEmailInstructor,changePasswordInstructor,filterCourses}