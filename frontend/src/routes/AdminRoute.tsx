import React from 'react'
import { Route,Routes } from "react-router";
import AdminLogin from '../pages/admin/AdminLogin';

const AdminRoute = () => {
  return (
    <Routes>

    <Route path='/' element={<AdminLogin/>} />


    </Routes>
  )
}




export default AdminRoute
