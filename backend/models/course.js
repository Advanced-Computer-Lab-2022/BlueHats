const mongoose = require('mongoose');
const exercise = require('./exercise');
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
    previewLink: {
        type: String,
        required: true
    },
    subtitle: {
        type: [{name: {type: String}, hours: {type: Number}, link: {type: String}, linkDescription: {type: String}, question: '', firstChoice: '', secondChoice: '', thirdChoice: '', fourthChoice: '', answer: '' }],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    promotion: {
        type: Number,
    },
    promotionStart:{
        type: Date,
    },
    promotionEnd:{
        type: Date,
    },
    summary: {
        type: String,
        required: true
    },
    finalExam: [exercise.schema],
    instructor: {
        type: mongoose.Types.ObjectId,
        ref:'InstructorModel'
    },
    instructorName: {
        type: String,
        required: true
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
    },
    enrolled: 
    {
        type: Number
    },
    instructorRate:{
        type:Number,
        default: 0
    },
    numOfRates:{
        type:Number,
        default:0
    },
    accumlatedRates:{
        type:Number,
        default:0
    },
    accRates:{
        type:Number,
        default:0
    },
    individualTrainee: {
        type: Array,
        ref:'IndTraineeModel',
        default:[]
    },
    corporateTrainee: {
        type: Array,
        ref:'corporateTrainee',
        default: []
    },
    enrolledStudents: {
        type:Number,
        default:0
    },
    
    
}, { timestamps: true });



module.exports = mongoose.model('course', courseSchema);