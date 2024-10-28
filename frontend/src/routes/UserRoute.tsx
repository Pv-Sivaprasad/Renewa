import { Route,Routes } from 'react-router'
import Dashboard from '../pages/user/UserDashboard'
import UserLogin from '../pages/user/UserLogin'
import UserRegistration from '../pages/user/UserRegistration'
import ProtectedRoute from '../components/Protectedroute'
import PublicRoute from '../components/PublicRoute'
import LandingPage from '../pages/user/LandingPage'
import UserHome from '../pages/user/UserHome'
import NewPassword from '../components/user/NewPassword'

const userRoute = () => {
  return (
    <Routes>

    <Route path='/' element={<PublicRoute><LandingPage/></PublicRoute>} />
    <Route path='/login' element={<PublicRoute><UserLogin/></PublicRoute> } />
    <Route path='/register' element={<PublicRoute><UserRegistration/></PublicRoute> } />
    <Route path='/forgot-password' element={ <NewPassword/> } />
    <Route path='/userhome' element={<ProtectedRoute><UserHome/></ProtectedRoute>} />
    <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />

    </Routes>
  )
}

export default userRoute
