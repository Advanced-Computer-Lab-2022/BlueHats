const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema;


const reviewsSchema = new Schema ({
    userName: {
        type: String,
        required: true
    },
    userReview:{
        type: String,
        required: true
    },
    courseName:{
        type: String,
        required: true
    },
    corporateTraineeId: {
        type: mongoose.Types.ObjectId,
        ref:'CorTrainee'
    },
    individualTraineeId:{
        type: mongoose.Types.ObjectId,
        ref: 'IndividualTrainee'
    },
    courseId:{
        type: mongoose.Types.ObjectId,
        ref: 'course'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('review', reviewsSchema)

