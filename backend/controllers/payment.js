
const course = require('../models/course');
const myinstructor = require('../models/instructorModel');
const indTrainee = require('../models/indTraineeModel');
const Refund = require('../models/refunds');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const coursePayment = async (req, res) => {
    const { amount } = req.body;
    const { courseID } = req.body;
    const { userID } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency:'usd'
        })

        const result = await course.findById(courseID).populate('instructor');

        const InstID = (result.instructor._id).toString();
        console.log(InstID);

        const wallet = result.instructor.wallet + ((amount/100) - ((amount/100)*0.2));

        const updateWallet = await myinstructor.findOneAndUpdate({_id: InstID}, {wallet: wallet});
        console.log(updateWallet);

        const mycourse = await course.findById(courseID);

        const enrolled = mycourse.enrolled + 1;

        const updateCourse = await course.findOneAndUpdate({_id: courseID}, {enrolled : enrolled});

        const trainee = await indTrainee.findById(userID);

        const object = { course: courseID, progress: 0 };

        const newCourses = trainee.courses.concat([object]);  

        const updatedTrainee = await indTrainee.findOneAndUpdate({_id: userID} , {courses: newCourses});


        res.status(200).send(paymentIntent.client_secret);
    } 
    catch (error) {
        res.status(500).json({message: error.message});
        console.log(error)
    }
}

const requestRefund = async (req, res) => {
    const { course } = req.body;
    const { indTrainee } = req.body;

    try 
    {
        const refund = await Refund.create({course, indTrainee});
        res.status(200).json(refund);
    } 
    catch (error) 
    {
        res.status(400).json({ error: error.message });
    }

}
const courseRefund = async (req, res) => {
    const { courseID } = req.body;
    const { indTraineeID } = req.body;
    const { refundID } = req.body;
    console.log("im in ya man")


    const refund = await Refund.findOneAndDelete({ _id: refundID });
    console.log(refund+"yayyy");

    const mycourse = await course.findById(courseID);

    const enrolled = mycourse.enrolled - 1;

    const updateCourse = await course.findOneAndUpdate({_id: courseID}, {enrolled : enrolled});

    const result = await course.findById(courseID).populate('instructor');

    const InstID = (result.instructor._id).toString();

    const wallet = result.instructor.wallet - ((result.price) - ((result.price)*0.2));
    console.log(result.instructor.wallet);
    console.log(wallet);

    const updateWallet = await myinstructor.findOneAndUpdate({_id: InstID}, {wallet: wallet});
    console.log(updateWallet);

    const trainee = await indTrainee.findById(indTraineeID);
    console.log(trainee);

    const traineeWallet = trainee.wallet + result.price; 
    console.log(trainee.wallet);

    const updateTraineeWallet = await indTrainee.findOneAndUpdate({_id: indTraineeID}, {wallet: traineeWallet});
    console.log(updateTraineeWallet);

    const array = trainee.courses;

    let i = 0;
    let newCourses = [];

    while(i < array.length)
    {
        const currentID = array[i].course;
        if( currentID != courseID )
        {
            newCourses = newCourses.concat([array[i]]);
        }
        i++;
    }

    const updatedTrainee = await indTrainee.findOneAndUpdate({_id: indTraineeID} , {courses: newCourses});   

    if(!trainee) 
    {
        return res.status(404).json({error: 'No such Individual Trainee'})
    }

    res.status(200).json(updatedTrainee);
}

const getWallet = async (req, res) => {
    const { userID } = req.body;
    const { type } = req.body;

    if(type == "instructor")
    {
        const instructor = await myinstructor.findById(userID);
        res.status(200).json(instructor.wallet);
    }
    else 
    {
        const trainee = await indTrainee.findById(userID);
        res.status(200).json(trainee.wallet);
    }
}

const getRefundRequests = async (req, res) => {
    const refunds = await Refund.find({}).sort({ createdAt: -1 });
   
    res.status(200).json(refunds);
}

const getCourseName = async (req, res) => {
    const { refundID } = req.body;

    const refund = await Refund.findById(refundID).populate('course');

    const name = refund.course.title;

    res.status(200).json(name);
}

const getTraineeName = async (req, res) => {
    const { refundID } = req.body;

    const refund = await Refund.findById(refundID).populate('indTrainee');

    const name = refund.indTrainee.username;

    res.status(200).json(name);
}

const getCoursePrice = async (req, res) => {
    const { refundID } = req.body;

    const refund = await Refund.findById(refundID).populate('course');

    const price = refund.course.price;

    res.status(200).json(price);
}

const payWithWallet = async (req, res) => {
    const { userID } = req.body;
    const { price } = req.body;
    const { courseID } = req.body;

    const trainee = await indTrainee.findById(userID);
    console.log(trainee);

    const traineeWallet = trainee.wallet - price; 
    console.log(trainee.wallet);

    const updateTraineeWallet = await indTrainee.findOneAndUpdate({_id: userID}, {wallet: traineeWallet});
    console.log(updateTraineeWallet);

    const mycourse = await course.findById(courseID);

    const enrolled = mycourse.enrolled + 1;

    const updateCourse = await course.findOneAndUpdate({_id: courseID}, {enrolled : enrolled});

    const object = { course: courseID, progress: 0 };

    const newCourses = trainee.courses.concat([object]);  

    const updatedTrainee = await indTrainee.findOneAndUpdate({_id: userID} , {courses: newCourses});
}

module.exports = { coursePayment, requestRefund, getRefundRequests, courseRefund, getWallet, getCourseName, getTraineeName, getCoursePrice, payWithWallet };