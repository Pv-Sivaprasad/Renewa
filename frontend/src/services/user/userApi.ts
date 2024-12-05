import axios from 'axios'
import { publicAxiosInstance, userAxiosInstance } from '../axiosInstance/userInstance';


// const api= axios.create({
//     baseURL: import.meta.env.VITE_USER_API_URL
// })
const api=userAxiosInstance
const publicApi=publicAxiosInstance

export const signInRequest=async(email:string,password:string)=>{
    console.log(email,password);
    console.log('data forwarding to backend in signin');
    const response=await publicApi.post('/signin',{email,password})
    console.log(response,'the response from backend')
    if(!response) console.log('returning is not gettin correctly');
    return response
}

export const signUpRequest=async(formData)=>{
    console.log(formData,'asdfkadsjfdf');
    
    console.log('data forwarding to backend in signup in userapi');

    const response=await publicApi.post('/signup',formData)
    console.log('data recieved from signup in userapi',response);

    if(!response) console.log('returning is not gettin correctly');
    
    return response
}


export const otpSignup=async(otp,email)=>{
    console.log('the otp before forwarding to backend in user api',otp);
    const response=await publicApi.post('/otpverify',{otp,email})
    console.log(response,'the response that recieved from backend to userApi');
    if(!response) {
        console.log('error in sign in ');
        return {success:false,message:"otpsignup in userapi not working"}
    }
    return response
    
}


export const resendOtp=async(email)=>{
    console.log('the resend otp before forwarding to backend')
    const response=await publicApi.post('/resend-otp',{email})
    console.log('the responser from backend in resend otp');
    if(!response){
        return{success:false,message:"resend otp not working"}
    }
    return response
    
    
}

export const googleSignIn=async(email:string,username:string)=>{
    console.log('the google sign in email and name before sending to backend',email,username);
    const response=await publicApi.post('/google-signin',{email,username})
    console.log(response,'the response that recieved from backend to userApi');
    if(!response) {
        console.log('error in sign in ');
        return {success:false,message:"otpsignup in google signin not working"}
    }
    console.log('response in userapi is',response);
    
    return response
    
}

export const forgetPassword=async(email:string)=>{
    const response=await publicApi.post('/forget',{email})
    if(!response) {
        console.log('error in forget password ');
        return {success:false,message:"error in forget password"}
    }
    return response
}

export const resetPassword=async(email:string,otp:string,password:string)=>{
    const response=await publicApi.post('/reset',{email,otp,password})
    if(!response) {
        console.log('error in reset password ');
        return {success:false,message:"error in reset password"}
    }
    return response
}

export const getProfile=async()=>{
    console.log('going to get the dat');
    
    const response=await api.get('/profiledata')
    console.log('resposne in the api',response);
    return response
}

export const updateProfile=async(data)=>{
    console.log('the data before sending to api',data);
    let response=await api.patch('/profile',data)
    console.log('the data  from api',data);
    return response
    
}

export const allDoctors=async()=>{
    console.log('going to fetch the doctorlist');
    const response=await api.get('/doctorlist')
    return  response
    
}

export const availableDocslots=async()=>{
    console.log('going to backend to check slots');
    const response=await api.get('/docslot')
    
}


export const logout=async()=>{

    const response=await publicApi.get('/logout')
    console.log(response,'the response from the backend in the api');
    
    if(!response){
        return {success:false,message:'error in logging out the userapi'}
    }
    return response
}
