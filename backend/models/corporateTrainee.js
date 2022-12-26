const mongoose = require('mongoose');
const course = require('./course');
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema;

const corporateTraineeSchema = new Schema ({
    fullName: {
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
    }
},
{
    timestamps: true
})
const corporateTrainee = mongoose.model('CorporateTrainee', corporateTraineeSchema)
module.exports = corporateTrainee
