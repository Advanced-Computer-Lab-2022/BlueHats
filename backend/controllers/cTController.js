const course = require('../models/course');
const instructor = require('../models/instructor');
const { default: mongoose } = require('mongoose');


// View only the users courses by filtering the courses by the user's id
const filterCourses = async(req,res) => {
  
    const corporateTraineeId = req.query.corporateTraineeId;
    if(corporateTraineeId){
    const result = await course.find({corporateTraineeId:mongoose.Types.ObjectId(corporateTraineeId)});
    res.status(200).json(result)
    }else{
        res.status(400).json({error:"corporateTraineeId  is required"})
    }
}

// get all Indvidual Trainees
const getCorporateTrainees = async (req, res) => {
    const corporateTrainees = await corporateTrainee.find({}).sort({createdAt: -1});

    res.status(200).json(corporateTrainees);
}

// create an individual trainee account
const createCorporateTrainee = async (req, res) => {
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
       
        const corporateTrainee = await corporateTrainee.create({fullName, email, password} );
        res.status(200).json(IndividualTrainee);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// delete an individual trainee account
const deleteCorporateTrainee = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user exists'})
    }

    const CorporateTrainee = await corporateTrainee.findOneAndDelete({_id: id});

    if(!CorporateTrainee) {
        return res.status(404).json({error: 'No such indvidual trainee exists'})
    }

    res.status(200).json(CorporateTrainee);
}

// update an individual trainee account

const updateCorporateTrainee = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user exits in the database'})
    }

    const CorporateTrainee = await corporateTrainee.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!CorporateTrainee) {
        return res.status(404).json({error: 'No such individual trainee exits'})
    }

    res.status(200).json(CorporateTrainee);
}


// add a new rate to the course and calculate the new overall course rate
const rateCourse = async (req, res) => {
    const courseId= req.query.courseId;
    if(!mongoose.Types.ObjectId.isValid(courseId)){
        return res.status(404).json({error: 'No such course'})
    }
    const aCourse = await course.find({_id:courseId});
    var prevRate= aCourse[0].courseRating;
    var lastCount=aCourse[0].numberOfRates;
    const {userRate} = await req.body;

    var overallRate= ((prevRate*lastCount)+ userRate) /(++lastCount);
    var newCount= lastCount;

    const Course = await course.findOneAndUpdate({_id:courseId},{
        courseRating:overallRate,
        numberOfRates:newCount
    })

    if(!Course){
        return res.status(400).json({error:'No such course'})

    }
    res.status(200).json(Course);       
    }

    
//// add a new rate to the instructor and calculate the new overall instructor rate
    const rateInstructor = async (req, res) => {
        const courseId= req.query.courseId;
        if(!mongoose.Types.ObjectId.isValid(courseId)){
            return res.status(404).json({error: 'No such Instructor'})
        }
        const aCourse = await course.find({
            _id:courseId,
        });
        console.log(aCourse)
        var instructorId = aCourse[0].instructor
        console.log(instructorId)
        const anInstructor = await instructor.find({_id:instructorId})

        var prevRate= anInstructor[0].instructorRating;
        var lastCount=anInstructor[0].numberOfRates;
        const {userRate} = await req.body;
        var overallRate=((prevRate*lastCount)+ userRate )/(++lastCount);
        var newCount= lastCount;
    
        const Instructor = await instructor.findOneAndUpdate({_id:instructorId},{
            instructorRating:overallRate,
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
       // Enter your review
        var userReview = await req.body;
        const  newReviewsList = prevReviewsList.concat(userReview)

        const Course = await course.findOneAndUpdate({_id:courseId},{
            reviews:newReviewsList
        })
    
        if(!Course){
            return res.status(400).json({error:'No such course'})
    
        }
        res.status(200).json(Course);       
        }
    







module.exports = {
    //updateCorporateTrainee  
    deleteCorporateTrainee,
    createCorporateTrainee,
    getCorporateTrainees,
    filterCourses,
    rateCourse,
    rateInstructor,
    addReview
};