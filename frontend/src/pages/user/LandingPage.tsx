import React from 'react'
import banner from '../../assets/user/banner.jpeg'
import UserHeader from '../../components/user/UserHeader'
import UserFooter from '../../components/user/UserFooter'


const LandingPage = () => {


  return (
    <div>
      <UserHeader/>

      <div className="flex justify-center items-center h-screen bg-blue-600">
      <img src={banner} alt="User Home" className="w-full h-auto object-cover" />
    </div>
    <UserFooter/>
    </div>
  )
}

export default LandingPage
