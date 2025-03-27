import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import EventDescPage from './pages/EventDescPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactFloatingButton from './components/ContactFloatingButton';

function App() {
  return (
    <Router>
      {/* Layout Components */}
      <Navbar />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)]">
        <Routes>
          <Route path="/" element={<HomePage />} />  
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event-desc/:id" element={<EventDescPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      
      {/* Global UI Elements */}
      <ContactFloatingButton />
    </Router>
  );
}

export default App;