import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import EventTable from "./EventTable";

const EventSection = ({ title, events }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="container mx-auto mb-8">
      {/* Section Header */}
      <div
        className="flex justify-between items-center cursor-pointer py-4 border-b-2 border-sky-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-2xl font-bold text-navy-900">
          EVENTS AT {title?.toUpperCase()}
        </h2>

        {/* Chevron Icon */}
        {isOpen ? (
          <ChevronDown size={24} className="text-gray-500" />
        ) : (
          <ChevronRight size={24} className="text-gray-500" />
        )}
      </div>

      {/* Events List */}
      {isOpen && <EventTable events={events} />}
    </section>
  );
};

export default EventSection;
