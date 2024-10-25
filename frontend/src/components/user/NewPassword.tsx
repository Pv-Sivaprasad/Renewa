import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { forgetPassword, resetPassword } from '../../services/userApi'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'


const NewPassword = () => {

    const [email,setNewEmail]=useState('')
    const [otp,setOtp]=useState('')
    const [password,setPassword]=useState('')

    const handleForgetPassword=async()=>{
        try {
            const response=await forgetPassword(email)
            if(response){
                toast.success('OTP has been sent to mail id')
            }else{
                toast.error('')
            }
        } catch (error) {
            toast.error('Error sending OTP')
        }
    }



    const changedPassword=async()=>{
        const response=await resetPassword(otp,password)
        if(response){
            toast.success('Password has been changed successfully')
        }else{
            toast.error('')
        }
    }

    return (
    <div>

        <UserHeader/>




        <UserFooter/>

    </div>
  )
}

export default NewPassword
