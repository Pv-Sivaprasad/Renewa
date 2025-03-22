import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Navigate } from 'react-router'



interface PrivateRouteProps{
    children: React.ReactNode
    allowedRoles?: string[]; 
}

const PrivateRoute : React.FC<PrivateRouteProps> = ({children, allowedRoles})  => {

const isAuthenticated=useSelector((state:RootState)=>state.doctor.isAuthenticated)
 const userRole = useSelector((state: RootState) => state.doctor.role);

// console.log('isAuth in privat',isAuthenticated);



//   return isAuthenticated ? <>{children}</> : <Navigate to='/doctor'/>
  // If the user is authenticated and has the correct role or no specific role restriction, render the children
  if (isAuthenticated && (!allowedRoles || allowedRoles.includes(userRole))) {
    return <>{children}</>;
  }

  // Redirect if not authenticated or not authorized
  return <Navigate to="/doctor" replace />;

}

export default PrivateRoute
