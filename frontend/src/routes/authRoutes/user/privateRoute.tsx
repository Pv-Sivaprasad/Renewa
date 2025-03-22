import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Navigate } from 'react-router';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // optional prop for roles
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.user.role); // get user role from Redux

  // If the user is authenticated and has the correct role or no specific role restriction, render the children
  if (isAuthenticated && (!allowedRoles || allowedRoles.includes(userRole))) {
    return <>{children}</>;
  }

  // Redirect if not authenticated or not authorized
  return <Navigate to="/" replace />;
};

export default PrivateRoute;





// import React from 'react'
// import { useSelector } from 'react-redux'
// import { RootState } from '../../../redux/store'
// import { Navigate } from 'react-router'



// interface PrivateRouteProps{
//     children: React.ReactNode
// }

// const PrivateRoute : React.FC<PrivateRouteProps> = ({children})  => {

// const isAuthenticated=useSelector((state:RootState)=>state.user.isAuthenticated)




//   return isAuthenticated ? <>{children}</> : <Navigate to='/'/>
// }

// export default PrivateRoute
