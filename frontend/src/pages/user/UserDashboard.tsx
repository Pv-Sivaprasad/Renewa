import React from 'react';
import SideBar from '../../components/user/SideBar';

const UserDashboard = () => {
  return (
   
    <div className="flex-grow p-6 bg-blue-500">
        <SideBar />
        <h1 className='text-center'>This is the dahboard</h1>
    </div>
    
  );
};

export default UserDashboard;
