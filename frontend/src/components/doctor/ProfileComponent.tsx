import React, { useEffect, useState } from 'react';
import { Pencil, Save, X } from 'lucide-react';
import { getProfile, editProfile } from '../../services/doctor/doctorApi';
import { useDispatch } from 'react-redux';
import { setDoctor } from '../../redux/slices/doctorSlice';
import { validateDocExperience,validateDocUsername } from '../../utils/validations';

const DoctorProfilePage = () => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    speciality: '',
    experience: '',
    image: '',
  });
  const [tempProfile, setTempProfile] = useState(profile);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({ username: '', experience: '' });

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile(profile);
    setSelectedImage(null); // Reset the selected image on each edit
  };

  const handleSave = async () => {
    const usernameError = validateDocUsername(tempProfile.username);
    const experienceError = validateDocExperience(tempProfile.experience);

    if (usernameError || experienceError) {
      setErrors({ username: usernameError, experience: experienceError });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', tempProfile.username);
      formData.append('speciality', tempProfile.speciality);
      formData.append('experience', tempProfile.experience);

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await editProfile(formData);
      console.log('Profile updated:', response);

      dispatch(setDoctor(response.data.username));
      setProfile({
        ...tempProfile,
        image: response.data.image || profile.image,
      });

      setSelectedImage(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempProfile(profile);
    setSelectedImage(null);
    setErrors({ username: '', experience: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setTempProfile((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  useEffect(() => {
    const fetchDocData = async () => {
      try {
        const response = await getProfile();
        console.log('Fetched profile data:', response.data);
        setProfile(response.data);
        setTempProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchDocData();
  }, []);

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
                  src={selectedImage ? URL.createObjectURL(selectedImage) : profile.image}
                  alt="Doctor profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
                />
                {isEditing && (
                  <label className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    Change Photo
                  </label>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Username</label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="username"
                        value={tempProfile.username}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-800">{profile.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-800">{profile.email}</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Specialty</label>
                  <p className="text-gray-800">{profile.speciality}</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Experience</label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="experience"
                        value={tempProfile.experience}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.experience && (
                        <p className="text-red-500 text-sm">{errors.experience}</p>
                      )}
                    </>
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


// import React, { useEffect, useState } from 'react';
// import { Pencil, Save, X } from 'lucide-react';
// import { getProfile, editProfile } from '../../services/doctor/doctorApi';
// import { useDispatch } from 'react-redux';
// import { setDoctor } from '../../redux/slices/doctorSlice';

// const DoctorProfilePage = () => {
//   const dispatch = useDispatch();

//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     username: '',
//     email: '',
//     speciality: '',
//     experience: '',
//     image: '',
//   });
//   const [tempProfile, setTempProfile] = useState(profile);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleEdit = () => {
//     setIsEditing(true);
//     setTempProfile(profile);
//     setSelectedImage(null); // Reset the selected image on each edit
//   };

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('username', tempProfile.username);
//       formData.append('speciality', tempProfile.speciality);
//       formData.append('experience', tempProfile.experience);
      
//       if (selectedImage) {
//         formData.append('image', selectedImage);
//       }
//      formData.append('image',tempProfile.image)
      
//       const response = await editProfile(formData);
//       console.log('Profile updated:', response);
//       dispatch(setDoctor(response.data.username));

//       setProfile({
//         ...tempProfile,
//         image: response.data.image || profile.image, 
//       });
//       setSelectedImage(null);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setTempProfile(profile);
//     setSelectedImage(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTempProfile((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setTempProfile((prev) => ({
//         ...prev,
//         image: URL.createObjectURL(file), // Temporarily preview the new image
//       }));
//     }
//   };

//   useEffect(() => {
//     const fetchDocData = async () => {
//       try {
//         const response = await getProfile();
//         console.log('Fetched profile data:', response.data);
//         setProfile(response.data);
//         setTempProfile(response.data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };
//     fetchDocData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-blue-200">
//       <main className="pt-20 pb-8 px-4">
//         <div className="max-w-2xl mx-auto bg-custom-teal rounded-lg shadow-lg">
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-6">
//               <h1 className="text-2xl font-bold text-gray-800">Doctor Profile</h1>
//               {!isEditing ? (
//                 <button
//                   onClick={handleEdit}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors"
//                 >
//                   <Pencil size={16} />
//                   Edit Profile
//                 </button>
//               ) : (
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handleSave}
//                     className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors"
//                   >
//                     <Save size={16} />
//                     Save
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-colors"
//                   >
//                     <X size={16} />
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="flex flex-col items-center gap-4">
//                 <img
//                   src={selectedImage ? URL.createObjectURL(selectedImage) : profile.image}
//                   alt="Doctor profile"
//                   className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
//                 />
//                 {isEditing && (
//                   <div>
//                     <label className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="hidden"
//                       />
//                       Change Photo
//                     </label>
//                   </div>
//                 )}
//               </div>

//               <div className="flex-1 space-y-4">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-white">Username</label>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       name="username"
//                       value={tempProfile.username}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   ) : (
//                     <p className="text-gray-800">{profile.username}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-600">Email (Non-editable)</label>
//                   <p className="text-gray-800">{profile.email}</p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-600">Specialty</label>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       name="speciality"
//                       value={tempProfile.speciality}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   ) : (
//                     <p className="text-gray-800">{profile.speciality}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-600">Experience</label>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       name="experience"
//                       value={tempProfile.experience}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   ) : (
//                     <p className="text-gray-800">{profile.experience}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DoctorProfilePage;


// // import React, { useEffect, useState } from 'react';
// // import { Home, User, Settings, LogOut, Pencil, Save, X } from 'lucide-react';
// // import {getProfile,editProfile} from '../../services/doctor/doctorApi'
// // import { useDispatch } from 'react-redux';
// // import { setDoctor } from '../../redux/slices/doctorSlice';


// // // Main Profile Component
// // const DoctorProfilePage = () => {

// //   const dispatch=useDispatch()


// //   const [isEditing, setIsEditing] = useState(false);

// //   const [profile, setProfile] = useState({
// //     username: "",
// //     email: "",
// //     speciality: "",
// //     experience: "",
// //     image: ""
// //   });

// //   const [tempProfile, setTempProfile] = useState(profile);

// //   const handleEdit = () => {
// //     setIsEditing(true);
// //     setTempProfile(profile);
// //   };

// //   const handleSave = async() => {

// //     try {
// //       const response=await editProfile(tempProfile)
// //       console.log('edit profile',response);
// //       dispatch(setDoctor(response.data.username))
      
// //     } catch (error) {
// //       console.log('error in saving the db');
      
// //     }

// //     setProfile(tempProfile);
// //     setIsEditing(false);
// //   };

// //   const handleCancel = () => {
// //     setIsEditing(false);
// //     setTempProfile(profile);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setTempProfile(prev => ({
// //       ...prev,
// //       [name]: value
// //     })); 
// //   };

// //   useEffect(()=>{
// //     const fetchDocData=async()=>{
// //         try {
// //             const response=await getProfile()
// //             console.log(response.data,'responsedata');
// //             setProfile(response.data); 
// //         setTempProfile(response.data)
            
// //         } catch (error) {
// //             console.log('error in fetching data');
            
// //         }
// //     }
// //     fetchDocData()
// //   },[])


// //   return (
// //     <div className="min-h-screen bg-blue-200">
   
      
// //       <main className="pt-20 pb-8 px-4">
// //         <div className="max-w-2xl mx-auto bg-custom-teal rounded-lg shadow-lg">
// //           <div className="p-6">
// //             <div className="flex justify-between items-start mb-6">
// //               <h1 className="text-2xl font-bold text-gray-800">Doctor Profile</h1>
// //               {!isEditing ? (
// //                 <button
// //                   onClick={handleEdit}
// //                   className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors"
// //                 >
// //                   <Pencil size={16} />
// //                   Edit Profile
// //                 </button>
// //               ) : (
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={handleSave}
// //                     className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors"
// //                   >
// //                     <Save size={16} />
// //                     Save
// //                   </button>
// //                   <button
// //                     onClick={handleCancel}
// //                     className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-colors"
// //                   >
// //                     <X size={16} />
// //                     Cancel
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             <div className="flex flex-col md:flex-row gap-6">
// //               <div className="flex flex-col items-center gap-4">
// //                 <img
// //                   src={profile.image}
// //                   alt="Doctor profile"
// //                   className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
// //                 />
// //                 {isEditing && (
// //                   <button className="text-sm text-blue-500 hover:text-blue-600">
// //                     Change Photo
// //                   </button>
// //                 )}
// //               </div>

// //               <div className="flex-1 space-y-4">
// //                 <div className="space-y-2">
// //                   <label className="block text-sm font-medium text-white">
// //                     Username
// //                   </label>
// //                   {isEditing ? (
// //                     <input
// //                       type="text"
// //                       name="username"
// //                       value={tempProfile.username}
// //                       onChange={handleChange}
// //                       className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     />
// //                   ) : (
// //                     <p className="text-gray-800">{profile.username}</p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <label className="block text-sm font-medium text-gray-600">
// //                     Email (Non-editable)
// //                   </label>
// //                   <p className="text-gray-800">{profile.email}</p>
// //                 </div>

// //                 <div className="space-y-2">
// //                   <label className="block text-sm font-medium text-gray-600">
// //                     Specialty
// //                   </label>
// //                   {isEditing ? (
// //                     <input
// //                       type="text"
// //                       name="specialty"
// //                       value={tempProfile.speciality}
// //                       onChange={handleChange}
// //                       className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     />
// //                   ) : (
// //                     <p className="text-gray-800">{profile.speciality}</p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <label className="block text-sm font-medium text-gray-600">
// //                     Experience
// //                   </label>
// //                   {isEditing ? (
// //                     <input
// //                       type="text"
// //                       name="experience"
// //                       value={tempProfile.experience}
// //                       onChange={handleChange}
// //                       className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     />
// //                   ) : (
// //                     <p className="text-gray-800">{profile.experience}</p>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default DoctorProfilePage;