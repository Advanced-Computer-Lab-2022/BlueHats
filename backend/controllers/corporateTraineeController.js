const mongoose = require('mongoose')

const corporateTraineeModel = require('../models/corporateTraineeModel')
const CorporateTrainee = require('../models/corporateTraineeModel')

//get all corporateTrainees
const getCorporateTrainees=async (req,res)=> {
    const corporateTrainees=await CorporateTrainee.find({}).sort ({createdAt:-1})
    res.status(200).json(corporateTrainees)
}

//get a single corporateTrainee
const getCorporateTrainee = async (req,res) => {
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such CorporateTrainee'})
    }
    const corporateTrainee =await CorporateTrainee.findById(id)

    if(!corporateTrainee){
        return res.status(404).json({error:'No such CorporateTrainee'})
    }
    res.status(200).json(corporateTrainee)
}

//create new CorporateTraineeModel
const createCorporateTrainee=async (req,res) =>{
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
    const corporateTrainee = await CorporateTrainee.create({name, username , password})
    res.status(200).json(corporateTrainee)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//delete a corporateTrainee
const deleteCorporateTrainee =async (req,res) => {
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such corporateTrainee'})
    }
    const corporateTrainee = await CorporateTrainee.findOneAndDelete({_id:id})

    if(!corporateTrainee){
        return res.status(400).json({error:'No such corporateTrainee'})
    }
    res.status(200).json(corporateTrainee)
}

//update a corporateTrainee
const updateCorporateTrainee=async (req,res) => {
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such corporateTrainee'})
    }

    const corporateTrainee = await CorporateTrainee.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!corporateTrainee){
        return res.status(400).json({error:'No such corporateTrainee'})
    }
    res.status(200).json(corporateTrainee)
}

module.exports={getCorporateTrainee,getCorporateTrainees,createCorporateTrainee,deleteCorporateTrainee,updateCorporateTrainee}