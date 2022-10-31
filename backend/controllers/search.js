const course = require('../models/course');

const Instructor = require('../models/instructorModel')
const mongoose = require('mongoose');

const getCoursesBySearch = async (req,res) => {
    const key = req.params['name']
    const titleRes = await course.find({title: key})
    if(titleRes.length==0){
        const subjRes = await course.find({subject: key})
        if(subjRes.length==0){
            const instRes = await course.find({instructorName: key})
            if(instRes.length==0)
            res.json("This course doesn't exist")
            else{
                res.json({instRes})
            }

        }
        else{
            res.json({subjRes})
        }
        
    }
    else{
        res.json({titleRes})
    }
  
}

const instructorSearch = async(req,res) => {
  
    
    const instructorId = req.params['id']
    const skey = req.params['key']
    if(instructorId){
    const result1 = await course.find({instructor:mongoose.Types.ObjectId(instructorId), title: skey });
    if(result1.length==0){
        const result2 = await course.find({instructor:mongoose.Types.ObjectId(instructorId), subject: skey });
        if(result2.length==0)
        res.json("This course doesn't exist")
        else{
           res.status(200).json({result2})
        }
    }
    else{
        res.status(200).json({result1})
    }
        
    }else{
        res.status(400).json({error:"instructorId  is required"})
    }
}


module.exports = {getCoursesBySearch,instructorSearch};