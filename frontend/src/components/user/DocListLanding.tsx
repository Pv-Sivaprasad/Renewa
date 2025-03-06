import React, { useEffect, useState } from 'react';
import { allDocs } from '../../services/user/userApi';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

interface Doctor {
  docId: string;
  docName: string;
  speciality: string;
  experience: number;
  image: string;
}

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {

  const navigate=useNavigate()

  const handleViewDetails = () => {
    const docId=doctor.docId
    const docName=doctor.docName
    navigate('/singledoc',{state:{docId,docName}})
    console.log(`Viewing details for doctor: ${doctor.docId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
      <img
        src={doctor.image || "/api/placeholder/200/200"}
        alt={doctor.docName}
        className="w-32 h-32 rounded-full object-cover mb-4"
      />
      <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.docName}</h3>
      <p className="text-blue-600 font-medium mb-2">{doctor.speciality}</p>
      <p className="text-gray-600 text-center mb-4">{doctor.experience} years experience</p>
      <Button
        variant="contained"
        onClick={handleViewDetails}
        className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-3xl transition-colors duration-200"
      >
        View Details
      </Button>
    </div>
  );
};

const DoctorGrid = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await allDocs();
        setDoctors(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError("Failed to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-lg">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!doctors.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-lg">No doctors available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.docId} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorGrid;
