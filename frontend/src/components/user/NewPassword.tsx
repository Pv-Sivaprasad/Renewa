import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { forgetPassword, resetPassword } from '../../services/userApi'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'
import banner from '../../assets/user/banner.jpeg'
import { useNavigate } from 'react-router'


const NewPassword = () => {
    const [step, setStep] = useState(1) 
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate=useNavigate()
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

    const handlePasswordChange = async () => {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        try {
            console.log(email,otp,password);
            
            const response = await resetPassword(email, otp, password)
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
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="w-full p-2 border rounded-2xl mb-4"
                            />
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