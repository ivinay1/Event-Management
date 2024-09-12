import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VendorProfile.css';

const VendorProfile = ({ vendorId }) => {
  const [vendor, setVendor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedVendor, setUpdatedVendor] = useState({ name: '', email: '', phone: '', category: '', address: '' });

  useEffect(() => {
    fetchVendorProfile();
  }, []);

  const fetchVendorProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/profile/vendor/${vendorId}`);
      setVendor(response.data);
      setUpdatedVendor({ 
        name: response.data.name, 
        email: response.data.email,
        phone: response.data.phone,
        category: response.data.category,
        address: response.data.address
      });
    } catch (err) {
      console.error('Error fetching vendor profile:', err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`http://localhost:5000/api/profile/vendor/${vendorId}`, updatedVendor);
      setEditMode(false);
      fetchVendorProfile();
    } catch (err) {
      console.error('Error updating vendor profile:', err);
    }
  };

  return (
    <div className="vendor-profile">
      <h2>Vendor Profile</h2>
      {vendor ? (
        <div>
          {editMode ? (
            <div>
              <input
                type="text"
                value={updatedVendor.name}
                onChange={(e) => setUpdatedVendor({ ...updatedVendor, name: e.target.value })}
              />
              <input
                type="email"
                value={updatedVendor.email}
                onChange={(e) => setUpdatedVendor({ ...updatedVendor, email: e.target.value })}
              />
              <input
                type="text"
                value={updatedVendor.phone}
                onChange={(e) => setUpdatedVendor({ ...updatedVendor, phone: e.target.value })}
              />
              <input
                type="text"
                value={updatedVendor.category}
                onChange={(e) => setUpdatedVendor({ ...updatedVendor, category: e.target.value })}
              />
              <input
                type="text"
                value={updatedVendor.address}
                onChange={(e) => setUpdatedVendor({ ...updatedVendor, address: e.target.value })}
              />
              <button onClick={handleUpdateProfile}>Save</button>
            </div>
          ) : (
            <div>
              <p>Name: {vendor.name}</p>
              <p>Email: {vendor.email}</p>
              <p>Phone: {vendor.phone}</p>
              <p>Category: {vendor.category}</p>
              <p>Address: {vendor.address}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VendorProfile;
