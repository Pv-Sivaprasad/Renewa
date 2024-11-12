import {z} from 'zod'

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );


  export const doctorSignInSchema =z.object({
    email:z.string().email('Invalide email format'),
    password:z.string().min(8,{message:"Password should have atleast 8 characters"})
    .regex(passwordValidation,{message:"password not in desired format"}),
    confirmPassword:z.string(),
  }).refine((data)=>data.password===data.confirmPassword,{
    message:'Passwords do not match'
})