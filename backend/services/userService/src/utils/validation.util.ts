import {z} from 'zod'

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );


export const userSignUpSchema=z.object({
    username:z.string().min(3,'Username should consist atleast 3 characters'),
    email:z.string().email('Invalid email format'),
    
    password:z.string().min(8,{message:'Password should be minimum 8 characters long'})
    .regex(passwordValidation,{message:'Password is not in valid format'}),
    confirmPassword:z.string(),

}).refine((data)=>data.password===data.confirmPassword,{
    message:'Passwords do not match'
})


export const userSignInSchema=z.object({
    email:z.string().email('Invalid email format'),
    password:z.string().min(8,{message:'password should be atleast 8 characters long'})
    .regex(passwordValidation,{message:"Password is not in valid format"})
})


export const forgetPassword=z.object({
    email:z.string().email('Invalid email format')
})

export const resetPassword=z.object({
    email:z.string().email('Invlid email format'),
    password:z.string().min(8,{message:'password should be atleast 8 characters long'})
    .regex(passwordValidation,{message:"Password is not in valid format"})
})



