import axios from 'axios'
import { publicAxiosInstance,doctorAxiosInstance } from '../axiosInstance/doctorInstance'
import { log } from 'console'


const api=doctorAxiosInstance
const publicApi=publicAxiosInstance



export const docSignIn = async (data) => {
    try {
        const response = await publicApi.post('/signin', data);
        return response;
    } catch (error) {
        console.log('Error in docSignIn API:', error);
        throw error; 
    }
};


export const docLogout=async()=>{
    console.log('enterinf the api in doclogout');
    
    const response=await publicApi.post('/logout')
    return response
}