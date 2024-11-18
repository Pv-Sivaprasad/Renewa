import React from 'react'
import { Route,Routes } from 'react-router';
import PublicRoute from '../components/authRoutes/doctor/publicRoute';
import PrivateRoute from '../components/authRoutes/doctor/privateRoute';
import DoctorLoginForm from "../pages/doctor/DoctorLogin";
import DoctorRegistration from '../pages/doctor/DoctorRegistration'
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import DoctorProfile from '../pages/doctor/DoctorProfile';


const DoctorRoute = () => {
  return (
    <div>
      
      <Routes>

        <Route path='/' element={<PublicRoute ><DoctorLoginForm/></PublicRoute>}  />    
        <Route path='/register' element={<PublicRoute><DoctorRegistration/></PublicRoute> } />
        <Route path='/dashboard' element={<PrivateRoute ><DoctorDashboard/></ PrivateRoute> } />
        <Route path='/profile' element={<PrivateRoute ><DoctorProfile/></PrivateRoute > } />
        

      </Routes>
    
    </div>
  )
}

export default DoctorRoute


