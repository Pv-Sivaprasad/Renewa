import React from 'react';
import SideBar from '../../components/user/SideBar';
import UserHeader from '../../components/user/UserHeader';

const UserDashboard = () => {
  return (
    <div className='bg-blue-200 min-h-screen flex flex-col'>
      {/* User Header */}
      {/* <UserHeader /> */}

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content (you can add more components here) */}
        <div className="flex-1 p-6">
          {/* Add the rest of your content here */}
          <h2 className="text-xl">Welcome to the Dashboard</h2>
          {/* Content */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;



// import React from 'react';
// import SideBar from '../../components/user/SideBar';
// import UserHeader from '../../components/user/UserHeader';
// const UserDashboard = () => {
//   return (
   
    

//     <div className='bg-blue-200' >
//       <UserHeader/>

   
//       <SideBar />
//     </div>
       
   
    
//   );
// };

// export default UserDashboard;
