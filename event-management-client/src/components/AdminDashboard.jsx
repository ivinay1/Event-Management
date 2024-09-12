import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-menu">
        <Link to="/admin/users" className="admin-button">Manage Users</Link>
        <Link to="/admin/vendors" className="admin-button">Manage Vendors</Link>
        <Link to="/admin/memberships" className="admin-button">Manage Memberships</Link>
        <Link to="/admin/settings" className="admin-button">Settings</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
