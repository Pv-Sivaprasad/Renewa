import { Route,Routes } from 'react-router'
import PrivateRoute from '../components/authRoutes/user/privateRoute'
import PublicRoute from '../components/authRoutes/user/publicRoute'
import Dashboard from '../pages/user/UserDashboard'
import UserLogin from '../pages/user/UserLogin'
import UserRegistration from '../pages/user/UserRegistration'
import LandingPage from '../pages/user/LandingPage'
import UserHome from '../pages/user/UserHome'
import NewPassword from '../components/user/NewPassword'
import UserProfile  from '../pages/user/UserProfile'

const userRoute = () => {
  return (
    <Routes>

    <Route path='/' element={<PublicRoute><LandingPage/></PublicRoute>} />
    <Route path='/login' element={<PublicRoute><UserLogin/></PublicRoute> } />
    <Route path='/register' element={<PublicRoute><UserRegistration/></PublicRoute> } />
    <Route path='/forgot-password' element={ <NewPassword/> } />
    <Route path='/userhome' element={<PrivateRoute><UserHome/></PrivateRoute>} />
    <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
    <Route path='/profile' element={<PrivateRoute><UserProfile/></PrivateRoute>} />


    </Routes>
  )
}

export default userRoute
