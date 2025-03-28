import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const CheckoutPage = () => {
  const { cart, removeFromCart } = useAppContext(); // Updated to useAppContext()

  // State for payment form
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();

    if (!nameOnCard || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      alert('Please fill in all the fields');
      return;
    }

    console.log({
      nameOnCard,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    });

    alert('Payment successful!');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="p-6 ml-30 mr-30">
      <h1 className="text-3xl font-bold mb-6 border-b pb-3 border-sky-300">Checkout</h1>

      
      <div className="flex gap-8">
        {/* Cart Section */}
        <div className="w-1/2">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-100 p-4 border-b">
              <div>
                <div className="font-bold">{item.location}</div>
                <div>
                  {item.section} - {item.quantity} x ₱{item.price.toLocaleString()}
                </div>
              </div>

              <button
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => removeFromCart(item.ticketId)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price */}
          <div className="mt-4 text-lg font-bold">
            Total: ₱{cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}
          </div>
        </div>

        {/* Payment Form Section */}
        <div className="w-1/2">
          <form className="bg-gray-100 p-6 rounded-md shadow-md" onSubmit={handlePayment}>
            <h2 className="text-xl font-bold mb-4">Pay using credit/debit card</h2>

            {/* Name on Card */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name on Card</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Name on Card"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                required
              />
            </div>

            {/* Card Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>

            {/* Expiry Date and CVV */}
            <div className="flex gap-4">
              {/* Expiry Date */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="MM"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    maxLength="2"
                    required
                  />
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="YY"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    maxLength="2"
                    required
                  />
                </div>
              </div>

              {/* CVV */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength="3"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 bg-sky-400 text-white px-6 py-2 rounded-md hover:bg-sky-600 w-full"
            >
              Confirm Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
