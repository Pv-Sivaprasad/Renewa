import React from 'react'
import Sidebar from '../../components/user/SideBar'
import DoctorSlotBooking from '../../components/user/slotBooking'
import { useLocation } from 'react-router'
const SlotBook = () => {

  const location=useLocation()
  const doctorId=location.state?.doctorId

console.log('the doctorId is',doctorId);

  return (
    <div>
    <Sidebar/>
    <DoctorSlotBooking doctorId={doctorId}/>
    </div>
  )
}

export default SlotBook
