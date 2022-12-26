const mongoose = require('mongoose')
const reportedProblem = require('./reportedProblem')

const Schema = mongoose.Schema

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

module.exports = mongoose.model('CorporateTrainee', corporateTraineeSchema)