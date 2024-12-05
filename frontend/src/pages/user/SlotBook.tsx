import React from 'react'
import Sidebar from '../../components/user/SideBar'
import DoctorSlotBooking from '../../components/user/slotBooking'
const SlotBook = () => {
  return (
    <div>
    <Sidebar/>
    <DoctorSlotBooking doctorId={undefined}/>
    </div>
  )
}

export default SlotBook
