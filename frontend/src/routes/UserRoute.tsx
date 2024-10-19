import { Route,Routes } from 'react-router'
import UserHome from '../pages/user/UserHome'
import UserLogin from '../pages/user/UserLogin'
import UserRegistration from '../pages/user/UserRegistration'


const userRoute = () => {
  return (
    <Routes>

    <Route path='/' element={<UserHome/>} />
    <Route path='/login' element={<UserLogin/>} />
    <Route path='/register' element={<UserRegistration/>} />
    

    </Routes>
  )
}

export default userRoute
