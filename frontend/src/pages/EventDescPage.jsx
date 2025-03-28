import { useParams } from 'react-router-dom';
import TicketRow from '@/components/TicketRow';
import { Venue1Data, Venue2Data, Venue3Data, Venue4Data } from '../AllEventsData';

const EventDescPage = () => {
  const { id } = useParams();

  // Combine all venue data into one array
  const allEventsData = [
    ...Venue1Data,
    ...Venue2Data,
    ...Venue3Data,
    ...Venue4Data
  ];

  // Find the event based on the ID
  const event = allEventsData.find(event => event.id === parseInt(id));

  if (!event) {
    return (
      <div className="text-center text-white py-10">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <p className="text-gray-300">Please check the event ID and try again.</p>
      </div>
    );
  }

  return (
    <>
      {/* Main Event Description */}
      <div className="bg-gradient-to-b from-sky-300 to-sky-600 min-h-60 text-white p-6 md:p-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Event Image */}
          <img
            src={event.image}
            alt={event.title}
            className="w-48 md:w-64 rounded-lg shadow-md"
          />

          {/* Event Details */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {event.title}
            </h1>
            <p className="text-lg text-white-300">{event.venue}</p>

            {/* Date */}
            <div className="mt-4">
              <span className="bg-emerald-500 text-white px-4 py-2 rounded-md font-bold inline-block">
                {event.date}
              </span>
            </div>

            {/* About Section */}
            <div className="mt-6">
              <h2 className="text-xl font-bold border-b border-gray-400 pb-2 mb-2">
                ABOUT
              </h2>
              <p className="text-white-300">{event.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Section - Outside the Main Div */}
      <div className="ml-80 mr-70 mt-5 p-6">
        <h2 className="text-2xl font-bold mb-5 text-gray-800 border-b border-sky-300 pb-3">TICKETS</h2>
        {event.tickets?.map((ticket, index) => (
          <TicketRow key={index} {...ticket} />
        ))}
        
      </div>
      
    </>
  );
};

export default EventDescPage;
