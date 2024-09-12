const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// Get all messages between two users
router.get('/:userId/:recipientId', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.params.userId, recipientId: req.params.recipientId },
        { senderId: req.params.recipientId, recipientId: req.params.userId }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Send a message
router.post('/', async (req, res) => {
  const { senderId, recipientId, content } = req.body;

  try {
    const newMessage = new Message({ senderId, recipientId, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: 'Error sending message' });
  }
});

module.exports = router;
