import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, addProduct, removeProduct, selectCart } from '../store/productSlice'; // Adjust the import path as necessary

const HomePage = () => {
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeProduct(product));
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <section className="flex-grow bg-white dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto">
          <h2 className="text-2xl font-bold text-center">Products</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                <div
                  className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                  style={{
                    backgroundImage: `url(${product.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>

                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                  <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <span className="font-bold text-gray-800 dark:text-gray-200">{product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-center mt-12">Cart</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cart.map((product) => (
              <div key={product.id} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                <div
                  className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                  style={{
                    backgroundImage: `url(${product.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>

                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                  <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <span className="font-bold text-gray-800 dark:text-gray-200">{product.price}</span>
                    <button
                      onClick={() => handleRemoveFromCart(product)}
                      className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-red-600 rounded hover:bg-red-500 focus:bg-red-500 focus:outline-none"
                    >
                      Remove from cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;