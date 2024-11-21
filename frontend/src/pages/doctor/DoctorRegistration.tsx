import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // React Router for navigation
import { validateForm } from '../../utils/doctor/registerValidations';
import { docSignUp } from '../../services/doctor/doctorApi';
import { toast } from 'react-toastify';
import swal from 'sweetalert'

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  experience: string;
  speciality: string;
}

const DoctorRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    experience: '',
    speciality: '', // dropdown selection for speciality
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate=useNavigate()


  // const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const { isValid, errors: validationErrors } = validateForm(formData);
  //   if (isValid) {
  //     console.log('Form submitted:', formData);
  //     const response=await docSignUp(formData)
  //     console.log('the response from bakcend is in docregister',response);
  //     if(response.data.success){
  //       toast.success(response.data.message)
  //       navigate('/doctor')
  //     }
  //   } else {
  //     setErrors(validationErrors);
  //   }
  // };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateForm(formData);
  
    if (isValid) {
      try {
        console.log('Form submitted:', formData);
        const response = await docSignUp(formData);
        console.log('The response from backend is in docregister', response);
  
        if (response.data.success) {
          swal({
            title: "Registration Successful!",
            text: "You will be notified with further updates.",
            icon: "success",
            buttons: ["Cancel", "Proceed"], // Fixed the property name
          }).then(() => {
            // Navigate to /doctor route after alert confirmation
            navigate('/doctor');
          });
        }
      } catch (error) {
        console.error('Error during signup:', error);
        toast.error(error.response.data.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-custom-reg flex items-center justify-center">
      <div className="bg-custom-teal p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Doctor Registration</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

          {/* Experience Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Years of experience"
                required
              />
              {errors.experience && <p className="text-red-600 text-sm mt-1">{errors.experience}</p>}
            </div>
          </div>

          {/* Speciality Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
            <select
              name="speciality"
              value={formData.speciality}
              onChange={handleSelectChange}
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>Select Speciality</option>
              <option value="Surgeon">Surgeon</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Dentist">Dentist</option>
              <option value="ENT">ENT</option>
            </select>
            {errors.speciality && <p className="text-red-600 text-sm mt-1">{errors.speciality}</p>}
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
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Redirect */}
        <div className="mt-4 text-center">
          <Link to="/doctor" className="text-white animate-pulse hover:underline">
            Already have an account? Login here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistrationForm;


