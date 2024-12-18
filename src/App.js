import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in

  useEffect(() => {
    // Check if the user is already logged in by looking at localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setIsLoggedIn(true); // Set the login status to true if user is logged in
    }
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const username = formData.get('username');
    const fullname = formData.get('fullname');
    const mobile = formData.get('mobile');
  
    if (isLogin) {
      // Check if credentials match the registered user (from localStorage)
      const registeredUser = JSON.parse(localStorage.getItem('user'));
      if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
        setUser(registeredUser);
        setError(''); // Clear error message on successful login
        setSuccessMessage(''); // Clear success message
        setIsLoggedIn(true); // User is logged in
        localStorage.setItem('user', JSON.stringify(registeredUser)); // Store in localStorage
      } else {
        setError('Invalid credentials!');
      }
    } else {
      // Mock registration logic with password confirmation
      if (email && password && username && fullname && mobile) {
        if (password !== confirmPassword) {
          setError('Passwords do not match!');
          return; // Exit early if passwords don't match
        }

        const newUser = { email, password, username, fullname, mobile };
        setSuccessMessage('Successfully registered!');
        setError(''); // Clear any existing errors
        localStorage.setItem('user', JSON.stringify(newUser)); // Save user data in localStorage
  
        // After a brief success message, switch to login form after 1 second
        setTimeout(() => {
          setIsLogin(true); // Switch to login form
          setSuccessMessage(''); // Clear success message
        }, 1000); // Show success message for 1 second
      } else {
        setError('Please provide valid details!');
      }
    }
  };
  
  const handleLogout = () => {
    setUser(null);
    setSuccessMessage('');
    setIsLoggedIn(false); // Set logged in status to false
    localStorage.removeItem('user'); // Remove user from localStorage on logout
    setIsFormVisible(false); // Hide the form when logging out
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Navbar setIsFormVisible={setIsFormVisible} setIsLogin={setIsLogin} />

      {/* Login/SignUp Form */}
      {isFormVisible && !isLoggedIn && (
        <div className="flex items-center justify-center h-full p-6">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isLogin ? 'Login' : 'Register'}
            </h2>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>

              {/* Confirm Password (Only visible for registration) */}
              {!isLogin && (
                <div>
                  <label className="block mb-2 text-sm">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    required
                  />
                </div>
              )}

              {/* Additional fields for registration */}
              {!isLogin && (
                <>
                  <div>
                    <label className="block mb-2 text-sm">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Enter your full name"
                      className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter your mobile number"
                      className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                </>
              )}

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-gray-600 py-2 rounded hover:bg-gray-700 transition"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
            </form>
            <p className="text-center mt-4">
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(''); // Clear error message when switching forms
                  setSuccessMessage(''); // Clear success message when switching forms
                }}
                className="text-gray-400 hover:underline"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Success Message (Only shown once after registration) */}
      {successMessage && !isLoggedIn && (
        <div className="flex items-center justify-center h-full p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{successMessage}</h1>
          </div>
        </div>
      )}

      {/* If logged in, show a clean page with different features */}
      {isLoggedIn && user && (
        <div className="flex items-center justify-center h-full p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome back, {user.username}!</h1>
            {/* Your different set of features */}
            <div className="text-lg mb-6">
              <p>Here are your exclusive features:</p>
              {/* Add features or links here */}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
