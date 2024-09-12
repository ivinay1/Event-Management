const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key'); // Replace with your Stripe Secret Key
const router = express.Router();

// Create a payment intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: 'Error creating payment intent', error: err.message });
  }
});

// Handle payment success or failure
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'your_webhook_secret'; // Replace with your actual Stripe webhook secret

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle different types of events
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Handle successful payment here
      break;
    case 'payment_intent.payment_failed':
      const paymentError = event.data.object;
      console.log(`Payment failed: ${paymentError.last_payment_error.message}`);
      // Handle payment failure here
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
