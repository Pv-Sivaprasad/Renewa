import React from 'react'
import { Route,Routes } from "react-router";
import PublicRoute from '../components/authRoutes/admin/publicRoute';
import PrivateRoute from '../components/authRoutes/admin/privateRoute';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserTable from '../pages/admin/UserList';
import DoctorList from '../pages/admin/DoctorList';

const AdminRoute = () => {
  return (
    <Routes>

    <Route path='/' element={ <PublicRoute><AdminLogin/></PublicRoute> } />
    <Route path='/dashboard' element={ <PrivateRoute><AdminDashboard/></PrivateRoute>} />
    <Route path='/users' element={ <PrivateRoute><UserTable/></PrivateRoute> } />
    <Route path='/doctors' element={ <PrivateRoute><DoctorList/></PrivateRoute> } />
    

    </Routes>
  )
}




export default AdminRoute
