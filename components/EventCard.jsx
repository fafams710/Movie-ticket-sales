import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EventCard = ({ id, image, title, venue, date, }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/event-desc/${id}`);;
  };

  return (
    <div 
      className="flex flex-col max-w-[250px] max-h-[350px] px-2 cursor-pointer"
      onClick={handleNavigation}
    >
      {/* Event Image */}
      <div className="w-full aspect-[4/5] mb-2">
        <img 
          src={image || "/api/placeholder/400/500"} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Event Title */}
      <h3 className="text-blue-900 font-bold text-xl md:text-2xl mb-1">
        {title}
      </h3>
      
      {/* Venue */}
      <p className="text-gray-600 text-base mb-2">
        {venue}
      </p>
      
      {/* Date */}
      <div className="mb-3">
        <span className="bg-blue-600 text-white px-4 py-2 inline-block font-bold rounded-md">
          {date}
        </span>
      </div>
      
      {/* Buy Tickets Button */}
      <div>
        <Button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from triggering
            handleNavigation();
          }}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 text-lg uppercase"
        >
          BUY TICKETS
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
