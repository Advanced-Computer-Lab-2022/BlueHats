const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema;


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
