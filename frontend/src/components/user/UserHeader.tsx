import React from 'react';
import back from '../../assets/user/back.png'; 
import { Link } from 'react-router-dom';

const UserHeader = () => {
  return (
    <header className='w-full h-30 bg-purple-950 text-white flex justify-between items-center px-8'>
    
      <div className="flex items-center">
        <img src={back} alt="Logo" className="h-20 w-auto" /> 
       
      </div>

      
      <nav>
        <ul className='flex space-x-6'>
          <Link to='/'>
          <li>
            <button className='hover:bg-blue-600 px-4 py-2 rounded cursor-pointer'>Home</button>
          </li>
          </Link>
          <li>
            <button className='hover:bg-blue-600 px-4 py-2 rounded cursor-pointer'>About</button>
          </li>
          <li>
            <button className='hover:bg-blue-600 px-4 py-2 rounded cursor-pointer'>Contact</button>
          </li>
          <li>
            <button className='hover:bg-blue-600 px-4 py-2 rounded cursor-pointer'>Specialities</button>
          </li>
          <Link to='/login' ><li>
            <button className='hover:bg-blue-600 px-4 py-2 rounded cursor-pointer'>Login</button>
          </li></Link>
        </ul>
      </nav>
    </header>
  );
};

export default UserHeader;


