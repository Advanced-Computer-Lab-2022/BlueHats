const mongoose = require('mongoose')

const Schema = mongoose.Schema

const refundSchema = new Schema({
  course: {
    type: mongoose.Types.ObjectId,
    ref:'course'
  },
  indTrainee: {
    type: mongoose.Types.ObjectId,
    ref:'IndTrainee'
  }
}, { timestamps: true })

module.exports = mongoose.model('Refunds', refundSchema)