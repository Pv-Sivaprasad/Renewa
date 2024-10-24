import { Route,Routes } from 'react-router'
import Dashboard from '../pages/user/UserDashboard'
import UserLogin from '../pages/user/UserLogin'
import UserRegistration from '../pages/user/UserRegistration'
import ProtectedRoute from '../components/Protectedroute'
import LandingPage from '../pages/user/LandingPage'
import UserHome from '../pages/user/UserHome'

const userRoute = () => {
  return (
    <Routes>

    <Route path='/' element={<LandingPage/>} />
    <Route path='/login' element={<UserLogin/>} />
    <Route path='/register' element={<UserRegistration/>} />
    <Route path='/userhome' element={<ProtectedRoute><UserHome/></ProtectedRoute>} />
    <Route path='/dashboard' element={<Dashboard/>} />

    </Routes>
  )
}

export default userRoute
