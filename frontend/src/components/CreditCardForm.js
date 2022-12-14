import React, {useState} from "react";
import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import axios from 'axios';

const CreditCardForm = ({ course }) => {
 
    const stripe = useStripe();
    const element = useElements();
  
    const {credentials, setCredentials} = useState({name: '', email: '', phone: '', address: ''});
    const {isProcessing, setProcessing} = useState(false);
    const {error, setError} = useState('');
    const {status, setStatus} = useState('Pay');

    const handleChange = (e) => {
        const { value, name } = e.target;
        setCredentials({...credentials, [name]: value });
    }

    const handleCardChange = (e) => {
        if(e.error)
            return setError(e.error.message);
        setError('');
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setStatus('Processing...');

        const cardElement = element.getElement('card');
        const {name, email, phone, address} = credentials;
        const billinginfo = {
            name,
            phone,
            email,
            address: {
                line1: address,
            },
        };

        try {
            const paymentIntent = await axios.post('/api/courses/payment', {
                amount: course.price * 100,
            });

            const paymentMethodObj = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billinginfo,
            });

            if(paymentMethodObj.error) {
                setError(paymentMethodObj.error.message);
                setProcessing(false);
                setStatus('Pay');
                return;
            }

            const confirmedPayment = await stripe.confirmCardPayment (
                paymentIntent.data,
                { payment_method: paymentMethodObj.paymentMethod.id }
            );

            if(confirmedPayment.error) {
                setError(confirmedPayment.error.message);
                setProcessing(false);
                setStatus('Pay');
                return;
            }

            setStatus('Success! Payment is complete.');

            setTimeout(() => {
                setStatus('Pay');
                setProcessing(false);
                setCredentials({ name: '', email: '', phone: '', address: '' });

            }, 2000);

            cardElement.clear();
        }
        catch(error) {
            setError(error.message);
            setProcessing(false);
            setStatus('Pay');
        }
    }
  
    return (
        <div className="payment-form">
            <form className="card-form" onSubmit={handlePayment}>
                <label> Full Name </label>
                <input 
                    name="name"
                    type="text" 
                    placeholder="Full Name"
                    required
                    //value={credentials.name}
                    onChange={handleChange}
                />
                <label> Phone Number </label>
                <input 
                
                    name="phone"
                    type="number" 
                    placeholder="Phone Number"
                    required
                    //value={credentials.phone}
                    onChange={handleChange}
                />
                <label> Email </label>
                <input 

                    name="email"
                    type="email" 
                    placeholder="name@example.com"
                    required
                   // value={credentials.email}
                    onChange={handleChange}
                />
                <label> Address </label>
                <input 
                    name="address"
                    type="text" 
                    placeholder="123 street"
                    required
                    //value={credentials.address}
                    onChange={handleChange}
                />
                <p>{error}</p>
                <CardElement 
                options={{
                    hidePostalCode: true,
                    style: {
                        base: {
                            fontSize: '20px',
                        },
                        invalid: {
                            color: 'red',
                        },
                    },
                    

                }} 
                onChange={handleCardChange}
                />
                {/* <PaymentElement/> */}
                <br/>
                <button disabled={isProcessing} type="submit"> Pay </button>
            </form>
        </div>
    )
}
  
export default CreditCardForm;