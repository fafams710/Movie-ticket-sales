import React, { useState, useEffect, useCallback } from "react";

const AddToCartModal = ({ concertId, isOpen, onClose, addToCart }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch available tickets when modal is open and concertId changes
  const fetchAvailableTickets = useCallback(async () => {
    if (!concertId) return;
    try {
      console.log(`Fetching tickets from /api/concerts/${concertId}/`);
      
      const response = await fetch(`http://127.0.0.1:8000/api/concerts/${concertId}/`, {
        headers: { "Accept": "application/json" }, // Ensure JSON response
      });

      const data = await response.json(); // Automatically parse the JSON response
      console.log("Fetched concert data:", data); // Debugging: Log fetched data

      if (data.ticket_types) {
        setTickets(data.ticket_types); // Set tickets data
      } else {
        console.error("No ticket types found in the response.");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }, [concertId]);

  useEffect(() => {
    if (isOpen && concertId) {
      fetchAvailableTickets(); // Fetch tickets when the modal opens and concertId changes
    }
  }, [isOpen, concertId, fetchAvailableTickets]);

  // Function to send cart data to Django backend
  const sendCartToBackend = async (ticket, quantity) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticket_id: ticket.id,
          quantity: quantity,
        }),
      });

      const data = await response.json();
      console.log("Cart response:", data); // Debugging
      if (response.ok) {
        console.log("Ticket successfully added to cart");
      } else {
        console.error("Error adding to cart:", data);
      }
    } catch (error) {
      console.error("Failed to send cart data:", error);
    }
  };

  const handleAddToCart = () => {
    if (!selectedTicket) return;

    // Call both frontend and backend addToCart functions
    addToCart(selectedTicket, quantity);
    sendCartToBackend(selectedTicket, quantity);

    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-3xl hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-white text-2xl mb-4">Select Ticket Type</h2>

        {tickets.length > 0 ? (
          <>
            <select
              className="w-full p-2 mb-4 text-black"
              value={selectedTicket ? selectedTicket.id : ""}
              onChange={(e) =>
                setSelectedTicket(
                  tickets.find((t) => t.id === Number(e.target.value))
                )
              }
            >
              <option value="">Select Ticket</option>
              {tickets.map((ticket) => (
                <option key={ticket.id} value={ticket.id}>
                  {ticket.category} - ${ticket.price} ({ticket.remaining_quantity} left)
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 bg-gray-700 text-white"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(
                      1,
                      Math.min(
                        Number(e.target.value),
                        selectedTicket?.remaining_quantity || 1
                      )
                    )
                  )
                }
                className="w-16 text-center text-gray-800"
                min="1"
                max={selectedTicket?.remaining_quantity || 1}
              />
              <button
                onClick={() =>
                  setQuantity(
                    Math.min(selectedTicket?.remaining_quantity || 1, quantity + 1)
                  )
                }
                className="px-4 py-2 bg-gray-700 text-white"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedTicket || quantity > selectedTicket.remaining_quantity}
              className={`px-4 py-2 text-sm font-bold text-white ${
                !selectedTicket || quantity > selectedTicket.remaining_quantity
                  ? "bg-gray-500"
                  : "bg-black hover:bg-gray-800"
              } rounded-full`}
            >
              Add to Cart
            </button>
          </>
        ) : (
          <p className="text-white">No tickets available for this concert.</p>
        )}
      </div>
    </div>
  ) : null;
};

export default AddToCartModal;
