import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSideBar';

const AdminDashboard = () => {
  const [activeRoute, setActiveRoute] = useState('users');

  const renderContent = () => {
    switch (activeRoute) {
      case 'users':
        return <div className="p-6">Users Content</div>;
      case 'doctors':
        return <div className="p-6">Doctors Content</div>;
      case 'appointments':
        return <div className="p-6">Appointments Content</div>;
      case 'revenue':
        return <div className="p-6">Revenue Content</div>;
      default:
        return <div className="p-6">Select a route</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader setActiveRoute={setActiveRoute} />
      <div className="flex">
        <AdminSidebar setActiveRoute={setActiveRoute} activeRoute={activeRoute} />
        <main className="flex-1 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;


// // src/pages/admin/AdminDashboard.jsx or .tsx

// import React from 'react';
// import AdminHeader from '../../components/admin/AdminHeader'
// import AdminSidebar from '../../components/admin/AdminSideBar';
// import { useState } from 'react';


// const AdminDashboard = () => {
//   const [activeRoute, setActiveRoute] = useState('users');

//   const renderContent = () => {
//     switch (activeRoute) {
//       case 'users':
//         return <div className="p-6">Users Content</div>;
//       case 'doctors':
//         return <div className="p-6">Doctors Content</div>;
//       case 'appointments':
//         return <div className="p-6">Appointments Content</div>;
//       case 'revenue':
//         return <div className="p-6">Revenue Content</div>;
//       default:
//         return <div className="p-6">Select a route</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminHeader setActiveRoute={setActiveRoute} />
//       <div className="flex">
//         <AdminHeader activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
//         <main className="flex-1 bg-gray-50">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;