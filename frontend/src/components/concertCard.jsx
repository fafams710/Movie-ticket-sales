// ConcertCard.jsx
import React from 'react';

const ConcertCard = ({ concert }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-800 text-white">
      <img
        className="w-full h-48 object-cover"
        src={concert.image} // Make sure you have an image or use a placeholder
        alt={concert.title}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{concert.title}</h3>
        <p className="text-sm mb-4">{concert.description}</p>
        <p className="text-sm text-gray-400">{concert.date}</p>
        <p className="text-lg font-semibold mt-2">{`$${concert.price}`}</p>
      </div>
    </div>
  );
};

export default ConcertCard;
