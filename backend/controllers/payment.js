require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const coursePayment = async (req, res) => {
    const { amount } = req.body;
    console.log("I got in!")

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency:'usd'
        })
        res.status(200).send(paymentIntent.client_secret);
    } 
    catch (error) {
        res.status(500).json({message: error.message});
        console.log(error)
    }
}

module.exports = { coursePayment };