import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = localStorage.getItem('accessToken');

  

 
  if (accessToken) {
    console.log('User is already logged in, redirecting to dashboard or user home');
    return <Navigate to="/userhome" replace={true} />; 
  
  }

  return children; 
};

export default PublicRoute;
