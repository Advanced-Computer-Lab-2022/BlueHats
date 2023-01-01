// const course = require('../models/course');
const MyRequests = require('../models/requestsStatus');
const mongoose = require('mongoose');


const getRequests = async (req, res) => {
    const requests = await MyRequests.find({}).sort({createdAt: -1});

    res.status(200).json(requests);
}


const getRequest = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such request exits'})
    }


    const singleRequest= await MyRequests.findById(id);

    if(!singleRequest) {
        return res.status(404).json({error: 'No such review'})
    }

    res.status(200).json(singleRequest);
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


const deleteRequest = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such request'})
    }

    const Review = await MyRequests.findOneAndDelete({_id: id});

    if(!Review) {
        return res.status(404).json({error: 'No such request'})
    }

    res.status(200).json(Review);
}

// Update a course
const editRequest = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such request'})
    }


    const Request = await MyRequests.findOneAndUpdate({_id: id})

    // const Review = await review.findOneAndUpdate({_id: id}, {
    //     ...req.body
    // });

    if(!Request) {
        return res.status(404).json({error: 'No such request'})
    }

    res.status(200).json(Request);
}


const viewUserRequests = async (req,res) => {
    const { id } = req.params;

    const result = await MyRequests.find({corporateTraineeId:mongoose.Types.ObjectId(id)});
    res.status(200).json(result);

    if(!result) {
        return res.status(404).json({error: 'No such request'})
    }
    
} 

// const viewCorporateReviews = async (req, res)=> {
//     const {id} = req.params

//     const result = await review.find({corporateTraineeId:mongoose.Types.ObjectId(id)});
//     res.status(200).json(result);

//     if(!result) {
//         return res.status(404).json({error: 'No such review'})
//     }
// }

// const viewIndividualReviews = async (req, res)=>{
//     const {id} = req.params

//     const result = await review.find({individualTraineeId:mongoose.Types.ObjectId(id)});
//     res.status(200).json(result);

//     if(!result) {
//         return res.status(404).json({error: 'No such review'})
//     }
// }




module.exports = {
    getRequests,
    getRequest,
      //  addReview,
      deleteRequest,
      editRequest,
      viewUserRequests,
   
};