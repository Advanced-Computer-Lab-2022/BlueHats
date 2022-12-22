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

// indTraineeSchema.statics.login = async function(username, password) {

//   if (!username || !password) 
//   {
//     throw Error('All fields must be filled')
//   }

//   const user = await this.findOne({ username })
//   if (!user) 
//   {
//     throw Error('Incorrect username')
//   }

//   const match = await bcrypt.compare(password, user.password)
//   if (!match) 
//   {
//     throw Error('Incorrect password')
//   }

//   return user
// }

module.exports = mongoose.model('IndTrainee', indTraineeSchema)