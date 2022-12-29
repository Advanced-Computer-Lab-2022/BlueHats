const mongoose = require('mongoose')

const Problem = require('../models/reportedProblem')
//const CorporateTrainee = require('../models/corporateTraineeModel')


const getProblems=async (req,res)=> {
    const problems=await Problem.find({}).sort ({createdAt:-1})
    if(problems==[])
      return res.status(200).json([])
    res.status(200).json(problems)
}


const getProblem = async (req,res) => {
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such problem'})
    }
    const problem =await Problem.findById(id)

    if(!problem){
        return res.status(404).json({error:'No such problem'})
    }
    res.status(200).json(problem)
}

const getPending = async (req,res) => {
  
  const problems=await Problem.find({}).sort ({createdAt:-1})
  let i = 0;
  let temp =[];
  while(i<problems.length){
    if(problems[i].status == "Pending"){
      temp = temp.concat([problems[i]]);
    }
    i++;
  }
  console.log(temp);
  res.status(200).json(temp)
}

const createProblem=async (req,res) =>{
    const {description, status , response} = req.body
    let emptyFields = []

    if (!description) {
      emptyFields.push('description')
    }
    if (!status) {
      emptyFields.push('status')
    }
    if (!response) {
      emptyFields.push('response')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  try {
    const problem = await Problem.create({description, status , response})
    res.status(200).json(problem._id)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


const deleteProblem =async (req,res) => {
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such problem'})
    }
    const problem = await Problem.findOneAndDelete({_id:id})

    if(!problem){
        return res.status(400).json({error:'No such problem'})
    }
    res.status(200).json(problem)
}

const updateProblem =async (req,res) => {
    const {id}=req.params
    const response = req.body
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such problem'})
    }

    const problem = await Problem.findOneAndUpdate({_id:id},{response:response})
    if(!problem){
        return res.status(400).json({error:'No such problem'})
    }
    res.status(200).json(problem)
}


const updateStatus = async (req,res) => {
  const idProblem = req.params.idProblem
    if(!mongoose.Types.ObjectId.isValid(idProblem)) {
        return res.status(404).json({error: 'No such Problem'})
    }
  const problem = await Problem.findOneAndUpdate({_id: idProblem}, {status: "Resolved"})  
 
  if(!problem) {
    return res.status(404).json({error: 'No such Problem'})
  }

  return res.status(200).json(problem);
  
}


const addResponse = async (req,res) => {
  const idProblem = req.params.idProblem
  const resp = req.params.response

  console.log(idProblem)

    if(!mongoose.Types.ObjectId.isValid(idProblem)) {
        return res.status(404).json({error: 'No such Problem'})
    }
  
  const problem = await Problem.findOneAndUpdate({_id: idProblem},{response: resp})

  if(!problem) {
    return res.status(404).json({error: 'No such Problem'})
  }

  return res.status(200).json(problem);
}



module.exports={getProblem,getProblems,createProblem,deleteProblem,updateProblem,getPending,updateStatus,addResponse}