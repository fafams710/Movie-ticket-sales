import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Modal from './Modal';
import LoginPage from '../pages/LoginPage';
import Register from './Register'; // Import Register
import CartModal from './CartModal'; // Add CartModal import

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false); // State to toggle between login and register
    const [isCartModalOpen, setIsCartModalOpen] = useState(false); // State to handle Cart Modal visibility

    const toggleMobileMenu = () => {
        setIsMobileMenuActive(!isMobileMenuActive);
    };

    const openModal = (isRegisterForm) => {
        setIsRegister(isRegisterForm);
        setIsModalOpen(true);
    };

    // Open cart modal
    const openCartModal = () => {
        setIsCartModalOpen(true);
    };

    return (
        <div className="navbar-container">
            <div className="navbar-logo font-bold">
                <h1>
                    <span className="text-white">logo</span>
                    <span className="bg-white-500 text-black p-2 rounded">here</span>
                </h1>
            </div>

            {/* Mobile View: Hamburger Icon */}
            <div className="mobile-menu-container">
                <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
                    {isMobileMenuActive ? 'X' : '☰'}
                </div>

                {/* Mobile Menu Links */}
                <div className={`mobile-navbar-links ${isMobileMenuActive ? 'active' : ''}`}>
                    <ul>
                        <li><Link to="/" className="nav-button"><i className="fas fa-home"></i> Home</Link></li>
                        {user ? (
                            <>
                                <li><button onClick={logoutUser} className="nav-button"><i className="fas fa-sign-out-alt"></i> Logout</button></li>
                                <li><p className="nav-button">Hello {user.username}!</p></li>
                            </>
                        ) : (
                            <>
                                <li><button onClick={() => openModal(false)} className="nav-button"><i className="fas fa-sign-in-alt"></i> Login</button></li>
                                <li><button onClick={() => openModal(true)} className="nav-button"><i className="fas fa-user-plus"></i> Register</button></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* Desktop View: Navbar Links */}
            <div className="desktop-navbar-links">
                <ul className="navbar-links">
                    <li><Link to="/" className="nav-button"><i className="fas fa-home"></i> Home</Link></li>
                    {user ? (
                        <>
                            <li><button onClick={logoutUser} className="nav-button"><i className="fas fa-sign-out-alt"></i> Logout</button></li>
                            <li><p className="nav-button">Hello {user.username}!</p></li>
                        </>
                    ) : (
                        <>
                            <li><button onClick={() => openModal(false)} className="nav-button"><i className="fas fa-sign-in-alt"></i> Login</button></li>
                            <li><button onClick={() => openModal(true)} className="nav-button"><i className="fas fa-user-plus"></i> Register</button></li>
                            <li><button onClick={openCartModal} className="nav-button"><i className="fas fa-shopping-cart"></i> Cart</button></li>
                        </>
                    )}
                </ul>
            </div>

            {/* Modal for Login/Register */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {isRegister ? (
                    <Register onClose={() => setIsModalOpen(false)} />
                ) : (
                    <LoginPage onClose={() => setIsModalOpen(false)} openRegister={() => openModal(true)} />
                )}
            </Modal>

            {/* Cart Modal */}
            <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
        </div>
    );
};

export default Header;
