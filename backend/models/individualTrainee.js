const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema;

// Individual Trainee's schema from the instructor's pov
const individualTraineeSchema = new Schema ({
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
const individualTrainee = mongoose.model('IndividualTrainee', individualTraineeSchema)
module.exports = individualTrainee
