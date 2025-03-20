import EventCard from "./EventCard"

const events = [
  {
    image: "/event1.jpg",
    title: "TAEYEON CONCERT",
    location: "SM Mall Of Asia Arena",
    date: "MAR 29, 2025",
    buttonLabel: "BUY TICKETS",
  },
  {
    image: "/event2.jpg",
    title: "Ado WORLD TOUR",
    location: "SM Mall Of Asia Arena",
    date: "MAY 08, 2025",
    buttonLabel: "BUY TICKETS",
  },
  {
    image: "/event3.jpg",
    title: "2025 LEE MINHO ASIA",
    location: "SM Mall Of Asia Arena",
    date: "APR 26, 2025",
    buttonLabel: "BUY TICKETS",
  },
  {
    image: "/event4.jpg",
    title: "FIVB VOLLEYBALL M",
    location: "SM Mall Of Asia Arena",
    date: "SEP 12, 2025 - SEP 18, 2025",
    buttonLabel: "BUY TICKETS",
  },
]

function EventList() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        EVENTS AT SM MALL OF ASIA ARENA
      </h2>
      <div className="flex gap-6 overflow-x-auto no-scrollbar">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  )
}

export default EventList
