import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentPage.css';

// Load Stripe with your public key
const stripePromise = loadStripe('your_stripe_public_key'); // Replace with your Stripe Public Key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    // Create a payment intent on the backend
    try {
      const { data } = await axios.post('http://localhost:5000/api/payments/create-payment-intent', {
        amount: 5000, // Amount in cents (e.g., $50.00)
        currency: 'usd',
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else {
        setMessage('Payment succeeded!');
      }
    } catch (err) {
      setMessage('Error creating payment intent. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay'}
      </button>
      {message && <div className="payment-message">{message}</div>}
    </form>
  );
};

const PaymentPage = () => (
  <div className="payment-page">
    <h2>Complete Your Payment</h2>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default PaymentPage;
