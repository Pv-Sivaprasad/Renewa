import React from 'react'
import google from '../../assets/user/googleLogo.jpeg';
import { signInWithPopup } from 'firebase/auth';
import {auth,googleProvider} from '../../config/firebase'
import {googleSignIn} from '../../services/userApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router';
import UserLogout from './UserLogout';
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess } from '../../redux/slices/authSlice';





const GoogleSignIn = () => {

  const navigate=useNavigate()
  
  
  const dispatch=useDispatch()
  dispatch(loginRequest())
  
  const handleGoogleSignIn=async()=>{
    try {
      const result=await signInWithPopup(auth,googleProvider)
            const user=result.user
            if (user.email && user.displayName) {
                const response = await googleSignIn(user.email, user.displayName);
                console.log('Response from backend for Google sign in', response);
    
               
                const responseData = 'data' in response ? response.data : response;
                console.log('the responseData',responseData);
                
                if (responseData.success) {
                    toast.success(responseData.message);
                    if (responseData.accessToken) {
                      localStorage.setItem('accessToken', responseData.accessToken);
                      console.log('going to navigate to logged-in page');
                      dispatch(loginSuccess({
                        token:responseData.accessToken,
                        userName:responseData.username,
                        email:responseData.email
                      }))
                      navigate('/userhome');
                    }else{
                      console.log('error in rooting to logged in page');
                      
                    }
              
                  
                } else {
                    toast.error(responseData.message);
                }
            }
        } catch (error) {
            
        }
    }

  return (
    <div className=' rounded-2xl '>
      <button onClick={handleGoogleSignIn} className="flex items-center animate  justify-center w-full  text-white border-gray-300 p-2 rounded-xl transition duration-200">
            <img src={google} alt="Google" className="w-5 h-5 mr-2" />
            Sign In with Google
          </button>
    </div>
  )
}

export default GoogleSignIn
