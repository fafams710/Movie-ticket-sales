const EventRow = ({ title, date, venue }) => {
    return (
      <div className="flex justify-between items-center border-b border-sky-300 py-4 mr-30 ml-30">
        {/* Event Title */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>
  
        {/* Date */}
        <div className="flex-shrink-0 w-32 text-center">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-sm text-sm font-medium">
            {date}
          </span>
        </div>
  
        {/* Venue */}
        <div className="flex-1 text-center text-black-800">
          {venue}
        </div>
  
        {/* Buy Tickets Button */}
        <div className="flex-shrink-0">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-md">
            BUY TICKETS
          </button>
        </div>
      </div>
    );
  };
  
  export default EventRow;
  