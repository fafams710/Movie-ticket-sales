import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Use CartContext hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirect

const CartModal = () => {
  const { cartItems, removeFromCart } = useCart(); // Fetch cart items and removeFromCart function from context
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // Initialize navigate

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Calculate the total price of all items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProceedToPayment = () => {
    // Redirect to OrdersPage component
    navigate('/orderspage'); // Ensure '/orders' is mapped to OrdersPage
  };

  // If the modal is not open, show the "Open Cart" button
  if (!isOpen) return <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 rounded-md">Open Cart</button>;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
      onClick={(e) => e.target === e.currentTarget && toggleModal()} // Close when clicking outside
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button 
          onClick={toggleModal} 
          className="absolute top-2 right-2 text-black text-3xl hover:text-red-500 transition duration-200 p-2 rounded-full" 
          aria-label="Close"
        >
          &times;
        </button>
        
        <h1 className="text-2xl font-semibold text-center mb-4">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-xl">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-md">
                  <div>
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <p className="text-gray-500">Price: ${item.price} x {item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)} // Remove item from cart
                    className="text-red-500 hover:text-red-700 text-lg"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>

            {/* Display total price */}
            <div className="mt-6 text-xl font-semibold">
              Total: ${calculateTotalPrice().toFixed(2)}
            </div>

            {/* Proceed to Payment Button */}
            <div className="mt-6">
              <button 
                onClick={handleProceedToPayment} 
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
