// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import EventCard from './EventCard'

// const EventListSection = ({ title, events, showAllLink }) => {
//   return (
//     <section className="container mx-auto py-8">
//       {/* Section Header */}
//       <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
//         <h2 className="text-2xl font-bold text-navy-900">{title}</h2>
//         {showAllLink && (
//           <a href={showAllLink} className="text-sky-600 font-medium flex items-center hover:underline mr-30">
//             SHOW ALL EVENTS
//             <ChevronRight size={18} />
//           </a>
//         )}
//       </div>
      
//       {/* Events Grid with Navigation Arrows */}
//       <div className="relative">
//         {/* Left Arrow */}
//         <button className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100">
//           <ChevronLeft size={24} className="text-gray-500" />
//         </button>
        
//         {/* Event Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {events.map((event, index) => (
//             <EventCard key={index} {...event} />
//           ))}
//         </div>
        
//         {/* Right Arrow */}
//         <button className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100">
//           <ChevronRight size={24} className="text-gray-500" />
//         </button>
//       </div>
//     </section>
//   );
// };

// export default EventListSection;
