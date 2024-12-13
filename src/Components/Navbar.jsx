import React, {useState} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleNav = () => {
      setNav (!nav)
    }
  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-24 text-white bg-black'>
   <h1 className="inline-block font-bold text-3xl ml-2">
  <span className="text-white">Corn</span>
  <span className="bg-orange-500 text-black p-2 rounded">hub</span>
</h1>


      <ul className='flex hidden'>
        <li className='p-5'>Home</li>
        <li className='p-5'>Movies</li>
        <li className='p-5'>Series</li>
        <li className='p-5'>Cartoons</li>
        <li className='p-5'>Anime</li>
        <li className='p-5'>Contact Us</li>
        <li className='p-5'>Login</li>
      </ul>

       <div onClick={handleNav} className='block md'>
        {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}

       </div>
       <div className={!nav ? 'fixed left-0 top-0 w-[35%] h-full border-r border-r-gray-900 bg-[orange-800] ease-in-out duration-500': 'fixed left-[-100%]'}>
        <ul className='pt-20  uppercase p-4'>

        <li className='p-5 border-b border-b-gray-600'>Home</li>
        <li className='p-5 border-b border-b-gray-600'>Movies</li>
        <li className='p-5 border-b border-b-gray-600'>Series</li>
        <li className='p-5 border-b border-b-gray-600'>Cartoons</li>
        <li className='p-5 border-b border-b-gray-600'>Anime</li>
        <li className='p-5 border-b border-b-gray-600'>Contact Us</li>
        <li className='p-5'>Login</li>  
         </ul>
       </div>
    </div>
  );
};

export default Navbar;
