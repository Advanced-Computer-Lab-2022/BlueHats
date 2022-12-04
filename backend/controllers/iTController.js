const course = require('../models/course');
const instructor = require('../models/instructor');
const individualTrainee = require('../models/individualTrainee')
const { default: mongoose } = require('mongoose');


// View only the users courses by filtering the courses by the user's id
const filterCourses = async(req,res) => {
  
    const individualTraineeId = req.query.individualTraineeId;
    if(individualTraineeId){
    const result = await course.find({individualTrainee:mongoose.Types.ObjectId(individualTraineeId)});
    res.status(200).json(result)
    }else{
        res.status(400).json({error:"individualTraineeId  is required"})
    }
}

// get all Indvidual Trainees
const getIndividualTrainees = async (req, res) => {
    const individualTrainees = await individualTrainee.find({}).sort({createdAt: -1});

    res.status(200).json(individualTrainees);
}

// create an individual trainee account
const createIndividualTrainee = async (req, res) => {
    const {fullName, email, password} = req.body;

    let emptyFields = [];

    if(!fullName) {
        emptyFields.push('fullName')
    }
    if(!email) {
        emptyFields.push('email')
    }
    if(!password) {
        emptyFields.push('password')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // Add doc to database
    try {
       
        const IndividualTrainee = await individualTrainee.create({fullName, email, password} );
        res.status(200).json(IndividualTrainee);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// delete an individual trainee account
const deleteIndividualTrainee = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user exists'})
    }

    const IndividualTrainee = await individualTrainee.findOneAndDelete({_id: id});

    if(!IndividualTrainee) {
        return res.status(404).json({error: 'No such indvidual trainee exists'})
    }

    res.status(200).json(IndividualTrainee);
}

// update an individual trainee account

const updateIndividualTrainee = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user exits in the database'})
    }

    const IndividualTrainee = await individualTrainee.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!IndividualTrainee) {
        return res.status(404).json({error: 'No such individual trainee exits'})
    }

    res.status(200).json(IndividualTrainee);
}


// add a new rate to the course and calculate the new overall course rate
//(no. of reviews x rating) + (no. of reviews x rating) + ... / total no. of reviews

var averageRate = 0;
var accumulatedRate = 0;
const rateCourse = async (req, res) => {
    const courseId= req.query.courseId;
    if(!mongoose.Types.ObjectId.isValid(courseId)){
        return res.status(404).json({error: 'No such course'})
    }
    const aCourse = await course.find({_id:courseId});
    var prevRate= aCourse[0].courseRating;

    var lastCount=aCourse[0].numberOfRates;
    const {userRate} = await req.body;


    accumulatedRate += prevRate
    averageRate = accumulatedRate + userRate

    lastCount++;
    var newCount= lastCount;

     averageRate = averageRate/newCount
    
    const Course = await course.findOneAndUpdate({_id:courseId},{
        courseRating:averageRate,
        numberOfRates:newCount
    })

    if(!Course){
        return res.status(400).json({error:'No such course'})

    }
    res.status(200).json(Course);       
    }

    
//// add a new rate to the instructor and calculate the new overall instructor rate
var avgRate = 0;
var accRate = 0;
    const rateInstructor = async (req, res) => {
        const courseId= req.query.courseId;
        if(!mongoose.Types.ObjectId.isValid(courseId)){
            return res.status(404).json({error: 'No such Instructor'})
        }
        const aCourse = await course.find({
            _id:courseId,
        });
       
        var instructorId = aCourse[0].instructor
        const anInstructor = await instructor.find({_id:instructorId})
        var prevRate= anInstructor[0].instructorRating;
        var lastCount=anInstructor[0].numberOfRates;
        const {userRate} = await req.body;
        accumulatedRate += prevRate
        averageRate = accumulatedRate + userRate

        lastCount++;
         var newCount= lastCount;

        averageRate = averageRate/newCount
        const Instructor = await instructor.findOneAndUpdate({_id:instructorId},{
            instructorRating:averageRate,
            numberOfRates:newCount
        })
    
        if(!Instructor){
            return res.status(400).json({error:'No such Instructor'})
    
        }
        res.status(200).json(Instructor);       
        }

  
    const addReview = async (req, res) => {
        const courseId= req.query.courseId;
        if(!mongoose.Types.ObjectId.isValid(courseId)){
            return res.status(404).json({error: 'No such course'})
        }
        const aCourse = await course.find({_id:courseId});
        var prevReviewsList= aCourse[0].reviews;
      //  console.log(prevReviewsList)
       // Enter your review
        var userReview = await req.body;
        const  newReviewsList = prevReviewsList.concat(userReview)
       // console.log(prevReviewsList)
        const Course = await course.findOneAndUpdate({_id:courseId},{
            reviews:newReviewsList
        })
    
        if(!Course){
            return res.status(400).json({error:'No such course'})
    
        }
        res.status(200).json(Course);       
        }
    



module.exports = {
  //  updateIndividualTrainee,
    deleteIndividualTrainee,
    createIndividualTrainee,
    getIndividualTrainees,
    filterCourses,
    rateCourse,
    rateInstructor,
    addReview
};