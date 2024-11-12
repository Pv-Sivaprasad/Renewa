import React, { useState,FormEvent,ChangeEvent } from 'react';
import { Eye, EyeOff, User, Mail, Lock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom'; // React Router for navigation
import { validateForm } from '../../utils/doctor/registerValidations';


interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }


const DoctorRegistrationForm = () => {



  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateForm(formData);
    if(isValid){

        console.log('Form submitted:', formData);
        
    }else{
        setErrors(validationErrors);
    }
  };

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  

  return (
    <div className="min-h-screen bg-custom-reg flex items-center justify-center">
      <div className="bg-custom-teal p-6 rounded-lg shadow-lg w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Doctor Registration</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
                required
              />
              {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="doctor@example.com"
                required
              />
               {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password@345"
                required
              />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=" Password@345"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
               {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
            )}
            </div>
          </div>

        

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Register
          </button>

          {/* Link to Login Page */}
          <div className="text-center mt-4">
            <p className="text-sm text-white">
              Already have an account?{' '}
              <Link to="/doctor" className="text-black hover:text-blue-800">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistrationForm;


// import React, { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';

// interface FormData {
//   username: string;
//   password: string;
//   confirmPassword: string;
//   email: string;
//   experience: string;
//   speciality: string;
//   certificate: File | null;
// }

// const DoctorRegistration = () => {
//   const [formData, setFormData] = useState<FormData>({
//     username: '',
//     password: '',
//     confirmPassword: '',
//     email: '',
//     experience: '',
//     speciality: '',
//     certificate: null
//   });

//   const [errors, setErrors] = useState<any>({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const validateForm = () => {
//     const newErrors: any = {};
    
//     if (!formData.username) {
//       newErrors.username = 'Username is required';
//     } else if (formData.username.length < 3) {
//       newErrors.username = 'Username must be at least 3 characters';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }

//     if (!formData.experience) {
//       newErrors.experience = 'Experience is required';
//     }

//     if (!formData.speciality) {
//       newErrors.speciality = 'Speciality is required';
//     }

//     if (!formData.certificate) {
//       newErrors.certificate = 'Certificate PDF is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file && file.type === 'application/pdf') {
//       setFormData(prev => ({
//         ...prev,
//         certificate: file
//       }));
//       setErrors(prev => ({
//         ...prev,
//         certificate: ''
//       }));
//     } else {
//       setErrors(prev => ({
//         ...prev,
//         certificate: 'Please upload a PDF file'
//       }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Form submitted:', formData);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-custom-teal py-4 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-sm w-full mx-auto bg-custom-log space-y-6">
//         <div>
//           <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
//             Doctor Registration
//           </h2>
//         </div>

//         <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             {/* Username field */}
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 value={formData.username}
//                 onChange={handleInputChange}
//               />
//               {errors.username && (
//                 <p className="mt-1 text-sm text-red-600">{errors.username}</p>
//               )}
//             </div>

//             {/* Password field */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="relative mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 px-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4 text-gray-500" />
//                   ) : (
//                     <Eye className="h-4 w-4 text-gray-500" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password field */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <div className="relative mt-1">
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   required
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 px-3 flex items-center"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="h-4 w-4 text-gray-500" />
//                   ) : (
//                     <Eye className="h-4 w-4 text-gray-500" />
//                   )}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
//               )}
//             </div>

//             {/* Email field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 value={formData.email}
//                 onChange={handleInputChange}
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             {/* Experience field */}
//             <div>
//               <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
//                 Years of Experience
//               </label>
//               <input
//                 id="experience"
//                 name="experience"
//                 type="number"
//                 min="0"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 value={formData.experience}
//                 onChange={handleInputChange}
//               />
//               {errors.experience && (
//                 <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
//               )}
//             </div>

//             {/* Speciality field */}
//             <div>
//               <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">
//                 Speciality
//               </label>
//               <input
//                 id="speciality"
//                 name="speciality"
//                 type="text"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 value={formData.speciality}
//                 onChange={handleInputChange}
//               />
//               {errors.speciality && (
//                 <p className="mt-1 text-sm text-red-600">{errors.speciality}</p>
//               )}
//             </div>

//             {/* Certificate file input */}
//             <div>
//               <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
//                 Certificate (PDF)
//               </label>
//               <input
//                 id="certificate"
//                 name="certificate"
//                 type="file"
//                 accept="application/pdf"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 onChange={handleFileChange}
//               />
//               {errors.certificate && (
//                 <p className="mt-1 text-sm text-red-600">{errors.certificate}</p>
//               )}
//             </div>

//             <div className="flex items-center justify-center">
//               <button
//                 type="submit"
//                 className="w-full bg-indigo-600 text-white font-medium rounded-lg py-2 px-4"
//               >
//                 Register
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DoctorRegistration;
