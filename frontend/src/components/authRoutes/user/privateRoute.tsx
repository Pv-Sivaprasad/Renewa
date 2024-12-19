import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Navigate } from 'react-router'



interface PrivateRouteProps{
    children: React.ReactNode
}

const PrivateRoute : React.FC<PrivateRouteProps> = ({children})  => {

const isAuthenticated=useSelector((state:RootState)=>state.user.isAuthenticated)




  return isAuthenticated ? <>{children}</> : <Navigate to='/'/>
}

export default PrivateRoute
