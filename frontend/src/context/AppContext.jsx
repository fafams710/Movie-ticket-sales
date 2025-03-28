import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // State for cart
  const [cart, setCart] = useState([]);

  // State for user uncomment nalang pag connected na backend
//   const [user, setUser] = useState(null);

  // Function to add an item to the cart
  const addToCart = (ticket) => {
    setCart((prevCart) => [...prevCart, ticket]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (ticketId) => {
    setCart((prevCart) => prevCart.filter((item) => item.ticketId !== ticketId));
  };

  // Function to set user data uncomment nalang pag connected na backend
//   const loginUser = (userData) => {
//     setUser(userData);
//   };

//   const logoutUser = () => {
//     setUser(null);
//     setCart([]); // Optionally clear cart on logout
//   };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        // user, uncomment nalang pag connected na backend
        // loginUser, uncomment nalang pag connected na backend
        // logoutUser, uncomment nalang pag connected na backend
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
