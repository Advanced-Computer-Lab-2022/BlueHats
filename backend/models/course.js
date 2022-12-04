const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    numberOfSubtitles:{
        type: Number,
        required: true
    },
    subtitle: {
        type: [{name: {type: String}, hours: {type: Number}}],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Types.ObjectId,
        ref:'Instructor'
    },
    individualTrainee: {
        type: mongoose.Types.ObjectId,
        ref:'IndividualTrainee'
    },
    courseRating:
    {
        type: Number,
        default: 0
    },
    numberOfRates:{
        type: Number,
        default:0
    },
    reviews:
    {
        type:Array,
        default: []
    }
   
    
}, { timestamps: true });

module.exports = mongoose.model('course', courseSchema);