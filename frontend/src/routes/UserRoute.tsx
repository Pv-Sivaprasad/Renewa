import { Route,Routes } from 'react-router'
import UserHome from '../pages/user/UserHome'
import UserLogin from '../pages/user/UserLogin'


const userRoute = () => {
  return (
    <Routes>

    <Route path='/' element={<UserHome/>} />
    <Route path='/login' element={<UserLogin/>} />
    

    </Routes>
  )
}

export default userRoute
