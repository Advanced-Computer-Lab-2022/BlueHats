const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const generateToken =require ( "../utils/generateToken")
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();
const bcrypt = require("bcrypt");

const IndTrainee = require("../models/indTraineeModel");
const Course = require("../models/course");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "supersecret", {
    expiresIn: maxAge,
  });
};

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

//signUp method
const signupIndTrainee = async (req, res) => {
  const { firstName, lastName, username, email, password, gender, type } =
    req.body;
  if (
    !email ||
    !password ||
    !username ||
    !type ||
    !firstName ||
    !lastName ||
    !gender
  ) {
    return res.status(404).send({ error: "please fill in all fields" });
  }

  if (!validator.isEmail(email)) {
    return res.status(404).send({ error: "email is not valid" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(404).send({ error: "password is not strong enough" });
  }

  const exists = await IndTrainee.findOne({ email });

  if (exists) {
    return res.status(404).send({ error: "This email is already in use" });
  }
  const used = await IndTrainee.findOne({ username });

  if (used) {
    return res.status(404).send({ error: "This username is already taken" });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await IndTrainee.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hashedPassword,
      gender: gender,
      type: type,
    });
    const token = createToken(user.userName);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    //res.status(200).json(user)

    let mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify your email",
      html: `<p>Please verify your email.</p><p>Don't worry, use this link to reset it</p>
                <p>This link<b> expires in 60 minutes</b>.</p> 
                <a href="http://localhost:3000/login">Log in now to verify your account</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.json(error);
    });

    res.status(200).send("Check your email");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login method
const loginIndTrainee = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).send({ error: "please fill in all fields" });
  }

  try {
    const user = await IndTrainee.findOne({ username });
    console.log(user);

    if (user) {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        const token = createToken(user.username);
        res.send("Auth Successful");
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      } else {
        res.send("Wrong password.");
      }
    } else {
      res.send("Wrong username");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get a single instructor
const getIndTrainee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such trainee" });
  }
  const indTrainee = await IndTrainee.findById(id);

  if (!indTrainee) {
    return res.status(404).json({ error: "No such trainee" });
  }
  res.status(200).json(indTrainee);
};

//get all individualTrainees
const getIndTrainees = async (req, res) => {
  const indTrainees = await IndTrainee.find({}).sort({ createdAt: -1 });
  res.status(200).json(indTrainees);
};

//delete an individualTrainee
const deleteIndTrainee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such indTrainee" });
  }
  const indTrainee = await IndTrainee.findOneAndDelete({ _id: id });

  if (!indTrainee) {
    return res.status(400).json({ error: "No such indTrainee" });
  }
  res.status(200).json(indTrainee);
};

//update an individualTrainee
const changePasswordIndTrainee = async (req, res) => {
  // const {id}=req.body
  const { password } = req.body;
  // const{confirmPassword}=req.body

  if (!password) {
    return res.status(400).json({ error: "Please fill in all fields" });
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

  const indTrainee = await IndTrainee.findOneAndUpdate(
    { _id: "63866c31ffcdd6df6b83922d" },
    { password: hashedPassword }
  );
  if (!indTrainee) {
    return res.status(400).json({ error: "No such indTrainee" });
  }
  res.status(200).json(indTrainee);
};

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

const updateIndTraineeProfile = async (req, res) => {
  // const {id}=req.body

  // if(!mongoose.Types.ObjectId.isValid(id))
  // {
  //     return res.status(404).json({error:'No such indTrainee'})
  // }

  const indTrainee = await IndTrainee.findOneAndUpdate(
    { _id: "63866c31ffcdd6df6b83922d" },
    { ...req.body }
  );
  if (!indTrainee) {
    return res.status(400).json({ error: "No such indTrainee" });
  }
  res.status(200).json(indTrainee);
};

const forgotPasswordIndTrainee = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please Write your email" });
  }

  try {
    const user = await IndTrainee.findOne({ email: email });
    if (user) {
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
    return res.status(404).json({ error: "No such Individual Trainee" });
  }
  const trainee = await IndTrainee.findOne({ _id: idTrainee });
  const crs = await Course.findOne({ _id: idCourse });
  let i = 0;
  let sum = 0;
  while (i < crs.finalExam.length && trainee.answers.length != 0) {
    const first = crs.finalExam[i].answer;
    const second = trainee.answers[i];
    console.log(first, second);
    i++;
    if (first == second) sum++;
  }

  const gradeArr = trainee.grade;
  let k = 0;
  let flag = false;
  let gradeTrainee = sum;
  while (k < gradeArr.length) {
    if (gradeArr[k].course == idCourse) {
      flag = true;
      if (gradeTrainee < gradeArr[k].num) gradeTrainee = gradeArr[k].num;
      else {
        flag = false;
        gradeArr.splice(k, 1);
      }
    }
    k++;
  }
  const obj = {
    course: idCourse,
    num: gradeTrainee,
  };
  const ans = gradeArr.concat([obj]);

  if (flag == false) {
    const updatedTrainee = await IndTrainee.findOneAndUpdate(
      { _id: idTrainee },
      { grade: ans }
    );
    console.log(updatedTrainee);
    updated = true;
    if (!updatedTrainee) {
      return res.status(404).json({ error: "No such Individual Trainee" });
    }
  }
  await IndTrainee.findOneAndUpdate({ _id: idTrainee }, { answers: [] });

  return res.status(200).json(gradeTrainee);
};

const viewSolution = async (req, res) => {
  const { idCourse } = req.params;
  if (!mongoose.Types.ObjectId.isValid(idCourse)) {
    return res.status(404).json({ error: "No such course" });
  }

  const crs = await Course.findOne({ _id: idCourse });
  const exam = crs.finalExam;
  console.log(exam);

  if (exam) {
    return res.status(200).json(exam);
  }
  return res.status(404).json({ error: "This Course does not have an exam" });
};

const setAnswer = async (req, res) => {
  const idCourse = req.params.idCourse;
  const id = req.params.id;
  const answer = req.params.answer;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Individual Trainee" });
  }
  if (!mongoose.Types.ObjectId.isValid(idCourse)) {
    return res.status(404).json({ error: "No such Course" });
  }

  const trainee = await IndTrainee.findById({ _id: id });
  const course = await Course.findOne({ _id: idCourse });
  const examT = course.finalExam;
  const index = trainee.answers.length;
  const exercise = examT[index];
  console.log(examT, index);
  let ansr = "";
  if (answer == "1") {
    ansr = exercise.firstChoice;
  } else if (answer == "2") {
    ansr = exercise.secondChoice;
  } else if (answer == "3") {
    ansr = exercise.thirdChoice;
  } else if (answer == "4") {
    ansr = exercise.fourthChoice;
  }
  const temp = [ansr];
  const ans = trainee.answers.concat(temp);
  const finalT = await IndTrainee.findOneAndUpdate(
    { _id: id },
    { answers: ans }
  );
  console.log(finalT);

  if (!trainee) {
    return res.status(404).json({ error: "No such Individual Trainee" });
  }
  res.status(200).json(trainee);
};
const compareAnswers = async (req, res) => {
  const solution = req.params.solution;
  const answer = req.params.answer;
  console.log(solution, answer);
  if (solution == answer) return res.json(true);
  else return res.json(false);
};
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
        path: "/Users/abdelrahman/Desktop/Engineering/Semester7/ACL/BlueHats/backend/assets/My Certificate.pdf",
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
const getCertificateInTrainee = async (req, res) => {
  const { DynammicEmail, DynammicSubject } = req.body;

  try {
    const send_to = DynammicEmail;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = DynammicEmail;
    const subject = DynammicSubject;
    const message = `
        <h3>Hello Abdelrahman</h3>
        <p>Thank you for Completing your course</p>
        <p>Regards...</p>
    `;

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getIndTrainees,
  getIndTrainee,
  signupIndTrainee,
  deleteIndTrainee,
  changePasswordIndTrainee,
  loginIndTrainee,
  forgotPasswordIndTrainee,
  updateIndTraineeProfile,
  gradeExam,
  viewSolution,
  setAnswer,
  compareAnswers,
  getCertificateInTrainee,
};
