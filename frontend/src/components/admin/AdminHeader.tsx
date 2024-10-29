import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AdminHeader = ({ setActiveRoute }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-black shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-white">Welcome Admin</h1>
        
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <span>Menu</span>
            <ChevronDown size={16} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={() => {
                  setActiveRoute('users');
                  setIsDropdownOpen(false);
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Users
              </button>
              <button
                onClick={() => {
                  setActiveRoute('doctors');
                  setIsDropdownOpen(false);
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Doctors
              </button>
              <button
                className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader