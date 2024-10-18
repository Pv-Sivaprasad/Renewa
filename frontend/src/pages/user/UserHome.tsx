import React from 'react'
import banner from '../../assets/banner.jpeg'
import UserHeader from '../../components/user/UserHeader'
const UserHome = () => {




  return (
    <div>

      <UserHeader/>

      <div className="flex justify-center items-center h-screen bg-blue-600">
      <img src={banner} alt="User Home" className="w-1/2 h-auto object-cover" />
    </div>
    </div>
  )
}

export default UserHome
