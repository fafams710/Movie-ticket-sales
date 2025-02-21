import React, { useState, useEffect } from 'react';

const AddToCartModal = ({ product, isOpen, onClose, addToCart }) => {
    const [quantity, setQuantity] = useState(1);  // Default to 1 item

    // Reset quantity when the modal is closed
    useEffect(() => {
        if (!isOpen) {
            setQuantity(1);  // Reset quantity back to 1 when modal is closed
        }
    }, [isOpen]);  // Only run when the modal open/close state changes

    if (!isOpen) return null; // If modal is not open, return nothing

    const handleQuantityChange = (e) => {
        const newQuantity = Math.max(1, Math.min(e.target.value, product.stock));  // Ensure the quantity is between 1 and the stock available
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);  // Pass the product and quantity to addToCart
        onClose();  // Close the modal after adding to the cart
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-white text-3xl hover:text-red-500 transition duration-200 p-2 rounded-full" 
                    aria-label="Close"
                >
                    &times;
                </button>
                
                <h2 className="text-white text-2xl mb-4">Add {product.title} to your Cart</h2>
                
                {/* Display available stock */}
                <p className="text-white mb-4">Available stock: {product.stock}</p>

                {/* Quantity input */}
                <div className="flex items-center space-x-4 mb-4">
                    <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-16 text-center text-gray-800 rounded-md"
                        min="1"
                        max={product.stock}
                    />
                    <button 
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
                    >
                        +
                    </button>
                </div>

                {/* Add to Cart Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0} // Disable button if out of stock
                        className={`px-4 py-2 text-sm font-bold text-white ${product.stock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'} rounded-full`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToCartModal;
