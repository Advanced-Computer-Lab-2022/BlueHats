const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const CorporateTrainee = require('../models/corporateTraineeModel')

const instructorSchema = new Schema({
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
  biography :
  {
    type:String ,
    required: false
  },
  wallet: 
  {
    type: Number,
    default: 0
  },
  instructorRating:
  {
      type: Number,
      default: 0
  },
  numberOfRates:{
      type: Number,
      default:0
  },
  acceptedContract:
  {
    type: Boolean,
    default: false
  } 
}, { timestamps: true })


module.exports = mongoose.model('InstructorModel', instructorSchema)