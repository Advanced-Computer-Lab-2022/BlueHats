const course = require('../models/course');
// const instructor = require('../models/instructor');
const { default: mongoose } = require('mongoose');
const  CoTrainee = require('../models/corporateTrainee')
const RequestCourse = require ('../models/requestCourse')
 
// View only the users courses by filtering the courses by the user's id
const filterCourses = async(req,res) => { 
    // const corporateTraineeId = req.query.corporateTraineeId;
    const { id } = req.params;
    if(id){
    const result = await course.find({corporateTrainee:mongoose.Types.ObjectId(id)});
    res.status(200).json(result)
    }else{
        res.status(400).json({error:"corporateTraineeId  is required"})
    }
}

// get all Indvidual Trainees
const getCorporateTrainees = async (req, res) => {
    const corporateTrainees = await CoTrainee.find({}).sort({createdAt: -1});
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
        const corporateTrainee = await CoTrainee.create({fullName, email, password} );
        res.status(200).json(corporateTrainee);
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

    const CorporateTrainee = await CoTrainee.findOneAndDelete({_id: id});

    if(!CorporateTrainee) {
        return res.status(404).json({error: 'No such corporate trainee exists'})
    }

    res.status(200).json(CorporateTrainee);
}

// update an individual trainee account

const updateCorporateTrainee = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user exits in the database'})
    }

    const CorporateTrainee = await CoTrainee.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!CorporateTrainee) {
        return res.status(404).json({error: 'No such individual trainee exits'})
    }

    res.status(200).json(CorporateTrainee);
}


var averageRate;
var accumlatedRate;
const rateCourse = async (req, res) => {
    const courseId= req.query.courseId;
    if(!mongoose.Types.ObjectId.isValid(courseId)){
        return res.status(404).json({error: 'No such course'})
    }
    const aCourse = await course.find({_id:courseId});
    var lastCount=aCourse[0].numberOfRates;
    var {userRate} = await req.body;
    accumlatedRate =  aCourse[0].accumlatedRates + parseInt(userRate)
    var lastCount = aCourse[0].numberOfRates;
    lastCount++;
    var newCount= lastCount;
    averageRate =  accumlatedRate /  newCount
    const Course = await course.findOneAndUpdate({_id:courseId},{
        courseRating:averageRate,
        numberOfRates:newCount,
        accumlatedRates:accumlatedRate
    })

    if(!Course){
        return res.status(400).json({error:'No such course'})

    }
    res.status(200).json(Course);       
    }


//// add a new rate to the instructor and calculate the new overall instructor rate
var avgRate;
var accRate;
const rateInstructor = async (req, res) => {
    const courseId= req.query.courseId;
    if(!mongoose.Types.ObjectId.isValid(courseId)){
        return res.status(404).json({error: 'No such Instructor'})
    }
    const aCourse = await course.find({
        _id:courseId,
    });
    var {uRate} = await req.body;
    accRate = aCourse[0].accRates + parseInt(uRate)
    var lCount=aCourse[0].numOfRates;
    lCount++;
    var nCount= lCount;
    avgRate = accRate/nCount
    const CourseInstructor = await course.findOneAndUpdate({_id:courseId},{
        instructorRate:avgRate,
        numOfRates:nCount,
        accRates: accRate
    })

    if(!CourseInstructor){
        return res.status(400).json({error:'No such Instructor'})

    }
    res.status(200).json(CourseInstructor);       
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
        const  newReviewsList = prevReviewsList.concat((userReview))
      
        const Course = await course.findOneAndUpdate({_id:courseId},{
            reviews:newReviewsList
        })
    
        if(!Course){
            return res.status(400).json({error:'No such course'})
    
        }
        res.status(200).json(Course);       
        }

    
    const requestCourse = async (req, res) => {

            const courseId = req.query.courseId;
            if(!mongoose.Types.ObjectId.isValid(courseId)){
                return res.status(404).json({error: 'No such course'})
            }
            const requestedCourse = await course.find({_id:courseId});

            const courseName = requestedCourse[0].title;

            const corporateTraineeId = req.query.corporateTraineeId;

            if(!mongoose.Types.ObjectId.isValid(corporateTraineeId)){
                return res.status(404).json({error: 'No such user exists'})
            }
            const UserWhoApplied = await CoTrainee.find({_id:corporateTraineeId});

            const corporateTraineeName = UserWhoApplied[0].fullName;
            
            // create request
            const {reason , highestLevelOfEducation ,employmentStatus,agreedToPolicy} = await req.body
            let emptyFields = []

            if (!reason) {
                emptyFields.push('reason')
            }
            if (!highestLevelOfEducation) {
                emptyFields.push('highestLevelOfEducation')
            }
            if (!employmentStatus) {
                emptyFields.push('employmentStatus')
            }
            if (!agreedToPolicy) {
                emptyFields.push('agreedToPolicy')
            }

            if (emptyFields.length > 0) {
                return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
            }
            try {
                const requestCourse = await RequestCourse.create({courseName, corporateTraineeName, reason , highestLevelOfEducation,employmentStatus,agreedToPolicy,corporateTraineeId,courseId})
                res.status(200).json(requestCourse)
              } catch (error) {
                res.status(400).json({error: error.message})
              }
        }

module.exports = {
    //updateCorporateTrainee  
    deleteCorporateTrainee,
    createCorporateTrainee,
    getCorporateTrainees,
    filterCourses,
    rateCourse,
    rateInstructor,
    addReview,
    requestCourse
};