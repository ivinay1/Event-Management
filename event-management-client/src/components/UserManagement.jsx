import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/users', newUser);
      fetchUsers();
      setNewUser({ name: '', email: '', password: '', role: 'user' });
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const handleEditUser = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, editingUser);
      fetchUsers();
      setEditingUser(null);
    } catch (err) {
      console.error('Error editing user:', err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <h3>Existing Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div>
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Name"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
          />
          <button onClick={() => handleEditUser(editingUser._id)}>Save</button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
