import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notifications.css';

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
      setNotifications(response.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <div className="notifications">
      <h2>Your Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              <p>{notification.message}</p>
              {!notification.read && <button onClick={() => markAsRead(notification._id)}>Mark as Read</button>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  );
};

export default Notifications;
