import React, { useEffect, useState } from 'react';
import { Check, X, Users, UserCog, LogOut, Menu, Home, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout, updateDoctorStatus, getAllDoctors } from '../../services/admin/adminApi';
import { resetAdmin } from '../../redux/slices/adminSlice';
import { useDispatch } from 'react-redux';

const DoctorList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('Users');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]); 
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    status: false,
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchDoctors();
  }, []);

  const menuItems = [
    { title: 'Dashboard', icon: Home, route: '/admin/dashboard' },
    { title: 'Doctors', icon: UserCog, route: '/admin/doctors' },
    { title: 'Users', icon: Users, route: '/admin/users' },
    { title: 'Doc Slots', icon: UserCog, route: '/admin/docslots' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (item) => {
    setActiveMenu(item.title);
    navigate(item.route);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        dispatch(resetAdmin());
        localStorage.removeItem('accessToken');
        navigate('/admin');
      }
    } catch (error) {
      console.log('Error in logging out', error);
      alert(error);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm({
      username: user.username,
      email: user.email,
      status: user.status,
    });
  };

  const handleSave = (id) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, ...editForm } : user))
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      username: '',
      email: '',
      status: false,
    });
  };

  const toggleBlockStatus = async (userId: string) => {
    try {
      const response = await updateDoctorStatus(userId);
      if (response) {
        setUsers(
          users.map((user) =>
            user._id === userId
              ? { ...user, isBlocked: !user.isBlocked }
              : user
          )
        );
      } else {
        console.error('Error updating status');
      }
    } catch (error) {
      console.error('Error toggling block status:', error);
    }
  };

  const checkAppointments = (doctorId: string) => {
   
    navigate('/admin/docslots', { state: { doctorId }});
  };

  return (
    <div className="min-h-screen bg-blue-300">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <h1
            className={`font-bold text-blue-600 ${
              !isSidebarOpen && 'hidden'
            }`}
          >
            Admin Panel
          </h1>
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleMenuClick(item)}
              className={`flex w-full items-center px-4 py-3 transition-colors ${
                activeMenu === item.title
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              <span className={`ml-4 ${!isSidebarOpen && 'hidden'}`}>
                {item.title}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <header
          className="fixed right-0 top-0 z-10 flex h-16 items-center justify-between bg-white px-6 shadow-sm"
          style={{
            width: isSidebarOpen
              ? 'calc(100% - 16rem)'
              : 'calc(100% - 5rem)',
          }}
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {activeMenu}
          </h2>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                A
              </div>
              <span className="ml-2">Admin</span>
              <ChevronDown size={16} className="ml-2" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-gray-50"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* User Table Content */}
        <main className="p-6 pt-24">
          <div className="w-full rounded-lg bg-white p-6 shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Speciality
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Appoinments
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.docname}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.speciality}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            user.isBlocked
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {user.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => toggleBlockStatus(user._id)}
                          className={`ml-2 rounded-xl ${
                            user.isBlocked
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          } px-4 py-2 text-white`}
                        >
                          {user.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                        </td>
                        <td>
                        <button
                          onClick={() => checkAppointments(user.docId)}
                          className="ml-2 rounded-xl bg-blue-500 px-4 py-2 text-white"
                        >
                          Slots
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorList;


// import React, { useEffect, useState } from 'react';
// import { Check, X, Users, UserCog, LogOut, Menu, Home, ChevronDown } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { logout, updateDoctorStatus,getAllDoctors } from '../../services/admin/adminApi'; 
// import { resetAdmin } from '../../redux/slices/adminSlice';
// import { useDispatch } from 'react-redux';

// const DoctorList = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeMenu, setActiveMenu] = useState('Users');
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [users, setUsers] = useState<any[]>([]); 
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editForm, setEditForm] = useState({
//     username: '',
//     email: '',
//     status: false,
//   });

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await getAllDoctors()
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const menuItems = [
//     { title: 'Dashboard', icon: Home, route: '/admin/dashboard' },
//     { title: 'Doctors', icon: UserCog, route: '/admin/doctors' },
//     { title: 'Users', icon: Users, route: '/admin/users' },
//      { title: 'Doc Slots', icon: UserCog, route: '/admin/docslots' }
//   ];

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleMenuClick = (item) => {
//     setActiveMenu(item.title);
//     navigate(item.route);
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await logout();
//       if (response) {
//         dispatch(resetAdmin());
//         localStorage.removeItem('accessToken');
//         navigate('/admin');
//       }
//     } catch (error) {
//       console.log('Error in logging out', error);
//       alert(error);
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingId(user.id);
//     setEditForm({
//       username: user.username,
//       email: user.email,
//       status: user.status,
//     });
//   };

//   const handleSave = (id) => {
//     setUsers(users.map((user) =>
//       user.id === id ? { ...user, ...editForm } : user
//     ));
//     setEditingId(null);
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditForm({
//       username: '',
//       email: '',
//       status: false,
//     });
//   };

//   const toggleBlockStatus = async (userId: string) => {
//     try {
//       const response = await updateDoctorStatus(userId);
//       console.log('the response in the toggle',response);
      
//       if (response) {
//         setUsers(users.map(user =>
//           user._id === userId ? { ...user,  isBlocked: !user.isBlocked } : user
//         ));
//       } else {
//         console.error('Error updating status');
//       }
//     } catch (error) {
//       console.error('Error toggling block status:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-300">
//       {/* Sidebar */}
//       <div
//         className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
//       >
//         <div className="flex h-16 items-center justify-between px-4">
//           <h1 className={`font-bold text-blue-600 ${!isSidebarOpen && 'hidden'}`}>Admin Panel</h1>
//           <button onClick={toggleSidebar} className="rounded-lg p-2 hover:bg-gray-100">
//             {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         <nav className="mt-8">
//           {menuItems.map((item) => (
//             <button
//               key={item.title}
//               onClick={() => handleMenuClick(item)}
//               className={`flex w-full items-center px-4 py-3 transition-colors ${activeMenu === item.title ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
//             >
//               <item.icon size={20} />
//               <span className={`ml-4 ${!isSidebarOpen && 'hidden'}`}>{item.title}</span>
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
//         {/* Header */}
//         <header className="fixed right-0 top-0 z-10 flex h-16 items-center justify-between bg-white px-6 shadow-sm"
//           style={{ width: isSidebarOpen ? 'calc(100% - 16rem)' : 'calc(100% - 5rem)' }}
//         >
//           <h2 className="text-xl font-semibold text-gray-800">{activeMenu}</h2>

//           <div className="relative">
//             <button
//               onClick={() => setIsProfileOpen(!isProfileOpen)}
//               className="flex items-center rounded-lg px-3 py-2 hover:bg-gray-100"
//             >
//               <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">A</div>
//               <span className="ml-2">Admin</span>
//               <ChevronDown size={16} className="ml-2" />
//             </button>

//             {isProfileOpen && (
//               <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg">
//                 <button
//                   onClick={handleLogout}
//                   className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-gray-50"
//                 >
//                   <LogOut size={16} className="mr-2" />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* User Table Content */}
//         <main className="p-6 pt-24">
//           <div className="w-full rounded-lg bg-white p-6 shadow-md">
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="border-b bg-gray-50">
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Username</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Speciality</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {users.map((user, index) => (
//                     <tr key={user._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                       <td className="px-6 py-4 text-sm text-gray-900">
//                         {editingId === user._id ? (
//                           <input
//                             type="text"
//                             value={editForm.username}
//                             onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
//                             className="w-full rounded border p-1"
//                           />
//                         ) : (
//                           user.docname
//                         )}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-900">
//                         {editingId === user._id ? (
//                           <input
//                             type="email"
//                             value={editForm.email}
//                             onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
//                             className="w-full rounded border p-1"
//                           />
//                         ) : (
//                           user.email
//                         )}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-900">
//                       {editingId === user._id ? (
//                         <input
//                         type="email"
//                         value={editForm.email}
//                         onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
//                         className="w-full rounded border p-1"
//                         />
//                       ) : (
//                         user.speciality
//                       )}
//                     </td>
//                       <td className="px-6 py-4 text-sm">
//                         {editingId === user._id ? (
//                           <select
//                             value={editForm.status.toString()}
//                             onChange={(e) => setEditForm({ ...editForm, status: e.target.value === 'true' })}
//                             className="rounded border p-1"
//                           >
//                             <option value="true">Active</option>
//                             <option value="false">Inactive</option>
//                           </select>
//                         ) : (
//                           <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
//                             {user.isBlocked ? 'Blocked' : 'Active'}
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 text-sm">
//                         {editingId === user._id ? (
//                           <>
//                             <button
//                               onClick={() => handleSave(user._id)}
//                               className="rounded bg-blue-600 px-4 py-2 text-white"
//                             >
//                               Save
//                             </button>
//                             <button
//                               onClick={handleCancel}
//                               className="ml-2 rounded bg-gray-600 px-4 py-2 text-white"
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         ) : (
//                           <>
                           
//                             <button
//                               onClick={() => toggleBlockStatus(user._id)}
//                               className={`ml-2 rounded-xl ${user.isBlocked ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 text-white`}
//                             >
//                               {user.isBlocked ? 'Unblock' : 'Block'}
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorList;

