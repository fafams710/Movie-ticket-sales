import React from 'react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const ConcertTicketUI = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-blue-600 font-bold text-xl mr-2">SM TICKETS</div>
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
              SH
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex mr-4">
              <Select>
                <option>Select events</option>
              </Select>
              
              <Select>
                <option>Select date</option>
              </Select>
              
              <Button className="bg-gray-300 hover:bg-gray-400 text-gray-700">
                GO
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-blue-700">
                <span className="mr-2">•</span>
                <span className="font-bold">HI, EJ PAUL</span>
              </div>
              <div className="text-blue-700 text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
              </div>
              <div className="text-blue-700 text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                  <line x1="4" x2="20" y1="12" y2="12"/>
                  <line x1="4" x2="20" y1="6" y2="6"/>
                  <line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        <div className="relative">
          {/* Background Image with Overlay */}
          <div className="w-full h-screen bg-gradient-to-r from-pink-300 to-pink-200 relative overflow-hidden">
            {/* Sponsor Logos */}
            <div className="absolute top-8 left-8 flex space-x-4">
              <div className="bg-white bg-opacity-10 p-2 rounded">
                <div className="text-white text-sm">SM Entertainment</div>
              </div>
              <div className="bg-white bg-opacity-10 p-2 rounded">
                <div className="text-white text-sm">PULP</div>
              </div>
            </div>
            
            {/* Concert Info */}
            <div className="absolute top-1/4 left-12 text-white">
              <div className="text-2xl mb-2">TAEYEON CONCERT</div>
              <div className="text-7xl font-serif italic mb-6">The<span className="tracking-wider">TENSE</span></div>
              <div className="text-5xl font-bold mb-6">MANILA</div>
              <div className="text-xl mb-2">MALL OF ASIA ARENA</div>
              <div className="text-xl">2025.03.29 <span className="text-sm">(SAT)</span> 6PM</div>
            </div>
            
            {/* Buy Tickets Button */}
            <div className="absolute bottom-10 right-10">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg">
                BUY TICKETS
              </Button>
            </div>
            
            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <div className="flex space-x-1">
                {Array(40).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${i === 4 ? 'bg-blue-500' : 'bg-white bg-opacity-50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConcertTicketUI;