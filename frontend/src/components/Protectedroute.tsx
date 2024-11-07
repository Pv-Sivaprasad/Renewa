

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = localStorage.getItem('accessToken'); 

  
  if (!accessToken) {
    console.log('no valid token for loading this page');
    
    return <Navigate to="/login" replace={true} />;
  }

  
  return children;
};

export default ProtectedRoute;
