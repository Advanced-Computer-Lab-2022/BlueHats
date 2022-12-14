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
    const {title, subject, subtitle, price, promotion, promotionDuration, summary, courseRating, instructor, instructorName} = req.body;

    let emptyFields = [];

    if(!title) {
        emptyFields.push('title')
    }
    if(!subject) {
        emptyFields.push('subject')
    }
    if(!(subtitle[0].name)) {
        emptyFields.push('subtitle.name')
    }
    if(!(subtitle[0].hours)) {
        emptyFields.push('subtitle.hours')
    }
    if(!price) {
        emptyFields.push('price')
    }
    if(!summary) {
        emptyFields.push('summary')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
        
    // Add doc to database
    try {
       
    const Course = await course.create({title, subject, subtitle, price,promotion,promotionDuration, summary, courseRating, instructor, instructorName});

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
    updateCourse,
};