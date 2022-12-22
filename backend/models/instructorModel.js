const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
  courses: 
  {
    type: [{type: mongoose.Types.ObjectId , ref:'Course'}]
  }
}, { timestamps: true })

module.exports = mongoose.model('InstructorModel', instructorSchema)