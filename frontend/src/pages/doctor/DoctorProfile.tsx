import React, { Children } from 'react'
import Header from '../../components/doctor/Header'
import DoctorProfilePage from '../../components/doctor/ProfileComponent'
const DoctorProfile = () => {
  return (
    <div>
     <Header Children={DoctorProfilePage}/>
       
    </div>
  )
}

export default DoctorProfile
