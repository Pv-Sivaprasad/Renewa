import axios from 'axios'

console.log(import.meta.env.VITE_USER_API_URL,'the user api is this');


const api= axios.create({
    baseURL: import.meta.env.VITE_USER_API_URL
})


export const signInRequest=async(email:string,password:string)=>{
    console.log(email,password);
    console.log('data forwarding to backend in signin');
    const response=await api.post('/signin',{email,password})
    
    return response
}

export const signUpRequest=async(formData)=>{
    console.log(formData,'asdfkadsjfdf');
    
    console.log('data forwarding to backend in signup in userapi');

    const response=await api.post('/signup',formData)
    console.log('data recieved from signup in userapi',response);

    if(!response) console.log('returning is not gettin correctly');
    
   
    return response
}


export const otpSignup=async(otp,email)=>{
    console.log('the otp before forwarding to backend in user api',otp);

    const response=await api.post('/otpverify',{otp,email})
    
}