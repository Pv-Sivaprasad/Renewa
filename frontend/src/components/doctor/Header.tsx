import React, { useState } from 'react';
import {
  Menu,
  X,
  User,
  Calendar,
  DollarSign,
  ChevronDown,
  LogOut
} from 'lucide-react';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuItems = [
    { title: 'Profile', icon: <User className="w-5 h-5" />, path: '/doctor/profile' },
    { title: 'Appointments', icon: <Calendar className="w-5 h-5" />, path: '/doctor/appointments' },
    { title: 'Revenue', icon: <DollarSign className="w-5 h-5" />, path: '/doctor/revenue' },
  ];

  return (
    <div className="min-h-screen bg-blue-100">
      {/* Navbar */}
      <nav className="bg-custom-teal shadow-md fixed w-full z-10">
        <div className="px-4 h-16 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
            >
              <span>Dr. John Doe</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-md transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="py-4">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.path}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center justify-center">
                {item.icon}
              </div>
              {isSidebarOpen && (
                <span className="ml-4">{item.title}</span>
              )}
            </a>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="p-6">
          {/* Your page content will go here */}
          <h1 className="text-2xl font-semibold">Welcome, Dr. John Doe</h1>
        </div>
      </main>
    </div>
  );
};

export default Layout;