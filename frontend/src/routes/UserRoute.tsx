import { Route,Routes } from 'react-router'
import UserHome from '../pages/user/UserHome'


const userRoute = () => {
  return (
    <Routes>

    <Route path='/' element={<UserHome/>} />

    </Routes>
  )
}

export default userRoute
