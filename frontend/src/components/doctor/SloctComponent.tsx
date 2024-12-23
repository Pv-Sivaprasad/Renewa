import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { slotSelecting, filledSlots, updateBookedSlots } from '../../services/doctor/doctorApi';
import Swal from 'sweetalert2';

const SlotManagement = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]); 
  const [selectedSlots, setSelectedSlots] = useState([]); 
  const [existingSlots, setExistingSlots] = useState([]); 
  const [isEditing, setIsEditing] = useState(false); // New State for edit mode

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;

    let receivedSlots = await filledSlots(date);
    setSelectedDate(date);
    generateSlots(date); 
    setExistingSlots(receivedSlots.data || []); 
    setIsEditing(false); // Reset editing mode
  };

  const toggleSlotSelection = (index) => {
    const updatedSlots = [...availableSlots];
    const slot = updatedSlots[index];
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

  const confirmSlots = async () => {
    if (!selectedDate) {
      toast.error('Please select a date!');
      return;
    }

    const payload = {
      date: selectedDate,
      slots: selectedSlots,
    };

    try {
      const response = isEditing
        ? await updateBookedSlots(payload) // Call the new update API when editing
        : await slotSelecting(payload);

      toast.success(
        isEditing ? 'Slots updated successfully' : 'Slots selected successfully'
      );

      const updatedSlots = await filledSlots(selectedDate);
      setExistingSlots(updatedSlots.data || []);
      setIsEditing(false);
    } catch (error) {
      toast.error('An error occurred while processing slots.');
    }
  };

  const isSlotFilled = (slot) => {
    return existingSlots.some(
      (existingSlot) =>
        existingSlot.startTime === slot.startTime &&
        existingSlot.endTime === slot.endTime
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Mark existing slots as selected
    const updatedSlots = availableSlots.map((slot) => ({
      ...slot,
      isSelected: isSlotFilled(slot),
    }));
    setAvailableSlots(updatedSlots);
    setSelectedSlots(existingSlots);
  };

  useEffect(() => {
    if (selectedDate) {
      const fetchSlots = async () => {
        let receivedSlots = await filledSlots(selectedDate);
        setExistingSlots(receivedSlots.data || []);
      };
      fetchSlots();
    }
  }, [selectedDate]);

  return (
    <div className="p-6 bg-custom-reg min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Manage Your Available Slots
        </h2>

        <label htmlFor="date" className="block text-gray-600 font-medium mb-2">
          Select a Date
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={getTodayDate()}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
        />

        {availableSlots.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              {isEditing ? 'Edit Slots' : 'Available Slots'}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${
                    slot.isSelected
                      ? 'bg-blue-500 text-white border-blue-700'
                      : isSlotFilled(slot)
                      ? 'bg-red-500 text-white border-red-700'
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

            {existingSlots.length > 0 && !isEditing && (
              <button
                className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600"
                onClick={handleEdit}
              >
                Edit Slots
              </button>
            )}

            <button
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600"
              onClick={confirmSlots}
            >
              {isEditing ? 'Update Slots' : 'Confirm Slots'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SlotManagement;


// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { slotSelecting, filledSlots } from '../../services/doctor/doctorApi';
// import Swal from 'sweetalert2';

// const SlotManagement = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [availableSlots, setAvailableSlots] = useState([]); 
//   const [selectedSlots, setSelectedSlots] = useState([]); 
//   const [existingSlots, setExistingSlots] = useState([]); 

//   const getTodayDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const generateSlots = (date) => {
//     const slots = [];
//     const startHour = 9;
//     const endHour = 18;
//     for (let hour = startHour; hour < endHour; hour++) {
//       slots.push({
//         startTime: `${hour}:00`,
//         endTime: `${hour + 1}:00`,
//         isSelected: false,
//       });
//     }
//     setAvailableSlots(slots);
//     setSelectedSlots([]);
//   };

//   const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const date = e.target.value;
//     console.log('the date selected is ', date);

   
//     let recievedSlots = await filledSlots(date);
//     console.log('reciedSlots are', recievedSlots);

   
//     setSelectedDate(date);
//     generateSlots(date); 
//     setExistingSlots(recievedSlots.data || []); 
//   };

//   const toggleSlotSelection = (index) => {
//     const updatedSlots = [...availableSlots];
//     const slot = updatedSlots[index];
    
//     if (isSlotFilled(slot) && !slot.isSelected) {
//       return;
//     }

//     updatedSlots[index].isSelected = !updatedSlots[index].isSelected;
//     setAvailableSlots(updatedSlots);

//     if (updatedSlots[index].isSelected) {
//       setSelectedSlots((prev) => [...prev, updatedSlots[index]]);
//     } else {
//       setSelectedSlots((prev) =>
//         prev.filter((slot) => slot.startTime !== updatedSlots[index].startTime)
//       );
//     }
//   };

//   const confirmSlots = async () => {
//     const confirmation = await Swal.fire({
//       title: "Slot Selection",
//       text: selectedSlots.length === 0 ? "Are you sure you want to update the slots?" : "Are you sure about the dates that have been selected?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Proceed",
//       cancelButtonText: "Cancel",
//     });

//     if (!confirmation.isConfirmed) {
//       return;
//     }

//     if (!selectedDate) {
//       toast.error('Please select a date!');
//       return;
//     }

//     const payload = {
//       date: selectedDate,
//       slots: selectedSlots,
//     };

//     try {
      
//       const response = await slotSelecting(payload);
//       console.log('the response is ',response);
//       toast.success('Slot selected successfully');
      
      
//       const updatedSlots = await filledSlots(selectedDate);
//       setExistingSlots(updatedSlots.data || []);
      
    
//       setAvailableSlots((prevSlots) =>
//         prevSlots.map((slot) => ({
//           ...slot,
//           isSelected: updatedSlots.data.some(
//             (existingSlot) =>
//               existingSlot.startTime === slot.startTime &&
//               existingSlot.endTime === slot.endTime
//           ),
//         }))
//       );
//     } catch (error) {
//       toast.error('An error occurred while selecting slots.');
//     }
//   };

//   const isSlotFilled = (slot) => {
//     return existingSlots.some(
//       (existingSlot) =>
//         existingSlot.startTime === slot.startTime && existingSlot.endTime === slot.endTime
//     );
//   };

//   useEffect(() => {
//     if (selectedDate) {
   
//       const fetchSlots = async () => {
//         let recievedSlots = await filledSlots(selectedDate);
//         setExistingSlots(recievedSlots.data || []);
//       };
//       fetchSlots();
//     }
//   }, [selectedDate]);

//   return (
//     <div className="p-6 bg-custom-reg min-h-screen">
//       <div className="max-w-3xl mx-auto bg-white rounded shadow-md p-6">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//           Manage Your Available Slots
//         </h2>

//         <label htmlFor="date" className="block text-gray-600 font-medium mb-2">
//           Select a Date
//         </label>
//         <input
//           type="date"
//           id="date"
//           value={selectedDate}
//           onChange={handleDateChange}
//           min={getTodayDate()} 
//           className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
//         />

      
//         {availableSlots.length > 0 && (
//           <>
//             <h3 className="text-lg font-semibold mb-2 text-gray-700">Available Slots</h3>
//             <div className="grid grid-cols-3 gap-4">
//               {availableSlots.map((slot, index) => (
//                 <div
//                   key={index}
//                   className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${
//                     isSlotFilled(slot)
//                       ? 'border-red-500' 
//                       : slot.isSelected
//                       ? 'bg-blue-500 text-white border-blue-700'
//                       : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border-green-400'
//                   }`}
//                   onClick={() => !isSlotFilled(slot) && toggleSlotSelection(index)} 
//                 >
//                   <p className="font-medium">
//                     {slot.startTime} - {slot.endTime}
//                   </p>
//                 </div>
//               ))}
//             </div>

          
//             <button
//               className="mt-6 w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition-colors"
//               onClick={confirmSlots}
//               disabled={selectedSlots.length === 0}
//             >
//               {existingSlots.length > 0 ? "Update Slots" : "Confirm Slots"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SlotManagement;
