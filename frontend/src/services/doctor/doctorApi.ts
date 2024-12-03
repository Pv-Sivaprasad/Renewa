import axios from 'axios'
import { publicAxiosInstance,doctorAxiosInstance } from '../axiosInstance/doctorInstance'
import { log } from 'console'


const api=doctorAxiosInstance
const publicApi=publicAxiosInstance



export const docSignIn = async (data) => {
    
        console.log('data before sending to backend signin');
        
        const response = await publicApi.post('/signin', data);
        console.log('the response from bakcend is',response);
        return response;
    
};

export const docSignUp = async (data) => {
    try {
        console.log('data before sending to backend signin');
        
        const response = await publicApi.post('/signup', data);
        console.log('the response from bakcend is',response);
        
        return response;
    } catch (error) {
        console.log('Error in docSignUp API:', error);
        throw error; 
    }
};

export const docLogout=async()=>{
    console.log('enterinf the api in doclogout');
    
    const response=await publicApi.post('/logout')
    return response
}

export const getProfile=async()=>{
    const response=await api.get('/profiledata')
    console.log('resposne in the api',response);
    return response
}

export const editProfile=async(data)=>{
console.log('the data of editprofile before to backen',data);

    const response=await api.patch('/profile',data)
    console.log(response);
    return response    
}

export const filledSlots=async(date:string)=>{
    console.log('foing to fetch the slots in the backend');
    const response=await api.get(`/available/:${date}`)
    return response
}

export const slotSelecting=async(selectedSlots:any)=>{
    console.log('before going to backned slots');
    const response=await api.post('/slots',selectedSlots)
    return response
}


