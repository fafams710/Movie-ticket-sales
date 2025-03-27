import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import EventCard from './EventCard'

const EventsContainer = ({ title, events = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const eventsPerPage = 4
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // If at the beginning, jump to the last possible position
        return Math.max(0, events.length - eventsPerPage)
      } else {
        // Otherwise, go back 4 events
        return Math.max(0, prevIndex - eventsPerPage)
      }
    })
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + eventsPerPage >= events.length) {
        // If at the end, jump back to the beginning
        return 0
      } else {
        // Otherwise, go forward 4 events
        return prevIndex + eventsPerPage
      }
    })
  }
  
  // Always show 4 events if available, even if wrapping around
  const getVisibleEvents = () => {
    if (events.length <= eventsPerPage) {
      return events
    }

    const visibleEvents = []
    for (let i = 0; i < eventsPerPage; i++) {
      const index = (currentIndex + i) % events.length
      visibleEvents.push(events[index])
    }
    return visibleEvents
  }
  
  const visibleEvents = getVisibleEvents()
    
  return (
    <div className="min-h-180 bg-gray-50">
      <section className="container mx-auto py-8">
        {/* Section Header */}
        <div className="flex ml-30 justify-between items-center mb-10 pb-2 border-b-3 border-sky-300 mr-30">
          <h2 className="text-2xl font-bold text-navy-900">
             {title?.toUpperCase()}
          </h2>
          <a
            href={`/events?venue=${title?.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-sky-600 font-medium flex items-center hover:underline"
          >
            SHOW ALL EVENTS
            <ChevronRight size={18} />
          </a>
        </div>

        {/* Events Grid with Navigation Arrows */}
        <div className="relative px-1 md:px-6">
            {/* Left Arrow - Always shown for infinite scrolling */}
            <button 
              onClick={handlePrevious}
              className="absolute left-50 top-1/2 transform -translate-y-1/2 bg-sky-300 text-white p-2 rounded-md z-10 hover:bg-sky-500"
            >
                <ChevronLeft size={24} />
            </button>

          {/* Event Cards with minimal spacing */}
          <div className="flex justify-center gap-0 pb-4 no-scrollbar snap-x">
            {visibleEvents.map((event, index) => (
              <div key={`${currentIndex}-${index}`} className="flex-shrink-0 snap-start">
                <EventCard {...event} />
              </div>
            ))}
          </div>

            {/* Right Arrow - Always shown for infinite scrolling */}
            <button 
              onClick={handleNext}
              className="absolute right-50 top-1/2 transform -translate-y-1/2 bg-sky-300 text-white p-2 rounded-md z-10 hover:bg-sky-500"
            >
                <ChevronRight size={24} />
            </button>
        </div>
      </section>
    </div>
  )
}

export default EventsContainer