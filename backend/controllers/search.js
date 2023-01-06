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
  
    
    const id = req.body.id
    const key = req.params.key
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Instructor'})
    }
   
    const crs = await course.find({instructor: id});
    let i =0;
    let temp = [];
    while(i<crs.length){
        if(crs[i].title == key)
            temp = temp.concat([crs[i]])
        if(crs[i].subject == key)
            temp = temp.concat([crs[i]])
        i++;
    }
    if(crs.length == 0)
  {
      return res.status(400).json({error:'No courses avaliable'})
  }
  res.status(200).json(temp)

   
}


module.exports = {getCoursesBySearch,instructorSearch};