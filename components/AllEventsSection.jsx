import React from 'react';
import EventsContainer from './EventsContainer';
import { Venue1Data, Venue2Data, Venue3Data, Venue4Data } from '@/AllEventsData';
function AllEventsSection() {
  return (
    <div>
    <EventsContainer title="Venue 1" events={Venue1Data} />
    <EventsContainer title="Venue 2" events={Venue2Data} />
    <EventsContainer title="Others and Online" events={Venue3Data} />
    <EventsContainer title="Attractions" events={Venue4Data} />
  </div>
  )
}
// EventCard pinasok sa EventsContainer tapos pinasok EventsContainer dito
export default AllEventsSection