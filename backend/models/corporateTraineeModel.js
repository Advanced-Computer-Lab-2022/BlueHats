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
   [{ex: {type: mongoose.Types.ObjectId , ref:'exercise'}, num: {type: Number}}]
  ,
  temp: 
    [{question: {type:Number}, answer: {type: String}}]
  ,
  problem: [reportedProblem.schema]
  ,
  courses: [{course: {type: mongoose.Types.ObjectId , ref:'Course'}, progress: {type: Number}}]
}, { timestamps: true })

module.exports = mongoose.model('CorporateTrainee', corporateTraineeSchema)