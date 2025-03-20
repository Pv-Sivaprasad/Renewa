import React from 'react'
import Header from '../../components/doctor/Header'
import AppointmentDashboard from '../../components/doctor/DocBooking'

const DocAppoinment = () => {
  return (
    <div>
      <Header Children={AppointmentDashboard}/>
    </div>
  )
}

export default DocAppoinment
