const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    firstChoice: {
        type: String,
        required: true
    },
    secondChoice: {
        type: String,
        required: true
    },
    thirdChoice: {
        type: String,
        required: true
    },
    fourthChoice: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('exercise', exerciseSchema);