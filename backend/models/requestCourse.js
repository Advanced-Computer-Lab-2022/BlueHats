const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema;


const requestCourseSchema = new Schema ({
    courseName: {
        type:String,
        required:true
    },
    corporateTraineeName: {
        type:String,
        required:true
    },
    reason: {
        type: String,
        required: true
    },
    highestLevelOfEducation: {
        type: String,
        required: true
    },
    employmentStatus: {
        type: String,
        required: true
    },
    agreedToPolicy:
    {
        type: Number,
        required: true
    },
    corporateTraineeId: {
        type: mongoose.Types.ObjectId,
        ref:'CorTrainee'
    },
    courseId:{
        type: mongoose.Types.ObjectId,
        ref: 'course'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('RequestCourse', requestCourseSchema)

