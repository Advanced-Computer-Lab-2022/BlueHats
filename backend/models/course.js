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
    summary: {
        type: String,
        required: true
    },
    courseRating: {
        type: Number,
    },
    finalExam: [exercise.schema],
    instructor: {
        type: mongoose.Types.ObjectId,
        ref:'Instructor'
    },
    instructorName: {
        type: String,
        ref:'Instructor'
    }
    
}, { timestamps: true });

module.exports = mongoose.model('course', courseSchema);