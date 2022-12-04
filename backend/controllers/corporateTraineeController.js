const mongoose = require('mongoose')
const CorporateTrainee = require('../models/corporateTraineeModel')
const Course = require('../models/course')

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
    // if (!grade) {
    //   emptyFields.push('grade')
    // }
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

const gradeExam = async(req,res) => {
  const idCourse = req.params.idCourse
  const idTrainee = req.params.idTrainee
  console.log(idCourse,idTrainee)

    if(!mongoose.Types.ObjectId.isValid(idCourse)) {
        return res.status(404).json({error: 'No such course'})
    }
    if(!mongoose.Types.ObjectId.isValid(idTrainee)) {
      return res.status(404).json({error: 'No such Corporate Trainee'})
  }
  const trainee = await CorporateTrainee.findOne({_id: idTrainee})
  const crs = await Course.findOne({_id: idCourse})
  console.log(trainee,crs)
  let i =0;
  let sum=0;
  while(i<crs.finalExam.length){
    const first = crs.finalExam[i].answer
    const second = trainee.answers[i]
    console.log(first,second)
    i++;
    if(first === second)
      sum++;
  }
  const temp =[{idCourse,sum}]
    console.log(temp)
    const arr = trainee.grade
    const obj = {
      course: idCourse,
      num: sum
    };
    const ans = arr.concat([obj])
    const updatedTrainee = await CorporateTrainee.findOneAndUpdate( {_id: idTrainee} , {grade: ans});
    console.log(updatedTrainee)

    if(!updatedTrainee) {
        return res.status(404).json({error: 'No such Corporate Trainee'})
    }

    return res.status(200).json(sum);
}

const viewSolution = async(req,res) => {
  const { idCourse } = req.params;
  //console.log(idCourse)

    if(!mongoose.Types.ObjectId.isValid(idCourse)) {
        return res.status(404).json({error: 'No such course'})
    }

    const crs = await Course.findOne({_id: idCourse});
    //console.log(crs)
    const exam = crs.finalExam;
    console.log(exam)

    if(exam) {
        return res.status(200).json(exam);
    }
    return res.status(404).json({error: 'This Course does not have an exam'})
}

const setAnswer = async(req,res) => {
  const id = req.params.id;
  const answer = req.params.answer;
  console.log(id,answer)
  if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Corporate Trainee'})
    }

    const trainee = await CorporateTrainee.findById({_id: id })
    console.log(trainee)
    const temp =[answer]
    console.log(temp)
    const ans = trainee.answers.concat(temp)
    console.log(ans)
    const finalT = await CorporateTrainee.findOneAndUpdate({_id: id }, {answers : ans})
    console.log(finalT)

    if(!trainee) {
        return res.status(404).json({error: 'No such Corporate Trainee'})
    }
    

    res.status(200).json(trainee);


}

module.exports={getCorporateTrainee,
                getCorporateTrainees,
                createCorporateTrainee,
                deleteCorporateTrainee,
                updateCorporateTrainee,
                gradeExam,
                viewSolution,
                setAnswer
                }
