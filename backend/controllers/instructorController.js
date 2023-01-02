const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")
const validator = require('validator')
const Problem = require('../models/reportedProblem');

const Instructor = require('../models/instructorModel')

//////////////////
const course = require('../models/course');

const CorporateTrainee = require('../models/corporateTraineeModel')
const Admin = require('../models/adminModel')
const IndTrainee = require('../models/indTraineeModel')

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
  const instructor = await Instructor.create({firstName, lastName, username , email, password:hashedPassword , gender,flag:"false"})
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

//uodate biography
const updateBiography =async (req,res) => 
{
  const {username}=req.body
  const {biography}=req.body
  
  const instructor = await Instructor.findOneAndUpdate({username:username},{biography:biography})
  if(!instructor)
  {
      return res.status(400).json({error:'You have to log in first in order to be able to update your biography'})
  }
  res.status(200).json(instructor)
}

const changeEmail = async (req,res) => 
{
  const {email} = req.body
  const {username} = req.body
  
  const instructor = await Instructor.findOne({username});
  
  if(instructor)
  {
    const instructor = await Instructor.findOneAndUpdate({username:username},{email:email})
    res.status(200).json({instructor})
  }
  
  if(!instructor)
  {
    return res.status(404).json({error: 'You have to log in first in order to be able to change your email'})
  }
}






let transporter = nodemailer.createTransport
({
    service:"gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS,
    }
})


//////////////////////////////////////////////////////////////////


// filter courses by instructor
const filterCourses = async(req,res) => {
  
  //const instructorId = req.query.instructorId;
  const {userID}= req.body;
  if(userID)
  {
      const result = await course.find({instructor:mongoose.Types.ObjectId(userID)});
      res.status(200).json(result)
  }
  else
  {
      res.status(400).json({error:"instructor ID  is required"});
  }
}

// const filterCourses = async(req,res) => {
  

const viewProblem = async(req,res) => {
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Instructor'})
}
  const trainee = await Instructor.findById({_id: id })
  const problem = trainee.problem
  console.log(id)
  let i =0;
  let y = [];
  let temp1 = null;
  console.log("problem",problem)
  while(i<problem.length){
    console.log("idddd", problem[i]._id)
    temp1 = await Problem.findById({_id: problem[i]})
    console.log(temp1);
    if(temp1.status == "Pending")
      y = y.concat([temp1])
    i++;  
  }
  let j =0;
  let temp2 = null;
  while(j<problem.length){
   temp2 = await Problem.findById({_id: problem[j]})
    if(temp2.status == "Resolved")
      y = y.concat([temp2])
    j++;  
  }
  if(!trainee) {
    return res.status(404).json({error: 'No such Instructor'})
}
if(y==[]){
  res.status(200).json([]);
}
res.status(200).json(y);
}


const addProblem = async(req,res) => {
  const id = req.body.id;
  const idProblem = req.params.problem;
  console.log("id", id)
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Instructor'})
  }
  const trainee = await Instructor.findById({_id: id })
  const prb =  trainee.problem
   console.log(idProblem)  
   
  let flag = false;
  let i =0;
  while(i< prb.length){
    if(prb[i] == idProblem){
      flag = true;
    }
    i++;
  }
  if(flag ==false)
  {
    const problemTemp = trainee.problem.concat([idProblem])
    console.log(problemTemp)  
    const finalT = await Instructor.findOneAndUpdate({_id: id }, {problem : problemTemp})
    console.log(finalT)
  }
  if(!trainee) {
    return res.status(404).json({error: 'No such Instructor'})
}
res.status(200).json(trainee);
}
 



// module.query.instructorId;
//   const {savedID}= req.params;
//   if(savedID)
//   {
//       const result = await course.find({instructor:mongoose.Types.ObjectId(savedID)});
//       res.status(200).json(result)
//   }
//   else
//   {
//       res.status(400).json({error:"instructor ID  is required"});
//   }
// }

//update acceptedContract
const updateAccepted =async (req,res) => 
{
  const {id}=req.body
  const {acceptedContract}=req.body

  const instructor = await Instructor.findOneAndUpdate({_id:id},{acceptedContract:acceptedContract})
  if(!instructor)
  {
      return res.status(400).json({error:'Instructor not found'})
  }
  res.status(200).json(instructor)
}
//get accepted state of a  single instructor
const getInstAccepted = async (req,res) => 
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
    res.status(200).json(instructor.acceptedContract)
}

module.exports={getInstructor,getInstructors,createInstructor,deleteInstructor,updateBiography,changeEmail,filterCourses, getInstAccepted, updateAccepted,addProblem,viewProblem}