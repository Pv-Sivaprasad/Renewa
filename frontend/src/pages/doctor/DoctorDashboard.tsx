import React from 'react'
import Header from '../../components/doctor/Header'
import DocProile from '../../components/doctor/DocProile'

const DoctorDashboard = () => {
  return (
    <div>
      <Header Children={DocProile}/>
      <h1 className='text-red-950' >Welcome to dashboard </h1>
    </div>
  )
}



export default DoctorDashboard
