import React from 'react';
import { Camera } from 'lucide-react';

const DoctorsList = ({ doctors }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Our Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div 
            key={doctor.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="relative h-48 w-full">
              {doctor.image ? (
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <Camera className="text-gray-500" size={48} />
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-600">Speciality:</span>
                <span className="ml-2 text-gray-800">{doctor.speciality}</span>
              </div>
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-600">Experience:</span>
                <span className="ml-2 text-gray-800">{doctor.experience} years</span>
              </div>
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-600">Rate:</span>
                <span className="ml-2 text-green-600 font-bold">${doctor.rate}/hr</span>
              </div>
              <button 
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => {/* Implement booking logic */}}
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;

// Example usage:
const exampleDoctors = [
  {
    id: 1,
    name: "Dr. John Smith",
    speciality: "Cardiology",
    experience: 15,
    rate: 250,
    image: "/path/to/doctor-image.jpg"
  },
  {
    id: 2,
    name: "Dr. Emily Johnson",
    speciality: "Pediatrics",
    experience: 10,
    rate: 200,
    image: null // Will show camera icon
  }
  // Add more doctors as needed
];