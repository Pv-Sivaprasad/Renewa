import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import UserHeader from '../../components/user/UserHeader';
import UserFooter from '../../components/user/UserFooter';
import login from '../../assets/user/login.jpg';
import GoogleSignIn from '../../components/user/google';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {signInRequest} from '../../services/userApi'


// Zod validation schema
const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(8, { message: 'Password should contain at least 8 characters' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

// Define the TypeScript type based on the Zod schema
type SignInSchemaType = z.infer<typeof signInSchema>;

const UserLogin: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    console.log('starting to  attempt');
    
    try {
      console.log('Form data submitted:', data); 
      const {email,password}=data
      const response =await signInRequest(email,password)
      console.log('respose recieve from backend',response);
      
      if(response.data.accessToken){
        localStorage.setItem('accessToken',response.data.accessToken)
      }

      if(response.data.success){
        console.log('goint to navigate to logged in page');
        
        navigate('/user/dashboard')
      }else{
        setError(response.data.message)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <UserHeader />

      <div className="flex h-screen bg-blue-700">
        {/* Left div for the image */}
        <div className="w-1/2 flex items-center justify-center">
          <img src={login} alt="Login" className="w-auto h-auto" /> {/* Adjust size as needed */}
        </div>

        {/* Right div for the login form */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10">
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email')}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.email ? 'border-red-500' : ''}`}
                autoComplete='email'
                />
              {/* Display validation error message */}
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message?.toString()}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register('password')}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.password ? 'border-red-500' : ''}`}
                autoComplete='password'
              />
              {/* Display validation error message */}
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 transition duration-200"
            >
              Sign In
            </button>

            <br />
            <div className="log flex items-center justify-center mt-4">
              <p className="text-black mr-2">New here? Register now ....</p>
              <Link to="/register">
                <span className="text-white underline">Sign Up</span>
              </Link>
            </div>
          </form>
          <GoogleSignIn/>
          <br />
          
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default UserLogin;



