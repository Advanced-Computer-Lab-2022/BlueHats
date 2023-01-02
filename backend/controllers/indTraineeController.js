const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const validator = require('validator')
// const generateToken =require ( "../utils/generateToken")
const nodemailer = require("nodemailer")
require('dotenv').config();
const bcrypt = require('bcrypt')
 
const IndTrainee = require('../models/indTraineeModel')
const Course = require('../models/course')
const Problem = require('../models/reportedProblem');
const review = require ('../models/reviewsModel')


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => 
{
    return jwt.sign({ id}, 'supersecret',
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
const signupIndTrainee = async (req, res) => {
    const { firstName,lastName,username, email, password,gender} = req.body;
    if(!email || !password || !username || !firstName || !lastName || !gender)
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

    const exists = await IndTrainee.findOne({email})

    if(exists) 
    {
        return res.status(404).send({error:"This email is already in use"})
    }
    const used = await IndTrainee.findOne({username})

    if(used) 
    {
        return res.status(404).send({error:"This username is already taken"})
    }

    try
    {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await IndTrainee.create({ firstName:firstName ,lastName:lastName,username:username, email: email, password: hashedPassword ,gender:gender });
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

        res.status(200).send("Check your email")
    } 
    catch (error) 
    {
        res.status(400).json({ error: error.message })
    }
}

//login method
const loginIndTrainee = async (req, res) => 
{
    const {username,password}=req.body

    if(!username || !password)
    {
       return res.status(404).send({error:"please fill in all fields"})
    }

  try 
  {
    const user = await IndTrainee.findOne({username});
    console.log(user);

    if (user) 
    {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) 
      {
        const token = createToken(user.username);
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

//get a single instructor
const getIndTrainee = async (req,res) => {
  const {id}=req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:'No such trainee'})
  }
  const indTrainee =await IndTrainee.findById(id)

  if(!indTrainee){
      return res.status(404).json({error:'No such trainee'})
  }
  res.status(200).json(indTrainee)
}


//get all individualTrainees
const getIndTrainees=async (req,res)=> {
  const indTrainees=await IndTrainee.find({}).sort ({createdAt:-1})
  res.status(200).json(indTrainees)
}

//delete an individualTrainee
const deleteIndTrainee =async (req,res) => {
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such indTrainee'})
    }
    const indTrainee = await IndTrainee.findOneAndDelete({_id:id})

    if(!indTrainee){
        return res.status(400).json({error:'No such indTrainee'})
    }
    res.status(200).json(indTrainee)
}

//update an individualTrainee
const changePasswordIndTrainee = async (req,res) => {
    // const {id}=req.body
    const {password}=req.body
    // const{confirmPassword}=req.body
    
    if(!password )
    {
      return res.status(400).json({ error: 'Please fill in all fields'})
    }
    // const pass = await bcrypt.compare(password, confirmPassword);
    // if(!password === confirmPassword)
    // {
    //   return res.status(400).json({ error: 'Password is  not confirmed'})
    // }
    
    // if(!mongoose.Types.ObjectId.isValid(id))
    // {
    //     return res.status(404).json({error:'No such indTrainee'})
    // }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const indTrainee = await IndTrainee.findOneAndUpdate({_id:"63866c31ffcdd6df6b83922d"},{password:hashedPassword})
    if(!indTrainee)
    {
        return res.status(400).json({error:'No such indTrainee'})
    }
    res.status(200).json(indTrainee)
}

// const changeEmailIndTrainee = async (req,res) => {
//   const {id}=req.body
//   const {email}=req.body
  
//   if(!email)
//   {
//     return res.status(400).json({ error: 'Please fill in all fields'})
//   }
//   // if(!mongoose.Types.ObjectId.isValid(id))
//   // {
//   //   return res.status(404).json({error:'No such indTrainee'})
//   // }
//   try
//   {
//     const indTrainee = await IndTrainee.findOneAndUpdate({_id:"63866c31ffcdd6df6b83922d"},{email:email})
//     if(!indTrainee){
//         return res.status(400).json({error:'No such indTrainee'})
//     }
//     res.status(200).json(indTrainee)
//   }
//   catch(error)
//   {
//     console.log(error)
//     res.status(404).json(error)
//   }
// }

const updateIndTraineeProfile =async (req,res) => {
  // const {id}=req.body
  
  // if(!mongoose.Types.ObjectId.isValid(id))
  // {
  //     return res.status(404).json({error:'No such indTrainee'})
  // }

  const indTrainee = await IndTrainee.findOneAndUpdate({_id:"63866c31ffcdd6df6b83922d"},{...req.body})
  if(!indTrainee)
  {
      return res.status(400).json({error:'No such indTrainee'})
  }
  res.status(200).json(indTrainee)
}


const forgotPasswordIndTrainee = async (req,res) =>
{
  const{email}=req.body

  if(!email)
  {
    return res.status(400).json({ error: 'Please Write your email'})
  }

  try
  {
    const user = await IndTrainee.findOne({email:email})
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
      transporter.sendMail(mailOptions,(error,info) =>{
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

const getCourses = async(req,res) => {
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Individual Trainee'})
}
 const trainee = await IndTrainee.findById({_id: id })
 const crs = trainee.courses;
 let i = 0;
 let temp = [];
 let x = null;
 while(i<crs.length){
  x = await Course.findById({_id:crs[i].course})
  temp = temp.concat([x]);
  i++;
 }
 console.log("courses:",temp)
 res.status(200).json(temp)
}

const viewProblem = async(req,res) => {
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Individual Trainee'})
}
  const trainee = await IndTrainee.findById({_id: id })
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
    return res.status(404).json({error: 'No such Individual Trainee'})
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
    return res.status(404).json({error: 'No such Individual Trainee'})
  }
  const trainee = await IndTrainee.findById({_id: id })
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
    const finalT = await IndTrainee.findOneAndUpdate({_id: id }, {problem : problemTemp})
    console.log(finalT)
  }
  if(!trainee) {
    return res.status(404).json({error: 'No such Individual Trainee'})
}
res.status(200).json(trainee); 
}

const compareAnswers = async(req,res) => {
  const solution = req.params.solution;
  const answer = req.params.answer;
  console.log(solution,answer)
  if(solution == answer)
    return res.json(true)
  else if(solution != answer)
    return res.json(false)
}

const updateProgress = async(req, res) => {
  const { progress } = req.body;
  const { courseID } = req.body;
  const { userID } = req.body;

  const trainee = await IndTrainee.findById(userID);

  const array = trainee.courses;

  const object = { course: courseID, progress: progress };
  
  let i = 0;
  let newCourses = [];

  while(i < array.length)
  {
    const currentID = array[i].course;
    if( currentID == courseID )
    {
      newCourses = newCourses.concat([object]);
    }
    else 
    {
      newCourses = newCourses.concat([array[i]]);
    }
    i++;
  }

  const updatedTrainee = await IndTrainee.findOneAndUpdate({_id: userID} , {courses: newCourses});

  if(!trainee) 
  {
    return res.status(404).json({error: 'No such Individual Trainee'})
  }
  res.status(200).json(updatedTrainee);
}

const getProgress = async(req, res) => {
  const { courseID } = req.body;
  const { userID } = req.body;

  const trainee = await IndTrainee.findById(userID);

  const array = trainee.courses;

  let i = 0;
  let myProgress = 0;
  while(i < array.length)
  {
    const currentID = array[i].course;
    if( currentID == courseID )
    {
      myProgress = array[i].progress;
    }
    i++;
  }
  if(!trainee) 
  {
    return res.status(404).json({error: 'No such Individual Trainee'})
  }
  res.status(200).json(myProgress);

}

const getMyCourses = async(req, res) => {
  const { userID } = req.body;

  const trainee = await IndTrainee.findById(userID);

  const array = trainee.courses;

  let myCourses = [];
  let i = 0;
  while(i < array.length)
  {
    const currentCourse = await Course.findById(array[i].course)
    myCourses = myCourses.concat(currentCourse);
    i++;
  }

  if(!trainee) 
  {
    return res.status(404).json({error: 'No such Individual Trainee'})
  }
  res.status(200).json(myCourses);
}


//////////////////////////////////////////////////////////////

//// add a new rate to the instructor and calculate the new overall instructor rate
var avgRate =0;
var accRate = 0;
const rateInstructor = async (req, res) => {
    const courseId= req.query.courseId;
    if(!mongoose.Types.ObjectId.isValid(courseId)){
        return res.status(404).json({error: 'No such Instructor'})
    }
    const aCourse = await Course.find({
        _id:courseId,
    });

    var {uRate} = await req.body;
    accRate = aCourse[0].accRates + parseInt(uRate)
    var lCount=aCourse[0].numOfRates;
    lCount++;
    var nCount= lCount;
    avgRate = accRate/nCount
    const CourseInstructor = await Course.findOneAndUpdate({_id:courseId},{
        instructorRate:avgRate,
        numOfRates:nCount,
        accRates: accRate
    })

    if(!CourseInstructor){
        return res.status(400).json({error:'No such Course'})

    }
    res.status(200).json(CourseInstructor);       
    }

  const addReview = async (req, res) => {
    const courseId= req.query.courseId;
    if(!mongoose.Types.ObjectId.isValid(courseId)){
        return res.status(404).json({error: 'No such course'})
    }
    const aCourse = await Course.find({_id:courseId});
    var prevReviewsList= aCourse[0].reviews;

   // Enter your review
    var userReview = await req.body;
    const  newReviewsList = prevReviewsList.concat(userReview)
 
    const C = await Course.findOneAndUpdate({_id:courseId},{
        reviews:newReviewsList
    })

    if(!C){
        return res.status(400).json({error:'No such course'})

    }
    res.status(200).json(C);       
    }

 // View only the users courses by filtering the courses by the user's id
  const filterCourses = async(req,res) => {
    const { id } = req.params;

    const result = await Course.find({individualTrainee:mongoose.Types.ObjectId(id)});
    res.status(200).json(result)

    if(!result) {
        res.status(400).json({error:"No such user"})
    }

  }

// add a new rate to the course and calculate the new overall course rate
var averageRate = 0;
var accumlatedRate = 0;
const rateCourse = async (req, res) => {
    const courseId= req.query.courseId;
    
    if(!mongoose.Types.ObjectId.isValid(courseId)){
        return res.status(404).json({error: 'No such course'})
    }
    const aCourse = await Course.find({_id:courseId});
    var {userRate} = await req.body;
    
    var lastCount=aCourse[0].numberOfRates;
    accumlatedRate =  aCourse[0].accumlatedRates + parseInt(userRate)
    var lastCount = aCourse[0].numberOfRates;
    lastCount++;
    var newCount= lastCount;
    averageRate =  accumlatedRate /  newCount
    const C = await Course.findOneAndUpdate({_id:courseId},{
        courseRating:averageRate,
        numberOfRates:newCount,
        accumlatedRates:accumlatedRate
    })

    if(!C){
        return res.status(400).json({error:'No such course'})

    }
    res.status(200).json(C);       
    }

    const reviewCourse = async (req,res)=>{
      const courseId= req.query.courseId;
      if(!mongoose.Types.ObjectId.isValid(courseId)){
          return res.status(404).json({error: 'No such course'})
      }
      const individualTraineeId = req.query.individualTraineeId;
      if(!mongoose.Types.ObjectId.isValid(individualTraineeId)){
        return res.status(404).json({error: 'No such user'})
    }
      const user = await IndTrainee.find({_id:individualTraineeId});

      const aCourse = await Course.find({_id:courseId})
    
    const {userReview} = req.body;
    const userName = user[0].username
    const courseName = aCourse[0].title

    let emptyFields = [];
    
    if(!userName) {
      emptyFields.push('userName')
  } 
  if(!courseName) {
    emptyFields.push('courseName')
} 
    if(!userReview) {
        emptyFields.push('userReview')
    } 
    if(!courseId) {
        emptyFields.push('courseId')
    }
    if(!individualTraineeId) {
      emptyFields.push('individualTraineeId')
  }
  
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
  
    // Add doc to database
    try {
        const Review = await review.create({userName,courseName, userReview,courseId,individualTraineeId});
        res.status(200).json(Review);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
  
    }
  

module.exports={
  getIndTrainees,
  getIndTrainee,
  signupIndTrainee,
  deleteIndTrainee,
  changePasswordIndTrainee,
  loginIndTrainee,
  forgotPasswordIndTrainee,
  updateIndTraineeProfile,
  compareAnswers,
  updateProgress,
  getProgress,
  getMyCourses,
  rateInstructor,
  rateCourse,
  addReview,
  filterCourses,
  reviewCourse,
  compareAnswers,
  addProblem,
  viewProblem,
  getCourses
}