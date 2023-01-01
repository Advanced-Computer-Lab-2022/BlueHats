// const course = require('../models/course');
const review = require('../models/reviewsModel');
const mongoose = require('mongoose');


const getReviews = async (req, res) => {
    const reviews = await review.find({}).sort({createdAt: -1});

    res.status(200).json(reviews);
}


const getReview = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such review'})
    }

    const singleReview= await review.findById(id);

    if(!singleReview) {
        return res.status(404).json({error: 'No such review'})
    }

    res.status(200).json(singleReview);
}


// const addReview = async (req, res) => {
//     const {userName,userReview,courseId, corporateTraineeId, individualTraineeId} = req.body;

//     let emptyFields = [];

//     if(!userName) {
//         emptyFields.push('userName')
//     }
//     if(!userReview) {
//         emptyFields.push('userReview')
//     } 
//     if(!courseId) {
//         emptyFields.push('courseId')
//     }

//     if(emptyFields.length > 0) {
//         return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
//     }

//     // Add doc to database
//     try {
//         const Review = await review.create({userName, userReview,courseId,corporateTraineeId, individualTraineeId});
//         res.status(200).json(Review);
//     } catch (error) {
//         res.status(400).json({error: error.message});
//     }
// }


const deleteReview = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such review'})
    }

    const Review = await review.findOneAndDelete({_id: id});

    if(!Review) {
        return res.status(404).json({error: 'No such review'})
    }

    res.status(200).json(Review);
}

// Update a course
const editReview = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such review'})
    }

    const {userReview} = req.body;

    const Review = await review.findOneAndUpdate({_id: id}, {
        userReview:userReview
    });

    // const Review = await review.findOneAndUpdate({_id: id}, {
    //     ...req.body
    // });

    if(!Review) {
        return res.status(404).json({error: 'No such review'})
    }

    res.status(200).json(Review);
}


const viewCourseReviews = async (req,res) => {
    const { id } = req.params;

    const result = await review.find({courseId:mongoose.Types.ObjectId(id)});
    res.status(200).json(result);

    if(!result) {
        return res.status(404).json({error: 'No such review'})
    }
    
} 

const viewCorporateReviews = async (req, res)=> {
    const {savedID} = req.params

    const result = await review.find({corporateTraineeId:mongoose.Types.ObjectId(savedID)});
    res.status(200).json(result);

    if(!result) {
        return res.status(404).json({error: 'No such review'})
    }
}

const viewIndividualReviews = async (req, res)=>{
    const { userID } = req.body;

    const result = await review.find({individualTraineeId:mongoose.Types.ObjectId(userID)});
    res.status(200).json(result);

    if(!result) {
        return res.status(404).json({error: 'No such review'})
    }
}




module.exports = {
   getReviews,
   getReview,
  //  addReview,
    deleteReview,
    editReview,
    viewCourseReviews,
    viewCorporateReviews,
    viewIndividualReviews
};