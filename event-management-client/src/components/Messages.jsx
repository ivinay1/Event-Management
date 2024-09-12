import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Messages.css';

const Messages = ({ userId, recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${userId}/${recipientId}`);
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:5000/api/messages', {
        senderId: userId,
        recipientId: recipientId,
        content: newMessage,
      });
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="messages">
      <h2>Messages</h2>
      <div className="message-list">
        {messages.map((msg) => (
          <p key={msg._id} className={msg.senderId === userId ? 'sent' : 'received'}>
            {msg.content}
          </p>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Messages;
