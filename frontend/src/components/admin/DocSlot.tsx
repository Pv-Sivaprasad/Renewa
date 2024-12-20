import React, { useState } from 'react';
import { Check, X, Users, UserCog, LogOut, Menu, Home, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { resetAdmin } from '../../redux/slices/adminSlice';
import { logout } from '../../redux/slices/adminSlice';

const DoctorSlotChecker = ({doctorId}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
 const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('DocSlots');
  const [isProfileOpen, setIsProfileOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Dummy slot data
  const dummySlotData = {
    '2024-02-15': [
      { id: '1', time: '09:00 AM', doctor: 'Dr. Smith' }, 
      { id: '2', time: '10:30 AM', doctor: 'Dr. Smith' },
      { id: '3', time: '02:00 PM', doctor: 'Dr. Johnson' }
    ],
    '2024-02-16': [
      { id: '4', time: '11:00 AM', doctor: 'Dr. Brown' },
      { id: '5', time: '03:30 PM', doctor: 'Dr. Brown' }
    ],
    '2024-02-20': [
      { id: '6', time: '10:00 AM', doctor: 'Dr. Garcia' },
      { id: '7', time: '01:15 PM', doctor: 'Dr. Garcia' },
      { id: '8', time: '04:45 PM', doctor: 'Dr. Garcia' }
    ],
    '2024-02-25': [
      { id: '9', time: '09:30 AM', doctor: 'Dr. Lee' },
      { id: '10', time: '02:30 PM', doctor: 'Dr. Lee' }
    ]
  };

  const handleMenuClick = (item) => {
    setActiveMenu(item.title);
    navigate(item.route);
  };
   const menuItems = [
      { title: 'Dashboard', icon: Home, route: '/admin/dashboard' },
      { title: 'Doctors', icon: UserCog, route: '/admin/doctors' },
      { title: 'Users', icon: Users, route: '/admin/users' },
      { title: 'Doc Slots', icon: UserCog, route: '/admin/docslots' },
    ];
  
  // Generate calendar days
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add actual days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }
    
    return days;
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(), 
      currentMonth.getMonth() - 1, 
      1
    ));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(), 
      currentMonth.getMonth() + 1, 
      1
    ));
  };

  // Format date for comparison and display
  const formatDate = (date) => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  // Get slots for selected date
  const getSlots = (date) => {
    return date ? dummySlotData[formatDate(date)] || [] : [];
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        dispatch(resetAdmin());
        localStorage.removeItem('accessToken');
        navigate('/admin');
      }
    } catch (error) {
      console.log('Error in logging out', error);
      alert(error);
    }
  };
  // Render calendar
  const calendarDays = generateCalendar();
  return (
    <div className="container mx-auto p-4 bg-teal-100 min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <h1
            className={`font-bold text-blue-600 ${
              !isSidebarOpen && 'hidden'
            }`}
          >
            Admin Panel
          </h1>
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
  
        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleMenuClick(item)}
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
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <header
          className="fixed right-0 top-0 z-10 flex h-16 items-center justify-between bg-white px-6 shadow-sm"
          style={{
            width: isSidebarOpen
              ? 'calc(100% - 16rem)'
              : 'calc(100% - 5rem)',
          }}
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {activeMenu}
          </h2>
  
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                A
              </div>
              <span className="ml-2">Admin</span>
              <ChevronDown size={16} className="ml-2" />
            </button>
  
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
  
        {/* Content Section */}
        <main className="pt-20 px-4">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Doctor Slot Checker
          </h2>
  
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Previous
            </button>
            <h3 className="text-xl font-semibold">
              {currentMonth.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </h3>
            <button
              onClick={goToNextMonth}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
  
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="font-bold text-gray-600">
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => day && handleDateSelect(day)}
                className={`p-2 border rounded-lg ${
                  !day ? 'bg-gray-100 cursor-default' : 'hover:bg-blue-100'
                } ${
                  selectedDate &&
                  day &&
                  formatDate(selectedDate) === formatDate(day)
                    ? 'bg-blue-500 text-white'
                    : ''
                } ${
                  day && dummySlotData[formatDate(day)]
                    ? 'border-green-500 text-green-700'
                    : 'border-gray-300'
                }`}
                disabled={!day}
              >
                {day ? day.getDate() : ''}
              </button>
            ))}
          </div>
  
          {/* Slots Display Section */}
          {selectedDate && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-3">
                Slots for {selectedDate.toLocaleDateString()}
              </h3>
  
              {getSlots(selectedDate).length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {getSlots(selectedDate).map((slot) => (
                    <div
                      key={slot.id}
                      className="bg-green-100 p-3 rounded-lg text-center hover:bg-green-200 cursor-pointer"
                    >
                      <div>{slot.time}</div>
                      <div className="text-sm text-gray-600">{slot.doctor}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No available slots on this date
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
  
  // return (
    
  //   <div className="container mx-auto p-4 max-w-2xl">
  //     <div
  //       className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${
  //         isSidebarOpen ? 'w-64' : 'w-20'
  //       }`}
  //     >
  //       <div className="flex h-16 items-center justify-between px-4">
  //         <h1
  //           className={`font-bold text-blue-600 ${
  //             !isSidebarOpen && 'hidden'
  //           }`}
  //         >
  //           Admin Panel
  //         </h1>
  //         <button
  //           onClick={toggleSidebar}
  //           className="rounded-lg p-2 hover:bg-gray-100"
  //         >
  //           {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
  //         </button>
  //       </div>

  //       <nav className="mt-8">
  //         {menuItems.map((item) => (
  //           <button
  //             key={item.title}
  //             onClick={() => handleMenuClick(item)}
  //             className={`flex w-full items-center px-4 py-3 transition-colors ${
  //               activeMenu === item.title
  //                 ? 'bg-blue-50 text-blue-600'
  //                 : 'text-gray-600 hover:bg-gray-50'
  //             }`}
  //           >
  //             <item.icon size={20} />
  //             <span className={`ml-4 ${!isSidebarOpen && 'hidden'}`}>
  //               {item.title}
  //             </span>
  //           </button>
  //         ))}
  //       </nav>
  //     </div>
  //      <div
  //             className={`transition-all duration-300 ${
  //               isSidebarOpen ? 'ml-64' : 'ml-20'
  //             }`}
  //           >
  //             {/* Header */}
  //             <header
  //               className="fixed right-0 top-0 z-10 flex h-16 items-center justify-between bg-white px-6 shadow-sm"
  //               style={{
  //                 width: isSidebarOpen
  //                   ? 'calc(100% - 16rem)'
  //                   : 'calc(100% - 5rem)',
  //               }}
  //             >
  //               <h2 className="text-xl font-semibold text-gray-800">
  //                 {activeMenu}
  //               </h2>
      
  //               <div className="relative">
  //                 <button
  //                   onClick={() => setIsProfileOpen(!isProfileOpen)}
  //                   className="flex items-center rounded-lg px-3 py-2 hover:bg-gray-100"
  //                 >
  //                   <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
  //                     A
  //                   </div>
  //                   <span className="ml-2">Admin</span>
  //                   <ChevronDown size={16} className="ml-2" />
  //                 </button>
      
  //                 {isProfileOpen && (
  //                   <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg">
  //                     <button
  //                       onClick={handleLogout}
  //                       className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-gray-50"
  //                     >
  //                       <LogOut size={16} className="mr-2" />
  //                       Logout
  //                     </button>
  //                   </div>
  //                 )}
  //               </div>
  //             </header>
  //     <h2 className="text-2xl font-bold mb-4 text-center">
  //       Doctor Slot Checker
  //     </h2>

  //     {/* Month Navigation */}
  //     <div className="flex justify-between items-center mb-4">
  //       <button 
  //         onClick={goToPreviousMonth}
  //         className="p-2 bg-blue-500 text-white rounded"
  //       >
  //         Previous
  //       </button>
  //       <h3 className="text-xl font-semibold">
  //         {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
  //       </h3>
  //       <button 
  //         onClick={goToNextMonth}
  //         className="p-2 bg-blue-500 text-white rounded"
  //       >
  //         Next
  //       </button>
  //     </div>

  //     {/* Calendar Grid */}
  //     <div className="grid grid-cols-7 gap-2 mb-6 text-center">
  //       {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
  //         <div key={day} className="font-bold text-gray-600">{day}</div>
  //       ))}
  //       {calendarDays.map((day, index) => (
  //         <button
  //           key={index}
  //           onClick={() => day && handleDateSelect(day)}
  //           className={`
  //             p-2 border rounded-lg 
  //             ${!day ? 'bg-gray-100 cursor-default' : 'hover:bg-blue-100'}
  //             ${selectedDate && day && formatDate(selectedDate) === formatDate(day) 
  //               ? 'bg-blue-500 text-white' 
  //               : ''
  //             }
  //             ${day && dummySlotData[formatDate(day)] 
  //               ? 'border-green-500 text-green-700' 
  //               : 'border-gray-300'
  //             }
  //           `}
  //           disabled={!day}
  //         >
  //           {day ? day.getDate() : ''}
  //         </button>
  //       ))}
  //     </div>

  //     {/* Slots Display Section */}
  //     {selectedDate && (
  //       <div className="mt-4">
  //         <h3 className="text-xl font-semibold mb-3">
  //           Slots for {selectedDate.toLocaleDateString()}
  //         </h3>

  //         {getSlots(selectedDate).length > 0 ? (
  //           <div className="grid grid-cols-2 gap-3">
  //             {getSlots(selectedDate).map((slot) => (
  //               <div 
  //                 key={slot.id} 
  //                 className="bg-green-100 p-3 rounded-lg text-center hover:bg-green-200 cursor-pointer"
  //               >
  //                 <div>{slot.time}</div>
  //                 <div className="text-sm text-gray-600">{slot.doctor}</div>
  //               </div>
  //             ))}
  //           </div>
  //         ) : (
  //           <div className="text-center text-gray-500">
  //             No available slots on this date
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </div>
  //   </div>
  // );
};

export default DoctorSlotChecker;