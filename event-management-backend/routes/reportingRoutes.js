const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const Order = require('../models/Order');
const router = express.Router();
const { Parser } = require('json2csv');

// Get user activity report
router.get('/user-activity', async (req, res) => {
  try {
    const users = await User.find().select('name email createdAt');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error generating user activity report' });
  }
});

// Get sales report
router.get('/sales', async (req, res) => {
  try {
    const orders = await Order.find().select('totalAmount createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error generating sales report' });
  }
});

// Get event participation report
router.get('/event-participation', async (req, res) => {
  try {
    const events = await Event.find().populate('attendees', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error generating event participation report' });
  }
});

// Export report to CSV
router.get('/export/:type', async (req, res) => {
  const { type } = req.params;

  try {
    let data, fields, filename;

    if (type === 'user-activity') {
      data = await User.find().select('name email createdAt');
      fields = ['name', 'email', 'createdAt'];
      filename = 'user_activity_report.csv';
    } else if (type === 'sales') {
      data = await Order.find().select('totalAmount createdAt');
      fields = ['totalAmount', 'createdAt'];
      filename = 'sales_report.csv';
    } else if (type === 'event-participation') {
      data = await Event.find().populate('attendees', 'name email');
      fields = ['title', 'attendees'];
      filename = 'event_participation_report.csv';
    } else {
      return res.status(400).json({ message: 'Invalid report type' });
    }

    const parser = new Parser({ fields });
    const csv = parser.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(filename);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Error exporting report to CSV' });
  }
});

module.exports = router;
