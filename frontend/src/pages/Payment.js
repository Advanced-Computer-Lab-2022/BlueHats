import React, { useState, useEffect } from "react";
import axios from 'axios';
import CreditCardForm from '../components/CreditCardForm';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

const Payment = () => {
  const [course,setCourse] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const [loading, setLoading ] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios({
      method: "GET",
      url: `/api/courses/${id}`
    }).then(
      (res) => {
        setLoading(false)
        const course = res.data
        setCourse(course)
      }
    )
  },[id])

  return (
    <Elements stripe={stripePromise} >
      <div className="payment">
        {!loading &&  <CreditCardForm course={course} key={id}/>}
      </div>
    </Elements>
  )
}

export default Payment