import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VendorManagement.css';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: '', email: '', phone: '', category: '', address: '' });
  const [editingVendor, setEditingVendor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vendors');
      setVendors(response.data);
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  const handleAddVendor = async () => {
    try {
      await axios.post('http://localhost:5000/api/vendors', newVendor);
      fetchVendors();
      setNewVendor({ name: '', email: '', phone: '', category: '', address: '' });
    } catch (err) {
      console.error('Error adding vendor:', err);
    }
  };

  const handleEditVendor = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/vendors/${id}`, editingVendor);
      fetchVendors();
      setEditingVendor(null);
    } catch (err) {
      console.error('Error editing vendor:', err);
    }
  };

  const handleDeleteVendor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vendors/${id}`);
      fetchVendors();
    } catch (err) {
      console.error('Error deleting vendor:', err);
    }
  };

  return (
    <div className="vendor-management">
      <h2>Vendor Management</h2>
      <div>
        <h3>Add New Vendor</h3>
        <input
          type="text"
          placeholder="Name"
          value={newVendor.name}
          onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newVendor.email}
          onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newVendor.phone}
          onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newVendor.category}
          onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newVendor.address}
          onChange={(e) => setNewVendor({ ...newVendor, address: e.target.value })}
        />
        <button onClick={handleAddVendor}>Add Vendor</button>
      </div>

      <h3>Existing Vendors</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Category</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.name}</td>
              <td>{vendor.email}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.category}</td>
              <td>{vendor.address}</td>
              <td>
                <button onClick={() => setEditingVendor(vendor)}>Edit</button>
                <button onClick={() => handleDeleteVendor(vendor._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingVendor && (
        <div>
          <h3>Edit Vendor</h3>
          <input
            type="text"
            placeholder="Name"
            value={editingVendor.name}
            onChange={(e) => setEditingVendor({ ...editingVendor, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editingVendor.email}
            onChange={(e) => setEditingVendor({ ...editingVendor, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            value={editingVendor.phone}
            onChange={(e) => setEditingVendor({ ...editingVendor, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={editingVendor.category}
            onChange={(e) => setEditingVendor({ ...editingVendor, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            value={editingVendor.address}
            onChange={(e) => setEditingVendor({ ...editingVendor, address: e.target.value })}
          />
          <button onClick={() => handleEditVendor(editingVendor._id)}>Save</button>
        </div>
      )}
    </div>
  );
};

export default VendorManagement;
