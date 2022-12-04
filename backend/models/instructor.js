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
},
{
    timestamps: true
})

module.exports = mongoose.model('instructor', instructorSchema)

