import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { slotSelecting } from '../../services/doctor/doctorApi';

const SlotManagement = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]); // Array of time slots
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Generate today's date in the format YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Generate a list of 1-hour slots for the day (9 AM to 5 PM)
  const generateSlots = (date) => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        startTime: `${hour}:00`,
        endTime: `${hour + 1}:00`,
        isSelected: false,
      });
    }
    setAvailableSlots(slots);
    setSelectedSlots([]);
  };

  // Handle date change
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    generateSlots(date);
  };

  // Toggle slot selection
  const toggleSlotSelection = (index) => {
    const updatedSlots = [...availableSlots];
    updatedSlots[index].isSelected = !updatedSlots[index].isSelected;
    setAvailableSlots(updatedSlots);

    if (updatedSlots[index].isSelected) {
      setSelectedSlots((prev) => [...prev, updatedSlots[index]]);
    } else {
      setSelectedSlots((prev) =>
        prev.filter((slot) => slot.startTime !== updatedSlots[index].startTime)
      );
    }
  };

  // Confirm selected slots
  const confirmSlots = async() => {
    console.log('Selected Slots:', selectedSlots);
    const response=await slotSelecting(selectedSlots)
    toast.success('slot selected')
  };

  return (
    <div className="p-6 bg-custom-reg min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Manage Your Available Slots
        </h2>

        {/* Date Picker */}
        <label htmlFor="date" className="block text-gray-600 font-medium mb-2">
          Select a Date
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={getTodayDate()} // Restrict dates to today onwards
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Slots Display */}
        {availableSlots.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Available Slots
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${
                    slot.isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  onClick={() => toggleSlotSelection(index)}
                >
                  <p className="font-medium">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              ))}
            </div>

            {/* Confirm Button */}
            <button
              className="mt-6 w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition-colors"
              onClick={confirmSlots}
              disabled={selectedSlots.length === 0}
            >
              Confirm Slots
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SlotManagement;
