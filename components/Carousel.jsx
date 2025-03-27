import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
function Carousel() {
    const [activeSlide, setActiveSlide] = useState(0);
  
  // Sample carousel data
  const carouselItems = [
    {
      artist: "TAEYEON",
      title: "The TENSE",
      location: "MANILA",
      venue: "MALL OF ASIA ARENA",
      date: "2025.03.29",
      day: "SAT",
      time: "6PM",
      background: "from-pink-300 to-pink-200",
    },
    {
      artist: "SEVENTEEN",
      title: "FOLLOW TOUR",
      location: "BULACAN",
      venue: "PHILIPPINE ARENA",
      date: "2025.04.15",
      day: "WED",
      time: "7PM",
      background: "from-blue-300 to-indigo-200",
    },
    {
      artist: "IU",
      title: "THE WINNING",
      location: "MANILA",
      venue: "ARANETA COLISEUM",
      date: "2025.05.10",
      day: "SAT",
      time: "6PM",
      background: "from-purple-300 to-pink-200",
    }
  ];
  
  // Auto-rotate the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [carouselItems.length]);
  
  // Handle manual navigation
  const goToSlide = (index) => {
    setActiveSlide(index);
  };
  
  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };
  
  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % carouselItems.length);
  };
    
    
    return (
        <div className="relative h-120 overflow-hidden">
      {/* Carousel Slides */}
      {carouselItems.map((item, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div className={`w-full h-full bg-gradient-to-r ${item.background} relative`}>
            {/* Sponsor Logos pwede mo alisin*/}
            <div className="absolute top-8 left-8 flex space-x-4">
              <div className="bg-white bg-opacity-10 p-2 rounded">
                <div className="text-sky-300 text-sm">SM Entertainment</div>
              </div>
              <div className="bg-white bg-opacity-10 p-2 rounded">
                <div className="text-sky-300 text-sm">PULP</div>
              </div>
            </div>
            
            {/* Concert Info */}
            <div className="absolute top-1/4 left-20 text-white">
              <div className="text-2xl mb-2">{item.artist} CONCERT</div>
              <div className="text-7xl font-serif italic mb-6">{item.title}</div>
              <div className="text-5xl font-bold mb-6">{item.location}</div>
              <div className="text-xl mb-2">{item.venue}</div>
              <div className="text-xl">{item.date} <span className="text-sm">({item.day})</span> {item.time}</div>
            </div>
            
            {/* Buy Tickets Button */}
            <div className="absolute bottom-10 right-20">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg">
                BUY TICKETS
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 z-20 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 z-20 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
        <div className="flex space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${activeSlide === index ? 'bg-blue-500 scale-110' : 'bg-white bg-opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Carousel