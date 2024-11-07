import axios from 'axios'

const api=axios.create({
    baseURL:import.meta.env.VITE_ADMIN_API_URL
})

export const adminSignIn=async(formData: { email: string; password: string})=>{
    console.log(formData);
    console.log('data before sending to backend',formData);
    
    const response=await api.post('/signin',formData)
    console.log('the response from backend in the adminapi is',response);
   
    
    return response
    
}

export const logout=async()=>{
    console.log('entering the api');
    
    const response=await api.get('/logout')
    console.log('response from logout api',response);
    
    return response
}