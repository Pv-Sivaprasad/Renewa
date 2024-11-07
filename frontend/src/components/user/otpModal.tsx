import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

interface OtpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (otp: string) => void;
    onResendOtp: () => void;  
    email: string;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onSubmit, onResendOtp, email }) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState<number>(30);
    const [canResend, setCanResend] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (isOpen) {
            setCountdown(30);   
            setCanResend(false);
        }
    }, [isOpen]);

   
    useEffect(() => {
        if (countdown > 0) {
            const timerId = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            setCanResend(true); 
        }
    }, [countdown]);

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
        } else {
            console.log('Invalid OTP length');
        }
    };

    const handleResendOtp = () => {
        onResendOtp();
        setCountdown(30);  
        setCanResend(false); 
        toast.success('otp sent to email')
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
                <p className="text-sm text-gray-600 font-bold mb-2">Email has been sent to : {email}</p>
                
                <div className="flex justify-center space-x-2 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="number"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>

                <div className="flex justify-center space-x-4 mb-4">
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

                <div className="flex flex-col items-center">
                    <span className="text-gray-600 text-sm mb-2">
                        Resend OTP in {countdown} seconds
                    </span>
                    <button
                        onClick={handleResendOtp}
                        disabled={!canResend}
                        className={`px-4 py-2 rounded-lg ${canResend ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-400 text-white cursor-not-allowed'}`}
                    >
                        Resend OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpModal;



// import React, { useState, useRef, useEffect } from 'react';

// interface OtpModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onSubmit: (otp: string) => void;
//     onResendOtp:()=>void;
//     email:string;
// }

// const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onSubmit,email }) => {
//     const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
//     const [countdown,setCountdown]=useState<number>(30)
//     const [canResend,setCanResend]=useState<boolean>(false)
//     const inputRefs = useRef<(HTMLInputElement | null)[]>([]);


//     useEffect(()=>{
//         if(isOpen){
//             setCountdown(30)
//             setCanResend(false)
//         }
//     },[isOpen])


//     useEffect(()=>{
//         if(countdown >0){
//             const timerId=setInterval(()=>{
//                 setCountdown((prev)=>prev-1)
//             },1000)
//             return ()=>clearInterval(timerId)
//         }else{
//             setCanResend(true)
//         }
//     },[countdown])


//     const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//         const { value } = e.target;
//         if (/\d/.test(value) || value === '') {
//             const newOtp = [...otp];
//             newOtp[index] = value;
//             setOtp(newOtp);

//             if (value && index < 5) {
                
//                 inputRefs.current[index + 1]?.focus();
//             }
//         }
//     };

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//         if (e.key === 'Backspace' && !otp[index] && index > 0) {
            
//             inputRefs.current[index - 1]?.focus();
//         }
//     };

//     const handleSubmit = () => {
//         const otpValue = otp.join('');
//         if (otpValue.length === 6) {
//             onSubmit(otpValue);
//         }else{
//             console.log('invalid otp length');
            
//         }
//     };


//     const handleResendOtp=()=>{
//         onResendOtp()
//         setCountdown(30)
//         setCanResend(false)
//     }


//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//                 <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
//                 <p className="text-sm text-gray-600 mb-2">Email: {email}</p>
//                 <div className="flex justify-center space-x-2 mb-6">
//                     {otp.map((digit, index) => (
//                         <input
//                             key={index}
//                             ref={(el) => (inputRefs.current[index] = el)}
//                             type="text"
//                             maxLength={1}
//                             value={digit}
//                             onChange={(e) => handleOtpChange(e, index)}
//                             onKeyDown={(e) => handleKeyDown(e, index)}
//                             className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     ))}
//                 </div>
//                 <div className="flex justify-center space-x-4">
//                     <button
//                         onClick={handleSubmit} 
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                     >
//                         Submit
//                     </button>
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
//                     >
//                         Close
//                     </button>
//                 </div>
//                 <div className="flex flex-col items-center">
//                     <span className="text-gray-600 text-sm mb-2">
//                         Resend OTP in {countdown} seconds
//                     </span>
//                     <button
//                         onClick={handleResendOtp}
//                         disabled={!canResend}
//                         className={`px-4 py-2 rounded-lg ${canResend ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-400 text-white cursor-not-allowed'}`}
//                     >
//                         Resend OTP
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OtpModal;



