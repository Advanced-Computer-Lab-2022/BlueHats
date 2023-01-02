const RequestCourse = require('../models/requestCourse');
const course = require('../models/course');
const mongoose = require('mongoose');
const MyRequests = require ('../models/requestsStatus')

const CorporateTrainee = require('../models/corporateTraineeModel');

const getAllRequests = async(req, res) => {
    const requests = await RequestCourse.find({}).sort({createdAt: -1});
    res.status(200).json(requests);
}

const deleteRequest = async (req, res) =>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such course'})
    }

    const Request = await RequestCourse.findOneAndDelete({_id: id});

    if(!Request) {
        return res.status(404).json({error: 'No such course'})
    }
    res.status(200).json(Request);
}

// accept request


const acceptRequest = async (req, res) => {
    const { id } = req.params;
    // const requestId = req.query.requestId;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such request'})
    }
    const requestedCourse = await RequestCourse.find({_id: id});

    var cId = requestedCourse[0].courseId;
    var coTId = requestedCourse[0].corporateTraineeId;

    const findCourse = await course.find({_id:cId})
    var cT = findCourse[0].corporateTrainee
    var es = findCourse[0].enrolled
    es++;
    cT.push(coTId)

    const addCourse = await course.findOneAndUpdate({_id:cId},{
        corporateTrainee: cT,
        enrolled:es,        
    })
    await MyRequests.findOneAndUpdate({corporateTraineeId:mongoose.Types.ObjectId(coTId),courseId:mongoose.Types.ObjectId(cId) },{
        status:"Accepted"
    });

     ////////////////////////
     const object = { course: cId, progress: 0 };
     const newCourses = trainee.courses.concat([object]);  
     await CorporateTrainee.findOneAndUpdate({_id: coTId} , {courses: newCourses});
     //////////////////////
    

    if(!addCourse) {
        return res.status(404).json({error: 'No such course exists'})
    }
    const request = await RequestCourse.findOneAndDelete({_id: id});

    if(!request) {
        return res.status(404).json({error: 'No such request'})
    }
   res.status(200).json(request);
}

// reject
const rejectRequest = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such request'})
    }
    const requestedCourse = await RequestCourse.find({_id: id});
    var cId = requestedCourse[0].courseId;
    var coTId = requestedCourse[0].corporateTraineeId;

    await MyRequests.findOneAndUpdate({corporateTraineeId:mongoose.Types.ObjectId(coTId),courseId:mongoose.Types.ObjectId(cId) },{
        status:"Rejected"
    });

    const request = await RequestCourse.findOneAndDelete({_id: id});

    if(!request) {
        return res.status(404).json({error: 'No such request'})
    }

    res.status(200).json(request);
}

module.exports = {getAllRequests,acceptRequest,rejectRequest}