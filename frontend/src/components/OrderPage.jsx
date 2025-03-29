// OrderPage.jsx
import React, { useState } from 'react';

const OrderPage = ({ order }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Static order details, passed down as props
  const ticketType = order.ticket_type.name; // e.g., Concert ticket
  const quantity = order.quantity;
  const totalPrice = order.total_price;

  // PayPal Order Creation
  const createPayPalOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/payments/create-paypal-order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create PayPal order.');
      }

      const data = await response.json();
      if (data.id) {
        // Redirect user to PayPal checkout
        window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${data.id}`;
      }
    } catch (error) {
      setError('Error creating PayPal order.');
      console.error('PayPal order error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Inline styles for the page
  const pageStyles = {
    backgroundColor: '#f8f9fa',
    color: '#333',
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

  // PayPal button styling
  const buttonStyles = {
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
  const buttonHoverStyles = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={pageStyles}>
      <div style={orderSummaryStyles}>
        <h1>Order Summary</h1>
        <div>
          <p><strong>Ticket Type:</strong> {ticketType}</p>
          <p><strong>Quantity:</strong> {quantity}</p>
          <p><strong>Total Price:</strong> ₱{totalPrice}</p>
        </div>
      </div>

      <button
        onClick={createPayPalOrder}
        disabled={loading}
        style={buttonStyles}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        {loading ? 'Processing...' : 'Pay with PayPal'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

// Example static order data for testing
const order = {
  ticket_type: {
    name: 'Concert Ticket',
  },
  quantity: 2,
  total_price: 50.0, // Example price in PHP
};

// Wrapping OrderPage with static order data
const OrderPageWrapper = () => {
  return <OrderPage order={order} />;
};

export default OrderPageWrapper;
