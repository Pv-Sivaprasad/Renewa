import {z} from 'zod'


interface UserFormData{
    username:string,
    email:string,
    password:string,
    confirmPassword:string

}


interface FormErrors {
    username:string,
    email:string,
    password:string,
    confirmPassword:string
}


export const validateForm=(formData : UserFormData) : {isValid:boolean; errors:FormErrors} =>{
    let isValid=true
    const errors: FormErrors = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

   
    if (formData.username.trim().length < 3) {
        errors.username = 'Name must be at least 3 characters long.';
        isValid = false;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address.';
        isValid = false;
    }

    
    if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.';
        isValid = false;
    }

   
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
        isValid = false;
    }

    return { isValid, errors };
};


export const AdminLoginSchema=z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
   
})


export const validateDocUsername = (username: string): string => {
    if(username.length < 3) return 'Username should be 3 character long'
    if (!username.trim()) return 'Username cannot be empty.';
    if (/\s{2,}/.test(username)) return 'Username cannot contain consecutive spaces.';
    return '';
  };
  
  export const validateDocExperience = (experience: string): string => {
    const exp = Number(experience);
    if (isNaN(exp) || exp < 0 || exp > 25) return 'Experience must be a number between 0 and 25.';
    return '';
  };
  
