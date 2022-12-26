const mongoose = require('mongoose')
const reportedProblem = require('./reportedProblem')
const course = require('./course')

const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const IndTrainee = require('../models/corporateTraineeModel')

const corporateTraineeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: 
  {
    type: String,
    required: true,
    unique:true,
    lowercase:true
  },
  password: {
    type:String ,
    required: true
  },
  grade: 
   [{course: {type: mongoose.Types.ObjectId , ref:'Course'}, num: {type: Number}}]
  ,
  answers: {
    type: [Object]
  },
  problem: [reportedProblem.schema]
}, { timestamps: true })

// corporateTraineeSchema.statics.login = async function(username, password) {

//   if (!username || !password) {
//     throw Error('All fields must be filled')
//   }

//   const user = await this.findOne({ username })
//   if (!user) 
//   {
//     // throw Error('Incorrect email')
//     const trainee = await IndTrainee.login(username, password)
//   }
//   else
//   {
//     const match = await bcrypt.compare(password, user.password)
//     if (!match) 
//     {
//     throw Error('Incorrect password')
//     }
//     return user
//  }

// }
module.exports = mongoose.model('CorporateTrainee', corporateTraineeSchema)