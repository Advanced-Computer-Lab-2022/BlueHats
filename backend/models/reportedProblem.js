const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportedProblemSchema = new Schema({
    description: {
        type: String
    },
    status: {
        type: String
    },
    response: {
        type: String
    },
    unseen: {
        type: Boolean
    }
}, { timestamps: true });


module.exports = mongoose.model('reportedProblem', reportedProblemSchema);