import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

  const accessToken = localStorage.getItem('accessToken'); 

  if (!accessToken) {
    
    return <div>You need to log in to access this page.</div>;
  }

  
  return children;
};

export default ProtectedRoute;



// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const accessToken = localStorage.getItem('accessToken'); 

  
//   if (!accessToken) {
//     console.log('no valid token for loading this page');
    
//     return <Navigate to="/login" replace={true} />;
//   }

  
//   return children;
// };

// export default ProtectedRoute;
