import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { availableDocslots, slotPayment } from '../../services/user/userApi';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {loadStripe} from '@stripe/stripe-js';
import { date } from 'zod';
import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const DoctorSlotBooking = ({ doctorId }) => {
  const userName=useSelector((state:RootState)=>state.user.userName)
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotsData, setSlotsData] = useState([]);
  const [consultationFee, setConsultationFee] = useState(0);
  
  const navigate=useNavigate()
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

  useEffect(() => {
    const fetchDocData = async (docId) => {
      try {
        const response = await availableDocslots(docId);
        console.log('The response is:', response);

        if (response.status === 201) {
          setConsultationFee(response.data.consultationFee || 0);
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

  
  const handlePayment = async () => {

   

    if (selectedSlot) {
      try {
        const payload = {
          docId:doctorId,
          date: selectedDate,
          amount:consultationFee,
         
          slot: {
            slotId: selectedSlot.id,
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
          },
          
        };
        const stripe=await stripePromise

        let startTime=payload.slot.startTime
        let date=payload.date
        try {
          const payload={
            docId:doctorId,
            date,
            startTime,
            userName
          }
          console.log('payload before sending', payload);
          const response = await slotPayment(payload)
          console.log('the response is ',response);
          if (response?.status >= 400) {
            toast.error(response?.data.message)
            return
        }
        const result = await stripe?.redirectToCheckout({
          sessionId: response?.data.id
      })
      if (result?.error) {
          toast.error('Payment failed')
      }else{
        toast.success('Payament successfull ')
      }
        } catch (error) {
          console.log('eror',error);
          toast.error(error.response.data.message)
        }

      } catch (error) {
        
        console.error('Payment error:',error);
        
      }
    }
  };
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

const filteredSlots =
  selectedDate &&
  slotsData
    .find((slot) => slot.date === selectedDate)
    ?.slots.filter((slot) => slot.isAvailable && !slot.slotHasBooked);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-custom-log shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Book Doctor's Appointment
      </h2>
      <div className="mt-4 text-center">
        <h4 className="text-lg font-semibold">Consultation Fee</h4>
        <p className="text-xl text-blue-600 font-bold">
          ₹{consultationFee}
        </p>
      </div>
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
            min={getTodayDate()}
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
                  className={`p-2 rounded-md text-sm ${slot.isAvailable
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
          className={`px-6 py-3 rounded-md ${selectedSlot
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


