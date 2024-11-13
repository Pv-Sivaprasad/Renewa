import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import UserHeader from '../../components/user/UserHeader';
import UserFooter from '../../components/user/UserFooter';
import GoogleSignIn from '../../components/user/Google';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInRequest } from '../../services/user/userApi';
import banner from '../../assets/user/banner.jpeg';
import {toast} from 'react-toastify'
import { loginRequest,loginSuccess,logout } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

const signInSchema = z.object({ 
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(8, { message: 'Password should contain at least 8 characters' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

const UserLogin: React.FC = () => {
  
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const dispatch=useDispatch<AppDispatch>()

    dispatch(loginRequest())

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    console.log('starting to attempt');
    try {
      console.log('Form data submitted:', data);

      const { email, password } = data;

      const response = await signInRequest(email, password);

      console.log('response received from backend', response);
      if(!response) {
        toast.error('Invalid credentials')
      }
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        toast.success('Login Successfull')
        dispatch(loginSuccess({
          token:response.data.accessToken,
          userName:response.data.username,
          email:response.data.email
        }))
      }else  {
        toast.error('Invalid credentials')
      }

      if (response.data.message.includes('Login completed with refersh token')) {
        console.log('going to navigate to logged-in page');
        navigate('/userhome');
      } else {
        
        console.log('error in message');
        
      }
    } catch (error) {
      console.log(error.response.data.message,'asdfhkashfkjh');
      
    console.error("Axios error that u response:", error.response?.data || error.message);

    toast.error(error.response.data.message)

    }
  };

  return (
    <div>
      <UserHeader />

      <div
        className="flex justify-center items-center h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        
        <div className="absolute inset-0 bg-black opacity-60"></div>

    
        <div className="relative z-10 flex w-3/5 max-w-2xl mx-auto p-10 bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-md">
          

          <div className="w-full flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6  text-gray-800">Login</h1>
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
                  autoComplete="email"
                />
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
                  autoComplete="password"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 transition duration-200"
              >
                Sign In
              </button>

              <div className="text-center mt-4">
                <p onClick={() => navigate('/forgot-password')} className=" hover:text-red-600  cursor-pointer text-blue-600 hover:underline">
                  Forgot Password?
                </p>
              </div>

              <div className="text-center mt-6 flex items-center justify-center">
                <p className="text-white mr-2 animate-bounce">New here? Register now...</p>
                <Link to="/register" className="text-blue-600 underline">Sign Up</Link>
              </div>
            </form>
            <br />
            <GoogleSignIn />
            <br />
          </div>
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default UserLogin;



// import React, { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import UserHeader from '../../components/user/UserHeader';
// import UserFooter from '../../components/user/UserFooter';
// import login from '../../assets/user/login.jpg';
// import GoogleSignIn from '../../components/user/Google';
// import { Link, useNavigate } from 'react-router-dom';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {signInRequest} from '../../services/userApi'
// import banner from '../../assets/user/banner.jpeg'


// // Zod validation schema
// const signInSchema = z.object({
//   email: z.string().email({ message: 'Invalid email address' }),
//   password: z.string()
//     .min(8, { message: 'Password should contain at least 8 characters' })
//     .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
//     .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
// });


// type SignInSchemaType = z.infer<typeof signInSchema>;

// const UserLogin: React.FC = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInSchemaType>({
//     resolver: zodResolver(signInSchema),
//   });


//   const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
//     console.log('starting to  attempt');
    
//     try {
//       console.log('Form data submitted:', data); 
//       const {email,password}=data
//       const response =await signInRequest(email,password)
//       console.log('respose recieve from backend',response);
      
//       if(response.data.accessToken){
//         localStorage.setItem('accessToken',response.data.accessToken)
//       }

//       if(response.data.message.includes('Login completed with refersh token')){
//         console.log('goint to navigate to logged in page');
//         console.log('=====================================');
        
//         navigate('/userhome')
//       }else{
//         setError(response.data.message)
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <div>
//       <UserHeader />

//       <div
//                 className="flex justify-center items-center h-screen bg-cover bg-center relative"
//                 style={{
//                     backgroundImage: `url(${banner})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                 }}
//             >

//       <div className="flex h-screen bg-blue-700">
       
//         <div className="w-1/2 flex items-center justify-center">
//           <img src={login} alt="Login" className="w-auto h-auto" /> 
//         </div>

        
//         <div className="w-1/2 flex flex-col items-center justify-center p-10">
//           <h1 className="text-3xl font-bold mb-6">Login</h1>
//           <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter your email"
//                 {...register('email')}
//                 className={`mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.email ? 'border-red-500' : ''}`}
//                 autoComplete='email'
//                 />
              
//               {errors.email && <p className="text-red-500 text-sm">{errors.email.message?.toString()}</p>}
//             </div>

//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter your password"
//                 {...register('password')}
//                 className={`mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.password ? 'border-red-500' : ''}`}
//                 autoComplete='password'
//               />
              
//               {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 transition duration-200"
//             >
//               Sign In
//             </button>
//             <div className="forget p-2 ml-8">
         
//             <p onClick={() => navigate('/forgot-password')} className="cursor-pointer text-white">
//                 Forgot Password?
//             </p>   
//             </div>
           
        

           
//             <div className="log flex items-center justify-center mt-4">
//               <p className="text-black mr-2">New here? Register now ....</p>
//               <Link to="/register">
//                 <span className="text-white underline">Sign Up</span>
//               </Link>
//             </div>
//           </form>
//           <br />
//           <GoogleSignIn/>
//           <br />
          
//         </div>
//       </div>
//       </div>
//       <UserFooter />
//     </div>
//   );
// };

// export default UserLogin;



