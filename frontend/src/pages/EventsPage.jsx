import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Venue1Data, Venue2Data, Venue3Data, Venue4Data } from '../AllEventsData';
import EventRow from '@/components/EventRow';

const EventsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedVenue = queryParams.get("venue");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("");

  // Load events based on the selected venue
  const getEvents = () => {
    switch (selectedVenue) {
      case "venue-1":
        return Venue1Data;
      case "venue-2":
        return Venue2Data;
      case "others-and-online":
        return Venue3Data;
      case "attractions":
        return Venue4Data;
      default:
        return [];
    }
  };

  // Filter by month
  const events = getEvents().filter(event => {
    if (!selectedMonth) return true;
    const eventMonth = new Date(event.date).toLocaleString('default', { month: 'long' });
    return eventMonth === selectedMonth;
  });

  // Pagination
  const eventsPerPage = 10;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Generate month options from the event dates
  const monthOptions = [...new Set(getEvents().map(event =>
    new Date(event.date).toLocaleString('default', { month: 'long' })
  ))];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-sky-300 pb-2 ml-30 mr-30">
          <h2 className="text-2xl font-bold text-navy-900">
            Events at {selectedVenue?.replace(/-/g, ' ').toUpperCase()}
          </h2>

          {/* Filter by Month */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-black-700"
          >
            <option value="">Select Month</option>
            {monthOptions.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Event List */}
        {currentEvents.length > 0 ? (
          <div className="space-y-4">
            {currentEvents.map((event, index) => (
              <EventRow key={index} {...event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-black-500 mt-8">
            No events found for this venue.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-4 py-2 border rounded-md ${
                  currentPage === page ? 'bg-sky-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventsPage;
