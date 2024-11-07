import React from 'react'
import UserHeader from '../../components/user/UserHeader'
import UserFooter from '../../components/user/UserFooter'
import background from '../../assets/user/Background.jpg'



const UserHome = () => {
  return (
    <div>
      <UserHeader/>
      <img src={background} alt="User Home" className="w-full h-auto object-cover" />
      <UserFooter/>
    </div>
  )
}

export default UserHome
