import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import AddToCartModal from '../components/AddToCartModal';
import CartModal from '../components/CartModal';

function Homescreen() {
  const [products, setProducts] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('https://movie-ticket-sales-dj-ca66216bdd9a.herokuapp.com//api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  // Fetch concerts
  useEffect(() => {
    async function fetchConcerts() {
      try {
        const { data } = await axios.get('https://movie-ticket-sales-dj-ca66216bdd9a.herokuapp.com//api/concerts');
        setConcerts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching concerts:', error);
        setLoading(false);
      }
    }
    fetchConcerts();
  }, []);

  // Open modal for a concert
  const handleOpenModal = (concert) => {
    setSelectedConcert(concert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = async (item, quantity) => {
    addToCart(item, quantity);
    try {
      if (item.stock) {
        const updatedProduct = { ...item, stock: item.stock - quantity };
        await axios.put(`https://movie-ticket-sales-dj-ca66216bdd9a.herokuapp.com//api/products/${item._id}/`, updatedProduct);
      }
      setSuccessMessage(`${item.title} added to cart!`);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating product stock:', error);
      setSuccessMessage('Failed to update stock');
    }
  };

  const toggleCartModal = () => {
    setCartModalOpen(!cartModalOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <section className="flex-grow bg-white dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto">
          {/* Products Section */}
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
                    {product.stock > 0 ? (
                      <span className="text-black text-sm">{product.stock} in stock</span>
                    ) : (
                      <span className="text-red-600 text-sm">Out of stock</span>
                    )}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => handleOpenModal(product)}
                      disabled={product.stock === 0}
                      className={`px-4 py-2 text-sm font-bold text-white ${product.stock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'} rounded-full`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Concerts Section */}
          <h2 className="text-2xl font-bold text-center mt-12">Concerts</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {concerts.map((concert) => (
              <div key={concert.id} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                <div
                  className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                  style={{
                    backgroundImage: `url(/images/${concert.image_url || 'default.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                  <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                    {concert.title}
                  </h3>
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <span className="font-bold text-gray-800 dark:text-gray-200">${concert.price || 'N/A'}</span>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => handleOpenModal(concert)}
                      className="px-4 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-full"
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

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}

      {/* Add to Cart Modal */}
      {selectedConcert && (
        <AddToCartModal
          concertId={selectedConcert.id}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          addToCart={handleAddToCart}
        />
      )}

      {/* Cart Modal */}
      <button
        onClick={toggleCartModal}
        className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg"
      >
        Cart
      </button>
      <CartModal isOpen={cartModalOpen} onClose={toggleCartModal} />
    </div>
  );
}

export default Homescreen;
