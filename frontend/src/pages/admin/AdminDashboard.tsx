import React, { useState } from 'react';
import { Users, UserCog, LogOut, Menu, X, Home, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Updated import
import {logout} from '../../services/admin/adminApi'
import { resetAdmin } from '../../redux/slices/adminSlice';
import { useDispatch, UseDispatch } from 'react-redux';
const AdminDashboard = () => {
  const navigate = useNavigate(); 
  const dispatch=useDispatch()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  

  // Updated menu items with route
  const menuItems = [
    { title: 'Dashboard', icon: Home, route: '/admin/dashboard' }, // Added route
    { title: 'Doctors', icon: UserCog, route: '/admin/doctors' }, // Added route
    { title: 'Users', icon: Users, route: '/admin/users' }, // Added route
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (item) => {
    setActiveMenu(item.title);
    navigate(item.route); // Use navigate for routing
  };

  const handleLogout=async()=>{
    try {
      const response=await logout()
      if(response){
      dispatch(resetAdmin())
        localStorage.removeItem('accessToken')
        navigate('/admin')
      }
    } catch (error) {
      console.log('error in logging out',error);
      
      
    }
  }


  return (
    <div className="min-h-screen bg-blue-300">
      
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className={`font-bold text-blue-600 ${!isSidebarOpen && 'hidden'}`}>Admin Panel</h1>
          <button onClick={toggleSidebar} className="rounded-lg p-2 hover:bg-gray-100">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleMenuClick(item)} // Call handleMenuClick on click
              className={`flex w-full items-center px-4 py-3 transition-colors ${
                activeMenu === item.title
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              <span className={`ml-4 ${!isSidebarOpen && 'hidden'}`}>
                {item.title}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="fixed right-0 top-0 z-10 flex h-16 items-center justify-between bg-white px-6 shadow-sm"
          style={{ width: isSidebarOpen ? 'calc(100% - 16rem)' : 'calc(100% - 5rem)' }}
        >
          <h2 className="text-xl font-semibold text-gray-800">{activeMenu}</h2>
          
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">A</div>
              <span className="ml-2">Admin</span>
              <ChevronDown size={16} className="ml-2" />
            </button>

            {/* {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    // Add logout logic here
                  }}
                  className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-gray-50"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )} */}
              {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-gray-50"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 pt-24">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            {activeMenu === 'Dashboard' && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-6">
                  <h3 className="mb-2 font-semibold">Total Doctors</h3>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="rounded-lg bg-green-50 p-6">
                  <h3 className="mb-2 font-semibold">Total Users</h3>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-6">
                  <h3 className="mb-2 font-semibold">Active Sessions</h3>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>
            )}
            {activeMenu === 'Doctors' && (
              <div>
                <h3 className="mb-4 text-lg font-semibold">Doctors Management</h3>
                {/* Add doctors management content here */}
              </div>
            )}
            {activeMenu === 'Users' && (
              <div>
                <h3 className="mb-4 text-lg font-semibold">Users Management</h3>
                {/* Add users management content here */}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

