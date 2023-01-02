const mongoose = require("mongoose");
const Course = require("../models/course");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const CorporateTrainee = require('../models/corporateTraineeModel');
const exercise = require('../models/exercise');

const review = require ('../models/reviewsModel')
///////////////
const RequestCourse = require ('../models/requestCourse')
const MyRequests = require ('../models/requestsStatus')

//get all corporateTrainees
const getCorporateTrainees = async (req, res) => {
  const corporateTrainees = await CorporateTrainee.find({}).sort({
    createdAt: -1,
  });
  res.status(200).json(corporateTrainees);
};

//get a single corporateTrainee
const getCorporateTrainee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such CorporateTrainee" });
  }
  const corporateTrainee = await CorporateTrainee.findById(id);

  if (!corporateTrainee) {
    return res.status(404).json({ error: "No such CorporateTrainee" });
  }
  res.status(200).json(corporateTrainee);
};

//create new CorporateTraineeModel
const createCorporateTrainee = async (req, res) => {
  const { name, username, email, password } = req.body;
  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!username) {
    emptyFields.push("username");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  // if (!grade) {
  //   emptyFields.push('grade')
  // }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const corporateTrainee = await CorporateTrainee.create({name, username ,email , password:hashedPassword})
    res.status(200).json(corporateTrainee)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a corporateTrainee
const deleteCorporateTrainee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such corporateTrainee" });
  }
  const corporateTrainee = await CorporateTrainee.findOneAndDelete({ _id: id });

  if (!corporateTrainee) {
    return res.status(400).json({ error: "No such corporateTrainee" });
  }
  res.status(200).json(corporateTrainee);
};

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

const changeEmailCorporateTrainee = async (req, res) => {
  const { id } = req.body;
  const { email } = req.body;

  if (!id || !email) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such corporate trainee" });
  }
  try {
    const corporateTrainee = await CorporateTrainee.findOneAndUpdate(
      { _id: id },
      { email: email }
    );
    if (!corporateTrainee) {
      return res.status(400).json({ error: "No such corporate trainee" });
    }
    res.status(200).json(corporateTrainee);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

const updateCorporateTraineeProfile = async (req, res) => {
  const { id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such corporte trainee" });
  }

  const corporateTrainee = await CorporateTrainee.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );
  if (!corporateTrainee) {
    return res.status(400).json({ error: "No such corporate trainee" });
  }
  res.status(200).json(corporateTrainee);
};

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

const forgotPasswordCorporateTrainee = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please Write your email" });
  }

  try {
    const corporateTrainee = await CorporateTrainee.findOne({ email: email });
    if (corporateTrainee) {
      let mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Reset Password",
        html: `<p>We heard that you lost the password.</p><p>Don't worry, use this link to reset it</p>
            <p>This link<b> expires in 60 minutes</b>.</p> 
            <a href="http://localhost:3000/resetPassword">reset your password now</a>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.json(error);
      });
      res.status(200).json({ success: "email sent" });
    } else {
      res.status(404).json({ error: "incorrect email" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const gradeExam = async (req, res) => {
  const idCourse = req.params.idCourse;
  const idTrainee = req.params.idTrainee;
  console.log(idCourse, idTrainee);

  if (!mongoose.Types.ObjectId.isValid(idCourse)) {
    return res.status(404).json({ error: "No such course" });
  }
  if (!mongoose.Types.ObjectId.isValid(idTrainee)) {
    return res.status(404).json({ error: "No such Corporate Trainee" });
  }
  const trainee = await CorporateTrainee.findOne({_id: idTrainee})
  const crs = await Course.findOne({_id: idCourse})
  const exam = crs.finalExam
  const temp = trainee.answers
  let i =0;
  let sum=0;
  while(i<exam.length && temp.length!=0){
    let idTemp = exam[i]._id
    let j=0;
    while(j<temp.length){
      if((temp[j].exercise == exam[i]._id) && (temp[j].answer == exam[i].answer)){
        sum++;
        console.log("answer array: ", temp[j].answer , "solution: ", exam[i].answer)
      }
      j++;
    }
    console.log(idTemp)
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

const viewSolution = async (req, res) => {
  const { idCourse } = req.params;
  if (!mongoose.Types.ObjectId.isValid(idCourse)) {
    return res.status(404).json({ error: "No such course" });
  }

    const crs = await Course.findOne({_id: idCourse});
    
    const exam = crs.finalExam;
    if(exam == null) {
      return res.status(404).json({error: 'No Exam'})
  }
    console.log(exam)

  if (exam) {
    return res.status(200).json(exam);
  }
  return res.status(404).json({ error: "This Course does not have an exam" });
};

const setAnswer = async (req, res) => {
  const idCourse = req.params.idCourse;
  const id = req.params.id;
  const idEx = req.params.idEx;
  const answer = req.params.answer;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Corporate Trainee" });
  }
  if (!mongoose.Types.ObjectId.isValid(idCourse)) {
    return res.status(404).json({ error: "No such Course" });
  }

    const trainee = await CorporateTrainee.findById({_id: id })
    const crs = await Course.findOne({_id: idCourse})
    const examT = crs.finalExam
    console.log(examT)
    let i =0;
    let exercise = null;
    while(i < examT.length){
      if(examT[i]._id == idEx)
         exercise =examT[i]
      i++
    }
    console.log(examT,exercise)
    let ansr = '';
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
    const obj ={
      exercise: idEx,
      answer: ansr
    }
    const ans = trainee.answers.concat([obj])
    const finalT = await CorporateTrainee.findOneAndUpdate({_id: id }, {answers : ans})
    console.log(finalT)

    if(!trainee) {
        return res.status(404).json({error: 'No such Corporate Trainee'})
    }
    res.status(200).json(trainee);
}
// const getNumber = async (req,res) => {
//   const idCourse = req.params.idCourse;
//   const idEx = req.params.idEx;
//   console.log(idCourse,idEx)
//   if(!mongoose.Types.ObjectId.isValid(idCourse)) {
//     return res.status(404).json({error: 'No such Course'})
// }

//   const course = await Course.findOne({_id: idCourse})
//   const examT = course.finalExam
//   console.log(examT)
//   let i = 0; 
//   let temp = null;
//   while(i<examT.length){
//     if(examT[i]._id == idEx)
//       temp = examT[i];
//     i++;
//   }
//   let c =0;
//   if(answer==firstChoice)
//     c=1;
//   else if (answer == secondChoice)
//     c=2;
//   else if (answer == thirdChoice)
//     c=3;
//   else 
//     c=4;
//   console.log(c)
//   res.status(200).json(c);

// }

const getEx = async (req,res) => {
    const idCourse = req.params.idCourse;
    const idEx = req.params.idEx;
    console.log(idCourse,idEx)
    if(!mongoose.Types.ObjectId.isValid(idCourse)) {
      return res.status(404).json({error: 'No such Course'})
  }
  
    const course = await Course.findOne({_id: idCourse})
    const examT = course.finalExam
    console.log(examT)
    let i = 0; 
    let ex = null;
    while(i<examT.length){
      if(examT[i]._id == idEx)
        ex= examT[i]
      i++;
    }
    res.status(200).json(ex);
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

const addProblem = async(req,res) => {
  const id = req.params.id;
  const problem = req.params.problem;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Corporate Trainee'})
}
  const trainee = await CorporateTrainee.findById({_id: id })
  console.log(id,problem)
  const obj = {
    problem: problem,
    status: 'Pending',
    response: 'No Response'
  };
  const problemTemp = trainee.problem.concat([obj])
  console.log(problemTemp)  
  const finalT = await CorporateTrainee.findOneAndUpdate({_id: id }, {problem : problemTemp})
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
            
            // create request
           
              const requestCourse = await RequestCourse.create({courseName, corporateTraineeName, reason , highestLevelOfEducation,employmentStatus,agreedToPolicy,corporateTraineeId,courseId})
              // var requests = UserWhoApplied[0].requests
              // var status = "pending"
              // var newRequest = requests.push({courseId:{courseId},coursename:{courseName},requestStatus:status});

              // await CorporateTrainee.findOneAndUpdate({_id:corporateTraineeId},{
              //   requests:newRequest
              // })
              var status = "pending"
              await MyRequests.create({courseName,courseId,corporateTraineeId,status})

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
    const { userID } = req.body;
    if(userID){
        const courses = await Course.find({}).sort({createdAt: -1});
        for (let i = 0 ; i<courses.length; i++){
            for(j = 0; j<(courses[i].corporateTrainee).length; j++){}
                if ((courses[i].corporateTrainee)[j] === userID){
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
    
const viewProblem = async(req,res) => {
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Corporate Trainee'})
}
  const trainee = await CorporateTrainee.findById({_id: id })
  console.log(id)
  const problem = trainee.problem
  if(!trainee) {
    return res.status(404).json({error: 'No such Corporate Trainee'})
}
if(problem==[]){
  res.status(200).json([]);
}
res.status(200).json(problem);
}

// View only the user courses by filtering the courses by the user's id
// const filterCourses = async(req,res) => { 
//   // const corporateTraineeId = req.query.corporateTraineeId;
//   const { id } = req.params;
//   if(id){
//   const result = await Course.find({corporateTrainee:mongoose.Types.ObjectId(id)});
//   res.status(200).json(result)
//   }else{
//       res.status(400).json({error:"corporateTraineeId  is required"})
//   }
// }

const filterCourses = async(req,res) => { 
  // const corporateTraineeId = req.query.corporateTraineeId;
  const { userID } = req.body;
  if(userID){
  const result = await Course.find({corporateTrainee:mongoose.Types.ObjectId(userID)});
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
  if(!corporateTraineeId) {
    emptyFields.push('corporateTraineeId')
}

  if(emptyFields.length > 0) {
      return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }

  // Add doc to database
  try {
      const Review = await review.create({userName, userReview,courseName,courseId,corporateTraineeId});
      res.status(200).json(Review);
  } catch (error) {
      res.status(400).json({error: error.message});
  }

  }
  const sendEmail = async (
    subject,
    message,
    send_to,
    sent_from,
    reply_to,
    attachments
   ) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });
    
    const options = {
      from: sent_from,
      to: send_to,
      replyTo: reply_to,
      subject: subject,
      html: message,
      attachments: [
        {
          filename: "My Certificate.pdf",
          path: "D:\BlueHats\backend\assets\My Certificate.pdf",
        },
      ],
    };
    
    // Send Email
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
   };
   const getCertificateCoTrainee = async (req, res) => {
    const { DynammicEmail, DynammicSubject, DynammicName } = req.body;
    
    try {
      const send_to = DynammicEmail;
      const sent_from = process.env.EMAIL_USER;
      const reply_to = DynammicEmail;
      const subject = DynammicSubject;
      const message = `
          <h3>Hello ${DynammicName} </h3>
          <p>Thank you for Completing your course</p>
          <p>Regards...</p>
      `;
    
      await sendEmail(subject, message, send_to, sent_from, reply_to);
      res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
      res.status(500).json(error.message);
    }
   };

   const updateProgress = async(req, res) => {
    const { progress } = req.body;
    const { courseID } = req.body;
    const { userID } = req.body;
  
    const trainee = await CorporateTrainee.findById(userID);
  
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
  
    const updatedTrainee = await CorporateTrainee.findOneAndUpdate({_id: userID} , {courses: newCourses});
  
    if(!trainee) 
    {
      return res.status(404).json({error: 'No such Individual Trainee'})
    }
    res.status(200).json(updatedTrainee);
  }
  
  const getProgress = async(req, res) => {
    const { courseID } = req.body;
    const { userID } = req.body;
  
    const trainee = await CorporateTrainee.findById(userID);
  
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
      return res.status(404).json({error: 'No such Corporate Trainee'})
    }
    res.status(200).json(myProgress);
  
  }
  const getMyCourses = async(req, res) => {
    const { userID } = req.body;
  
    const trainee = await CorporateTrainee.findById(userID);
  
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
      return res.status(404).json({error: 'No such Corporate Trainee'})
    }
    res.status(200).json(myCourses);
  }

module.exports={
  getCorporateTrainee,
  getCorporateTrainees,
  createCorporateTrainee,
  deleteCorporateTrainee,
  updateCorporateTraineeProfile,
  changeEmailCorporateTrainee,
  forgotPasswordCorporateTrainee,
  gradeExam,
  viewSolution,
  rateCourse,
  rateInstructor,
  addReview,
  requestCourse,
  availableCourses,
  filterCourses,
  compareAnswers,
  addProblem,
  viewProblem,
  getEx,
  reviewCourse,
  getCertificateCoTrainee,
  updateProgress,
  getProgress,
  getMyCourses
                }
