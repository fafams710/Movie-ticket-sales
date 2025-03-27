import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY'); // Replace with your Stripe publishable key

// OrderPage component
const OrderPage = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();

  // Static order details, passed down as props
  const ticketType = order.ticket_type; // e.g. Concert ticket
  const quantity = order.quantity;
  const totalPrice = order.total_price;

  // Handle form submission (UI only)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (error) {
      console.log(error.message);
    } else {
      alert("Payment submitted successfully!");
    }
  };

  // Inline styles for the page
  const pageStyles = {
    backgroundColor: '#f8f9fa', // Light background color
    color: '#333', // Dark text color for contrast
    padding: '40px 20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Order summary styling
  const orderSummaryStyles = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
    width: '100%',
    maxWidth: '500px',
  };

  // Form container styling
  const formContainerStyles = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
  };

  // Stripe CardElement container styling
  const cardElementStyles = {
    margin: '20px 0',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f8f8f8',
  };

  // Submit button styling
  const formButtonStyles = {
    marginTop: '20px',
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
  };

  // Hover effect for button
  const formButtonHoverStyles = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={pageStyles}>
      <div style={orderSummaryStyles}>
        <h1>Order Summary</h1>
        <div>
          <p><strong>Ticket Type:</strong> {ticketType.name}</p>
          <p><strong>Quantity:</strong> {quantity}</p>
          <p><strong>Total Price:</strong> ${totalPrice}</p>
        </div>
      </div>

      <div style={formContainerStyles}>
        <h2>Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div style={cardElementStyles}>
            <CardElement />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            style={formButtonStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = formButtonHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

// Example static order data for testing
const order = {
  ticket_type: {
    name: "Concert Ticket"
  },
  quantity: 2,
  total_price: 50.00, // Example price
};

// Wrapping OrderPage with Elements
const OrderPageWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <OrderPage order={order} />
    </Elements>
  );
};

export default OrderPageWrapper;
