import {z} from 'zod'
import  * as Yup from 'yup'

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


  interface Address {
    address: string;
    city: string;
    state: string;
    pincode: string;
    nationality: string;
    landmark: string;
  }
  
  interface UserProfileData {
    username: string;
    email: string;
    mobile: string;
    profilePicFile?: File;
    address: Address;
  }
  
  /**
   * Validates user profile data before submission
   * @param data - The user profile data
   * @returns - Success status and error messages if validation fails
   */
  export const validateUserProfile = (data: UserProfileData): { success: boolean; errors?: string[] } => {
    const errors: string[] = [];
  
    if (!data.username.trim()) errors.push('Username is required.');
    if (data.username.length < 3) errors.push('Username must be at least 3 characters long.');
    if (!data.email.trim()) errors.push('Email is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Invalid email format.');
 
    if (!data.mobile.trim()) errors.push('Mobile number is required.');
    if (!/^\d{10}$/.test(data.mobile)) errors.push('Mobile number must be exactly 10 digits.');
    if (!data.address.address.trim()) errors.push('Address is required.');
    if (!data.address.city.trim()) errors.push('City is required.');
    if (!data.address.state.trim()) errors.push('State is required.');
    if (!/^\d{6}$/.test(data.address.pincode)) errors.push('Pincode must be exactly 6 digits.');
    if (!data.address.nationality.trim()) errors.push('Nationality is required.');
    if (!data.address.landmark.trim()) errors.push('Landmark is required.');
    if (data.profilePicFile) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(data.profilePicFile.type)) {
        errors.push('Profile picture must be a JPEG, PNG, or WEBP file.');
      }
    }
  
    return errors.length > 0 ? { success: false, errors } : { success: true };
  };