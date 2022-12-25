const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
// const generateToken =require ( "../utils/generateToken")
const nodemailer = require("nodemailer")
require('dotenv').config();
const bcrypt = require('bcrypt')
 
const IndTrainee = require('../models/indTraineeModel')
const Course = require('../models/course')
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
        const user = await IndTrainee.create({ firstName:firstName ,lastName:lastName,username:username, email: email, password: hashedPassword ,gender:gender , type:type});
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


const gradeExam = async(req,res) => {
    const idCourse = req.params.idCourse
    const idTrainee = req.params.idTrainee
    console.log(idCourse,idTrainee)
  
      if(!mongoose.Types.ObjectId.isValid(idCourse)) {
          return res.status(404).json({error: 'No such course'})
      }
      if(!mongoose.Types.ObjectId.isValid(idTrainee)) {
        return res.status(404).json({error: 'No such Individual Trainee'})
    }
    const trainee = await IndTrainee.findOne({_id: idTrainee})
    const crs = await Course.findOne({_id: idCourse})
    console.log(trainee,crs)
    let i =0;
    let sum=0;
    while(i<crs.finalExam.length){
      const first = crs.finalExam[i].answer
      const second = trainee.answers[i]
      console.log(first,second)
      i++;
      if(first === second)
        sum++;
    }
    const temp =[{idCourse,sum}]
      console.log(temp)
      const arr = trainee.grade
      const obj = {
        course: idCourse,
        num: sum
      };
      const ans = arr.concat([obj])
      const updatedTrainee = await IndTrainee.findOneAndUpdate( {_id: idTrainee} , {grade: ans});
      console.log(updatedTrainee)
  
      if(!updatedTrainee) {
          return res.status(404).json({error: 'No such Individual Trainee'})
      }
  
      return res.status(200).json(sum);
  }
  
  const viewSolution = async(req,res) => {
    const { idCourse } = req.params;
    //console.log(idCourse)
  
      if(!mongoose.Types.ObjectId.isValid(idCourse)) {
          return res.status(404).json({error: 'No such course'})
      }
  
      const crs = await Course.findOne({_id: idCourse});
      //console.log(crs)
      const exam = crs.finalExam;
      console.log(exam)
  
      if(exam) {
          return res.status(200).json(exam);
      }
      return res.status(404).json({error: 'This Course does not have an exam'})
  }
  
  const setAnswer = async(req,res) => {
    const id = req.params.id;
    const answer = req.params.answer;
    console.log(id,answer)
    if(!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({error: 'No such Individual Trainee'})
      }
  
      const trainee = await IndTrainee.findById({_id: id })
      console.log(trainee)
      const temp =[answer]
      console.log(temp)
      const ans = trainee.answers.concat(temp)
      console.log(ans)
      const finalT = await IndTrainee.findOneAndUpdate({_id: id }, {answers : ans})
      console.log(finalT)
  
      if(!trainee) {
          return res.status(404).json({error: 'No such Individual Trainee'})
      }
      
  
      res.status(200).json(trainee);
  
  
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
  
    
    const {userReview} = req.body;
    const userName = user[0].username
    let emptyFields = [];
    
    if(!userName) {
      emptyFields.push('userName')
  } 
    if(!userReview) {
        emptyFields.push('userReview')
    } 
    if(!courseId) {
        emptyFields.push('courseId')
    }
    if(!individualTraineeId) {
      emptyFields.push('corporateTraineeId')
  }
  
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
  
    // Add doc to database
    try {
        const Review = await review.create({userName, userReview,courseId,individualTraineeId});
        res.status(200).json(Review);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
  
    }
  

module.exports={getIndTrainee,
  getIndTrainees,signupIndTrainee,deleteIndTrainee,changePasswordIndTrainee,loginIndTrainee,forgotPasswordIndTrainee,updateIndTraineeProfile,gradeExam,viewSolution,setAnswer,rateCourse,addReview,rateInstructor,filterCourses,reviewCourse}