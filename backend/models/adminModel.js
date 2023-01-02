const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
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
  }
}, { timestamps: true })

module.exports = mongoose.model('Admin', adminSchema)