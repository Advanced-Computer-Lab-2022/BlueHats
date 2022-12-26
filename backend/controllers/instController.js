const course = require('../models/course');
const instructor = require('../models/instructor')
const { default: mongoose } = require('mongoose');



// filter courses by instructor
const filterCourses = async(req,res) => {
  
    //const instructorId = req.query.instructorId;
    const {id}= req.body;
    if(id)
    {
        const result = await course.find({instructor:mongoose.Types.ObjectId(id)});
        res.status(200).json(result)
    }
    else
    {
        res.status(400).json({error:"instructor ID  is required"});
    }
}

// get all instructors
const getInstructors = async (req, res) => {
    const instructors = await instructor.find({}).sort({createdAt: -1});

    res.status(200).json(instructors);
}

// create an instructor account
const createInstructor = async (req, res) => {
    const {name, email, password, telephoneNumber,instructorRating,numberOfRates} = req.body;

    let emptyFields = [];

    if(!name) {
        emptyFields.push('name')
    }
    if(!email) {
        emptyFields.push('email')
    }
    if(!password) {
        emptyFields.push('password')
    }
    if(!telephoneNumber) {
        emptyFields.push('telephoneNumber')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // Add doc to database
    try {
        const Instructor = await instructor.create({name, email, password, telephoneNumber,instructorRating,numberOfRates} );
        res.status(200).json(Instructor);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


// delete an instructor account
const deleteInstructor = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such instructor exists'})
    }

    const Instructor = await instructor.findOneAndDelete({_id: id});

    if(!Instructor) {
        return res.status(404).json({error: 'No such instructor exists'})
    }

    res.status(200).json(Instructor);
}


// update an instructor account
const updateInstructor = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such instructor exits in the database'})
    }

    const Instructor = await instructor.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!Instructor) {
        return res.status(404).json({error: 'No such instructor exits'})
    }

    res.status(200).json(Instructor);
}



module.exports = {
    updateInstructor,
    deleteInstructor,
    createInstructor,
    getInstructors,
  //  getInstructor,
    filterCourses
   
};