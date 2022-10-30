const course = require('../models/course');
const mongoose = require('mongoose');

const sortByPrice = async (req, res) => {

    const price = req.body.price;
    
    if (price ) {
        const result = await course.find({price: price})
        res.status(200).json(result)
    } else {
        res.status(400).json({ error: `No courses found for this data` })
    }
}
const sortBySubject = async (req, res) => {

    const subject = req.body.subject;
    
    if (subject ) {
        const result = await course.find({subject: subject})
        res.status(200).json(result)
    } else {
        res.status(400).json({ error: `No courses found for this data` })
    }
}

module.exports = {
    sortByPrice,
    sortBySubject
};