import React from 'react'
import google from '../../assets/user/googleLogo.jpeg';
import { signInWithPopup } from 'firebase/auth';
import {auth,googleProvider} from '../../config/firebase'
import {googleSignIn} from '../../services/userApi'
import { toast } from 'react-toastify'
const GoogleSignIn = () => {

    const handleGoogleSignIn=async()=>{
        try {
            const result=await signInWithPopup(auth,googleProvider)
            const user=result.user
            if (user.email && user.displayName) {
                const response = await googleSignIn(user.email, user.displayName);
                console.log('Response from backend for Google sign in', response);
    
                // Check if response contains data (meaning it's an Axios response)
                const responseData = 'data' in response ? response.data : response;
                
                if (responseData.success) {
                    toast.success(responseData.message);
                } else {
                    toast.error(responseData.message);
                }
            }
        } catch (error) {
            
        }
    }

  return (
    <div className='bg-blue-500 rounded-2xl '>
      <button onClick={handleGoogleSignIn} className="flex items-center justify-center w-full  text-white border-gray-300 p-2 rounded-xl transition duration-200">
            <img src={google} alt="Google" className="w-5 h-5 mr-2" />
            Sign In with Google
          </button>
    </div>
  )
}

export default GoogleSignIn
