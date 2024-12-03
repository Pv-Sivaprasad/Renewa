

import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { forgetPassword, resetPassword } from '../../services/userApi'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'
import banner from '../../assets/user/banner.jpeg'
import { useNavigate } from 'react-router'

const NewPassword = () => {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleForgetPassword = async () => {
        try {
            const response = await forgetPassword(email)
            if (response) {
                toast.success('OTP has been sent to your email ID')
                setStep(2)
            } else {
                toast.error('Failed to send OTP. Try again.')
            }
        } catch (error) {
            toast.error('Error sending OTP')
        }
    }

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/\d/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePasswordChange = async () => {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            toast.error('Invalid OTP length')
            return;
        }

        try {
            const response = await resetPassword(email, otpValue, password)
            if (response) {
                toast.success('Password has been changed successfully')
                navigate('/login')
            } else {
                toast.error('Failed to change password')
            }
        } catch (error) {
            toast.error('Error changing password')
        }
    }

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
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 max-w-md mx-auto p-8 bg-white bg-opacity-55 rounded shadow-md">
                    {step === 1 ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                            <p className="mb-6">Enter your email to receive an OTP for resetting your password.</p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full p-2 border rounded mb-4"
                            />
                            <button
                                onClick={handleForgetPassword}
                                className="w-full bg-blue-600 text-white py-2 rounded"
                            >
                                Send OTP
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                            <h2 className='animate-pulse text-center font-bold text-red-600'>Please do not refresh the page!!! </h2>
                            <div className="flex flex-col items-center mb-4">
                                <h3 className="text-lg font-semibold mb-2">Enter the OTP</h3>
                                <div className="flex justify-center space-x-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ))}
                                </div>
                            </div>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New Password"
                                className="w-full p-2 border rounded-2xl mb-4"
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm New Password"
                                className="w-full p-2 border rounded-2xl mb-4"
                            />
                            <button
                                onClick={handlePasswordChange}
                                className="w-full bg-green-600 text-white py-2 rounded"
                            >
                                Reset Password
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <UserFooter />
        </div>
    )
}

export default NewPassword
