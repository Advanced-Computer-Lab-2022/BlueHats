const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    numberOfSubtitles: {
        type: Number,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    subtitleHours: {
        type: Number,
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
    totalhours: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('course', courseSchema);