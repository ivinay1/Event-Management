import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/profile/user/${userId}`);
      setUser(response.data);
      setUpdatedUser({ name: response.data.name, email: response.data.email });
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`http://localhost:5000/api/profile/user/${userId}`, updatedUser);
      setEditMode(false);
      fetchUserProfile();
    } catch (err) {
      console.error('Error updating user profile:', err);
    }
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {user ? (
        <div>
          {editMode ? (
            <div>
              <input
                type="text"
                value={updatedUser.name}
                onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              />
              <input
                type="email"
                value={updatedUser.email}
                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              />
              <button onClick={handleUpdateProfile}>Save</button>
            </div>
          ) : (
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
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

export default UserProfile;
