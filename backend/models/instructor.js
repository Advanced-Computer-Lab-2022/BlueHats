const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema;

// Instructor's schema from the instructor's pov
const instructorSchema = new Schema ({
    name: {
        type:String,
        required:true     
    },
    email: {
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    telephoneNumber: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})
const Instructor = mongoose.model('Instructor', instructorSchema)
module.exports = Instructor
