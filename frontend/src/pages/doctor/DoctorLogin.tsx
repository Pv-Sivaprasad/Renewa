import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { docSignIn } from '../../services/doctor/doctorApi';


// Zod schema for form validation
const signInSchema = z.object({ 
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(8, { message: 'Password should contain at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

const DoctorLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<{ email: string; password: string }>>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigte=useNavigate()



  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
     
      const validationResult = signInSchema.safeParse(formData);
      if (!validationResult.success) {
          const newErrors: Record<string, string> = {};
          validationResult.error.errors.forEach(error => {
              newErrors[error.path[0]] = error.message;
          });
          setErrors(newErrors);
          toast.error("Please fix the form errors and try again.");
      } else {
          setErrors({
              email: '',
              password: '',
          });
          try {
            console.log('Form submitted:', formData);
              const response = await docSignIn(formData);
              if (response && response.data) {
                  toast.success("Login successful!");
                  if(response.data.accessToken){
                    localStorage.setItem('accessToken',response.data.accessToken)
                    navigte('/doctor/dashboard')
                  }
              } else {
                  toast.error("Unexpected response from the server.");
              }
          } catch (error) {
              const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
              toast.error(errorMessage);
          }
      }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-custom-teal flex items-center justify-center">
      <div className="bg-custom-log p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Doctor Login</h2>
          <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="doctor@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
          
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Login
          </button>
          
          {/* Link to Registration Page */}
          <div className="text-center mt-4">
            <p className="text-sm animate-pulse text-gray-600">
              Did not register yet?{' '}
              <Link to="/doctor/register" className="text-blue-600  hover:text-blue-800">
                 Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorLoginForm;



// import React, { useState } from 'react';
// import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
// import { Link } from 'react-router-dom'; // Add react-router-dom for navigation
// import {z} from 'zod'


// const signInSchema = z.object({ 
//   email: z.string().email({ message: 'Invalid email address' }),
//   password: z.string()
//     .min(8, { message: 'Password should contain at least 8 characters' })
//     .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
//     .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
// });

// type SignInSchemaType = z.infer<typeof signInSchema>;

// const DoctorLoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
  
//   const [showPassword, setShowPassword] = useState(false);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Form submitted:', formData);
//   };
  
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };
  
//   return (
//     <div className="min-h-screen bg-custom-teal flex items-center justify-center">
//       <div className="bg-custom-log p-8 rounded-lg shadow-lg w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-800">Doctor Login</h2>
//           <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
//         </div>
        
//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
          
//           {/* Email Field */}
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="doctor@example.com"
//                 required
//               />
//             </div>
//           </div>
          
//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? 
//                   <EyeOff className="h-5 w-5" /> : 
//                   <Eye className="h-5 w-5" />
//                 }
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
//           >
//             Login
//           </button>
          
//           {/* Link to Registration Page */}
//           <div className="text-center mt-4">
//             <p className="text-sm text-gray-600">
//               Did not register yet?{' '}
//               <Link to="/doctor/register" className="text-blue-600 hover:text-blue-800">
//                 Register here
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DoctorLoginForm;


// // import React, { useState } from 'react';
// // import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

// // const DoctorLoginForm = () => {
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: ''
// //   });
  
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Handle form submission logic here
// //     console.log('Form submitted:', formData);
// //   };
  
// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };
  
// //   return (
// //     <div className="min-h-screen bg-custom-teal  flex items-center justify-center">
// //       <div className="bg-custom-log p-8 rounded-lg shadow-lg w-full max-w-md">
// //         {/* Header */}
// //         <div className="text-center mb-8">
// //           <h2 className="text-2xl font-bold text-gray-800">Doctor Login</h2>
// //           <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
// //         </div>
        
// //         {/* Form */}
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Username Field */}
// //           <div className="relative">
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Username
// //             </label>
// //             <div className="relative">
// //               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
// //               <input
// //                 type="text"
// //                 name="username"
// //                 value={formData.username}
// //                 onChange={handleChange}
// //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Enter your username"
// //                 required
// //               />
// //             </div>
// //           </div>
          
// //           {/* Email Field */}
// //           <div className="relative">
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Email Address
// //             </label>
// //             <div className="relative">
// //               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="doctor@example.com"
// //                 required
// //               />
// //             </div>
// //           </div>
          
// //           {/* Password Field */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Password
// //             </label>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 name="password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Enter your password"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //               >
// //                 {showPassword ? 
// //                   <EyeOff className="h-5 w-5" /> : 
// //                   <Eye className="h-5 w-5" />
// //                 }
// //               </button>
// //             </div>
// //           </div>
          
// //           {/* Confirm Password Field */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Confirm Password
// //             </label>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
// //               <input
// //                 type={showConfirmPassword ? "text" : "password"}
// //                 name="confirmPassword"
// //                 value={formData.confirmPassword}
// //                 onChange={handleChange}
// //                 className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Confirm your password"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //               >
// //                 {showConfirmPassword ? 
// //                   <EyeOff className="h-5 w-5" /> : 
// //                   <Eye className="h-5 w-5" />
// //                 }
// //               </button>
// //             </div>
// //           </div>
          
// //           {/* Submit Button */}
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
// //           >
// //             Sign Up
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DoctorLoginForm;