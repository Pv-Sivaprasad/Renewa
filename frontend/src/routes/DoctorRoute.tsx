import React from 'react'
import { Route,Routes } from 'react-router';
import DoctorLoginForm from "../pages/doctor/DoctorLogin";
import ProtectedRoute from '../components/Protectedroute';
import PublicRoute from '../components/PublicRoute';



const DoctorRoute = () => {
  return (
    <div>
      
      <Routes>

        <Route path='/' element={<PublicRoute><DoctorLoginForm/></PublicRoute>}  />    
      
      </Routes>
    
    </div>
  )
}

export default DoctorRoute


