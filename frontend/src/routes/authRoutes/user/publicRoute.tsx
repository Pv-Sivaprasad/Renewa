import React from 'react'
import { Navigate } from 'react-router'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'


interface PublicRouteProps{
    children:React.ReactNode
}

const PublicRoute  :React.FC<PublicRouteProps>=({children})=>{
    

    const isAuthenticated=useSelector((state:RootState)=>state.user.isAuthenticated);




    return isAuthenticated ? <Navigate to='/dashboard' /> : <> {children} </>
}

   


export default PublicRoute
