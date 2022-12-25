const mongoose = require('mongoose')
const Course = require('../models/course');
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")

const CorporateTrainee = require('../models/corporateTraineeModel')

const review = require ('../models/reviewsModel')
///////////////
const RequestCourse = require ('../models/requestCourse')

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
    const corporateTrainee = await CorporateTrainee.create({name, username ,email , password})
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
const changePasswordCorporateTrainee = async (req,res) => 
{
  //const {id}=req.body
  const {password}=req.body
  // const{confirmPassword}=req.body
  
  if( !password )
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
  //     return res.status(404).json({error:'No such CoTrainee'})
  // }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const corporateTrainee = await CorporateTrainee.findOneAndUpdate({_id:"638b99a29e29c8411f27a292"},{password:hashedPassword})
  if(!corporateTrainee)
  {
      return res.status(400).json({error:'No such corporate trainee'})
  }
  res.status(200).json(corporateTrainee)
}

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
    const updatedTrainee = await CorporateTrainee.findOneAndUpdate( {_id: idTrainee} , {grade: ans});
    console.log(updatedTrainee)

    if(!updatedTrainee) {
        return res.status(404).json({error: 'No such Corporate Trainee'})
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
        return res.status(404).json({error: 'No such Corporate Trainee'})
    }

    const trainee = await CorporateTrainee.findById({_id: id })
    console.log(trainee)
    const temp =[answer]
    console.log(temp)
    const ans = trainee.answers.concat(temp)
    console.log(ans)
    const finalT = await CorporateTrainee.findOneAndUpdate({_id: id }, {answers : ans})
    console.log(finalT)

    if(!trainee) {
        return res.status(404).json({error: 'No such Corporate Trainee'})
    }
    

    res.status(200).json(trainee);


}



//// add a new rate to the instructor and calculate the new overall instructor rate
const rateInstructor = async (req, res) => {
    const courseId= req.query.courseId;
    if(!mongoose.Types.ObjectId.isValid(courseId)){
        return res.status(404).json({error: 'No such Instructor'})
    }
    const aCourse = await Course.find({
        _id:courseId,
    });
    var {uRate} = await req.body;
    var accRate = aCourse[0].accRates + parseInt(uRate)
    var lCount=aCourse[0].numOfRates;
    lCount++;
    var nCount= lCount;
    var avgRate = accRate/nCount
    const CourseInstructor = await Course.findOneAndUpdate({_id:courseId},{
        instructorRate:avgRate,
        numOfRates:nCount,
        accRates: accRate
    })

    if(!CourseInstructor){
        return res.status(400).json({error:'No such Instructor'})

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
        const  newReviewsList = prevReviewsList.concat((userReview))
      
        const C = await Course.findOneAndUpdate({_id:courseId},{
            reviews:newReviewsList
        })
    
        if(!C){
            return res.status(400).json({error:'No such course'})
    
        }
        res.status(200).json(C);       
        }

    
    const requestCourse = async (req, res) => {

            const courseId = req.query.courseId;
            if(!mongoose.Types.ObjectId.isValid(courseId)){
                return res.status(404).json({error: 'No such course'})
            }
            const requestedCourse = await Course.find({_id:courseId});

            const courseName = requestedCourse[0].title;

            const corporateTraineeId = req.query.corporateTraineeId;

            if(!mongoose.Types.ObjectId.isValid(corporateTraineeId)){
                return res.status(404).json({error: 'No such user exists'})
            }
            const UserWhoApplied = await CorporateTrainee.find({_id:corporateTraineeId});

            const corporateTraineeName = UserWhoApplied[0].username;
            
            // create request
            const {reason , highestLevelOfEducation ,employmentStatus,agreedToPolicy} = await req.body
            let emptyFields = []

            if (!reason) {
                emptyFields.push('reason')
            }
            if (!highestLevelOfEducation) {
                emptyFields.push('highestLevelOfEducation')
            }
            if (!employmentStatus) {
                emptyFields.push('employmentStatus')
            }
            if (!agreedToPolicy) {
                emptyFields.push('agreedToPolicy')
            }

            if (emptyFields.length > 0) {
                return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
            }
            try {
                const requestCourse = await RequestCourse.create({courseName, corporateTraineeName, reason , highestLevelOfEducation,employmentStatus,agreedToPolicy,corporateTraineeId,courseId})
                res.status(200).json(requestCourse)
              } catch (error) {
                res.status(400).json({error: error.message})
              }
        }


// View only the users courses by filtering the courses by the user's id
var availableC = [];
var flag = 0;
var j;
const availableCourses = async(req,res) => { 
    // const corporateTraineeId = req.query.corporateTraineeId;
    const { id } = req.params;
    if(id){
        const courses = await Course.find({}).sort({createdAt: -1});
        for (let i = 0 ; i<courses.length; i++){
            for(j = 0; j<(courses[i].corporateTrainee).length; j++){}
                if ((courses[i].corporateTrainee)[j] === id){
                    flag = 1;
                    break;
                }
            if (flag == 1)
            {
                continue;
            }
            else {
                 availableC.push(courses[i]);
            }
            }        
        res.status(200).json(availableC)
    }
    else{
        res.status(400).json({error:"corporateTraineeId  is required"})
    }
    
}

// View only the user courses by filtering the courses by the user's id
const filterCourses = async(req,res) => { 
  // const corporateTraineeId = req.query.corporateTraineeId;
  const { id } = req.params;
  if(id){
  const result = await Course.find({corporateTrainee:mongoose.Types.ObjectId(id)});
  res.status(200).json(result)
  }else{
      res.status(400).json({error:"corporateTraineeId  is required"})
  }
}

//////////////////////////////////////////////////

const rateCourse = async (req, res) => {
  const courseId= req.query.courseId;
  if(!mongoose.Types.ObjectId.isValid(courseId)){
      return res.status(404).json({error: 'No such course'})
  }
  const aCourse = await Course.find({_id:courseId});


  var lastCount=aCourse[0].numberOfRates;
  var {userRate} = await req.body;
  var accumlatedRate =  aCourse[0].accumlatedRates + parseInt(userRate)
  var lastCount = aCourse[0].numberOfRates;
  lastCount++;
  var newCount= lastCount;
  var averageRate =  accumlatedRate /  newCount
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
    const corporateTraineeId = req.query.corporateTraineeId;
    if(!mongoose.Types.ObjectId.isValid(corporateTraineeId)){
      return res.status(404).json({error: 'No such user'})
  }
    const user = await CorporateTrainee.find({_id:corporateTraineeId});

  
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
  if(!corporateTraineeId) {
    emptyFields.push('corporateTraineeId')
}

  if(emptyFields.length > 0) {
      return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }

  // Add doc to database
  try {
      const Review = await review.create({userName, userReview,courseId,corporateTraineeId});
      res.status(200).json(Review);
  } catch (error) {
      res.status(400).json({error: error.message});
  }

  }

module.exports={getCorporateTrainee,
                getCorporateTrainees,
                createCorporateTrainee,
                deleteCorporateTrainee,
                updateCorporateTraineeProfile,
                changeEmailCorporateTrainee,
                forgotPasswordCorporateTrainee,
                changePasswordCorporateTrainee,
                gradeExam,
                viewSolution,
                rateCourse,
                rateInstructor,
                addReview,
                requestCourse,
                availableCourses,
                filterCourses,
                reviewCourse
                }
