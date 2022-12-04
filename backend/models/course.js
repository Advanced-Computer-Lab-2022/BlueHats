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
    subtitle: {
        type: [{name: {type: String}, hours: {type: Number}}],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    promotion: {
        type: Number,
    },
    promotionDuration:{
        type: Date,
    },
    summary: {
        type: String,
        required: true
    },
    courseRating: {
        type: Number,
    },
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