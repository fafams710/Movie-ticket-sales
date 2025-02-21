import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import AddToCartModal from '../components/AddToCartModal';  // Import the modal

function Homescreen() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);  // Track the selected product for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);  // Track modal visibility
    const [successMessage, setSuccessMessage] = useState("");  // Track success message
    const { addToCart } = useCart();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/api/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);  // Open modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);  // Close modal
    };

    const handleAddToCart = async (product, quantity) => {
        addToCart(product, quantity);  // Add item to the cart
        
        // Decrease the stock on the server after adding to the cart
        try {
            const updatedProduct = { ...product, stock: product.stock - quantity };

            // Send the request to update stock
            await axios.put(`http://127.0.0.1:8000/api/products/${product._id}/`, updatedProduct);

            // After successful update, show success message
            setSuccessMessage(`${product.title} added to cart!`);
            setTimeout(() => {
                setSuccessMessage("");  // Hide success message after 3 seconds
            }, 3000);
        } catch (error) {
            console.error('Error updating product stock:', error);
            setSuccessMessage('Failed to update stock');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <section className="flex-grow bg-white dark:bg-gray-900">
                <div className="container px-6 py-12 mx-auto">
                    <h2 className="text-2xl font-bold text-center">Latest Products</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div key={product._id} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                                <div
                                    className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                                    style={{
                                        backgroundImage: `url(/images/${product.image_url || 'default.jpg'})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                ></div>
                                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                                    <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                                        {product.title}
                                    </h3>
                                    <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                                        <span className="font-bold text-gray-800 dark:text-gray-200">${product.price}</span>

                                        {/* Display stock availability */}
                                        {product.stock > 0 ? (
                                            <span className="text-black text-sm">{product.stock} in stock</span>
                                        ) : (
                                            <span className="text-red-600 text-sm">Out of stock</span>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            onClick={() => handleOpenModal(product)}
                                            disabled={product.stock === 0}  // Disable button if out of stock
                                            className={`px-4 py-2 text-sm font-bold text-white ${product.stock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'} rounded-full`}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Message - Positioned at the top */}
            {successMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg">
                    {successMessage}
                </div>
            )}

            {/* Modal */}
            <AddToCartModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                addToCart={handleAddToCart}
            />
        </div>
    );
}

export default Homescreen;
