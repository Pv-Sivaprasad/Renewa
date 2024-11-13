import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Edit2, Save, Sidebar, Image as ImageIcon } from 'lucide-react';
import UserHeader from '../../components/user/UserHeader';
import { editProfile } from '../../services/user/userApi';


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        const data=await editProfile()
        const response = {
          username: "johndoe",
          email: "john.doe@example.com",
          mobile: "+1 234 567 8900",
          address: {
            city: "City",
            state: "State",
            pincode: "123456",
            address: "123 Main St",
            nationality: "Country"
          },
          profilePic: null
        };
        setUserData(response);
        setEditedData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate save delay
      setUserData(editedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedData(prev => ({
          ...prev,
          profilePic: reader.result
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
    <div className="min-h-screen bg-blue-200 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <UserHeader/>
      {/* <Sidebar /> */}
      <div className="max-w-5xl mx-auto bg-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        
        {/* Header Section */}
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
        
        {/* Content Section */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Email Field - Non-editable */}
            <div className="flex items-center p-3 rounded-2xl bg-gray-50 transition-colors duration-200">
              <Mail className="h-5 w-5 text-blue-500 mr-3" />
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base text-gray-900">{userData.email}</p>
              </div>
            </div>

            {/* Address Fields */}
            {["city", "state", "pincode", "address", "nationality"].map((field) => (
              <div key={field} className="flex items-center p-3 rounded-2xl hover:bg-sky-50 transition-colors duration-200">
                <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-500">{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                  {isEditing ? (
                    <input
                      type="text"
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

          {/* Action Button */}
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



// import React, { useState, useEffect } from 'react';
// import { User, Phone, Mail, MapPin, Edit2, Save, Sidebar, Image as ImageIcon } from 'lucide-react';

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         const response = {
//           username: "johndoe",
//           email: "john.doe@example.com",
//           mobile: "+1 234 567 8900",
//           address: "123 Main St, City, Country",
//           profilePic: null
//         };
//         setUserData(response);
//         setEditedData(response);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const defaultData = {
//     username: "User",
//     email: "Not provided",
//     mobile: "Not provided",
//     address: "Not provided",
//     profilePic: null
//   };

//   const data = userData || defaultData;

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {

//         const response=await 

//       await new Promise(resolve => setTimeout(resolve, 1000));
//       console.log('the form edited data is ',editedData);
      
//       setUserData(editedData);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (field, value) => {
//     setEditedData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setEditedData(prev => ({
//           ...prev,
//           profilePic: reader.result
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-sky-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-sky-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
//       <Sidebar />
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        
//         {/* Header Section */}
//         <div className="flex flex-col items-center space-y-4 p-6 border-b border-gray-100">
//           <div className="relative">
//             <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
//               {editedData.profilePic ? (
//                 <img
//                   src={editedData.profilePic}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <User size={48} className="text-gray-400" />
//               )}
//             </div>
//             {isEditing && (
//               <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
//                 <ImageIcon className="h-5 w-5 text-gray-500" />
//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={handleProfilePicChange}
//                   accept="image/*"
//                 />
//               </label>
//             )}
//           </div>
//           {isEditing ? (
//             <input
//               type="text"
//               value={editedData.username}
//               onChange={(e) => handleChange('username', e.target.value)}
//               className="text-xl font-semibold text-center max-w-[200px] border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           ) : (
//             <h2 className="text-2xl font-bold text-gray-900">{data.username}</h2>
//           )}
//         </div>
        
//         {/* Content Section */}
//         <div className="p-6 space-y-6">
//           <div className="space-y-4">
            
//             {/* Email Field - Non-editable */}
//             <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 rounded-lg bg-gray-50 transition-colors duration-200">
//               <Mail className="h-5 w-5 text-blue-500" />
//               <div className="flex-grow">
//                 <p className="text-sm font-medium text-gray-500">Email</p>
//                 <p className="text-base text-gray-900">{data.email}</p>
//               </div>
//             </div>

//             {/* Mobile Field */}
//             <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 rounded-lg hover:bg-sky-50 transition-colors duration-200">
//               <Phone className="h-5 w-5 text-blue-500" />
//               <div className="flex-grow">
//                 <p className="text-sm font-medium text-gray-500">Mobile</p>
//                 {isEditing ? (
//                   <input
//                     type="tel"
//                     value={editedData.mobile}
//                     onChange={(e) => handleChange('mobile', e.target.value)}
//                     className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 ) : (
//                   <p className="text-base text-gray-900">{data.mobile}</p>
//                 )}
//               </div>
//             </div>

//             {/* Address Field */}
//             <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 rounded-lg hover:bg-sky-50 transition-colors duration-200">
//               <MapPin className="h-5 w-5 text-blue-500" />
//               <div className="flex-grow">
//                 <p className="text-sm font-medium text-gray-500">Address</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={editedData.address}
//                     onChange={(e) => handleChange('address', e.target.value)}
//                     className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 ) : (
//                   <p className="text-base text-gray-900">{data.address}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Action Button */}
//           <div className="flex justify-center pt-6">
//             {isEditing ? (
//               <button
//                 onClick={handleSubmit}
//                 className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
//               >
//                 <Save className="h-4 w-4" />
//                 <span>Save Changes</span>
//               </button>
//             ) : (
//               <button
//                 onClick={handleEdit}
//                 className="flex items-center space-x-2 px-6 py-2 bg-sky-100 text-blue-600 rounded-lg hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
//               >
//                 <Edit2 className="h-4 w-4" />
//                 <span>Edit Profile</span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
