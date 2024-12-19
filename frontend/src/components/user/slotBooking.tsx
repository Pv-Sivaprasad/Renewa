import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { availableDocslots, slotPayment } from '../../services/user/userApi';
import axios from 'axios'; 

const DoctorSlotBooking = ({ doctorId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotsData, setSlotsData] = useState([]);


  
  useEffect(() => {
    const fetchDocData = async (docId) => {
      try {
        const response = await availableDocslots(docId);
        console.log('The response is:', response);
  
        if (response.status === 201) {
          
          const formattedSlots = response.data.dates.map((dateObj) => ({
            date: dateObj.date, 
            slots: dateObj.slots.map((slot) => ({
              id: slot._id, 
              startTime: slot.startTime,
              endTime: slot.endTime,
              isAvailable: slot.isAvailable,
            })),
          }));
  
          setSlotsData(formattedSlots);
        } else {
          console.error('Error fetching doctor slots:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching doctor slots:', error);
      }
    };
  
    fetchDocData(doctorId);
  }, [doctorId]);
  
  
  const handleDateSelect = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setSelectedSlot(null);
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    if (slot.isAvailable) {
      setSelectedSlot(slot);
    }
  };

  // Send selected slot data to backend for payment
  const handlePayment = async () => {
    if (selectedSlot) {
      try {
        const payload = {
          doctorId,
          date: selectedDate,
          slot: {
            slotId: selectedSlot.id, 
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
          },
        };
        console.log('payload before sending',payload);
        
        const response = await slotPayment(payload)

        if (response.status === 200) {
          console.log('Payment initiated successfully:', response.data);
          alert('Payment initiated. Redirecting...');
          // Optionally redirect the user to a payment gateway or confirmation page
        } else {
          console.error('Error initiating payment:', response.statusText);
        }
      } catch (error) {
        console.error('Payment error:', error.message);
      }
    }
  };

  // Get slots for the selected date
  const filteredSlots =
    selectedDate &&
    slotsData.find((slot) => slot.date === selectedDate)?.slots;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Book Doctor's Appointment
      </h2>

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

          {filteredSlots ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotSelect(slot)}
                  disabled={!slot.isAvailable}
                  className={`p-2 rounded-md text-sm ${
                    slot.isAvailable
                      ? selectedSlot === slot
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-100 hover:bg-blue-200'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {slot.startTime} - {slot.endTime}
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
          onClick={handlePayment}
          disabled={!selectedSlot}
          className={`px-6 py-3 rounded-md ${
            selectedSlot
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default DoctorSlotBooking;


