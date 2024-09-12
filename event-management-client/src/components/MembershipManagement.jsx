import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MembershipManagement.css';

const MembershipManagement = () => {
  const [memberships, setMemberships] = useState([]);
  const [newMembership, setNewMembership] = useState({ type: '', price: '', duration: '', description: '' });
  const [editingMembership, setEditingMembership] = useState(null);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/memberships');
      setMemberships(response.data);
    } catch (err) {
      console.error('Error fetching memberships:', err);
    }
  };

  const handleAddMembership = async () => {
    try {
      await axios.post('http://localhost:5000/api/memberships', newMembership);
      fetchMemberships();
      setNewMembership({ type: '', price: '', duration: '', description: '' });
    } catch (err) {
      console.error('Error adding membership:', err);
    }
  };

  const handleEditMembership = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/memberships/${id}`, editingMembership);
      fetchMemberships();
      setEditingMembership(null);
    } catch (err) {
      console.error('Error editing membership:', err);
    }
  };

  const handleDeleteMembership = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/memberships/${id}`);
      fetchMemberships();
    } catch (err) {
      console.error('Error deleting membership:', err);
    }
  };

  return (
    <div className="membership-management">
      <h2>Membership Management</h2>
      <div>
        <h3>Add New Membership</h3>
        <input
          type="text"
          placeholder="Type"
          value={newMembership.type}
          onChange={(e) => setNewMembership({ ...newMembership, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newMembership.price}
          onChange={(e) => setNewMembership({ ...newMembership, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duration (months)"
          value={newMembership.duration}
          onChange={(e) => setNewMembership({ ...newMembership, duration: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newMembership.description}
          onChange={(e) => setNewMembership({ ...newMembership, description: e.target.value })}
        />
        <button onClick={handleAddMembership}>Add Membership</button>
      </div>

      <h3>Existing Memberships</h3>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((membership) => (
            <tr key={membership._id}>
              <td>{membership.type}</td>
              <td>{membership.price}</td>
              <td>{membership.duration} months</td>
              <td>{membership.description}</td>
              <td>
                <button onClick={() => setEditingMembership(membership)}>Edit</button>
                <button onClick={() => handleDeleteMembership(membership._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingMembership && (
        <div>
          <h3>Edit Membership</h3>
          <input
            type="text"
            placeholder="Type"
            value={editingMembership.type}
            onChange={(e) => setEditingMembership({ ...editingMembership, type: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={editingMembership.price}
            onChange={(e) => setEditingMembership({ ...editingMembership, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Duration (months)"
            value={editingMembership.duration}
            onChange={(e) => setEditingMembership({ ...editingMembership, duration: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingMembership.description}
            onChange={(e) => setEditingMembership({ ...editingMembership, description: e.target.value })}
          />
          <button onClick={() => handleEditMembership(editingMembership._id)}>Save</button>
        </div>
      )}
    </div>
  );
};

export default MembershipManagement;
