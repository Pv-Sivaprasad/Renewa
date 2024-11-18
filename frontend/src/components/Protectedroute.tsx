

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, UseSelector } from 'react-redux';
import { RootState } from '../redux/store';


interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: 'admin' |'user' | 'doctor' // Roles allowed to access this route
}


const ProtectedRoute = ({ children,allowedRoles }:ProtectedRouteProps) => {
  const accessToken = localStorage.getItem('accessToken'); 
  const adminRole = useSelector((state: RootState) => state.admin.role);
  const doctorRole = useSelector((state: RootState) => state.doctor.role);
  const userRole = useSelector((state: RootState) => state.user.role);
  
  
const userAuthenticated=useSelector((state:RootState)=>state.user.isAuthenticated)
console.log(userAuthenticated);

const docAuthenticate=useSelector((state:RootState)=>state.doctor.isAuthenticated)
console.log(docAuthenticate);

const admAuthenticated=useSelector((state:RootState)=>state.admin.isAuthenticated)
console.log(admAuthenticated);


  if(!userAuthenticated && allowedRoles==='user' && userRole==='user'){
    console.log('user does not have token to load this page');
    return <Navigate to="/login" replace={true} />;

  }else if(!docAuthenticate && allowedRoles==='doctor' && userRole==='doctor'  ){
    return <Navigate to="/dcotor" replace={true} />;
  }else if(!admAuthenticated && allowedRoles==='admin' && userRole==='admin' ){
    return <Navigate to="/admin" replace={true} />;
  }

  // if (!accessToken) {
  //   console.log('no valid token for loading this page');
    
  //   return <Navigate to="/login" replace={true} />;
  // }

  
  return children;
};

export default ProtectedRoute;
