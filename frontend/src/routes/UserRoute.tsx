import { Route,Routes } from 'react-router'
import PrivateRoute from './authRoutes/user/privateRoute'
import PublicRoute from './authRoutes/user/publicRoute'
import Dashboard from '../pages/user/UserDashboard'
import UserLogin from '../pages/user/UserLogin'
import UserRegistration from '../pages/user/UserRegistration'
import LandingPage from '../pages/user/LandingPage'
import UserHome from '../pages/user/UserHome'
import NewPassword from '../components/user/NewPassword'
import UserProfile  from '../pages/user/UserProfile'
import DoctorPage from '../pages/user/DoctorPage'
import SlotBook from '../pages/user/SlotBook'
import PaymentPage from '../pages/user/PaymentPage'
import Success from '../pages/user/Success'
import BookingPage from '../pages/user/Booking'
import BookingPayments from '../pages/user/Payment'
import InvoicePage from '../pages/user/Invoice'
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
    <Route path='/doctors' element={<PrivateRoute><DoctorPage/></PrivateRoute>} />
    <Route path='/doctorslot' element={<PrivateRoute><SlotBook/></PrivateRoute>} />
    {/* <Route path='/payment' element={<PrivateRoute><PaymentPage/></PrivateRoute>} /> */}
    <Route path='/checkout' element={<PrivateRoute><PaymentPage/></PrivateRoute>} />
    <Route path='/success' element={<PrivateRoute><Success/></PrivateRoute>}/>
    <Route path='/bookings' element={<PrivateRoute><BookingPage/></PrivateRoute>}/>
    <Route path='/payments' element={<PrivateRoute><BookingPayments/></PrivateRoute>}/>
    <Route path='/invoice' element={<PrivateRoute><InvoicePage/></PrivateRoute>}/>




    </Routes>
  )
}

export default userRoute
