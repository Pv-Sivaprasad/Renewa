import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';



interface PublicRouteProps {
  children: JSX.Element;
 
}


const PublicRoute = ({ children }: PublicRouteProps) => {
  const accessToken = localStorage.getItem('accessToken');

  const adminRole = useSelector((state: RootState) => state.admin.role);
  const doctorRole = useSelector((state: RootState) => state.doctor.role);
  const userRole = useSelector((state: RootState) => state.user.role);

const userAuthenticated=useSelector((state:RootState)=>state.user.isAuthenticated)  
const docAuthenticate=useSelector((state:RootState)=>state.doctor.isAuthenticated)
const admAuthenticated=useSelector((state:RootState)=>state.doctor.isAuthenticated)

 if(userAuthenticated && adminRole==='user' ){
  console.log('User is already logged in, redirecting to dashboard ');
  return <Navigate to="/userhome" replace={true} />; 
 }else if(docAuthenticate  && doctorRole==='doctor'){
  console.log('Doctor is already logged in, redirecting to doctor home');
  return <Navigate to='/doctor/dashboard' replace={true} />;
  }else if(admAuthenticated  && adminRole==='admin' ){
    console.log('Admin is already logged in, redirecting to admin home');
    return <Navigate to='/admin/dashboard' replace={true} />;
  }
  

  return children; 
};

export default PublicRoute;
