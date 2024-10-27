import React from 'react'
import { useDispatch } from 'react-redux'
import { resetUser } from '../../redux/slices/authSlice'
import { Link,useNavigate } from 'react-router-dom'
import { logout } from '../../services/userApi'



const UserLogout = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()


    const handleLogout=async()=>{
        try {
            console.log('going for logout to userapi');
            
            const response=await logout()
            if(!response){
                console.log('errorr');
                
            }

        if(response){
            dispatch(resetUser())
            localStorage.removeItem('accessToken')
            navigate('/login')
        }
        } catch (error) {
         console.log('error in loggoing out frontend',error);
         
            
        }
    }

  return (
    <div>
      <Link to='/login' onClick={handleLogout} >
      Logout
      </Link>
    </div>
  )
}



export default UserLogout
