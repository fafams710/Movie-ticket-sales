import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Import CartProvider

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LoggedInPage from './pages/LoggedInPage';
import Homescreen from './pages/Homescreen';
import CartModal from './components/CartModal';  // Import the Cart component
import OrdersPage from './pages/orderspage'; // Add OrdersPage route

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';

import './components/Navbar.css';

import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        {/* Wrap the entire app with both AuthProvider and CartProvider */}
        <CartProvider>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Homescreen />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<PrivateRoute><LoggedInPage /></PrivateRoute>} />
              <Route path="/cart" element={<CartModal />} /> {/* Route for Cart page */}
              <Route path="/orders" element={<OrdersPage />} /> {/* Route for Orders page */}
            </Routes>
            <Footer />
          </AuthProvider>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
