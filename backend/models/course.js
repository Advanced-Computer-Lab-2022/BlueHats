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
        type: [{name: {type: String}, hours: {type: Number}, link: {type: String}, linkDescription: {type: String},
             q1: {type: String}, first1: {type: String}, second1: {type: String}, third1: {type: String}, fourth1: {type: String},
             q2: {type: String}, first2: {type: String}, second2: {type: String}, third2: {type: String}, fourth2: {type: String},
             q3: {type: String}, first3: {type: String}, second3: {type: String}, third3: {type: String}, fourth3: {type: String},
             q4: {type: String}, first4: {type: String}, second4: {type: String}, third4: {type: String}, fourth4: {type: String}
        }
        ],
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
        type: String
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
        type: Number,
        default: 0
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
    }
    
    
}, { timestamps: true });



module.exports = mongoose.model('course', courseSchema);