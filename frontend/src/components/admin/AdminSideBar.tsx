import { Users, UserCog, Calendar, DollarSign, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const AdminSidebar = ({ activeRoute, setActiveRoute }) => {
  const navigate = useNavigate(); 

  const menuItems = [
    { id: 'users', label: 'Users', icon: Users, route: '/admin/users' },
    { id: 'doctors', label: 'Doctors', icon: UserCog, route: '/admin/doctors' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, route: '/admin/appointments' },
    { id: 'revenue', label: 'Revenue', icon: DollarSign, route: '/admin/revenue' },
  ];

  const handleRouteChange = (item) => {
    setActiveRoute(item.id); 
    navigate(item.route); 
  };

  return (
    <aside className="w-64 bg-blue-200 h-[calc(100vh-73px)] shadow-sm">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleRouteChange(item)} 
                className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
                  activeRoute === item.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
          <li className="pt-4">
            <button
              className="flex items-center space-x-3 w-full px-4 py-2 rounded-md text-red-600 hover:bg-gray-100"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;




// import { Users, UserCog, Calendar, DollarSign, LogOut } from 'lucide-react';

// const AdminSidebar = ({ activeRoute, setActiveRoute }) => {
//   const menuItems = [
//     { id: 'users', label: 'Users', icon: Users },
//     { id: 'doctors', label: 'Doctors', icon: UserCog },
//     { id: 'appointments', label: 'Appointments', icon: Calendar },
//     { id: 'revenue', label: 'Revenue', icon: DollarSign },
//   ];

//   return (
//     <aside className="w-64 bg-blue-200 h-[calc(100vh-73px)] shadow-sm">
//       <nav className="p-4">
//         <ul className="space-y-2">
//           {menuItems.map((item) => (
//             <li key={item.id}>
//               <button
//                 onClick={() => setActiveRoute(item.id)}
//                 className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
//                   activeRoute === item.id
//                     ? 'bg-blue-500 text-white'
//                     : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 <item.icon size={20} />
//                 <span>{item.label}</span>
//               </button>
//             </li>
//           ))}
//           <li className="pt-4">
//             <button
//               className="flex items-center space-x-3 w-full px-4 py-2 rounded-md text-red-600 hover:bg-gray-100"
//             >
//               <LogOut size={20} />
//               <span>Logout</span>
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };


// export default AdminSidebar