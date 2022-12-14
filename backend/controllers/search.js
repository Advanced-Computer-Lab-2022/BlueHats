const course = require('../models/course');

const Instructor = require('../models/instructorModel')
const mongoose = require('mongoose');

const getCoursesBySearch = async (req,res) => {
    const key = req.params.key
    console.log(key)
    const titleRes = await course.find({title: key})
    console.log(titleRes)
    if(titleRes.length==0){
        const subjRes = await course.find({subject: key})
        console.log(subjRes)
        if(subjRes.length==0){
            const instRes = await course.find({instructorName: key})
            console.log(instRes)
            if(instRes.length==0)
                res.json([])
            else{
                res.json(instRes)
            }

        }
        else{
            res.json(subjRes)
        }
        
    }
    else if (titleRes.length!=0){
        res.json(titleRes)
    }
    else{
        res.status(400).json("This course doesn't exist")
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