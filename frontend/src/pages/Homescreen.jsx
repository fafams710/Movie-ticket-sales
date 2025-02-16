import React, { useState, useEffect } from "react";
import axios from 'axios';

function Homescreen() {
    const [products, setProducts] = useState([]);  // State to hold products

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/api/products');  // Fetch products from API
                setProducts(data);  // Set the products in state
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();  // Call function to fetch products
    }, []);  // Empty dependency array ensures this runs once on component mount

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <section className="flex-grow bg-white dark:bg-gray-900">
                <div className="container px-6 py-12 mx-auto">
                    <h2 className="text-2xl font-bold text-center">Latest Products</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div key={product.id} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                                {/* Display product image */}
                                <div
                                    className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                                    style={{
                                        backgroundImage: `url(/images/${product.image_url || 'default.jpg'})`,  // Access image in public/images folder
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                ></div>

                                {/* Product info */}
                                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                                    <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                                        {product.title}
                                    </h3>

                                    <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                                        <span className="font-bold text-gray-800 dark:text-gray-200">${product.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Homescreen;
