import React, { useContext } from 'react';
import { useCart } from '../context/CartContext'; // Use CartContext hook

const CartModal = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart } = useCart(); // Fetch cart items and removeFromCart function from context

    if (!isOpen) return null; // If modal is not open, return nothing

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
            onClick={(e) => e.target === e.currentTarget && onClose()} // Close when clicking on overlay
        >
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-white text-3xl hover:text-red-500 transition duration-200 p-2 rounded-full" 
                    aria-label="Close"
                >
                    &times;
                </button>
                
                {/* Display cart items */}
                <h2 className="text-white text-2xl mb-4">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-white">Your cart is empty.</p>
                ) : (
                    <ul className="text-white">
                        {cartItems.map((item) => (
                            <li key={item._id} className="flex justify-between mb-2">
                                <span>{item.title} - ${item.price} x{item.quantity}</span>
                                {/* Remove button to delete item */}
                                <button 
    onClick={() => removeFromCart(item._id)} // Use item.id instead of item._id
    className="text-red-500 hover:text-red-700"
>
    &times;
</button>

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CartModal;
