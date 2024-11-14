
import React, { useEffect, useState } from 'react';
import { Home, User, Settings, LogOut, Pencil, Save, X } from 'lucide-react';
import {getProfile} from '../../services/doctor/doctorApi'


// Main Profile Component
const DoctorProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    speciality: "",
    experience: "",
    image: ""
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile(profile);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempProfile(profile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(()=>{
    const fetchDocData=async()=>{
        try {
            const response=await getProfile()
            console.log(response.data,'responsedata');
            setProfile(response.data); // Set the state with the fetched data
        setTempProfile(response.data)
            
        } catch (error) {
            console.log('error in fetching data');
            
        }
    }
    fetchDocData()
  },[])


  return (
    <div className="min-h-screen bg-blue-200">
   
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-2xl mx-auto bg-custom-teal rounded-lg shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Doctor Profile</h1>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors"
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={profile.image}
                  alt="Doctor profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
                />
                {isEditing && (
                  <button className="text-sm text-blue-500 hover:text-blue-600">
                    Change Photo
                  </button>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={tempProfile.username}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Email (Non-editable)
                  </label>
                  <p className="text-gray-800">{profile.email}</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Specialty
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="specialty"
                      value={tempProfile.speciality}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.speciality}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Experience
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="experience"
                      value={tempProfile.experience}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.experience}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorProfilePage;