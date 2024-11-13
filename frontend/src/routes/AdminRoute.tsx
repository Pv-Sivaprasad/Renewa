import React from 'react'
import { Route,Routes } from "react-router";
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserTable from '../pages/admin/UserList';
import ProtectedRoute from '../components/Protectedroute';
import PublicRoute from '../components/PublicRoute';
import DoctorList from '../pages/admin/DoctorList';

const AdminRoute = () => {
  return (
    <Routes>

    <Route path='/' element={ <PublicRoute><AdminLogin/></PublicRoute> } />
    <Route path='/dashboard' element={ <ProtectedRoute><AdminDashboard/></ProtectedRoute> } />
    <Route path='/users' element={ <ProtectedRoute><UserTable/></ProtectedRoute> } />
    <Route path='/doctors' element={ <ProtectedRoute><DoctorList/></ProtectedRoute> } />
    

    </Routes>
  )
}




export default AdminRoute
