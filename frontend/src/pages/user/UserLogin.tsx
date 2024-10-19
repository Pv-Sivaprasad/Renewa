import React from 'react';
import { useForm } from 'react-hook-form';
import UserHeader from '../../components/user/UserHeader';
import UserFooter from '../../components/user/UserFooter';
import login from '../../assets/user/login.jpg';
import google from '../../assets/user/googleLogo.jpeg';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form Submitted", data);
     
    } catch (error) {
      console.error("Error submitting form", error);
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
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.email ? 'border-red-500' : ''}`}
              />
              {/* Check if the error exists and ensure the message is a string */}
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
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.password ? 'border-red-500' : ''}`}
              />
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
          <br />
          <button className="flex items-center justify-center w-full text-white border-gray-300 p-2 rounded-xl transition duration-200">
            <img src={google} alt="Google" className="w-5 h-5 mr-2" />
            Sign In with Google
          </button>
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default UserLogin;





// import React, { useState } from 'react';
// import UserHeader from '../../components/user/UserHeader';
// import UserFooter from '../../components/user/UserFooter';
// import login from '../../assets/user/login.jpg'
// import google from '../../assets/user/googleLogo.jpeg'
// import { Link } from 'react-router-dom';




// const UserLogin = () => {

// const [formData,setFormData]=useState({})

// const handleChange=(e)=>{
//     setFormData({...formData,[e.target.id]:e.target.value})
// }


// const handleSubmit=async(e)=>{
//     e.preventDefault()
//     try {
        
//     } catch (error) {
        
//     }
// }

//     return (
//         <div>
//             <UserHeader />

//             <div className="flex h-screen bg-blue-700">
//                 {/* Left div for the image */}
//                 <div className=" w-1/2 flex items-center justify-center">
//                     <img src={login} alt="Login" className="w-auto h-auto" /> {/* Adjust size as needed */}
//                 </div>

//                 {/* Right div for the login form */}
//                 <div className="w-1/2 flex flex-col items-center justify-center p-10">
//                     <h1 className="text-3xl font-bold mb-6">Login</h1>
//                     <form  onSubmit={handleSubmit}  className="w-full max-w-sm">
//                         <div className="mb-4">
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 placeholder="Enter your email"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-6">
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 placeholder="Enter your password"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition duration-200">Sign In</button>
//                         <br />
//                         <div className="log flex items-center justify-center mt-4">
//                             <p className='text-black mr-2'>New here? Register now ....</p>
//                             <Link to='/register'>
//                                 <span className='text-white underline'>Sign Up</span>
//                             </Link>
//                         </div>



//                     </form>
//                     <br />
//                     <button   className="flex items-center justify-center w-full text-white border-gray-300 p-2 rounded-md
//             transition duration-200">
//                         <img src={google} alt="Google" className="w-5 h-5 mr-2" /> {/* Replace with Google icon */}
//                         Sign In with Google
//                     </button>
//                 </div>
//             </div>

//             <UserFooter />
//         </div>
//     );
// };

// export default UserLogin;
