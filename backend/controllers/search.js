const course = require('../models/course');

const Instructor = require('../models/instructorModel')
const mongoose = require('mongoose');

const getCoursesBySearch = async (req,res) => {
    const key = req.params.key
    const result = await course.find({}).populate('instructor');
    //console.log(result[9].instructor);
    // const name= result.instructor.name
    // console.log("name:", name)
    const titleRes = await course.find({title: key})
    console.log(titleRes)
    if(titleRes.length==0){
        const subjRes = await course.find({subject: key})
        console.log(subjRes)
        if(subjRes.length==0){
            let i = 0;
            let resTemp = [];
            while(i<result.length){
                if(result[i].instructor != null && result[i].instructor.name == key){
                    resTemp=resTemp.concat([result[i]])
                    console.log(result[i])
                }
                i++;
            }
            const instRes =resTemp
            console.log(instRes)
            if(instRes.length==0){
               const empty = [] 
                res.status(200).json(empty)
            }
            else{
                 res.status(200).json(instRes)
            }
        }
        else{
             res.status(200).json(subjRes)
        }
        
    }
    else if (titleRes.length!=0){
         res.status(200).json(titleRes)
    }
    else{
         res.status(200).json([])
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