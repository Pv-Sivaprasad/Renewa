import {z} from 'zod'


const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );


  export const adminSignInSchema=z.object({
    email:z.string().email('Invalid Email Format'),
    password:z.string().min(8,{message:"password should be min 8 characters"})
    .regex(passwordValidation,{message:"paswword not in the desired format"})
  })