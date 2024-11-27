import React, { useEffect, useState } from "react";
import { UserCircle, Stethoscope, CalendarPlus } from "lucide-react";

import { allDoctors } from "../../services/user/userApi";

// Define Doctor interface
interface Doctor {
  docId: string;
  docName: string;
  speciality: string;
  experience: number;
  image: string;
}

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocData = async () => {
      try {
        const response = await allDoctors();
        setDoctors(response.data); // Map data from backend
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDocData();
  }, []);

  const handleBookAppointment = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    alert(`Booking appointment with Doctor ID: ${doctorId}`);
  };

  return (
    <div className="container mx-auto p-6 bg-custom-teal">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        Our Medical Experts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
        {doctors.map((doctor) => (
          <div
            key={doctor.docId}
            className="bg-custom-doc shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.docName}
                    className="w-24 h-24 rounded-full object-cover mr-4"
                  />
                ) : (
                  <UserCircle className="w-24 h-24 text-gray-300 mr-4" />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {doctor.docName}
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <Stethoscope className="w-5 text-white h-5 mr-2" />
                    <span >{doctor.speciality}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Experience: {doctor.experience} years
                </div>
                <button
                  onClick={() => handleBookAppointment(doctor.docId)}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  <CalendarPlus className="w-5 h-5 mr-2" />
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;



// import React, { useEffect, useState } from "react";
// import { UserCircle, Stethoscope, CalendarPlus } from "lucide-react";

// import { allDoctors } from "../../services/user/userApi";

// // Define Doctor interface
// interface Doctor {
//   id: number;
//   name: string;
//   specialty: string;
//   experience: number;
//   imageUrl?: string;
// }

// const DoctorList: React.FC = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchDocData = async () => {
//       try {
//         const response = await allDoctors();
//         console.log(response,'the data from the backend of doctors');
        
//         setDoctors(response.data); // Assuming `response.data` contains the array of doctors
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };

//     fetchDocData();
//   }, []);

//   const handleBookAppointment = (doctorId: number) => {
//     setSelectedDoctor(doctorId);
//     alert(`Booking appointment with Doctor ID: ${doctorId}`);
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-50">
//       <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
//         Our Medical Experts
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {doctors.map((doctor) => (
//           <div
//             key={doctor.id}
//             className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
//           >
//             <div className="p-6">
//               <div className="flex items-center mb-4">
//                 {doctor.imageUrl ? (
//                   <img
//                     src={doctor.imageUrl}
//                     alt={doctor.name}
//                     className="w-24 h-24 rounded-full object-cover mr-4"
//                   />
//                 ) : (
//                   <UserCircle className="w-24 h-24 text-gray-300 mr-4" />
//                 )}
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {doctor.name}
//                   </h3>
//                   <div className="flex items-center text-gray-600">
//                     <Stethoscope className="w-5 h-5 mr-2" />
//                     <span>{doctor.specialty}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center mt-4">
//                 <div className="text-sm text-gray-500">
//                   Experience: {doctor.experience} years
//                 </div>
//                 <button
//                   onClick={() => handleBookAppointment(doctor.id)}
//                   className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   <CalendarPlus className="w-5 h-5 mr-2" />
//                   Book Appointment
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorList;

