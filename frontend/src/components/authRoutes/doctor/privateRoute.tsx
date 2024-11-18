import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Navigate } from 'react-router'



interface PrivateRouteProps{
    children: React.ReactNode
}

const PrivateRoute : React.FC<PrivateRouteProps> = ({children})  => {

const isAuthenticated=useSelector((state:RootState)=>state.doctor.isAuthenticated)

console.log('isAuth in privat',isAuthenticated);



  return isAuthenticated ? <>{children}</> : <Navigate to='/doctor'/>
}

export default PrivateRoute
