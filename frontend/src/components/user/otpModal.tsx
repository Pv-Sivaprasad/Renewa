import React, { useState, useRef } from 'react';

interface OtpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (otp: string) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    const handleSubmit = () => {
        const otpValue = otp.join('');
        if (otpValue.length === 6) {
            onSubmit(otpValue);
        }else{
            console.log('invalid otp length');
            
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
                <div className="flex justify-center space-x-2 mb-6">
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
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleSubmit} 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Submit
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpModal;



