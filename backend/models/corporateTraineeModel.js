const mongoose = require('mongoose')
const reportedProblem = require('./reportedProblem')

const Schema = mongoose.Schema


const corporateTraineeSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique:true,
    lowercase:true
  },
  username: {
    type: String,
    required: true,
    unique:true,
    lowercase:true
  },
  password: {
    type:String ,
    required: true
  },
  gender: 
  {
    type:String ,
    required:true
  },
  flag: 
  {
    type:String ,
    required: false
  },
  corporate: 
  {
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