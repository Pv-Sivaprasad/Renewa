import React from 'react'
import { Route,Routes } from "react-router";
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProtectedRoute from '../components/Protectedroute';
import PublicRoute from '../components/PublicRoute';
import UserList from '../components/admin/UserList';


const AdminRoute = () => {
  return (
    <Routes>

    <Route path='/' element={ <PublicRoute><AdminLogin/></PublicRoute> } />
    <Route path='/dashboard' element={ <ProtectedRoute><AdminDashboard/></ProtectedRoute> } />
    <Route path='/users' element={ <ProtectedRoute><UserList/></ProtectedRoute> } />
    

    </Routes>
  )
}




export default AdminRoute
