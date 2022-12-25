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
  instructorRating:
    {
        type: Number,
        default: 0
    },
    numberOfRates:{
        type: Number,
        default:0
    } 
}, { timestamps: true })

module.exports = mongoose.model('InstructorModel', instructorSchema)