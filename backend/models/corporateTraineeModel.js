const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const IndTrainee = require('../models/corporateTraineeModel')

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
   [{course: {type: mongoose.Types.ObjectId , ref:'Course'}, num: {type: Number}}]
  ,
  answers: {
    type: [String]
  }
}, { timestamps: true })

module.exports = mongoose.model('CorporateTrainee', corporateTraineeSchema)