const express = require('express');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const router = express.Router();

// Get user profile
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile
router.put('/user/:id', async (req, res) => {
  try {
    const { name, email } = req.body; // Include other fields as necessary
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

// Get vendor profile
router.get('/vendor/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vendor profile' });
  }
});

// Update vendor profile
router.put('/vendor/:id', async (req, res) => {
  try {
    const { name, email, phone, category, address } = req.body; // Include other fields as necessary
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, category, address },
      { new: true }
    );
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: 'Error updating vendor profile' });
  }
});

module.exports = router;
