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
    
    console.log('data forwarding to backend in signup');
    const response=await api.post('/signup',formData)
    console.log('data recieved from signup',response);

    if(!response) console.log('returning is not gettin correctly');
    
    console.log('the response in the api.post signn  in is ',response)
    return response
}