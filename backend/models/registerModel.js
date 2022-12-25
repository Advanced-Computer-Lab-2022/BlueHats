const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
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
  type:
  {
    type:String ,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)