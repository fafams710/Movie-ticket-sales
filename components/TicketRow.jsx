import { useState } from 'react';
import { useAppContext } from '../context/AppContext'; // 
import { toast } from 'react-toastify';

const TicketRow = ({ 
  ticketId,
  location, 
  standingType, 
  sectionOptions = [], 
  price, 
  available 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSection, setSelectedSection] = useState('');
  const { addToCart } = useAppContext(); // 

  const handleAdd = () => {
    if (available) {
      addToCart({
        ticketId,
        location,
        section: selectedSection || sectionOptions[0],
        quantity,
        price
      });

      
      toast.success(`${location} ticket added to cart!`);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-sky-300">
      {/* Location */}
      <div className="w-1/4">
        <div className="font-bold text-lg">{location}</div>
        <div className="text-black-500">{standingType}</div>
      </div>

      {/* Section */}
      <div className="w-1/4">
        {sectionOptions.length > 0 ? (
          <select
            className="border border-gray-300 p-2 w-full rounded-md"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            disabled={!available}
          >
            <option value="">Select Section</option>
            {sectionOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </div>

      {/* Price */}
      <div className="w-1/4 font-bold text-gray-800 ml-20">
        ₱ {price.toLocaleString()}
      </div>

      {/* Quantity and Action */}
      <div className="w-1/4 flex items-center gap-2">
        {available ? (
          <>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="px-2"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-2">{quantity}</span>
              <button
                className="px-2"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            {/* Add Button */}
            <button
              className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
              onClick={handleAdd}
            >
              ADD
            </button>
          </>
        ) : (
          <span className="bg-gray-400 text-white px-4 py-2 rounded-md">
            UNAVAILABLE
          </span>
        )}
      </div>
    </div>
  );
};

export default TicketRow;
