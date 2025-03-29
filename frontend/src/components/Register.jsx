// Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate if you want to redirect later

const Register = ({ onClose }) => { // Accept onClose prop
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [countdown, setCountdown] = useState(3); // Countdown timer in seconds
    const navigate = useNavigate(); // Initialize useNavigate if needed

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const userData = { username, first_name: firstName, last_name: lastName, email, password };

        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Registration failed');
            }

            setSuccess('Registration successful! You can now log in.');

            // Start the countdown timer
            setCountdown(3);
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        onClose(); // Close the modal
                        navigate('/'); // Redirect to home
                        return 0; // Stop countdown
                    }
                    return prev - 1; // Decrement countdown
                });
            }, 1000); // Update every second

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm text-gray-400">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-400">First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-400">Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-400">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-400">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gray-300 py-2 rounded hover:bg-gray-200 transition"
                >
                    Register
                </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && (
                <div className="text-green-500 text-sm mt-2">
                    {success} Redirecting in {countdown} seconds...
                </div>
            )}
        </div>
    );
};

export default Register;