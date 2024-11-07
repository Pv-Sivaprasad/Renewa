import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import AdminDashboard from './AdminDashboard';


const UserTable = () => {

    



  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, username: 'john_doe', email: 'john@example.com', status: true },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', status: false },
    { id: 3, username: 'robert_johnson', email: 'robert@example.com', status: true },
    { id: 4, username: 'sarah_williams', email: 'sarah@example.com', status: true },
    { id: 5, username: 'mike_brown', email: 'mike@example.com', status: false },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    status: false
  });

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm({
      username: user.username,
      email: user.email,
      status: user.status
    });
  };

  const handleSave = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...editForm } : user
    ));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      username: '',
      email: '',
      status: false
    });
  };

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Username</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr 
                key={user.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {editingId === user.id ? (
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {editingId === user.id ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {editingId === user.id ? (
                    <select
                      value={editForm.status.toString()}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value === 'true'})}
                      className="rounded border p-1"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  ) : (
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.status 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {editingId === user.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(user.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;