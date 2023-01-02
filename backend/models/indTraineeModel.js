const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const indTraineeSchema = new Schema({
  firstName: 
  {
    type: String,
    required: true,
  },
  lastName: 
  {
    type: String,
    required: true
  },
  username: 
  {
    type: String,
    required: true,
    unique:true,
    lowercase:true
  },
  email: 
  {
    type: String,
    required: true,
    unique:true,
    lowercase:true
  },
  password: 
  {
    type:String ,
    required: true
  },
  gender: 
  {
    type:String ,
    required: true
  },
  flag: 
  {
    type:String ,
    required: false,
    default:true
  },
  grade: 
   [{course: {type: mongoose.Types.ObjectId , ref:'Course'}, num: {type: Number}}]
  ,
  answers: {
    type: [String]
  },
  wallet: 
  {
    type: Number
  },
  courses: [{course: {type: mongoose.Types.ObjectId , ref:'Course'}, progress: {type: Number}}]
}, { timestamps: true })


module.exports = mongoose.model('IndTrainee', indTraineeSchema)