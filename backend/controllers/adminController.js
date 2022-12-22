const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Admin = require('../models/adminModel')

//get all admins
const getAdmins=async (req,res)=> {
    const admins=await Admin.find({}).sort ({createdAt:-1})
    res.status(200).json(admins)
}

//get a single admin
const getAdmin = async (req,res) => {
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such admin'})
    }
    const admin =await Admin.findById(id)

    if(!admin){
        return res.status(404).json({error:'No such admin'})
    }
    res.status(200).json(admin)
}

//create new adminModel
const createAdmin=async (req,res) =>{
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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({name, username , password:hashedPassword})
    res.status(200).json(admin)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//delete an admin
const deleteAdmin =async (req,res) => {
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such admin'})
    }
    const admin = await Admin.findOneAndDelete({_id:id})

    if(!admin){
        return res.status(400).json({error:'No such admin'})
    }
    res.status(200).json(admin)
}

//update an admin
const updateAdmin =async (req,res) => {
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such admin'})
    }

    const admin = await Admin.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!admin){
        return res.status(400).json({error:'No such admin'})
    }
    res.status(200).json(admin)
}

module.exports={getAdmin,getAdmins,createAdmin,deleteAdmin,updateAdmin}