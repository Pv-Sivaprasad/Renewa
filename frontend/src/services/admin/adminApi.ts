import axios from 'axios'
import { adminAxiosInstance,publicAxiosInstance } from '../axiosInstance/adminInstance';



const api = adminAxiosInstance
const publicApi=publicAxiosInstance

export const adminSignIn = async (formData: { email: string; password: string }) => {
    console.log(formData);
    console.log('data before sending to backend', formData);

    const response = await publicApi.post('/signin', formData)
    console.log('the response from backend in the adminapi is', response);


    return response

}

export const logout = async () => {
    console.log('entering the api');

    const response = await api.get('/logout')
    console.log('response from logout api', response);

    return response
}

export const getAllUsers = async () => {
    console.log('the get all users before sending to backend');
    
    const response = await api.get('/users')
    console.log('response from get all users from backend is',response);
    
    return response
}

export const updateUserStatus=async(userId:string)=>{

    console.log('the user Id ',userId); 
    const response= await api.patch(`/users/${userId}`)
    console.log('the  returned response is===== ',response);  
    return response

}

export const getAllDoctors=async()=>{
    console.log('to get all doctors before sending to backend');
    const response=await api.get('/doctors')
    console.log('response from get all doctors from backend is ',response);
    
    return response
}


export const updateDoctorStatus=async(docId:string)=>{
    console.log('the doc Id',docId);
    const response=await api.patch(`/doctors/${docId}`)
    console.log('the returned response is -----',response);
    return response
    
    
}