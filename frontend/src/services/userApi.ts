import axios from 'axios'
import { resolveSoa } from 'dns';

console.log(import.meta.env.VITE_USER_API_URL,'the user api is this');


const api= axios.create({
    baseURL: import.meta.env.VITE_USER_API_URL
})


export const signInRequest=async(email:string,password:string)=>{
    console.log(email,password);
    console.log('reached here');
    const response=await api.post('/signin',{email,password})
    console.log(response)
    return response
}
