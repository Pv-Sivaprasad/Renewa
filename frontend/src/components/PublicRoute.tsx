import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: JSX.Element; // Accept any valid React nodes
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      
      toast.info('You are already logged in. Please log out to visit this page.', {
        
        autoClose: 3000, 
      });
    }
  }, [accessToken]);

 
  if (accessToken) {
    return null; 
  }

  
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default PublicRoute;



// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PublicRoute = ({ children }: { children: JSX.Element }) => {
//   const accessToken = localStorage.getItem('accessToken');

  

 
//   if (accessToken) {
//     console.log('User is already logged in, redirecting to dashboard or user home');
//     return <Navigate to="/userhome" replace={true} />; 
  
//   }

//   return children; 
// };

// export default PublicRoute;
