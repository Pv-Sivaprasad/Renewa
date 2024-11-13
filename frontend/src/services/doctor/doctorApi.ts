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