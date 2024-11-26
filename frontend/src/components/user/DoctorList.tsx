import React, { useState } from 'react';
import { UserCircle, Stethoscope, CalendarPlus } from 'lucide-react';

// Define Doctor interface
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  imageUrl?: string;
}

// Sample doctors data
const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Emily Rodriguez",
    specialty: "Cardiology",
    experience: 15,
    imageUrl: "/api/placeholder/150/150"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    experience: 12,
    imageUrl: "/api/placeholder/150/150"
  },
  {
    id: 3,
    name: "Dr. Sarah Thompson",
    specialty: "Pediatrics",
    experience: 10,
    imageUrl: "/api/placeholder/150/150"
  }
];

const DoctorList: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  const handleBookAppointment = (doctorId: number) => {
    setSelectedDoctor(doctorId);
    // In a real app, this would open a booking modal or navigate to a booking page
    alert(`Booking appointment with Doctor ID: ${doctorId}`);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Our Medical Experts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctorsData.map((doctor) => (
          <div 
            key={doctor.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                {doctor.imageUrl ? (
                  <img 
                    src={doctor.imageUrl} 
                    alt={doctor.name} 
                    className="w-24 h-24 rounded-full object-cover mr-4"
                  />
                ) : (
                  <UserCircle className="w-24 h-24 text-gray-300 mr-4" />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                  <div className="flex items-center text-gray-600">
                    <Stethoscope className="w-5 h-5 mr-2" />
                    <span>{doctor.specialty}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Experience: {doctor.experience} years
                </div>
                <button 
                  onClick={() => handleBookAppointment(doctor.id)}
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