const mongoose = require('mongoose')
const Course = require('../models/course');
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")

const CorporateTrainee = require('../models/corporateTraineeModel')

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
    const {name, username , email , password} = req.body
    let emptyFields = []

    if (!name) {
      emptyFields.push('name')
    }
    if (!username) {
      emptyFields.push('username')
    }
    if (!email) {
      emptyFields.push('email')
    }
    if (!password) {
      emptyFields.push('password')
    }
    // if (!grade) {
    //   emptyFields.push('grade')
    // }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const corporateTrainee = await CorporateTrainee.create({name, username ,email , password:hashedPassword})
    res.status(200).json(corporateTrainee)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//delete a corporateTrainee
const deleteCorporateTrainee =async (req,res) => 
{
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such corporateTrainee'})
    }
    const corporateTrainee = await CorporateTrainee.findOneAndDelete({_id:id})

    if(!corporateTrainee){
        return res.status(400).json({error:'No such corporateTrainee'})
    }
    res.status(200).json(corporateTrainee)
}

//update an corporateTrainee
// const changePasswordCorporateTrainee = async (req,res) => 
// {
//   //const {id}=req.body
//   const {password}=req.body
//   // const{confirmPassword}=req.body
  
//   if( !password )
//   {
//     return res.status(400).json({ error: 'Please fill in all fields'})
//   }
//   // const pass = await bcrypt.compare(password, confirmPassword);
//   // if(!password === confirmPassword)
//   // {
//   //   return res.status(400).json({ error: 'Password is  not confirmed'})
//   // }
  
//   // if(!mongoose.Types.ObjectId.isValid(id))
//   // {
//   //     return res.status(404).json({error:'No such CoTrainee'})
//   // }
//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash(password, salt);

//   const corporateTrainee = await CorporateTrainee.findOneAndUpdate({_id:"638b99a29e29c8411f27a292"},{password:hashedPassword})
//   if(!corporateTrainee)
//   {
//       return res.status(400).json({error:'No such corporate trainee'})
//   }
//   res.status(200).json(corporateTrainee)
// }

const changeEmailCorporateTrainee = async (req,res) => 
{
  const {id}=req.body
  const {email}=req.body

  if(!id || !email)
  {
    return res.status(400).json({ error: 'Please fill in all fields'})
  }
  if(!mongoose.Types.ObjectId.isValid(id))
  {
    return res.status(404).json({error:'No such corporate trainee'})
  }
  try
  {
    const corporateTrainee = await CorporateTrainee.findOneAndUpdate({_id:id},{email:email})
    if(!corporateTrainee){
        return res.status(400).json({error:'No such corporate trainee'})
    }
    res.status(200).json(corporateTrainee)
  }
  catch(error)
  {
    console.log(error)
    res.status(404).json(error)
  }
}

const updateCorporateTraineeProfile =async (req,res) => 
{
  const {id}=req.body

  if(!mongoose.Types.ObjectId.isValid(id))
  {
      return res.status(404).json({error:'No such corporte trainee'})
  }

  const corporateTrainee = await CorporateTrainee.findOneAndUpdate({_id:id},{...req.body})
  if(!corporateTrainee)
  {
      return res.status(400).json({error:'No such corporate trainee'})
  }
  res.status(200).json(corporateTrainee)
}

let transporter = nodemailer.createTransport
({
    service:"gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS,
    }
})

const forgotPasswordCorporateTrainee = async (req,res) =>
{
  const{email}=req.body

  if(!email)
  {
    return res.status(400).json({ error: 'Please Write your email'})
  }

  try
  {
    const corporateTrainee = await CorporateTrainee.findOne({email:email})
    if(corporateTrainee)
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
                createCorporateTrainee,
                deleteCorporateTrainee,
                updateCorporateTraineeProfile,
                changeEmailCorporateTrainee,
                forgotPasswordCorporateTrainee,
                gradeExam,
                viewSolution,
                setAnswer,
                compareAnswers
                }
