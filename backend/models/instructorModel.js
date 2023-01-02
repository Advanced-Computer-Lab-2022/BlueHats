const mongoose = require('mongoose')
const Schema = mongoose.Schema

const instructorSchema = new Schema({
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
    required: true
  },
  flag: 
  {
    type:String ,
    required: false
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
  },
    problem: [{type: mongoose.Types.ObjectId}] 
}, { timestamps: true })


module.exports = mongoose.model('InstructorModel', instructorSchema)