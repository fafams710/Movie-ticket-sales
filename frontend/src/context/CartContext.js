// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Function to add an item to the cart
    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item._id === product._id);  // Change from 'id' to '_id'

            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id  // Change from 'id' to '_id'
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prevItems, { ...product, quantity }];
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (productId) => {
      setCartItems((prevItems) =>
          prevItems.filter(item => item._id !== productId)  // Consistently use '_id'
      );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);

export default CartContext;
