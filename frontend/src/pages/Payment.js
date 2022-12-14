
import CreditCardForm from '../components/CreditCardForm';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
const stripePromise = loadStripe(`${process.env.PUBLISHABLE_KEY}`);

const Payment = () => {

  return (
    <Elements stripe={stripePromise} >
      <div className="payment">
        <CreditCardForm/>
      </div>
    </Elements>
  )
}

export default Payment