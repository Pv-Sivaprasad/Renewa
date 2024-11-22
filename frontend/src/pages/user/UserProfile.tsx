import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Edit2, Save, Image as ImageIcon } from 'lucide-react';
import UserHeader from '../../components/user/UserHeader';
import { getProfile,updateProfile } from '../../services/user/userApi';
import { toast } from 'react-toastify';
import Sidebar from '../../components/user/SideBar'
import { useFormik } from 'formik';
import { profileValidationSchema } from '../../utils/validations';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
        const data = await getProfile();
        console.log(data, 'the data is');

        const response = {
          username: data.data.username ,
          email: data.data.email ,
          mobile: data.data.mobile ,
          profilePic: data.data.profilePic || null,
          address: {
            address: data.data.address?.address,
            city: data.data.address?.city ,
            state: data.data.address?.state ,
            pincode: data.data.address?.pincode,
            nationality: data.data.address?.nationality,
            landmark: data.data.address?.landmark ,
          },
        };
        setUserData(response);
        setEditedData(response);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
   

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate save delay
      setUserData(editedData);
      console.log('editied data',editedData);
     
      let response=await updateProfile(editedData)
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response.message || 'Error in updatin profile');
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedData((prev) => ({
          ...prev,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-teal py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      {/* <UserHeader /> */}
      <Sidebar/>
      <div className="max-w-5xl mx-auto bg-blue-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col items-center space-y-4 p-6 border-b border-gray-100">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
              {editedData.profilePic ? (
                <img
                  src={editedData.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={48} className="text-gray-400" />
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
                <ImageIcon className="h-5 w-5 text-gray-500" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleProfilePicChange}
                  accept="image/*"
                />
              </label>
            )}
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              className="text-xl font-semibold text-center max-w-[200px] border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-900">{userData.username}</h2>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center p-3 rounded-2xl bg-gray-50 transition-colors duration-200">
              <Mail className="h-5 w-5 text-blue-500 mr-3" />
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base text-gray-900">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center p-3 rounded-2xl hover:bg-sky-50 transition-colors duration-200">
              <Phone className="h-5 w-5 text-blue-500 mr-3" />
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-500">Mobile</p>
                {isEditing ? (
                  <input
                    type="text"
                    placeholder='Enter your mobile number'
                    value={editedData.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-base text-gray-900">{userData.mobile}</p>
                )}
              </div>
            </div>

            {['address', 'city', 'state', 'pincode', 'nationality', 'landmark'].map((field) => (
              <div key={field} className="flex items-center p-3 rounded-2xl hover:bg-sky-50 transition-colors duration-200">
                <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-500">{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                  {isEditing ? (
                    <input
                      type="text"
                      placeholder='Enter your Address'
                      value={editedData.address[field]}
                      onChange={(e) => handleAddressChange(field, e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-base text-gray-900">{userData.address[field]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-6">
            {isEditing ? (
              <button
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-6 py-2 bg-sky-100 text-blue-600 rounded-2xl hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
