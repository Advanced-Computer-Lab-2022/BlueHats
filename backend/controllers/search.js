const course = require('../models/course');
const mongoose = require('mongoose');


const getCoursesBySearch = async (req,res) => {
    const key = req.params['name']
    const titleRes = await course.find({title: key})
    if(titleRes.length==0){
        const subjRes = await course.find({subject: key})
        if(subjRes.length==0){
            const instRes = await course.find({author: key}).populate('instructor')

        }
        else{
            res.json({subjRes})
        }
        
    }
    else{
        res.json({titleRes})
    }
  
}



const getInstructorCourses = async (req,res) =>{
    const inst = req.params['name']
    const course = req.params['course']
     const result = await course.find({instructor: inst},{title: course})
}
module.exports = {getCoursesBySearch, getInstructorCourses};
