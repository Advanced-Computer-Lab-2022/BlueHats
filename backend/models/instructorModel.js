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

// instructorSchema.statics.login = async function(username, password) {

//   if (!username || !password) {
//     throw Error('All fields must be filled')
//   }

//   const user = await this.findOne({ username })
//   if (!user) 
//   {
//     // throw Error('Incorrect email')
//     const trainee = await CorporateTrainee.login(username, password)
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

module.exports = mongoose.model('InstructorModel', instructorSchema)