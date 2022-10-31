const course = require('../models/course');
const mongoose = require('mongoose');

const filterByPrice = async (req, res) => {

    const price = req.body.price;
    
    if (price ) {
        const courses = await course.find({price: price})
        res.status(200).json(courses)
    } else {
        res.status(400).json({ error: `No courses found for this data` })
    }
}
const filterBySubject = async (req, res) => {

    const subject = req.body.subject;
    
    if (subject ) {
        const courses = await course.find({subject: subject})
        res.status(200).json(courses)
    } else {
        res.status(400).json({ error: `No courses found for this data` })
    }
}

module.exports = {
    filterByPrice,
    filterBySubject
};