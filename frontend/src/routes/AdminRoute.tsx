import React from 'react'
import { Route,Routes } from "react-router";
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';

const AdminRoute = () => {
  return (
    <Routes>

    <Route path='/' element={<AdminLogin/>} />
    <Route path='/dashboard' element={ <AdminDashboard/>} />


    </Routes>
  )
}




export default AdminRoute
