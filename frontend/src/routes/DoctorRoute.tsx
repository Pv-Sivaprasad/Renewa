import React from 'react'
import { Route,Routes } from 'react-router';
import DoctorLoginForm from "../pages/doctor/DoctorLogin";
import ProtectedRoute from '../components/Protectedroute';
import PublicRoute from '../components/PublicRoute';
import DoctorRegistration from '../pages/doctor/DoctorRegistration'


const DoctorRoute = () => {
  return (
    <div>
      
      <Routes>

        <Route path='/' element={<PublicRoute><DoctorLoginForm/></PublicRoute>}  />    
        <Route path='/register' element={<PublicRoute><DoctorRegistration/></PublicRoute> } />
      </Routes>
    
    </div>
  )
}

export default DoctorRoute


