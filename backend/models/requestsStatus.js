const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema;

const requestStatusSchema = new Schema ({
    courseName: {
        type:String,
        required:true
    },
    courseId:{
        type: mongoose.Types.ObjectId,
        ref: 'course'
    },
    status: {
        type: String,
        default:'Pending...'
    },
    corporateTraineeId: {
        type: mongoose.Types.ObjectId,
        ref:'CorTrainee'
    },
    
},
{
    timestamps: true
})

module.exports = mongoose.model('MyRequests', requestStatusSchema)

