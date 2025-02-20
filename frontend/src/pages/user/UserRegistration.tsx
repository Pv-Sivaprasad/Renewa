import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import UserHeader from '../../components/user/UserHeader';
import UserFooter from '../../components/user/UserFooter';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import banner from '../../assets/user/banner.jpeg';
import { validateForm } from '../../utils/validations';
import { signUpRequest, otpSignup, resendOtp } from '../../services/user/userApi';
import { toast } from 'react-toastify';
import OtpModal from '../../components/user/otpModal';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface UserFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const UserRegistration: React.FC = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
        const res=await otpSignup(otp, email);
        if(res){
            toast.success('sign up successfull')
            navigate('/login')
        }
    };

    const onResendOtp=async()=>{
        try {
            const response=await resendOtp(formData.email)
            console.log('response on the resend otp ');
            
        } catch (error) {
            toast.error('something went wrong')
        }
    }

    return (
        <div>
            {loading ? (
                 <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>
                 <div className="w-12 h-12 bg-blue-800   animate-spin"></div>
             </div>
            ) : (
                <>
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
                                        placeholder="username"
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
                                        placeholder="user@gmail.com"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="email"
                                    />
                                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                                </div>

                                {/* <div className="mb-6">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                     
                                        id="password"
                                        placeholder="Enter your password"
                                        type={showPassword ? "text" : "password"}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        autoComplete="new-password"
                                    />
                                    {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                                </div> */}
                                <div className="mb-6 relative">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        placeholder="User132@"
                                        type={showPassword ? 'text' : 'password'}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                                </div>

                                {/* <div className="mb-6">
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
                                </div> */}
                                 <div className="mb-6 relative">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        placeholder="User132@"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
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
                                onResendOtp={onResendOtp} 
                            />
                        </div>
                    </div>
                    <UserFooter />
                </>
            )}
        </div>
    );
};

export default UserRegistration;

