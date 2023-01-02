const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")

const CorporateTrainee = require('../models/corporateTraineeModel')
const Instructor = require('../models/instructorModel')
const IndTrainee = require('../models/indTraineeModel')
const Admin = require('../models/adminModel')

require('dotenv').config();


const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => 
{
    return jwt.sign({ username }, 'supersecret',
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
const signUp = async (req, res) => 
{
    const { firstName,lastName,username, email, password,confirmPassword,gender } = req.body;

    if(!email || !password || !confirmPassword || !username  || !firstName || !lastName || !gender)
    {
        return res.status(404).json({error:"please fill in all fields"})
    }

    if(!validator.isEmail(email))
    {
        return res.status(404).json({error:"This email is not valid"})
    }

    if(!validator.isStrongPassword(password))
    {
        return res.status(404).json({error:"Your password is not strong enough "})
    }

    if(confirmPassword !== password)
    {
      return res.status(404).json({error:"passwords do not match"})
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
        const user = await IndTrainee.create({ firstName:firstName , lastName:lastName , username:username , email: email , password: hashedPassword , gender:gender});
        //const token = createToken(user.username);

        //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        //res.status(200).json(user)

        let mailOptions=
        {
            from:process.env.AUTH_EMAIL,
            to:email,
            subject:"Verify your email",
            html : `<p>Please verify your email.</p>
                    <p>Click on this link to login now in order to verify your email and activate your account </p>
                    <a href="http://localhost:3000/login">Log in now to activate your account</a>` 
        }

        transporter.sendMail(mailOptions,(error,info) =>
        {
            if (error)
            return res.json(error)
        })

        res.status(200).json({success:"verification email has been sent"})
    } 
    catch (error) 
    {
        res.status(400).json({ error: error.message })
    }
}

//login method
const login = async (req, res) => 
{
    const {username,password}=req.body

    if(!username || !password)
    {
       return res.status(404).send({error:"please fill in all fields"})
    }

  try 
  {
    const indTrainee = await IndTrainee.findOne({username});
    const instructor = await Instructor.findOne({username});
    const coTrainee = await CorporateTrainee.findOne({username});
    const admin = await Admin.findOne({username});

    if(!indTrainee && !instructor && !coTrainee && !admin)
    {
        return res.status(404).send({error:"This username is incorrect"})
    }

    if (indTrainee) 
    {
      const pass = await bcrypt.compare(password, indTrainee.password);
      const id = indTrainee.id;
      const flag = indTrainee.flag;
      if (pass) 
      {
        // res.send("Auth Successful");
        const token = createToken(indTrainee.username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({id,flag, username , token})

      } 
      else 
      {
        return res.status(404).send({error: "wrong password "})
      }
    } 
    
    else 
    {
    if (coTrainee) 
    {
      const pass = await bcrypt.compare(password, coTrainee.password);
      const id = coTrainee.id;
      const flag = coTrainee.flag;
      if (pass) 
      {
        // res.send("Auth Successful");
        const token = createToken(coTrainee.username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({id ,flag, username , token})
      } 
      else 
      {
        // res.send("Wrong password.");
        return res.status(404).send({error: "wrong password "})
      }
    } 
    else
    {
      if (admin) 
    {
      const pass = await bcrypt.compare(password, admin.password);
      const id = admin.id;
      const flag = admin.flag
      if (pass) 
      {
        // res.send("Auth Successful");
        const token = createToken(admin.username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).send ({id,flag,username ,token})
      } 
      else 
      {
        // res.send("Wrong password.");
        return res.status(404).send({error: "wrong password "})
      }
    } 

    else
    {
      const pass = await bcrypt.compare(password, instructor.password);
      const id = instructor.id;
      const flag = instructor.flag
      if (pass) 
      {
        // res.send("Auth Successful");
        const token = createToken(instructor.username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({id,flag , username , token})
        
      } 
      else 
      {
        // res.send("Wrong password.");
        return res.status(404).send({error: "wrong password"})
      }
   
    }
  }
  
  }
}
 
  catch (error) 
  {
    res.status(400).json({error: error.message})
    console.log(error)
  }
}

//logout method
const logout = async (req, res) => 
{
        res.clearCookie('jwt')
        res.status(200).send("done")
}

//update password
const changePassword = async (req,res) => 
{
  const {username}=req.body
  const {password}=req.body
  const {confirmPassword}=req.body
  
  if( !password || !confirmPassword)
  {
    return res.status(400).json({ error: 'Please fill in all fields'})
  }
  
  try
  {
    if(confirmPassword !== password)
    {
      return res.status(404).json({error:"passwords do not match"})
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const indTrainee = await IndTrainee.findOne({username});
    const instructor = await Instructor.findOne({username});
    const coTrainee = await CorporateTrainee.findOne({username});
    const admin = await Admin.findOne({username});
    
    if(indTrainee)
    {
      const user = await IndTrainee.findOneAndUpdate({username:username},{password:hashedPassword})
      res.status(200).json({user})
    }

    if(coTrainee)
    {
      const user = await CorporateTrainee.findOneAndUpdate({username:username},{password:hashedPassword , flag:true})
      res.status(200).json({user})
    }

    if(instructor)
    {
      const user = await Instructor.findOneAndUpdate({username:username},{password:hashedPassword , flag:"true"})
      res.status(200).json({user})
    }

    if(admin)
    {
      const user = await Admin.findOneAndUpdate({username:username},{password:hashedPassword ,flag:true})
      res.status(200).json({user})
    }
    
    if(!instructor && !coTrainee && !indTrainee && !admin)
    {
      return res.status(404).json({error: 'You have  to login first in order to change your password'})
    }
  }
  catch (error)
  {
    res.status(400).json({error: error.message})
  }
  
}

//reset password
const resetPassword = async (req,res) => 
{
  const {email}=req.body
  const {password}=req.body
  const{confirmPassword}=req.body
  
  if( !password || !confirmPassword)
  {
    return res.status(400).json({ error: 'Please fill in all fields'})
  }

  if(password !== confirmPassword)
  {
    return res.status(400).json({ error: 'Passwords do  not match'})
  }
  
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const indTrainee = await IndTrainee.findOne({email});
  const instructor = await Instructor.findOne({email});
  const coTrainee = await CorporateTrainee.findOne({email});
  const admin = await Admin.findOne({email});
  
  if(indTrainee)
  {
    const user = await IndTrainee.findOneAndUpdate({email:email},{password:hashedPassword})
    res.status(200).json({user})
  }

  if(coTrainee)
  {
    const user = await CorporateTrainee.findOneAndUpdate({email:email},{password:hashedPassword})
    res.status(200).json({user})
  }

  if(instructor)
  {
    const user = await Instructor.findOneAndUpdate({email:email},{password:hashedPassword})
    res.status(200).json({user})
  }

  if(admin)
  {
    const user = await Admin.findOneAndUpdate({email:email},{password:hashedPassword})
    res.status(200).json({user})
  }
  
  if(!instructor && !coTrainee && !indTrainee && !admin)
  {
    return res.status(404).json({error: 'No such user'})
  }
}

//forgot password
const forgotPassword = async (req,res) =>
{
  const{email}=req.body

  if(!email)
  {
    return res.status(400).json({ error: 'Please Write your email'})
  }

  try
  {
    const instructor = await Instructor.findOne({email:email})
    const coTrainee = await CorporateTrainee.findOne({email:email})
    const indTrainee = await IndTrainee.findOne({email:email})
    const admin = await Admin.findOne({email:email})

    if(instructor || coTrainee || indTrainee || admin)
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
      res.status(200).json({email})
    }
    else
    {
      res.status(404).json({error:"This email is not correct"})
    }
  }
  catch (error)
  {
    res.status(404).json(error)
  }
}
module.exports={signUp , login , logout , changePassword , resetPassword , forgotPassword}