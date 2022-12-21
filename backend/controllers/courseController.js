const course = require('../models/course');

const mongoose = require('mongoose');

// Get all courses 

const getCourses = async (req, res) => {
    const courses = await course.find({}).sort({createdAt: -1});

    res.status(200).json(courses);
}


// Get a single course

const getCourse = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such course'})
    }

    const singlecourse = await course.findById(id);

    if(!singlecourse) {
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(singlecourse);
}

// Create a new course

const createCourse = async (req, res) => {
    const {title,subject, previewLink, subtitle, price, promotion, promotionDuration, summary,finalExam, instructor,individualTrainee,courseRating,numberOfRates,reviews,instructorRate,numOfRates,accumlatedRates,accRates} = req.body;

    let emptyFields = [];

    if(!title) {
        emptyFields.push('title')
    }
    if(!subject) {
        emptyFields.push('subject')
    }
    if(!previewLink) {
        emptyFields.push('previewLink')
    }
    if(!(subtitle[0].name)) {
        emptyFields.push('subtitle.name')
    }
    if(!(subtitle[0].hours)) {
        emptyFields.push('subtitle.hours')
    }
    if(!(subtitle[0].link)) {
        emptyFields.push('subtitle.link')
    }
    if(!(subtitle[0].linkDescription)) {
        emptyFields.push('subtitle.linkDescription')
    }
    if(!(subtitle[0].question)) {
        emptyFields.push('subtitle.quiz.question')
    }
    if(!(subtitle[0].firstChoice)) {
        emptyFields.push('subtitle.quiz.firstChoice')
    }
    if(!(subtitle[0].secondChoice)) {
        emptyFields.push('subtitle.quiz.secondChoice')
    }
    if(!(subtitle[0].thirdChoice)) {
        emptyFields.push('subtitle.quiz.thirdChoice')
    }
    if(!(subtitle[0].fourthChoice)) {
        emptyFields.push('subtitle.quiz.fourthChoice')
    }
    if(!(subtitle[0].answer)) {
        emptyFields.push('subtitle.quiz.answer')
    }
    if(!price) {
        emptyFields.push('price')
    }
    if(!summary) {
        emptyFields.push('summary')
    }
    if(!finalExam[0].question) {
        emptyFields.push('finalExam.question')
    }
    if(!finalExam[0].answer) {
        emptyFields.push('finalExam.answer')
    }
    if(!finalExam[0].firstChoice) {
        emptyFields.push('finalExam.firstChoice')
    }
    if(!finalExam[0].secondChoice) {
        emptyFields.push('finalExam.secondChoice')
    }
    if(!finalExam[0].thirdChoice) {
        emptyFields.push('finalExam.thirdChoice')
    }
    if(!finalExam[0].fourthChoice) {
        emptyFields.push('finalExam.fourthChoice')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
        
    // Add doc to database
    try {
       
    const Course = await course.create({title,subject, previewLink, subtitle, price, promotion, promotionDuration, summary,finalExam, instructor,individualTrainee,courseRating,numberOfRates,reviews,instructorRate,numOfRates,accumlatedRates,accRates});
       
    res.status(200).json(Course);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


// Delete a course
const deleteCourse = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such course'})
    }

    const Course = await course.findOneAndDelete({_id: id});

    if(!Course) {
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(Course);
}


// Update a course
const updateCourse = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such course'})
    }

    const Course = await course.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!Course) {
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(Course);
}


module.exports = {
    createCourse,
    getCourses,
    getCourse,
    deleteCourse,
    updateCourse
};