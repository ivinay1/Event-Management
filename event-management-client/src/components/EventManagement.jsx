import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventManagement.css';

const EventManagement = ({ userId }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '', organizer: userId });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleAddEvent = async () => {
    try {
      await axios.post('http://localhost:5000/api/events', newEvent);
      fetchEvents();
      setNewEvent({ title: '', description: '', date: '', location: '', organizer: userId });
    } catch (err) {
      console.error('Error adding event:', err);
    }
  };

  const handleEditEvent = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, editingEvent);
      fetchEvents();
      setEditingEvent(null);
    } catch (err) {
      console.error('Error editing event:', err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  return (
    <div className="event-management">
      <h2>Event Management</h2>
      <div>
        <h3>Add New Event</h3>
        <input
          type="text"
          placeholder="Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>

      <h3>Existing Events</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>
                <button onClick={() => setEditingEvent(event)}>Edit</button>
                <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEvent && (
        <div>
          <h3>Edit Event</h3>
          <input
            type="text"
            placeholder="Title"
            value={editingEvent.title}
            onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={editingEvent.description}
            onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
          />
          <input
            type="date"
            placeholder="Date"
            value={editingEvent.date}
            onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={editingEvent.location}
            onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
          />
          <button onClick={() => handleEditEvent(editingEvent._id)}>Save</button>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
