// import React, { useEffect } from 'react';
// import { Calendar, Clock, DollarSign } from 'lucide-react';
// import SideBar from '../../components/user/SideBar'
// import { myBookings } from '../../services/user/userApi';


// const BookingPage = () => {
//   // Dummy booking data

//   useEffect(()=>{
//     const fetchBookingData=async()=>{

//       const response=await myBookings()
//       console.log('the response in the frontend is',response);
      
//     }
//     fetchBookingData()
//   },[])
//   const bookings = [
//     {
//       id: 1,
//       doctorName: "Dr. Sarah Wilson",
//       specialization: "Cardiologist",
//       date: "2025-01-30",
//       time: "09:30 AM",
//       amount: 150,
//       imageUrl: "/api/placeholder/64/64",
//       status: "Completed"
//     },
//     {
//       id: 2,
//       doctorName: "Dr. Michael Chen",
//       specialization: "Dermatologist",
//       date: "2025-01-30",
//       time: "02:15 PM",
//       amount: 125,
//       imageUrl: "/api/placeholder/64/64",
//       status: "Upcoming"
//     },
//     {
//       id: 3,
//       doctorName: "Dr. Emily Brooks",
//       specialization: "Pediatrician",
//       date: "2025-01-29",
//       time: "11:00 AM",
//       amount: 135,
//       imageUrl: "/api/placeholder/64/64",
//       status: "Completed"
//     }
//   ];

//   return (
//     <div className="container mx-auto p-6 max-w-4xl">
//       <SideBar/>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
//         <p className="text-gray-600">View and manage your upcoming and past appointments</p>
//       </div>

//       <div className="space-y-4">
//         {bookings.map((booking) => (
//           <div 
//             key={booking.id} 
//             className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
//           >
//             <div className="p-6">
//               <div className="flex items-start gap-4">
//                 <div className="flex-shrink-0">
//                   <img
//                     src={booking.imageUrl}
//                     alt={booking.doctorName}
//                     className="w-16 h-16 rounded-full object-cover"
//                   />
//                 </div>

//                 <div className="flex-grow">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {booking.doctorName}
//                       </h3>
//                       <p className="text-sm text-gray-600">{booking.specialization}</p>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-sm ${
//                       booking.status === 'Upcoming' 
//                         ? 'bg-blue-100 text-blue-800'
//                         : 'bg-gray-100 text-gray-800'
//                     }`}>
//                       {booking.status}
//                     </span>
//                   </div>

//                   <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="flex items-center text-gray-600">
//                       <Calendar className="w-4 h-4 mr-2" />
//                       <span className="text-sm">
//                         {new Date(booking.date).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Clock className="w-4 h-4 mr-2" />
//                       <span className="text-sm">{booking.time}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <DollarSign className="w-4 h-4 mr-2" />
//                       <span className="text-sm">${booking.amount}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BookingPage;
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import SideBar from '../../components/user/SideBar'
import { myBookings } from '../../services/user/userApi';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await myBookings();
        // Since the actual data is in response.data
        console.log(response,'in the frontend');
        setBookings(response.data.map((booking, index) => ({
          ...booking,
          id: index + 1, // Adding an id since it's needed for the key prop
        })));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookingData();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <SideBar/>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600">View and manage your upcoming and past appointments</p>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div 
            key={booking.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={booking.image || "/api/placeholder/64/64"}
                    alt={booking.doctorName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.doctorName}
                      </h3>
                      <p className="text-sm text-gray-600">{booking.specialization}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === 'Upcoming' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {new Date(booking.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm">${booking.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;