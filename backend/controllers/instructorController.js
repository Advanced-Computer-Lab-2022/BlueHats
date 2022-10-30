const mongoose = require('mongoose')

const instructorModel = require('../models/instructorModel')
const Instructor = require('../models/instructorModel')

//get all instructors
const getInstructors=async (req,res)=> {
    const instructors=await Instructor.find({}).sort ({createdAt:-1})
    res.status(200).json(instructors)
}

//get a single instructor
const getInstructor = async (req,res) => {
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such instructor'})
    }
    const instructor =await Instructor.findById(id)

    if(!instructor){
        return res.status(404).json({error:'No such instructor'})
    }
    res.status(200).json(instructor)
}

//create new instructorModel
const createInstructor =async (req,res) =>{
    const {name, username , password} = req.body
    let emptyFields = []

    if (!name) {
      emptyFields.push('name')
    }
    if (!username) {
      emptyFields.push('username')
    }
    if (!password) {
      emptyFields.push('password')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  try {
    const instructor = await Instructor.create({name, username , password})
    res.status(200).json(instructor)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//delete an instructor
const deleteInstructor =async (req,res) => {
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such instructor'})
    }
    const instructor = await Instructor.findOneAndDelete({_id:id})

    if(!instructor){
        return res.status(400).json({error:'No such instructor'})
    }
    res.status(200).json(instructor)
}

//update an instructor
const updateInstructor =async (req,res) => {
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such instructor'})
    }

    const instructor = await Instructor.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!instructor){
        return res.status(400).json({error:'No such instructor'})
    }
    res.status(200).json(instructor)
}

module.exports={getInstructor,getInstructors,createInstructor,deleteInstructor,updateInstructor}