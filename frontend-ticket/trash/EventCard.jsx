import { Button } from "@/components/ui/button"

function EventCard({ image, title, location, date, buttonLabel }) {
  return (
    <div className="w-full max-w-[250px] bg-white shadow-md rounded-lg overflow-hidden">
      {/* Event Image */}
      <img src={image} alt={title} className="w-full h-[300px] object-cover" />

      <div className="p-4">
        {/* Event Title */}
        <h3 className="text-lg font-bold text-blue-800 truncate">
          {title}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-500">{location}</p>

        {/* Event Date */}
        <div className="mt-2">
          <span className="bg-blue-600 text-white px-3 py-1 text-xs font-bold rounded">
            {date}
          </span>
        </div>

        {/* Buy Button */}
        <div className="mt-4">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EventCard
