import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Navbar() {
  const { user, logoutUser } = useAppContext(); 

  return (
    <header className="bg-white p-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}

        <div className="flex items-center">
          <Link to="/"> 
          <div className="text-sky-300 font-bold text-5xl ml-20">EventTix</div>
          </Link>
          <div className="bg-sky-300 text-white rounded-full w-10 h-10 flex items-center justify-center">
            ET
          </div>
          
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center justify-center w-2/4">
          <div className="relative w-100">
            <Input 
              type="text" 
              placeholder="Search for events..." 
              className="pr-10 border-gray-300 focus:border-sky-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
          </div>
          
          <Button className="ml-2 bg-sky-300 hover:bg-sky-400 text-gray-700">
            GO
          </Button>
        </div>
        
        {/* Conditional Rendering for User Login/Logout */}
        <div className="flex items-center space-x-4 mr-20">
          {user ? (
            // 
            <>
              <span className="text-sky-500 font-bold">
                Hi, {user.name}
              </span>
              <button
                onClick={logoutUser}
                className="text-red-500 font-bold px-4 py-2 border border-red-500 rounded-md hover:bg-red-100"
              >
                Logout
              </button>
              <Link to="/checkout">
            <div className="text-sky-400 text-xl cursor-pointer">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.5 3H5l3.6 12.59a1 1 0 0 0 1 .71h7.29a1 1 0 0 0 1-.71L21 6H7" />
              </svg>
            </div>
          </Link>
            </>
            
          ) : (
            
            <Link
              to="/login"
              className="text-sky-500 font-bold px-4 py-2 border border-sky-500 rounded-md hover:bg-sky-100"
            >
              LOGIN
            </Link>
          )}

          {/* Cart Icon */}
          {/* <Link to="/checkout">
            <div className="text-sky-400 text-xl cursor-pointer">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.5 3H5l3.6 12.59a1 1 0 0 0 1 .71h7.29a1 1 0 0 0 1-.71L21 6H7" />
              </svg>
            </div>
          </Link> */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
