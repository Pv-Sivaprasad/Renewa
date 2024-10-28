import axios from 'axios'

const api=axios.create({
    baseURL:import.meta.env.VITE_ADMIN_API_URL
})

export const adminSignIn=async(formData: { email: string; password: string; rememberMe: boolean })=>{
    console.log(formData);
    const response=await api.post('/signin',formData)
    
}