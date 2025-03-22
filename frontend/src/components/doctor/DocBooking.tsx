import React, { useState, useEffect } from 'react';
import Layout from './Header';
import { allAppoinments } from '../../services/doctor/doctorApi';
import { useNavigate } from 'react-router';

const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await allAppoinments();
        console.log('response', response);
        
       
    
        const processedAppointments = response.data.bookings.map((booking, index) => {
         
          const formattedTime = booking.startTime.padStart(5, '0'); 
        
          
          const appointmentDate = new Date(`${booking.date}T${formattedTime}:00`);
        
          const currentDate = new Date();
          
         
          const timeDifference = (appointmentDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
        
          let status = 'upcoming';
          
          if (timeDifference < -1) {
            status = 'completed';
          } else if (timeDifference >= -1 && timeDifference <= 1) {
            status = 'ongoing';
          }
        
          // console.log('Appointment Date:', appointmentDate);
          // console.log('Current Date:', currentDate);
        
          return {
            id: index + 1,
            userId:booking.userId,
            username: booking.userName,
            startTime: booking.startTime,
            date: booking.date,
            status: status,
          };
        });
        
        
        
        setAppointments(processedAppointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();

    const intervalId = setInterval(fetchAppointments, 60000); 
    
    return () => clearInterval(intervalId);
  }, []);


  const filteredAppointments = appointments.filter(
    appointment => appointment.status === activeTab
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined);
  };

  const handleChatClick=(userName,userId)=>{
    navigate(`/doctor/chat/${userId}`,{state:{userName,userId}})
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Doctor's Appointments</h2>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`px-6 py-3 font-medium transition-colors duration-200 ${
            activeTab === 'ongoing'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
          }`}
          onClick={() => handleTabChange('ongoing')}
        >
          Ongoing
        </button>
        <button 
          className={`px-6 py-3 font-medium transition-colors duration-200 ${
            activeTab === 'upcoming'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
          }`}
          onClick={() => handleTabChange('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`px-6 py-3 font-medium transition-colors duration-200 ${
            activeTab === 'completed'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
          }`}
          onClick={() => handleTabChange('completed')}
        >
          Completed
        </button>
      </div>
      
      {/* Appointments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500 italic">Loading appointments...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 italic">No {activeTab} appointments found.</div>
        ) : (
          filteredAppointments.map(appointment => (
            <div 
              key={appointment.id} 
              className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <h3 className="font-medium text-gray-800 mb-1">{appointment.username}</h3>
                <p className="text-sm text-gray-600">
                  <span className="mr-3">{formatDate(appointment.date)}</span>
                  <span className="font-medium">{appointment.startTime}</span>
                </p>
              </div>
              <div>
                {appointment.status === 'ongoing' && (
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors duration-200"
                     onClick={() => handleChatClick(appointment.username, appointment.userId)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Chat Now
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentDashboard;



// import React, { useState, useEffect } from 'react';
// import Layout from './Header';
// import { allAppoinments } from '../../services/doctor/doctorApi';
// const AppointmentDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [activeTab, setActiveTab] = useState('ongoing');
//   const [loading, setLoading] = useState(true);

 
//   useEffect(() => {
   
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
       
//         const response=await allAppoinments()
//         console.log('response',response);
        
        
        
//         const dummyData = [
//           { id: 1, username: "John Smith", startTime: "14:30", date: "2025-03-18", status: "ongoing" },
//           { id: 2, username: "Emily Johnson", startTime: "15:00", date: "2025-03-18", status: "ongoing" },
//           { id: 3, username: "Robert Davis", startTime: "16:15", date: "2025-03-18", status: "upcoming" },
//           { id: 4, username: "Sarah Wilson", startTime: "09:30", date: "2025-03-19", status: "upcoming" },
//           { id: 5, username: "Michael Brown", startTime: "11:00", date: "2025-03-19", status: "upcoming" },
//           { id: 6, username: "Jessica Lee", startTime: "10:15", date: "2025-03-17", status: "completed" },
//           { id: 7, username: "David Miller", startTime: "13:45", date: "2025-03-17", status: "completed" },
//           { id: 8, username: "Jennifer Clark", startTime: "16:30", date: "2025-03-16", status: "completed" },
//         ];
        
       
//         setAppointments(dummyData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//         setLoading(false);
//       }
//     };

//     fetchAppointments();

   
//     const intervalId = setInterval(fetchAppointments, 60000); 
    
//     return () => clearInterval(intervalId);
//   }, []);

  
//   const filteredAppointments = appointments.filter(
//     appointment => appointment.status === activeTab
//   );

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };


// const formatDate = (dateString: string): string => {
//     const options: Intl.DateTimeFormatOptions = { 
//       weekday: 'short' as const, 
//       year: 'numeric' as const, 
//       month: 'short' as const, 
//       day: 'numeric' as const 
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Doctor's Appointments</h2>
      
//       {/* Tab Navigation */}
//       <div className="flex border-b border-gray-200 mb-6">
//         <button 
//           className={`px-6 py-3 font-medium transition-colors duration-200 ${
//             activeTab === 'ongoing'
//               ? 'text-blue-500 border-b-2 border-blue-500'
//               : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
//           }`}
//           onClick={() => handleTabChange('ongoing')}
//         >
//           Ongoing
//         </button>
//         <button 
//           className={`px-6 py-3 font-medium transition-colors duration-200 ${
//             activeTab === 'upcoming'
//               ? 'text-blue-500 border-b-2 border-blue-500'
//               : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
//           }`}
//           onClick={() => handleTabChange('upcoming')}
//         >
//           Upcoming
//         </button>
//         <button 
//           className={`px-6 py-3 font-medium transition-colors duration-200 ${
//             activeTab === 'completed'
//               ? 'text-blue-500 border-b-2 border-blue-500'
//               : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
//           }`}
//           onClick={() => handleTabChange('completed')}
//         >
//           Completed
//         </button>
//       </div>
      
//       {/* Appointments List */}
//       <div className="space-y-4">
//         {loading ? (
//           <div className="text-center py-8 text-gray-500 italic">Loading appointments...</div>
//         ) : filteredAppointments.length === 0 ? (
//           <div className="text-center py-8 text-gray-500 italic">No {activeTab} appointments found.</div>
//         ) : (
//           filteredAppointments.map(appointment => (
//             <div 
//               key={appointment.id} 
//               className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-shadow duration-200"
//             >
//               <div>
//                 <h3 className="font-medium text-gray-800 mb-1">{appointment.username}</h3>
//                 <p className="text-sm text-gray-600">
//                   <span className="mr-3">{formatDate(appointment.date)}</span>
//                   <span className="font-medium">{appointment.startTime}</span>
//                 </p>
//               </div>
//               <div>
//                 {appointment.status === 'ongoing' && (
//                   <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors duration-200">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                     </svg>
//                     Chat Now
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AppointmentDashboard;