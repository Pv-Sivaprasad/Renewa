import React, { useState, ChangeEvent, FormEvent } from 'react';
import UserHeader from '../../components/user/UserHeader';
import UserFooter from '../../components/user/UserFooter';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import reg from '../../assets/user/registration-bg.jpeg';
import banner from '../../assets/user/banner.jpeg';
import { validateForm } from '../../utils/validations';
import { signUpRequest, otpSignup } from '../../services/userApi';
import { toast } from 'react-toastify';
import OtpModal from '../../components/user/otpModal';

interface UserFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const UserRegistration: React.FC = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<UserFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '', 
        password: '',
        confirmPassword: '',
    });
    const [otpModalOpen, setOtpModalOpen] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { isValid, errors } = validateForm(formData);

        if (!isValid) {
            setFormErrors(errors);
            return;
        }

        try {
            const response = await signUpRequest(formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setOtpModalOpen(true);
            } else {
                if (response.data.message.includes('OTP is still valid') || response.data.message.includes('OTP expired')) {
                    toast.info(response.data.message);
                    setOtpModalOpen(true);
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.');
        }
    };

    const handleOtpSubmit = async (otp: string) => {
        const email = formData.email;
        setOtpModalOpen(false);
        await otpSignup(otp, email);
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
                <div className="w-1/2 flex flex-col items-center justify-center p-10 bg-white bg-opacity-65 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6 text-center">Registration</h1>
                    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your name"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                            />
                            {formErrors.username && <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                            />
                            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                            />
                            {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                            />
                            {formErrors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                            )}
                        </div>

                        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-2xl hover:bg-purple-700">
                            Sign Up
                        </button>

                        <div className="flex items-center justify-center mt-4">
                            <p className="text-black mr-2">Already a member? Sign in now ....</p>
                            <Link to="/login">
                                <span className="text-purple-600 underline">Sign In</span>
                            </Link>
                        </div>
                    </form>

                    <OtpModal
                        isOpen={otpModalOpen}
                        onClose={() => setOtpModalOpen(false)}
                        onSubmit={handleOtpSubmit}
                        email={formData.email}
                    />
                </div>
            </div>
            <UserFooter />
        </div>
    );
};

export default UserRegistration;


// import React, { useState, ChangeEvent, FormEvent } from 'react'
// import UserHeader from '../../components/user/UserHeader'
// import UserFooter from '../../components/user/UserFooter'
// import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import reg from '../../assets/user/registration-bg.jpeg'
// import { validateForm } from '../../utils/validations'
// import { signUpRequest,otpSignup } from '../../services/userApi'
// import { toast } from 'react-toastify'
// import OtpModal from '../../components/user/otpModal'


// interface UserFormData {
//     username: string,
//     email: string,
//     password: string,
//     confirmPassword: string
// }

// const UserRegistration: React.FC = () => {

//     const dispatch = useDispatch()

    
//     const [formData, setFormData] = useState<UserFormData>({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     })

//     const [formErrors, setFormErrors] = useState({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });
//     const [otpModalOpen, setOtpModalOpen] = useState(false);


//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setFormData({
//             ...formData, [e.target.id]: e.target.value
//         })
//     }

    
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
    
        
//         const { isValid, errors } = validateForm(formData);
//         if (!isValid) {
//             console.log('Validation error happened', errors);
//             setFormErrors(errors);
//             return;
//         }
    
      
//         try {
//             const response = await signUpRequest(formData);
//             console.log(response, 'Received details from backend');
            
            
//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 console.log('Toast completed');
//                 setOtpModalOpen(true);  
    
//             } else {
                
//                 if (response.data.message.includes('OTP is still valid')) {
                   
//                     toast.info(response.data.message); 
//                     setOtpModalOpen(true);  
//                 } else if (response.data.message.includes('OTP expired')) {
                   
//                     toast.warning(response.data.message);
//                     setOtpModalOpen(true);  
//                 } else {
                  
//                     toast.error(response.data.message);
//                 }
//             }
//         } catch (error) {
//             console.error('Error during sign-up request:', error);
//             toast.error('Something went wrong. Please try again later.');
//         }
//     };
    

//     const handleOtpSubmit=async(otp:string,)=>{
        
//         const email=formData.email
//         console.log(email,'email');
        
//         console.log('otp submitted is',otp);
//         setOtpModalOpen(false)

//         const otpVerify= await  otpSignup(otp,email)
    
    
    
//     }
//     return (
//         <div>
//             <UserHeader />
//             <div className="flex h-screen bg-blue-700">
//                 <div className="w-1/2 flex items-center justify-center">
//                     <img src={reg} alt="Registration" className="w-auto h-auto" />
//                 </div>
//                 <div className="w-1/2 flex flex-col items-center justify-center p-10">
//                     <h1 className="text-3xl font-bold mb-6">Registration</h1>
//                     <form className="w-full max-w-sm" onSubmit={handleSubmit}>
//                         <div className="mb-4">
//                             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                                 Name
//                             </label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 placeholder="Enter your name"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="name"
//                             />
//                             {formErrors.username && <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 placeholder="Enter your email"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="email"
//                             />
//                             {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
//                         </div>
//                         <div className="mb-6">
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 placeholder="Enter your password"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="new-password"
//                             />
//                             {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
//                         </div>
//                         <div className="mb-6">
//                             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                                 Confirm Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="confirmPassword"
//                                 placeholder="Confirm your password"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="new-password"
//                             />
//                             {formErrors.confirmPassword && (
//                                 <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
//                             )}
//                         </div>
//                         <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-2xl hover:bg-purple-700">
//                             Sign Up
//                         </button>
//                         <br />
//                         <div className="log flex items-center justify-center mt-4">
//                             <p className="text-black mr-2">Already a member? Sign in now ....</p>
//                             <Link to="/login">
//                                 <span className="text-white underline">Sign In</span>
//                             </Link>
//                         </div>
//                     </form>
//                     <OtpModal 
//                 isOpen={otpModalOpen} 
//                 onClose={() => setOtpModalOpen(false)} 
//                 onSubmit={handleOtpSubmit} 
//                  email={formData.email}
//             />
//                 </div>
//             </div>
           
          
            
        
//             <UserFooter />
//         </div>
//     );
// };

// export default UserRegistration;


