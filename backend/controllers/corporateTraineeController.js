const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")
const validator = require('validator')

const Admin = require('../models/adminModel')
const CorporateTrainee = require('../models/corporateTraineeModel')
const Instructor = require('../models/instructorModel')
const IndTrainee = require('../models/indTraineeModel')
const Course = require('../models/course');

//get all corporateTrainees
const getCorporateTrainees=async (req,res)=> 
{
    const corporateTrainees=await CorporateTrainee.find({}).sort ({createdAt:-1})
    res.status(200).json(corporateTrainees)
}

//get a single corporateTrainee
const getCorporateTrainee = async (req,res) => 
{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such CorporateTrainee'})
    }
    const corporateTrainee =await CorporateTrainee.findById(id)

    if(!corporateTrainee){
        return res.status(404).json({error:'No such CorporateTrainee'})
    }
    res.status(200).json(corporateTrainee)
}

//create new CorporateTraineeModel
const createCorporateTrainee=async (req,res) =>
{
    const {firstName , lastName , username , email , password , gender , corporate} = req.body
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
    if (!corporate) 
    {
      emptyFields.push('corporate')
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
    const coTrainee = await CorporateTrainee.create({firstName, lastName, username , email, password:hashedPassword , gender , flag:"false" , corporate})
    res.status(200).json(coTrainee)
  } 
  catch (error) 
  {
    res.status(400).json({error: error.message})
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
      return res.status(404).json({error: 'No such Corporate Trainee'})
  }
  const trainee = await CorporateTrainee.findOne({_id: idTrainee})
  const crs = await Course.findOne({_id: idCourse})
  let i =0;
  let sum=0;
  while(i<crs.finalExam.length && trainee.answers.length!=0){
    const first = crs.finalExam[i].answer
    const second = trainee.answers[i]
    console.log(first,second)
    i++;
    if(first == second)
      sum++;
  }
    
    const gradeArr = trainee.grade
    let k = 0
    let flag = false
    let gradeTrainee = sum;
    while(k<gradeArr.length){
      if(gradeArr[k].course == idCourse){
        flag = true;
        if(gradeTrainee<gradeArr[k].num)
           gradeTrainee=gradeArr[k].num
        else{
          flag=false
          gradeArr.splice(k, 1);
        }
           
      }
      k++;
    }
    const obj = {
      course: idCourse,
      num: gradeTrainee
    };
    const ans = gradeArr.concat([obj])  
   
    if(flag==false)
    {  const updatedTrainee = await CorporateTrainee.findOneAndUpdate({_id: idTrainee} , {grade: ans});
      console.log(updatedTrainee)
      updated = true
      if(!updatedTrainee) {
        return res.status(404).json({error: 'No such Corporate Trainee'})
    }}
       await CorporateTrainee.findOneAndUpdate({_id: idTrainee} , {answers: []});
   
    return res.status(200).json(gradeTrainee);
}

const viewSolution = async(req,res) => {
  const { idCourse } = req.params;
    if(!mongoose.Types.ObjectId.isValid(idCourse)) {
        return res.status(404).json({error: 'No such course'})
    }

    const crs = await Course.findOne({_id: idCourse});
    const exam = crs.finalExam;
    console.log(exam)

    if(exam) {
        return res.status(200).json(exam);
    }
    return res.status(404).json({error: 'This Course does not have an exam'})
}

const setAnswer = async(req,res) => {
  const idCourse = req.params.idCourse;
  const id = req.params.id;
  const answer = req.params.answer;
  if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Corporate Trainee'})
    }
  if(!mongoose.Types.ObjectId.isValid(idCourse)) {
      return res.status(404).json({error: 'No such Course'})
  }

    const trainee = await CorporateTrainee.findById({_id: id })
    const course = await Course.findOne({_id: idCourse})
    const examT = course.finalExam
    const index = trainee.answers.length ;
    const exercise = examT[index];
    console.log(examT,index)
    let ansr = ''
    if(answer=='1'){
       ansr = exercise.firstChoice 
    }
    else if (answer=='2'){
       ansr = exercise.secondChoice
    }
    else if (answer=='3'){
       ansr = exercise.thirdChoice
    }
    else if (answer =='4'){
       ansr = exercise.fourthChoice
    }
    const temp =[ansr]
    const ans = trainee.answers.concat(temp)
    const finalT = await CorporateTrainee.findOneAndUpdate({_id: id }, {answers : ans})
    console.log(finalT)

    if(!trainee) {
        return res.status(404).json({error: 'No such Corporate Trainee'})
    }
    res.status(200).json(trainee);
}
const compareAnswers = async(req,res) => {
  const solution = req.params.solution;
  const answer = req.params.answer;
  console.log(solution,answer)
  if(solution == answer)
    return res.json(true)
  else 
    return res.json(false)
    

}

module.exports={getCorporateTrainee,
                getCorporateTrainees,
                gradeExam,
                createCorporateTrainee,
                viewSolution,
                setAnswer,
                compareAnswers
                }
