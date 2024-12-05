import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

// Dummy data - in real app, this would come from backend
const mockSlots = {
  '2024-12-10': [
    { time: '09:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '02:00 PM', available: false },
    { time: '04:15 PM', available: true }
  ],
  '2024-12-11': [
    { time: '10:00 AM', available: true },
    { time: '11:30 AM', available: true },
    { time: '03:00 PM', available: true },
    { time: '05:15 PM', available: false }
  ]
};

const DoctorSlotBooking = ({ doctorId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);


    useEffect(()=>{
        // const response=await availableDocslots()
    })



  // Function to handle date selection
  const handleDateSelect = (date) => {
    // Format date to match our mockSlots key format
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setSelectedSlot(null);
  };

  // Function to handle slot selection
  const handleSlotSelect = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  // Function to book slot (mock implementation)
  const bookSlot = () => {
    if (selectedSlot) {
      alert(`Booking slot ${selectedSlot.time} on ${selectedDate} for doctor ${doctorId}`);
      // In real app, you'd call backend API here
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Book Doctor's Appointment</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <Calendar className="mr-2 text-blue-600" />
            <h3 className="text-lg font-semibold">Select Date</h3>
          </div>
          
          <input 
            type="date" 
            className="w-full p-2 border rounded-md"
            onChange={(e) => handleDateSelect(new Date(e.target.value))}
          />
        </div>

        {/* Slots Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {selectedDate 
              ? `Available Slots for ${selectedDate}` 
              : 'Select a Date to View Slots'}
          </h3>
          
          {selectedDate && mockSlots[selectedDate] ? (
            <div className="grid grid-cols-2 gap-3">
              {mockSlots[selectedDate].map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotSelect(slot)}
                  disabled={!slot.available}
                  className={`p-2 rounded-md text-sm ${
                    slot.available 
                      ? (selectedSlot === slot 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-100 hover:bg-blue-200') 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No slots available</p>
          )}
        </div>
      </div>

      {/* Book Appointment Button */}
      <div className="mt-6 text-center">
        <button 
          onClick={bookSlot}
          disabled={!selectedSlot}
          className={`px-6 py-3 rounded-md ${
            selectedSlot 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorSlotBooking;