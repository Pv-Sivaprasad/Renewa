import React, { useEffect, useState } from 'react';
import { Check, X, Users, UserCog, LogOut, Menu, Home, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { resetAdmin } from '../../redux/slices/adminSlice';
import { logout } from '../../redux/slices/adminSlice';
import { getSingleDocSlots } from '../../services/admin/adminApi';

const DoctorSlotChecker = ({doctorId}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [docSlotData, setDocSlotData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
 const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('DocSlots');
  const [isProfileOpen, setIsProfileOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

useEffect(() => {
  const fetchDocData = async (doctorId) => {
    try {
      const response = await getSingleDocSlots(doctorId);
      console.log('Backend response:', response);

      // Normalize and format dates
      const formattedData = response.data.dates.reduce((acc, dateObj) => {
        // Ensure consistent date format (e.g., UTC date only)
        const formattedDate = new Date(dateObj.date).toISOString().split('T')[0]; 
        acc[formattedDate] = dateObj.slots.map((slot) => ({
          id: slot._id,
          time: `${slot.startTime} - ${slot.endTime}`,
          isAvailable: slot.isAvailable,
        }));
        return acc;
      }, {});

      setDocSlotData(formattedData);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  fetchDocData(doctorId);
}, [doctorId]);


const getSlots = (date) => {
  if (!date) return [];
  
 
  const normalizedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  console.log('Normalized date:', normalizedDate);
  return docSlotData[normalizedDate] || [];
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
  
 
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    
    const firstDay = new Date(year, month, 1);
  
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
   
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }
    
    return days;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(), 
      currentMonth.getMonth() - 1, 
      1
    ));
  };


  const goToNextMonth = () => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(), 
      currentMonth.getMonth() + 1, 
      1
    ));
  };



  const formatDate = (date) => {
    if (!date) return '';
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
 
  const calendarDays = generateCalendar();

 
  
  return (
    <div className="container mx-auto p-4 bg-teal-100 min-h-screen">
      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className={`font-bold text-blue-600 ${!isSidebarOpen && "hidden"}`}>Admin Panel</h1>
          <button onClick={toggleSidebar} className="rounded-lg p-2 hover:bg-gray-100">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleMenuClick(item)}
              className={`flex w-full items-center px-4 py-3 transition-colors ${
                activeMenu === item.title ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon size={20} />
              <span className={`ml-4 ${!isSidebarOpen && "hidden"}`}>{item.title}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        <header className="fixed right-0 top-0 z-10 flex h-16 items-center justify-between bg-white px-6 shadow-sm" style={{ width: isSidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 5rem)" }}>
          <h2 className="text-xl font-semibold text-gray-800">{activeMenu}</h2>
          <div className="relative">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center rounded-lg px-3 py-2 hover:bg-gray-100">
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">A</div>
              <span className="ml-2">Admin</span>
              <ChevronDown size={16} className="ml-2" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg">
                <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-gray-50">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="pt-20 px-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Doctor Slot Checker</h2>
          <div className="flex justify-between items-center mb-4">
            <button onClick={goToPreviousMonth} className="p-2 bg-blue-500 text-white rounded">Previous</button>
            <h3 className="text-xl font-semibold">
              {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
            </h3>
            <button onClick={goToNextMonth} className="p-2 bg-blue-500 text-white rounded">Next</button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-6 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-bold text-gray-600">{day}</div>
            ))}
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => day && handleDateSelect(day)}
                className={`p-2 border rounded-lg ${!day ? "bg-gray-100 cursor-default" : "hover:bg-blue-100"} ${
                  selectedDate && day && formatDate(selectedDate) === formatDate(day) ? "bg-blue-500 text-white" : ""
                } ${day && docSlotData[formatDate(day)] ? "border-green-500 text-green-700" : "border-gray-300"}`}
                disabled={!day}
              >
                {day ? day.getDate() : ""}
              </button>
            ))}
          </div>
          {selectedDate && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-3">Slots for {selectedDate.toLocaleDateString()}</h3>
              {getSlots(selectedDate).length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {getSlots(selectedDate).map((slot) => (
                    <div key={slot.id} className="bg-green-100 p-3 rounded-lg text-center hover:bg-green-200 cursor-pointer">
                      <div>{slot.time}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">No available slots on this date</div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
  


export default DoctorSlotChecker;