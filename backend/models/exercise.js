const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    q1: {type: String, required:true}, 
    first1: {type: String, required:true}, 
    second1: {type: String, required:true}, 
    third1: {type: String, required:true},
    fourth1: {type: String, required:true},
    q2: {type: String, required:true},
    first2: {type: String, required:true}, 
    second2: {type: String, required:true}, 
    third2: {type: String, required:true}, 
    fourth2: {type: String, required:true},
    q3: {type: String, required:true},
    first3: {type: String, required:true}, 
    second3: {type: String, required:true}, 
    third3: {type: String, required:true}, 
    fourth3: {type: String, required:true},
    q4: {type: String, required:true},
    first4: {type: String, required:true},
    second4: {type: String, required:true}, 
    third4: {type: String, required:true},
    fourth4: {type: String, required:true},
    solved: {type: Boolean, required:true}
}, { timestamps: true });

module.exports = mongoose.model('exercise', exerciseSchema);