import React, { useEffect, useState } from "react";
import { UserCircle, Stethoscope, CalendarPlus } from "lucide-react";

import { allDoctors } from "../../services/user/userApi";
import { useNavigate } from "react-router";

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
  const navigate=useNavigate()

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
    console.log(`Booking appointment with Doctor ID: ${doctorId}`);
    navigate('/doctorslot')
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

