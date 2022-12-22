require('dotenv').config();
const course = require('../models/course');
const myinstructor = require('../models/instructorModel');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const coursePayment = async (req, res) => {
    const { amount } = req.body;
    const { courseID } = req.body;

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

        // also check if the wallet of the trainee is greater than or equal the course price in order to decrease the their wallet value

        res.status(200).send(paymentIntent.client_secret);
    } 
    catch (error) {
        res.status(500).json({message: error.message});
        console.log(error)
    }
}

const courseRefund = async (req, res) => {
    const { pi_id } = req.body;
    // remove course from trainee and increase trainee wallet and decrease the instructor wallet by the full price (course.price)
    try {
        const refund = await stripe.refunds.create({
            payment_intent: pi_id,
        })
       
    } 
    catch (error) {
        res.status(500).json({message: error.message});
        console.log(error)
    }
}

module.exports = { coursePayment, courseRefund };